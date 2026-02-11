
# Store and customer portal

## Product types
### Direct products
- Sold through Stripe Checkout.
- Webhook creates orders and order_items.
- Downloads are gated by short-lived tokens.

### Affiliate products
- Redirect to Amazon with affiliate tag.
- Clicks logged in `affiliate_clicks`.
- UI displays "Ships from Amazon" and ASIN when available.

## Store sections
- Featured picks (from `featured_rank`).
- Brad's Amazon Picks (affiliate_source = amazon).
- Partner picks (other affiliate sources).

## Product presentation fields
- `image_url`, `image_alt` - product image.
- `badge` - short label (e.g. "Top pick").
- `featured_rank` - lower number = higher in featured list.
- `category`, `collection` - used for grouping and future filters.

## CTA labels
- Amazon products use "See on Amazon" (list) and "View on Amazon" (detail).
- Direct products use "Buy".

## ASIN labels
ASINs are derived from the Amazon `affiliate_url` format:
- `/dp/ASIN` or `/gp/product/ASIN`.

## Customer portal
Two access paths:
1. Netlify Identity (sign-in).
2. Lookup code generated at purchase.

Portal features:
- View orders and line items.
- Get download links.
- Email receipts.

## Read next
- `functions.md`
## Read next
- `functions.md`
