# Content Authoring Guide

All site content is authored in MDX. You can interleave Markdown with React components for richer layouts.

## Pages vs. Posts

| Type | Location | URL | Notes |
| ---- | -------- | --- | ----- |
| Pages | `content/pages/<slug>/index.mdx` | `/slug/` | Used for About, Projects, Roles, Contributions, etc. |
| Case studies | `content/pages/projects/<slug>.mdx` | `/projects/<slug>/` | Deep dives linked from the project index (e.g., Car-Match, Interactive Pokédex). |
| Contact form | `content/pages/contact/index.mdx` | `/contact/` | Netlify-backed form + alternate contact methods. |
| Blog posts | `content/posts/<slug>/index.mdx` | `/blog/<slug>/` (generated) | Supports tags, excerpts, banners, and blog listing metadata. |

Each folder can include local assets (images, downloads). Reference them with relative paths inside the MDX file.

## Required Frontmatter

```mdx
---
title: "Readable Title"
slug: "/my-page"          # for pages only; posts derive slug from folder
date: "2025-03-24"        # for blog posts
tags:
  - TagName
banner: ./image.jpg       # optional, for social cards
description: "Short SEO summary"   # optional override
---
```

- **Pages**: `slug` should include leading and trailing slashes (e.g., `/projects`). It feeds the navigation config defined in `gatsby-config.ts`.
- **Posts**: The folder name becomes the slug unless overridden with `slug` frontmatter. Include ISO dates so GraphQL sorting works.
- **Tags**: Tag names are title-case strings; they appear in the blog filter chips and per-post metadata.
- **Description**: Write a concise 150–160 character summary. It becomes the meta description and powers the search and social preview text.

## Importing Components

Use relative imports to pull in shared components:

```mdx
import { Section, Card, ProjectCard, AnchorNav } from "../../../src/components/ui";
import Link from "../../../src/components/ui/Link";
```

- `Section`: Wraps content in the standard layout shell. Accepts `eyebrow`, `title`, `description`, `actions`, and `className`.
- `Card`: Card element with optional `variant="muted" | "outline"`.
- `ProjectCard`: Structured project summary (title, meta, summary, impact, tech stack, links).
- `AnchorNav`: In-page navigation for jump links; pass an array of `{ id, label }`.
- `Link`: Replacement for standard `<a>`. Use `href` for external URLs and `/slug` for internal routes; it automatically renders a `GatsbyLink` when the path begins with `/`.

### Example

```mdx
<Section eyebrow="Projects" title="Featured builds">
  <div className="grid-two project-gallery">
    <ProjectCard
      title="Car-Match"
      meta="Full stack web app"
      summary="Profiles, forums, messaging, events."
      stack={["React", "Node.js", "MongoDB"]}
      links={[
        { label: "Case study", href: "/projects/car-match/", variant: "primary" },
        { label: "GitHub", href: "https://github.com/BradleyMatera/car-match", external: true }
      ]}
    />
  </div>
</Section>
```

## Using Markdown

Standard Markdown syntax is supported for headings, lists, emphasis, code blocks, and images. Theme UI/Prism handles code highlighting automatically.

Headings (`##`, `###`) gain anchors in blog posts, feeding the table of contents on the right. Avoid skipping heading levels to keep the TOC readable.

## Blog Post Template & Scannability Checklist

- Start every new post from `docs/blog-post-template.mdx`. It already includes frontmatter placeholders, a TL;DR list, keyword-first headings, and a Key Takeaways section.
- **TL;DR block**: keep the opening bullets under ~12 words. Wrap them in `<div className="tldr-card">…</div>` (as shown in the template) so the accent background and spacing render consistently.
- **Keyword-first headings**: structure body sections as `## Problem — Keyword`, `## Solution — Tool`, then granular `### Step` headings. Put the primary search term at the beginning of each heading so it appears in the eye-tracking "F" stem and the generated table of contents.
- **Paragraphs vs. lists**: if the explanation exceeds four sentences or contains three or more commas, convert it into an ordered/ unordered list. Use numbered lists when order matters and bullets when it does not.
- **Code captions**: wrap important snippets in a `<figure>` with `<figcaption>` (see the template). Summarise what the reader should notice, e.g., "Listing 1 — Deploy build artifacts to Amazon S3 via the AWS CLI."
- **Key Takeaways**: close with a three-item bullet list of actionable lessons. Each bullet should pair an action with an outcome metric or link.
- **Blockquotes & citations**: use standard Markdown `>` syntax. The stylesheet adds an accent border, so keep quoted copy short (2–3 sentences) and add `— Name` or `<cite>` when attribution matters.

## Embedding HTML or JSX

Any valid JSX is allowed inside MDX:

```mdx
<details>
  <summary>Click to expand</summary>
  <ul className="feature-list">
    <li>Authenticated routes</li>
    <li>Matrix integration</li>
  </ul>
</details>
```

Use class names from `src/styles/global.css` (e.g., `feature-list`, `surface-card`) to pick up existing styling.

## Assets

- Place images or files alongside the MDX file (`content/posts/my-post/diagram.png`).
- Reference them with relative links: `![Alt text](./diagram.png)`.
- Gatsby automatically processes images referenced in Markdown/MDX frontmatter when using `banner`.

When adding new media, include meaningful `alt` text so screen readers and search engines understand the content.

## Forms

- The contact page form is parsed by Netlify. Include `form-name` and honeypot fields exactly as shown in `content/pages/contact/index.mdx`.  
- Update the `action` attribute if you create alternative success routes.  
- For quick links, supplement the form with a `mailto:` link so users can reach out directly.

## Navigation Updates

The top navigation is defined in `gatsby-config.ts` under the `@lekoarts/gatsby-theme-minimal-blog` plugin options. After adding a new page:

1. Create the MDX file with frontmatter.
2. Add `{ title: "Title", slug: "/slug" }` to the `navigation` array in `gatsby-config.ts`.
3. Restart the development server so Gatsby picks up the config change.

Role-specific dropdown links (`/roles/...`) are mapped in `src/@lekoarts/.../components/header.tsx`. Keep the list in sync when adding or removing role pages.

## Homepage Content

- The main hero is hard-coded in `src/components/home/HomeHero.tsx`.
- Additional sections render from `src/@lekoarts/gatsby-theme-minimal-blog/texts/hero.mdx` and `texts/bottom.mdx`. Update those files to change the homepage narrative without touching the component logic.

## Writing Workflow

1. Run `npm run develop`.
2. Edit MDX files; Gatsby hot-reloads the content instantly.
3. Check for GraphQL errors in the terminal—frontmatter mistakes will surface there.
4. Preview the built version with `npm run serve` before deploying major content changes.

Keep this guide updated as you add new components or change the authoring workflow. A consistent structure helps ensure the navigation, filters, and cards stay aligned across the site.
