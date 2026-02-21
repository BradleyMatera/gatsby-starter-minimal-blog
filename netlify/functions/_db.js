const { Pool } = require("pg");

const connectionString = process.env.NETLIFY_DATABASE_URL;

if (!connectionString) {
  console.warn("NETLIFY_DATABASE_URL is not set. Database calls will fail.");
}

const pool = global.__netlifyDbPool ||
  new Pool({
    connectionString,
    ssl: connectionString ? { rejectUnauthorized: false } : undefined,
  });

global.__netlifyDbPool = pool;
let ordersSchemaReady = false;
let productsSchemaReady = false;

const query = (text, params) => pool.query(text, params);
const getClient = () => pool.connect();

const ensureOrdersSchema = async () => {
  if (ordersSchemaReady) return;

  await pool.query(
    "ALTER TABLE orders ADD COLUMN IF NOT EXISTS receipt_email_sent_at timestamptz"
  );
  await pool.query(
    "ALTER TABLE orders ADD COLUMN IF NOT EXISTS download_links_last_sent_at timestamptz"
  );
  await pool.query(
    "ALTER TABLE orders ADD COLUMN IF NOT EXISTS refund_email_sent_at timestamptz"
  );
  await pool.query(
    "ALTER TABLE order_items DROP CONSTRAINT IF EXISTS order_items_unit_price_cents_check"
  );
  await pool.query(
    "ALTER TABLE order_items ADD CONSTRAINT order_items_unit_price_cents_check CHECK (unit_price_cents >= 0)"
  );

  ordersSchemaReady = true;
};

const ensureProductsSchema = async () => {
  if (productsSchemaReady) return;

  await pool.query(
    "ALTER TABLE products ADD COLUMN IF NOT EXISTS image_url text"
  );
  await pool.query(
    "ALTER TABLE products ADD COLUMN IF NOT EXISTS image_alt text"
  );
  await pool.query(
    "ALTER TABLE products ADD COLUMN IF NOT EXISTS badge text"
  );
  await pool.query(
    "ALTER TABLE products ADD COLUMN IF NOT EXISTS featured_rank integer"
  );
  await pool.query(
    "ALTER TABLE products ADD COLUMN IF NOT EXISTS category text"
  );
  await pool.query(
    "ALTER TABLE products ADD COLUMN IF NOT EXISTS collection text"
  );
  await pool.query(
    "ALTER TABLE products DROP CONSTRAINT IF EXISTS products_price_cents_check"
  );
  await pool.query(
    "ALTER TABLE products ADD CONSTRAINT products_price_cents_check CHECK (price_cents >= 0)"
  );

  productsSchemaReady = true;
};

module.exports = { query, getClient, ensureOrdersSchema, ensureProductsSchema };
