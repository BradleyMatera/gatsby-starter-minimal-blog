# Debugging Guide

## Where to look when something breaks
- **Gatsby console output** (`npm run develop` or `npm run build`) is the primary log source. Build errors mention file paths and GraphQL query fragments at the top of the stack trace.
- **GraphiQL explorer** at `http://localhost:8000/___graphql` lets you query the MDX/post nodes before the UI renders. Use it to verify frontmatter fields (e.g., `slug`, `date`, `tags`).
- **Netlify build logs** show the same console output plus environment variables. Check the Netlify dashboard if the live deploy fails after a merge.
- **ProjectHub proxy logs** appear in the terminal running `projecthub-proxy/server.js`. Requests log the user message + whether `XAI_API_KEY` is set, plus any upstream errors from `fetch`.

## Frequent issues and how to fix them
1. **`baseline-browser-mapping` warnings (`npm run build`)** – These come from Gatsby’s dependency tree warning that the baseline data is stale. Update the package (`npm i baseline-browser-mapping@latest -D`) if you want the freshest numbers, or ignore the warnings; they do not stop the build.
2. **`punycode` deprecation warning** – Gatsby/Gatsby plugin dependencies still import Node’s deprecated `punycode`. No action is needed unless you maintain those packages. Expect the warning during any `npm run build` or `npm run develop` run.
3. **GraphQL query errors about `slug` or `tags`** – Each MDX file under `content/posts` must declare `slug`, `date`, and `tags` in the frontmatter. The error log will point to `gatsby-node.ts` or the theme query; fix the frontmatter or skip the file by moving it outside `content/posts`.
4. **Broken `Link` usage in MDX** – If navigation or CTA anchors stop working, verify you import the shared Link component (`import Link from "../../../src/components/ui/Link"`) and pass `href` for external URLs or `to` for internal ones (`content-authoring.md` documents this). Mistaking `href`/`to` causes Gatsby to treat the link as plain text.
5. **Netlify form submissions failing** – The contact page (`content/pages/contact/index.mdx`) uses `data-netlify="true"` and `bot-field`. If forms stop appearing, ensure the build ran (`npm run build`) so Netlify can parse the markup. Check the Netlify “Forms” dashboard for entries/errors.
6. **ProjectHub proxy returns 500 or no response** – Confirm `XAI_API_KEY` is set before starting `projecthub-proxy/server.js`. The server logs either “Using XAI_API_KEY: Set (hidden)” or “Not set”. A missing API key results in a 401 from `https://api.x.ai/v1/chat/completions` (see the `catch` block in `server.js`).

## Quick verification steps
- `npm run lint` to check code style.
- `npm test` to run the smoke test (build + hero title check).
- `npm run check` to run lint + test in a single pass.
- When editing MDX copy, open GraphiQL to see the data nodes before running the build. Queries such as `allPost(sort: {date: DESC}) { nodes { title slug } }` confirm the GraphQL layer sees your content.
- Use browser devtools to inspect `document.body.dataset.theme` and the `data-theme` attribute set by `gatsby-browser.js`/`ThemeToggle.tsx` for dark/light mode issues.
