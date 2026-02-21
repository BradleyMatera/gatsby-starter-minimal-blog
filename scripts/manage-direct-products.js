#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");

const ROOT = path.resolve(__dirname, "..");
const DOTENV_PATH = path.join(ROOT, ".env");
const DOWNLOADS_DIR = path.join(ROOT, "netlify", "functions", "downloads");
const DEFAULT_CATALOG_PATH = path.join(
  ROOT,
  "netlify",
  "db",
  "catalog",
  "direct-products.json",
);

const usage = `
Direct product manager

Usage:
  node scripts/manage-direct-products.js status
  node scripts/manage-direct-products.js seed [--file netlify/db/catalog/direct-products.json]
  node scripts/manage-direct-products.js add --slug <slug> --name <name> --description <text> --price-cents <int> --file-key <key> [--currency USD] [--display-price "$12"] [--badge "New"] [--category "book"] [--collection "Digital Downloads"] [--featured-rank 1] [--inactive]
  node scripts/manage-direct-products.js activate --slug <slug>
  node scripts/manage-direct-products.js deactivate --slug <slug>

Examples:
  node scripts/manage-direct-products.js status
  node scripts/manage-direct-products.js seed
  node scripts/manage-direct-products.js add --slug release-checklist-pack --name "Release Checklist Pack" --description "Launch checklist and handoff template." --price-cents 1900 --file-key release-checklist-pack --badge "New"
  node scripts/manage-direct-products.js activate --slug example-download-pack
`;

const parseEnvLine = (line) => {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) return null;
  const idx = trimmed.indexOf("=");
  if (idx < 1) return null;

  const key = trimmed.slice(0, idx).trim();
  let value = trimmed.slice(idx + 1).trim();
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1);
  }
  value = value.replace(/\\n/g, "\n");
  return { key, value };
};

const loadDotEnv = () => {
  if (!fs.existsSync(DOTENV_PATH)) return;
  const lines = fs.readFileSync(DOTENV_PATH, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const entry = parseEnvLine(line);
    if (!entry) continue;
    if (process.env[entry.key] === undefined) {
      process.env[entry.key] = entry.value;
    }
  }
};

const parseArgs = (argv) => {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith("--")) continue;
    const key = token.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith("--")) {
      args[key] = true;
    } else {
      args[key] = next;
      i += 1;
    }
  }
  return args;
};

const normalizeProduct = (raw) => {
  const slug = String(raw.slug || "").trim();
  const name = String(raw.name || "").trim();
  const description = String(raw.description || "").trim();
  const fileKey = String(raw.file_key || raw.fileKey || "").trim();
  const priceCents = Number.parseInt(String(raw.price_cents), 10);
  const currency = String(raw.currency || "USD").trim().toUpperCase();

  if (!slug || !name || !description || !fileKey || !Number.isInteger(priceCents) || priceCents < 0) {
    throw new Error(
      `Invalid direct product payload for slug "${slug || "<missing>"}". Required: slug, name, description, file_key, price_cents >= 0`,
    );
  }

  return {
    slug,
    name,
    description,
    file_key: fileKey,
    price_cents: priceCents,
    currency,
    active: raw.active !== false,
    display_price: raw.display_price || null,
    image_url: raw.image_url || null,
    image_alt: raw.image_alt || null,
    badge: raw.badge || null,
    featured_rank:
      raw.featured_rank === null || raw.featured_rank === undefined
        ? null
        : Number.parseInt(String(raw.featured_rank), 10) || null,
    category: raw.category || null,
    collection: raw.collection || null,
  };
};

const getAvailableFileKeys = () => {
  if (!fs.existsSync(DOWNLOADS_DIR)) return new Set();
  const files = fs
    .readdirSync(DOWNLOADS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isFile() && !entry.name.startsWith("."))
    .map((entry) => path.parse(entry.name).name);
  return new Set(files);
};

const ensureProductsSchema = async (pool) => {
  await pool.query("CREATE EXTENSION IF NOT EXISTS pgcrypto");
  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      slug text UNIQUE NOT NULL,
      name text NOT NULL,
      description text NOT NULL,
      price_cents integer NOT NULL CHECK (price_cents >= 0),
      currency text NOT NULL DEFAULT 'USD',
      active boolean NOT NULL DEFAULT true,
      file_key text NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now()
    )
  `);
  await pool.query("ALTER TABLE products DROP CONSTRAINT IF EXISTS products_price_cents_check");
  await pool.query(
    "ALTER TABLE products ADD CONSTRAINT products_price_cents_check CHECK (price_cents >= 0)"
  );
  await pool.query(`
    ALTER TABLE products
      ADD COLUMN IF NOT EXISTS product_type text CHECK (product_type IN ('affiliate', 'direct')) DEFAULT 'direct',
      ADD COLUMN IF NOT EXISTS affiliate_url text,
      ADD COLUMN IF NOT EXISTS affiliate_source text,
      ADD COLUMN IF NOT EXISTS display_price text,
      ADD COLUMN IF NOT EXISTS image_url text,
      ADD COLUMN IF NOT EXISTS image_alt text,
      ADD COLUMN IF NOT EXISTS badge text,
      ADD COLUMN IF NOT EXISTS featured_rank integer,
      ADD COLUMN IF NOT EXISTS category text,
      ADD COLUMN IF NOT EXISTS collection text
  `);
  await pool.query("UPDATE products SET product_type = 'direct' WHERE product_type IS NULL");
};

const upsertDirectProduct = async (pool, input) => {
  const product = normalizeProduct(input);
  await pool.query(
    `
      INSERT INTO products (
        slug, name, description, price_cents, currency, active, file_key,
        product_type, affiliate_url, affiliate_source, display_price,
        image_url, image_alt, badge, featured_rank, category, collection
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7,
        'direct', NULL, NULL, $8,
        $9, $10, $11, $12, $13, $14
      )
      ON CONFLICT (slug) DO UPDATE SET
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        price_cents = EXCLUDED.price_cents,
        currency = EXCLUDED.currency,
        active = EXCLUDED.active,
        file_key = EXCLUDED.file_key,
        product_type = 'direct',
        affiliate_url = NULL,
        affiliate_source = NULL,
        display_price = EXCLUDED.display_price,
        image_url = EXCLUDED.image_url,
        image_alt = EXCLUDED.image_alt,
        badge = EXCLUDED.badge,
        featured_rank = EXCLUDED.featured_rank,
        category = EXCLUDED.category,
        collection = EXCLUDED.collection
    `,
    [
      product.slug,
      product.name,
      product.description,
      product.price_cents,
      product.currency,
      product.active,
      product.file_key,
      product.display_price,
      product.image_url,
      product.image_alt,
      product.badge,
      product.featured_rank,
      product.category,
      product.collection,
    ],
  );
};

const printStatus = async (pool) => {
  const counts = await pool.query(`
    SELECT COALESCE(product_type, 'direct') AS product_type, active, COUNT(*)::int AS count
    FROM products
    GROUP BY COALESCE(product_type, 'direct'), active
    ORDER BY product_type, active DESC
  `);
  const direct = await pool.query(`
    SELECT slug, name, price_cents, currency, file_key, active
    FROM products
    WHERE COALESCE(product_type, 'direct') = 'direct'
    ORDER BY created_at DESC
    LIMIT 25
  `);
  const availableFileKeys = getAvailableFileKeys();

  console.log("\nProduct counts:");
  if (counts.rowCount === 0) {
    console.log("  (no products)");
  } else {
    for (const row of counts.rows) {
      console.log(`  ${row.product_type} | active=${row.active} | ${row.count}`);
    }
  }

  console.log("\nDirect products:");
  if (direct.rowCount === 0) {
    console.log("  (none)");
  } else {
    for (const row of direct.rows) {
      const amount = (row.price_cents / 100).toFixed(2);
      const hasFile = availableFileKeys.has(row.file_key);
      const fileStatus = hasFile ? "file=ok" : "file=missing";
      console.log(`  ${row.slug} | ${row.name} | ${amount} ${row.currency} | file_key=${row.file_key} (${fileStatus}) | active=${row.active}`);
    }
  }
  console.log("");
};

const seedFromCatalog = async (pool, fileArg) => {
  const catalogPath = path.resolve(ROOT, fileArg || DEFAULT_CATALOG_PATH);
  if (!fs.existsSync(catalogPath)) {
    throw new Error(`Catalog file not found: ${catalogPath}`);
  }

  const raw = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
  if (!Array.isArray(raw)) {
    throw new Error("Catalog file must be a JSON array.");
  }

  for (const product of raw) {
    await upsertDirectProduct(pool, product);
  }
  console.log(`Seeded ${raw.length} direct products from ${catalogPath}`);
};

const addOne = async (pool, args) => {
  const product = {
    slug: args.slug,
    name: args.name,
    description: args.description,
    price_cents: args["price-cents"],
    currency: args.currency || "USD",
    file_key: args["file-key"],
    active: !args.inactive,
    display_price: args["display-price"] || null,
    image_url: args["image-url"] || null,
    image_alt: args["image-alt"] || null,
    badge: args.badge || null,
    featured_rank: args["featured-rank"] || null,
    category: args.category || null,
    collection: args.collection || "Digital Downloads",
  };
  await upsertDirectProduct(pool, product);
  console.log(`Upserted direct product: ${product.slug}`);
};

const setActiveBySlug = async (pool, slug, active) => {
  if (!slug) {
    throw new Error("Missing --slug for activate/deactivate command.");
  }
  const result = await pool.query(
    `
      UPDATE products
      SET active = $2
      WHERE slug = $1
        AND COALESCE(product_type, 'direct') = 'direct'
    `,
    [slug, active],
  );
  if (result.rowCount === 0) {
    throw new Error(`No direct product found for slug "${slug}".`);
  }
  console.log(`${active ? "Activated" : "Deactivated"} direct product: ${slug}`);
};

const main = async () => {
  loadDotEnv();
  const dbUrl = process.env.NETLIFY_DATABASE_URL || process.env.NETLIFY_DATABASE_URL_UNPOOLED;
  if (!dbUrl) {
    console.error("Missing NETLIFY_DATABASE_URL (or NETLIFY_DATABASE_URL_UNPOOLED).");
    console.error("Set it in .env, then rerun.");
    process.exit(1);
  }

  const command = process.argv[2] || "status";
  const args = parseArgs(process.argv.slice(3));
  const pool = new Pool({
    connectionString: dbUrl,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await ensureProductsSchema(pool);
    if (command === "status") {
      await printStatus(pool);
      return;
    }
    if (command === "seed") {
      await seedFromCatalog(pool, args.file);
      await printStatus(pool);
      return;
    }
    if (command === "add") {
      await addOne(pool, args);
      await printStatus(pool);
      return;
    }
    if (command === "activate") {
      await setActiveBySlug(pool, args.slug, true);
      await printStatus(pool);
      return;
    }
    if (command === "deactivate") {
      await setActiveBySlug(pool, args.slug, false);
      await printStatus(pool);
      return;
    }

    console.log(usage.trim());
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
};

main().catch((error) => {
  console.error("manage-direct-products failed:", error.message);
  process.exit(1);
});
