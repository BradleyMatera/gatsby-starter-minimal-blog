
# Environment variables

## Required
| Variable | Used by | Purpose |
| --- | --- | --- |
| `NETLIFY_DATABASE_URL` | Functions | Pooled DB connection for runtime queries. |
| `NETLIFY_DATABASE_URL_UNPOOLED` | CLI | Migrations and seed scripts. |
| `SITE_URL` | Functions | Canonical URL for redirects and emails. |
| `STRIPE_SECRET_KEY` | Functions | Stripe API for Checkout + verification. |
| `STRIPE_WEBHOOK_SECRET` | Functions | Webhook signature verification. |
| `DOWNLOAD_TOKEN_SECRET` | Functions | HMAC secret for download tokens. |
| `RESEND_API_KEY` | Functions | Receipt emails. |
| `ORDER_EMAIL_FROM` | Functions | Receipt sender address. |

## Optional
| Variable | Used by | Purpose |
| --- | --- | --- |
| `ORDER_SUPPORT_EMAIL` | Functions | Reply-to for receipts (defaults in code). |
| `GATSBY_IDENTITY_URL` | Frontend | Identity base URL override. |

## Example .env (no secrets)
```
NETLIFY_DATABASE_URL=postgresql://.../neondb
NETLIFY_DATABASE_URL_UNPOOLED=postgresql://.../neondb
SITE_URL=http://localhost:8888
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
DOWNLOAD_TOKEN_SECRET=...
RESEND_API_KEY=re_...
ORDER_EMAIL_FROM=Bradley Matera <receipts@bradleymatera.dev>
ORDER_SUPPORT_EMAIL=bradmatera@gmail.com
```

## Notes
- Do not expose secrets client-side.
- For local dev, use `.env` with the same variables.

## Read next
- `development.md`
