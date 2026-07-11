# bradleymatera.dev

Production website and blog for Bradley Matera — a personal portfolio, blog, digital store, and recruiter hub built with Gatsby, React, and Netlify serverless functions.

**Live site:** [bradleymatera.dev](https://bradleymatera.dev)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Static Site Generator | Gatsby 5 (React 18, TypeScript) |
| Theme | `@lekoarts/gatsby-theme-minimal-blog` (shadowed) |
| Styling | CSS custom properties, TailwindCSS, `theme-ui` (live theme overrides via Web Designer Style Lab) |
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

---

## Project Structure

```
├── config/
│   └── gatsby/
│       ├── browser.js      # Client entry: theme init, scroll behavior, hydration fixes
│       └── ssr.js          # SSR: html lang attr, head components, global styles
├── content/
│   ├── posts/              # Blog posts (MDX)
│   └── pages/              # Static pages (MDX)
├── netlify/
│   └── functions/          # Serverless API endpoints
│       ├── chat-router.js          # Recruiter chat backend (GCP AI)
│       ├── create_checkout_session.js  # Stripe checkout
│       ├── stripe_webhook.js       # Stripe webhook handler
│       ├── send_receipt_email.js   # Order email via Resend
│       ├── recruiter-chat.js       # AI chat with knowledge base
│       ├── get_order_downloads.js  # Download entitlements
│       ├── download.js             # Signed download tokens (JWT)
│       ├── list_products.js        # Store product catalog
│       └── ...
├── src/
│   ├── @lekoarts/          # Shadowed theme components
│   │   └── gatsby-theme-minimal-blog/
│   │       ├── components/     # Layout, header, footer, blog, listing, seo, etc.
│   │       └── gatsby-plugin-theme-ui/
│   │           └── index.ts    # theme-ui color modes (light/dark)
│   ├── pages/              # Route pages (404, store, purchases, recruiter, etc.)
│   ├── site/               # Site-specific components, hooks, icons, accents
│   ├── features/           # Feature modules (store, blog, projects, contact)
│   ├── styles/             # Global CSS (tokens, chrome, utilities, media, nav)
│   ├── ui/                 # Reusable UI primitives (Section, Card, Link)
│   └── utils/              # Shared utilities
├── static/                 # Favicons, images, robots.txt
├── netlify.toml            # Netlify build & dev config
└── package.json
```

---

## Key Features

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
- Project explorer with case studies
- Role-based capability pages

### Portfolio
- Project cards with impact metrics
- About page with certifications and timeline
- Local SEO landing pages for Northwest Illinois

### Dynamic Style Customization
- Web Designer Style Lab accessible from the navigation
- Preset themes: Brad's Default, Cyberpunk, Retro, Minimal, High Contrast, OLED Midnight, Forest, Ocean
- Custom controls for colors, fonts, typography, and effects
- Real-time updates via CSS custom properties and `localStorage` persistence
- Replaces the previous light/dark theme toggle

### Accessibility & UX
- Web Designer Style Lab for customizable themes, with `localStorage` persistence
- WCAG AA color contrast compliance
- Skip-to-content link, ARIA labels, semantic HTML
- `lang="en"` on all pages via SSR fallback
- Scroll-to-top on route change, hash link scrolling
- Responsive across mobile, tablet, and desktop

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

The site auto-deploys to Netlify on push to `main`.

```toml
# netlify.toml
[build]
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
```

---

## Documentation

Full repository documentation lives on the `docs` branch:
`https://github.com/BradleyMatera/gatsby-starter-minimal-blog/tree/docs/docs`

---

## License

0BSD — see `package.json`.
