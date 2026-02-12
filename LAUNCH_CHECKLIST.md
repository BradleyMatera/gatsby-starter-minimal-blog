
# Launch checklist

## Core config
- [ ] Netlify DB provisioned and claimed in Neon.
- [ ] All migrations applied.
- [ ] Seed products loaded.
- [ ] Env vars set in Netlify (see `docs/ENVIRONMENT.md`).

## Stripe
- [ ] `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` set.
- [ ] Webhook endpoint returns 200 for `checkout.session.completed`.
- [ ] Direct checkout flow completes without error.

## Resend
- [ ] Domain verified.
- [ ] `RESEND_API_KEY` + `ORDER_EMAIL_FROM` set.
- [ ] Receipt email sends and renders correctly.

## Store UX
- [ ] `/store` loads products and sections (Featured + Brad's Amazon Picks).
- [ ] Amazon links go to specific product pages with tag.
- [ ] `/store/:slug` shows image + ASIN labels.
- [ ] `/go/:slug` redirects correctly.

## Customer portal
- [ ] `/purchases` sign-in works (Netlify Identity).
- [ ] Orders and downloads render after purchase.

## Refund handling
- [ ] `charge.refunded` marks order as refunded.
- [ ] Refunded orders block downloads.
