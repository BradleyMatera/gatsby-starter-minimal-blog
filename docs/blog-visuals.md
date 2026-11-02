# Blog visuals

Every article has a unique cover and two visual guides placed at relevant points in its MDX body. Existing photographs and project screenshots remain in the articles.

## Files

- `static/images/blog/<article-slug>/cover.png`: full-resolution cover.
- `static/images/blog/<article-slug>/cover-720.webp`: smaller image for cards and mobile screens.
- `src/features/blog/article-visuals/<article-slug>.json`: descriptive cover alt text and article-specific figure content.
- `src/features/blog/article-covers.ts`: generated cover registry used by article headers, blog cards, and sharing metadata.
- `src/features/blog/components/ArticleVisual.tsx`: accessible, theme-aware diagram renderer.

For the asset directory and visual metadata filename, use the frontmatter slug, or the article's folder name when no slug is specified. Published URLs can differ: Gatsby derives missing slugs from the title. The registry generator uses Gatsby's own slug function to preserve those existing URLs.

## Adding or updating artwork

Create a distinct composition that illustrates the article's subject. Concept illustrations should be described as concepts; do not present generated scenes as documentary photographs, real application screenshots, or evidence of results. Keep essential details near the center so the artwork works in both cards and headers.

Save the PNG and smaller WebP, update the article's visual metadata, then regenerate the registry:

```bash
node scripts/generate-blog-covers.mjs
```

The generator reads actual image dimensions. It does not change publication dates or article text.

## In-article figures

Import `ArticleVisual` and the article's JSON file into its MDX, then place each figure next to the section it explains:

```jsx
import ArticleVisual from "../../../src/features/blog/components/ArticleVisual";
import articleVisuals from "../../../src/features/blog/article-visuals/example-article.json";

<ArticleVisual spec={articleVisuals.figures[0]} />
```

Supported layouts are `flow`, `comparison`, `layers`, `timeline`, `checklist`, and `bar-chart`. Each figure needs an ID, title, summary, labeled items with explanations, and a caption. Quantitative charts also need values, units, and a clearly identified source or illustrative context. Never fabricate measurements to fill a chart.

The figures render as readable HTML with decorative SVGs. Their text remains selectable, accessible to assistive technology, and responsive to the site's appearance settings. Existing horizontal rules receive the shared section-divider treatment.

## Verification

```bash
node --test tests/blog/visual-coverage.test.mjs
E2E_BASE_URL=http://localhost:9000 npx playwright test e2e/article-visuals.spec.ts
```

These checks cover unique image files, embedded figure coverage, sharing images, image loading, narrow-screen reflow, and contrast in light and dark modes. Rebuild the local preview before running the browser checks.
