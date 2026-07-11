import { test, expect, type Page } from "@playwright/test";

/* --------------------------------------------------------------------------
   E2E coverage for the Web Designer Style Lab and the Scout (ProjectHub)
   recruiter chat widget, including scoping/isolation between the two.
   Run with: npm run test:e2e (requires the dev server on localhost:8000)
   -------------------------------------------------------------------------- */

const OCEAN_PAGE_BG = "#050e18";
const DEFAULT_PAGE_BG = "#f3efe8";

const getRootVariable = (page: Page, name: string) =>
  page.evaluate((key) => document.documentElement.style.getPropertyValue(key).trim(), name);

const getDataTheme = (page: Page) =>
  page.evaluate(() => document.documentElement.getAttribute("data-theme"));

const openStyleLab = async (page: Page) => {
  await page.locator('button[aria-label="Open Web Designer Lab"]:visible').first().click();
  await expect(page.locator(".style-lab")).toBeVisible();
};

const applyPreset = async (page: Page, presetName: string) => {
  await openStyleLab(page);
  await page.locator(".style-lab__preset", { hasText: presetName }).click();
  await page.locator(".style-lab__done").click();
  await expect(page.locator(".style-lab")).toBeHidden();
};

const collectHydrationErrors = (page: Page): string[] => {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error" && /#418|#423|hydrat/i.test(msg.text())) {
      errors.push(msg.text());
    }
  });
  page.on("pageerror", (err) => {
    if (/#418|#423|hydrat/i.test(err.message)) errors.push(err.message);
  });
  return errors;
};

test.describe("Style Lab", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("toggle opens and closes the panel", async ({ page }) => {
    await openStyleLab(page);
    await expect(page.locator("#style-lab-title")).toHaveText("Web Designer Lab");
    await page.locator('button[aria-label="Close style lab"]').click();
    await expect(page.locator(".style-lab")).toBeHidden();
  });

  test("applying the Ocean preset changes page background and dark mode", async ({ page }) => {
    await applyPreset(page, "Ocean");
    expect(await getRootVariable(page, "--color-page-bg")).toBe(OCEAN_PAGE_BG);
    expect(await getDataTheme(page)).toBe("dark");
  });

  test("preset persists across reload", async ({ page }) => {
    await applyPreset(page, "Ocean");
    await page.reload();
    await page.waitForFunction(
      (expected) => document.documentElement.style.getPropertyValue("--color-page-bg").trim() === expected,
      OCEAN_PAGE_BG
    );
    expect(await getDataTheme(page)).toBe("dark");
  });

  test("reset restores Brad's Default", async ({ page }) => {
    await applyPreset(page, "Ocean");
    await openStyleLab(page);
    await page.locator(".style-lab__reset").click();
    await page.locator(".style-lab__done").click();
    expect(await getRootVariable(page, "--color-page-bg")).toBe(DEFAULT_PAGE_BG);
    expect(await getDataTheme(page)).toBe("light");
  });

  test("base mode switch enters custom mode and applies dark tokens", async ({ page }) => {
    await openStyleLab(page);
    await page.locator(".style-lab__mode-btn", { hasText: "Dark" }).click();
    await expect(page.locator(".style-lab__mode-btn", { hasText: "Dark" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    await page.locator(".style-lab__done").click();
    expect(await getDataTheme(page)).toBe("dark");
    expect(await getRootVariable(page, "--color-page-bg")).toBe("#000000");
  });
});

test.describe("Recruiter isolation", () => {
  test("style lab overrides are cleared on /recruiter/ and restored on return", async ({ page }) => {
    await page.goto("/");
    await applyPreset(page, "Ocean");
    expect(await getRootVariable(page, "--color-page-bg")).toBe(OCEAN_PAGE_BG);

    // Client-side navigate to the recruiter hub.
    await page.locator('a[href*="/recruiter"]:visible').first().click();
    await page.waitForURL("**/recruiter/**");
    await page.waitForFunction(
      () => document.documentElement.style.getPropertyValue("--color-page-bg").trim() === ""
    );
    expect(await getDataTheme(page)).toBe("dark");

    // Navigate back home — the preset should re-apply.
    await page.goBack();
    await page.waitForFunction(
      (expected) => document.documentElement.style.getPropertyValue("--color-page-bg").trim() === expected,
      OCEAN_PAGE_BG
    );
  });

  test("hard load of /recruiter/ has no style lab overrides", async ({ page }) => {
    await page.goto("/");
    await applyPreset(page, "Ocean");
    await page.goto("/recruiter/");
    await page.waitForFunction(
      () => document.documentElement.style.getPropertyValue("--color-page-bg").trim() === ""
    );
    expect(await getDataTheme(page)).toBe("dark");
  });
});

test.describe("Scout chat widget", () => {
  test("appears on /recruiter/ hard load without hydration errors", async ({ page }) => {
    const hydrationErrors = collectHydrationErrors(page);
    await page.goto("/recruiter/");
    await expect(page.locator("#bradley-chat")).toBeVisible({ timeout: 30_000 });
    expect(hydrationErrors).toEqual([]);
  });

  test("is not present on the homepage or blog", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(3000);
    await expect(page.locator("#bradley-chat")).toHaveCount(0);
    await page.goto("/blog/");
    await page.waitForTimeout(3000);
    await expect(page.locator("#bradley-chat")).toHaveCount(0);
  });

  test("survives recruiter -> home -> recruiter round trip", async ({ page }) => {
    await page.goto("/recruiter/");
    await expect(page.locator("#bradley-chat")).toBeVisible({ timeout: 30_000 });

    // Leave the recruiter hub — the widget must be hidden.
    await page.locator('a[href="/"]:visible').first().click();
    await page.waitForURL((url) => !url.pathname.startsWith("/recruiter"));
    await expect(page.locator("#bradley-chat")).toBeHidden();

    // Return — the widget must come back without re-injecting the script.
    await page.goBack();
    await page.waitForURL("**/recruiter/**");
    await expect(page.locator("#bradley-chat")).toBeVisible({ timeout: 15_000 });
    const scriptCount = await page.locator("#projecthub-chat-script").count();
    expect(scriptCount).toBeLessThanOrEqual(1);
  });
});
