const { json } = require("./_response");
const { query, ensureOrdersSchema } = require("./_db");
const { getAuthedEmail } = require("./_identity");
const { sendReceiptEmail } = require("./_email");

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return json(200, { ok: true });
  }

  if (event.httpMethod !== "POST") {
    return json(405, { error: "method_not_allowed", message: "Use POST." });
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
      `SELECT id, customer_email, created_at, stripe_session_id
       FROM orders
       WHERE id = $1
         AND lower(customer_email) = lower($2)`,
      params
    );

    if (orderResult.rowCount === 0) {
      return json(404, { error: "not_found", message: "Order not found." });
    }

    const order = orderResult.rows[0];

    const itemsResult = await query(
      `SELECT p.name, p.currency, oi.quantity, oi.unit_price_cents
       FROM order_items oi
       JOIN products p ON p.id = oi.product_id
       WHERE oi.order_id = $1`,
      [order.id]
    );

    const items = itemsResult.rows.map((row) => ({
      name: row.name,
      quantity: row.quantity,
      unit_price_cents: row.unit_price_cents,
    }));
    const totalCents = items.reduce(
      (sum, item) => sum + item.unit_price_cents * item.quantity,
      0
    );
    const currency = itemsResult.rows[0]?.currency?.toUpperCase() || "USD";
    const purchaseDate = order.created_at
      ? new Date(order.created_at).toISOString()
      : new Date().toISOString();

    const sent = await sendReceiptEmail({
      to: order.customer_email || authedEmail,
      orderId: order.id,
      sessionId: order.stripe_session_id || null,
      purchaseDate,
      items,
      totalCents,
      currency,
    });

    if (!sent) {
      return json(500, {
        error: "email_not_configured",
        message: "Email service not configured. Check RESEND_API_KEY and ORDER_EMAIL_FROM.",
      });
    }

    await query(
      "UPDATE orders SET receipt_email_sent_at = NOW() WHERE id = $1 AND receipt_email_sent_at IS NULL",
      [order.id]
    );

    return json(200, { ok: true, message: "Receipt sent." });
  } catch (error) {
    console.error("send_receipt_email error", error);
    return json(500, { error: "server_error", message: "Unable to send receipt." });
  }
};
