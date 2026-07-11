const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Pre-seed Ocean state before any page script runs.
  await page.addInitScript(() => {
    localStorage.setItem(
      "bm-style-lab",
      JSON.stringify({ activePresetId: "ocean", customVariables: {}, mode: "dark" })
    );
    // Track every write to the key.
    const origSetItem = Storage.prototype.setItem;
    window.__writes = [];
    Storage.prototype.setItem = function (key, value) {
      if (key === "bm-style-lab") {
        window.__writes.push({ value, stack: new Error().stack.split("\n").slice(1, 5).join(" | ") });
      }
      return origSetItem.call(this, key, value);
    };
  });

  await page.goto("http://localhost:9000/recruiter/");
  await page.waitForTimeout(4000);

  const result = await page.evaluate(() => ({
    stored: localStorage.getItem("bm-style-lab"),
    writes: window.__writes,
  }));
  console.log(JSON.stringify(result, null, 2));

  await browser.close();
})();
