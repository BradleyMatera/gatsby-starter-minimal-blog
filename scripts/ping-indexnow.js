#!/usr/bin/env node
/**
 * Post-build IndexNow ping for Bing instant indexing.
 * Submits the sitemap URLs to Bing's IndexNow API.
 */
const https = require("https");
const { readFileSync } = require("fs");
const { join } = require("path");

const INDEXNOW_KEY = "066018fe01b8945f43b635cc715e4f50";
const SITE = "bradleymatera.dev";
const SITEMAP_PATH = join(__dirname, "..", "public", "sitemap.xml", "sitemap-0.xml");

function extractUrlsFromSitemap(sitemapXml) {
  const urls = [];
  const locRegex = /<loc>(.*?)<\/loc>/g;
  let match;
  while ((match = locRegex.exec(sitemapXml)) !== null) {
    urls.push(match[1].trim());
  }
  return urls;
}

function pingIndexNow(urls) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      host: SITE,
      key: INDEXNOW_KEY,
      keyLocation: `https://${SITE}/${INDEXNOW_KEY}.txt`,
      urlList: urls.slice(0, 10000),
    });

    const options = {
      hostname: "api.indexnow.org",
      port: 443,
      path: "/IndexNow",
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Length": Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        console.log(`IndexNow response: ${res.statusCode} ${res.statusMessage}`);
        resolve({ statusCode: res.statusCode, body: data });
      });
    });

    req.on("error", (err) => {
      console.error("IndexNow ping failed:", err.message);
      resolve({ statusCode: 0, error: err.message });
    });

    req.write(body);
    req.end();
  });
}

async function main() {
  try {
    const sitemapContent = readFileSync(SITEMAP_PATH, "utf8");
    const urls = extractUrlsFromSitemap(sitemapContent);
    console.log(`IndexNow: Found ${urls.length} URLs in sitemap`);

    if (urls.length === 0) {
      console.log("IndexNow: No URLs to submit, skipping");
      return;
    }

    console.log(`IndexNow: Pinging Bing with ${Math.min(urls.length, 10000)} URLs...`);
    const result = await pingIndexNow(urls);

    if (result.statusCode === 200) {
      console.log("IndexNow: URLs submitted successfully");
    } else if (result.statusCode === 202) {
      console.log("IndexNow: URLs accepted for processing");
    } else {
      console.log(`IndexNow: Completed with status ${result.statusCode}`);
    }
  } catch (err) {
    console.error("IndexNow: Skipping due to error:", err.message);
  }
}

main();
