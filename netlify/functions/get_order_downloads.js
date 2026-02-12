const { json } = require("./_response");
const { query, ensureOrdersSchema } = require("./_db");
const { getAuthedEmail } = require("./_identity");
const { signToken } = require("./_downloadTokens");
const { sendDownloadReadyEmail } = require("./_email");

const TOKEN_TTL_SECONDS = 60 * 15;

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
  if (!authedEmail) {
    return json(401, { error: "unauthorized", message: "Sign in required." });
  }

  try {
    await ensureOrdersSchema();

    const params = [orderId, authedEmail.trim()];

    const orderResult = await query(
      `SELECT id, status, customer_email, download_links_last_sent_at
       FROM orders
       WHERE id = $1
         AND lower(customer_email) = lower($2)
        `,
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

    const proto = event.headers?.["x-forwarded-proto"] || "http";
    const host = event.headers?.host || "";
    const origin = host ? `${proto}://${host}` : (process.env.SITE_URL || "").replace(/\/$/, "");
    const downloadBase = origin ? `${origin}/.netlify/functions/download` : "/.netlify/functions/download";

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
        download_url: `${downloadBase}?token=${token}`,
        expires_at: expiresAt,
      };
    });

    if (order.customer_email) {
      const lastSent = order.download_links_last_sent_at
        ? new Date(order.download_links_last_sent_at).getTime()
        : 0;
      const now = Date.now();
      const sixHours = 6 * 60 * 60 * 1000;

      if (!lastSent || now - lastSent > sixHours) {
        sendDownloadReadyEmail({
          to: order.customer_email,
          orderId: order.id,
          sessionId: null,
          purchaseDate: new Date().toISOString(),
        })
          .then((sent) => {
            if (sent) {
              return query(
                "UPDATE orders SET download_links_last_sent_at = NOW() WHERE id = $1",
                [order.id]
              );
            }
            return null;
          })
          .catch((error) => {
            console.error("Failed to send download-ready email", error);
          });
      }
    }

    return json(200, { order_id: order.id, downloads });
  } catch (error) {
    console.error("get_order_downloads error", error);
    return json(500, { error: "server_error", message: "Unable to fetch downloads." });
  }
};
