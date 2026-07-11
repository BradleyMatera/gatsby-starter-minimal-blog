const { chromium } = require('playwright');
const { AxeBuilder } = require('@axe-core/playwright');
const fs = require('fs');
const path = require('path');

const env = process.argv[2] || 'production';
const baseUrl = process.env.BASE_URL || (env === 'local' ? 'http://localhost:8888' : 'https://bradleymatera.dev');
const resultsDir = path.join(__dirname, 'results');
const screenshotsDir = path.join(__dirname, 'screenshots', env);

const viewports = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
];

const pages = [
  { path: '/', name: 'home' },
  { path: '/blog/', name: 'blog' },
  { path: '/store/', name: 'store' },
  { path: '/purchases/', name: 'purchases' },
  { path: '/contact/', name: 'contact' },
  { path: '/web-developer-durand-davis-illinois/', name: 'local-landing' },
  { path: '/recruiter/', name: 'recruiter' },
  { path: '/404', name: '404' },
  { path: '/blog/custom-software-development-illinois/', name: 'blog-post' },
];

if (!fs.existsSync(resultsDir)) fs.mkdirSync(resultsDir, { recursive: true });
if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });

function slugify(name) {
  return name.replace(/[^a-z0-9]/gi, '-').toLowerCase();
}

async function analyzePage(browser, pageConfig, viewport) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  const logs = [];
  const pageErrors = [];
  const failedRequests = [];

  page.on('console', msg => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      logs.push({ type: msg.type(), text: msg.text() });
    }
  });
  page.on('pageerror', err => pageErrors.push(err.message));
  page.on('response', async response => {
    if (response.status() >= 400) {
      failedRequests.push({ url: response.url(), status: response.status() });
    }
  });

  const url = `${baseUrl}${pageConfig.path}`;
  try {
    const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(1000);

    const screenshotPath = path.join(screenshotsDir, `${pageConfig.name}-${viewport.name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });

    let axeResults = { violations: [] };
    try {
      axeResults = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    } catch (e) {
      axeResults = { violations: [], error: e.message };
    }

    const isDark = await page.evaluate(() => {
      return document.documentElement.getAttribute('data-color-mode') || document.body.getAttribute('data-color-mode') || 'unknown';
    });

    const pageTitle = await page.title();
    const mainTag = await page.locator('main').count();
    const h1Count = await page.locator('h1').count();
    const h2Count = await page.locator('h2').count();

    await context.close();

    return {
      url,
      page: pageConfig.name,
      viewport: viewport.name,
      status: response?.status(),
      title: pageTitle,
      screenshot: screenshotPath,
      axeViolations: axeResults.violations,
      consoleErrors: logs,
      pageErrors,
      failedRequests: failedRequests.slice(0, 20),
      theme: isDark,
      mainTagCount: mainTag,
      h1Count,
      h2Count,
    };
  } catch (e) {
    await context.close();
    return {
      url,
      page: pageConfig.name,
      viewport: viewport.name,
      error: e.message,
      consoleErrors: logs,
      pageErrors,
      failedRequests: failedRequests.slice(0, 20),
    };
  }
}

async function runThemeCheck(browser) {
  const context = await browser.newContext({ viewport: viewports[2] });
  const page = await context.newPage();
  try {
    await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle', timeout: 30000 });
    const toggle = page.locator('button[aria-label="Open Web Designer Lab"]:visible').first();
    const before = await page.evaluate(() => document.documentElement.getAttribute('data-theme') || 'unknown');
    if (await toggle.isVisible().catch(() => false)) {
      await toggle.click();
      await page.waitForTimeout(500);
      const panelVisible = await page.locator('.style-lab').isVisible().catch(() => false);
      let after = before;
      if (panelVisible) {
        const darkBtn = page.locator('.style-lab__mode-btn', { hasText: 'Dark' }).first();
        if (await darkBtn.isVisible().catch(() => false)) {
          await darkBtn.click();
          await page.waitForTimeout(500);
          after = await page.evaluate(() => document.documentElement.getAttribute('data-theme') || 'unknown');
        }
      }
      await context.close();
      return { before, after, toggleFound: true, panelVisible };
    }
    await context.close();
    return { before, toggleFound: false };
  } catch (e) {
    await context.close();
    return { error: e.message, toggleFound: false };
  }
}

async function runMobileMenuCheck(browser) {
  const context = await browser.newContext({ viewport: viewports[0] });
  const page = await context.newPage();
  try {
    await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle', timeout: 30000 });
    const menuButton = page.locator('button[aria-label="Open menu"], button[aria-label="Menu"], button:has-text("Menu"):visible').first();
    if (await menuButton.isVisible().catch(() => false)) {
      await menuButton.click();
      await page.waitForTimeout(500);
      const drawer = page.locator('nav[role="navigation"], [data-testid="mobile-menu"], aside, .drawer, .mobile-menu, [role="dialog"]').first();
      const drawerVisible = await drawer.isVisible().catch(() => false);
      await context.close();
      return { menuButtonFound: true, drawerVisible };
    }
    await context.close();
    return { menuButtonFound: false };
  } catch (e) {
    await context.close();
    return { error: e.message, menuButtonFound: false };
  }
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const results = [];

  for (const pageConfig of pages) {
    for (const viewport of viewports) {
      console.log(`Auditing ${pageConfig.name} at ${viewport.name}...`);
      const result = await analyzePage(browser, pageConfig, viewport);
      results.push(result);
    }
  }

  console.log('Running theme toggle check...');
  const themeCheck = await runThemeCheck(browser);

  console.log('Running mobile menu check...');
  const menuCheck = await runMobileMenuCheck(browser);

  await browser.close();

  const summary = {
    env,
    baseUrl,
    totalPages: pages.length,
    totalViewports: viewports.length,
    themeCheck,
    menuCheck,
    totalViolations: results.reduce((sum, r) => sum + (r.axeViolations?.length || 0), 0),
    totalConsoleErrors: results.reduce((sum, r) => sum + (r.consoleErrors?.length || 0), 0),
    totalPageErrors: results.reduce((sum, r) => sum + (r.pageErrors?.length || 0), 0),
    failedLoads: results.filter(r => r.error).length,
  };

  const reportPath = path.join(resultsDir, `audit-${env}.json`);
  fs.writeFileSync(reportPath, JSON.stringify({ summary, results }, null, 2));

  console.log('\n=== Audit Summary ===');
  console.log(`Environment: ${env}`);
  console.log(`Base URL: ${baseUrl}`);
  console.log(`Screenshots: ${screenshotsDir}`);
  console.log(`Results: ${reportPath}`);
  console.log(`Total axe violations: ${summary.totalViolations}`);
  console.log(`Total console errors: ${summary.totalConsoleErrors}`);
  console.log(`Total page errors: ${summary.totalPageErrors}`);
  console.log(`Failed loads: ${summary.failedLoads}`);
  console.log('=====================\n');
})();
