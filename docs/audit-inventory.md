# Site Audit & Content Inventory

## Overview
This audit is based on the current file structure in the working directory. The site uses Gatsby with a minimal-blog theme, MDX for content, and custom components. Key directories include `content/` for pages/posts/projects, `src/` for components and pages, and `static/` for assets. The structure supports blogging and static pages, but lacks advanced filtering/search out-of-the-box.

### File Structure Summary
- **Configuration**: gatsby-config.ts, package.json, tailwind.config.js (core setup with plugins like gatsby-plugin-mdx, theme-ui).
- **Content**: MDX files in `content/pages/` (static pages like about, projects), `content/posts/` (blog posts), `content/projects/` (specific projects).
- **Components**: Custom in `src/components/` (e.g., HeroLayout, ProjectCard), themed in `src/@lekoarts/gatsby-theme-minimal-blog/`.
- **Pages**: Minimal, with 404.tsx and likely generated from MDX.
- **Static Assets**: Icons, images in `static/`.
- **Docs**: Existing docs like architecture.md, which we can expand.

No major issues noted; the site is clean but text-heavy, aligning with the redesign goals.

## Content Inventory & Grouping
Categorized existing MDX content into themes based on file names, paths, and inferred topics. Gaps: Limited visuals/diagrams; some posts could be grouped into series (e.g., AWS-related). Total: ~20 posts, 4 projects, several static pages.

### Theme: Cloud & DevOps (Focus: Infrastructure, CI/CD, Containerization)
- content/posts/amazon-internship-troubleshooting/index.mdx
- content/posts/certifications-continuous-learning/index.mdx (includes AWS certs)
- content/posts/cloud-ready-web-experiences/index.mdx
- content/posts/containerization-orchestration/index.mdx
- content/posts/docker-multilang-proj/index.mdx
- content/posts/github-actions-aws/index.mdx
- content/posts/secure-authentication-cognito-react/index.mdx
- content/pages/roles/cloud-engineer.mdx
- content/pages/roles/devops-engineer.mdx

### Theme: Front-End & Full-Stack (Focus: Web Apps, React, UI/UX)
- content/posts/interactive-portfolios/index.mdx
- content/posts/native-react/index.mdx
- content/posts/pokedex/index.mdx
- content/posts/portfolio-case-studies/index.mdx
- content/posts/testing-matters/index.mdx
- content/projects/car-match.mdx
- content/projects/interactive-pokedex.mdx
- content/pages/roles/full-stack-engineer.mdx
- content/pages/roles/backend-engineer.mdx

### Theme: Low-Level Experiments (Focus: Parsing, Graphics, Languages like Zig/WebGPU)
- content/posts/exploring-zig-efficient-parsing/index.mdx
- content/posts/obj-parser/index.mdx
- content/posts/webgpu-getting-started/index.mdx
- content/posts/WebGPU-Shapes-Renderer/index.mdx

### Theme: AI & Automation (Focus: AI Tools, Automation)
- content/projects/ciris-ai.mdx
- content/pages/roles/ai-automation-engineer.mdx

### General/Non-Themed (About, Journey, Misc)
- content/pages/about/index.mdx
- content/pages/contact/index.mdx
- content/pages/contributions/index.mdx
- content/pages/projects/index.mdx
- content/pages/roles/index.mdx
- content/posts/balancing-school-work-projects/index.mdx
- content/posts/from-medic-to-engineer/index.mdx
- content/posts/full-sail-university/index.mdx
- content/posts/how-i-learn-by-doing/index.mdx
- content/posts/job-hunting/index.mdx
- content/posts/JWT's/index.mdx
- content/posts/recent-projects-and-lessons/index.mdx
- content/posts/technical-stack/index.mdx
- Post examples in content/postexamples/ (for reference, not live content)

## Recommendations from Audit
- Add frontmatter to MDX for themes/tags to enable filtering.
- Gaps: More diagrams in low-level posts; metrics/stats in projects.
- Opportunities: Group AWS posts into a "Cloud Journey" series.
- Next: Use this inventory to guide metadata updates in later steps.
