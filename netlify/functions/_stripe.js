const Stripe = require("stripe");

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.warn("STRIPE_SECRET_KEY is not set. Stripe calls will fail.");
}

const stripe = new Stripe(stripeSecretKey || "", {
  apiVersion: "2024-06-20",
});

module.exports = { stripe };
