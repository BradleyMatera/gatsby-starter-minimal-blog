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
npm run test:seo                  # SEO inventory check on public/
npm run test:seo:live             # SEO inventory check on live site
npm run test:e2e                  # Playwright E2E tests
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

9. **Preserve verified theme color fixes.** The following demo theme color values have already been adjusted to pass contrast audits and should be reused rather than reverted when modifying related themes:
   - `garage` text-muted: `#a0a0aa`
   - `soft` text-muted: `#7a5560`
   - `dental` text-muted: `#5a6b5c` and accent: `#b04e35`
   - `law-firm` inline red: `#8b1f1f`

### 9. No Synthetic Freshness Signals (CRITICAL — Read Before Adding Dates)

The site must NOT emit build-date timestamps as `lastmod`, `dateModified`, or visible "Last updated" text unless a real content change occurred. The independent SEO audit (Jul 2026) flagged this as a P0 issue.

**Rules:**
1. **Sitemap `lastmod`**: `config/gatsby/plugins.ts` only sets `lastmod` when `page.sitemapLastmod` is available (real content date). Never set `lastmod` to `new Date()` or `BUILD_DATE`.
2. **JSON-LD `dateModified`**: `src/@lekoarts/gatsby-theme-minimal-blog/components/seo.tsx` only sets `dateModified` on `BlogPosting` schema when `article.modifiedTime` or `article.publishedTime` is provided. Never set `dateModified` to the build date on `WebPage` or `ProfessionalService` schema.
3. **No visible "Last updated" stamps**: The `onPostBuild` hook in `config/gatsby/node.js` must NOT inject visible "Last updated: YYYY-MM-DD" text into HTML. This was removed in Jul 2026.
4. **`local-seo.ts`**: `buildProfessionalServiceSchema` must NOT include hard-coded `datePublished` or `dateModified` values.

### 10. JSON-LD Consolidation (CRITICAL — Read Before Adding Structured Data)

All JSON-LD must use stable `@id` references and consistent naming. The independent SEO audit (Jul 2026) flagged duplicate and disconnected schema as a P0 issue.

**Rules:**
1. **Stable `@id` values**: Person uses `https://bradleymatera.dev/#person`, WebSite uses `https://bradleymatera.dev/#website`, WebPage uses `{canonical}#webpage`. These are defined in `src/@lekoarts/gatsby-theme-minimal-blog/components/seo.tsx` and `src/site/seo/local-seo.ts`.
2. **No duplicate Person/WebSite schema**: The homepage previously injected a duplicate `@graph` with Person and WebSite. This was removed in Jul 2026. The `Seo` component already emits these — do not add additional Person or WebSite JSON-LD on any page.
3. **Consistent name**: Always use `"Bradley Matera"` (not `"Bradley F. Matera"`) in all schema.
4. **Use `@id` references for connections**: Instead of embedding full Person objects in `author`/`publisher` fields, use `{ "@id": "https://bradleymatera.dev/#person" }`.
5. **`local-seo.ts` uses `#person` ID**: `personSchema` and `websiteSchema` in `src/site/seo/local-seo.ts` use `@id` values matching the `Seo` component. `buildConnectedSchema` and `buildProfessionalServiceSchema` reference these by `@id`.

### 11. Demo Fictional Disclosures (CRITICAL — Read Before Editing Demo Pages)

All 10 demo pages must clearly disclose that they are concept demos with fictional businesses. The independent SEO audit (Jul 2026) flagged missing disclosures as a P0 issue.

**Rules:**
1. **DemoBanner text**: `src/features/demos/DemoBanner.tsx` displays "concept demo, fictional business" in the banner at the top of every demo page.
2. **DemoLayout footer disclosure**: `src/features/demos/DemoLayout.tsx` injects a `demo-fictional-disclosure` div at the bottom of every demo page stating the business is fictional.
3. **Page titles**: Every demo page `pageTitle` must include "Concept Demo" and "(Fictional)".
4. **Page descriptions**: Every demo page `pageDescription` must start with "Concept demo of a fictional...".
5. **Do not remove or weaken these disclosures** — they prevent search engines from indexing demo content as real business information.

### 12. No Unsupported Performance or Ranking Claims

City pages must not make specific performance or ranking claims that cannot be verified. The independent SEO audit (Jul 2026) flagged these as P0 issues.

**Banned phrases on city pages:**
- "under 2 seconds" (specific load time claim)
- "faster than most" (comparative performance claim)
- "ranks locally" (ranking guarantee)

**Acceptable alternative**: "Every site I build is tested with Google PageSpeed Insights before launch to ensure fast load times on mobile. I optimize images, minimize JavaScript, and use modern web standards."

**Warranty/refund wording must match the legal policy source:**
- City pages and pricing must use the same wording as `src/pages/refund-policy.tsx` and `src/site/legal/business-identity.ts`.
- Deposits are refundable **until** the first revision round is delivered (not "after").
- The 30-day warranty "covers bugs caused by the build" (not a blanket satisfaction guarantee).
- Never paraphrase legal terms in a way that changes their meaning.

### 13. SEO Inventory Script

Run `node scripts/seo-inventory.js` after building to verify:
- Exactly one canonical per page
- Stable `@id` references in JSON-LD
- No build-date `dateModified` on non-article pages
- Demo pages contain fictional disclosure text
- `robots.txt` has exactly one sitemap declaration
- No banned unsupported claims on city pages
- Core content present in static HTML

Use `node scripts/seo-inventory.js --live` to check the production site. Playwright E2E tests are in `e2e/seo-audit.spec.ts`.

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

## Compliance Standards (CRITICAL — Read Before Adding Any Page or Component)

As of Jul 25, 2026, all 267 pages pass WCAG A, AA, AAA, and ADA. The site scores 95/100 overall (SEO 91, AEO 95, GEO 95). Every new page or component MUST maintain these standards. The rules below are derived from the ApexSolutions audit methodology and codify what makes the site pass.

### Pre-Deployment Verification Commands

```bash
# 1. WCAG contrast check (all 10 demo pages)
node scripts/contrast-check.js              # live site
node scripts/contrast-check.js --local       # localhost:9000 (run build && serve first)

# 2. Build check
rm -rf .cache public && GATSBY_CPU_COUNT=1 npm run build

# 3. Lint check
npm run lint
```

If any of these fail, fix before deploying. Do not deploy broken contrast or build failures.

### WCAG A — Baseline Access (must never break)

These are the fundamentals. The audit checks every page for:

1. **`<html lang>` attribute** — Set in `src/@lekoarts/gatsby-theme-minimal-blog/components/seo.tsx` via `<html lang={siteLanguage} />`. Site language is `en` (set in `config/gatsby/site-metadata.ts`). Every page inherits this. Do not override.

2. **Page titles** — Every page MUST have a unique `<title>`. The `Seo` component handles this. Pass `title` prop to `<Seo>`. Format: `Page Name | Small Business Web Design in Northwest Illinois | Bradley Matera`.

3. **Meta descriptions** — Every page MUST have a unique meta description (140–160 chars). Pass `description` prop to `<Seo>`. Never reuse the same description across pages.

4. **Heading hierarchy** — Exactly one `<h1>` per page. Follow with `<h2>`, `<h3>` in order. Never skip levels (no `<h4>` without an `<h3>` parent). The audit checks for this.

5. **Alt text on all images** — Every `<img>` MUST have `alt` attribute. Decorative images use `alt=""`. Background images (CSS `background-image`) don't need alt text but the element with the background should have an accessible name if it conveys information.

6. **Form labels** — Every form input MUST have a `<label>` with `htmlFor` matching the input's `id`. Use the `.demo-form-label` + `.demo-form-input` pattern from demos. Never use placeholder-only labels.

7. **Keyboard accessibility** — Interactive elements (buttons, links, form fields) must be keyboard-accessible. Custom interactive elements (FAQ accordions, calculators) must use `role="button"`, `tabIndex={0}`, and `onKeyDown` handlers. See the FAQ accordion pattern in demo pages.

8. **Skip navigation** — The theme provides a skip link. Do not remove it.

### WCAG AA — Practical Standard (must never break)

1. **Color contrast** — See section 8 above. Normal text ≥ 4.5:1, large text (≥24px or ≥18.66px bold) ≥ 3:1. Run `node scripts/contrast-check.js` after any color change.

2. **No color-only information** — Don't convey status with color alone. Status badges must have text labels (e.g., "In Stock" not just a green dot). The integration status badges use text + color + icons.

3. **Reflow** — Content must reflow at 320px width without horizontal scroll. Use responsive CSS (flexbox, grid, `max-width: 100%`). Test with browser DevTools mobile view.

4. **Focus visibility** — All interactive elements must have visible focus indicators. The theme provides default focus styles. Do not set `outline: none` without a replacement focus style.

5. **Target size** — Clickable elements should be at least 44×44px. Buttons and links in demos use padding to meet this. Small icon links should have sufficient padding.

6. **Error identification** — Form errors must be programmatically associated with their inputs. Use `aria-describedby` or inline error text with `role="alert"`.

### WCAG AAA — Enhanced Access (must never break)

1. **Enhanced contrast** — Normal text ≥ 7:1, large text ≥ 4.5:1. This is stricter than AA. All inline-styled text colors must be dark enough (or light enough on dark backgrounds) to meet 7:1.

2. **No-exception keyboard access** — No keyboard traps. All functionality available via keyboard. Modal dialogs (if any) must trap focus and return it on close.

3. **Reading support** — Line spacing at least 1.5x within blocks of text. Paragraph spacing at least 1.5x the line height. The theme's default styles handle this — don't override with tighter spacing on text-heavy pages.

4. **Focus order** — Tab order must follow visual order. Use DOM order, not CSS order. `tabIndex` should only be 0 or -1, never positive values.

### ADA Readiness

The audit checks for A/AA risk factors. To maintain "Passes most factors":
- All WCAG A and AA criteria must pass (see above)
- Forms must have proper labels and error handling
- Navigation must be keyboard-accessible
- Page structure must use semantic HTML (`<nav>`, `<main>`, `<header>`, `<footer>`, `<section>`, `<article>`)

### SEO — Search Engine Optimization (score: 91/100)

1. **Canonical URLs** — Every page MUST have a self-referencing `<link rel="canonical">`. The `Seo` component handles this via `canonicalUrl` prop. For demo pages, pass `canonicalUrl={pageUrl}` where `pageUrl = \`${site.siteUrl}${pathname}\``.

2. **Robots meta** — Default is `index,follow`. Only use `noindex` for pages that should NOT appear in search (e.g., `/purchases/` which is intentionally blocked). Never accidentally set `noindex` on pages you want indexed.

3. **Sitemap** — Gatsby auto-generates `/sitemap.xml`. The `onPostBuild` hook in `config/gatsby/node.js` fixes tag page canonicals. Do not remove it. The sitemap redirect in `netlify.toml` must stay.

4. **Schema markup** — Every page gets Person, WebSite, WebPage, and BreadcrumbList schema from the `Seo` component. Additional schema types:
   - **Blog posts**: BlogPosting (auto-added by `Seo` when `ogType="article"`)
   - **Service pages**: Service with offers and areaServed
   - **FAQ sections**: FAQPage with Question/Answer pairs
   - **Local business**: ProfessionalService with address, phone, areaServed (in `src/site/seo/local-seo.ts`)
   - Pass custom schema via the `structuredData` prop on `<Seo>`.

5. **URL structure** — Use kebab-case URLs with trailing slashes. Example: `/services/local-seo/`. The `Seo` component normalizes pathnames to add trailing slashes.

6. **Meta description length** — 140–160 characters. Too short = missed opportunity. Too long = truncated in SERP.

7. **Internal linking** — Every new page must have internal links from at least 2 other pages. Add links from relevant existing pages, homepage, footer, or related blog posts.

8. **Mobile-responsive** — All pages must work on mobile. Use responsive CSS. Test at 320px, 768px, and 1024px widths.

### AEO — Answer Engine Optimization (score: 95/100)

AI answer systems (ChatGPT, Perplexity, Copilot) extract answers from pages. To maintain high AEO:

1. **Use HTML lists and tables** — Process steps, comparisons, pricing, and requirements should use `<ul>`, `<ol>`, or `<table>` elements. Not prose paragraphs. The audit specifically checks for "extractable lists, steps, and comparisons."

2. **Descriptive headings** — Use clear H2/H3 headings that match likely questions. "How much does a website cost?" not "Pricing Information." Answer systems extract sections by heading.

3. **Direct answers first** — Put the direct answer in the first paragraph under a heading, then elaborate. Don't bury the answer in the third paragraph.

4. **FAQ sections** — Use the `FAQSection` component or `FAQPage` schema. Questions should be phrased as natural questions users would ask.

5. **Structured data** — FAQPage, HowTo, and Article schema help answer systems extract content accurately.

### GEO — Generative Engine Optimization (score: 95/100)

Generative AI engines look for evidence-backed claims. To maintain high GEO:

1. **Support claims with evidence** — Numbers, dates, superlatives, and outcome promises should have nearby proof: source links, case studies, testimonials, or data references. The audit flags "claims need stronger evidence" on 89 pages — this is the main area for improvement.

2. **Author/publisher attribution** — Pages with factual claims should have author details nearby. The `Seo` component adds Person schema automatically. For blog posts, the author info is in the post template.

3. **Citations and source links** — When stating statistics or facts, link to the source. Example: "Core Web Vitals matter for SEO [link to Google's page]" not just "Core Web Vitals matter for SEO."

4. **Dates on content** — Blog posts have `datePublished` and `dateModified` in schema. Service pages use the build date. Keep content fresh — outdated content signals lower trust.

5. **Reviews and testimonials** — Include testimonials with attribution (name, location, business). The demo pages use `.demo-testimonial` components with named authors.

### New Page Checklist

Every new page MUST have:

- [ ] `<Seo>` component with `title`, `description`, `pathname`, `canonicalUrl`
- [ ] Unique title following format: `Page Name | Small Business Web Design in Northwest Illinois | Bradley Matera`
- [ ] Meta description (140–160 chars, unique)
- [ ] `robots="index,follow"` (unless intentionally blocking)
- [ ] Exactly one `<h1>` with target keyword
- [ ] Proper heading hierarchy (h1 → h2 → h3, no skips)
- [ ] Alt text on all images
- [ ] Labels on all form inputs (`htmlFor` + `id`)
- [ ] Keyboard-accessible interactive elements (`role`, `tabIndex`, `onKeyDown`)
- [ ] Schema markup (at minimum: BreadcrumbList; add FAQPage for FAQ sections, Service for service pages)
- [ ] Breadcrumbs (pass `breadcrumbs` prop to `<Seo>`)
- [ ] Internal links from at least 2 other pages
- [ ] Mobile-responsive layout (test at 320px)
- [ ] All colors meet WCAG AAA contrast (7:1 normal, 4.5:1 large text)
- [ ] No `rgba()` backgrounds behind text — use solid hex colors
- [ ] Content uses HTML lists/tables for process steps, comparisons, pricing
- [ ] Factual claims backed by evidence (links, data, testimonials)

### New Component Checklist

Every new component MUST:

- [ ] Use semantic HTML elements (`<button>`, `<a>`, `<nav>`, `<section>`, etc.)
- [ ] Have visible focus indicators (don't remove `outline` without replacement)
- [ ] Meet contrast requirements (run `node scripts/contrast-check.js` if adding colors)
- [ ] Use solid hex colors, never `rgba()` for backgrounds behind text
- [ ] Be keyboard-accessible if interactive (test with Tab key)
- [ ] Have `aria-label` or accessible text for icon-only buttons
- [ ] Use `aria-hidden="true"` on decorative SVGs
- [ ] Have `alt` text on all `<img>` tags
- [ ] Not break reflow at 320px width

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
- Do NOT use `rgba()` for backgrounds behind text — use solid hex colors (audit tool doesn't blend)
- Do NOT set `outline: none` without a replacement focus style
- Do NOT skip heading levels (no `<h4>` without `<h3>` parent)
- Do NOT use placeholder text as form labels — always use `<label htmlFor>`
- Do NOT use positive `tabIndex` values — only 0 or -1
- Do NOT deploy without running `node scripts/contrast-check.js` if you changed any colors
- Do NOT use color alone to convey information — pair with text labels or icons
- Do NOT set `lastmod`, `dateModified`, or visible "Last updated" dates to the build date — only use real content dates
- Do NOT add duplicate Person or WebSite JSON-LD on any page — the `Seo` component already emits these
- Do NOT use "Bradley F. Matera" in schema — always use "Bradley Matera"
- Do NOT remove or weaken demo fictional disclosures (banner text, footer disclosure, page titles/descriptions)
- Do NOT use "under 2 seconds", "faster than most", or "ranks locally" on city pages — use the acceptable alternative in section 12
- Do NOT paraphrase warranty/refund wording on city pages or pricing — use the exact legal terms from `src/pages/refund-policy.tsx`
- Do NOT add a second sitemap declaration to `robots.txt` — exactly one is required

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
