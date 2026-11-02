const { resolveDestination } = require("../../src/features/shopify/catalog-core");

const createOutboundHandler = (fetchImpl = fetch) => async (event) => {
  const headers = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow", "X-Content-Type-Options": "nosniff" };
  if (event.httpMethod !== "GET") return { statusCode: 405, headers: { ...headers, Allow: "GET" }, body: "Method not allowed" };
  const destination = await resolveDestination(event.queryStringParameters?.handle, fetchImpl);
  return { statusCode: 303, headers: { ...headers, Location: destination }, body: "Continue to the store" };
};

exports.createOutboundHandler = createOutboundHandler;
exports.handler = createOutboundHandler();
