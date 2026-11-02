import { test, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import AxeBuilder from "@axe-core/playwright";
import kebabCase from "lodash.kebabcase";

const posts = fs.readdirSync("content/posts", { withFileTypes: true }).filter(entry => entry.isDirectory()).map(entry => {
  const file = path.join("content/posts", entry.name, "index.mdx");
  if (!fs.existsSync(file)) return null;
  const { data } = matter(fs.readFileSync(file, "utf8"));
  const assetKey = String(data.slug || entry.name).replace(/^\/+|\/+$/g, "");
  return { slug: `/${String(data.slug || kebabCase(data.title)).replace(/^\/+|\/+$/g, "")}/`, assetKey, title: String(data.title) };
}).filter((post): post is { slug: string; assetKey: string; title: string } => post !== null);

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("analytics-consent", "denied"));
  await page.route("**/.netlify/functions/shopify-catalog*", route => route.fulfill({ json: { products: [] } }));
});

test("every article renders its unique cover, sharing image, and two body visuals", async ({ page }) => {
  test.setTimeout(180000);
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  const images = new Set<string>();
  for (const post of posts) {
    await page.goto(post.slug);
    await expect(page.locator("h1")).toHaveText(post.title);
    const cover = page.locator(".editorial-header .article-cover img");
    await expect(cover).toBeVisible();
    await expect.poll(() => cover.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
    const source = await cover.getAttribute("src");
    expect(source).toBe(`/images/blog/${post.assetKey}/cover.png`);
    expect(images.has(source!)).toBe(false);
    images.add(source!);
    await expect(page.locator("meta[property='og:image']")).toHaveAttribute("content", `https://bradleymatera.dev${source}`);
    await expect(page.locator(".post-content .article-visual")).toHaveCount(2);
  }
  expect(images.size).toBe(posts.length);
  expect(errors).toEqual([]);
});

for (const mode of ["light", "dark"] as const) {
  test(`article illustrations fit a 320px screen and keep readable contrast in ${mode}`, async ({ page }) => {
    test.setTimeout(120000);
    await page.setViewportSize({ width: 320, height: 900 });
    await page.addInitScript(value => localStorage.setItem("bm-style-lab", JSON.stringify({ activePresetId: null, customVariables: {}, mode: value })), mode);
    for (const slug of ["/aws-free-tier-honest-guide/", "/containerizing-multi-language-projects-with-docker-a-practical-guide/", "/from-medic-to-engineer/", "/obj-parser/", "/website-design-rockford-il-what-it-actually-costs-and-how-to-choose/", "/why-testing-matters/", "/wordpress-vs-static-site/"]) {
      await page.goto(slug);
      await expect(page.locator(".post-content .article-visual")).toHaveCount(2);
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
      const results = await new AxeBuilder({ page }).include(".article-visual").withRules(["color-contrast", "color-contrast-enhanced", "image-alt", "link-name", "aria-valid-attr-value"]).analyze();
      expect(results.violations, slug).toEqual([]);
    }
  });
}
