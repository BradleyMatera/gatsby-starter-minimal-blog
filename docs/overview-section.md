# Quick Overview / Where I’m Focused Right Now — Implementation & Code Walkthrough

This document explains the implementation of the interactive “Quick overview / Where I’m focused right now” section, including scroll-reveal, activation, pulse indicator, and code structure.

---

## 1. Component Structure

The section is rendered in `src/@lekoarts/gatsby-theme-minimal-blog/texts/hero.mdx` using the `StatusRow` React component for each row:

- **Rows:** Background, Technical Focus, Recent, Career Goal
- **Icons:** TinyMedalAccent, TinyGearAccent, TinyNodeAccent, TinyGoalAccent

Example usage in MDX:
```jsx
<StatusRow
  icon={<TinyMedalAccent />}
  label="Background:"
  text="Army veteran, real-world problem solver, handles pressure"
/>
```

## 2. StatusRow Component

Located at `src/components/ui/StatusRow.tsx`.

### Props
- `icon`: ReactNode (left-side accent icon)
- `label`: string (row label)
- `text`: string (row content)

### Scroll-Reveal & Activation
- Uses Intersection Observer to detect when the row enters the viewport.
- On activation: 
  - Icon lights up
  - Label color brightens
  - Text fades in and slides up

### Pulse Indicator
- A tiny dot next to the icon pulses when active or hovered.
- Uses a CSS keyframes animation for subtle effect.

### Hover/Focus
- Row responds with a soft box-shadow and background.
- Accessible via keyboard (tab/focus).

### Responsiveness
- Scroll-reveal works on mobile.
- Hover/tilt effects are desktop-only.

### Performance
- No external animation libraries.
- All effects use CSS transitions and keyframes.

## 3. Code Walkthrough

### hero.mdx
- Imports StatusRow and accent icons.
- Renders each row as a StatusRow inside a `<ul className="feature-list">`.

### StatusRow.tsx
- Handles scroll-reveal, activation, pulse, and interaction logic.
- Inline styles and keyframes for animation.

## 4. Design Decisions

- Matches site’s calm, reliable style.
- No new colors, layouts, or typography changes.
- Lightweight, first-party React and CSS only.

## 5. References

- [src/components/ui/StatusRow.tsx](../src/components/ui/StatusRow.tsx)
- [src/@lekoarts/gatsby-theme-minimal-blog/texts/hero.mdx](../src/@lekoarts/gatsby-theme-minimal-blog/texts/hero.mdx)

---

For further details, see the code comments in `StatusRow.tsx` and the usage in `hero.mdx`.
