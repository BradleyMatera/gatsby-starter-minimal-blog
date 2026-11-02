import { test } from "node:test";
import assert from "node:assert/strict";
import core from "../../src/features/shopify/catalog-core.js";
import { createCatalogHandler } from "../../netlify/functions/shopify-catalog.js";
import { createOutboundHandler } from "../../netlify/functions/shopify-outbound.js";

const product = (overrides = {}) => ({
  id: "gid://shopify/Product/1", handle: "usb-keyboard", title: "USB Keyboard", description: "A keyboard for a computer desk", productType: "Computer accessories", availableForSale: true,
  onlineStoreUrl: `${core.STORE_ORIGIN}/products/usb-keyboard`, featuredImage: { url: "https://cdn.shopify.com/s/files/1/keyboard.jpg", altText: "USB keyboard", width: 800, height: 800 },
  selectedOrFirstAvailableVariant: { id: "gid://shopify/ProductVariant/2", title: "Black", availableForSale: true, price: { amount: "29.95", currencyCode: "USD" } }, ...overrides,
});
const response = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
const catalogResponse = (nodes, hasNextPage = false, endCursor = null) => response({ data: { products: { nodes, pageInfo: { hasNextPage, endCursor } } } });

test("catalog sanitizes current published products with real media and an available variant price", () => {
  assert.equal(core.sanitizeProduct(product()).selectedOrFirstAvailableVariant.price.amount, "29.95");
  for (const value of [null, product({ availableForSale: false }), product({ onlineStoreUrl: null }), product({ featuredImage: null }), product({ selectedOrFirstAvailableVariant: { ...product().selectedOrFirstAvailableVariant, availableForSale: false } })]) assert.equal(core.sanitizeProduct(value), null);
  assert.equal(core.sanitizeProducts([product(), product()]).length, 1);
});

test("unsafe destinations, media, handles and prices never enter the catalog", () => {
  for (const onlineStoreUrl of ["https://evil.example/products/usb-keyboard", `${core.STORE_ORIGIN}.evil.example/products/usb-keyboard`, "javascript:alert(1)", `${core.STORE_ORIGIN}/products/another-product`, "https://user@realmallofamerica.myshopify.com/products/usb-keyboard"]) assert.equal(core.sanitizeProduct(product({ onlineStoreUrl })), null);
  assert.equal(core.sanitizeProduct(product({ handle: "../../evil" })), null);
  assert.equal(core.sanitizeProduct(product({ featuredImage: { url: "data:image/svg+xml,evil" } })), null);
  assert.equal(core.sanitizeProduct(product({ selectedOrFirstAvailableVariant: { ...product().selectedOrFirstAvailableVariant, price: { amount: "NaN", currencyCode: "USD" } } })), null);
});

test("catalog traverses pages and drops unavailable products", async () => {
  let calls = 0;
  const result = await core.fetchCatalog(async (url, options) => {
    assert.equal(url, core.STOREFRONT_ENDPOINT);
    assert.equal(options.credentials, "omit");
    assert.equal(options.redirect, "error");
    calls += 1;
    if (calls === 1) return catalogResponse([product()], true, "next-page");
    assert.equal(JSON.parse(options.body).variables.cursor, "next-page");
    return catalogResponse([product({ id: "gid://shopify/Product/3", availableForSale: false })]);
  });
  assert.equal(calls, 2);
  assert.equal(result.length, 1);
});

test("failed HTTP, GraphQL errors and hanging response bodies fail closed within the deadline", async () => {
  await assert.rejects(core.fetchCatalog(async () => response({}, 500)));
  await assert.rejects(core.fetchCatalog(async () => response({ data: {}, errors: [{ message: "Unavailable" }] })));
  await assert.rejects(core.fetchCatalog(async () => ({ ok: true, json: () => new Promise(() => {}) }), { timeoutMs: 20 }), /shopify_timeout/);
  await assert.rejects(core.fetchCatalog(() => new Promise(() => {}), { timeoutMs: 20 }), /shopify_timeout/);
});

test("the server cache expires and never serves expired products after an upstream error", async () => {
  let time = 1;
  let calls = 0;
  const handler = createCatalogHandler(async () => { calls += 1; if (calls > 1) throw new Error("offline"); return catalogResponse([product()]); }, () => time);
  assert.equal((await handler({ httpMethod: "GET" })).statusCode, 200);
  assert.equal((await handler({ httpMethod: "GET" })).statusCode, 200);
  assert.equal(calls, 1);
  time += core.CATALOG_TTL_MS + 1;
  const result = await handler({ httpMethod: "GET" });
  assert.equal(result.statusCode, 503);
  assert.deepEqual(JSON.parse(result.body).products, []);
  assert.equal((await handler({ httpMethod: "POST" })).statusCode, 405);
});

test("live product resolution verifies availability and selects the verified variant", async () => {
  const handler = createOutboundHandler(async (_url, options) => {
    assert.equal(JSON.parse(options.body).variables.handle, "usb-keyboard");
    return response({ data: { product: product() } });
  });
  const result = await handler({ httpMethod: "GET", queryStringParameters: { handle: "usb-keyboard", url: "https://evil.example" } });
  assert.equal(result.statusCode, 303);
  assert.equal(result.headers.Location, `${core.STORE_ORIGIN}/products/usb-keyboard?variant=2`);
  assert.equal(result.headers["Cache-Control"], "no-store");
});

test("deleted, unpublished and sold-out products use a verified same-store homepage", async () => {
  for (const current of [null, product({ availableForSale: false }), product({ onlineStoreUrl: null })]) {
    const calls = [];
    const result = await core.resolveDestination("usb-keyboard", async (url, options) => {
      calls.push(url);
      return options.method === "HEAD" ? new Response(null, { status: 200 }) : response({ data: { product: current } });
    });
    assert.equal(result, `${core.STORE_ORIGIN}/`);
    assert.equal(calls[1], `${core.STORE_ORIGIN}/`);
  }
});

test("unsafe handles and failed stores use only the fixed on-site fallback", async () => {
  assert.equal(await core.resolveDestination("https://evil.example", () => { throw new Error("must not fetch"); }), "/store/");
  assert.equal(await core.resolveDestination("usb-keyboard", async () => { throw new Error("offline"); }), "/store/?catalog=unavailable");
  assert.equal(await core.resolveDestination(undefined, async () => new Response(null, { status: 404 })), "/store/?catalog=unavailable");
  assert.equal(await core.resolveDestination(undefined, async () => new Response(null, { status: 200 })), `${core.STORE_ORIGIN}/`);
});

test("static previews can use the public feed, while genuine empty responses remain empty", async () => {
  const result = await core.loadPromotionCatalog(async (url) => url.startsWith("/") ? new Response("Not found", { status: 404 }) : catalogResponse([product()]), { title: "React coding" });
  assert.equal(result.source, "direct");
  assert.equal(result.products.length, 1);
  const empty = await core.loadPromotionCatalog(async (url) => { assert.ok(url.startsWith("/")); return response({ products: [] }); });
  assert.deepEqual(empty.products, []);
  await assert.rejects(core.loadPromotionCatalog(async () => { throw new Error("offline"); }));
});

const sample = (id, handle, title, productType, amount = "45.00") => product({
  id: `gid://shopify/Product/${id}`, handle, title, productType, description: "",
  onlineStoreUrl: `${core.STORE_ORIGIN}/products/${handle}`,
  selectedOrFirstAvailableVariant: { ...product().selectedOrFirstAvailableVariant, price: { amount, currencyCode: "USD" } },
});
const examples = [
  sample(20, "network-router", "Dual Band WiFi Router", "Computer Accessories", "240.00"),
  sample(21, "security-key", "USB Hardware Security Key", "Security Keys"),
  sample(22, "work-monitor", "27 inch Monitor", "Monitors", "220.00"),
  sample(23, "office-desk", "Adjustable Desk", "Desks", "290.00"),
  sample(24, "budget-keyboard", "USB Keyboard", "Keyboards"),
  sample(25, "budget-mouse", "Wired Mouse", "Mice", "25.00"),
  sample(26, "printer-ink", "Printer Ink Cartridge", "School, Office & Art Supplies", "19.00"),
  sample(27, "graphics-card", "GeForce Graphics Card", "Computer Accessories", "500.00"),
  sample(28, "pet-toy", "Dog Puzzle Toy", "Pet Supplies"),
  sample(29, "garden-shelf", "Garden Potting Shelf", "Gardening"),
  sample(30, "expensive-keyboard", "Premium Keyboard", "Keyboards", "130.00"),
  sample(31, "cloud-headset", "HyperX Cloud Headset", "Headphones"),
  sample(32, "graphic-makeup", "Graphic Design Water Activated Liner", "Water-Activated Graphic Liners"),
  sample(33, "security-garage", "Security Garage Door Remote", "Smart Home & Security"),
];

test("page intents select different eligible categories instead of a universal office shelf", () => {
  const cases = [
    [{ path: "/aws-free-tier-honest-guide/", title: "AWS Free Tier", tags: ["tech", "office", "desk"] }, ["network-router"]],
    [{ path: "/secure-authentication-cognito-react/", title: "Cognito Authentication With React", tags: ["aws", "react"] }, ["security-key"]],
    [{ path: "/" }, ["work-monitor", "office-desk"]],
    [{ path: "/pricing/" }, ["budget-keyboard", "budget-mouse"]],
    [{ path: "/web-developer-rockford-illinois/" }, ["network-router", "printer-ink"]],
    [{ path: "/webgpu-getting-started/" }, ["graphics-card", "work-monitor"]],
  ];
  for (const [context, handles] of cases) assert.deepEqual(new Set(core.rankProducts(examples, context, 12).map(p => p.handle)), new Set(handles));
});

test("no qualifying inventory means no ad, and excluded routes cannot be overridden by an intent", () => {
  const inventory = examples.filter(p => p.handle !== "security-key");
  for (const context of ["Security maintenance checklist", "SEO for local businesses", "Astronomy constellations", {}, { title: "Cloud deployment", tags: ["desk", "office"] }]) {
    const values = typeof context === "object" && context.title === "Cloud deployment" ? inventory.filter(p => p.handle !== "network-router") : inventory;
    assert.deepEqual(core.rankProducts(values, context), []);
  }
  for (const path of ["/privacy/", "/terms/", "/checkout/", "/purchases/", "/success/", "/contact-success/", "/scout/"]) assert.deepEqual(core.rankProducts(examples, { path, intent: "budget-workspace" }), []);
});

test("merchant product types block misleading keyword matches", () => {
  assert.deepEqual(core.rankProducts(examples, "AWS cloud").map(p => p.handle), ["network-router"]);
  assert.deepEqual(core.rankProducts(examples, "Website graphic design").map(p => p.handle), ["work-monitor"]);
  assert.deepEqual(core.rankProducts(examples.filter(p => p.handle !== "security-key"), "Digital security"), []);
  assert.deepEqual(core.productKinds(sample(40, "mat", "Desk Mat", "Deskmat")), ["deskmat"]);
});

test("same-topic pages vary deterministically within eligible inventory and placements do not repeat", () => {
  const keyboards = Array.from({ length: 20 }, (_, index) => sample(index + 100, `keyboard-${index}`, `Mechanical Keyboard Model ${index}`, "Keyboards"));
  const first = { path: "/react-guide/", title: "React coding" };
  const second = { path: "/javascript-guide/", title: "JavaScript coding" };
  const selected = core.rankProducts(keyboards, first, 12).map(p => p.handle);
  assert.deepEqual(selected, core.rankProducts([...keyboards].reverse(), first, 12).map(p => p.handle));
  assert.notDeepEqual(selected.slice(0, 3), core.rankProducts(keyboards, second, 3).map(p => p.handle));
  assert.equal(new Set([...selected.slice(0, 1), ...selected.slice(1, 3)]).size, 3);
  assert.equal(core.rankProducts([...keyboards, sample(150, "duplicate-listing", keyboards[0].title, "Keyboards")], first, 12).filter(p => p.title === keyboards[0].title).length <= 1, true);
});

test("demo industries have strict independent categories", () => {
  const values = [...examples, sample(41, "kitchen-board", "Acacia Cutting Board", "Cutting Boards"), sample(42, "cargo-carrier", "Vehicle Rooftop Carrier", "Rooftop Cargo Carrier"), sample(43, "workshop-ladder", "Step Ladder", "Step Ladders")];
  const cases = [["restaurant", "kitchen-board"], ["landscaping", "garden-shelf"], ["auto-repair", "cargo-carrier"], ["beauty-salon", "graphic-makeup"], ["manufacturing", "workshop-ladder"]];
  for (const [slug, handle] of cases) assert.deepEqual(core.rankProducts(values, { path: `/demos/${slug}/` }).map(p => p.handle), [handle]);
  for (const slug of ["hvac", "dental", "law-firm"]) assert.deepEqual(core.rankProducts(values, { path: `/demos/${slug}/` }), []);
});

test("structured page context survives server selection and browser fallback", async () => {
  const context = { path: "/pricing/", title: "Website pricing", intent: "budget-workspace" };
  const handler = createCatalogHandler(async () => catalogResponse(examples));
  const result = await handler({ httpMethod: "GET", queryStringParameters: { context: core.catalogContextKey(context), limit: "12" } });
  assert.deepEqual(new Set(JSON.parse(result.body).products.map(p => p.handle)), new Set(["budget-keyboard", "budget-mouse"]));
  const direct = await core.loadPromotionCatalog(async url => url.startsWith("/") ? new Response("offline", { status: 503 }) : catalogResponse(examples), context);
  assert.deepEqual(direct.products, JSON.parse(result.body).products);
  const malformed = await handler({ httpMethod: "GET", queryStringParameters: { context: "{bad json" } });
  assert.deepEqual(JSON.parse(malformed.body).products, []);
});
