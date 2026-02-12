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

  productsSchemaReady = true;
};

module.exports = { query, getClient, ensureOrdersSchema, ensureProductsSchema };
