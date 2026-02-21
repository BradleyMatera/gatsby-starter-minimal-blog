ALTER TABLE products
  DROP CONSTRAINT IF EXISTS products_price_cents_check;

ALTER TABLE products
  ADD CONSTRAINT products_price_cents_check CHECK (price_cents >= 0);

ALTER TABLE order_items
  DROP CONSTRAINT IF EXISTS order_items_unit_price_cents_check;

ALTER TABLE order_items
  ADD CONSTRAINT order_items_unit_price_cents_check CHECK (unit_price_cents >= 0);
