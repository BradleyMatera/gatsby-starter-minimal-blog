# Bradley Matera · Portfolio & Blog

Custom Gatsby site that powers Bradley Matera’s public portfolio, career pages, and MDX blog. The starter from LekoArts has been heavily shadowed to add bespoke layout blocks, richer navigation, and a tailored dark/light design system.

---

- **Live site:** https://bradleysgatsbyblog.netlify.app
- **Tech focus:** Gatsby 5 · React 18 · TypeScript · Theme UI · Tailwind/PostCSS · MDX

---

## Highlights

- Opinionated homepage composed from reusable React sections (`HomeHero`, `Section`, `Card`, `ProjectCard`).
- Role-specific landing pages (`/roles/...`) and project/contribution indexes driven by MDX.
- Blog listing with URL-aware search/tag filters that degrade gracefully without JavaScript.
- Dedicated project case studies (`/projects/car-match`, `/projects/interactive-pokedex`, `/projects/ciris-ai`) and a Netlify-backed contact form.
- Dark/light color modes powered by Theme UI and global CSS custom properties.
- Express proxy (`projecthub-proxy`) that forwards ProjectHub chat requests to the xAI Grok API without exposing credentials.

## Project Structure

```
├── content/                   # MDX sources (pages, roles, posts, assets)
├── src/
│   ├── components/            # Custom React components used across MDX
│   │   ├── home/HomeHero.tsx
│   │   └── ui/                # Sections, cards, links, etc.
│   ├── @lekoarts/gatsby-theme-minimal-blog/
│   │   ├── components/        # Shadowed theme components (layout, blog, post)
│   │   └── texts/             # Homepage sections authored in MDX
│   ├── styles/global.css      # Main design language applied site-wide
│   └── utils/                 # Small helpers (e.g., `cx`)
├── projecthub-proxy/          # Optional Node server for ProjectHub chat
├── gatsby-config.ts           # Site metadata + plugin configuration
├── tailwind.config.js         # Tailwind tokens used inside custom CSS
└── docs/                      # Supplemental documentation for this repo
```

## Getting Started

Prerequisites: Node 18+ (Gatsby 5), npm or yarn.

```bash
npm install          # install dependencies
npm run develop      # start Gatsby dev server at http://localhost:8000
npm run build        # create production bundle in ./public
npm run serve        # preview the production build locally
npm run clean        # clear Gatsby caches
```

When running locally you can toggle between light and dark themes with the header control. Gatsby stores the chosen palette in `localStorage`.

## Authoring Content

- Pages live in `content/pages/**/index.mdx`. They can import React components from `src/components/ui`.
- Blog posts live in `content/posts/<slug>/index.mdx`. Each folder may include local assets (images, etc).
- Frontmatter fields (`title`, `slug`, `date`, `tags`, `banner`, etc.) are consumed by the theme’s GraphQL queries.
- The homepage pulls most copy from `src/@lekoarts/gatsby-theme-minimal-blog/texts/hero.mdx` and `texts/bottom.mdx`, with the main hero unit defined in `src/components/home/HomeHero.tsx`.
- Case studies live alongside the project index (e.g., `content/pages/projects/car-match.mdx`) and the contact form is at `content/pages/contact/index.mdx`.

See `docs/content-authoring.md` for detailed guidance on MDX structure, shortcodes, and imports.

## Styling System

There are three complementary layers:

1. **Theme UI theme overrides** (`src/@lekoarts/.../gatsby-plugin-theme-ui/index.ts`) redefine tokens, shadows, and component presets for the shadowed theme components.
2. **Global CSS** (`src/styles/global.css`) establishes the visual system for navigation, cards, layouts, and typography—including the custom dark/light palettes.
3. **Tailwind tokens** (`tailwind.config.js` + `src/components/style.css`) supply utility classes inside legacy components. Tailwind is processed through PostCSS using `@tailwindcss/postcss`.

Refer to `docs/styling.md` for examples of where each layer applies and how to extend them safely.

## Development Notes

- **TypeScript:** `tsconfig.json` enables `strict` mode. Shadowed files from the theme remain `.tsx`; older helper components under `src/components` are still JavaScript.
- **Analytics:** Google Analytics v4 is configured via `gatsby-plugin-google-analytics` with Measurement ID `G-V5RJ4522VW`.
- **RSS + SEO:** The feed, sitemap, and manifest plugins reuse the metadata in `gatsby-config.ts`.
- **Bundle inspection:** Set `ANALYSE_BUNDLE=1` before running `npm run build` to emit Statoscope reports under `public/.statoscope/`.

Development workflow, testing, and deployment guidance lives in `docs/development.md`.

## ProjectHub Proxy (Optional)

`projecthub-proxy/server.js` exposes `POST /api/chat` and relays requests to the xAI Grok API:

```bash
XAI_API_KEY=<token> PORT=3000 node projecthub-proxy/server.js
```

Deploy it separately (e.g., Render, Fly, or a small EC2 instance) and point the ProjectHub front-end at the hosted endpoint. Rate limiting is set to 100 requests / 15 minutes; adjust as needed.

## Additional Documentation

Further detail is available under `docs/`:

- `docs/development.md` – local tooling, scripts, environment variables, and deployment recommendations.
- `docs/content-authoring.md` – how to write MDX pages/posts, embed components, and manage assets.
- `docs/styling.md` – explanation of Theme UI overrides, CSS architecture, and Tailwind usage.
- `docs/architecture.md` – component map and data flow between the theme, custom UI, and content layers.
- `docs/site-review.md` – living review of UX, performance, and outstanding opportunities.

Keep these files current when you change workflows or add new features so future contributors can ramp up quickly.
