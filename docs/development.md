
# Development

## Local dev
```bash
npm install
npm run develop        # Gatsby on http://localhost:8000
netlify dev --no-open  # Site + functions on http://localhost:8888
```

## Ports and routing
- Gatsby dev server: 8000
- Netlify dev proxy: 8888
- The store uses the 8888 proxy so functions work locally.

## Database
- Local uses `NETLIFY_DATABASE_URL` from `.env`.
- Apply migrations and seeds with `psql`.

## Stripe webhooks (local)
```bash
stripe listen --forward-to http://localhost:8888/.netlify/functions/stripe_webhook
```
Set `STRIPE_WEBHOOK_SECRET` to the CLI secret for local.

## Identity (local)
Set `SITE_URL=http://localhost:8888` and, if needed, `GATSBY_IDENTITY_URL` so redirects stay local.

## Read next
- `DEPLOYMENT.md`
