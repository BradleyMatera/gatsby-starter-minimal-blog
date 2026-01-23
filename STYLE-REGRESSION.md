# Style Regression Documentation

## Symptoms
- Large grey slabs and unstyled blocks in the hero, projects, skills, and experience sections (Home, About, Projects, Roles, Contributions) because the markup relies on custom classes that had no CSS definitions (e.g., `.hero-banner`, `.skill-category`, `.timeline`, `.feature-card`, `.inpage-nav`, `.project-card__metrics`).
- Card gutters, section padding, and responsive grids fell apart when the new MDX sections rendered plain HTML without the supporting surface/card styles in `src/styles/global.css`.
- MDX lists, anchors, and stack badges looked raw because Theme UI tokens and the layout wrapper were not consistently anchoring the sections.

## Reproduction
1. `bun run develop` (or `npm run dev`) and visit `/`, `/about/`, `/projects/`, `/roles/`, `/contributions/`.
2. Observe that every major hero/section uses `section-shell`, `surface-card`, or Visual components such as `HeroBanner`, `SkillCategory`, `ExperienceTimeline`, and `ProjectCard`.
3. Without the new CSS rules the sections render as stretched grey rectangles with no spacing, making sandwiching content difficult to scan.

## Root cause
1. The visual sections introduced new class names (hero banner, skill grid, timeline, proof sections, project thumbnails, metric badges) that weren’t defined in the global CSS, so the layout fell back to default block styling.
2. `ProjectCard` also lacked structure for thumbnails and metrics—MDX case studies passed `thumbnail` + `metrics` props that never rendered, leaving blank cards.
3. No additional layout helper (grid-auto, filter pills, in-page nav) existed to keep the alternating sections consistent, so spacing and cards looked unfinished.

## Style System Map

### Providers
- `@lekoarts/gatsby-theme-minimal-blog` (customized under `src/@lekoarts/...`) uses `gatsby-plugin-theme-ui` and automatically wraps the tree with Theme UI’s `ThemeProvider`. The tokens live in `src/@lekoarts/gatsby-theme-minimal-blog/gatsby-plugin-theme-ui/index.ts`.
- `Layout.tsx` (in `src/@lekoarts/.../components/layout.tsx`) wraps pages with `MDXProvider` (`src/@lekoarts/.../components/mdx-components.tsx`) and applies the `.site-main` / `.site-content` structure.
- Global CSS (`src/styles/global.css`) is imported once in both `gatsby-browser.js` and `gatsby-ssr.js`, so the CSS variables and utility classes load on the server and client.

### Global CSS responsibilities
- `.site-main` / `.site-content`: provide the centered container (max-width 1180px), responsive padding, and resets for MDX children.
- `.section-shell`, `.section-surface`, `.surface-card`, `.project-card`, `.feature-card`, `.grid-two`, `.grid-auto`: consistent section spacing, card backgrounds, rounded corners, and drop shadows.
- `.hero-banner`, `.skill-category`, `.timeline`, `.inpage-nav`, `.filter-pill`, `.project-card__frame`, `.project-card__metrics`, `.metric-badge`: layout, gutters, gradient backgrounds, and responsive behaviors for the new hero/about/project visuals.
- `.callout`, `.feature-list`, `.card-actions`: reuse for information boxes, lists, and CTA button groups.
- Theme UI tokens supply colors, typography, spacing, and button styles; the global CSS uses `var(--color-...)` so the light/dark palettes stay in sync.

## Fix Summary
1. Added the missing CSS for the hero banner, skill grid, experience timeline, feature cards, project thumbnails, anchor navigation, and project metric badges so the sections display intentional spacing and elevation.
2. Transformed `ProjectCard` to include a `thumbnail` slot, wrapper frame, metric badges (`MetricBadge`), and organized content so MDX-provided summaries render cleanly inside cards.
3. Extended the CSS utility toolkit (`grid-auto`, `.filter-pill`, `.section-surface--alt`, `.skill-category`, `.timeline`) so every MDX section (Home hero, About skill grid, Projects gallery, Roles lists, Contributions cards) benefits from the same visual rhythm.

## Verification
- `bun run build` (Gatsby 5, Bun): succeeded with the usual `baseline-browser-mapping` warning only.
- `bun run develop` (manually reloaded sections) now shows the hero/skills/sections styled.
- `npm run check` (lint + smoke-check) still passes—global CSS continues to load from `gatsby-browser.js`/`gatsby-ssr.js`.
