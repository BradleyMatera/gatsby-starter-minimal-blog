
# Debugging

## Common issues

### Webhook 404/500
- Verify the endpoint path: `/.netlify/functions/stripe_webhook`.
- Confirm `STRIPE_WEBHOOK_SECRET` is correct.

### Missing env vars
- Check Netlify env vars (and local `.env`).
- `STRIPE_SECRET_KEY`, `RESEND_API_KEY`, and `DOWNLOAD_TOKEN_SECRET` are required.

### Resend 403 domain not verified
- Verify the domain in Resend and re-test.

### "lookup_token does not exist"
- Migrations not applied or DB schema is behind. Run migrations.

### Failed to fetch on store page
- Functions not running (use `netlify dev`).

## Read next
- `BUILD-STATUS.md`
