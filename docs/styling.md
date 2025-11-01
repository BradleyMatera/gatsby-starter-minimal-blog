# Styling System

The visual appearance of the site is composed from three layers working together:

1. **Theme UI tokens and presets** – central design tokens consumed by shadowed theme components.
2. **Global CSS** – opinionated site-wide styles applied to the layout shell, navigation, cards, grids, etc.
3. **Tailwind-derived utilities** – limited utility classes compiled into `src/components/style.css` for legacy sections.

Understanding how they interact helps avoid conflicts when introducing new components or adjusting the design.

## Theme UI Overrides

File: `src/@lekoarts/gatsby-theme-minimal-blog/gatsby-plugin-theme-ui/index.ts`

- Extends `@theme-ui/preset-tailwind` with custom colors, typography, shadows, buttons, and card variants.
- Exposes tokens such as `colors.primary`, `background`, `surface`, and `modes.dark`.
- Defines variants (`links.primary`, `cards.raised`, etc.) that shadowed components reference via the `sx` prop.
- Controls default focus states (`focus` color), badge appearance, and base layout spacing.

To tweak these values, edit the relevant section and restart the dev server. Theme UI merges the tokens at runtime, so changes propagate through all components using `sx` styles.

### Adding New Variants

```ts
buttons: {
  cta: {
    backgroundColor: `accent`,
    color: `surface`,
    px: 4,
    py: 3,
    borderRadius: `pill`,
  },
},
```

Then reference it with `<Button variant="cta">` inside a Theme UI context.

## Global CSS

File: `src/styles/global.css`

- Loaded in both `gatsby-browser.js` and `gatsby-ssr.js`.
- Defines CSS variables for the light and dark palettes (`--color-page-bg`, `--color-text`, etc.).
- Styles the layout shell: `.layout-shell`, `.site-header`, `.primary-nav`, hero grids, cards, footer, filter pills, etc.
- Handles dark-mode overrides via `[data-theme="dark"]` selectors. Even though the color-mode toggle is disabled, the palette remains ready for future use.
- Includes responsive grid definitions (`.grid-two`, `.grid-three`, `.project-gallery`) and utility classes (`.section-shell`, `.surface-card`, `.feature-card__icon`).

When adding new structural elements, prefer reusing existing classes to stay consistent. If you must add new selectors, append them to this file so they apply globally.

### Custom Properties

Set new variables at the top of the file under `:root` or inside the dark-mode block so both palettes stay in sync:

```css
:root {
  --color-warning: #fbbf24;
}

[data-theme="dark"] {
  --color-warning: #f59e0b;
}
```

## Tailwind Utilities

File: `src/components/style.css` (imported by a handful of legacy components).

- Includes Tailwind directives (`@tailwind base; @tailwind components; @tailwind utilities;`).
- Tailwind is configured via `tailwind.config.js` and processed by PostCSS (`postcss.config.js` loads `@tailwindcss/postcss`).
- Provides additional classes (e.g., `.nav-link`, `.section-hero`) that complement the global CSS for specific sections.

Use these utilities sparingly: most new UI should lean on the global CSS or Theme UI tokens. If you add new Tailwind classes, ensure the content globs in `tailwind.config.js` include the files where those classes appear.

## Color Modes

- `gatsby-browser.js` sets `document.body.dataset.theme = 'light'` on client entry.
- `colormode-toggle.tsx` currently returns `null`, effectively disabling the toggle button.
- To re-enable dark mode, implement the toggle component to flip the `data-theme` attribute on `<body>` and store the preference (e.g., in `localStorage`).

## Working With New Components

1. **Prefer existing primitives**: Wrap content in `<Section>` and `<Card>` where possible.
2. **Need custom layout?** Add minimal markup and style it by extending `.section-shell` or `.surface-card`.
3. **Consistent typography**: Use the `.section-title`, `.section-lead`, and `.feature-card__title` classes to maintain typographic hierarchy.
4. **Animations**: The repo already includes a `ScrollReveal` hook that toggles `.active` when elements enter the viewport. Assign `.reveal` to any block you want to animate via CSS.

## Debugging Styling Issues

- Inspect the element in your browser to see which layer supplies the style. Theme UI-generated classes will appear as hashed class names; global CSS rules will reference the readable class names described above.
- If two layers conflict, the last loaded CSS wins. Since `global.css` is imported after Theme UI styles, it can override them.
- When in doubt, search for the class name in `src/styles/global.css`. If it is not present, check `src/components/style.css` or the Theme UI theme file.

Keep this document updated whenever you adjust the design system, add new utility classes, or change how dark mode is handled.
