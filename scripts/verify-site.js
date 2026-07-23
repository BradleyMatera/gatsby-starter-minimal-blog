/*
 * Comprehensive site verification suite.
 * Run after `gatsby build` to verify:
 *   1. All expected page routes rendered to HTML
 *   2. NAP consistency (phone number across all locations)
 *   3. SEO checks (canonicals, meta descriptions, OG tags, schema)
 *   4. Sitemap and robots.txt
 *   5. Internal links (city pages cross-linked)
 *   6. Homepage markers
 */
const { readFileSync, existsSync, readdirSync, statSync } = require("node:fs");
const { resolve, join } = require("node:path");

const projectRoot = resolve(__dirname, "..");
const publicDir = join(projectRoot, "public");

let passed = 0;
let failed = 0;
const failures = [];

const assert = (condition, message) => {
  if (condition) {
    passed++;
  } else {
    failed++;
    failures.push(message);
    console.error(`  FAIL: ${message}`);
  }
};

const readPage = (relPath) => {
  const fullPath = join(publicDir, relPath);
  if (existsSync(fullPath)) return readFileSync(fullPath, "utf8");
  // DSG fallback: store/[...].html may be the actual file for catch-all routes
  if (relPath.endsWith("index.html")) {
    const dsgPath = join(publicDir, relPath.replace("index.html", "[...].html"));
    if (existsSync(dsgPath)) return readFileSync(dsgPath, "utf8");
  }
  return null;
};

const PHONE = "(650) 265-1193";
const PHONE_TEL = "tel:+16502651193";
const EMAIL = "bradmatera@gmail.com";
const SITE_URL = "https://bradleymatera.dev";

// ─── Page routes to verify ────────────────────────────────────────────────
const PAGES = [
  { path: "index.html", name: "Homepage" },
  { path: "about/index.html", name: "About" },
  { path: "contact/index.html", name: "Contact" },
  { path: "pricing/index.html", name: "Pricing" },
  { path: "recruiter/index.html", name: "Recruiter Hub" },
  { path: "store/index.html", name: "Store" },
  { path: "purchases/index.html", name: "Purchases" },
  { path: "support/index.html", name: "Support" },
  { path: "roles/index.html", name: "Roles Index" },
  { path: "roles/ai-automation-engineer/index.html", name: "AI Automation Engineer" },
  { path: "roles/backend-engineer/index.html", name: "Backend Engineer" },
  { path: "roles/cloud-engineer/index.html", name: "Cloud Engineer" },
  { path: "roles/devops-engineer/index.html", name: "DevOps Engineer" },
  { path: "roles/full-stack-engineer/index.html", name: "Full-Stack Engineer" },
  { path: "web-developer-durand-davis-illinois/index.html", name: "Durand/Davis IL" },
  { path: "web-developer-rockford-illinois/index.html", name: "Rockford IL" },
  { path: "web-developer-freeport-illinois/index.html", name: "Freeport IL" },
  { path: "web-developer-pecatonica-illinois/index.html", name: "Pecatonica IL" },
  { path: "web-developer-winnebago-illinois/index.html", name: "Winnebago IL" },
  { path: "web-developer-loves-park-illinois/index.html", name: "Loves Park IL" },
  { path: "web-developer-machesney-park-illinois/index.html", name: "Machesney Park IL" },
  { path: "web-developer-byron-illinois/index.html", name: "Byron IL" },
  { path: "web-developer-roscoe-illinois/index.html", name: "Roscoe IL" },
  { path: "web-developer-rockton-illinois/index.html", name: "Rockton IL" },
  { path: "web-developer-south-beloit-illinois/index.html", name: "South Beloit IL" },
  { path: "web-developer-beloit-wisconsin/index.html", name: "Beloit WI" },
  { path: "web-developer-janesville-wisconsin/index.html", name: "Janesville WI" },
  { path: "website-help-northwest-illinois/index.html", name: "Website Help NW IL" },
  { path: "northwest-illinois-web-development-faq/index.html", name: "NW IL FAQ" },
  { path: "404.html", name: "404" },
  { path: "404/index.html", name: "404 (pretty)" },
  { path: "contributions/index.html", name: "Contributions" },
  { path: "open-source-contributions/index.html", name: "Open Source Contributions" },
];

// ─── City pages that must have the phone number ───────────────────────────
const CITY_PAGES = [
  "web-developer-durand-davis-illinois/index.html",
  "web-developer-rockford-illinois/index.html",
  "web-developer-freeport-illinois/index.html",
  "web-developer-pecatonica-illinois/index.html",
  "web-developer-winnebago-illinois/index.html",
  "web-developer-loves-park-illinois/index.html",
  "web-developer-machesney-park-illinois/index.html",
  "web-developer-byron-illinois/index.html",
  "web-developer-roscoe-illinois/index.html",
  "web-developer-rockton-illinois/index.html",
  "web-developer-south-beloit-illinois/index.html",
  "web-developer-beloit-wisconsin/index.html",
  "web-developer-janesville-wisconsin/index.html",
];

// ─── Pages that should have the phone number (NAP) ────────────────────────
const NAP_PAGES = [
  "index.html",
  "contact/index.html",
  "pricing/index.html",
  "about/index.html",
  ...CITY_PAGES,
];

// ─── Pages that should have canonical URLs ────────────────────────────────
const CANONICAL_PAGES = [
  { file: "index.html", expected: `${SITE_URL}/` },
  { file: "about/index.html", expected: `${SITE_URL}/about/` },
  { file: "contact/index.html", expected: `${SITE_URL}/contact/` },
  { file: "pricing/index.html", expected: `${SITE_URL}/pricing/` },
  { file: "recruiter/index.html", expected: `${SITE_URL}/recruiter/` },
  { file: "store/index.html", expected: `${SITE_URL}/store/` },
  { file: "web-developer-durand-davis-illinois/index.html", expected: `${SITE_URL}/web-developer-durand-davis-illinois/` },
  { file: "web-developer-rockford-illinois/index.html", expected: `${SITE_URL}/web-developer-rockford-illinois/` },
  { file: "web-developer-freeport-illinois/index.html", expected: `${SITE_URL}/web-developer-freeport-illinois/` },
  { file: "web-developer-pecatonica-illinois/index.html", expected: `${SITE_URL}/web-developer-pecatonica-illinois/` },
  { file: "web-developer-winnebago-illinois/index.html", expected: `${SITE_URL}/web-developer-winnebago-illinois/` },
  { file: "web-developer-loves-park-illinois/index.html", expected: `${SITE_URL}/web-developer-loves-park-illinois/` },
  { file: "web-developer-machesney-park-illinois/index.html", expected: `${SITE_URL}/web-developer-machesney-park-illinois/` },
  { file: "web-developer-byron-illinois/index.html", expected: `${SITE_URL}/web-developer-byron-illinois/` },
  { file: "web-developer-roscoe-illinois/index.html", expected: `${SITE_URL}/web-developer-roscoe-illinois/` },
  { file: "web-developer-rockton-illinois/index.html", expected: `${SITE_URL}/web-developer-rockton-illinois/` },
  { file: "web-developer-south-beloit-illinois/index.html", expected: `${SITE_URL}/web-developer-south-beloit-illinois/` },
  { file: "web-developer-beloit-wisconsin/index.html", expected: `${SITE_URL}/web-developer-beloit-wisconsin/` },
  { file: "web-developer-janesville-wisconsin/index.html", expected: `${SITE_URL}/web-developer-janesville-wisconsin/` },
];

// ─── City pages that should cross-link to each other ──────────────────────
const ALL_CITY_SLUGS = [
  "/web-developer-durand-davis-illinois/",
  "/web-developer-rockford-illinois/",
  "/web-developer-freeport-illinois/",
  "/web-developer-pecatonica-illinois/",
  "/web-developer-winnebago-illinois/",
  "/web-developer-loves-park-illinois/",
  "/web-developer-machesney-park-illinois/",
  "/web-developer-byron-illinois/",
  "/web-developer-roscoe-illinois/",
  "/web-developer-rockton-illinois/",
  "/web-developer-south-beloit-illinois/",
  "/web-developer-beloit-wisconsin/",
  "/web-developer-janesville-wisconsin/",
];

// ═══════════════════════════════════════════════════════════════════════════
// TEST SUITE
// ═══════════════════════════════════════════════════════════════════════════

console.log("\n════════════════════════════════════════════════════════════");
console.log("  Comprehensive Site Verification Suite");
console.log("════════════════════════════════════════════════════════════\n");

// ─── 1. All page routes rendered ──────────────────────────────────────────
console.log("▶ Test 1: All page routes rendered to HTML");
for (const { path, name } of PAGES) {
  const html = readPage(path);
  assert(html !== null, `${name} (${path}) should exist`);
  if (html) {
    assert(html.includes("<html"), `${name} should have <html> tag`);
    assert(html.length > 1000, `${name} should have substantial content (>1KB)`);
  }
}
console.log("");

// ─── 2. Homepage markers ──────────────────────────────────────────────────
console.log("▶ Test 2: Homepage content markers");
const homeHtml = readPage("index.html");
if (homeHtml) {
  const titleMarkers = ["Bradley Matera — Portfolio", "Bradley Matera — Full-stack and cloud systems"];
  assert(titleMarkers.some((m) => homeHtml.includes(m)), "Homepage should have expected title");
  assert(homeHtml.includes("bradmatera@gmail.com"), "Homepage should have email (hero action)");
  assert(homeHtml.includes("/pricing/"), "Homepage should link to pricing page");
  assert(homeHtml.includes("/recruiter/"), "Homepage should link to recruiter hub");
}
console.log("");

// ─── 3. NAP consistency (phone number) ────────────────────────────────────
console.log("▶ Test 3: NAP consistency — phone number across all locations");
for (const page of NAP_PAGES) {
  const html = readPage(page);
  if (html) {
    assert(
      html.includes(PHONE) || html.includes(PHONE_TEL),
      `${page} should contain phone number ${PHONE}`
    );
  }
}
console.log("");

// ─── 4. Canonical URLs ────────────────────────────────────────────────────
console.log("▶ Test 4: Canonical URLs on key pages");
for (const { file, expected } of CANONICAL_PAGES) {
  const html = readPage(file);
  if (html) {
    assert(
      html.includes(`rel="canonical" href="${expected}"`) ||
        html.includes(`rel='canonical' href='${expected}'`) ||
        html.includes(`rel="canonical" href="${expected.replace(/\/$/, "")}"`),
      `${file} should have canonical URL ${expected}`
    );
  }
}
console.log("");

// ─── 5. Meta descriptions ─────────────────────────────────────────────────
console.log("▶ Test 5: Meta descriptions on key pages");
const META_PAGES = [
  ...CANONICAL_PAGES.map((p) => p.file),
  "website-help-northwest-illinois/index.html",
  "northwest-illinois-web-development-faq/index.html",
];
for (const file of META_PAGES) {
  const html = readPage(file);
  if (html) {
    const hasMeta = html.includes('name="description"') || html.includes('name="description"');
    assert(hasMeta, `${file} should have a meta description`);
  }
}
console.log("");

// ─── 6. Open Graph tags ───────────────────────────────────────────────────
console.log("▶ Test 6: Open Graph tags on key pages");
for (const file of CANONICAL_PAGES.map((p) => p.file)) {
  const html = readPage(file);
  if (html) {
    assert(html.includes('property="og:title"'), `${file} should have og:title`);
    assert(html.includes('property="og:url"'), `${file} should have og:url`);
  }
}
console.log("");

// ─── 7. Schema markup (JSON-LD) ───────────────────────────────────────────
console.log("▶ Test 7: Schema markup (JSON-LD) on city pages");
for (const page of CITY_PAGES) {
  const html = readPage(page);
  if (html) {
    assert(html.includes("application/ld+json"), `${page} should have JSON-LD schema`);
    assert(
      html.includes("ProfessionalService") || html.includes("Service") || html.includes("LocalBusiness"),
      `${page} should have Service/ProfessionalService/LocalBusiness schema`
    );
  }
}
console.log("");

// ─── 8. Sitemap ───────────────────────────────────────────────────────────
console.log("▶ Test 8: Sitemap generation");
const sitemapDir = join(publicDir, "sitemap.xml");
assert(existsSync(sitemapDir), "sitemap.xml directory should exist");
if (existsSync(sitemapDir)) {
  const sitemapIndex = readPage("sitemap.xml/sitemap-index.xml");
  assert(sitemapIndex !== null, "sitemap-index.xml should exist");
  if (sitemapIndex) {
    assert(sitemapIndex.includes("<sitemapindex"), "sitemap-index should be a valid sitemap index");
  }
  // Check for typical sitemap-*.xml files
  const sitemapFiles = readdirSync(sitemapDir).filter((f) => f.endsWith(".xml"));
  assert(sitemapFiles.length > 0, "Should have sitemap XML files");
  for (const sf of sitemapFiles) {
    const content = readFileSync(join(sitemapDir, sf), "utf8");
    assert(content.includes("<urlset") || content.includes("<sitemapindex"), `${sf} should be valid XML`);
  }
}
console.log("");

// ─── 9. robots.txt ────────────────────────────────────────────────────────
console.log("▶ Test 9: robots.txt");
const robots = readPage("robots.txt");
assert(robots !== null, "robots.txt should exist");
if (robots) {
  assert(robots.includes("Sitemap:"), "robots.txt should reference sitemap");
  assert(robots.toLowerCase().includes("sitemap.xml"), "robots.txt should point to sitemap.xml");
}
console.log("");

// ─── 10. Internal links — city pages cross-linked ─────────────────────────
console.log("▶ Test 10: City pages cross-link to each other");
for (const page of CITY_PAGES) {
  const html = readPage(page);
  if (html) {
    const pageSlug = "/" + page.replace("/index.html", "/");
    const otherSlugs = ALL_CITY_SLUGS.filter((s) => s !== pageSlug);
    const linkedCount = otherSlugs.filter((slug) => html.includes(slug)).length;
    assert(
      linkedCount >= 3,
      `${page} should link to at least 3 other city pages (found ${linkedCount})`
    );
  }
}
console.log("");

// ─── 11. Footer links ─────────────────────────────────────────────────────
console.log("▶ Test 11: Footer contains key links");
const footerHtml = readPage("index.html");
if (footerHtml) {
  assert(footerHtml.includes("/about/"), "Footer should link to /about/");
  assert(footerHtml.includes("/contact/"), "Footer should link to /contact/");
  assert(footerHtml.includes("/pricing/"), "Footer should link to /pricing/");
  // At least some city pages should be in the footer
  const cityLinksInFooter = ALL_CITY_SLUGS.filter((s) => footerHtml.includes(s)).length;
  assert(cityLinksInFooter >= 3, `Footer should link to at least 3 city pages (found ${cityLinksInFooter})`);
}
console.log("");

// ─── 12. Pricing page content ─────────────────────────────────────────────
console.log("▶ Test 12: Pricing page content");
const pricingHtml = readPage("pricing/index.html");
if (pricingHtml) {
  assert(pricingHtml.includes("$447") || pricingHtml.includes("447"), "Pricing should show Starter tier ($447)");
  assert(pricingHtml.includes("$797") || pricingHtml.includes("797"), "Pricing should show Growth tier ($797)");
  assert(pricingHtml.includes("$1,497") || pricingHtml.includes("1,497"), "Pricing should show Premium tier ($1,497)");
}
console.log("");

// ─── 13. Recruiter page sections ──────────────────────────────────────────
console.log("▶ Test 13: Recruiter page has key sections");
const recruiterHtml = readPage("recruiter/index.html");
if (recruiterHtml) {
  assert(recruiterHtml.includes("data-section-id") || recruiterHtml.includes("section"), "Recruiter page should have sections");
  assert(recruiterHtml.length > 5000, "Recruiter page should have substantial content (>5KB)");
}
console.log("");

// ─── 14. No broken internal links in homepage ─────────────────────────────
console.log("▶ Test 14: Homepage internal links resolve");
if (homeHtml) {
  const internalLinks = homeHtml.match(/href="\/(?!\/)[^"]*"/g) || [];
  const uniqueLinks = [...new Set(internalLinks.map((l) => l.replace('href="', "").replace('"', "")))];
  let brokenCount = 0;
  for (const link of uniqueLinks) {
    if (link.startsWith("#") || link.startsWith("mailto:") || link.startsWith("tel:")) continue;
    // Strip hash fragment for file path check
    const cleanLink = link.split("#")[0];
    if (!cleanLink || cleanLink === "/") continue;
    const filePath = cleanLink.endsWith("/") ? join(publicDir, cleanLink, "index.html") : join(publicDir, cleanLink);
    if (!existsSync(filePath)) {
      // Check if it's a tag page or blog post
      const altPath = join(publicDir, cleanLink, "index.html");
      // Check for DSG/SSR catch-all routes (e.g. store/[...].html)
      const catchAllPath = join(publicDir, cleanLink, "[...].html");
      if (!existsSync(altPath) && !existsSync(catchAllPath)) {
        brokenCount++;
        console.error(`    Broken link: ${link}`);
      }
    }
  }
  assert(brokenCount === 0, `Homepage should have no broken internal links (found ${brokenCount})`);
}
console.log("");

// ─── 15. lang attribute ───────────────────────────────────────────────────
console.log("▶ Test 15: HTML lang attribute on all pages");
for (const { path, name } of PAGES) {
  const html = readPage(path);
  if (html) {
    assert(
      html.includes('lang="en"') || html.includes("lang='en'"),
      `${name} should have lang="en"`
    );
  }
}
console.log("");

// ─── 16. RSS feed ─────────────────────────────────────────────────────────
console.log("▶ Test 16: RSS feed");
const rss = readPage("rss.xml");
assert(rss !== null, "rss.xml should exist");
if (rss) {
  assert(rss.includes("<rss") || rss.includes("<feed"), "rss.xml should be a valid RSS/Atom feed");
}
console.log("");

// ─── 17. Sitemap has lastmod ──────────────────────────────────────────────
console.log("▶ Test 17: Sitemap entries have lastmod");
if (existsSync(sitemapDir)) {
  for (const sf of readdirSync(sitemapDir).filter((f) => f.endsWith(".xml"))) {
    const content = readFileSync(join(sitemapDir, sf), "utf8");
    if (content.includes("<urlset")) {
      assert(content.includes("<lastmod>"), `${sf} should have <lastmod> entries`);
    }
  }
}
console.log("");

// ─── 18. Recruiter page images have alt text ──────────────────────────────
console.log("▶ Test 18: Recruiter page images have alt text (WCAG 1.1.1)");
const recruiterHtmlAlt = readPage("recruiter/index.html");
if (recruiterHtmlAlt) {
  const imgMatches = recruiterHtmlAlt.match(/<img[^>]*>/g) || [];
  for (const img of imgMatches) {
    const hasAlt = img.includes('alt="') && !img.includes('alt=""');
    assert(hasAlt, `Recruiter page img should have non-empty alt text: ${img.substring(0, 80)}...`);
  }
}
console.log("");

// ─── 19. Homepage mailto link has aria-label ──────────────────────────────
console.log("▶ Test 19: Homepage mailto link has descriptive aria-label (WCAG 2.4.4)");
if (homeHtml) {
  const mailtoLinks = homeHtml.match(/<a[^>]*mailto:bradmatera@gmail.com[^>]*>/g) || [];
  for (const link of mailtoLinks) {
    assert(
      link.includes('aria-label=') || link.includes("aria-label="),
      `Homepage mailto link should have aria-label: ${link.substring(0, 80)}...`
    );
  }
}
console.log("");

// ─── 20. Meta description lengths (110-170 chars) ─────────────────────────
console.log("▶ Test 20: Meta description lengths (110-170 chars)");
const META_LENGTH_PAGES = [
  "index.html",
  "pricing/index.html",
  "about/index.html",
  "contact/index.html",
  "blog/index.html",
  "contributions/index.html",
  "roles/ai-automation-engineer/index.html",
  "roles/backend-engineer/index.html",
  "roles/cloud-engineer/index.html",
  "roles/devops-engineer/index.html",
  "roles/full-stack-engineer/index.html",
];
for (const file of META_LENGTH_PAGES) {
  const html = readPage(file);
  if (html) {
    const match = html.match(/<meta name="description" content="([^"]*)"/);
    if (match) {
      const desc = match[1];
      assert(
        desc.length >= 110 && desc.length <= 170,
        `${file} meta description should be 110-170 chars (got ${desc.length}): "${desc.substring(0, 60)}..."`
      );
    } else {
      assert(false, `${file} should have a meta description`);
    }
  }
}
console.log("");

// ─── 21. Direct answer on homepage ────────────────────────────────────────
console.log("▶ Test 21: Homepage has a direct answer near the top (AEO)");
if (homeHtml) {
  assert(
    homeHtml.includes("direct-answer") || homeHtml.includes("Who is Bradley Matera"),
    "Homepage should have a direct answer paragraph"
  );
}
console.log("");

// ─── 22. Direct answer on pricing page ────────────────────────────────────
console.log("▶ Test 22: Pricing page has a direct answer (AEO)");
if (pricingHtml) {
  assert(
    pricingHtml.includes("direct-answer") || pricingHtml.includes("How much does a website cost"),
    "Pricing page should have a direct answer paragraph"
  );
}
console.log("");

// ─── 23. Pricing comparison table ─────────────────────────────────────────
console.log("▶ Test 23: Pricing page has a comparison table (AEO)");
if (pricingHtml) {
  assert(
    pricingHtml.includes("<table") && pricingHtml.includes("pricing-comparison-table"),
    "Pricing page should have a comparison table"
  );
}
console.log("");

// ─── 24. Tag pages have direct answers ────────────────────────────────────
console.log("▶ Test 24: Tag pages have direct answer paragraphs (AEO)");
const tagDir = join(publicDir, "tags");
if (existsSync(tagDir)) {
  const tagDirs = readdirSync(tagDir).filter((f) => {
    const stat = statSync(join(tagDir, f));
    return stat.isDirectory();
  });
  let checkedCount = 0;
  for (const tag of tagDirs.slice(0, 10)) {
    const tagHtml = readPage(`tags/${tag}/index.html`);
    if (tagHtml) {
      checkedCount++;
      assert(
        tagHtml.includes("direct-answer") || tagHtml.includes("What articles are tagged"),
        `Tag page /tags/${tag}/ should have a direct answer paragraph`
      );
    }
  }
  assert(checkedCount > 0, "Should have checked at least 1 tag page");
}
console.log("");

// ─── 25. Evidence links on pricing page (GEO) ─────────────────────────────
console.log("▶ Test 25: Pricing page has evidence/citation links (GEO)");
if (pricingHtml) {
  assert(pricingHtml.includes("/projects/"), "Pricing page should link to project case studies as evidence");
  assert(pricingHtml.includes("/northwest-illinois-web-development-faq/"), "Pricing page should link to FAQ as evidence");
}
console.log("");

// ═══════════════════════════════════════════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════════════════════════════════════════

console.log("════════════════════════════════════════════════════════════");
console.log(`  Results: ${passed} passed, ${failed} failed`);
if (failed > 0) {
  console.log("  ────────────────────────────────────────────────────────");
  for (const f of failures) {
    console.log(`  ✗ ${f}`);
  }
}
console.log("════════════════════════════════════════════════════════════\n");

process.exit(failed > 0 ? 1 : 0);
