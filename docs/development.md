# Development & Operations

## Prerequisites

- Node.js 18 or newer (Gatsby 5 requires Node ≥ 18.0).
- npm 9+ or Yarn 1.x. The repo currently uses npm with a `package-lock.json`.
- (Optional) An xAI Grok API token if you plan to run the ProjectHub proxy locally.

Install dependencies once:

```bash
npm install
```

## Core Scripts

| Command | Description |
| ------- | ----------- |
| `npm run develop` | Start Gatsby in development mode at `http://localhost:8000` (GraphQL IDE on `:8000/___graphql`). |
| `npm run build` | Create a production bundle in `public/`. |
| `npm run serve` | Serve the production build locally (useful for QA). |
| `npm run clean` | Clear Gatsby’s `.cache` and `public/` folders before the next build. |

### Useful Environment Variables

| Variable | Effect |
| -------- | ------ |
| `ANALYSE_BUNDLE=1` | When set, `npm run build` writes Statoscope reports to `public/.statoscope/`. |
| `GATSBY_EXPERIMENTAL_PAGE_BUILD_ON_DATA_CHANGES=true` | Optional Gatsby incremental builds (useful in CI). |

Create a `.env` file if you need to persist variables locally. `gatsby-config.ts` loads environment variables via `dotenv/config`.

## Code Structure Tips

- TypeScript is enabled with `strict: true`. When shadowing theme components, prefer `.tsx` files to keep typings intact.
- Shared UI primitives live under `src/components/ui`. Reuse them inside MDX to avoid diverging styles.
- The `Link` component expects an `href` prop for external URLs and automatically routes internal paths through Gatsby. Follow that convention in MDX/JSX to avoid broken anchors.

## Running the ProjectHub Proxy (Optional)

```
cd projecthub-proxy
npm install         # only needed once if you extend the proxy
XAI_API_KEY=... \
PORT=3000 \
node server.js
```

The proxy exposes `POST /api/chat` and can be consumed by local demos or deployed separately. Rate limiting defaults to 100 requests per 15 minutes.

## Testing & Quality

No automated test suites are configured yet. Recommended manual checks:

- Run `npm run build` before committing major changes to ensure Gatsby compiles.
- Use the built-in `http://localhost:8000/___graphql` explorer to confirm MDX frontmatter exposes the fields you expect.
- Validate accessibility with browser tools (e.g., Lighthouse, Axe). Several sections (hero cards, navigation) rely on custom semantics, so regressions are easy to introduce.

## Deployment Workflow

1. **Netlify**: The current live site deploys from this repository. Default settings: build command `npm run build`, publish directory `public/`.
2. **Environment Variables**: Configure analytics IDs, bundle analysis flags, or proxy endpoints as needed in your hosting provider.
3. **Cache Considerations**: When switching between branches or large content updates, run `npm run clean` locally and clear caches on your hosting platform to prevent stale HTML.
4. **Preview Builds**: Use Netlify/Gatsby preview builds when editing MDX so you can verify layout and GraphQL data before merging.

## Troubleshooting

- **Broken navigation links**: Ensure MDX imports use the local `Link` component (`import Link from "../../../src/components/ui/Link";`) and pass `href` (external) or `to` (internal) as expected.
- **Styling regressions**: Many selectors live in `src/styles/global.css`. Search for the class in this file first, then check Theme UI’s `gatsby-plugin-theme-ui/index.ts` if the issue involves tokens or `sx` props.
- **Build failures after dependency changes**: Clear caches (`npm run clean`), delete `.cache` and `public`, then reinstall dependencies.
- **ProjectHub errors**: Confirm the proxy is running and `XAI_API_KEY` is set. The server logs will indicate whether the token is missing or xAI returned an error payload.

Keep this document updated when you add new scripts, introduce linting/testing, or change the deployment target.
