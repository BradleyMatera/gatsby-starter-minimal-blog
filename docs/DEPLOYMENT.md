# Deployment Notes

## Primary site
- The Gatsby site lives at `https://bradleysgatsbyblog.netlify.app` (Netlify-hosted). Netlify’s build settings point to this repo, run `npm run build`, and publish the `public/` directory.
- Before merging any change, run `npm run check` locally so your branch mirrors the Netlify pipeline (`lint` + smoke `test` which itself runs `npm run build`).
- The contact form in `content/pages/contact/index.mdx` posts directly to Netlify (via `data-netlify="true"`); ensure the markup still renders before deploying.

## Optional services
- `projecthub-proxy/server.js` is a standalone Express app; deploy it wherever you host lightweight Node services (Render, Fly, AWS EC2, etc.).
- Configure `XAI_API_KEY` and `PORT` in that environment. The server is rate-limited to 100 requests per 15 minutes; adjust the options inside the file if your traffic needs differ.
- Since the proxy relays to `https://api.x.ai/v1/chat/completions`, keep the API key secret and rotate it per xAI’s guidance. Add logging/monitoring around the `console.log` statements in `server.js` if you need richer telemetry.

## CI/CD checklist
1. `npm install` (or `bun install`) to populate `node_modules`.
2. `npm run check` to run ESLint + the smoke test (build + hero title assertion).
3. (Optional) Run any custom smoke tests you add under `scripts/` before pushing.
4. Push to Netlify / GitHub Actions (depending on your target); Netlify will run `npm run build` automatically.
5. After deployment, verify the Netlify Forms dashboard if the contact form is essential.

## Diagnostics during deployment
- Netlify logs warn about `baseline-browser-mapping` and `punycode` during builds; these are known warnings emitted by dependencies and do not fail the build. Document them in this file so future maintainers know they are expected.
- If Netlify (or your CDN) reports stale HTML after shipping, run `npm run clean` locally and ask the hosting platform to clear caches before re-deploying.
