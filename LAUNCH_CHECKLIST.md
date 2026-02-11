# Local Dev Test -> Push -> Prod Smoke

Goal

Test everything locally, then push to production with minimal surprises.

Local Dev (test mode)

Step 1: Run Netlify locally

From your repo root:

netlify dev

Confirm this works:

http://localhost:8888/.netlify/functions/list_products

Expected:
- JSON response with the seeded product

Step 2: Stripe CLI forwarding

Start webhook forwarding in a second terminal:

stripe listen \
  --forward-to http://localhost:8888/.netlify/functions/stripe_webhook

Stripe CLI prints a temporary signing secret like:

whsec_abc123...

Step 3: Set local env (override for dev only)

Set these locally before running netlify dev:

STRIPE_SECRET_KEY=your_test_secret_key
STRIPE_WEBHOOK_SECRET=whsec_from_stripe_cli
DOWNLOAD_TOKEN_SECRET=your_local_random_string
SITE_URL=http://localhost:8888

Example (bash):

export STRIPE_SECRET_KEY=sk_test_...
export STRIPE_WEBHOOK_SECRET=whsec_abc123
export DOWNLOAD_TOKEN_SECRET=local-dev-token-32-chars-min
export SITE_URL=http://localhost:8888
netlify dev

Step 4: Trigger checkout (test)

1) Open:
   http://localhost:8888/store
2) Click Buy
3) If product_type = direct, you are redirected to Stripe Checkout (test)
4) If product_type = affiliate, you are redirected to the affiliate checkout
   via /go/:slug
4) Complete the payment
5) Stripe fires checkout.session.completed
6) Stripe CLI forwards it to:
   http://localhost:8888/.netlify/functions/stripe_webhook

Step 5: Confirm local webhook + entitlements

Expected:
- Stripe CLI shows forwarded event
- netlify dev shows stripe_webhook logs
- Order row inserted, status=paid
- /success shows downloads
- /download serves file
- /purchases finds the order by sign-in or email + lookup code

Step 6: Refund test (test mode)

1) Refund payment in Stripe Dashboard
2) Stripe fires charge.refunded
3) Stripe CLI forwards it locally
4) Order status updates to refunded
5) Downloads should now be blocked

Push to Prod

Step 7: Deploy

- Commit + push
- Netlify builds and deploys
- Enable Netlify Identity (if not already)
- Set RESEND_API_KEY + ORDER_EMAIL_FROM for purchase emails

Production Smoke (minimal)

Step 8: Verify live basics

- /store loads and shows products
- Buy redirects to Stripe Checkout (live) for direct products
- Buy redirects to affiliate checkout for affiliate products
- Complete payment if you want a full live verification
- /success shows downloads
- /purchases can find the order by sign-in or email + lookup code
- Purchase email sends full receipt (items, total, lookup code, downloads link)

Quick checklist

Local dev is done when:
- /list_products works
- Direct product redirects to Stripe (test)
- Affiliate product redirects to external checkout via /go/:slug
- Stripe CLI forwards events
- stripe_webhook logs run
- Orders appear in DB
- /success shows downloads
- Refund blocks access
- /purchases returns paid orders with sign-in or email + lookup code

Affiliate checks

- /go/:slug works
- Affiliate click logged in affiliate_clicks
- Disclosure visible on /store, /store/:slug, and in footer
- Amazon links include tag=bradleymatera-20
- Non-Amazon links work
- Direct products still route to Stripe

Purchases access checks

- Netlify Identity login works
- Logged-in users see only their orders
- Email + lookup code path works
- Portal can fetch download links for paid orders
- Portal can resend receipts

If something fails, reply with one line:
- "list_products 500 locally"
- "Stripe CLI forwards but webhook 401"
- "Order created but success page empty"
- "Refund event arrives but order not updated"
