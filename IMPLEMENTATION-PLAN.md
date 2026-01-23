# Implementation Plan: Graphics Consistency & Dark Mode Contrast Fix

## Overview
Fix two critical issues:
1. **Graphics feel random and inconsistent** - Create unified section header graphic and divider systems
2. **Dark mode has unreadable text** - Remove hardcoded white backgrounds, ensure theme-aware surfaces

---

## Part A: Graphics Consistency

### A1. Create Unified Section Header Graphic System

**Current Issues:**
- Multiple inconsistent width rules (95vw, 1020px, 960px)
- Inconsistent margins and spacing
- No clear relationship to section container alignment

**Solution:**
Create a single `.section-header-graphic` class that:
- Aligns to section container (max-width: 1100px, same as sections)
- Uses consistent responsive scaling (height: auto, no distortion)
- Follows spacing stack: divider (optional) → header graphic → eyebrow → title → lead

**CSS Changes:**
```css
/* Unified Section Header Graphic */
.section-header-graphic {
  display: block;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto clamp(1.5rem, 3vw, 2rem);
  height: auto;
  border-radius: 0;
}

/* Specific header graphics (quick-snapshot, featured-work, lets-collaborate) */
.section-header-graphic--quick,
.section-header-graphic--featured,
.section-header-graphic--collaborate {
  /* Inherits base, can add specific styling if needed */
}
```

**Component Updates:**
- Update `hero.mdx` to use `.section-header-graphic` instead of `.section-graphic--quick`, etc.
- Ensure graphics appear in correct order: divider → graphic → section content

---

### A2. Create Unified Section Divider System

**Current Issues:**
- Inconsistent widths (85vw, 960px)
- Inconsistent margins
- Used inconsistently across pages

**Solution:**
Create a single `.section-divider` class that:
- Uses container-width alignment (max-width: 1100px, matches sections)
- Fixed top/bottom margins (clamp(2.5rem, 5vw, 4rem))
- Only used between major sections, not inside dense content

**CSS Changes:**
```css
/* Unified Section Divider */
.section-divider {
  display: block;
  width: 100%;
  max-width: 1100px;
  margin: clamp(2.5rem, 5vw, 4rem) auto;
  height: auto;
  border-radius: 0;
}
```

**Component Updates:**
- Replace all `.section-graphic--divider` with `.section-divider`
- Ensure dividers only appear between major sections

---

### A3. Ensure Card/Grid Components Follow Design Doc

**Already Completed (from previous work):**
- ✅ AWS/B.S./Focus strip = `.stats-grid` (3-up band, stacks on mobile)
- ✅ 01/02/03 = `.feature-list` (3 feature-cards, stacks on mobile)
- ✅ Quick Snapshot = `.snapshot-grid` (2x2 feature-card grid, stacks on mobile)
- ✅ Current focus = `.grid-three` (3 feature-cards, stacks on mobile)
- ✅ Featured work = `.project-card` (follows doc hierarchy)
- ✅ Latest writing = `#latest-posts .blog-card` (follows doc hierarchy)

**Verification Needed:**
- Confirm all cards use theme-aware backgrounds (no hardcoded white)
- Ensure proper F-pattern hierarchy in all cards

---

## Part B: Dark Mode Contrast Fix

### B1. Audit and Remove Hardcoded White Backgrounds

**Found Issues:**
1. `.section-surface` - Line 779: `rgba(255, 255, 255, 0.95)` gradient
2. `.section-surface--snapshot`, etc. - Line 793: `rgba(255, 255, 255, 0.92)`
3. `.snapshot-grid .status-row` - Line 833: `rgba(255, 255, 255, 0.07)` border, `rgba(15, 23, 42, 0.06)` background

**Solution:**
Replace all hardcoded white/light backgrounds with theme-aware CSS variables:
- Use `var(--color-surface)` for card backgrounds
- Use `var(--color-surface-alt)` for alternate surfaces
- Use `var(--color-surface-muted)` for muted backgrounds
- Ensure all gradients are theme-aware

**CSS Changes:**
```css
/* Fix section-surface backgrounds */
.section-surface {
  background: var(--color-surface);
  /* Remove hardcoded white gradient */
}

.section-surface--alt {
  background: var(--color-surface-alt);
}

.section-surface--snapshot,
.section-surface--featured,
.section-surface--collaborate {
  background: var(--color-surface);
}

/* Fix snapshot-grid status-row */
.snapshot-grid .status-row {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  /* Remove hardcoded rgba values */
}
```

---

### B2. Define Theme-Aware Surface Tokens

**Current Tokens (already exist):**
- `--color-surface`: Light: #FFFFFF, Dark: #111827
- `--color-surface-alt`: Light: #F9FAFB, Dark: #0b1222
- `--color-surface-muted`: Light: #F3F4F6, Dark: #111827
- `--color-text`: Light: #000000, Dark: #e5e7eb
- `--color-text-subtle`: Light: #666666, Dark: #cbd5e1

**Enhancement Needed:**
- Ensure `--color-text-subtle` has sufficient contrast on all surfaces in dark mode
- Add explicit contrast validation rules

**CSS Changes:**
```css
/* Ensure text-subtle has proper contrast in dark mode */
:root[data-theme="dark"] {
  --color-text-subtle: #cbd5e1; /* Already good, but verify */
  /* Ensure this passes WCAG AA on dark surfaces */
}
```

---

### B3. Fix Text Color Inheritance

**Current Issues:**
- Some cards may inherit text color from global rules that ignore backgrounds
- Text-muted may not have sufficient contrast on light surfaces in dark mode

**Solution:**
- Ensure all cards/sections explicitly set text color from their surface
- Use `color: var(--color-text)` on all card bodies
- Use `color: var(--color-text-subtle)` only where contrast is verified

**CSS Changes:**
```css
/* Ensure all cards inherit proper text colors */
.feature-card,
.project-card,
.stat-card,
.snapshot-grid .status-row {
  color: var(--color-text);
}

.feature-card__body,
.project-card__description {
  color: var(--color-text);
}

/* Only use text-subtle where contrast is guaranteed */
.feature-card__meta,
.project-card__meta {
  color: var(--color-text-subtle);
}
```

---

### B4. Validate Contrast on Home Page Sections

**Sections to Validate:**
1. ✅ AWS/B.S./Focus strip (`.stats-grid .stat-card`)
2. ✅ 01/02/03 feature cards (`.feature-list .feature-card`)
3. ✅ Quick Snapshot cards (`.snapshot-grid .status-row`)
4. ✅ Current focus cards (`.grid-three .feature-card`)
5. ✅ Featured work project cards (`.project-card`, especially `.project-card__impact`)
6. ✅ Latest writing entries (`#latest-posts .blog-card`)
7. ✅ Footer quick stats (if applicable)

**Validation Rules:**
- Text on `--color-surface` must use `--color-text`
- Text on `--color-surface-alt` must use `--color-text`
- Text-muted must pass WCAG AA contrast (4.5:1 for normal text, 3:1 for large text)

---

### B5. Apply Site-Wide

**Pages to Update:**
- Home (primary focus)
- About
- Projects
- Roles
- Contributions
- Blog listing
- Blog posts

**Components to Update:**
- All `.section-surface` variants
- All card components (`.feature-card`, `.project-card`, `.blog-card`, `.stat-card`)
- All grid layouts
- Footer components

---

## Implementation Steps

### Step 1: Graphics System (Part A)
1. Create `.section-header-graphic` base class
2. Create `.section-divider` base class
3. Update `hero.mdx` to use new classes
4. Remove old inconsistent graphic classes
5. Test spacing and alignment

### Step 2: Dark Mode - Remove Hardcoded Backgrounds (Part B1)
1. Replace `.section-surface` white gradient with `var(--color-surface)`
2. Replace `.section-surface--*` white backgrounds with theme variables
3. Fix `.snapshot-grid .status-row` hardcoded colors
4. Test in both light and dark modes

### Step 3: Dark Mode - Text Color Inheritance (Part B3)
1. Add explicit `color: var(--color-text)` to all card components
2. Verify text-subtle contrast on all surfaces
3. Test all Home page sections

### Step 4: Site-Wide Application (Part B5)
1. Apply fixes to About page
2. Apply fixes to Projects page
3. Apply fixes to Roles page
4. Apply fixes to Contributions page
5. Apply fixes to Blog pages
6. Apply fixes to Footer

### Step 5: Validation
1. Test all breakpoints (1280, 768, 375)
2. Verify no horizontal scroll
3. Verify tap targets >= 44x44
4. Verify contrast in dark mode on all sections
5. Verify graphics never overlap text

---

## Acceptance Checklist

### Graphics Consistency
- [ ] Section header graphics use unified `.section-header-graphic` class
- [ ] Section dividers use unified `.section-divider` class
- [ ] All graphics align to container width (1100px max)
- [ ] Graphics never overlap text
- [ ] Graphics never stretch or distort
- [ ] Consistent spacing stack: divider → graphic → eyebrow → title → lead
- [ ] Graphics only used between major sections, not in dense content

### Dark Mode Contrast
- [ ] No hardcoded white backgrounds (`#fff`, `rgba(255,255,255,...)`)
- [ ] All cards use `var(--color-surface)` or theme-aware variables
- [ ] Text on all surfaces is readable (passes WCAG AA)
- [ ] Text-muted has sufficient contrast on all surfaces
- [ ] AWS/B.S./Focus strip readable in dark mode
- [ ] 01/02/03 feature cards readable in dark mode
- [ ] Quick Snapshot cards readable in dark mode
- [ ] Current focus cards readable in dark mode
- [ ] Featured work project cards readable in dark mode (especially Impact blocks)
- [ ] Latest writing entries readable in dark mode
- [ ] Footer stats readable in dark mode

### Responsive & Accessibility
- [ ] No horizontal scroll at 1280px, 768px, 375px
- [ ] Tap targets >= 44x44 for key CTAs
- [ ] All graphics responsive (height: auto, max-width constraints)
- [ ] Cards stack properly on mobile

### Design Doc Compliance
- [ ] Project cards follow hierarchy: Title → Stack → Meta → Impact → Description → CTA
- [ ] Blog cards follow hierarchy: Title → Meta → Excerpt → CTA
- [ ] Feature cards use consistent styling (padding, border, icon, title, body)
- [ ] F-pattern scanning optimized (keywords first, clear headings)

---

## Files to Modify

### CSS Files
- `src/styles/global.css` - Main stylesheet (graphics system, dark mode fixes)

### Component Files
- `src/@lekoarts/gatsby-theme-minimal-blog/texts/hero.mdx` - Home page (graphic class updates)
- `src/components/ui/Section.tsx` - Section component (if needed)
- `src/components/ui/ProjectCard.tsx` - Project card (text color inheritance)
- `src/components/ui/StatusRow.tsx` - Status row (if needed)

### Other Pages (for site-wide application)
- `content/pages/about/index.mdx`
- `content/pages/projects/index.mdx`
- `content/pages/roles/index.mdx`
- `content/pages/contributions/index.mdx`

---

## Estimated Time
- Part A (Graphics): 1-2 hours
- Part B (Dark Mode): 2-3 hours
- Testing & Validation: 1 hour
- **Total: 4-6 hours**
