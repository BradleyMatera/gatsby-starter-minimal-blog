# Quality Audit - 2026-02-21

## Scope and correction
This audit is for **this repo** (`gatsby-starter-minimal-blog`), not your separate demo portfolio repo.

Stack and architecture in this repo:
- **Gatsby 5 + React 18 + TypeScript** (`gatsby-config.ts`, `src/pages/*`)
- **Netlify Functions** for checkout, webhooks, orders, downloads (`netlify/functions/*`)
- **Stripe Checkout + webhook fulfillment** (`create_checkout_session.js`, `stripe_webhook.js`)
- **Netlify DB (Postgres)** via `pg` (`netlify/functions/_db.js`, `netlify/db/migrations/*`)
- **Netlify Identity** for customer portal auth (`netlify/functions/_identity.js`, `src/pages/purchases.tsx`)
- **Resend** for receipts and lifecycle emails (`netlify/functions/_email.js`)

## What was fixed in this pass

### 1) Store tab accessibility and keyboard behavior
Files: `src/pages/store.tsx`
- Added explicit tab IDs and panel linkage (`aria-controls` / `aria-labelledby`).
- Added roving focus behavior for primary tabs with keyboard support:
  - `ArrowLeft`, `ArrowRight`, `Home`, `End`.
- Added `hidden` + `aria-hidden` on inactive panels.
- Added `tabIndex` to tabpanels so panel content is keyboard-reachable.
- Corrected Amazon collection buttons from tab semantics to pressed-toggle semantics (`aria-pressed`) because they are filters, not independent tabpanels.
- Restored deep-link behavior for the hero CTA by making the Amazon panel anchorable at `#brads-amazon-picks`.

Why: aligns with WAI-ARIA Authoring Practices for tab interactions and panel relationships.

### 2) Focus visibility and readability improvements
Files: `src/styles/global.css`
- Replaced weak generic focus style with clear keyboard-visible outline + offset.
- Reduced decorative background visual intensity (stripes, color layer, curves) so content contrast wins more consistently.

Why: improves keyboard focus discoverability and lowers visual noise competing with body text/cards.

### 3) Render stability / lint quality
Files: `src/pages/store.tsx`
- Wrapped `storeTabs`, `defaultStoreTab`, and `amazonTabs` calculations in `useMemo` to avoid unstable hook dependency churn.
- Added targeted keyboard handler via `useCallback`.
- Verified with `npx eslint src/pages/store.tsx` (clean).

### 4) Smoke-test quality gate corrected
Files: `scripts/verify-main-route.js`
- Updated homepage marker expectations to match current site title/headline values.
- Kept the same intent (ensure build output contains stable homepage identity text), but removed stale string coupling.

### 5) Second-pass maintainability refactor
Files: `src/pages/store.tsx`, `src/components/store/store-view.tsx`
- Split store presentation concerns into reusable UI modules (`StoreHero`, `StorePrimaryTabs`, `ProductGrid`, `FeaturedSection`, `AmazonCollectionTabs`, `ComparisonSection`).
- Centralized store product view helpers/types (`Product`, pricing/labels/badges/image fallback logic) in one module.
- Reduced `src/pages/store.tsx` responsibility to data/state/orchestration and route wiring.

### 6) Third-pass route separation
Files: `src/pages/store.tsx`, `src/components/store/store-detail-route.tsx`
- Moved product-detail route fetch/render logic into a dedicated route component.
- Kept `store.tsx` focused on store index orchestration + router composition.
- Preserved existing detail UX/content while reducing file-level coupling.

## Current quality findings (repo-accurate)

### P1 - Large page files and style surface area
Files: `src/pages/store.tsx`, `src/pages/purchases.tsx`, `src/styles/global.css`
- Portal page is still large and combines data fetch + state + presentation.
- Global stylesheet is very large, which increases regression risk for unrelated UI work.

Impact:
- Slower iteration and higher chance of accidental UI breakage.

Recommended fix:
- Apply the same decomposition pattern from `store` to `purchases` (`PurchasesHeader`, `OrderList`, `ReceiptActions`, etc.).
- Move store-only selectors from `global.css` into `store.css` where possible.

### P1 - No hard a11y/perf gate yet
- You have real UI improvements, but there is no automated a11y/performance check wired into scripts.

Recommended fix:
- Add a lightweight CI check for Lighthouse and/or axe on key routes (`/`, `/store`, `/purchases`).

### P2 - Content/CTA completeness consistency
- Some sections in the site still hint at deeper artifacts (case-study depth, measurable metrics) that are uneven across pages.

Recommended fix:
- Standardize one project-case-study template and apply to top 3 projects first.

## Evidence from standards/docs used for this audit
- WAI-ARIA Tabs Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
- WCAG 2.1 - Focus Visible (2.4.7): https://www.w3.org/WAI/WCAG21/Understanding/focus-visible
- WCAG 2.1 - Contrast (1.4.3): https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
- Stripe Checkout fulfillment model (webhook as source of truth): https://docs.stripe.com/checkout/fulfillment

## Next quality sprint (recommended order)
1. Apply component extraction to `src/pages/purchases.tsx`.
2. Add one automated accessibility check route set (`/store`, `/purchases`).
3. Move store-specific styles out of `src/styles/global.css` into `src/styles/store.css`.
4. Add concrete metrics to top 3 case studies (load time, uptime, error budget, response p95).
