
# Setup

Use this to bootstrap a new environment or re-sync local dev.

## Overview
This project relies on Netlify DB, Stripe Checkout, Netlify Identity, and Resend. The store and portal are fully driven by the database and functions.

## Prereqs
- Node 18+
- Netlify CLI
- Postgres client (`psql`)

## Step 1: Netlify DB (Neon)
1. Provision Netlify DB in the Netlify UI.
2. Claim the database in Neon so it does not expire.
3. Set env vars:
   - `NETLIFY_DATABASE_URL`
   - `NETLIFY_DATABASE_URL_UNPOOLED`

## Step 2: Apply migrations
```bash
psql "$NETLIFY_DATABASE_URL_UNPOOLED" -f netlify/db/migrations/001_init.sql
psql "$NETLIFY_DATABASE_URL_UNPOOLED" -f netlify/db/migrations/002_affiliate_marketplace.sql
psql "$NETLIFY_DATABASE_URL_UNPOOLED" -f netlify/db/migrations/004_receipt_email_sent.sql
psql "$NETLIFY_DATABASE_URL_UNPOOLED" -f netlify/db/migrations/005_product_presentation.sql
psql "$NETLIFY_DATABASE_URL_UNPOOLED" -f netlify/db/migrations/006_download_links_sent.sql
psql "$NETLIFY_DATABASE_URL_UNPOOLED" -f netlify/db/migrations/007_refund_email_sent.sql
```

## Step 3: Seed products
```bash
psql "$NETLIFY_DATABASE_URL_UNPOOLED" -f netlify/db/seed/003_nerdy_affiliates.sql
```

## Step 4: Stripe
Required env vars:
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `SITE_URL`

Webhook endpoint:
- `/.netlify/functions/stripe_webhook`

Required events:
- `checkout.session.completed`
- `charge.refunded`

Note: success and cancel URLs are built from `SITE_URL`.

## Step 5: Resend (email receipts)
Required env vars:
- `RESEND_API_KEY`
- `ORDER_EMAIL_FROM` (example: `Bradley Matera <receipts@bradleymatera.dev>`)
Optional:
- `ORDER_SUPPORT_EMAIL`

Verify the domain in Resend before sending.

## Step 6: Netlify Identity
Enable Netlify Identity in the site settings.
- Set Site URL in Identity settings (used for auth redirects).
- Google provider can be enabled with default config or your own OAuth app.

## Step 7: Local dev
Create `.env` with the same variables. Then:
```bash
netlify dev --no-open
```
- Site: http://localhost:8888
- Functions: http://localhost:8888/.netlify/functions/*

## Step 8: Verify the flow
- Open `/store` and confirm products render.
- Click a direct product and verify Stripe Checkout.
- Click an affiliate product and verify Amazon redirect.
- Complete checkout and confirm `/success` and `/purchases` show the order.

## Updating products
All product data comes from the DB. Update via SQL seed files:
- `affiliate_url` controls the outbound link.
- `product_type` controls whether it is direct vs affiliate.
- `featured_rank`, `badge`, and `image_url` control the UI.

## Read next
- `docs/ENVIRONMENT.md`
- `docs/development.md`
