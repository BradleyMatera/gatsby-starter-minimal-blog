import { test, expect as baseExpect } from "@playwright/test";

const expect = baseExpect.configure({ timeout: 15000 });

test.setTimeout(120000);

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("analytics-consent", "denied"));
});

test("blog filters restore URLs, history, empty results and reset", async ({ page }) => {
  await page.goto("/blog/?q=AWS&category=cloud");
  await expect(page.getByLabel("Search blog posts")).toHaveValue("AWS");
  await expect(page.getByLabel("Category", { exact: true })).toHaveValue("cloud");
  await page.getByLabel("Category", { exact: true }).selectOption("all");
  await expect(page).not.toHaveURL(/category=cloud/);
  await page.goBack();
  await expect(page.getByLabel("Category", { exact: true })).toHaveValue("cloud");
  await page.goForward();
  await expect(page.getByLabel("Category", { exact: true })).toHaveValue("all");
  await page.getByLabel("Search blog posts").fill("no-matching-article-xyz-987");
  await expect(page.locator(".editorial-article-card")).toHaveCount(0);
  await expect(page.locator(".blog-empty-state")).toBeVisible();
  await page.getByRole("button", { name: "Clear all filters", exact: true }).first().focus();
  await page.keyboard.press("Enter");
  await expect(page.getByLabel("Search blog posts")).toHaveValue("");
  await expect(page.locator(".editorial-article-card")).toHaveCount(9);
  await expect(page).not.toHaveURL(/[?&](q|category|tag)=/);
});

test("project filters share URLs and retain explicit project actions", async ({ page }) => {
  await page.goto("/projects/?skill=Zig");
  await expect(page.getByLabel("Technology", { exact: true })).toHaveValue("Zig");
  await expect(page.locator(".editorial-project-card")).toHaveCount(1);
  await expect(page.locator(".editorial-project-card")).toContainText("OBJ Parser");
  await expect(page.locator(".editorial-project-card")).not.toHaveAttribute("role", "button");
  await page.getByRole("button", { name: "Clear all filters", exact: true }).click();
  await expect(page.locator(".editorial-project-card")).toHaveCount(11);
  await page.goBack();
  await expect(page.getByLabel("Technology", { exact: true })).toHaveValue("Zig");
  await page.goForward();
  await expect(page.getByLabel("Technology", { exact: true })).toHaveValue("");
  await page.getByLabel("Search projects").fill("no-matching-project-xyz-987");
  await expect(page.locator(".editorial-project-card")).toHaveCount(0);
  await expect(page.getByText("No projects match your filters.", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Clear all filters", exact: true }).click();
  const firstAction = page.locator(".editorial-project-card").first().locator(".card-actions a").first();
  await expect(firstAction).toHaveAttribute("href", "/projects/aws-serverless-metadata-workflow/");
  await firstAction.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/projects\/aws-serverless-metadata-workflow\/$/);
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.getByRole("navigation", { name: "Table of contents", exact: true })).toHaveCount(1);
});

test("topics have one collection with searchable, keyboard-operable links", async ({ page }) => {
  await page.goto("/tags/?q=aws");
  await expect(page.getByLabel("Search topics")).toHaveValue("aws");
  await expect(page.locator(".editorial-topic-list a")).toHaveCount(1);
  await page.locator(".editorial-topic-list a").focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/tags\/aws\/$/);
  await expect(page.locator(".tag-page table")).toHaveCount(0);
  const slugs = await page.locator(".blog-card__title a").evaluateAll((links) => links.map((link) => link.getAttribute("href")));
  expect(new Set(slugs).size).toBe(slugs.length);
});

test("same-page menu navigation restores unfiltered project state", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto("/projects/?skill=Zig");
  await expect(page.locator(".editorial-project-card")).toHaveCount(1);
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  await page.getByRole("navigation", { name: "More pages", exact: true }).getByRole("link", { name: "Projects", exact: true }).click();
  await expect(page).toHaveURL(/\/projects\/$/);
  await expect(page.locator(".editorial-project-card")).toHaveCount(11);
  await expect(page.getByLabel("Technology", { exact: true })).toHaveValue("");
});

test("article contents preserve anchors and code has keyboard copy feedback", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/aws-free-tier-honest-guide/");
  const contents = page.getByRole("navigation", { name: "Table of contents", exact: true });
  await expect(contents).toHaveCount(1);
  await expect(page.locator(".sponsored-panel, .article-outline")).toHaveCount(0);
  const firstLink = contents.locator("a").first();
  const anchor = await firstLink.getAttribute("href");
  await firstLink.focus();
  await page.keyboard.press("Enter");
  expect(new URL(page.url()).hash).toBe(anchor);
  await page.goto("/github-actions-aws/");
  const copy = page.getByRole("button", { name: "Copy code", exact: true }).first();
  await expect(copy).toBeVisible();
  await copy.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".editorial-code__status").first()).toHaveText("Copied to clipboard");
});

test("reading pages hydrate without browser errors", async ({ page }) => {
  const errors: string[] = [];
  let currentRoute = "";
  page.on("pageerror", (error) => errors.push(`${currentRoute}: ${error.message}`));
  for (const route of [
    "/about/", "/contributions/", "/open-source-contributions/", "/support/", "/image-credits/",
    "/roles/", "/roles/ai-automation-engineer/", "/roles/backend-engineer/", "/roles/cloud-engineer/", "/roles/devops-engineer/", "/roles/full-stack-engineer/",
    "/projects/animal-sounds/", "/projects/aws-serverless-metadata-workflow/", "/projects/car-match/", "/projects/cheesemath/", "/projects/ciris-ai/", "/projects/convo-ai/", "/projects/interactive-pokedex/", "/projects/obj-parser/", "/projects/projecthub/", "/projects/securelearn-lms/", "/projects/triangle-shader-lab/",
    "/terms/", "/privacy/", "/payment-terms/", "/refund-policy/", "/digital-product-license/",
  ]) {
    currentRoute = route;
    await page.goto(route);
    await expect(page.locator("h1")).toHaveCount(1);
    await page.getByRole("button", { name: "Open appearance settings", exact: true }).click();
    await expect(page.getByRole("dialog", { name: "Appearance", exact: true })).toBeVisible();
    await page.keyboard.press("Escape");
  }
  expect(errors).toEqual([]);
});

for (const width of [320, 768]) {
  test(`editorial families reflow and operate at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/blog/", "/projects/", "/projects/car-match/", "/roles/backend-engineer/", "/tags/", "/aws-free-tier-honest-guide/", "/about/", "/support/", "/privacy/", "/image-credits/"]) {
      await page.goto(route);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator(".editorial-page")).toBeVisible();
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    }
    await page.goto("/blog/");
    const filters = page.locator(".editorial-filters");
    if (width === 320) {
      await expect(filters).not.toHaveAttribute("open", "");
      await filters.locator("summary").focus();
      await page.keyboard.press("Enter");
    }
    await expect(page.getByLabel("Category", { exact: true })).toBeVisible();
    await page.getByLabel("Category", { exact: true }).selectOption("cloud");
    await expect(page).toHaveURL(/category=cloud/);
    await page.screenshot({ path: `output/playwright/editorial/blog-${width}.png`, fullPage: true });
    await page.goto("/projects/?skill=Zig");
    await expect(page.locator(".editorial-project-card")).toHaveCount(1);
    await page.getByRole("link", { name: "OBJ Parser write-up", exact: true }).focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/projects\/obj-parser\/$/);
  });
}
