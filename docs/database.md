
# Database

## Tables
### products
- `id`, `slug`, `name`, `description`, `price_cents`, `currency`, `active`
- `product_type` (direct | affiliate)
- `affiliate_url`, `affiliate_source`, `display_price`
- `image_url`, `image_alt`, `badge`, `featured_rank`, `category`, `collection`

### orders
- `id`, `stripe_session_id`, `stripe_payment_intent_id`
- `customer_email`, `status`, `created_at`
- `receipt_email_sent_at`
- `download_links_last_sent_at`, `refund_email_sent_at`

### order_items
- `order_id`, `product_id`, `quantity`, `unit_price_cents`

### affiliate_clicks
- `product_id`, `affiliate_source`, `referrer`, `user_agent`, `created_at`

## Migrations
- `001_init.sql`
- `002_affiliate_marketplace.sql`
- `004_receipt_email_sent.sql`
- `005_product_presentation.sql`
- `006_download_links_sent.sql`
- `007_refund_email_sent.sql`

## Seeds
- `003_nerdy_affiliates.sql` (Brad's Amazon Picks)

## Adding a product (example)
```sql
INSERT INTO products (
  slug, name, description, price_cents, currency, active,
  product_type, affiliate_url, affiliate_source, display_price
) VALUES (
  'example-product',
  'Example Product',
  'Short description here',
  1200,
  'USD',
  true,
  'affiliate',
  'https://www.amazon.com/dp/ASIN/?tag=bradleymatera-20',
  'amazon',
  'See price on Amazon'
);
```

## Read next
- `functions.md`
