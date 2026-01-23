# Acceptance Checklist: Graphics & Dark Mode Fix

## Quick Validation Checklist

### Graphics Consistency ✅
- [ ] **Section Header Graphics**: All use `.section-header-graphic` class, align to 1100px container
- [ ] **Section Dividers**: All use `.section-divider` class, consistent spacing
- [ ] **Spacing Stack**: divider → graphic → eyebrow → title → lead (correct order)
- [ ] **No Overlap**: Graphics never overlap text, never stretch/distort
- [ ] **Usage**: Graphics only between major sections, not in dense content

### Dark Mode Contrast ✅
- [ ] **No White Backgrounds**: No hardcoded `#fff` or `rgba(255,255,255,...)` in CSS
- [ ] **Theme-Aware Surfaces**: All cards use `var(--color-surface)` or theme variables
- [ ] **Text Readability**: All text readable in dark mode (WCAG AA contrast)
- [ ] **Home Sections**: All sections readable in dark mode:
  - [ ] AWS/B.S./Focus strip (`.stats-grid`)
  - [ ] 01/02/03 feature cards (`.feature-list`)
  - [ ] Quick Snapshot cards (`.snapshot-grid`)
  - [ ] Current focus cards (`.grid-three`)
  - [ ] Featured work project cards (`.project-card`, especially `.project-card__impact`)
  - [ ] Latest writing entries (`#latest-posts`)
  - [ ] Footer stats (if applicable)

### Responsive & Accessibility ✅
- [ ] **No Horizontal Scroll**: Test at 1280px, 768px, 375px
- [ ] **Tap Targets**: All key CTAs >= 44x44px
- [ ] **Graphics Responsive**: Height auto, max-width constraints work
- [ ] **Cards Stack**: All grids collapse to 1 column on mobile

### Design Doc Compliance ✅
- [ ] **Project Cards**: Title → Stack → Meta → Impact → Description → CTA
- [ ] **Blog Cards**: Title → Meta → Excerpt → CTA
- [ ] **Feature Cards**: Consistent styling (padding, border, icon, title, body)
- [ ] **F-Pattern**: Keywords first, clear headings, scannable structure

---

## Testing Steps

1. **Visual Test (Light Mode)**
   - [ ] Open Home page
   - [ ] Verify graphics align consistently
   - [ ] Verify spacing stack is correct
   - [ ] Verify all cards have proper styling

2. **Visual Test (Dark Mode)**
   - [ ] Toggle to dark mode
   - [ ] Verify no white backgrounds visible
   - [ ] Verify all text is readable
   - [ ] Check each section individually:
     - [ ] Stats grid
     - [ ] Feature cards (01/02/03)
     - [ ] Snapshot grid
     - [ ] Current focus cards
     - [ ] Project cards (especially Impact blocks)
     - [ ] Latest writing
     - [ ] Footer

3. **Responsive Test**
   - [ ] Test at 1280px width (desktop)
   - [ ] Test at 768px width (tablet)
   - [ ] Test at 375px width (mobile)
   - [ ] Verify no horizontal scroll
   - [ ] Verify cards stack properly
   - [ ] Verify graphics scale correctly

4. **Accessibility Test**
   - [ ] Check tap targets (use browser DevTools)
   - [ ] Verify contrast ratios (use browser DevTools or online tool)
   - [ ] Test keyboard navigation
   - [ ] Verify focus states visible

5. **Cross-Page Test**
   - [ ] Test Home page
   - [ ] Test About page
   - [ ] Test Projects page
   - [ ] Test Roles page
   - [ ] Test Contributions page
   - [ ] Test Blog listing
   - [ ] Test Blog post pages

---

## Critical Issues to Fix

If any of these are still present, the fix is incomplete:

- ❌ **Hardcoded white backgrounds** in CSS (search for `#fff`, `rgba(255,255,255`)
- ❌ **Light gray text on white** in dark mode
- ❌ **Graphics overlapping text**
- ❌ **Graphics stretching/distorting**
- ❌ **Inconsistent graphic widths/margins**
- ❌ **Horizontal scroll** at any breakpoint
- ❌ **Tap targets < 44x44px**

---

## Success Criteria

✅ **Graphics feel intentional**: Unified system, consistent spacing, proper alignment
✅ **Dark mode readable**: No white backgrounds, all text has proper contrast
✅ **Responsive**: Works at all breakpoints, no horizontal scroll
✅ **Accessible**: Proper tap targets, keyboard navigation, focus states
✅ **Design doc compliant**: Follows hierarchy, F-pattern optimized
