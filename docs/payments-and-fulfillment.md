---
title: "Payments & Fulfillment"
---

# Payments & fulfillment

This is the end-to-end flow for **direct digital downloads** (Stripe) and how the system stays secure. It also lists every service involved and where the code lives.

## Customer journey (what the buyer experiences)
1. **Browse**: Customer visits `/store` and sees products.
2. **Buy**: Clicking “Buy” or “See on Amazon” routes to `/go/:slug`.
3. **Checkout**:
   - Direct product: redirected to Stripe Checkout.
   - Amazon product: redirected to Amazon.
4. **Confirmation**:
   - Direct product: returns to `/success?session_id=...` and sees downloads.
   - Amazon product: purchase is completed on Amazon.
5. **Receipts & access**:
   - Direct product: receipt email is sent and the customer can re-download from `/purchases` (customer portal).
   - Customer portal requires sign-in with the same email used at checkout.

## Services in use
- **Stripe Checkout (payments)**: collects card payment and returns a session id.
- **Netlify Functions (backend)**: all server-side logic and webhooks.
- **Netlify DB (Neon Postgres)**: products, orders, order_items, affiliate_clicks.
- **Resend (email)**: receipt emails.
- **Netlify Identity (auth)**: customer portal access.
- **Amazon Associates (affiliate links)**: external checkout for Amazon products.

## Direct download flow (Stripe)
1. **Store list/detail**  
   `/store` or `/store/:slug` renders products from DB.
2. **Buy**  
   Button goes to `/go/:slug`.
3. **Checkout session**  
   If product is `direct`, `/go/:slug` calls `create_checkout_session`.  
   This creates a **Stripe Checkout** session and redirects the user to Stripe.
4. **Payment completed**  
   Stripe fires `checkout.session.completed` to `/stripe_webhook`.  
   The webhook is the **source of truth**.
5. **Order recorded**  
   Webhook writes:
   - `orders` row (paid)
   - `order_items` rows
6. **Receipt email**  
   Webhook sends the receipt email via Resend.
7. **Success page**  
   `/success?session_id=...` calls `get_entitlements` which verifies the Stripe session is paid and returns **short-lived download URLs**.
8. **Download**  
   `/download?token=...` validates the signed token and serves the file.

## Affiliate flow (Amazon)
1. `/go/:slug` logs the click to `affiliate_clicks`.
2. Customer is redirected to Amazon.  
3. Checkout and payment happen **entirely on Amazon**.

## How you get paid
- Stripe collects the money for **direct downloads** and pays out to your connected bank account on your Stripe payout schedule.  
- This code never touches card data. It only creates Checkout sessions and verifies webhooks.

## Customer emails (what gets sent)
Direct downloads use **Resend** for receipts. The receipt email includes:
- Order ID + purchase date
- Line items and totals
- Link to `/success` (if available)
- Link to the customer portal (`/purchases`)
- Support email and seller disclosure

Additional lifecycle emails:
- **Download links ready**: sent when the customer lands on `/success` or requests downloads in the portal. It reminds them links are time-limited and points to the portal for re-download.
- **Refund processed**: sent when Stripe reports a refund.

Netlify Identity emails (login, password reset, verification) are sent by Netlify and configured in the Netlify Identity settings UI. Those templates are **not** in this repo.

## Security model (what keeps it safe)
- **Secrets are server-only**: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`, `DOWNLOAD_TOKEN_SECRET`.
- **Webhook verification**: Stripe signature is validated before any DB writes.
- **Short-lived download tokens**: tokens are signed and expire quickly.
- **Customer portal requires Identity auth**: orders are only returned for the signed-in email.

## What data is stored
- **Orders**: Stripe session id, payment intent id, email, status.
- **Order items**: product id, quantity, unit price.
- **Products**: type (direct/affiliate), affiliate URLs, images, badges, etc.
- **Affiliate clicks**: product id, referrer, user agent (analytics only).

## Code map (where things live)
- **Stripe Checkout creation**: `netlify/functions/create_checkout_session.js`
- **Stripe webhook**: `netlify/functions/stripe_webhook.js`
- **Entitlements**: `netlify/functions/get_entitlements.js`
- **Downloads**: `netlify/functions/download.js`
- **Portal**: `src/pages/purchases.tsx`
- **Store**: `src/pages/store.tsx`
- **Database**: `netlify/db/migrations/*.sql`, `netlify/db/seed/*.sql`

## Environment variables
See `docs/ENVIRONMENT.md`. Minimum for payments:
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `SITE_URL`
- `NETLIFY_DATABASE_URL`
- `DOWNLOAD_TOKEN_SECRET`

## Operational notes
- **Refunds**: `charge.refunded` updates `orders.status = refunded`.
- **Downloads blocked** if order is refunded.
- **Resend** domain must be verified for receipts.
