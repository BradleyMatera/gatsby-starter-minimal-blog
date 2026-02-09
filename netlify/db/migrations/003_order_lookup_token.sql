ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS lookup_token TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS orders_lookup_token_unique
  ON orders (lookup_token)
  WHERE lookup_token IS NOT NULL;
