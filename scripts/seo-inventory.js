#!/usr/bin/env node
/**
 * SEO Inventory Checker for bradleymatera.dev.
 *
 * Verifies P0 SEO audit items across the production HTML in public/.
 * Run after `npm run build` to validate the built output.
 *
 * Usage:
 *   node scripts/seo-inventory.js              # checks public/ directory
 *   node scripts/seo-inventory.js --live        # checks https://bradleymatera.dev (fetches HTML)
 *
 * Checks (FAIL = CI failure, WARN = informational):
 *   - Exactly one canonical link per page (FAIL)
 *   - No duplicate canonicals across pages (FAIL)
 *   - No duplicate titles across pages (FAIL)
 *   - Missing H1 (FAIL)
 *   - Missing meta description (FAIL)
 *   - Accidental noindex on indexable pages (FAIL)
 *   - JSON-LD uses stable @id references (FAIL)
 *   - No build-date dateModified on non-article pages (FAIL)
 *   - Demo pages contain fictional disclosure text (FAIL)
 *   - robots.txt has exactly one sitemap declaration (FAIL)
 *   - No "under 2 seconds" / "faster than most" / "ranks locally" on city pages (FAIL)
 *   - Core content present in HTML (FAIL)
 *   - Title length outside 30-70 chars (WARN)
 *   - Description length outside 140-160 chars (WARN)
 *
 * Exit code 0 = all FAIL checks pass, exit code 1 = failures found.
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

const SITE_URL = "https://bradleymatera.dev";
const PUBLIC_DIR = path.join(__dirname, "..", "public");

const DEMO_SLUGS = [
  "restaurant",
  "landscaping",
  "hvac",
  "auto-repair",
  "real-estate",
  "beauty-salon",
  "manufacturing",
  "agriculture",
  "law-firm",
  "dental",
];

const CITY_PAGE_PREFIX = "web-developer-";

// Pages that are intentionally noindex (excluded from indexability check)
const EXPECTED_NOINDEX_PATTERNS = [
  /\/404/,
  /\/cancel\/?/,
  /\/success\/?/,
  /\/purchases\/?/,
  /\/contact\/success\/?/,
];

let failures = 0;
let warnings = 0;

// Global registries for duplicate detection
const canonicalRegistry = new Map(); // canonical URL -> [page paths]
const titleRegistry = new Map(); // title -> [page paths]
const pageInventory = []; // full inventory rows

function fail(page, check, detail) {
  console.error(`  FAIL [${page}] ${check}: ${detail}`);
  failures++;
}

function warn(page, check, detail) {
  console.warn(`  WARN [${page}] ${check}: ${detail}`);
  warnings++;
}

function ok(page, check, detail) {
  console.log(`  OK   [${page}] ${check}: ${detail}`);
}

function readHTMLFile(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return null;
  }
}

function fetchLivePage(urlPath) {
  return new Promise((resolve) => {
    const url = `${SITE_URL}${urlPath}`;
    https
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve(data));
      })
      .on("error", () => resolve(null));
  });
}

// --- HTML parsing helpers ---

function extractTitle(html) {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return match ? match[1].trim() : null;
}

function extractDescription(html) {
  const match = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
  return match ? match[1].trim() : null;
}

function extractCanonical(html) {
  const match = html.match(/<link[^>]*rel=["']canonical["']\s+href=["']([^"']*)["']/i);
  return match ? match[1].trim() : null;
}

function countCanonicalLinks(html) {
  const matches = html.match(/<link[^>]*rel=["']canonical["'][^>]*>/gi);
  return matches ? matches.length : 0;
}

function extractH1s(html) {
  const matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
  return matches.map((m) => m[1].replace(/<[^>]*>/g, "").trim());
}

function extractRobotsMeta(html) {
  const match = html.match(/<meta\s+name=["']robots["']\s+content=["']([^"']*)["']/i);
  return match ? match[1].trim().toLowerCase() : null;
}

function extractJSONLD(html) {
  const scripts = [];
  const regex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    try {
      scripts.push(JSON.parse(match[1].trim()));
    } catch {
      // ignore unparseable
    }
  }
  return scripts;
}

function extractSchemaTypes(html) {
  const scripts = extractJSONLD(html);
  const types = new Set();
  for (const script of scripts) {
    const json = JSON.stringify(script);
    const typeMatches = json.matchAll(/"@type"\s*:\s*"([^"]+)"/g);
    for (const t of typeMatches) {
      types.add(t[1]);
    }
  }
  return [...types];
}

function classifyContentGroup(relPath) {
  if (relPath === "index.html") return "home";
  if (relPath.startsWith("demos/")) return "demo";
  if (relPath.startsWith(CITY_PAGE_PREFIX)) return "city";
  if (relPath.startsWith("blog/")) return "article";
  if (relPath.startsWith("tags/")) return "tag";
  if (relPath.startsWith("services/")) return "service";
  if (relPath.startsWith("work/")) return "work";
  if (relPath.startsWith("roles/")) return "role";
  if (relPath.startsWith("contributions/")) return "contribution";
  if (relPath.startsWith("recruiter")) return "recruiter";
  return "other";
}

function isExpectedNoindex(relPath) {
  return EXPECTED_NOINDEX_PATTERNS.some((p) => p.test("/" + relPath.replace(/\/index\.html$/, "/").replace(/index\.html$/, "")));
}

// --- Per-page checks ---

function checkPage(pageKey, html, relPath) {
  const title = extractTitle(html);
  const description = extractDescription(html);
  const canonical = extractCanonical(html);
  const canonicalCount = countCanonicalLinks(html);
  const h1s = extractH1s(html);
  const robotsMeta = extractRobotsMeta(html);
  const schemaTypes = extractSchemaTypes(html);
  const contentGroup = classifyContentGroup(relPath);

  // Record inventory row
  pageInventory.push({
    page: pageKey,
    contentGroup,
    title,
    titleLength: title ? title.length : 0,
    description,
    descLength: description ? description.length : 0,
    canonical,
    h1Count: h1s.length,
    h1Text: h1s[0] || null,
    schemaTypes,
    robotsMeta,
  });

  // FAIL: canonical count
  if (canonicalCount === 0) {
    fail(pageKey, "canonical", "no canonical link found");
  } else if (canonicalCount > 1) {
    fail(pageKey, "canonical", `${canonicalCount} canonical links found (expected 1)`);
  }

  // FAIL: missing H1
  if (h1s.length === 0) {
    fail(pageKey, "h1", "no <h1> found in static HTML");
  } else if (h1s.length > 1) {
    fail(pageKey, "h1", `${h1s.length} <h1> elements found (expected 1)`);
  }

  // FAIL: missing description
  if (!description) {
    fail(pageKey, "description", "no meta description found");
  }

  // FAIL: accidental noindex
  if (robotsMeta && robotsMeta.includes("noindex") && !isExpectedNoindex(relPath)) {
    fail(pageKey, "noindex", `accidental noindex: "${robotsMeta}"`);
  }

  // WARN: title length
  if (title) {
    if (title.length < 30) {
      warn(pageKey, "title-length", `${title.length} chars (recommended 30-70)`);
    } else if (title.length > 70) {
      warn(pageKey, "title-length", `${title.length} chars (recommended 30-70)`);
    }
  }

  // WARN: description length
  if (description) {
    if (description.length < 140) {
      warn(pageKey, "desc-length", `${description.length} chars (recommended 140-160)`);
    } else if (description.length > 160) {
      warn(pageKey, "desc-length", `${description.length} chars (recommended 140-160)`);
    }
  }

  // Register for duplicate detection
  if (canonical) {
    if (!canonicalRegistry.has(canonical)) canonicalRegistry.set(canonical, []);
    canonicalRegistry.get(canonical).push(pageKey);
  }
  if (title) {
    if (!titleRegistry.has(title)) titleRegistry.set(title, []);
    titleRegistry.get(title).push(pageKey);
  }

  // JSON-LD checks
  const scripts = extractJSONLD(html);
  if (scripts.length > 0) {
    const allJSON = JSON.stringify(scripts);
    if (!allJSON.includes("/#person")) {
      fail(pageKey, "schema-ids", "no stable @id for Person (expected /#person)");
    }
    if (!allJSON.includes("/#website")) {
      warn(pageKey, "schema-ids", "no stable @id for WebSite (expected /#website)");
    }
    // No synthetic dateModified on non-article pages
    for (const script of scripts) {
      const json = JSON.stringify(script);
      if (json.includes('"dateModified"') && !json.includes('"BlogPosting"') && !json.includes('"Article"')) {
        if (!json.includes('"datePublished"')) {
          fail(pageKey, "freshness", "dateModified on non-article page without datePublished");
        }
      }
    }
    // No fictitious LocalBusiness/Review/AggregateRating on demo pages (not index)
    if (contentGroup === "demo" && relPath !== "demos/index.html") {
      if (allJSON.includes('"LocalBusiness"')) {
        fail(pageKey, "demo-schema", "LocalBusiness schema on demo page (fictional entity)");
      }
      if (allJSON.includes('"AggregateRating"')) {
        fail(pageKey, "demo-schema", "AggregateRating schema on demo page (fictional reviews)");
      }
      if (allJSON.includes('"Review"') && !allJSON.includes('"FAQPage"')) {
        fail(pageKey, "demo-schema", "Review schema on demo page (fictional testimonials)");
      }
    }
  }

  // Demo disclosure check (only on actual demo pages, not the index)
  if (contentGroup === "demo" && relPath !== "demos/index.html") {
    const lower = html.toLowerCase();
    if (!lower.includes("concept demo") && !lower.includes("fictional business")) {
      fail(pageKey, "demo-disclosure", "no fictional business disclosure found");
    }
  }

  // City page unsupported claims
  if (contentGroup === "city") {
    const lower = html.toLowerCase();
    const banned = ["under 2 seconds", "faster than most", "loads fast and ranks locally"];
    for (const phrase of banned) {
      if (lower.includes(phrase)) {
        fail(pageKey, "unsupported-claim", `contains "${phrase}"`);
      }
    }
  }

  // Core content in HTML
  if (h1s.length === 0 && !isExpectedNoindex(relPath)) {
    // already failed above
  }
  if (html.replace(/<[^>]*>/g, "").trim().length < 200 && !isExpectedNoindex(relPath)) {
    fail(pageKey, "content", "very little text content in static HTML (<200 chars)");
  }
}

function checkRobotsTxt(content) {
  const sitemapMatches = content.match(/^Sitemap:/gim);
  const count = sitemapMatches ? sitemapMatches.length : 0;
  if (count === 0) {
    fail("robots.txt", "sitemap", "no sitemap declaration found");
  } else if (count > 1) {
    fail("robots.txt", "sitemap", `${count} sitemap declarations (expected 1)`);
  } else {
    ok("robots.txt", "sitemap", "exactly 1 declaration");
  }
}

function checkDuplicates() {
  // Duplicate canonicals
  for (const [canonical, pages] of canonicalRegistry) {
    if (pages.length > 1) {
      fail("global", "duplicate-canonical", `${canonical} used by ${pages.length} pages: ${pages.join(", ")}`);
    }
  }
  // Duplicate titles
  for (const [title, pages] of titleRegistry) {
    if (pages.length > 1) {
      fail("global", "duplicate-title", `"${title}" used by ${pages.length} pages: ${pages.join(", ")}`);
    }
  }
}

function printInventory() {
  if (pageInventory.length === 0) return;
  console.log("\n--- Page Inventory ---");
  console.log("page".padEnd(50) + "group".padEnd(12) + "titleLen".padEnd(10) + "descLen".padEnd(10) + "h1".padEnd(5) + "schema");
  for (const row of pageInventory) {
    console.log(
      row.page.padEnd(50) +
      row.contentGroup.padEnd(12) +
      String(row.titleLength).padEnd(10) +
      String(row.descLength).padEnd(10) +
      String(row.h1Count).padEnd(5) +
      (row.schemaTypes.join(",") || "none")
    );
  }
}

// --- Local checks (public/ directory) ---

function walkDir(dir, allFiles) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath, allFiles);
    } else if (entry.name === "index.html") {
      allFiles.push(fullPath);
    }
  }
}

async function runLocalChecks() {
  console.log("\nSEO Inventory — checking public/ directory\n");

  // Check robots.txt
  const robotsPath = path.join(PUBLIC_DIR, "robots.txt");
  const robotsContent = readHTMLFile(robotsPath);
  if (robotsContent) {
    checkRobotsTxt(robotsContent);
  } else {
    fail("robots.txt", "file", "robots.txt not found in public/");
  }

  // Walk all index.html files
  const allFiles = [];
  walkDir(PUBLIC_DIR, allFiles);

  for (const filePath of allFiles) {
    const relPath = path.relative(PUBLIC_DIR, filePath);
    const html = readHTMLFile(filePath);
    if (!html) continue;
    checkPage(relPath, html, relPath);
  }

  // Cross-page duplicate checks
  checkDuplicates();

  // Print inventory
  printInventory();
}

// --- Live checks (fetch from production) ---

async function runLiveChecks() {
  console.log("\nSEO Inventory — checking live site (https://bradleymatera.dev)\n");

  // Check robots.txt
  const robotsContent = await fetchLivePage("/robots.txt");
  if (robotsContent) {
    checkRobotsTxt(robotsContent);
  } else {
    fail("robots.txt", "fetch", "could not fetch robots.txt");
  }

  // Key pages to fetch
  const pagesToCheck = [
    { path: "/", key: "index.html" },
    { path: "/about/", key: "about/index.html" },
    { path: "/contact/", key: "contact/index.html" },
    { path: "/pricing/", key: "pricing/index.html" },
    { path: "/recruiter/", key: "recruiter/index.html" },
    { path: "/support/", key: "support/index.html" },
    { path: "/services/", key: "services/index.html" },
    { path: "/services/small-business-web-design/", key: "services/small-business-web-design/index.html" },
    ...DEMO_SLUGS.map((s) => ({ path: `/demos/${s}/`, key: `demos/${s}/index.html` })),
    { path: "/web-developer-rockford-illinois/", key: "web-developer-rockford-illinois/index.html" },
    { path: "/web-developer-freeport-illinois/", key: "web-developer-freeport-illinois/index.html" },
    { path: "/web-developer-durand-davis-illinois/", key: "web-developer-durand-davis-illinois/index.html" },
    { path: "/web-developer-winnebago-illinois/", key: "web-developer-winnebago-illinois/index.html" },
    { path: "/web-developer-pecatonica-illinois/", key: "web-developer-pecatonica-illinois/index.html" },
  ];

  for (const { path: urlPath, key } of pagesToCheck) {
    const html = await fetchLivePage(urlPath);
    if (!html) {
      warn(key, "fetch", `could not fetch ${urlPath}`);
      continue;
    }
    checkPage(key, html, key);
  }

  // Cross-page duplicate checks
  checkDuplicates();

  // Print inventory
  printInventory();
}

async function main() {
  const useLive = process.argv.includes("--live");

  if (useLive) {
    await runLiveChecks();
  } else {
    if (!fs.existsSync(PUBLIC_DIR)) {
      console.error("public/ directory not found. Run `npm run build` first.");
      process.exit(1);
    }
    await runLocalChecks();
  }

  console.log(`\n--- Summary ---`);
  console.log(`Pages checked: ${pageInventory.length}`);
  console.log(`Failures: ${failures}`);
  console.log(`Warnings: ${warnings}`);
  console.log(failures === 0 ? "\nAll checks passed." : "\nSome checks failed.");

  process.exit(failures === 0 ? 0 : 1);
}

main();
