const crypto = require("crypto");
const { json } = require("./_response");
const { query } = require("./_db");
const { stripe } = require("./_stripe");
const { signToken } = require("./_downloadTokens");

const TOKEN_TTL_SECONDS = 60 * 15;

exports.handler = async (event) => {
  const sessionId =
    event.queryStringParameters?.session_id ||
    (() => {
      try {
        const body = JSON.parse(event.body || "{}");
        return body.session_id;
      } catch (error) {
        return null;
      }
    })();

  if (!sessionId) {
    return json(400, { error: "missing_session", message: "session_id is required." });
  }

  const tokenSecret = process.env.DOWNLOAD_TOKEN_SECRET;
  if (!tokenSecret) {
    return json(500, { error: "server_error", message: "Download token secret not configured." });
  }

  try {
    let session;
    try {
      session = await stripe.checkout.sessions.retrieve(sessionId);
    } catch (error) {
      if (error && error.type === "StripeInvalidRequestError") {
        return json(404, { error: "invalid_session", message: "Session not found." });
      }
      throw error;
    }

    if (!session || session.payment_status !== "paid") {
      return json(402, { error: "not_paid", message: "Payment not verified." });
    }

    const orderResult = await query(
      "SELECT id, status, customer_email, lookup_token FROM orders WHERE stripe_session_id = $1",
      [sessionId]
    );

    if (orderResult.rowCount === 0) {
      return json(404, { error: "no_order", message: "No order found for this session." });
    }

    const order = orderResult.rows[0];

    let lookupToken = order.lookup_token;
    if (!lookupToken) {
      lookupToken = crypto.randomBytes(24).toString("hex");
      await query(
        "UPDATE orders SET lookup_token = $1 WHERE id = $2 AND lookup_token IS NULL",
        [lookupToken, order.id]
      );
    }

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

    return json(200, {
      order_id: order.id,
      customer_email: order.customer_email,
      lookup_token: lookupToken,
      downloads,
    });
  } catch (error) {
    console.error("get_entitlements error", error);
    return json(500, { error: "server_error", message: "Unable to verify entitlements." });
  }
};
