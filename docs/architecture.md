# Architecture

## High-level overview
This Gatsby site is a static-first portfolio/blog built on `@lekoarts/gatsby-theme-minimal-blog`. The theme handles routing, blog pagination, and MDX rendering, while this repository shadows key components under `src/@lekoarts/gatsby-theme-minimal-blog/components/` and overrides styling via `src/styles/global.css`. `gatsby-config.ts` stitches together metadata, Theme UI overrides, feed/sitemap/manifest plugins, and conditionally runs `gatsby-plugin-webpack-statoscope` when `ANALYSE_BUNDLE` is truthy.

## Subsystem: Content → GraphQL → static pages
- All editable copy lives under `content/`. `content/pages/**/index.mdx` feeds static site routes (About, Projects, Roles, Contact) while `content/posts/<slug>/index.mdx` provides the blog entries and their frontmatter (`title`, `slug`, `date`, `tags`, `description`, etc.). `content/templates` contains shared MDX layouts reused by posts.
- Gatsby loads that MDX through the default filesystem + `gatsby-plugin-mdx`. Each MDX file becomes a `Mdx` or `Post` GraphQL node that the theme queries inside `src/@lekoarts/.../components/blog.tsx`, `post.tsx`, and the homepage text files (`texts/hero.mdx`, `texts/bottom.mdx`).
- The custom `HomeHero` React section (`src/components/home/HomeHero.tsx`) is imported by `texts/hero.mdx` to keep the hero copy, stats, and feature cards in sync with JSX semantics.

## Subsystem: UI + styling
- Reusable UI primitives live in `src/components/ui/` (e.g., `Section`, `Card`, `ProjectCard`, `Link`, `Badge`, `StatusRow`), so MDX authors import them directly with relative paths (e.g., `import { Section, Card } from "../../../src/components/ui"`).
- Layout pieces like `SiteHeader`, `SiteFooter`, `ThemeToggle`, and `NavSystemBadge` provide navigation, theme toggling, and call-to-action slots. `gatsby-browser.js`/`gatsby-ssr.js` import `src/styles/global.css` so the global CSS + custom properties apply to every page.
- `src/styles/global.css` defines the typography scale, card surfaces, hero grid, and color-mode variables. Additional utility classes live in `src/components/style.css` for legacy sections.
- Visual accents (`TinyDotClusterAccent.tsx`, `BlogAccent.tsx`, `ThreeScene.tsx`, etc.) live alongside the components that use them. Animations rely on the `useScrollReveal` hook (`src/components/home/useScrollReveal.ts`) and the `ScrollReveal` observer component.

## Subsystem: Build & tooling
- `npm run lint` uses ESLint with TypeScript and React plugins configured in `eslint.config.js`; the config ignores theme shadow files and the new `scripts/` folder that contains the smoke test.
- `npm run build` invokes Gatsby’s production build. The output to `public/` includes HTML, JSON, `page-data`, `static` assets, and `styles.*.css` that include the design system tokens. `tailwind.config.js` ensures Tailwind utilities in `src/styles` or `src/components/style.css` stay in sync by scoping `content` to `src/**/*` and `content/**/*`.
- `scripts/verify-main-route.js` is a smoke test that runs `npm run build` and ensures the hero title (`Bradley Matera — Accessible web developer`) appears in `public/index.html`. `npm run check` chains lint + test so CI can run both at once.

## Subsystem: Optional services
- The ProjectHub chat proxy (`projecthub-proxy/server.js`) sits outside the Gatsby build. It exposes `POST /api/chat`, enforces CORS/rate-limits, and forwards messages to `https://api.x.ai/v1/chat/completions` using the `XAI_API_KEY` environment variable. `PORT` controls the listening port (default 3000) and the server logs every request/response payload for observability.

## Data & request flow summary
1. Gatsby watches `content/` and builds MDX nodes, supplying them to the theme’s GraphQL queries (for `/`, `/blog`, `/posts/*`, `/tags/*`, `/roles/*`, etc.).
2. Theme components or shadowed replacements (`src/@lekoarts/.../components`) render the final HTML. Custom React sections and primitives are imported wherever richer interactions (stats, project cards, hero CTAs) are needed.
3. `gatsby-plugin-feed`, `gatsby-plugin-sitemap`, and `gatsby-plugin-manifest` read the same metadata from `gatsby-config.ts` to produce RSS, sitemap, and web manifest files.
4. The resulting artifacts live under `public/` ready for CDN hosting (Netlify, for the live site). The contact form posts are handled by Netlify Forms (`data-netlify="true"` attributes in `content/pages/contact/index.mdx`).
5. Optional runtime services (ProjectHub proxy) can run separately; the Gatsby frontend can call it for chat helper flows when `XAI_API_KEY` is configured.

## Why this matters for newcomers
Understanding this separation keeps contributions safe: content writers touch `content/*.mdx`, theme maintainers edit `src/@lekoarts/*`, and layout work stays in `src/components`. The build/test hooks (`npm run check`) confirm that these layers still compile before deployment.
