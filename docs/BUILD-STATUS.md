# Build Status

## Install
- `npm install` — ✅ succeeds (warnings about 40 vulnerabilities; run `npm audit` for details) and refreshes `node_modules`.

## Dev
- `npm run dev -- --help` — ✅ invokes `gatsby develop --help` and exits cleanly, proving the dev command resolves. **Assumption:** running `npm run dev` without flags will start the dev server on port 8000; *How to verify:* run `npm run dev` and confirm the process logs listening on port 8000.

## Test
- `npm test` — ✅ runs `node scripts/verify-main-route.js`, which in turn executes `npm run build` before checking that `public/index.html` contains the expected hero title snippet. This fulfills the smoke-test requirement that the main route renders HTML.

## Build
- `npm run build` — ✅ completes in ~26s with repeated `baseline-browser-mapping` warnings about stale data and a `punycode` deprecation notice; the published `public/index.html` remains stable.

## Check
- `npm run check` — ✅ executes `npm run lint` followed by `npm test`, ensuring linting, the smoke test, and a build pass in a single command.
