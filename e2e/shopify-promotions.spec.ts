import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const merchant = "https://realmallofamerica.myshopify.com";
const fixture = {
  id: "gid://shopify/Product/1", handle: "network-router", title: "Wi-Fi Router", description: "Networking router for a home lab", productType: "Computer Accessories", availableForSale: true,
  onlineStoreUrl: `${merchant}/products/network-router`, featuredImage: { url: "https://cdn.shopify.com/s/files/1/keyboard.jpg", altText: "Wi-Fi router", width: 800, height: 800 },
  selectedOrFirstAvailableVariant: { id: "gid://shopify/ProductVariant/2", title: "Black", availableForSale: true, price: { amount: "29.95", currencyCode: "USD" } },
};

for (const mode of ["light", "dark"]) {
  for (const width of [320, 1280]) {
    test(`live product shelf is readable and keyboard accessible at ${width}px in ${mode}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript((mode) => {
        localStorage.setItem("analytics-consent", "denied");
        localStorage.setItem("bm-style-lab", JSON.stringify({ activePresetId: null, customVariables: {}, mode }));
      }, mode);
      await page.route("**/.netlify/functions/shopify-catalog*", (route) => route.fulfill({ json: { merchant: "Matera Digital", products: [fixture] } }));
      await page.route("https://cdn.shopify.com/s/files/1/keyboard.jpg", (route) => route.fulfill({ body: '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800"><rect x="80" y="260" width="640" height="280" rx="20" fill="#15243a"/></svg>', contentType: "image/svg+xml" }));
      await page.goto("/aws-free-tier-honest-guide/");
      const shelf = page.locator("article[itemtype='http://schema.org/Article'] .shopify-spotlight");
      await expect(shelf).toBeVisible();
      await expect(shelf.getByText("Shop promotion · Merchant: Matera Digital")).toBeVisible();
      await expect(shelf.getByRole("heading", { name: "Wi-Fi Router" })).toBeVisible();
      await expect(shelf.locator(".shopify-product__price")).toHaveText("$29.95 USD");
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
      expect(await shelf.locator(".shopify-product__image").evaluateAll((frames) => frames.every((frame) => {
        const image = frame.querySelector("img")!.getBoundingClientRect();
        const bounds = frame.getBoundingClientRect();
        return image.top >= bounds.top && image.bottom <= bounds.bottom && image.left >= bounds.left && image.right <= bounds.right;
      }))).toBe(true);
      const result = await new AxeBuilder({ page }).include("article[itemtype='http://schema.org/Article'] .shopify-spotlight").withRules(["color-contrast", "color-contrast-enhanced", "link-name", "image-alt"]).analyze();
      expect(result.violations).toEqual([]);
      const link = shelf.getByRole("link", { name: "View Wi-Fi Router in the shop" });
      await expect(link).toHaveAttribute("href", "/.netlify/functions/shopify-outbound?handle=network-router");
      await page.route("**/.netlify/functions/shopify-outbound?handle=network-router", (route) => route.fulfill({ contentType: "text/html", body: "<h1>Verified product destination</h1>" }));
      await link.focus();
      await page.keyboard.press("Enter");
      await expect(page.getByRole("heading", { name: "Verified product destination" })).toBeVisible();
    });
  }
}

test("empty and unavailable catalogs leave no empty promotion container", async ({ page }) => {
  await page.route("**/.netlify/functions/shopify-catalog*", (route) => route.fulfill({ json: { products: [] } }));
  await Promise.all([
    page.waitForResponse((response) => response.url().includes("/.netlify/functions/shopify-catalog") && response.status() === 200),
    page.goto("/aws-free-tier-honest-guide/"),
  ]);
  await expect(page.locator("article[itemtype='http://schema.org/Article'] .shopify-spotlight")).toHaveCount(0);
  await page.unroute("**/.netlify/functions/shopify-catalog*");
  await page.route("**/.netlify/functions/shopify-catalog*", (route) => route.fulfill({ status: 503, json: { products: [] } }));
  await page.route("https://realmallofamerica.myshopify.com/api/**", (route) => route.abort());
  await Promise.all([
    page.waitForEvent("requestfailed", (request) => request.url().startsWith(`${merchant}/api/`)),
    page.reload(),
  ]);
  await expect(page.locator("article[itemtype='http://schema.org/Article'] .shopify-spotlight")).toHaveCount(0);
  await expect(page.locator("h1")).toHaveCount(1);
});

const targetedFixtures = [
  fixture,
  ...[
    ["monitor", "Workspace Monitor", "Monitors", "210.00"],
    ["desk", "Adjustable Desk", "Desks", "280.00"],
    ["keyboard-one", "Mechanical Keyboard One", "Keyboards", "40.00"],
    ["keyboard-two", "Mechanical Keyboard Two", "Keyboards", "45.00"],
    ["keyboard-three", "Mechanical Keyboard Three", "Keyboards", "50.00"],
    ["mouse", "USB Mouse", "Mice", "25.00"],
    ["deskmat", "Mouse Pad", "Deskmat", "15.00"],
    ["printer-ink", "Printer Ink Cartridge", "School, Office & Art Supplies", "19.00"],
    ["cloud-headset", "HyperX Cloud Headset", "Headphones", "80.00"],
    ["graphic-liner", "Graphic Liner", "Water-Activated Graphic Liners", "10.00"],
  ].map(([handle, title, productType, amount], index) => ({ ...fixture, id: `gid://shopify/Product/${index + 10}`, handle, title, productType, onlineStoreUrl: `${merchant}/products/${handle}`, selectedOrFirstAvailableVariant: { ...fixture.selectedOrFirstAvailableVariant, price: { amount, currencyCode: "USD" } } })),
];

test("page context changes product categories, and separate placements never repeat a product", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("analytics-consent", "denied"));
  await page.route("**/.netlify/functions/shopify-catalog*", route => route.fulfill({ json: { products: targetedFixtures } }));
  const contexts = [
    ["/aws-free-tier-honest-guide/", "cloud-networking", ["Wi-Fi Router"]],
    ["/", "business-workspace", ["Workspace Monitor", "Adjustable Desk"]],
    ["/pricing/", "budget-workspace", ["Mechanical Keyboard One", "Mechanical Keyboard Two", "Mechanical Keyboard Three", "USB Mouse", "Mouse Pad"]],
    ["/web-developer-rockford-illinois/", "business-operations", ["Wi-Fi Router", "Printer Ink Cartridge"]],
  ] as const;
  for (const [path, topic, expected] of contexts) {
    await page.goto(path);
    const shelves = page.locator(`.shopify-spotlight[data-shopify-topic='${topic}']`);
    await expect(shelves.first()).toBeVisible();
    await expect(shelves.locator(".shopify-product h3")).toHaveCount(expected.length);
    expect(new Set(await shelves.locator(".shopify-product h3").allTextContents())).toEqual(new Set(expected));
    const links = await shelves.locator(".shopify-product__link").evaluateAll(elements => elements.map(element => element.getAttribute("href")));
    expect(new Set(links).size).toBe(links.length);
  }
  await page.goto("/native-react/");
  await expect(page.locator("[data-shopify-placement='article-intro']")).toBeVisible();
  await expect(page.locator("[data-shopify-placement='article-end']")).toBeVisible();
  const links = await page.locator("article[itemtype='http://schema.org/Article'] .shopify-product__link").evaluateAll(elements => elements.map(element => element.getAttribute("href")));
  expect(links).toHaveLength(3);
  expect(new Set(links).size).toBe(3);
  await expect(page.getByRole("navigation", { name: "Table of contents" }).getByText("Keyboard and mouse gear")).toHaveCount(0);
});

test("security articles hide ads when the catalog has no security hardware", async ({ page }) => {
  await page.route("**/.netlify/functions/shopify-catalog*", route => route.fulfill({ json: { products: targetedFixtures } }));
  await Promise.all([
    page.waitForResponse(response => response.url().includes("/.netlify/functions/shopify-catalog")),
    page.goto("/secure-authentication-cognito-react/"),
  ]);
  await expect(page.locator(".shopify-spotlight")).toHaveCount(0);
  await expect(page.locator("h1")).toHaveCount(1);
  await page.goto("/privacy/");
  await expect(page.locator(".shopify-spotlight")).toHaveCount(0);
});
