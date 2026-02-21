
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
| `ADSTERRA_SMARTLINK_URL` | Functions | Smartlink used to render sponsored blog ads in side rails. |
| `ADSTERRA_API_KEY` | Functions | Optional token for future Adsterra API reporting/validation. |
| `ADSTERRA_API_TOKEN` | Functions | Alias for `ADSTERRA_API_KEY`. |
| `ADSTERRA_BANNER_160X600_KEY` | Functions | Adsterra banner key for 160x600 blog rail unit. |
| `ADSTERRA_BANNER_160X600_HOST` | Functions | Optional banner invoke host (defaults to `https://www.highperformanceformat.com`). |
| `ADSTERRA_ENABLE_BANNER` | Functions | Enable/disable banner unit (`true` by default). |
| `ADSTERRA_BANNER_300X250_KEY` | Functions | Adsterra banner key for 300x250 blog rail unit. |
| `ADSTERRA_ENABLE_BANNER_300X250` | Functions | Enable/disable 300x250 banner unit (`true` by default). |
| `ADSTERRA_NATIVE_BANNER_SCRIPT_URL` | Functions | Native banner script URL from Adsterra. |
| `ADSTERRA_NATIVE_BANNER_CONTAINER_ID` | Functions | Container ID for native banner render target. |
| `ADSTERRA_ENABLE_NATIVE_BANNER` | Functions | Enable/disable native banner unit (`true` by default). |
| `ADSTERRA_POPUNDER_SCRIPT_URL` | Functions | Optional popunder script URL loaded once per browser session on blog pages. |
| `ADSTERRA_ENABLE_POPUNDER` | Functions | Enable/disable popunder unit (`false` by default). |
| `ADSTERRA_SOCIAL_BAR_SCRIPT_URL` | Functions | Optional social bar script URL loaded once per browser session on blog pages. |
| `ADSTERRA_ENABLE_SOCIAL_BAR` | Functions | Enable/disable social bar unit (`false` by default). |
| `ADSTERRA_ENABLE_SMARTLINK_CARDS` | Functions | Enable/disable Smartlink card ads (`false` by default). |

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
ADSTERRA_SMARTLINK_URL=https://example-direct-link.com/abc123
ADSTERRA_API_KEY=...
ADSTERRA_BANNER_160X600_KEY=06643f94da530c8653056ca20bed791b
ADSTERRA_ENABLE_BANNER=true
ADSTERRA_BANNER_300X250_KEY=6c52a7cad525d46d2ed9bcf515aa81e1
ADSTERRA_ENABLE_BANNER_300X250=true
ADSTERRA_NATIVE_BANNER_SCRIPT_URL=https://pl28759145.effectivegatecpm.com/0bd882acd2ac16aae1cd5ee5402e8f30/invoke.js
ADSTERRA_NATIVE_BANNER_CONTAINER_ID=container-0bd882acd2ac16aae1cd5ee5402e8f30
ADSTERRA_ENABLE_NATIVE_BANNER=true
ADSTERRA_POPUNDER_SCRIPT_URL=https://pl28758998.effectivegatecpm.com/4c/2e/b9/4c2eb9d3f341109bf3567732f1b9c441.js
ADSTERRA_ENABLE_POPUNDER=false
ADSTERRA_SOCIAL_BAR_SCRIPT_URL=https://pl28758999.effectivegatecpm.com/56/b7/6f/56b76f85fc45b5f75093926a9c50884c.js
ADSTERRA_ENABLE_SOCIAL_BAR=false
ADSTERRA_ENABLE_SMARTLINK_CARDS=false
```

## Notes
- Do not expose secrets client-side.
- For local dev, use `.env` with the same variables.

## Read next
- `development.md`
