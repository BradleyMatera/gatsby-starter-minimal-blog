
# Functions reference

## Endpoint map
| Function | Method | Auth | Purpose |
| --- | --- | --- | --- |
| `list_products` | GET | Public | List all active products. |
| `get_product` | GET | Public | Return product by slug. |
| `go` | GET | Public | Affiliate redirect or direct checkout entry. |
| `create_checkout_session` | POST | Public | Stripe Checkout session for direct products. |
| `stripe_webhook` | POST | Stripe | Source of truth for orders + refunds. |
| `get_entitlements` | POST | Public | Validate session and return downloads. |
| `download` | GET | Token | Serve gated download. |
| `get_orders_by_email` | POST | Identity | Customer order history. |
| `get_order_downloads` | POST | Identity | Downloads for a single order. |
| `send_receipt_email` | POST | Identity | Send receipt to customer. |
| `get_blog_ads` | GET | Public | Returns sponsored ad payload for blog side rails. |

## Request examples
### create_checkout_session
```json
{ "product_id": "<uuid>", "quantity": 1 }
```
Response:
```json
{ "url": "https://checkout.stripe.com/..." }
```

### get_orders_by_email
Requires Netlify Identity JWT in `Authorization: Bearer <token>`.

### get_order_downloads
Requires Netlify Identity JWT in `Authorization: Bearer <token>`.

### get_blog_ads
Returns:
- `ads`: Smartlink-backed sponsored card payloads (only when `ADSTERRA_ENABLE_SMARTLINK_CARDS=true`).
- `placements.banner_160x600`: optional Adsterra banner config.
- `placements.banner_300x250`: optional Adsterra banner config.
- `placements.native_banner`: optional Adsterra native banner config.
- `placements.popunder`: optional popunder script config.
- `placements.social_bar`: optional social bar script config.

## Notes
- `stripe_webhook` is the source of truth for payments.
- Download links are time-limited tokens.
- Email lifecycle:
  - Receipt email on purchase.
  - Download-ready email when downloads are generated (success page or portal).
  - Refund email on charge refund.

## Read next
- `development.md`
