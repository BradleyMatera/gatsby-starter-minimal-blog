# config

Framework and tooling configuration extracted out of required root entry files.

## Why this exists
Gatsby, Netlify, PostCSS, Tailwind, and ESLint expect certain files at the repo root.
Those root files stay in place as wrappers, while the actual config lives here.

## Current layout
- `gatsby/` Gatsby site config and lifecycle logic
- `tooling/` shared config for local tooling wrappers
- `netlify/` notes or future extracted Netlify-related config
