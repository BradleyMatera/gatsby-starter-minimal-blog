import { test, expect, type Page } from "@playwright/test";

/* --------------------------------------------------------------------------
   SEO audit regression tests.

   Verifies P0 items from the independent SEO audit:
   - Exactly one canonical per page
   - Stable @id references in JSON-LD (Person, WebSite)
   - No build-date dateModified on non-article pages
   - Demo pages contain fictional business disclosure
   - No banned unsupported claims on city pages
   - robots.txt has exactly one sitemap declaration

   Run with: npm run test:e2e (requires dev server on localhost:8000)
   -------------------------------------------------------------------------- */

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

const CITY_PAGES = [
  "/web-developer-rockford-illinois/",
  "/web-developer-freeport-illinois/",
  "/web-developer-durand-davis-illinois/",
  "/web-developer-winnebago-illinois/",
  "/web-developer-pecatonica-illinois/",
];

const KEY_PAGES = [
  "/",
  "/about/",
  "/contact/",
  "/pricing/",
  "/recruiter/",
];

async function getCanonicalCount(page: Page): Promise<number> {
  return page.locator('link[rel="canonical"]').count();
}

async function getJSONLD(page: Page): Promise<Record<string, unknown>[]> {
  const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();
  return scripts
    .map((s) => {
      try {
        return JSON.parse(s);
      } catch {
        return null;
      }
    })
    .filter((s): s is Record<string, unknown> => s !== null);
}

test.describe("SEO audit regression", () => {
  test.describe("canonical links", () => {
    for (const url of KEY_PAGES) {
      test(`exactly one canonical on ${url}`, async ({ page }) => {
        await page.goto(url);
        const count = await getCanonicalCount(page);
        expect(count).toBe(1);
      });
    }
  });

  test.describe("JSON-LD stable IDs", () => {
    test("homepage has Person with @id /#person", async ({ page }) => {
      await page.goto("/");
      const scripts = await getJSONLD(page);
      const allJSON = JSON.stringify(scripts);
      expect(allJSON).toContain("/#person");
    });

    test("homepage has WebSite with @id /#website", async ({ page }) => {
      await page.goto("/");
      const scripts = await getJSONLD(page);
      const allJSON = JSON.stringify(scripts);
      expect(allJSON).toContain("/#website");
    });

    test("homepage has no duplicate Person/WebSite graph", async ({ page }) => {
      await page.goto("/");
      const scripts = await getJSONLD(page);
      const allJSON = JSON.stringify(scripts);
      const personCount = (allJSON.match(/"@type":"Person"/g) || []).length;
      const websiteCount = (allJSON.match(/"@type":"WebSite"/g) || []).length;
      expect(personCount).toBe(1);
      expect(websiteCount).toBe(1);
    });

    test("about page has Person with @id /#person", async ({ page }) => {
      await page.goto("/about/");
      const scripts = await getJSONLD(page);
      const allJSON = JSON.stringify(scripts);
      expect(allJSON).toContain("/#person");
    });
  });

  test.describe("no synthetic freshness", () => {
    test("homepage has no dateModified on WebPage", async ({ page }) => {
      await page.goto("/");
      const scripts = await getJSONLD(page);
      const allJSON = JSON.stringify(scripts);
      const webPageMatch = allJSON.match(/"@type":"WebPage"[^}]*}/);
      if (webPageMatch) {
        expect(webPageMatch[0]).not.toContain("dateModified");
      }
    });

    test("pricing page has no dateModified on WebPage", async ({ page }) => {
      await page.goto("/pricing/");
      const scripts = await getJSONLD(page);
      const allJSON = JSON.stringify(scripts);
      const webPageMatch = allJSON.match(/"@type":"WebPage"[^}]*}/);
      if (webPageMatch) {
        expect(webPageMatch[0]).not.toContain("dateModified");
      }
    });
  });

  test.describe("demo fictional disclosures", () => {
    for (const slug of DEMO_SLUGS) {
      test(`demo ${slug} has fictional disclosure`, async ({ page }) => {
        await page.goto(`/demos/${slug}/`);
        const bodyText = await page.locator("body").textContent();
        expect(bodyText?.toLowerCase()).toContain("concept demo");
        expect(bodyText?.toLowerCase()).toContain("fictional");
      });

      test(`demo ${slug} title contains "Concept Demo"`, async ({ page }) => {
        await page.goto(`/demos/${slug}/`);
        const title = await page.title();
        expect(title.toLowerCase()).toContain("concept demo");
      });
    }
  });

  test.describe("no unsupported claims on city pages", () => {
    for (const url of CITY_PAGES) {
      test(`no "under 2 seconds" on ${url}`, async ({ page }) => {
        await page.goto(url);
        const bodyText = await page.locator("body").textContent();
        expect(bodyText?.toLowerCase()).not.toContain("under 2 seconds");
      });

      test(`no "faster than most" on ${url}`, async ({ page }) => {
        await page.goto(url);
        const bodyText = await page.locator("body").textContent();
        expect(bodyText?.toLowerCase()).not.toContain("faster than most");
      });

      test(`no "ranks locally" on ${url}`, async ({ page }) => {
        await page.goto(url);
        const bodyText = await page.locator("body").textContent();
        expect(bodyText?.toLowerCase()).not.toContain("ranks locally");
      });

      test(`warranty wording matches refund policy on ${url}`, async ({ page }) => {
        await page.goto(url);
        const bodyText = await page.locator("body").textContent();
        expect(bodyText?.toLowerCase()).not.toContain("after the first round of revisions, you get your deposit back");
      });
    }
  });

  test.describe("robots.txt", () => {
    test("has exactly one sitemap declaration", async ({ request }) => {
      const response = await request.get("/robots.txt");
      const text = await response.text();
      const sitemapCount = (text.match(/^Sitemap:/gim) || []).length;
      expect(sitemapCount).toBe(1);
    });
  });

  test.describe("static HTML content", () => {
    for (const url of KEY_PAGES) {
      test(`${url} has h1 in static HTML`, async ({ page }) => {
        await page.goto(url);
        const h1Count = await page.locator("h1").count();
        expect(h1Count).toBeGreaterThanOrEqual(1);
      });
    }
  });
});
