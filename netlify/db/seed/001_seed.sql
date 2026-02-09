INSERT INTO products (slug, name, description, price_cents, currency, active, file_key)
VALUES (
  'example-product',
  'Example Download Pack',
  'Placeholder digital download. Replace this with your real product copy.',
  1200,
  'USD',
  true,
  'example-pack'
)
ON CONFLICT (slug) DO NOTHING;
