# Folder Structure Proposal

This is the plan for a beginner-friendly layout that keeps Gatsby entry points in place while organizing the app logic into distinct responsibility areas:

## Root folders (no change required)
- `content/` keeps all MDX pages, posts, templates, and reusable components.
- `docs/` continues to host process, architecture, and onboarding documentation.
- `projecthub-proxy/` remains the standalone Express helper service for the xAI bridge.
- `public/`, `static/`, and config files such as `gatsby-config.ts`, `tsconfig.json`, and `tailwind.config.js` stay at the root so Gatsby tooling continues to find them.

## New `src/` layout
We will build the following top-level directories inside `src/` before moving files:

1. `src/layout/` – Layout shell and navigation pieces (header, footer, theme toggle, navigation badges, etc.) so maintainers know where page framing logic lives.
2. `src/sections/` – Chapter-like sections rendered on the homepage and blog landing page. Subfolders such as `home/`, `blog/`, and `contact/` will hold hero content, blog cards, and contact helpers.
3. `src/primitives/` – Shared UI atoms and molecules (e.g., `Section`, `Card`, `Badge`, `AnchorNav`, `Link`, `StatusRow`, `ProjectCard`). This makes it easy to see reusable pieces at a glance.
4. `src/visuals/` – WebGL/three.js scenes and decorative accents (e.g., `ThreeScene`, `ThreeHero`, `HeroSystemScene`, `Tiny*Accent`, and `BlogAccent`). Visuals stay separated so new contributors know this area is decorative and performance-sensitive.
5. `src/hooks/` – Custom hooks such as `useScrollReveal` for reusability and documentation.
6. `src/style-helpers/` (or `src/utilities/`) – Plain-English helper functions such as the new `joinClasses` that replaces the existing `cx` abbreviation.
7. `src/styles/` – Keep compiled CSS files here (`global.css`, renamed `legacy-sections.css` which was `src/components/style.css`).

## Migration notes (before moving files)
- The existing `./src/components/*` folder will be emptied and replaced by re-exports pointing into these new directories to avoid API breaks.
- Tailwind/ESLint globs and MDX/documentation references will be updated to point at the names above.
- Each batch of moved files will be followed by `npm run lint` and `npm run build` to guard correctness.
