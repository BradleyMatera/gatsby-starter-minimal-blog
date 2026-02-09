const { json } = require("./_response");
const { query } = require("./_db");

exports.handler = async (event) => {
  const slug = event.queryStringParameters?.slug;

  if (!slug) {
    return json(400, { error: "missing_slug", message: "slug is required." });
  }

  try {
    const result = await query(
      `SELECT id, slug, name, description, price_cents, currency,
              COALESCE(product_type, 'direct') AS product_type,
              affiliate_url, affiliate_source, display_price
       FROM products
       WHERE slug = $1 AND active = true
       LIMIT 1`,
      [slug]
    );

    if (result.rowCount === 0) {
      return json(404, { error: "not_found", message: "Product not found." });
    }

    return json(200, { product: result.rows[0] });
  } catch (error) {
    console.error("get_product error", error);
    return json(500, { error: "server_error", message: "Unable to load product." });
  }
};
