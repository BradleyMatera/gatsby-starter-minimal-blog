# Glossary

- **MDX** – Markdown+JSX files under `content/` (pages, posts, templates) that can import React components from `src/components`. Gatsby compiles MDX into nodes that feed the theme’s GraphQL queries (`content/posts/<slug>/index.mdx`).
- **Shadowed component** – A file that replaces a Gatsby theme export by matching its path under `src/@lekoarts/gatsby-theme-minimal-blog/components/`. For example, `src/@lekoarts/.../components/blog.tsx` overrides the theme’s blog listing layout.
- **Theme UI** – The styling system used by `@lekoarts/gatsby-theme-minimal-blog`. Tokens are defined in `gatsby-plugin-theme-ui/index.ts` and applied via `ThemeProvider`. Global variables in `src/styles/global.css` complement Theme UI values.
- **Hero section** – The top section on `/` driven by `src/components/home/HomeHero.tsx`, which renders hero copy, stats, and CTA buttons imported into `src/@lekoarts/gatsby-theme-minimal-blog/texts/hero.mdx`.
- **ProjectCard** – Located at `src/components/ui/ProjectCard.tsx`, this reusable card shows project title, status, technologies, and action links. Content pages import it to render project grids.
- **StatsGrid** – A home section component (`src/components/home/StatsGrid.tsx`) that animates statistical values using `useScrollReveal` and aligns with the hero copy.
- **GraphQL node** – Gatsby creates nodes for each MDX file (e.g., `allPost`). These nodes supply fields like `date`, `slug`, and `excerpt` when the theme runs queries during `npm run build`.
- **ProjectHub proxy** – `projecthub-proxy/server.js` exposes `POST /api/chat` and relays requests to xAI’s Grok API. It adds CORS headers, rate limiting, and logs each request/response pair.
- **Smoke test (`npm test`)** – `scripts/verify-main-route.js` builds the site and verifies that `public/index.html` contains the hero title snippet (`Bradley Matera — Accessible web developer`). Used inside `npm run check` to keep builds safe.
- **Netlify form** – The contact form in `content/pages/contact/index.mdx` uses `data-netlify="true"` and a `bot-field` honeypot so Netlify can capture submissions without extra backend code.
