const crypto = require("crypto");
const { json } = require("./_response");
const { query } = require("./_db");
const { sendReceiptEmail } = require("./_email");
const { getAuthedEmail } = require("./_identity");

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return json(200, { ok: true });
  }

  if (event.httpMethod !== "POST") {
    return json(405, { error: "method_not_allowed", message: "Use POST." });
  }

  const email = await getAuthedEmail(event);
  if (!email) {
    return json(401, { error: "unauthorized", message: "Sign in required." });
  }

  try {
    const orderResult = await query(
      `SELECT id, stripe_session_id, lookup_token, created_at
       FROM orders
       WHERE lower(customer_email) = lower($1)
       ORDER BY created_at DESC
       LIMIT 1`,
      [email]
    );

    let orderId = `TEST-${crypto.randomBytes(6).toString("hex")}`;
    let sessionId = `test_${crypto.randomBytes(8).toString("hex")}`;
    let lookupToken = crypto.randomBytes(24).toString("hex");
    let purchaseDate = new Date().toISOString();
    let items = [
      { name: "Test receipt item", quantity: 1, unit_price_cents: 1200 },
    ];
    let totalCents = 1200;
    let currency = "USD";

    if (orderResult.rowCount > 0) {
      const order = orderResult.rows[0];
      orderId = order.id;
      sessionId = order.stripe_session_id || sessionId;
      lookupToken = order.lookup_token || lookupToken;
      purchaseDate = order.created_at
        ? new Date(order.created_at).toISOString()
        : purchaseDate;

      const itemsResult = await query(
        `SELECT p.name, p.currency, oi.quantity, oi.unit_price_cents
         FROM order_items oi
         JOIN products p ON p.id = oi.product_id
         WHERE oi.order_id = $1`,
        [orderId]
      );

      if (itemsResult.rowCount > 0) {
        items = itemsResult.rows.map((row) => ({
          name: row.name,
          quantity: row.quantity,
          unit_price_cents: row.unit_price_cents,
        }));
        totalCents = items.reduce(
          (sum, item) => sum + item.unit_price_cents * item.quantity,
          0
        );
        currency = itemsResult.rows[0].currency?.toUpperCase() || currency;
      }
    }

    await sendReceiptEmail({
      to: email,
      orderId,
      lookupToken,
      sessionId,
      purchaseDate,
      items,
      totalCents,
      currency,
    });

    return json(200, { ok: true, message: "Test receipt sent." });
  } catch (error) {
    console.error("send_test_receipt error", error);
    return json(500, { error: "server_error", message: "Unable to send test receipt." });
  }
};
