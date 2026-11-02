const STORE_ORIGIN = "https://realmallofamerica.myshopify.com";
const MERCHANT_NAME = "Matera Digital";
const API_VERSION = "2026-07";
const STOREFRONT_ENDPOINT = `${STORE_ORIGIN}/api/${API_VERSION}/graphql.json`;
const CATALOG_TTL_MS = 60000;
const PRODUCT_FIELDS = `
  id handle title description(truncateAt: 360) productType availableForSale onlineStoreUrl
  featuredImage { url altText width height }
  selectedOrFirstAvailableVariant { id title availableForSale price { amount currencyCode } }
`;
const CATALOG_QUERY = `query PromotionCatalog($cursor: String) {
  products(first: 100, after: $cursor, query: "available_for_sale:true", sortKey: TITLE) {
    nodes { ${PRODUCT_FIELDS} }
    pageInfo { hasNextPage endCursor }
  }
}`;
const PRODUCT_QUERY = `query PromotionProduct($handle: String!) {
  product(handle: $handle) { ${PRODUCT_FIELDS} }
}`;
const validHandle = (value) => typeof value === "string" && /^[a-z0-9][a-z0-9-]{0,179}$/.test(value);
const cleanText = (value, limit) => typeof value === "string" ? Array.from(value.replace(/<[^>]*>/g, "")).map((character) => character.charCodeAt(0) < 32 || character.charCodeAt(0) === 127 ? " " : character).join("").replace(/\s+/g, " ").trim().slice(0, limit) : "";

const safeStoreUrl = (value, handle) => {
  try {
    const url = new URL(value);
    if (url.origin !== STORE_ORIGIN || url.username || url.password || !validHandle(handle) || url.pathname !== `/products/${handle}`) return null;
    return `${STORE_ORIGIN}/products/${handle}`;
  } catch { return null; }
};

const safeImageUrl = (value) => {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password || url.port || !["cdn.shopify.com", "realmallofamerica.myshopify.com"].includes(url.hostname)) return null;
    return url.href;
  } catch { return null; }
};

const sanitizeProduct = (value) => {
  if (!value || typeof value !== "object" || value.availableForSale !== true || !validHandle(value.handle)) return null;
  const title = cleanText(value.title, 180);
  const url = safeStoreUrl(value.onlineStoreUrl, value.handle);
  const image = value.featuredImage;
  const imageUrl = image && safeImageUrl(image.url);
  const variant = value.selectedOrFirstAvailableVariant;
  const amount = variant?.price?.amount;
  const currencyCode = variant?.price?.currencyCode;
  if (!title || !url || !imageUrl || !/^gid:\/\/shopify\/Product\/\d+$/.test(value.id || "") ||
    variant?.availableForSale !== true || !/^gid:\/\/shopify\/ProductVariant\/\d+$/.test(variant?.id || "") ||
    typeof amount !== "string" || !/^\d+(\.\d{1,6})?$/.test(amount) || Number(amount) > 100000000 ||
    typeof currencyCode !== "string" || !/^[A-Z]{3}$/.test(currencyCode)) return null;
  return {
    id: value.id, handle: value.handle, title, onlineStoreUrl: url, availableForSale: true,
    description: cleanText(value.description, 360), productType: cleanText(value.productType, 100),
    featuredImage: { url: imageUrl, altText: cleanText(image.altText, 240) || title, width: Number(image.width) > 0 ? Math.min(Number(image.width), 10000) : 800, height: Number(image.height) > 0 ? Math.min(Number(image.height), 10000) : 800 },
    selectedOrFirstAvailableVariant: { id: variant.id, title: cleanText(variant.title, 120), availableForSale: true, price: { amount, currencyCode } },
  };
};

const sanitizeProducts = (values) => {
  if (!Array.isArray(values)) return [];
  const seen = new Set();
  return values.slice(0, 1200).map(sanitizeProduct).filter((product) => {
    if (!product || seen.has(product.id)) return false;
    seen.add(product.id);
    return true;
  });
};

const timedFetch = async (fetchImpl, url, options = {}, timeoutMs = 4000) => {
  const controller = new AbortController();
  let timer;
  try {
    return await Promise.race([
      fetchImpl(url, { ...options, signal: controller.signal, redirect: "error" }),
      new Promise((_, reject) => { timer = setTimeout(() => { controller.abort(); reject(new Error("shopify_timeout")); }, timeoutMs); }),
    ]);
  } finally { clearTimeout(timer); }
};

const requestStorefront = async (query, variables, fetchImpl = fetch, timeoutMs = 4000) => {
  const body = await timedFetch(async (url, options) => {
    const response = await fetchImpl(url, options);
    if (!response.ok) throw new Error("shopify_unavailable");
    return response.json();
  }, STOREFRONT_ENDPOINT, {
    method: "POST", credentials: "omit", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query, variables }),
  }, timeoutMs);
  if (!body?.data || body.errors?.length) throw new Error("shopify_invalid_response");
  return body.data;
};

const fetchCatalog = async (fetchImpl = fetch, options = {}) => {
  const deadline = Date.now() + (options.timeoutMs || 8000);
  const products = [];
  const cursors = new Set();
  let cursor = null;
  for (let page = 0; page < 12; page += 1) {
    const remaining = deadline - Date.now();
    if (remaining <= 0) throw new Error("shopify_timeout");
    const data = await requestStorefront(CATALOG_QUERY, { cursor }, fetchImpl, remaining);
    if (!Array.isArray(data.products?.nodes)) throw new Error("shopify_invalid_catalog");
    products.push(...data.products.nodes);
    if (!data.products.pageInfo?.hasNextPage) break;
    const next = data.products.pageInfo.endCursor;
    if (typeof next !== "string" || !next || cursors.has(next)) throw new Error("shopify_invalid_pagination");
    cursors.add(next);
    cursor = next;
  }
  return sanitizeProducts(products);
};

const fetchProduct = async (handle, fetchImpl = fetch) => {
  if (!validHandle(handle)) return null;
  const data = await requestStorefront(PRODUCT_QUERY, { handle }, fetchImpl, 3500);
  const product = sanitizeProduct(data.product);
  return product?.handle === handle ? product : null;
};

const loadPromotionCatalog = async (fetchImpl = fetch, context = {}) => {
  try {
    const products = await timedFetch(async (url, options) => {
      const response = await fetchImpl(url, options);
      if (!response.ok) throw new Error("catalog_endpoint_unavailable");
      const body = await response.json();
      if (!Array.isArray(body?.products)) throw new Error("catalog_endpoint_invalid");
      return sanitizeProducts(body.products);
    }, `/.netlify/functions/shopify-catalog?context=${encodeURIComponent(catalogContextKey(context))}&limit=12`, { credentials: "omit", cache: "no-store" }, 9500);
    return { products, source: "site" };
  } catch {
    return { products: rankProducts(await fetchCatalog(fetchImpl), context, 12), source: "direct" };
  }
};

const productDestination = (product) => {
  const safe = sanitizeProduct(product);
  return safe ? `${safe.onlineStoreUrl}?variant=${safe.selectedOrFirstAvailableVariant.id.split("/").pop()}` : null;
};

const resolveDestination = async (handle, fetchImpl = fetch) => {
  if (handle != null && !validHandle(handle)) return "/store/";
  try {
    const product = handle ? await fetchProduct(handle, fetchImpl) : null;
    if (product) return productDestination(product);
    const store = await timedFetch(fetchImpl, `${STORE_ORIGIN}/`, { method: "HEAD", credentials: "omit" }, 2000);
    return store.ok ? `${STORE_ORIGIN}/` : "/store/?catalog=unavailable";
  } catch { return "/store/?catalog=unavailable"; }
};

const topics = {
  "cloud-networking": { label: "Networking for a home lab", explanation: "Networking equipment for readers exploring cloud infrastructure.", kinds: { networking: 100 } },
  "digital-security": { label: "Digital security hardware", explanation: "Hardware that directly relates to account or device security.", kinds: { security: 100 } },
  "data-storage": { label: "Storage and backup hardware", explanation: "Storage hardware for data and backup projects.", kinds: { storage: 100 } },
  "graphics-hardware": { label: "Graphics and display hardware", explanation: "Hardware for readers exploring graphics and rendering.", kinds: { graphics: 100, display: 90 } },
  "ai-compute": { label: "Hardware for local AI experiments", explanation: "Computer hardware for local experiments; check each product’s specifications.", kinds: { graphics: 100, computer: 90 } },
  "developer-input": { label: "Keyboard and mouse gear", explanation: "Input devices for a coding workspace.", kinds: { keyboard: 100, mouse: 100 } },
  "maker-workspace": { label: "For a hands-on keyboard setup", explanation: "Keyboard parts and input gear for a maker’s workspace.", kinds: { keyboardParts: 100, keyboard: 90, mouse: 90 } },
  "interview-audio": { label: "Audio gear for interviews and calls", explanation: "Microphones and compatible headsets for a conversation setup.", kinds: { microphone: 100, callHeadset: 90 } },
  "business-workspace": { label: "Displays and desks for a workspace", explanation: "Physical workspace equipment, separate from website services.", kinds: { display: 100, desk: 100 } },
  "budget-workspace": { label: "Workspace accessories under $75", explanation: "Available USD-priced accessories under $75, separate from website pricing.", kinds: { keyboard: 100, mouse: 100, deskmat: 90 }, maxPrice: 75 },
  "business-operations": { label: "For the small-business workspace", explanation: "Networking and printing supplies; check device compatibility in the shop.", kinds: { networking: 100, printing: 100 } },
  "design-workspace": { label: "For a visual design workspace", explanation: "Displays and desk surfaces for a design workspace.", kinds: { display: 100, deskmat: 90 } },
  "device-building": { label: "Parts for computer projects", explanation: "Computer components for hands-on hardware projects.", kinds: { component: 100, graphics: 90 } },
  "gaming": { label: "Game controllers and handhelds", explanation: "Game hardware alongside this page’s interactive game projects.", kinds: { gameController: 100, handheld: 100 } },
  "pet-care": { label: "For pets and rescue companions", explanation: "Pet supplies related to this page’s animal-care topic.", kinds: { pet: 100 } },
  "garden": { label: "Garden and outdoor supplies", explanation: "Garden supplies related to this page’s outdoor topic.", kinds: { garden: 100 } },
  "kitchen": { label: "Kitchen and dining finds", explanation: "Kitchen goods related to this page’s food-business topic.", kinds: { kitchen: 100 } },
  "home-living": { label: "Home essentials", explanation: "Home goods related to this page’s household topic.", kinds: { household: 100 } },
  "automotive": { label: "Vehicle and travel accessories", explanation: "Automotive accessories alongside this automotive concept demo.", kinds: { automotive: 100 } },
  "beauty": { label: "Beauty and makeup finds", explanation: "Makeup products alongside this salon concept demo.", kinds: { beauty: 100 } },
  "workshop": { label: "Workshop supplies", explanation: "Tools and equipment alongside this manufacturing concept demo.", kinds: { workshop: 100 } },
  "climate": { label: "Heating and cooling supplies", explanation: "Products directly related to heating and cooling equipment.", kinds: { climate: 100 } },
  "dental": { label: "Oral-care supplies", explanation: "Oral-care products alongside this dental concept demo.", kinds: { dental: 100 } },
  "legal-reading": { label: "Legal reference books", explanation: "Reference books related to this legal concept demo.", kinds: { legal: 100 } },
  "website-services": { label: "Website services and tools", explanation: "Products that directly support the website task on this page.", kinds: { webTool: 100 } },
};

const normalizeContext = (context = {}) => {
  const input = typeof context === "string" ? { title: context } : context || {};
  const rawPath = typeof input.path === "string" ? input.path.split(/[?#]/)[0] : "";
  return {
    path: rawPath.startsWith("/") ? rawPath.replace(/\/+$/, "").slice(0, 220) || "/" : "",
    title: cleanText(input.title, 220),
    tags: Array.isArray(input.tags) ? input.tags.map((tag) => cleanText(tag, 60)).filter(Boolean).slice(0, 12).sort() : [],
    description: cleanText(input.description, 400),
    intent: typeof input.intent === "string" && Object.hasOwn(topics, input.intent) ? input.intent : "",
  };
};
const catalogContext = (context = {}) => {
  const input = normalizeContext(context);
  return cleanText([input.title, ...input.tags, input.description].filter(Boolean).join(" "), 1400);
};
const catalogContextKey = (context = {}) => {
  const input = normalizeContext(context);
  return JSON.stringify({ path: input.path, title: input.path ? "" : input.title, intent: getPromotionTopic(input)?.id || "" });
};
const excludedPromotionPath = (path) => /^\/(?:privacy|terms|payment-terms|refund-policy|digital-product-license|image-credits|accessibility|legal|success|cancel|purchases|checkout|cart|account|login|contact|contact-success|404|scout)(?:\/|$)/i.test(path);
const demoIntents = { restaurant: "kitchen", landscaping: "garden", agriculture: "garden", "auto-repair": "automotive", "beauty-salon": "beauty", manufacturing: "workshop", "real-estate": "home-living", hvac: "climate", dental: "dental", "law-firm": "legal-reading" };
const tagIntents = {
  api: "developer-input", ci: "developer-input", debugging: "developer-input", documentation: "developer-input", nextjs: "developer-input", parsing: "developer-input", prototype: "developer-input", quality: "developer-input", stack: "developer-input", "static-sites": "developer-input", technical: "developer-input", tools: "developer-input", troubleshooting: "developer-input", web: "developer-input", webdev: "developer-input", wordpress: "developer-input", workflow: "developer-input", writing: "developer-input", learning: "developer-input", education: "developer-input", certifications: "developer-input",
  containers: "cloud-networking", deployment: "cloud-networking", "free-tier": "cloud-networking", reliability: "cloud-networking", systems: "cloud-networking",
  ux: "design-workspace", portfolio: "design-workspace", "case-study": "design-workspace", projects: "developer-input", "landing-pages": "design-workspace",
  analytics: "website-services", checklist: "website-services", conversion: "website-services", forms: "website-services", maintenance: "website-services", migration: "website-services", nap: "website-services", performance: "website-services", "service-area": "website-services", trust: "website-services", "website-checklist": "website-services",
  costs: "budget-workspace", pricing: "budget-workspace", communication: "interview-audio", productivity: "business-workspace", "time-management": "business-workspace", "small-business": "business-operations",
};
const projectIntents = { "/projects/projecthub": "ai-compute", "/projects/securelearn-lms": "digital-security", "/projects/car-match": "automotive" };
const cityTag = /^\/tags\/(?:belvidere|boone-county|dekalb|dekalb-county|dixon|green-county|illinois|lee-county|loves-park|monroe|niu|rockford|sterling|sycamore|whiteside-county|wisconsin)$/;
const topicRules = [
  [/\b(?:security|secure|authentication|cognito|jwt|ctf|oauth|password|iam|cybersecurity|owasp)\b/i, "digital-security"],
  [/\b(?:backup|backups|database|databases|storage|s3)\b/i, "data-storage"],
  [/\b(?:webgpu|webgl|opengl|shader|shaders|obj|rendering|graphics|triangle)\b/i, "graphics-hardware"],
  [/\b(?:aws|azure|cloud|serverless|lambda|terraform|devops|networking|docker|kubernetes|containerization|orchestration)\b/i, "cloud-networking"],
  [/\b(?:interview|interviews|job search|job hunting|recruiter|career)\b/i, "interview-audio"],
  [/\b(?:dog|dogs|cat|cats|animal|animals|pet|pets|rescue)\b/i, "pet-care"],
  [/\b(?:landscaping|gardening|garden|agriculture|planting)\b/i, "garden"],
  [/\b(?:restaurant|diner|kitchen|cooking|catering)\b/i, "kitchen"],
  [/\b(?:pokedex|pokemon|gaming|game|games)\b/i, "gaming"],
  [/\b(?:ai|artificial intelligence|machine learning|llm|gpt)\b/i, "ai-compute"],
  [/\b(?:website cost|website pricing|website budget|website costs)\b/i, "budget-workspace"],
  [/\b(?:seo|search engine|citation|citations|google business|core web vitals|page speed|website speed|accessibility|wcag|rankings|website maintenance|website repair)\b/i, "website-services"],
  [/\b(?:web design|website design|redesign|visual design|graphic design|design system|above the fold)\b/i, "design-workspace"],
  [/\b(?:javascript|typescript|react|gatsby|python|zig|backend|frontend|full stack|coding|programming|developer|development|code|software|testing|git|github|technical stack)\b/i, "developer-input"],
  [/\b(?:home decor|household|home essentials|home living)\b/i, "home-living"],
];
const getPromotionTopic = (context = {}) => {
  const input = normalizeContext(context);
  if (excludedPromotionPath(input.path)) return null;
  let intent = input.intent;
  if (!intent) {
    if (input.path.startsWith("/demos/")) intent = demoIntents[input.path.split("/")[2]] || "";
    else if (Object.hasOwn(projectIntents, input.path)) intent = projectIntents[input.path];
    else if (input.path.startsWith("/tags/") && Object.hasOwn(tagIntents, input.path.split("/")[2])) intent = tagIntents[input.path.split("/")[2]];
    else if (cityTag.test(input.path)) intent = "business-operations";
    else if (input.path === "/") intent = "business-workspace";
    else if (input.path === "/pricing") intent = "budget-workspace";
    else if (input.path === "/about") intent = "maker-workspace";
    else if (input.path === "/recruiter" || input.path === "/roles") intent = "interview-audio";
    else if (/^\/web-developer-/.test(input.path) || ["/for-business", "/services", "/process", "/service-areas", "/northwest-illinois-web-development-faq", "/website-help-northwest-illinois"].includes(input.path)) intent = "business-operations";
    else if (input.path === "/projects") intent = "device-building";
    else if (["/contributions", "/open-source-contributions"].includes(input.path)) intent = "developer-input";
    else if (["/demos", "/work"].includes(input.path)) intent = "design-workspace";
    else if (["/blog", "/tags"].includes(input.path)) intent = "developer-input";
    else {
      const primary = `${input.title} ${input.path.replace(/[-/]+/g, " ")}`;
      intent = topicRules.find(([rule]) => rule.test(primary))?.[1] || topicRules.find(([rule]) => rule.test(input.tags.join(" ")) )?.[1] || "";
    }
  }
  return intent ? { id: intent, ...topics[intent] } : null;
};
const productKinds = (product) => {
  const title = product.title.toLowerCase();
  const type = product.productType.toLowerCase();
  const kinds = [];
  const computer = /computer|keyboard|keycap|deskmat|mice|mouse|monitor|desktop|laptop|microphone|headphone|audio|video game|game console|handheld|security key|authenticator|encrypted storage/.test(type);
  if (computer) {
    if (/\b(?:router|network switch|ethernet adapter|network adapter|mesh wi-?fi)\b/.test(title)) kinds.push("networking");
    if (/\b(?:security key|hardware authenticator|privacy filter|encrypted (?:usb|drive))\b/.test(title)) kinds.push("security");
    if (/\b(?:external (?:hard drive|ssd)|usb flash drive|portable ssd|nas drive)\b/.test(title)) kinds.push("storage");
    if (/\b(?:graphics card|geforce|radeon)\b/.test(title) && !/desktop|laptop|personal.computer/.test(type)) kinds.push("graphics");
    if (/\bmonitor\b/.test(title) || /monitors/.test(type)) kinds.push("display");
    if (/desktop|laptop|personal.computer/.test(type)) kinds.push("computer");
    if (/\b(?:motherboard|power supply|psu)\b/.test(title)) kinds.push("component");
    if (/keycap|keyboard accessories/.test(type) || /\b(?:keycap|mechanical switch)\b/.test(title)) kinds.push("keyboardParts");
    else if (/\bkeyboard\b/.test(title) || /^keyboards?$/.test(type)) kinds.push("keyboard");
    if (/\b(?:mouse|mice)\b/.test(title) && !/mouse\s?pad/.test(title)) kinds.push("mouse");
    if (/deskmat/.test(type) || /\b(?:mouse\s?pad|desk mat)\b/.test(title)) kinds.push("deskmat");
    if (/microphone/.test(type) || /\b(?:usb microphone|audio interface)\b/.test(title)) kinds.push("microphone");
    if (/headphone/.test(type) && /\b(?:headset|headphone|headphones|earbud|earbuds)\b/.test(title) && (!/playstation|xbox|ps4|ps5|switch/.test(title) || /\b(?:pc|mac|usb|bluetooth)\b/.test(title))) kinds.push("callHeadset");
    if (/\bcontroller\b/.test(title)) kinds.push("gameController");
    if (/handheld/.test(type) || /\b(?:handheld game|retro gaming device)\b/.test(title)) kinds.push("handheld");
  }
  if (/\bdesks?\b|furniture/.test(type) && /\bdesk\b/.test(title) && !/bed|headboard/.test(title)) kinds.push("desk");
  if (/office|printer|ink/.test(type) && /\b(?:ink cartridge|ink cartridges|printer|label maker)\b/.test(title)) kinds.push("printing");
  if (/\b(?:pet|pets|dog|cat|animal)\b/.test(type) || (/^(?:|0|4)$/.test(type) && /\b(?:dog|cat)\b/.test(title))) kinds.push("pet");
  if (/garden|potting|plant holder|birdhouse/.test(type)) kinds.push("garden");
  if (/kitchen|cutting board|cookbook|dining|flatware|serving|napkin|charcuterie|salt|pepper/.test(type)) kinds.push("kitchen");
  if (/household|bed sheets|bath towel|laundry basket|blanket/.test(type)) kinds.push("household");
  if (/automotive|car accessories|rooftop cargo carrier/.test(type)) kinds.push("automotive");
  if (/makeup|eyeliner|eyeshadow|eye shadow|lipstick|lip gloss|lip stain|lip oil|blush|pigment|graphic liner|cosmetic/.test(type)) kinds.push("beauty");
  if (/hand tools|power tools|step ladder|workshop|industrial equipment/.test(type)) kinds.push("workshop");
  if (/hvac|air filter|thermostat|air conditioner/.test(type)) kinds.push("climate");
  if (/toothbrush|dental floss|oral care|toothpaste/.test(type)) kinds.push("dental");
  if (/legal book|law book|legal reference/.test(type)) kinds.push("legal");
  if (/software|digital product|web service/.test(type) && /\b(?:website|seo|accessibility|web performance)\b/.test(title)) kinds.push("webTool");
  return kinds;
};
const hash = (value) => {
  let result = 2166136261;
  for (const character of value) result = Math.imul(result ^ character.charCodeAt(0), 16777619);
  return result >>> 0;
};
const rankProducts = (values, context = {}, limit = 3) => {
  const input = normalizeContext(context);
  const topic = getPromotionTopic(input);
  if (!topic) return [];
  const seed = `${input.path || input.title.toLowerCase()}|${topic.id}`;
  const seenNames = new Set();
  const ranked = sanitizeProducts(values).map((product) => {
    const kinds = productKinds(product).filter((kind) => Object.hasOwn(topic.kinds, kind));
    if (!kinds.length) return null;
    const price = product.selectedOrFirstAvailableVariant.price;
    if (topic.maxPrice && (price.currencyCode !== "USD" || Number(price.amount) > topic.maxPrice)) return null;
    const kind = kinds.sort((a, b) => topic.kinds[b] - topic.kinds[a])[0];
    return { product, kind, score: topic.kinds[kind], order: hash(`${seed}|${product.handle}`) };
  }).filter(Boolean).sort((a, b) => b.score - a.score || a.order - b.order || a.product.handle.localeCompare(b.product.handle))
    .filter(({ product }) => {
      const name = product.title.toLowerCase().replace(/[^a-z0-9]+/g, "");
      if (seenNames.has(name)) return false;
      seenNames.add(name);
      return true;
    });
  const selected = [];
  const kinds = new Set();
  for (const entry of ranked) if (!kinds.has(entry.kind)) { selected.push(entry); kinds.add(entry.kind); }
  for (const entry of ranked) if (!selected.includes(entry)) selected.push(entry);
  return selected.slice(0, Math.max(1, Math.min(12, Number(limit) || 3))).map(({ product }) => product);
};

module.exports = { STORE_ORIGIN, MERCHANT_NAME, API_VERSION, STOREFRONT_ENDPOINT, CATALOG_TTL_MS, CATALOG_QUERY, PRODUCT_QUERY, validHandle, safeStoreUrl, safeImageUrl, sanitizeProduct, sanitizeProducts, timedFetch, requestStorefront, fetchCatalog, fetchProduct, catalogContext, catalogContextKey, normalizeContext, getPromotionTopic, productKinds, excludedPromotionPath, loadPromotionCatalog, productDestination, resolveDestination, rankProducts };
