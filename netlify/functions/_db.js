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

const query = (text, params) => pool.query(text, params);
const getClient = () => pool.connect();

module.exports = { query, getClient };
