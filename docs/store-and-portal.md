
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
Access is via Netlify Identity (sign-in) only.

Portal features:
- View orders and line items.
- Get download links.
- Email receipts.

## Developer workflow: add direct download products
Use this flow so new direct products show up in **Digital downloads** immediately:

1. Put the file in `netlify/functions/downloads/`.
   - `file_key` is the filename without extension.
   - Example: `netlify/functions/downloads/release-checklist-pack.pdf` => `file_key = release-checklist-pack`.
2. Seed or add products with the CLI:
   - `npm run products:status` (see counts + direct products + whether each `file_key` maps to a real file)
   - `npm run products:seed:direct` (upsert from `netlify/db/catalog/direct-products.json`)
   - `npm run products:add:direct -- --slug release-checklist-pack --name "Release Checklist Pack" --description "Launch checklist and handoff template." --price-cents 1900 --file-key release-checklist-pack --badge "New"`
   - `node scripts/manage-direct-products.js activate --slug release-checklist-pack`
   - `node scripts/manage-direct-products.js deactivate --slug release-checklist-pack`
3. Restart `netlify dev` if it is already running, then reload `/store/`.

Notes:
- Download files are auto-discovered from `netlify/functions/downloads/`; no manual mapping edit is needed.
- Direct products must have `product_type = 'direct'` and `active = true` to appear in the Digital downloads section.
- Direct products can use `price_cents = 0` for free checkout test flows.

## Read next
- `functions.md`
