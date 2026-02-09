# Store v1 Setup

This repo ships a minimal digital-download store built on Netlify DB + Stripe Checkout + Netlify Functions.

## 1) Provision Netlify DB

1. Open the site in the Netlify dashboard.
2. Go to **Add-ons / Integrations → Netlify DB** and provision a database.
3. Confirm the database exists by checking **Site configuration → Environment variables**. Netlify will inject:
   - `NETLIFY_DATABASE_URL`
   - `NETLIFY_DATABASE_URL_UNPOOLED`

## 2) Claim the Neon database (required)

Netlify DB uses Neon under the hood. **Unclaimed Neon databases are deleted after 7 days without recovery.**

1. In the Netlify DB integration panel, click **Claim database in Neon**.
2. Complete the Neon sign-in flow and attach the database.
3. Verify the database is now listed in Neon under your account.

## 3) Run migrations + seed data

SQL files live here:
- `netlify/db/migrations/001_init.sql`
- `netlify/db/migrations/003_order_lookup_token.sql`
- `netlify/db/migrations/004_receipt_email_sent.sql`
- `netlify/db/seed/001_seed.sql`

Use `NETLIFY_DATABASE_URL_UNPOOLED` for schema changes (preferred for migrations). Example:

```bash
psql "$NETLIFY_DATABASE_URL_UNPOOLED" -f netlify/db/migrations/001_init.sql
psql "$NETLIFY_DATABASE_URL_UNPOOLED" -f netlify/db/seed/001_seed.sql
```

You can also run these from the Neon SQL editor once the DB is claimed.

## 4) Configure Stripe

Create a Stripe account and grab test keys.

Required Netlify environment variables (Functions only):
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `DOWNLOAD_TOKEN_SECRET` (random 32+ chars)
- `RESEND_API_KEY` (for purchase emails)
- `ORDER_EMAIL_FROM` (verified sender, e.g. `Bradley Matera <receipts@bradleymatera.dev>`)
- `ORDER_SUPPORT_EMAIL` (optional, defaults to support@bradleymatera.dev)

Optional (overrides Netlify’s `URL`):
- `SITE_URL` (set to `https://bradleymatera.dev` in production)

### Webhook

1. Create a Stripe webhook endpoint pointing to:
   `https://bradleymatera.dev/.netlify/functions/stripe_webhook`
2. Listen for: `checkout.session.completed`, `charge.refunded`.
3. Paste the webhook signing secret into `STRIPE_WEBHOOK_SECRET`.

## 5) Local development

Netlify Functions run locally via Netlify CLI.

```bash
netlify dev
```

Notes:
- Netlify DB provisioning via CLI requires Node 20.12.2+.
- `netlify dev` will load your local `.env` or Netlify envs if linked.
- For local Stripe webhooks, use Stripe CLI and forward to
  `http://localhost:8888/.netlify/functions/stripe_webhook`.

## 5b) Enable Netlify Identity (for purchases access)

1. In Netlify, open **Identity** for the site.
2. Enable Identity and set registration to invite-only or open (your call).
3. Use the same email at checkout to see your orders.

Local dev tip:
- If the Identity widget prompts for a site URL on localhost, set
  `GATSBY_IDENTITY_URL=https://bradleymatera.dev` in your local env,
  or just enter the site URL once in the prompt.

## 6) Replace the sample product + download

- Update the `products` table (`name`, `description`, `price_cents`, `file_key`).
- Replace `netlify/functions/downloads/example-pack.txt` with your real file.
- Update the `file_key` mapping in `netlify/functions/_downloads.js`.

## Affiliate marketplace setup

### Amazon Associates

Amazon links are created manually and must already include your tag parameter:

`tag=bradleymatera-20`

### Add an affiliate product

1. Insert a product row with:
   - `product_type = 'affiliate'`
   - `affiliate_url = '<full affiliate link>'`
   - `affiliate_source = 'amazon'` (or `impact`, `sharesale`, `other`)
   - `display_price = '$59.99'` (optional UI-only text)
2. Keep `price_cents` populated (required by schema). It is ignored for affiliate redirects.

### Add a direct product

- Set `product_type = 'direct'` (default).
- Stripe checkout uses `price_cents` and `currency`.

### Mixed product types

- `/go/:slug` routes all purchases.
- Affiliate products redirect to `affiliate_url` and log a click.
- Direct products create a Stripe Checkout session and redirect to Stripe.

### Click tracking

- Affiliate clicks are logged in `affiliate_clicks`.
- Logging failures never block the redirect.
- Data captured: product_id, affiliate_source, referrer, user_agent, created_at.

## Digital delivery tradeoffs + rotation

- Files are **not** stored in `static/` or `public/`. They live under `netlify/functions/downloads` so they are only accessible through the signed download function.
- Download URLs are short-lived (15 minutes). Tokens are HMAC-signed with `DOWNLOAD_TOKEN_SECRET`.
- To rotate assets later: upload the new file, update the `file_key` mapping and/or DB row, and (optionally) rotate `DOWNLOAD_TOKEN_SECRET` to invalidate any old links.
- This approach keeps URLs private but requires redeploying to update files.

## Purchases access

- `/purchases` supports two secure paths:
  - **Sign in with Netlify Identity** (recommended).
  - **Email + lookup code** from the purchase email or success page.
- The email must match `orders.customer_email` (captured from Stripe Checkout).
- If Stripe Checkout doesn’t provide an email, the order won’t be discoverable on this page.

## Purchase email delivery

- Uses Resend (free tier OK) to email a full receipt with lookup code.
- Set `RESEND_API_KEY` and `ORDER_EMAIL_FROM` in Netlify env vars.
- `ORDER_EMAIL_FROM` must be a verified sender/domain in Resend.

## Security notes

- Secrets are **server-side only**. Never expose Stripe keys in the client.
- Download links are short-lived signed tokens; rotate `DOWNLOAD_TOKEN_SECRET` to invalidate old links.
