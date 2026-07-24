/*
 * Legal compliance verification suite.
 * Run after `gatsby build` to verify:
 *   1. No "Matera Digital LLC" text anywhere in built pages
 *   2. No EIN-like or SSN-like sensitive values in built pages
 *   3. Seller disclosure appears in footer of all pages
 *   4. Required policy pages exist and are accessible
 *   5. Canonical package prices are consistent
 *   6. No "no contracts" or "contract trap" language in business pages
 *   7. No "unlimited pages" or "unlimited revisions" in pricing
 *   8. Noindex metadata on transactional pages
 *   9. Required policy links in footer
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

const assertContains = (content, substring, context) => {
  assert(content.includes(substring), `${context} should contain "${substring}"`);
};

const assertNotContains = (content, substring, context) => {
  assert(!content.includes(substring), `${context} should NOT contain "${substring}"`);
};

const readHtml = (relativePath) => {
  const filePath = join(publicDir, relativePath);
  if (!existsSync(filePath)) return null;
  return readFileSync(filePath, "utf8");
};

const getAllHtmlFiles = (dir) => {
  const results = [];
  if (!existsSync(dir)) return results;
  const entries = readdirSync(dir);
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    if (statSync(fullPath).isDirectory()) {
      results.push(...getAllHtmlFiles(fullPath));
    } else if (entry.endsWith(".html")) {
      results.push(fullPath);
    }
  }
  return results;
};

console.log("\n=== Legal Compliance Verification ===\n");

// 1. No "Matera Digital LLC" text anywhere
console.log("1. Checking for 'Matera Digital LLC' in all pages...");
const allHtmlFiles = getAllHtmlFiles(publicDir);
for (const file of allHtmlFiles) {
  const content = readFileSync(file, "utf8");
  const relPath = file.replace(publicDir + "/", "");
  assertNotContains(content, "Matera Digital LLC", relPath);
  assertNotContains(content, "Matera Digital, LLC", relPath);
}

// 2. No EIN-like or SSN-like patterns
console.log("2. Checking for EIN/SSN patterns in all pages...");
const einPattern = /\b\d{2}-\d{7}\b/;
const ssnPattern = /\b\d{3}-\d{2}-\d{4}\b/;
for (const file of allHtmlFiles) {
  const content = readFileSync(file, "utf8");
  const relPath = file.replace(publicDir + "/", "");
  assert(!einPattern.test(content), `${relPath} should not contain EIN-like pattern`);
  assert(!ssnPattern.test(content), `${relPath} should not contain SSN-like pattern`);
}

// 3. Seller disclosure in footer
console.log("3. Checking seller disclosure in key pages...");
const keyPages = [
  "index.html",
  "pricing/index.html",
  "terms/index.html",
  "privacy/index.html",
  "service-scope/index.html",
  "refund-policy/index.html",
  "digital-product-license/index.html",
  "payment-terms/index.html",
  "store/index.html",
];
const sellerDisclosure = "Bradley F. Matera, an Illinois sole proprietor";
for (const page of keyPages) {
  const content = readHtml(page);
  if (content) {
    assertContains(content, sellerDisclosure, page);
  } else {
    assert(false, `${page} should exist`);
  }
}

// 4. Required policy pages exist
console.log("4. Checking required policy pages exist...");
const requiredPages = [
  "terms/index.html",
  "privacy/index.html",
  "refund-policy/index.html",
  "digital-product-license/index.html",
  "payment-terms/index.html",
  "service-scope/index.html",
];
for (const page of requiredPages) {
  const filePath = join(publicDir, page);
  assert(existsSync(filePath), `${page} should exist`);
}

// 5. Canonical package prices
console.log("5. Checking canonical package prices on pricing page...");
const pricingHtml = readHtml("pricing/index.html");
if (pricingHtml) {
  assertContains(pricingHtml, "$447", "pricing page");
  assertContains(pricingHtml, "$797", "pricing page");
  assertContains(pricingHtml, "$1,497", "pricing page");
  assertContains(pricingHtml, "$37", "pricing page");
  assertContains(pricingHtml, "$67", "pricing page");
  assertContains(pricingHtml, "$97", "pricing page");
}

// 6. No "no contracts" or "contract trap" in business pages
console.log("6. Checking for removed language in business pages...");
const businessPages = [
  "index.html",
  "pricing/index.html",
  "terms/index.html",
  "service-scope/index.html",
  "for-business/index.html",
  "services/index.html",
];
for (const page of businessPages) {
  const content = readHtml(page);
  if (content) {
    assertNotContains(content, "no contract trap", page);
    assertNotContains(content, "If you don't like it, you don't pay", page);
  }
}

// 7. No "unlimited pages" or "unlimited revisions" in pricing
console.log("7. Checking for 'unlimited' in pricing page...");
if (pricingHtml) {
  assertNotContains(pricingHtml.toLowerCase(), "unlimited pages", "pricing page");
  assertNotContains(pricingHtml.toLowerCase(), "unlimited revisions", "pricing page");
}

// 8. Noindex on transactional pages
console.log("8. Checking noindex on transactional pages...");
const transactionalPages = [
  "success/index.html",
  "cancel/index.html",
  "purchases/index.html",
];
for (const page of transactionalPages) {
  const content = readHtml(page);
  if (content) {
    const hasNoindex =
      content.includes('noindex') ||
      content.includes("noindex,nofollow") ||
      content.includes("noindex, nofollow");
    assert(hasNoindex, `${page} should have noindex meta tag`);
  }
}

// 9. Required policy links in footer
console.log("9. Checking required policy links in footer...");
const homepage = readHtml("index.html");
if (homepage) {
  const requiredFooterLinks = [
    "/privacy/",
    "/terms/",
    "/payment-terms/",
    "/refund-policy/",
    "/digital-product-license/",
    "/service-scope/",
    "/contact/",
  ];
  for (const link of requiredFooterLinks) {
    assertContains(homepage, `href="${link}"`, "homepage footer");
  }
}

// 10. No "guaranteed" in care plans page
console.log("10. Checking for 'guaranteed' in care plans page...");
const carePlansHtml = readHtml("services/website-care-plans/index.html");
if (carePlansHtml) {
  assertNotContains(carePlansHtml.toLowerCase(), "guaranteed response times", "care plans page");
}

// Results
console.log(`\n=== Results: ${passed} passed, ${failed} failed ===\n`);
if (failed > 0) {
  console.log("Failures:");
  failures.forEach((f) => console.log(`  - ${f}`));
  process.exit(1);
} else {
  console.log("All legal compliance checks passed.");
  process.exit(0);
}
