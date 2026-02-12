
# bradleymatera.dev

Production Gatsby site with a real store and customer portal.

## Documentation
Start at `docs/README.md` for the full documentation flow.

## Quick start
```bash
npm install
npm run develop        # Gatsby at http://localhost:8000
netlify dev --no-open  # Site + functions at http://localhost:8888
```

## What this repo includes
- Portfolio + blog (Gatsby).
- Store with two product types:
  - Direct digital downloads (Stripe Checkout).
  - Affiliate picks (Amazon links).
- Customer portal for purchases (Netlify Identity).

## Key routes
- `/store` (listing)
- `/store/:slug` (detail)
- `/go/:slug` (affiliate redirect or direct checkout)
- `/purchases` (customer portal)
- `/success` and `/cancel`
- `/support`

## Source of truth
Code is the source of truth. Docs are aligned to the current codebase.
