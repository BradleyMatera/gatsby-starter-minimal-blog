UPDATE products
SET product_type = 'direct'
WHERE product_type IS NULL;
