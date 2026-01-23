# Project Tour

## What is this repo?
This is a Gatsby 5 site that doubles as Bradley Matera’s portfolio, role pages, and MDX-powered blog. It extends `@lekoarts/gatsby-theme-minimal-blog` with shadowed components (`src/@lekoarts/gatsby-theme-minimal-blog/components/*`), bespoke React sections under `src/components`, and a global CSS layer in `src/styles/global.css`. There is also an auxiliary Express proxy (`projecthub-proxy/server.js`) that relays ProjectHub chat requests to the xAI Grok API without leaking the API key.

## How to run it locally
1. `npm install` (required once; also triggered automatically via Bun if you prefer `bun install`).
2. `npm run dev` (or `npm run develop`) to start Gatsby at `http://localhost:8000`. The GraphiQL explorer lives at `/___graphql` for inspecting the data layer.
3. `npm run build` generates the production bundle in `public/`.
4. `npm run serve` previews that bundle locally.
5. `npm run lint` runs ESLint across `.js/.jsx/.ts/.tsx` files.
6. `npm test` runs `scripts/verify-main-route.js`, which performs a build and sanity-checks that `public/index.html` contains the hero title. `npm run check` chains `lint` + `test` as the single safety-net command.
7. Optional: run `projecthub-proxy/server.js` with `XAI_API_KEY` and `PORT` to replicate the chat proxy (the script logs `console.log` statements defined in `projecthub-proxy/server.js`).

## Folder-by-folder breakdown
- `content/` – All MDX sources. `content/pages/**/index.mdx` publishes static pages (about, contact, roles, projects) while `content/posts/<slug>/index.mdx` houses blog articles. Templates and reusable components live under `content/templates/` and `content/components/` when MDX fragments are shared.
- `src/@lekoarts/gatsby-theme-minimal-blog/` – Theme shadow overrides (layout, header, blog, post, MDX components) and story-driven text files (`texts/hero.mdx`, `texts/bottom.mdx`). These files replace the default theme behavior without editing the package.
- `src/components/` – Custom React/JS helpers used by the MDX sections, including the hero (`home/`), blog card (`blog/`), shared UI primitives (`ui/`), page-specific content (`pages/ContactContent.tsx`), and accent/scene decorations (`ThreeHero.tsx`, `TinyDotClusterAccent.tsx`). The layout shell (`hero layout`, `site header/footer`, `theme toggle`) also lives here.
- `src/styles/` – Global CSS (`global.css`) for typography, cards, layout, and color-mode variables plus a legacy `style.css` that some MDX components still import. Gatsby pulls this CSS through `gatsby-browser.js` and `gatsby-ssr.js`.
- `src/utils/` – Small helpers such as the class-name joiner (`cx.ts`).
- `projecthub-proxy/` – Minimal Express server with CORS, rate limiting, JSON parsing, and a POST `/api/chat` route that forwards the body to `https://api.x.ai/v1/chat/completions`. Environment variables are read at the top of `server.js`.
- `scripts/` – Automation helpers. `verify-main-route.js` runs `npm run build` and ensures the hero title appears in the rendered HTML. This is the core of the smoke test.
- `static/` – Static assets that copy directly into `public/` during the build (icons, hero images, robots.txt). If you add new images here, Gatsby makes them available at `/static/<name>`.
- `docs/` – Living documentation (this tour, operations notes, architecture, styling guides, audits). Update the relevant doc whenever you touch a workflow.
- Root files: `gatsby-config.ts` (site metadata, plugin list), `gatsby-node.js` (filters `ESLintWebpackPlugin` to keep Gatsby builds fast), `gatsby-browser.js`/`gatsby-ssr.js` (import globals and set the `data-theme` attribute), `package.json`, `tsconfig.json`, `tailwind.config.js`, and lockfiles for npm and Bun.

## Important entry points to review first
- `gatsby-config.ts`: Configures site metadata, navigation, RSS feed, manifest, and conditionally enables `gatsby-plugin-webpack-statoscope` when `ANALYSE_BUNDLE` is set.
- `src/@lekoarts/.../components/`: Shadowed theme components (`layout.tsx`, `blog.tsx`, `post.tsx`, `mdx-components.tsx`) that dictate global navigation, blog filtering, and MDX rendering.
- `src/components/home/HomeHero.tsx` + `content/@lekoarts/.../texts/hero.mdx`: The hero copy and layout for the homepage.
- `projecthub-proxy/server.js`: Optional chat proxy for the xAI endpoint (`POST /api/chat`).
- `scripts/verify-main-route.js`: Smoke test that bundles the site and validates the hero title before trusting a build.

## How styles work

The styling system uses three layers working together:

1. **Theme UI** (`src/@lekoarts/gatsby-theme-minimal-blog/gatsby-plugin-theme-ui/index.ts`):
   - Provides design tokens (colors, typography, spacing, shadows)
   - Automatically wrapped by `@lekoarts/gatsby-theme-minimal-blog` via ThemeProvider
   - MDX elements (h1-h6, p, ul, ol) get Theme UI styles automatically
   - Components can use `sx` prop for Theme UI styling

2. **Global CSS** (`src/styles/global.css`):
   - Loaded in both `gatsby-browser.js` and `gatsby-ssr.js`
   - Defines CSS custom properties for light/dark themes
   - Styles layout shell (`.layout-shell`, `.site-main`, `.site-content`)
   - Provides utility classes (`.section-shell`, `.surface-card`, `.project-card`, `.grid-two`, etc.)
   - Handles navigation, cards, grids, and responsive breakpoints

3. **MDX Component Mapping** (`src/@lekoarts/gatsby-theme-minimal-blog/components/mdx-components.tsx`):
   - Maps MDX elements to React components
   - Headings (h1-h6) map to Theme UI `Heading` components
   - Paragraphs use custom `.mdx-paragraph` class
   - Custom components (Section, Card, Link, Badge) available in MDX

**Key classes:**
- `.site-content`: Main content container (max-width 1180px, centered, responsive padding)
- `.section-shell`: Section wrapper with consistent spacing
- `.surface-card`: Card component with variants (default, muted, outline)
- `.project-card`: Project card with thumbnail, content, metrics, and actions
- `.grid-two`, `.grid-three`, `.project-gallery`: Responsive grid layouts
- `.hero-banner`, `.skill-category`, `.timeline`, `.inpage-nav`, `.filter-pill`, `.project-card__frame`, `.metric-badge`: Utility hooks for the new hero, skills, timeline, and proof layouts found on the homepage and skill sections.

See `STYLE-REGRESSION.md` for detailed documentation of the styling system and recent fixes.

## Start here path for new contributors
1. Read this tour, then the `README.md` to understand the design goals and live site expectations.
2. Explore `docs/development.md` for the command list, environment variables, and deployment notes.
3. Edit MDX under `content/pages` or `content/posts`; refer to `src/components` and `src/@lekoarts` for the UI primitives those MDX sections consume.
4. Run `npm run check` before pushing changes; it runs linting plus the smoke test that builds the site and checks the hero HTML.
5. Use `docs/ARCHITECTURE.md` (this repo's architecture doc) to trace how content flows through Gatsby's GraphQL layer into the theme components.
