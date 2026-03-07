# src

Application source code.

## Layout
- `features/` feature-owned modules
- `site/` site-wide shared code such as chrome, accents, icons, and shared hooks
- `ui/` shared UI primitives only
- `pages/` Gatsby file-system routes
- `styles/` global CSS, tokens, utilities, and feature-adjacent styles
- `utils/` small cross-cutting helpers
- `types/` local type declarations
- `@lekoarts/gatsby-theme-minimal-blog/` Gatsby theme shadow files required by the theme

Rule: if a module is specific to one product area, it belongs in `features/`, not `site/` or `ui/`.
