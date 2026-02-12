const { json } = require("./_response");
const { query, ensureOrdersSchema } = require("./_db");
const { getAuthedEmail } = require("./_identity");

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return json(200, { ok: true });
  }

  if (event.httpMethod !== "POST") {
    return json(405, { error: "method_not_allowed", message: "Use POST." });
  }

  const authedEmail = await getAuthedEmail(event);
  if (!authedEmail) {
    return json(401, { error: "unauthorized", message: "Sign in required." });
  }

  try {
    await ensureOrdersSchema();
    const queryParams = [authedEmail.trim()];
    const result = await query(
      `SELECT
         o.id,
         o.status,
         o.created_at,
         o.customer_email,
         o.stripe_session_id,
         COALESCE(
           json_agg(
             json_build_object(
               'product_id', p.id,
               'name', p.name,
               'slug', p.slug,
               'quantity', oi.quantity,
               'unit_price_cents', oi.unit_price_cents
             )
           ) FILTER (WHERE oi.id IS NOT NULL),
           '[]'::json
         ) AS items
       FROM orders o
       LEFT JOIN order_items oi ON oi.order_id = o.id
       LEFT JOIN products p ON p.id = oi.product_id
       WHERE lower(o.customer_email) = lower($1)
       GROUP BY o.id
       ORDER BY o.created_at DESC`,
      queryParams
    );

    return json(200, { orders: result.rows || [] });
  } catch (error) {
    console.error("get_orders_by_email error", error);
    return json(500, { error: "server_error", message: "Unable to fetch orders." });
  }
};
