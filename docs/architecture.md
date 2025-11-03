# Architecture Overview

This site is a customized version of `@lekoarts/gatsby-theme-minimal-blog` running on Gatsby 5. The base theme handles GraphQL data sourcing, routing, and MDX rendering; this repository shadows many theme files to deliver a tailored portfolio experience.

## Gatsby Layers

| Layer | Location | Purpose |
| ----- | -------- | ------- |
| Theme defaults | `@lekoarts/gatsby-theme-minimal-blog` (node_modules) | Provides page templates, GraphQL schema, typography tokens, and baseline styles. |
| Shadowed components | `src/@lekoarts/gatsby-theme-minimal-blog/` | Overrides specific theme components (homepage, layout, blog, post, navigation). |
| Site-specific components | `src/components/**` | Reusable UI primitives (`Section`, `Card`, `ProjectCard`, `AnchorNav`, `Link`) and bespoke sections (`HomeHero`). |
| Content | `content/pages`, `content/posts` | MDX sources queried at build time and rendered through the theme’s GraphQL layer. |
| Global styling | `src/styles/global.css` | CSS variables and layout styles applied outside the Theme UI context. |

## Routing & Pages

- **Homepage** (`/`): Gatsby uses `src/@lekoarts/gatsby-theme-minimal-blog/components/homepage.tsx`. That component pulls in the MDX section files under `texts/` and the `HomeHero` React component.
- **Blog listing** (`/blog`): Shadowed `components/blog.tsx` adds the search bar, tag filters, and custom empty state.
- **Individual posts** (`/blog/<slug>`): Shadowed `components/post.tsx` extends the article layout with a table of contents and CTA footer.
- **Standalone pages**: Content in `content/pages/**/index.mdx` is turned into routes via the theme’s file system routing.
- **Tags archive**: Provided by the base theme, still using the upstream component.

## Component Map

```
content/pages/*.mdx ──────► MDXProvider (mdx-components.tsx)
                            ├── Section / Card / ProjectCard (src/components/ui)
                            └── Link wrapper (internal vs external detection)

content/posts/*.mdx ──────► Blog/Post components
                            └── BlogCard.tsx for listings

Homepage ────────────────► HomeHero.tsx + sections in texts/hero.mdx & texts/bottom.mdx
```

The MDX provider uses `src/@lekoarts/.../components/mdx-components.tsx` to replace default elements with project-specific components. That gives authors access to the same abstractions in MDX that the React pages use, keeping styling consistent.

## Styling Flow

1. **Theme UI Provider**: The theme injects tokens defined in `gatsby-plugin-theme-ui/index.ts` (colors, fonts, buttons, card styles) and wraps all pages in `ThemeProvider`.
2. **Global CSS**: `gatsby-browser.js` imports `src/styles/global.css`; these rules target the layout shell, header, hero grid, cards, filters, etc.
3. **Utility classes**: Some legacy components import `src/components/style.css`, which compiles Tailwind directives via PostCSS.

When the site renders, Theme UI-generated classes and the custom CSS cascade together. The global CSS takes precedence for high-level layout, while Theme UI styles still apply inside shadowed components that use `sx` props.

## Data Fetching

The theme’s GraphQL layer automatically queries for:

- Site metadata defined in `gatsby-config.ts`
- MDX nodes for pages and posts (`allPost`, `allMdxPage`)
- Tags aggregated per post

Shadowed components reuse these queries (no manual GraphQL files in this repo). If you add new fields to frontmatter, extend the theme’s queries by shadowing the corresponding `.tsx` files and adjusting the GraphQL fragments.

## Supporting Services

- **ProjectHub Proxy**: `projecthub-proxy/server.js` is an optional Express server that sits alongside the static site. It is not part of the Gatsby build but can be deployed separately to provide authenticated access to xAI’s Grok API for the ProjectHub chat demo.
- **Analytics**: `gatsby-plugin-google-analytics` injects GA4 scripts on build. The tracking ID is managed in `gatsby-config.ts`.
- **RSS / Sitemap / Manifest**: Standard Gatsby plugins configured in `gatsby-config.ts` and do not require additional code in this repo.

## Extending the Architecture

1. **New Layout Sections**: Create a React component under `src/components/` and import it inside an MDX file (e.g., append a section in `texts/hero.mdx`) to include it on the homepage.
2. **Interactive Overview Section**: See [docs/overview-section.md](./overview-section.md) for a full walkthrough of the “Quick overview / Where I’m focused right now” implementation, including StatusRow, scroll-reveal, and animation details.
3. **Additional Pages**: Add `content/pages/<slug>/index.mdx` with frontmatter. Use the UI primitives for consistent styling.
4. **Custom GraphQL Data**: Add a Gatsby source plugin or modify `gatsby-node.js` (not currently used). Shadow theme components to query and render the new data.

Remember to update the documentation alongside any structural change so future contributors understand the flow.

---

## Noteworthy/Unusual Aspects

- Theme shadowing for custom layout, navigation, and blog features.
- MDX everywhere: all content authored in MDX, React components imported for rich layouts.
- Express proxy for xAI Grok API (optional, not part of Gatsby build).
- Three-layer design system: Theme UI, global CSS, Tailwind utilities.
- Accessibility: semantic headings, skip nav, focus-visible outlines, aria labels, dark-mode infrastructure.
- Performance: static HTML/JS, CDN hosting, bundle analysis via Statoscope.
- Security: external links use `rel="noopener noreferrer"`, Netlify forms use honeypot, proxy is rate-limited.
- Docs-first: every major feature, workflow, and design decision is documented in detail.

## Recommendations for Lean Efficiency

- Keep docs current with every workflow, content, or design change.
- Group content using tags/themes in MDX frontmatter for filtering and series.
- Audit assets for descriptive alt text and responsive formats.
- Expand case studies for all major projects.
- Add JSON-LD for articles/case studies for SEO (see `docs/structured-data.md`).
- Consider breadcrumbs for long-form content and role pages (see `docs/breadcrumbs.md`).

## See Also

- [README.md](../README.md): Entry point and documentation map.
- [Development](./development.md): Workflow, scripts, troubleshooting, deployment.
- [Content Authoring](./content-authoring.md): MDX structure, frontmatter, imports.
- [Styling](./styling.md): Theme UI, global CSS, Tailwind, design system.
- [Site Review](./site-review.md): UX, accessibility, performance, opportunities.
- [Overview Section](./overview-section.md): Homepage interactive section.
- [Redesign Concept](./redesign-concept.md): Visual/UX philosophy, wireframes.
- [Audit Inventory](./audit-inventory.md): Content themes, gaps, recommendations.
- [Breadcrumbs](./breadcrumbs.md): Navigation strategy (new).
- [Structured Data](./structured-data.md): SEO and rich snippets (new).
