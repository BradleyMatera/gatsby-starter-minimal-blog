
# Architecture

## System diagram (conceptual)
```
Browser (Gatsby)
  |-- /store, /store/:slug  -> list_products / get_product
  |-- /go/:slug             -> go (affiliate redirect or direct checkout)
  |-- /purchases            -> get_orders_by_email / get_order_downloads
  |-- /success              -> get_entitlements
  |-- /download             -> download (token gated)

Stripe Checkout -> stripe_webhook -> orders + order_items
Amazon clicks   -> affiliate_clicks
```

## Direct purchase flow
1. Customer clicks Buy on a direct product.
2. `/go/:slug` routes to Stripe Checkout.
3. Stripe sends `checkout.session.completed`.
4. Webhook creates `orders` + `order_items`.
5. Customer sees downloads on `/success` and in `/purchases`.

## Affiliate flow
1. Customer clicks Buy on an affiliate product.
2. `/go/:slug` logs `affiliate_clicks`.
3. Customer is redirected to Amazon with your tag.

## Portal flow
- Authenticated users only (Netlify Identity).

## Read next
- `store-and-portal.md`
- `database.md`
