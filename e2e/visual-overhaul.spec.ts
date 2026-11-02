import { styleLabPresets } from "../src/site/lib/styleLabPresets";
import { colorContrast } from "../src/site/lib/colorContrast";
import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("analytics-consent", "denied"));
});

test("mobile navigation contains the main destinations, closes on Escape and restores focus", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/");
  const opener = page.getByRole("button", { name: "Open menu", exact: true });
  await opener.click();
  const menu = page.getByRole("dialog", { name: "Explore Matera Digital" });
  await expect(menu).toBeVisible();
  await expect(menu.getByRole("link", { name: "Recruiter hub", exact: true })).toHaveAttribute("href", "/recruiter/");
  await page.keyboard.press("Escape");
  await expect(menu).not.toBeVisible();
  await expect(opener).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("appearance dialog is keyboard dismissible and an explicit theme survives navigation", async ({ page }) => {
  await page.goto("/");
  const appearance = page.getByRole("button", { name: "Open appearance settings" });
  await appearance.click();
  const dialog = page.getByRole("dialog", { name: "Appearance", exact: true });
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: "Dark", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.keyboard.press("Escape");
  await expect(appearance).toBeFocused();
  await page.goto("/recruiter/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("contact validation focuses the first invalid field and preserves entries after a failed request", async ({ page }) => {
  await page.route("**/.netlify/functions/contact-submit", route => route.fulfill({ status: 503, body: "Unavailable" }));
  await page.goto("/contact/?city=Durand&package=Growth");
  const submit = page.getByRole("button", { name: "Get my free website plan", exact: true });
  await submit.click();
  await expect(page.getByLabel("Name *", { exact: true })).toBeFocused();
  await expect(page.getByLabel("Name *", { exact: true })).toHaveAttribute("aria-invalid", "true");
  await page.getByLabel("Name *", { exact: true }).fill("Preview Tester");
  await page.getByLabel("Business name *", { exact: true }).fill("Example Business");
  await page.getByLabel("Email or phone *", { exact: true }).fill("tester@example.com");
  await expect(page.getByLabel("City", { exact: true })).toHaveValue("Durand");
  await expect(page.getByLabel("Service or package", { exact: true })).toHaveValue("Growth");
  await submit.click();
  await expect(page.getByRole("alert")).toBeVisible();
  await expect(page.getByRole("alert")).toBeFocused();
  await expect(page.getByLabel("Business name *", { exact: true })).toHaveValue("Example Business");
});

test("contact submission locks while sending and announces a confirmed success", async ({ page }) => {
  let release: () => void = () => {};
  const pending = new Promise<void>(resolve => { release = resolve; });
  let submissions = 0;
  await page.route("**/.netlify/functions/contact-submit", async route => {
    submissions += 1;
    await pending;
    await route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' });
  });
  await page.goto("/contact/");
  await page.getByLabel("Name *", { exact: true }).fill("Preview Tester");
  await page.getByLabel("Business name *", { exact: true }).fill("Example Business");
  await page.getByLabel("Email or phone *", { exact: true }).fill("tester@example.com");
  await page.getByRole("button", { name: "Get my free website plan", exact: true }).click();
  await expect(page.getByRole("button", { name: "Sending your message…" })).toBeDisabled();
  release();
  await expect(page.getByRole("status").filter({ hasText: "Thanks" })).toBeFocused();
  expect(submissions).toBe(1);
});

for (const path of ["/", "/pricing/", "/services/", "/services/website-redesign/", "/process/", "/contact/"]) {
  test(`layout reflows at 320px: ${path}`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  });
}


test("all preset text and action colors meet enhanced contrast against their surfaces", () => {
  for (const preset of styleLabPresets) {
    for (const foreground of ["text", "text-subtle", "link", "accent"]) {
      for (const background of ["page-bg", "surface", "surface-alt", "surface-muted", "accent-soft"]) {
        expect(colorContrast(preset.variables[`--color-${foreground}`], preset.variables[`--color-${background}`]), `${preset.id}: ${foreground} on ${background}`).toBeGreaterThanOrEqual(7);
      }
    }
    expect(colorContrast(preset.variables["--color-text-inverse"], preset.variables["--color-accent"]), `${preset.id}: button`).toBeGreaterThanOrEqual(7);
  }
});


test("homepage comparison supports keys and leaves normal scrolling available", async ({ page }) => {
  await page.goto("/");
  const comparison = page.getByRole("slider", { name: "Drag to compare the old website with the new one" });
  await comparison.focus();
  await page.keyboard.press("End");
  await expect(comparison).toHaveAttribute("aria-valuenow", "100");
  await page.keyboard.press("Home");
  await page.keyboard.press("ArrowRight");
  await expect(comparison).toHaveAttribute("aria-valuenow", "4");
  await page.locator(".hero-ba__viewport").hover();
  await page.mouse.wheel(0, 500);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(100);
  await expect(comparison).toHaveAttribute("aria-valuenow", "4");
});
