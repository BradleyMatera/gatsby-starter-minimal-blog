const { json } = require("./_response");
const { query } = require("./_db");

exports.handler = async () => {
  try {
    const result = await query(
      `SELECT id, slug, name, description, price_cents, currency,
              COALESCE(product_type, 'direct') AS product_type,
              affiliate_url, affiliate_source, display_price
       FROM products
       WHERE active = true
       ORDER BY created_at DESC`
    );

    return json(200, { products: result.rows });
  } catch (error) {
    console.error("list_products error", error);
    return json(500, { error: "server_error", message: "Unable to load products." });
  }
};
