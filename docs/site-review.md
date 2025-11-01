# Portfolio Site Review (Updated 2025-11-01)

This report reflects the current state of Bradley Matera’s Gatsby-powered portfolio and replaces earlier write-ups that contained outdated or incorrect observations.

## 1. Overview

- **Stack & hosting:** Gatsby 5 + React 18 with Theme UI shadowing (`gatsby-config.ts`) deployed to Netlify.  
- **Homepage focus:** Introduces Bradley as a full-stack engineer with AWS support experience and directs visitors toward projects and role pages (`src/components/home/HomeHero.tsx:4`).  
- **Information architecture:** Global navigation covers Home, About, Projects, Roles, Contributions, and Blog. Roles expand to five discipline-specific subpages (`src/@lekoarts/gatsby-theme-minimal-blog/components/header.tsx:37`). Content is authored in MDX (`content/pages/**/*`, `content/posts/**/*`).

## 2. User Experience & Design

### Navigation & Layout
- Sticky header with keyboard-accessible “Skip to content” link (`src/@lekoarts/.../components/layout.tsx:32`).  
- Roles dropdown uses aria attributes and collapses on small viewports (`header.tsx:61-99`).  
- Footer repeats key navigation and social links while surfacing quick stats (`footer.tsx:12-63`).

### Visual System
- Light interface with white surfaces, slate typography, and blue/orange accents defined in `src/styles/global.css:1-64`.  
- Cards use consistent rounded geometry and bespoke CSS classes (`global.css:417-483`).  
- Hover/focus states apply high-contrast focus rings via `a:focus-visible` etc. (`global.css:45-60`).  
- Project and blog cards include gradient monogram avatars that provide quick visual anchors without external imagery (`src/components/ui/ProjectCard.tsx:24`, `src/components/blog/BlogCard.tsx:34`, `src/styles/global.css:1328`).  

### Content
- Homepage sections outline current focus areas, featured work, and contact options (`texts/hero.mdx:9-126`).  
- About page details skills, certifications, education, and differentiators in structured cards (`content/pages/about/index.mdx:27-185`).  
- Projects page categorises work into Featured, Front-End, Full-Stack & APIs, and Tools & Infrastructure with tech stacks and status context (`content/pages/projects/index.mdx:30-197`).  
- Contributions page documents CIRIS AI pull requests, Tech Talk Club duties, and game jam participation (`content/pages/contributions/index.mdx:20-55`).  
- Blog landing page frames posts as “Field notes, experiments, and project retrospectives” with search + tag filters (`components/blog.tsx:78-144`).

## 3. Functionality

- Gatsby routing handles navigation to MDX-backed pages; Project cards link to GitHub/live demos with `rel="noopener noreferrer"` enforced in the shared `Link` component (`src/components/ui/Link.tsx:22-33`).  
- Blog search filters across titles, descriptions, excerpts, and tags (`components/blog.tsx:63-75`). Filters synchronise with the URL, and the tag chips fall back to full tag archive pages when JavaScript is unavailable (`blog.tsx:102-149`).  
- Role pages describe responsibilities, representative work, and tools—for example, Cloud Engineer emphasises secure AWS deployments and cost control (`content/pages/roles/cloud-engineer.mdx:11-52`).

## 4. Accessibility

- Semantic headings strictly follow hierarchy (e.g., hero uses `<h1>`, Section wrappers apply `<h2>`). The table of contents on post pages is generated from actual heading IDs (`components/post.tsx:34-82`).  
- Skip nav, focus-visible outlines, and aria labels on dropdown buttons improve keyboard support (`global.css:45-60`, `header.tsx:61-93`).  
- External icon buttons include screen-reader labels (“sr-only” spans) (`header-external-links.tsx:38-57`).  
- Dark-mode toggle in the header switches between light and dark palettes while keeping global CSS variables in sync (`components/colormode-toggle.tsx:4-47`).  
- Recommendation: audit image alt text within MDX content; most project cards rely on text only, so risk is low, but hero/banner imagery should include descriptive alt tags when added.

## 5. Performance & SEO

- Gatsby outputs static HTML/JS, and Netlify CDN keeps load times low. Bundle analysis can be enabled via `ANALYSE_BUNDLE` (`gatsby-config.ts:12-26`).  
- Plugin suite covers sitemap, RSS feed, manifest, and GA4 (`gatsby-config.ts:36-135`).  
- Each page defines `<title>` and `<meta>` descriptions via the shared `Seo` component (`components/seo.tsx` from the theme) with site metadata configured at `gatsby-config.ts:5-14`.  
- Recommendation: convert large hero imagery to responsive formats when assets are introduced; currently the hero is text-first, so there is minimal payload.

## 6. Security

- Site is HTTPS by default through Netlify.  
- All external links opened in a new tab include `rel="noopener noreferrer"` via the custom `Link` component (`Link.tsx:25-33`) and `ProjectCard` (target/rel assignments at `src/components/ui/ProjectCard.tsx:36-62`).  
- Netlify-hosted contact form collects name, email, and message with honeypot protection (`content/pages/contact/index.mdx:17-61`).  
- The optional ProjectHub proxy (`projecthub-proxy/server.js`) adds rate limiting and requires an API key (`server.js:24-65`).
 
## 7. Recent Improvements

- URL-aware blog search and tag filtering with no-JavaScript fallbacks (`components/blog.tsx:63-153`).  
- Theme UI powered dark/light toggle synchronised with global CSS variables (`components/colormode-toggle.tsx:4-47`, `gatsby-browser.js:5-16`).  
- Dedicated project case studies for Car-Match, Interactive Pokédex, and CIRIS AI (`content/pages/projects/*.mdx`).  
- Netlify-backed contact form and confirmation page (`content/pages/contact/index.mdx:17-61`, `contact/success.mdx:1-8`).  
- Elevated card contrast, added avatar accents, and rotated chip/tag palettes for better visual differentiation (`src/styles/global.css:601`, `src/styles/global.css:808`, `src/styles/global.css:1388`).

## 8. Opportunities

- **Structured data:** add JSON-LD for Person and Article entities to improve search visibility.  
- **Project storytelling:** consider expanding remaining projects (e.g., Convo-Ai, ProjectHub) with similar deep-dive pages.  
- **Image strategy:** when adding media, provide responsive `srcset` and descriptive alt text to retain accessibility gains.  
- **Breadcrumbs:** long-form case studies or role pages could benefit from breadcrumb navigation for additional context.  

## 9. Conclusion

The portfolio presents a cohesive narrative with consistent styling, accessible navigation, and well-structured content. Recent feature work strengthened the blog UX, enabled dark mode, and added contact and storytelling routes. Continuing to invest in structured data, richer case studies, and media accessibility will keep the site recruiter-ready.
