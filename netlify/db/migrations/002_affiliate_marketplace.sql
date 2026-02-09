ALTER TABLE products
  ADD COLUMN IF NOT EXISTS product_type text CHECK (product_type IN ('affiliate', 'direct')) DEFAULT 'direct',
  ADD COLUMN IF NOT EXISTS affiliate_url text,
  ADD COLUMN IF NOT EXISTS affiliate_source text,
  ADD COLUMN IF NOT EXISTS display_price text;

UPDATE products
SET product_type = 'direct'
WHERE product_type IS NULL;

CREATE TABLE IF NOT EXISTS affiliate_clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  affiliate_source text,
  referrer text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS affiliate_clicks_product_id_idx ON affiliate_clicks(product_id);
CREATE INDEX IF NOT EXISTS affiliate_clicks_created_at_idx ON affiliate_clicks(created_at);
