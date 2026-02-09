const { json } = require("./_response");
const { query } = require("./_db");
const { stripe } = require("./_stripe");

const getBaseUrl = () => {
  return process.env.SITE_URL || process.env.URL || "http://localhost:8888";
};

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return json(405, { error: "method_not_allowed", message: "Use POST." });
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch (error) {
    return json(400, { error: "invalid_json", message: "Invalid JSON body." });
  }

  const productId = payload.product_id;
  const quantity = Number.isInteger(payload.quantity) ? payload.quantity : 1;

  if (!productId) {
    return json(400, { error: "missing_product", message: "product_id is required." });
  }

  if (!Number.isInteger(quantity) || quantity < 1) {
    return json(400, { error: "invalid_quantity", message: "Quantity must be a positive integer." });
  }

  try {
    const result = await query(
      "SELECT id, name, description, price_cents, currency, active FROM products WHERE id = $1",
      [productId]
    );

    const product = result.rows[0];

    if (!product) {
      return json(404, { error: "not_found", message: "Product not found." });
    }

    if (!product.active) {
      return json(400, { error: "inactive", message: "Product is not available." });
    }

    const baseUrl = getBaseUrl();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: product.currency.toLowerCase(),
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: product.price_cents,
          },
          quantity,
        },
      ],
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancel`,
      metadata: {
        product_id: product.id,
        quantity: String(quantity),
      },
    });

    return json(200, { url: session.url });
  } catch (error) {
    console.error("create_checkout_session error", error);
    return json(500, { error: "server_error", message: "Unable to create checkout session." });
  }
};
