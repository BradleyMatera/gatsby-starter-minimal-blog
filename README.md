# bradleymatera.dev

Production website and blog for Bradley Matera — a personal portfolio, blog, digital store, recruiter hub, and **local SEO web development service** built with Gatsby, React, and Netlify serverless functions.

**Live site:** [bradleymatera.dev](https://bradleymatera.dev)
**Phone:** (608) 313-5373
**Email:** bradmatera@gmail.com

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Static Site Generator | Gatsby 5 (React 18, TypeScript) |
| Theme | `@lekoarts/gatsby-theme-minimal-blog` (shadowed) |
| Styling | CSS custom properties, `theme-ui` (live theme overrides via Web Designer Style Lab) |
| Animations | GSAP + ScrollTrigger, Framer Motion, Three.js |
| Content | MDX (posts and pages) |
| Backend | Netlify serverless functions (esbuild) |
| Database | PostgreSQL via Neon serverless (`@neondatabase/serverless`) |
| Payments | Stripe Checkout + webhooks |
| Auth | Netlify Identity |
| Email | Resend API |
| Hosting/Deploy | Netlify |
| Search | Algolia (`gatsby-plugin-algolia`) |

---

## Quick Start

### Prerequisites
- Node.js >= 20 and < 24
- npm

### Install & run locally
```bash
npm install --legacy-peer-deps
npm run develop          # Gatsby dev server on :8000
```

To run with Netlify functions (Stripe, chat, downloads, etc.):
```bash
npm run dev              # netlify dev — proxies :8000 to :8888 with functions
```

### Production build
```bash
npm run build            # gatsby build → public/
npm run serve            # gatsby serve → :9000
```

### Other scripts
```bash
npm run clean            # clear gatsby cache
npm run lint             # eslint
npm run lint:fix         # eslint --fix
npm run test             # route verification script
npm run products:status  # check store product state
npm run products:seed:direct  # seed direct products
```

**Note:** The build command in `netlify.toml` includes `rm -rf .cache public &&` to ensure a fresh build on every deploy. This prevents stale Gatsby cache issues that caused canonical/SEO problems in the past.

---

## Project Structure

```
├── config/
│   └── gatsby/
│       ├── browser.js      # Client entry: theme init, scroll behavior, hydration fixes
│       ├── node.js         # Gatsby node API: onPostBuild hook for tag page SEO fixes
│       ├── plugins.ts      # Gatsby plugin configuration
│       └── ssr.js          # SSR: html lang attr, head components, global styles
├── content/
│   ├── posts/              # Blog posts (MDX) — 40 posts
│   └── pages/              # Static pages (MDX)
│       ├── about/          # About page
│       ├── contact/        # Contact page
│       ├── roles/          # Role-specific landing pages (5 roles)
│       ├── support/        # Support page
│       └── ...
├── netlify/
│   └── functions/          # Serverless API endpoints (see below)
├── src/
│   ├── @lekoarts/          # Shadowed theme components
│   │   └── gatsby-theme-minimal-blog/
│   │       ├── components/     # Layout, header, footer, blog, listing, seo, etc.
│   │       ├── texts/          # Hero.mdx and other theme text content
│   │       └── gatsby-plugin-theme-ui/
│   │           └── index.ts    # theme-ui color modes (light/dark)
│   ├── pages/              # Route pages (see Page Routes below)
│   ├── site/               # Site-specific components, hooks, icons, accents
│   │   ├── icons/          # Custom SVG icon library (111 icons)
│   │   └── seo/            # Local SEO schema builders
│   ├── features/           # Feature modules
│   │   ├── contact/        # Contact form and content
│   │   ├── demos/          # Shared demo components (DemoLayout, WeatherWidget, etc.)
│   │   ├── home/           # Homepage components (hero, actions)
│   │   ├── local-seo/      # CityPageTemplate (shared template for 28 city pages)
│   │   ├── recruiter/      # Recruiter hub sections (15+ components)
│   │   └── store/          # Store and product features
│   ├── styles/             # Global CSS (tokens, chrome, utilities, media, nav)
│   │   └── themes/         # Visual theme presets (brutalism, retrofuturism, neumorphism)
│   ├── ui/                 # Reusable UI primitives (Section, Card, Link)
│   └── utils/              # Shared utilities
├── static/                 # Favicons, images, robots.txt, documents
├── docs/audits/            # SEO/accessibility audit reports (gitignored)
├── PRICING_MODEL.md        # Pricing rationale with tax breakdowns
├── GOOGLE_VOICE_SETUP.md   # Google Voice business phone setup guide
├── netlify.toml            # Netlify build & dev config
└── package.json
```

---

## Page Routes

### Core Pages (MDX content)
| Route | Source | Description |
|-------|--------|-------------|
| `/` | Homepage | Hero, skills, projects, blog preview |
| `/about/` | `content/pages/about/` | Bio, background, certifications |
| `/contact/` | `content/pages/contact/` | Contact form, phone, email |
| `/roles/` | `content/pages/roles/` | Role-based capability pages |
| `/support/` | `content/pages/support/` | Support page |
| `/contributions/` | `content/pages/contributions/` | Open source contributions |

### Role Pages (MDX content)
| Route | Source |
|-------|--------|
| `/roles/ai-automation-engineer/` | `content/pages/roles/ai-automation-engineer.mdx` |
| `/roles/backend-engineer/` | `content/pages/roles/backend-engineer.mdx` |
| `/roles/cloud-engineer/` | `content/pages/roles/cloud-engineer.mdx` |
| `/roles/devops-engineer/` | `content/pages/roles/devops-engineer.mdx` |
| `/roles/full-stack-engineer/` | `content/pages/roles/full-stack-engineer.mdx` |

### Local SEO Landing Pages (TSX)
33 city landing pages targeting "web developer [city] Illinois/Wisconsin" keywords. 28 use the shared `src/features/local-seo/CityPageTemplate.tsx` template; 5 are custom (durand-davis, freeport, pecatonica, rockford, winnebago).

| Route | File | Target Keywords |
|-------|------|-----------------|
| `/web-developer-durand-davis-illinois/` | `src/pages/web-developer-durand-davis-illinois.tsx` | web developer Durand/Davis IL |
| `/web-developer-rockford-illinois/` | `src/pages/web-developer-rockford-illinois.tsx` | web developer Rockford IL |
| `/web-developer-freeport-illinois/` | `src/pages/web-developer-freeport-illinois.tsx` | web developer Freeport IL |
| `/web-developer-pecatonica-illinois/` | `src/pages/web-developer-pecatonica-illinois.tsx` | web developer Pecatonica IL |
| `/web-developer-winnebago-illinois/` | `src/pages/web-developer-winnebago-illinois.tsx` | web developer Winnebago IL |
| `/web-developer-[city]-illinois/` | `src/pages/web-developer-[city]-illinois.tsx` | 23 more IL cities (template-based) |
| `/web-developer-[city]-wisconsin/` | `src/pages/web-developer-[city]-wisconsin.tsx` | 5 WI cities (template-based) |
| `/pricing/` | `src/pages/pricing.tsx` | website pricing Northwest Illinois |
| `/website-help-northwest-illinois/` | `src/pages/website-help-northwest-illinois.tsx` | website help Northwest Illinois |
| `/northwest-illinois-web-development-faq/` | `src/pages/northwest-illinois-web-development-faq.tsx` | web development FAQ IL |

### Demo Websites (TSX)
10 full demo business websites at `/demos/` serving as sales tools for potential clients.

| Route | Business | Industry |
|-------|----------|----------|
| `/demos/restaurant/` | Riverside Grill | Restaurant |
| `/demos/landscaping/` | GreenScape Pro | Landscaping |
| `/demos/hvac/` | ComfortAir Heating & Cooling | HVAC |
| `/demos/auto-repair/` | Northside Auto Repair | Auto Repair |
| `/demos/real-estate/` | Rockford Heritage Realty | Real Estate |
| `/demos/beauty-salon/` | Bella Vista Salon | Beauty Salon |
| `/demos/manufacturing/` | Sterling Metalworks | Manufacturing |
| `/demos/agriculture/` | Kishwaukee Valley Farm Services | Agriculture |
| `/demos/law-firm/` | Rock River Legal Group | Law Firm |
| `/demos/dental/` | Rock River Family Dental | Dental |

Each demo includes: hero, services grid with images, team bios, testimonials, FAQ, integrations section, contact form, and industry-specific interactive features (calculators, triage tools, eligibility checkers, etc.). See `AGENTS.md` for full details on demo features and shared components.

### App Pages (TSX)
| Route | File | Description |
|-------|------|-------------|
| `/recruiter/` | `src/pages/recruiter.tsx` | Recruiter hub with 15+ sections |
| `/store/` | `src/pages/store.tsx` | Digital product store |
| `/purchases/` | `src/pages/purchases.tsx` | Customer portal |
| `/success/` | `src/pages/success.tsx` | Stripe checkout success |
| `/cancel/` | `src/pages/cancel.tsx` | Stripe checkout cancel |
| `/404/` | `src/pages/404.tsx` | 404 page |

### Blog
| Route | Description |
|-------|-------------|
| `/blog/` | Blog listing with pagination |
| `/blog/[slug]/` | Individual blog posts (40 posts) |
| `/tags/` | All tags listing |
| `/tags/[tag]/` | Posts filtered by tag |

---

## Key Features

### Local SEO Service
- **33 city landing pages** targeting Northwest Illinois and Southern Wisconsin (28 use shared `CityPageTemplate.tsx`, 5 are custom)
- **10 demo websites** at `/demos/` showing potential clients what their site could look like (restaurant, landscaping, HVAC, auto repair, real estate, beauty salon, manufacturing, agriculture, law firm, dental)
- **Pricing page** with transparent tiered pricing ($447–$1,497)
- **Service schema markup** (Service + ProfessionalService) on every city page
- **LocalBusiness schema** with NAP consistency (Name, Address, Phone)
- **Google Business Profile** integration (phone: (608) 313-5373)
- Each city page includes: 10 demo card illustrations, 3-step process, industries served, social proof stats, FAQ, pricing link
- See `PRICING_MODEL.md` for full pricing rationale and tax breakdowns
- See `GOOGLE_VOICE_SETUP.md` for business phone setup

### Blog
- MDX-powered posts with tags, categories, search, and pagination
- Syntax-highlighted code blocks with live preview
- RSS feed and sitemap
- Algolia search integration

### Store
- Digital product catalog backed by Stripe
- Checkout sessions via Netlify functions
- Purchase verification and download tokens (JWT-signed)
- Customer portal at `/purchases/`

### Recruiter Hub
- AI-powered chat backend (GCP) with knowledge base
- 15+ sections: hero, roles, contributions, resources, experience timeline, project explorer, skills explorer, AWS section, certifications, technical writing, FAQ, leadership, contact, interview resources
- Each section has a unique background image
- Trackable sections for analytics

### Dynamic Style Customization
- Web Designer Style Lab accessible from the navigation
- Preset themes: Brad's Default, Cyberpunk, Retro, Minimal, High Contrast, OLED Midnight, Forest, Ocean
- Visual theme presets: brutalism, retrofuturism, neumorphism
- Custom controls for colors, fonts, typography, and effects
- Real-time updates via CSS custom properties and `localStorage` persistence

### Accessibility & UX
- WCAG AA color contrast compliance
- Skip-to-content link, ARIA labels, semantic HTML
- `lang="en"` on all pages via SSR fallback
- Scroll-to-top on route change, hash link scrolling
- Responsive across mobile, tablet, and desktop

---

## Netlify Functions

| Function | Purpose |
|----------|---------|
| `chat-router.js` | Recruiter chat backend (GCP AI) |
| `create_checkout_session.js` | Stripe checkout session creation |
| `stripe_webhook.js` | Stripe webhook handler |
| `send_receipt_email.js` | Order email via Resend |
| `recruiter-chat.js` | AI chat with knowledge base |
| `get_order_downloads.js` | Download entitlements |
| `download.js` | Signed download tokens (JWT) |
| `list_products.js` | Store product catalog |
| `get_product.js` | Single product lookup |
| `get_entitlements.js` | Purchase entitlements |
| `get_orders_by_email.js` | Orders by customer email |
| `go.js` | URL redirect/shortener |
| `send_test_receipt.js` | Test receipt email |

Support modules (prefixed with `_`): `_db.js`, `_downloads.js`, `_email.js`, `_env.js`, `_identity.js`, `_response.js`, `_stripe.js`, `_downloadTokens.js`

---

## SEO Architecture

### Canonical URLs
- All pages have self-referencing canonical URLs
- Tag pages use an `onPostBuild` hook in `config/gatsby/node.js` to inject correct canonicals and meta descriptions post-build (bypasses Gatsby shadowing issues in Netlify CI)

### Sitemap
- Gatsby generates `sitemap.xml/sitemap-index.xml`
- Netlify redirect serves it at `/sitemap.xml` for crawlers
- `robots.txt` points to `/sitemap.xml`

### Schema Markup
- `LocalBusiness` / `ProfessionalService` schema on all city pages
- `Service` schema with `areaServed` for each city
- `FAQPage` schema on pricing and FAQ pages
- `Breadcrumb` schema on all pages
- Schema builder in `src/site/seo/local-seo.ts`

### Service Areas
Durand, Davis, Rockford, Freeport, Pecatonica, Winnebago, Winnebago County, Stephenson County, Northwest Illinois

### NAP (Name, Address, Phone)
- **Name:** Bradley Matera
- **Phone:** (608) 313-5373
- **Email:** bradmatera@gmail.com
- **Website:** https://bradleymatera.dev
- Phone number must be consistent across: website header, footer, all city pages, pricing page, contact page, schema markup, and Google Business Profile

---

## Environment Variables

Required for full functionality (set in Netlify dashboard or `.env`):

| Variable | Purpose |
|----------|---------|
| `NETLIFY_DATABASE_URL` | PostgreSQL connection string (Neon) |
| `STRIPE_SECRET_KEY` | Stripe API key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `RESEND_API_KEY` | Resend email API key |
| `ORDER_EMAIL_FROM` | Sender address for order emails |
| `DOWNLOAD_TOKEN_SECRET` | JWT secret for download tokens |
| `GCP_CHAT_API_URL` | GCP AI chat endpoint |
| `KNOWLEDGE_URL` | Knowledge base URL for recruiter chat |
| `GATSBY_IDENTITY_URL` | Netlify Identity URL (local dev) |

---

## Deployment

The site auto-deploys to Netlify on push to `master`.

```toml
# netlify.toml
[build]
  command = "rm -rf .cache public && npm run build"
  publish = "public"
  functions = "netlify/functions"

  [build.environment]
    NODE_VERSION = "20"

[dev]
  command = "npm run develop"
  targetPort = 8000
  port = 8888
  publish = "public"

[functions]
  node_bundler = "esbuild"
  included_files = ["netlify/functions/downloads/**"]

# Serve the sitemap index at /sitemap.xml for crawlers
[[redirects]]
  from = "/sitemap.xml"
  to = "/sitemap.xml/sitemap-index.xml"
  status = 200
  force = true
```

**Netlify Plugins:**
- `@netlify/plugin-gatsby` (v3)
- `@netlify/plugin-lighthouse` (v6) — note: Performance score may show 0 due to a known Netlify plugin bug; local Lighthouse scores 83-85

---

## Business Documentation

| File | Purpose |
|------|---------|
| `PRICING_MODEL.md` | Full pricing rationale with tax breakdowns for each tier |
| `GOOGLE_VOICE_SETUP.md` | Step-by-step Google Voice setup for business phone |
| `docs/audits/` | SEO/accessibility audit reports (gitignored) |

---

## License

0BSD — see `package.json`.
