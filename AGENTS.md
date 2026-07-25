# AGENTS.md

Guide for AI agents (Devin, Claude, Copilot, etc.) working on this codebase.

---

## Project Overview

**bradleymatera.dev** is a Gatsby 5 + React 18 + TypeScript portfolio, blog, digital store, recruiter hub, and local SEO web development service for Bradley Matera, based in Durand, Illinois.

- **Live site:** https://bradleymatera.dev
- **Phone:** (608) 313-5373 (Google Voice — records calls, emails transcripts)
- **Email:** bradmatera@gmail.com
- **Hosting:** Netlify (auto-deploys on push to `master`)
- **Netlify site ID:** `c9b7aa36-b206-40ff-bde8-7c2bf2937d0c` (site name: `bradleysgatsbyblog`). The `.netlify/state.json` must point to this ID for CLI deploys to go to the correct site.

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

For faster local builds: `GATSBY_CPU_COUNT=1 npm run build` (prevents CPU contention on macOS).

---

## Critical Architecture Decisions

### 1. Tag Page SEO (onPostBuild hook)
Tag pages had persistent canonical URL and meta description issues because Gatsby component shadowing didn't work reliably in Netlify's CI environment. The fix is an `onPostBuild` hook in `config/gatsby/node.js` that directly modifies built HTML files to inject correct canonicals and descriptions. **Do not remove this hook** — it's the bulletproof fix for tag page SEO.

### 2. Sitemap Redirect
`/sitemap.xml` is a directory in Gatsby's build output, not a file. A Netlify redirect in `netlify.toml` serves `/sitemap.xml/sitemap-index.xml` when `/sitemap.xml` is requested. `robots.txt` points to `/sitemap.xml`. **Do not change this redirect.**

### 3. NAP Consistency (Local SEO)
The phone number (608) 313-5373 must be consistent across:
- Header navigation (`src/@lekoarts/gatsby-theme-minimal-blog/components/vertical-nav.tsx`)
- Footer (`src/@lekoarts/gatsby-theme-minimal-blog/components/footer.tsx`)
- All 33 city landing pages (`src/pages/web-developer-*.tsx`)
- Pricing page (`src/pages/pricing.tsx`)
- Contact page (`src/features/contact/components/ContactContent.tsx`)
- Schema markup (`src/site/seo/local-seo.ts`)
- Google Business Profile (manual, not in repo)

If you change the phone number, update ALL of these locations.

### 4. Theme System
The site has a Web Designer Style Lab with multiple visual themes (brutalism, retrofuturism, neumorphism) stored in `src/styles/themes/`. When adding new UI components, test that text is visible on ALL themes — the themes override backgrounds and colors with `!important`. Use `color: inherit` on children of themed containers to avoid invisible text bugs.

### 5. CSS Inlining
Gatsby inlines all CSS into the HTML (~194KB). This is expected behavior for SSG. Do not try to externalize it unless you're prepared to test all themes and page layouts.

### 6. Demo Page CSS Overrides
Demo pages (`/demos/*`) use their own CSS variables (`--demo-text`, `--demo-heading`, `--demo-bg`, `--demo-card-bg`, etc.) defined in `src/styles/demos.css`. The global CSS has `strong { color: var(--color-text) }` which overrides demo colors in dark mode. The fix is `.demo-page strong { color: var(--demo-heading) }` in demos.css. If you add new demo elements with `<strong>` or `<b>` tags, they will inherit the demo heading color automatically. The `--demo-card-bg` variable MUST be set on all design system themes or text in cards becomes illegible on dark themes (e.g. "elegant" law firm theme).

### 7. Netlify CLI Deploys
When deploying via `npx netlify deploy --prod`, the CLI reads `.netlify/state.json` for the site ID. If this file points to the wrong site, deploys will silently go to the wrong Netlify project. Always verify the site ID is `c9b7aa36-b206-40ff-bde8-7c2bf2937d0c`. Use `--dir public` to deploy a pre-built `public/` directory without triggering a rebuild (avoids Gatsby adapter cache issues).

### 8. WCAG Contrast Compliance (CRITICAL — Read Before Editing Demo Colors)

The site must pass **WCAG AA** (4.5:1 normal text, 3:1 large/bold text) and **WCAG AAA** (7:1 normal text, 4.5:1 large/bold text) contrast on all pages. The audit tool (ApexSolutions) checks contrast by reading computed styles from a headless browser. As of Jul 25, 2026, all 267 pages pass AA and AAA.

**Rules for any color changes in demos:**

1. **NEVER use `rgba()` for backgrounds behind text.** The audit tool does NOT blend `rgba()` with the parent background — it treats the semi-transparent color as the actual background, causing false contrast failures. Always use solid opaque hex colors. For example, instead of `rgba(45,122,45,0.12)` on a white parent, use the blended equivalent `#e5efe5`.

2. **All `--demo-accent-soft` variables must be solid hex colors**, not `rgba()`. These are used for weather alerts, financing calc results, mortgage calc results, agent photo backgrounds, and integration category badges. See `src/styles/demos.css` for the current solid values per theme.

3. **Integration status badges** (`.demo-integration__status--live`, `--mocked`, `--available`) use solid backgrounds: `#ddf6e6`, `#fdf0da`, `#e1ecfd` respectively. Text colors: `#166534`, `#92400e`, `#1e40af`.

4. **Inline-styled status badges** in `agriculture.tsx` use solid backgrounds: in-stock `#e5efe5` with text `#1a5a1a`, on-order `#f8f2e0` with text `#4a3500`, used `#ececec` with text `var(--demo-text-muted)`.

5. **Social links in dark contact sections** (`.demo-contact .demo-social__link`) must use `color: #fff` — the default `var(--demo-text)` is dark and invisible on the dark contact background.

6. **Review/testimonial stars** use `#8a6300` (not `#f5a623`) for AA compliance on light backgrounds.

7. **To verify contrast after changes**, run: `node scripts/contrast-check.js` (checks the live site) or `node scripts/contrast-check.js --local` (checks `localhost:9000` after `npm run build && npm run serve`). The script uses Playwright to check computed styles on all demo pages.

8. **When adding new demo elements**, calculate contrast ratios using the WCAG formula: `(max(L1, L2) + 0.05) / (min(L1, L2) + 0.05)` where L is relative luminance. Use a contrast checker tool or the script at `scripts/contrast-check.js`.

---

## Demo Websites (10 total)

The site includes 10 full demo business websites at `/demos/` that serve as sales tools — potential clients can see what their website could look like. Each demo is a complete, standalone single-page site with hero, services, team, testimonials, FAQ, integrations, and contact sections.

### Demo Inventory

| Slug | Business Name | Industry | Design System | Theme Color | Lines |
|------|--------------|----------|---------------|-------------|-------|
| `restaurant` | Riverside Grill | Restaurant | elegant | #c9a227 | 494 |
| `landscaping` | GreenScape Pro | Landscaping | organic | #4a7c3a | 477 |
| `hvac` | ComfortAir Heating & Cooling | HVAC / Home Services | industrial | #e85d04 | 441 |
| `auto-repair` | Northside Auto Repair | Auto Repair | garage | #ff6b1a | 469 |
| `real-estate` | Rockford Heritage Realty | Real Estate | luxury | #b8943f | 368 |
| `beauty-salon` | Bella Vista Salon | Beauty Salon | soft | #d63384 | 489 |
| `manufacturing` | Sterling Metalworks | Manufacturing / Metal Fabrication | industrial | #4a6fa5 | 671 |
| `agriculture` | Kishwaukee Valley Farm Services | Agriculture / Farm Supply | organic | #4a7c3a | 693 |
| `law-firm` | Rock River Legal Group | Law Firm / Legal Services | elegant | #1a3a5c | 619 |
| `dental` | Rock River Family Dental | Dental / Healthcare | soft | #2b8a8a | 709 |

### Demo Unique Features (added in recent rework)

Each demo has industry-specific interactive features and integrations that make it unique:

- **Manufacturing**: RFQ (Request for Quote) form, material specs table, capacity metrics, QC process steps, Xometry/Thomasnet/FedEx Freight integrations
- **Agriculture**: WeatherWidget (context="agriculture"), equipment inventory table with availability, commodity price ticker (corn/soybeans/wheat/ethanol), equipment financing calculator, service request form with urgency levels, John Deere Financial/Agrian/Granular Ag/FBN integrations
- **Law Firm**: Case results/settlements showcase, statute of limitations calculator (interactive), free consultation eligibility checker (interactive), enhanced consultation form (referral source, consult type, client status fields), Fastcase/Illinois Courts e-Filing/Martindale-Hubbell/Smokeball/LexisNexis integrations
- **Dental**: Treatment cost estimator (interactive), insurance eligibility checker (interactive), dental emergency triage tool (interactive buttons), before/after smile gallery, new patient forms download section, Dental Intelligence/Weave/Henry Schein/Vyne Trellis integrations

### Shared Demo Components (`src/features/demos/`)

| Component | Purpose |
|-----------|---------|
| `DemoLayout.tsx` | Wrapper with demoName, industry, themeColor, designSystem props. Provides back-to-demos nav. |
| `DemoBanner.tsx` | Top banner for demo pages |
| `GoogleMapsEmbed.tsx` | Embeds Google Maps (props: address, height, title) |
| `SocialLinks.tsx` | Social media links (export SocialLink type) |
| `ReviewBadges.tsx` | Google/Yelp/BBB review badges |
| `IntegrationsSection.tsx` | Displays third-party integrations (export Integration type) |
| `FAQSection.tsx` | Accordion FAQ (export FAQItem type) |
| `MortgageCalculator.tsx` | Interactive mortgage calculator (used by real-estate demo) |
| `WeatherWidget.tsx` | Weather display with context-aware messaging (props: city, temp, condition, context). Contexts: "hvac", "landscaping", "agriculture". |

### Demo CSS (`src/styles/demos.css`)

~870 lines of demo-specific CSS. Key class names:
- `demo-hero`, `demo-hero__inner`, `demo-hero__title`, `demo-hero__subtitle`, `demo-hero__actions`
- `demo-section`, `demo-section--alt`, `demo-section__title`, `demo-section__subtitle`
- `demo-services-grid`, `demo-service-card`, `demo-service-card__image`, `demo-service-card__body`, `demo-service-card__icon`, `demo-service-card__name`, `demo-service-card__desc`, `demo-service-card__tag`
- `demo-split-image-text`, `demo-split-image-text__image`, `demo-split-image-text__content`, `demo-split-image-text__title`, `demo-split-image-text__text`
- `demo-feature-image`, `demo-feature-image__content`, `demo-feature-image__title`, `demo-feature-image__text`
- `demo-team-grid`, `demo-team-card`, `demo-team-card__photo`, `demo-team-card__body`, `demo-team-card__name`, `demo-team-card__role`, `demo-team-card__bio`
- `demo-food-gallery`, `demo-food-gallery__item`, `demo-food-gallery__label` (used for all image galleries, not just food)
- `demo-stats`, `demo-brands`, `demo-brand`, `demo-two-col`, `demo-trust-logo`
- `demo-quote-form`, `demo-form-row`, `demo-form-label`, `demo-form-input`, `demo-form-select`, `demo-form-textarea`, `demo-form-note`, `demo-quote-form__success`
- `demo-btn`, `demo-btn--primary`, `demo-btn--ghost`
- `demo-testimonials`, `demo-testimonial`, `demo-testimonial__stars`, `demo-testimonial__text`, `demo-testimonial__author`, `demo-testimonial__location`
- `demo-emergency-banner`
- `demo-contact`, `demo-contact__inner`, `demo-contact__title`, `demo-contact__text`
- `demo-footer`

### Demo Images

All demo images are in `static/images/demos/[slug]/` and are sourced from Pexels (free, attribution-free). Each demo has 19-22 images including hero.jpg, service images, team photos, gallery images, and feature images. Image credits are documented in `content/pages/image-credits/index.mdx`.

### Demo Icons

Icons are individual TypeScript components in `src/site/icons/` (111 icons total). Import from `"../../site/icons"`. Available icons include: StarIcon, MapPinIcon, PhoneIcon, ShieldIcon, CheckIcon, ClockIcon, GearIcon, ToolsIcon, BoltIcon, AlertIcon, CloudIcon, DropletIcon, SnowflakeIcon, TreeIcon, LeafIcon, SunIcon, CalendarIcon, DocumentIcon, DownloadIcon, ScrollIcon, QuoteIcon, SpaIcon, UtensilsIcon, CarIcon, HouseIcon, ScissorsIcon, WrenchIcon, TireIcon, FlameIcon, WindIcon, OilDropIcon, ClipboardIcon, and many more.

### Adding a New Demo

1. Create `src/pages/demos/[slug].tsx`
2. Use `DemoLayout` with demoName, industry, themeColor, designSystem
3. Add demo entry to `src/pages/demos/index.tsx` (the DEMOS array)
4. Create images in `static/images/demos/[slug]/` (hero.jpg + service/team/gallery images)
5. Create SVG illustration in `static/package-images/city-demo-[slug].svg` (dark bg #0d1117, blue line art #58a6ff, 400x300 viewBox)
6. Add demo card to `src/features/local-seo/CityPageTemplate.tsx` (used by 28 city pages)
7. Add demo cards to the 5 custom city pages: durand-davis, freeport, pecatonica, rockford, winnebago
8. Update the demos index page description text (currently says "Ten full demo websites")
9. Build and verify: `GATSBY_CPU_COUNT=1 npm run build`

---

## City Landing Pages (33 total)

The site has 33 city landing pages for local SEO, targeting "web developer [city] illinois/wisconsin" keywords. Each page has unique content about the city, its business community, and why a local web developer matters.

### City Page Architecture

- **28 pages** use the shared `src/features/local-seo/CityPageTemplate.tsx` (927 lines) — a configurable template that accepts city data and renders a complete landing page with demo cards, FAQ, stats, and schema markup.
- **5 pages** are custom (not using the template): `durand-davis`, `freeport`, `pecatonica`, `rockford`, `winnebago`. These have hand-written unique content and manually-coded demo card sections.

### City Images

All city hero images are in `static/city-images/[city-slug].jpg` (33 images). Image credits metadata in `static/city-images/image-credits.json`.

### Package Illustrations (`static/package-images/`)

~50 SVG illustrations used on city pages and service pages. All follow the same style: dark background (#0d1117), blue line art (#58a6ff), 400x300 viewBox. Naming convention: `city-[purpose].svg`. Demo card illustrations: `city-demo-[slug].svg` (10 total, one per demo). Additional: `city-see-all-demos.svg`, `city-custom-design.svg`.

**IMPORTANT**: When adding demo card references, the filename for the law firm demo is `city-demo-law-firm.svg` (WITH hyphen between "law" and "firm"). A previous bug had it as `city-demo-lawfirm.svg` (no hyphen) which caused 404s.

### Adding a New City Landing Page

1. Determine if the city should use the template or be custom (template is default)
2. If using template: add city data to the template's configuration and create the page file that imports and renders it
3. If custom: copy `src/pages/web-developer-durand-davis-illinois.tsx` as a template
4. Change `pathname`, `pageTitle`, `pageDescription`, and all city-specific content
5. Add unique content (do NOT just swap the city name — Google penalizes thin duplicate pages)
6. Add schema markup with the city in `areaServed`
7. Add internal links from the homepage hero (`src/@lekoarts/gatsby-theme-minimal-blog/texts/hero.mdx`)
8. Add a link in the footer (`src/@lekoarts/gatsby-theme-minimal-blog/components/footer.tsx`)
9. Add cross-links from other city pages
10. Update `src/site/seo/local-seo.ts` to add the city to `serviceAreaPlaces`
11. Create city hero image in `static/city-images/[slug].jpg`

---

## File Map for Common Tasks

### Adding a new blog post
1. Create `content/posts/[slug]/index.mdx`
2. Add frontmatter: `title`, `date`, `tags`, `categories`, `description`
3. Build and deploy

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

### Editing the demos index page
- `src/pages/demos/index.tsx` — contains the DEMOS array with all 10 demo entries
- Each entry has: slug, name, industry, description, Icon, color, heroImage, features[]

### Work/Portfolio case studies
- 3 case study pages in `src/pages/work/`: greenscape-pro-landscaping, northstar-hvac, rock-river-diner
- 10 project write-ups in `content/pages/projects/`: animal-sounds, car-match, cheesemath, ciris-ai, convo-ai, interactive-pokedex, obj-parser, projecthub, securelearn-lms, triangle-shader-lab
- 5 role pages in `content/pages/roles/`: ai-automation-engineer, backend-engineer, cloud-engineer, devops-engineer, full-stack-engineer

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

3. **GitHub Dependabot alerts** — There are 28 dependency vulnerabilities (15 high, 6 moderate, 7 low). These are in Gatsby's dependency tree and require a Gatsby version upgrade to fix. Do not attempt to fix these without a full upgrade plan.

4. **Demo card SVG filename consistency** — The law firm demo SVG is `city-demo-law-firm.svg` (with hyphen). The CityPageTemplate.tsx previously had a typo (`city-demo-lawfirm.svg`) that caused 404s on 28 city pages. This was fixed in commit `88a7e24` but if you see 404s for demo SVGs, check filename consistency between `static/package-images/` and the references in `CityPageTemplate.tsx` + the 5 custom city pages.

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
- Do NOT use `city-demo-lawfirm.svg` (no hyphen) — the correct filename is `city-demo-law-firm.svg`

---

## Git Workflow

- Branch: `master` (no develop/staging branch)
- Auto-deploys to Netlify on push to `master`
- Commit message style: imperative mood, concise, focus on "why"
- Do NOT push unless explicitly asked
- Do NOT commit if no changes exist

---

## Recent Work History (for context)

Recent commits (newest first):
- `88a7e24` — Fix 404 on law firm SVG in CityPageTemplate (typo: lawfirm → law-firm)
- `e4fa3bd` — Redesign law firm SVG with clearer scales of justice
- `d05e90e` — Add SVG graphics and demo cards for 4 new industry demos on city pages
- `54cb336` — Add unique industry-specific features to 4 demo websites (manufacturing, agriculture, law-firm, dental)
- `c3f3738` — Replace all demo images with topic-specific Pexels photos (82 images)
- `95e7b41` — Fix invisible text on dark-theme demo cards (--demo-card-bg variable)
- `e632518` — Add image-rich sections to agriculture, law-firm, and dental demos
- `1056504` — Add 4 new industry demos and update 20 city pages with real research
- `b0d836a` — Add 7 project write-ups and expand projects index to 10 projects

### What was done in the last session:
1. Rewrote all 4 new demos (manufacturing, agriculture, law-firm, dental) to be image-rich with 8-10 image references each
2. Replaced all demo images with high-quality Pexels photos (82 images total)
3. Added `--demo-card-bg` CSS variable to all design system themes to fix invisible text on dark themes
4. Added unique industry-specific interactive features to each demo (RFQ forms, calculators, triage tools, etc.)
5. Extended `WeatherWidget.tsx` to support `context="agriculture"` (previously only "hvac" and "landscaping")
6. Created 6 new SVG illustrations for city page demo cards (manufacturing, agriculture, law-firm, dental, see-all-demos, custom-design)
7. Added the 4 new demo cards to the CityPageTemplate (28 city pages) and 2 custom city pages (durand-davis, rockford)
8. Fixed a typo where `city-demo-lawfirm.svg` should have been `city-demo-law-firm.svg`
