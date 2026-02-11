const { json } = require("./_response");
const { query, ensureOrdersSchema } = require("./_db");
const { getAuthedEmail } = require("./_identity");

const isValidEmail = (value) => {
  if (typeof value !== "string") return false;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
};

const isValidToken = (value) => {
  if (typeof value !== "string") return false;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length < 32 || trimmed.length > 128) return false;
  return /^[a-f0-9]+$/i.test(trimmed);
};

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return json(200, { ok: true });
  }

  if (event.httpMethod !== "POST") {
    return json(405, { error: "method_not_allowed", message: "Use POST." });
  }

  let authedEmail = await getAuthedEmail(event);
  let email = authedEmail;
  let lookupToken = null;
  email = authedEmail || null;

  if (!authedEmail) {
    let payload;
    try {
      payload = JSON.parse(event.body || "{}");
    } catch (error) {
      return json(400, { error: "invalid_json", message: "Invalid JSON body." });
    }

    email = payload.email;
    lookupToken = payload.lookup_token;

    if (!isValidEmail(email)) {
      return json(400, { error: "invalid_email", message: "Enter a valid email address." });
    }

    if (!isValidToken(lookupToken)) {
      return json(400, { error: "invalid_token", message: "Enter a valid order lookup code." });
    }
  }

  try {
    await ensureOrdersSchema();
    const queryParams = [email.trim()];
    let tokenClause = "";

    if (!authedEmail) {
      tokenClause = "AND o.lookup_token = $2";
      queryParams.push(lookupToken.trim());
    }

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
       ${tokenClause}
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
