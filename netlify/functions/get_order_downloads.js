const { json } = require("./_response");
const { query, ensureOrdersSchema } = require("./_db");
const { getAuthedEmail } = require("./_identity");
const { signToken } = require("./_downloadTokens");

const TOKEN_TTL_SECONDS = 60 * 15;

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

  const tokenSecret = process.env.DOWNLOAD_TOKEN_SECRET;
  if (!tokenSecret) {
    return json(500, { error: "server_error", message: "Download token secret not configured." });
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch (error) {
    return json(400, { error: "invalid_json", message: "Invalid JSON body." });
  }

  const orderId = payload.order_id;
  if (!orderId) {
    return json(400, { error: "missing_order", message: "order_id is required." });
  }

  const authedEmail = await getAuthedEmail(event);
  let email = authedEmail;
  let lookupToken = null;

  if (!authedEmail) {
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

    const params = [orderId, email.trim()];
    const tokenClause = authedEmail ? "" : "AND lookup_token = $3";
    if (!authedEmail) params.push(lookupToken.trim());

    const orderResult = await query(
      `SELECT id, status
       FROM orders
       WHERE id = $1
         AND lower(customer_email) = lower($2)
         ${tokenClause}`,
      params
    );

    if (orderResult.rowCount === 0) {
      return json(404, { error: "not_found", message: "Order not found." });
    }

    const order = orderResult.rows[0];
    if (order.status !== "paid") {
      return json(403, { error: "not_authorized", message: "Order is not active." });
    }

    const itemsResult = await query(
      `SELECT p.id, p.name, p.file_key, oi.quantity
       FROM order_items oi
       JOIN products p ON p.id = oi.product_id
       WHERE oi.order_id = $1`,
      [order.id]
    );

    const now = Math.floor(Date.now() / 1000);
    const expiresAt = now + TOKEN_TTL_SECONDS;

    const downloads = itemsResult.rows.map((item) => {
      const token = signToken(
        {
          file_key: item.file_key,
          product_id: item.id,
          order_id: order.id,
          exp: expiresAt,
        },
        tokenSecret
      );

      return {
        product_id: item.id,
        name: item.name,
        quantity: item.quantity,
        download_url: `/.netlify/functions/download?token=${token}`,
        expires_at: expiresAt,
      };
    });

    return json(200, { order_id: order.id, downloads });
  } catch (error) {
    console.error("get_order_downloads error", error);
    return json(500, { error: "server_error", message: "Unable to fetch downloads." });
  }
};
