const { query } = require("./_db");
const { stripe } = require("./_stripe");

const getBaseUrl = () => {
  return process.env.SITE_URL || process.env.URL || "http://localhost:8888";
};

const htmlResponse = (statusCode, body) => ({
  statusCode,
  headers: {
    "Content-Type": "text/html; charset=utf-8",
  },
  body,
});

const extractSlug = (event) => {
  if (event.pathParameters?.slug) return event.pathParameters.slug;
  if (event.pathParameters?.splat) return event.pathParameters.splat;
  if (event.queryStringParameters?.slug) return event.queryStringParameters.slug;

  const path = event.path || "";
  const match = path.match(/\/go\/([^/?#]+)/) || path.match(/\/\.netlify\/functions\/go\/([^/?#]+)/);
  if (match) return match[1];
  return null;
};

exports.handler = async (event) => {
  const slug = extractSlug(event);

  if (!slug) {
    return htmlResponse(400, "<h1>Missing product</h1><p>No product slug provided.</p>");
  }

  try {
    const result = await query(
      `SELECT id, slug, name, description, price_cents, currency, active,
              COALESCE(product_type, 'direct') AS product_type,
              affiliate_url, affiliate_source
       FROM products
       WHERE slug = $1
       LIMIT 1`,
      [slug]
    );

    const product = result.rows[0];

    if (!product || !product.active) {
      return htmlResponse(404, "<h1>Product not available</h1><p>This product could not be found.</p>");
    }

    if (product.product_type === "affiliate") {
      if (!product.affiliate_url) {
        return htmlResponse(400, "<h1>Invalid affiliate link</h1><p>This product is missing a checkout link.</p>");
      }

      const referrer = event.headers?.referer || event.headers?.referrer || null;
      const userAgent = event.headers?.["user-agent"] || null;

      query(
        `INSERT INTO affiliate_clicks (product_id, affiliate_source, referrer, user_agent)
         VALUES ($1, $2, $3, $4)`,
        [product.id, product.affiliate_source || null, referrer, userAgent]
      ).catch((error) => {
        console.error("affiliate_clicks error", error);
      });

      const safeUrl = product.affiliate_url;
      const body = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="refresh" content="0.5;url=${safeUrl}" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Redirecting...</title>
    <style>
      body { font-family: system-ui, -apple-system, sans-serif; padding: 2rem; background: #0f172a; color: #f8fafc; }
      a { color: #38bdf8; }
    </style>
  </head>
  <body>
    <h1>Taking you to checkout...</h1>
    <p>You are being redirected to an affiliate partner.</p>
    <p>If nothing happens, <a href="${safeUrl}">continue here</a>.</p>
    <script>
      setTimeout(function () { window.location.href = ${JSON.stringify(safeUrl)}; }, 500);
    </script>
  </body>
</html>`;

      return htmlResponse(200, body);
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return htmlResponse(500, "<h1>Checkout not configured</h1><p>Missing STRIPE_SECRET_KEY.</p>");
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
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancel`,
      metadata: {
        product_id: product.id,
        quantity: "1",
      },
    });

    if (!session.url) {
      return htmlResponse(500, "<h1>Checkout error</h1><p>Unable to start checkout.</p>");
    }

    return {
      statusCode: 303,
      headers: {
        Location: session.url,
      },
      body: "Redirecting to checkout...",
    };
  } catch (error) {
    console.error("go error", error);
    return htmlResponse(500, "<h1>Server error</h1><p>Please try again later.</p>");
  }
};
