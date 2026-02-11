
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
| `get_orders_by_email` | POST | Identity or lookup | Customer order history. |
| `get_order_downloads` | POST | Identity or lookup | Downloads for a single order. |
| `send_receipt_email` | POST | Identity or lookup | Send receipt to customer. |

## Request examples
### create_checkout_session
```json
{ "product_id": "<uuid>", "quantity": 1 }
```
Response:
```json
{ "url": "https://checkout.stripe.com/..." }
```

### get_orders_by_email (unauthenticated)
```json
{ "email": "you@example.com", "lookup_token": "<code>" }
```

### get_order_downloads (unauthenticated)
```json
{ "order_id": "<uuid>", "email": "you@example.com", "lookup_token": "<code>" }
```

## Notes
- `stripe_webhook` is the source of truth for payments.
- Download links are time-limited tokens.

## Read next
- `development.md`
