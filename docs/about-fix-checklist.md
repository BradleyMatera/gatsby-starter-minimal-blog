# About Page Fix Checklist

This checklist tracks the full `/about` layout remediation in order. Items are completed sequentially and verified as they land.

## Checklist

- [x] 0. CSS sanity pass
  - [x] Remove invalid selectors, stray commas, and orphaned declarations.
  - [x] Remove duplicated gap/padding lines that conflict.
  - [x] Remove obsolete `.timeline__*` rules not used on `/about`.
- [x] 1. Container width alignment
  - [x] Widen `/about` section containers to use available space.
  - [x] Keep readable line lengths for paragraphs (max ~75ch).
- [x] 2. Hero layout hierarchy
  - [x] Group badge line, H1, subhead/value line, and CTA together.
  - [x] Enforce a true two-column layout (text left, image right).
  - [x] Ensure clean stacking on mobile.
- [x] 3. Profile hero background
  - [x] `about-header-graphic.png` renders as decorative background only.
  - [x] No inline image element remains in the DOM.
- [x] 4. “What I build” grid
  - [x] Responsive grid with auto-fit/minmax.
  - [x] 3 columns on large screens, 2 on tablets, 1 on mobile.
  - [x] Overflow-safe card rules with `min-width: 0`.
- [x] 5. “How I work” layout
  - [x] Stable two-column grid that does not squeeze.
  - [x] Uses `.feature-card` / `.feature-list` scoped under `.how-i-work-grid`.
  - [x] Padding and list spacing keep text off edges.
- [x] 6. Timeline banner
  - [x] `career-timeline.png` appears as a cropped horizontal banner.
  - [x] Sits above Experience heading and never overlaps text.
  - [x] Decorative only (`alt=""`, `aria-hidden`).
- [x] 7. Experience cards
  - [x] Experience renders only once via `ExperienceTimeline`.
  - [x] Cards show title/meta/summary/bullets/skills/proof.
  - [x] Cards are wide and never collapse into one-word lines.
- [x] 8. Certifications
  - [x] Certification cards are consistent and overflow-safe.
  - [x] Credly/freeCodeCamp titles link; LinkedIn items plain text.
  - [x] Issued/expiry dates and credential IDs render when present.
- [x] 9. Spacing & polish
  - [x] Consistent section spacing and card padding.
  - [x] No overlap, no text bleeding, no awkward single-word wrapping.
