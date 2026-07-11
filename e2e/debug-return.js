const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  page.on("console", (m) => {
    if (m.type() === "error") console.log("PAGE ERROR:", m.text().slice(0, 200));
  });
  page.on("pageerror", (e) => console.log("PAGEERROR:", e.message.slice(0, 200)));

  await page.addInitScript(() => {
    const origSetItem = Storage.prototype.setItem;
    window.__writes = window.__writes || [];
    Storage.prototype.setItem = function (key, value) {
      if (key === "bm-style-lab") {
        window.__writes.push({ value, path: window.location.pathname });
      }
      return origSetItem.call(this, key, value);
    };
  });

  await page.goto("http://localhost:9000/");
  await page.locator('button[aria-label="Open Web Designer Lab"]:visible').first().click();
  await page.locator(".style-lab__preset", { hasText: "Ocean" }).click();
  await page.locator(".style-lab__done").click();
  console.log("after preset:", await page.evaluate(() => ({
    bg: document.documentElement.style.getPropertyValue("--color-page-bg"),
    theme: document.documentElement.getAttribute("data-theme"),
    stored: localStorage.getItem("bm-style-lab"),
  })));

  await page.locator('a[href*="/recruiter"]:visible').first().click();
  await page.waitForURL("**/recruiter/**");
  await page.waitForTimeout(2000);
  console.log("on recruiter:", await page.evaluate(() => ({
    bg: document.documentElement.style.getPropertyValue("--color-page-bg"),
    theme: document.documentElement.getAttribute("data-theme"),
    path: window.location.pathname,
    stored: localStorage.getItem("bm-style-lab"),
    writes: window.__writes,
  })));

  await page.goBack();
  await page.waitForTimeout(3000);
  console.log("after goBack:", await page.evaluate(() => ({
    bg: document.documentElement.style.getPropertyValue("--color-page-bg"),
    theme: document.documentElement.getAttribute("data-theme"),
    path: window.location.pathname,
    stored: localStorage.getItem("bm-style-lab"),
    writes: window.__writes,
  })));

  await browser.close();
})();
