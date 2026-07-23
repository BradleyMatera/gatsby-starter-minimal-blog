# AGENTS.md

Guide for AI agents (Devin, Claude, Copilot, etc.) working on this codebase.

---

## Project Overview

**bradleymatera.dev** is a Gatsby 5 + React 18 + TypeScript portfolio, blog, digital store, recruiter hub, and local SEO web development service for Bradley Matera, based in Durand, Illinois.

- **Live site:** https://bradleymatera.dev
- **Phone:** (650) 265-1193 (Google Voice — records calls, emails transcripts)
- **Email:** bradmatera@gmail.com
- **Hosting:** Netlify (auto-deploys on push to `master`)

---

## Build & Dev Commands

```bash
npm install --legacy-peer-deps    # Install (MUST use --legacy-peer-deps)
npm run develop                   # Dev server on :8000
npm run dev                       # Netlify dev with functions on :8888
npm run build                     # Production build → public/
npm run serve                     # Serve built site on :9000
npm run clean                     # Clear Gatsby cache
npm run lint                      # ESLint
npm run lint:fix                  # ESLint --fix
```

**Important:** The Netlify build command is `rm -rf .cache public && npm run build` — this clears the cache on every deploy to prevent stale build artifacts. Do NOT remove the `rm -rf` from `netlify.toml`.

---

## Critical Architecture Decisions

### 1. Tag Page SEO (onPostBuild hook)
Tag pages had persistent canonical URL and meta description issues because Gatsby component shadowing didn't work reliably in Netlify's CI environment. The fix is an `onPostBuild` hook in `config/gatsby/node.js` that directly modifies built HTML files to inject correct canonicals and descriptions. **Do not remove this hook** — it's the bulletproof fix for tag page SEO.

### 2. Sitemap Redirect
`/sitemap.xml` is a directory in Gatsby's build output, not a file. A Netlify redirect in `netlify.toml` serves `/sitemap.xml/sitemap-index.xml` when `/sitemap.xml` is requested. `robots.txt` points to `/sitemap.xml`. **Do not change this redirect.**

### 3. NAP Consistency (Local SEO)
The phone number (650) 265-1193 must be consistent across:
- Header navigation (`src/@lekoarts/gatsby-theme-minimal-blog/components/vertical-nav.tsx`)
- Footer (`src/@lekoarts/gatsby-theme-minimal-blog/components/footer.tsx`)
- All 5 city landing pages (`src/pages/web-developer-*.tsx`)
- Pricing page (`src/pages/pricing.tsx`)
- Contact page (`src/features/contact/components/ContactContent.tsx`)
- Schema markup (`src/site/seo/local-seo.ts`)
- Google Business Profile (manual, not in repo)

If you change the phone number, update ALL of these locations.

### 4. Theme System
The site has a Web Designer Style Lab with multiple visual themes (brutalism, retrofuturism, neumorphism) stored in `src/styles/themes/`. When adding new UI components, test that text is visible on ALL themes — the themes override backgrounds and colors with `!important`. Use `color: inherit` on children of themed containers to avoid invisible text bugs.

### 5. CSS Inlining
Gatsby inlines all CSS into the HTML (~194KB). This is expected behavior for SSG. Do not try to externalize it unless you're prepared to test all themes and page layouts.

---

## File Map for Common Tasks

### Adding a new blog post
1. Create `content/posts/[slug]/index.mdx`
2. Add frontmatter: `title`, `date`, `tags`, `categories`, `description`
3. Build and deploy

### Adding a new city landing page
1. Copy `src/pages/web-developer-durand-davis-illinois.tsx` as a template
2. Change `pathname`, `pageTitle`, `pageDescription`, and all city-specific content
3. Add unique content (do NOT just swap the city name — Google penalizes thin duplicate pages)
4. Add schema markup with the city in `areaServed`
5. Add internal links from the homepage hero (`src/@lekoarts/gatsby-theme-minimal-blog/texts/hero.mdx`)
6. Add a link in the footer (`src/@lekoarts/gatsby-theme-minimal-blog/components/footer.tsx`)
7. Add cross-links from other city pages
8. Update `src/site/seo/local-seo.ts` to add the city to `serviceAreaPlaces`

### Updating pricing
1. Update `src/pages/pricing.tsx` for the displayed prices
2. Update `PRICING_MODEL.md` for the rationale and tax breakdowns
3. Both must match — the MD file documents WHY each price is what it is

### Adding a new Netlify function
1. Create `netlify/functions/[name].js`
2. Use shared modules from `netlify/functions/_*.js` (db, env, response, etc.)
3. Test locally with `npm run dev` (Netlify dev proxies functions)

### Editing the homepage
- Hero text: `src/@lekoarts/gatsby-theme-minimal-blog/texts/hero.mdx`
- Homepage components: `src/@lekoarts/gatsby-theme-minimal-blog/components/homepage.tsx`
- Hero actions (email CTA): `src/features/home/components/HeroActions.tsx`

### Editing the recruiter page
- Main page: `src/pages/recruiter.tsx`
- Section components: `src/features/recruiter/components/`
- Each section has a unique background image — do NOT use the same image for multiple sections

---

## SEO Checklist for New Pages

Every new page MUST have:
- [ ] Self-referencing canonical URL
- [ ] Meta description (140-160 chars)
- [ ] `<h1>` with target keyword
- [ ] `robots` meta tag set to `index,follow`
- [ ] Open Graph tags (og:title, og:description, og:url, og:image)
- [ ] Twitter Card tags
- [ ] Schema markup (Service, ProfessionalService, FAQPage, or BreadcrumbList as appropriate)
- [ ] Breadcrumbs (both nav and schema)
- [ ] Internal links from at least 2 other pages
- [ ] Mobile-responsive layout
- [ ] Alt text on all images

---

## Pricing Reference

| Tier | Build | Monthly | Target |
|------|-------|---------|--------|
| Starter | $447 | $37 | New businesses, solo operators |
| Growth | $797 | $67 | Established service businesses |
| Premium | $1,497 | $97 | Full local market domination |
| Site Refresh | $597 | — | Updating existing sites |
| Hourly | $65/hr | — | Small fixes, maintenance |

See `PRICING_MODEL.md` for full rationale and tax breakdowns.

---

## Known Issues

1. **Netlify Lighthouse Performance: 0** — This is a Netlify plugin bug, not a site issue. Local Lighthouse scores 83-85. The plugin fails to run Lighthouse correctly in Netlify's CI environment.

2. **Pre-existing TypeScript error in `layout.tsx`** — The theme-ui `sx` prop causes a type error in the shadowed layout component. This is pre-existing and affects all pages equally. Do not try to fix it — it's a theme-ui typing issue.

3. **GitHub Dependabot alerts** — There are 16 dependency vulnerabilities (5 high, 6 moderate, 5 low). These are in Gatsby's dependency tree and require a Gatsby version upgrade to fix. Do not attempt to fix these without a full upgrade plan.

---

## Do NOT

- Do NOT remove the `rm -rf .cache public` from the Netlify build command
- Do NOT remove the `onPostBuild` hook in `config/gatsby/node.js`
- Do NOT remove the sitemap redirect in `netlify.toml`
- Do NOT change the phone number without updating ALL locations (see NAP Consistency above)
- Do NOT use black-hat SEO tactics (hidden text, keyword stuffing, cloaking, doorway pages)
- Do NOT create duplicate city pages with just the city name swapped — each page must have unique content
- Do NOT use the same background image for multiple recruiter page sections
- Do NOT add comments to code unless asked (per project convention)
- Do NOT modify git config or use interactive git flags

---

## Git Workflow

- Branch: `master` (no develop/staging branch)
- Auto-deploys to Netlify on push to `master`
- Commit message style: imperative mood, concise, focus on "why"
- Do NOT push unless explicitly asked
- Do NOT commit if no changes exist
