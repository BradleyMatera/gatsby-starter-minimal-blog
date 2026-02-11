
# Deployment

Netlify build settings:
- Build command: `npm run build`
- Publish directory: `public`
- Functions directory: `netlify/functions`

Notes:
- `packageManager` is set to npm; do not switch to bun in Netlify builds.
- If Sharp fails, clear the Netlify build cache and redeploy.

## Read next
- `DEBUGGING.md`
