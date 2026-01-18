# First-Week Plan

## Prioritized improvements
1. **Move components into the new structure.** Use the empty directories (`src/layout`, `src/sections`, `src/primitives`, `src/visuals`, etc.) to relocate UI pieces while keeping the existing `src/components` entry points as re-exports until every MDX import has been updated.
2. **Document the new source layout inside `README.md` and the `docs/` guides.** Once files live in `src/primitives`/`src/sections`, update `docs/content-authoring.md`, `docs/styling.md`, and any architecture notes so they point to the new paths.
3. **Consolidate styling helpers.** Move anything still importing `src/components/style.css` into `src/styles` (or rename it to `legacy-section-styles.css`) and document where to add new CSS/Tailwind tokens.
4. **Harden proxy automation.** Add a lightweight test for `projecthub-proxy/server.js` (e.g., via `supertest` with a mocked `fetch`) so `npm run test` can verify the chat route in CI and guard future changes.

## Known risks
- **Dependency warnings (`baseline-browser-mapping`, `punycode`).** They appear on every `npm run build` and `npm run check`; refreshing or replacing the underlying packages would be a separate breaking change.
- **Moving files while MDX imports still point at `src/components`.** Any relocation must be followed by updating all MDX/JSX imports and verifying with `npm run check` so GraphQL queries continue to resolve.
- **ProjectHub proxy secrets.** `projecthub-proxy/server.js` logs whether `XAI_API_KEY` is present. Keep credentials in the hosting platform (Render/Netlify) and avoid committing them; rotate keys regularly.

## Suggested tests to add
1. **API contract test for `/api/chat`.** Start the proxy in a test harness with a stubbed `fetch`, hit `POST /api/chat`, and assert that the response shape includes `reply` or the expected error body plus the rate-limit headers.
2. **Additional content smoke test.** Extend `scripts/verify-main-route.js` or add a sibling script that builds the site, reads another HTML page (e.g., `/blog/index.html` or `/contact/index.html`), and checks for key headings so the smoke test covers more than the hero title.
