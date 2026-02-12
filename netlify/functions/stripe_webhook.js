const { query, getClient, ensureOrdersSchema } = require("./_db");
const { stripe } = require("./_stripe");
const { sendReceiptEmail, sendRefundEmail } = require("./_email");

const getHeader = (headers, name) => {
  const target = Object.keys(headers || {}).find(
    (key) => key.toLowerCase() === name.toLowerCase()
  );
  return target ? headers[target] : undefined;
};

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const signature = getHeader(event.headers, "stripe-signature");

  if (!signature) {
    console.error("Missing Stripe signature header.");
    return { statusCode: 400, body: "Missing Stripe signature" };
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is not set.");
    return { statusCode: 500, body: "Webhook secret not configured" };
  }

  const rawBody = event.isBase64Encoded
    ? Buffer.from(event.body || "", "base64").toString("utf8")
    : event.body || "";

  let stripeEvent;
  try {
    stripeEvent = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (error) {
    console.error("Stripe webhook signature verification failed.", error.message);
    return { statusCode: 400, body: `Webhook Error: ${error.message}` };
  }

  if (stripeEvent.type === "checkout.session.completed") {
    const session = stripeEvent.data.object;
    const productId = session.metadata?.product_id;
    const quantity = Number.parseInt(session.metadata?.quantity || "1", 10) || 1;

    if (!productId) {
      console.error("checkout.session.completed missing product_id metadata.");
      return { statusCode: 500, body: "Missing product metadata" };
    }

    try {
      await ensureOrdersSchema();
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 1 });
      const lineItem = lineItems.data[0];
      const unitAmount = lineItem?.price?.unit_amount;
      const purchaseDate = new Date((session.created || Math.floor(Date.now() / 1000)) * 1000).toISOString();

      if (!unitAmount) {
        console.error("Unable to read unit amount from Stripe line item.");
        return { statusCode: 500, body: "Missing line item data" };
      }

      const productResult = await query(
        "SELECT id FROM products WHERE id = $1",
        [productId]
      );

      if (productResult.rowCount === 0) {
        console.error("Product not found for webhook session", productId);
        return { statusCode: 500, body: "Product not found" };
      }

      const client = await getClient();
      let orderId;
      try {
        await client.query("BEGIN");

        const orderResult = await client.query(
          `INSERT INTO orders (stripe_session_id, stripe_payment_intent_id, customer_email, status)
           VALUES ($1, $2, $3, 'paid')
           ON CONFLICT (stripe_session_id) DO NOTHING
           RETURNING id`,
          [session.id, session.payment_intent || null, session.customer_details?.email || null]
        );

        if (orderResult.rowCount === 0) {
          const existing = await client.query(
            "SELECT id, customer_email, receipt_email_sent_at FROM orders WHERE stripe_session_id = $1",
            [session.id]
          );
          const existingOrder = existing.rows[0];

          await client.query("COMMIT");

          const fallbackEmail = session.customer_details?.email;
          const email = existingOrder?.customer_email || fallbackEmail;
          if (email && !existingOrder?.receipt_email_sent_at) {
            sendReceiptEmail({
              to: email,
              orderId: existingOrder.id,
              sessionId: session.id,
              purchaseDate,
              items: [
                {
                  name: lineItem?.description || "Purchase",
                  quantity,
                  unit_price_cents: unitAmount,
                },
              ],
              totalCents: unitAmount * quantity,
              currency: lineItem?.price?.currency?.toUpperCase() || "USD",
            })
              .then((sent) => {
                if (sent) {
                  return query(
                    "UPDATE orders SET receipt_email_sent_at = NOW() WHERE id = $1 AND receipt_email_sent_at IS NULL",
                    [existingOrder.id]
                  );
                }
                return null;
              })
              .catch((error) => {
                console.error("Failed to send receipt email", error);
              });
          }

          return { statusCode: 200, body: "Order already recorded" };
        }

        orderId = orderResult.rows[0].id;

        await client.query(
          `INSERT INTO order_items (order_id, product_id, quantity, unit_price_cents)
           VALUES ($1, $2, $3, $4)
           ON CONFLICT (order_id, product_id) DO NOTHING`,
          [orderId, productId, quantity, unitAmount]
        );

        await client.query("COMMIT");
      } finally {
        client.release();
      }

      const email = session.customer_details?.email;
      if (email && orderId) {
        sendReceiptEmail({
          to: email,
          orderId,
          sessionId: session.id,
          purchaseDate,
          items: [
            {
              name: lineItem?.description || "Purchase",
              quantity,
              unit_price_cents: unitAmount,
            },
          ],
          totalCents: unitAmount * quantity,
          currency: lineItem?.price?.currency?.toUpperCase() || "USD",
        })
          .then((sent) => {
            if (sent) {
              return query(
                "UPDATE orders SET receipt_email_sent_at = NOW() WHERE id = $1 AND receipt_email_sent_at IS NULL",
                [orderId]
              );
            }
            return null;
          })
          .catch((error) => {
            console.error("Failed to send receipt email", error);
          });
      }

      return { statusCode: 200, body: "Order recorded" };
    } catch (error) {
      console.error("stripe_webhook error", error);
      return { statusCode: 500, body: "Webhook handler failed" };
    }
  }

  if (stripeEvent.type === "charge.refunded") {
    const charge = stripeEvent.data.object;
    const paymentIntentId = charge.payment_intent;

    if (!paymentIntentId) {
      console.error("charge.refunded missing payment_intent");
      return { statusCode: 200, body: "No payment_intent to update" };
    }

    try {
      const result = await query(
        `UPDATE orders
         SET status = 'refunded'
         WHERE stripe_payment_intent_id = $1
           AND status <> 'refunded'`,
        [paymentIntentId]
      );

      if (result.rowCount === 0) {
        return { statusCode: 200, body: "No matching order to refund" };
      }

      const orderResult = await query(
        "SELECT id, customer_email, refund_email_sent_at FROM orders WHERE stripe_payment_intent_id = $1",
        [paymentIntentId]
      );
      const order = orderResult.rows?.[0];

      if (order?.customer_email && !order?.refund_email_sent_at) {
        const refundDate = new Date().toISOString();
        sendRefundEmail({
          to: order.customer_email,
          orderId: order.id,
          refundDate,
        })
          .then((sent) => {
            if (sent) {
              return query(
                "UPDATE orders SET refund_email_sent_at = NOW() WHERE id = $1 AND refund_email_sent_at IS NULL",
                [order.id]
              );
            }
            return null;
          })
          .catch((error) => {
            console.error("Failed to send refund email", error);
          });
      }

      return { statusCode: 200, body: "Order refunded" };
    } catch (error) {
      console.error("stripe_webhook refund error", error);
      return { statusCode: 500, body: "Refund handler failed" };
    }
  }

  return { statusCode: 200, body: "Ignored" };
};
