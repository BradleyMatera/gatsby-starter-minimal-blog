const { fetchCatalog, rankProducts, MERCHANT_NAME, CATALOG_TTL_MS } = require("../../src/features/shopify/catalog-core");

const createCatalogHandler = (fetchImpl = fetch, now = Date.now) => {
  let cached;
  let expiresAt = 0;
  let pending;
  return async (event) => {
    const headers = { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" };
    if (event.httpMethod !== "GET") return { statusCode: 405, headers: { ...headers, Allow: "GET" }, body: JSON.stringify({ products: [] }) };
    try {
      if (!cached || now() >= expiresAt) {
        if (!pending) pending = fetchCatalog(fetchImpl).then((products) => { cached = products; expiresAt = now() + CATALOG_TTL_MS; return products; }).finally(() => { pending = undefined; });
        await pending;
      }
      let context = event.queryStringParameters?.q || "";
      if (event.queryStringParameters?.context) {
        try { context = JSON.parse(event.queryStringParameters.context.slice(0, 5000)); } catch { context = {}; }
      }
      const products = rankProducts(cached, context, event.queryStringParameters?.limit || 3);
      return { statusCode: 200, headers, body: JSON.stringify({ merchant: MERCHANT_NAME, products }) };
    } catch {
      cached = undefined;
      return { statusCode: 503, headers, body: JSON.stringify({ merchant: MERCHANT_NAME, products: [] }) };
    }
  };
};

exports.createCatalogHandler = createCatalogHandler;
exports.handler = createCatalogHandler();
