# Portfolio Honesty Rewrite Plan

I need this to be executable, not just vibes. Every section below now includes:

- **Todo items** I can check off in my tracker.
- **AI prompt ideas** to keep the rewrite grounded.
- **Execution notes** so I remember exactly how to make the change.

I’ll update this file as tasks move from “Todo” → “Drafting” → “Done.”

---

## 1. Homepage Hero & Bio

- **Current text (summary of claims)**
  - “Full-stack developer experienced in building web applications with React… shipped multiple live sites.”
  - “Web Development student… proficient in HTML, CSS, and JavaScript.”
  - “Independent Developer — creating, showcasing, and educating through personal projects.”
- **Issues**
  - Overstates experience level and breadth; “shipped” implies production deployments.
  - “Proficient” suggests expert ability without acknowledging AI reliance.
  - “Educating through personal projects” isn’t backed by content.
- **Todos**
  - [x] Draft new hero headline + subtext describing myself as a systems-focused builder (Army medic → web dev) who learns by shipping projects.
  - [x] Add explicit sentence about AI pair-programming (tool names + why).
  - [x] Update “Independent Developer” blurb to “Documenting what I’m learning.”
  - [x] Remove “shipped multiple live sites” phrasing everywhere on the hero.
  - [x] Mention AWS internship + builder mindset only if it links to actual proof; otherwise keep it for About page.
- **AI prompt ideas**
  - “Rewrite this paragraph so it introduces me as a student web developer who practices with small demos and AI pairing: <paste current hero text>.”
  - “Suggest a short sentence that states I use ChatGPT/Copilot while keeping the tone humble.”
- **Execution notes**
  - Edit `src/components/home/HeroHeadline.tsx` (or MDX source) once copy is ready.
  - Keep CTA buttons but be ready to rename if they reference outdated claims.
  - Consider pulling in the “builder, not theorist” phrase from the provided paragraph, but ensure it stays grounded.

## 2. Mission Statement / Value Blurbs

- **Current text**
  - “Mission: To champion empathy in technology and create solutions that respect and prioritize the user experience.”
- **Issues**
  - Abstract, no examples. Sounds like fluff relative to actual body of work.
- **Todos**
  - [x] Replace mission paragraph with concrete learning goals (accessibility checks, empathy exercises).
  - [x] Add link or reference to a project where I applied those checks.
  - [x] Remove any leftover buzzwords in sections that reuse this mission snippet.
- **AI prompt ideas**
  - “Turn this mission statement into a realistic learning goal for a student practicing accessibility: <paste mission>.”
  - “Give me a one-sentence example that cites a real accessibility practice (alt text, Lighthouse).”
- **Execution notes**
  - Mission text lives in the MDX homepage + maybe About page. Search for “Mission” and replace both spots.

## 3. Skills & Tooling Section

- **Current text**
  - Long list covering React, Next.js, Gatsby, Angular, Vue, TypeScript, FastAPI, Django, AWS suite, Docker, Agile/MVC/OOP, etc.
  - Claims proficiency across the board.
- **Issues**
  - Inflated breadth; many items are tutorials/dabbling only.
  - No disclosure of AI-assisted workflows.
  - Methodologies studied academically, not practiced on teams.
- **Todos**
  - [x] Audit current skill list and move each item into one of three buckets (Comfortable, Learning, Exploring).
  - [x] For “Comfortable” items, link to a proof (project, repo, blog).
  - [x] Write a short disclosure sentence about AI pair-programming.
  - [x] Remove/relocate methodologies not backed by actual practice.
- **AI prompt ideas**
  - “Given this skill list, categorize each item as ‘comfortable today,’ ‘learning,’ or ‘exploring’: <paste list>.”
  - “Draft a disclosure sentence about using AI tools while learning front-end dev.”
- **Execution notes**
  - Skills appear on About page + maybe Resume. Update both places.

## 4. Projects / Case Studies

- **Current text**
  - Describes demos as “production-ready” or “shipped” without clarifying audience.
  - Omits that they’re personal/student projects often scaffolded by tutorials/AI.
- **Issues**
  - Could mislead readers into assuming professional deployments.
  - Lacks transparency about assistance and scope.
- **Todos**
  - [x] For each featured project, add a “Context” line describing scope (personal demo, class project).
  - [x] Update “Impact” bullets so they describe learning outcomes or usage truthfully.
  - [x] Add a “How I built it” note listing tools + AI assistance.
  - [x] Search for words like “production-ready,” “shipped,” “enterprise” and replace/remove.
- **AI prompt ideas**
  - “Rewrite this project description to emphasize that it’s a personal learning demo and mention AI assistance: <paste project text>.”
  - “Suggest honest ‘Impact’ statements for a student-built React demo used for practice.”
- **Execution notes**
  - Projects live in `content/pages/projects/*.mdx`. Update each MDX file directly.

## 5. About Page / Experience Section

- **Current text**
  - Implies professional-level autonomy.
  - Lacks mention of AI dependency and limited CS foundations.
- **Issues**
  - Recruiters may expect experience you can’t deliver yet.
  - Doesn’t communicate learning style honestly.
- **Todos**
  - [x] Rewrite the opening paragraph to mention Army medic background → builder mindset; include graduation (B.S. Web Dev, Oct 2025) and mission statement aligned with reality.
  - [x] Add a sentence about learning style (AI pairing, tutorial-driven).
  - [x] Check for phrases implying pro client work and replace with accurate descriptions.
  - [x] Explicitly mention current limits (e.g., still learning algorithms/data structures, focus on product/UI over low-level systems).
  - [x] Reference AWS internship experience accurately: lab automation, monitoring dashboards, support workflows (no exaggeration).
- **AI prompt ideas**
  - “Rewrite this About paragraph for a student currently learning front-end dev with AI assistance: <paste paragraph>.”
- **Execution notes**
  - Edit `content/pages/about/index.mdx`.

## 6. Transparency Additions

- **New elements to add site-wide**
  - “What’s true right now” block with timestamped summary of skills and support systems.
  - Short “How I build” page/section explaining AI pairing, tutorials, and independent practice.
  - Optional mini-changelog noting when claims were last reviewed.
- **Todos**
  - [x] Create a small “How I build” section (maybe in About) mentioning AI, tutorials, human mentors.
  - [ ] Add a “Last updated” or “What’s true right now” block with the current month/year. Set reminder to review quarterly.
  - [ ] Consider adding a changelog entry in docs noting this honesty pass.
  - [x] Include a “What I’m not great at yet” list (algorithms, low-level systems, whiteboard puzzles) so expectations are set.
  - [x] Spell out that blog posts may start as AI drafts that I edit, and add per-post disclosure if applicable.
- **AI prompt ideas**
  - “Draft a short ‘How I build’ blurb for a student who uses AI tools and tutorials.”
- **Execution notes**
  - Could be an MDX component reused site-wide. For now, hand-write in About page or footer.

## 7. Review Process

- After drafting new copy, run through this checklist:
  1. Does every claim tie to an example or documented experience?  
  2. Are skill labels matched to actual proficiency?
  3. Are AI/tooling dependencies acknowledged somewhere visible?
  4. Would a recruiter feel misled after interviewing you about any statement? If yes, revise again.
  5. Update `honesty.md` to reflect completed changes.

---

### Personal Reminder

- Default to truth even if it feels underwhelming; recruiters prefer clarity over hype.
- Keep a running log of AI prompts/responses in case I need to show how I collaborated with tools during the rewrite.

---

## File-by-File Editing Map

The tasks above describe *what* to change. This section maps *where* those updates live so I don’t miss anything. Every file with audience-facing text is listed below with its edit instructions.

| Path / Pattern | Notes & Required Edits |
| --- | --- |
| `README.md` | Update overview, highlights, and “Noteworthy/Unusual Aspects” to match the honest claims (student focus, AI pairing). Remove any inflated skill blurbs. |
| `docs/architecture.md` | Verify language describing “team” or “enterprise” usage; rephrase to “personal portfolio” context. |
| `docs/development.md` | Make sure prerequisite and tooling sections mention current workflow (AI pairing optional). |
| `docs/content-authoring.md` | Add guidance about writing honestly + disclosing AI usage in posts. |
| `docs/styling.md`, `docs/overview-section.md`, `docs/site-review.md`, `docs/redesign-concept.md`, `docs/audit-inventory.md`, `docs/blog-post-template.mdx`, `docs/*.md` | Scan each for overstated claims (e.g., “production-ready,” “enterprise”) and align language with the new tone. If a doc references future work (“add JSON-LD”), ensure it still applies after edits. |
| `content/pages/about/index.mdx` | Implement the About page tasks (graduated status, learning style, AI disclosure). |
| `content/pages/projects/index.mdx` + `content/pages/projects/*.mdx` (car-match, interactive-pokedex, ciris-ai, etc.) | For each project, add context, accurate impact statements, and “How I built it” notes. Remove hype terms. |
| `content/pages/contact/index.mdx` & `contact/success.mdx` | Ensure contact copy matches the honest tone (no overpromising availability). |
| `content/pages/roles/*.mdx` | Adjust role descriptions to clarify that these are aspirational landing pages; add notes about the level of experience per role. |
| `content/pages/contributions/*.mdx` + `open-source-contributions/index.mdx` | Verify contribution descriptions specify “student contributor” scope and cite merged PRs accurately. |
| `content/pages/*.mdx` (about, contact, contributions, projects, roles, etc.) | For any other page-level MDX, run the checklist: context, AI disclosure, no inflated claims. |
| `content/posts/**/*.mdx` (all blog posts) | Add a short disclaimer at the top or bottom about using AI helpers if applicable. Confirm each post’s intro accurately states the scope (personal experiment vs. professional case study). |
| `content/postexamples/**` | If any sample text contains hype language, either annotate that it’s placeholder copy or align it with the new voice. |
| `src/components/home/HeroHeadline.tsx`, `HeroActions.tsx`, `StatsGrid.tsx`, `FeatureCardList.tsx` | Update hero copy to match Section 1 tasks, ensuring stats/labels aren’t overstated. |
| `src/@lekoarts/gatsby-theme-minimal-blog/texts/hero.mdx` & `texts/bottom.mdx` | Rewrite mission blurbs, quick overview lines, and any CTA text per Sections 1–2. |
| `src/@lekoarts/gatsby-theme-minimal-blog/components/**/*` (navigation, footer, blog, etc.) | Check navigation labels, footer summaries, and “Quick stats” in `footer.tsx` so they reflect real data. |
| `src/components/ui/*` | Audit components with baked-in copy (e.g., `StatusRow.tsx`) to ensure they reference truthful statements. |
| `projecthub-proxy/server.js` & other non-content files | Mostly code, but confirm inline comments (if any) don’t oversell features. |
| `honesty.md` | After each major section is updated, log what changed so the audit stays current. |

**Process:**  
1. Work through the table row by row (or directory by directory).  
2. For globbed entries (`content/posts/**`), use a quick search (`rg "production-ready"` etc.) to catch repeated phrases.  
3. Track progress in this plan by checking off the relevant todos above and adding notes next to each table row (e.g., “✅ Updated 2025-03-10”).  
4. Once everything is in sync, rerun the Review Process checklist and note the completion date at the bottom of `honesty.md`.

---

## Project-Specific Rewrite Checklist

Every project card (and its detailed MDX, if any) must be rewritten with truthful scope, feature lists, AI disclosure, and deployment status. Use this checklist:

- **Car-Match** (`content/pages/projects/index.mdx`, `content/pages/projects/car-match.mdx`)  
  - [x] List real features only (forms, basic posts, etc.); remove references to production chat/JWT/Docker if not built.  
  - [x] Label as “personal prototype / learning project.”  
  - [x] Describe AI/tool/tutorial support.  
  - [x] Note deployment status (GitHub repo only vs. hosted demo).

- **Interactive Pokédex** (`.../projects/interactive-pokedex.mdx`)  
  - [x] Confirm features (search, filters) and drop “offline resilience” unless implemented.  
  - [x] Mention accessibility testing only if run; otherwise describe intent.  
  - [x] Disclose AI assistance.

- **CIRIS AI Contributions** (`.../projects/ciris-ai.mdx`)  
  - [x] Reference actual merged PRs/issues or mark as exploratory.  
  - [x] Replace “enterprise backend” wording with “volunteer/student contributor.”  
  - [x] Describe what you really did (docs, small fixes, testing).  
  - [x] Include AI usage if applicable.

- **Animal Sounds Soundboard** (card only)  
  - [x] Ensure keyboard/focus support exists or adjust claims.  
  - [x] Mention it’s a quick front-end experiment.  
  - [x] Add AI disclosure.

- **Professional Portfolio Website**  
  - [x] Align claims with current code (semantic layout, skip links).  
  - [x] Remove unverified benefits (“hiring partners review faster”).  
  - [x] Note it’s a personal template hosted at `bradleymatera.github.io/Professional-Portfolio-Website/` that links into this Gatsby/Netlify site (`https://bradleysgatsbyblog.netlify.app`) so readers know which site is the living portfolio.

- **CodePen Projects**  
  - [x] Describe what the collection actually includes.  
  - [x] Remove talk/workshop references unless they happened.  
  - [x] Add a sentence about why the pens exist (practice, experiments).

- **Convo-Ai**  
  - [x] Verify FastAPI/Ollama integration; otherwise state current prototype state.  
  - [x] Be clear it’s a local demo.  
  - [x] Mention AI support and remaining TODOs.

- **ProjectHub**  
  - [x] Align description with current Express proxy + front-end.  
  - [x] Remove backlog promises unless tracked.  
  - [x] State it’s experimental and document AI-generated pieces.

- **ShellCompany**  
  - [x] Confirm repo contents (mock dashboard).  
  - [x] Reword to “prototype/draft learning project.”  
  - [x] Note AI scaffolding.

- **Docker Multilang Project**  
  - [x] Make clear it’s an onboarding exercise, not adopted by teams.  
  - [x] Mention limitations (single developer tested).  
  - [x] Add AI usage note if scripts were generated.

- **CheeseMath Jest Tests**  
  - [x] Verify tests run; if not, mark as “practice repo.”  
  - [x] Remove onboarding claims.  
  - [x] Cite AI/codegen support if used.

- **OBJ Parser**  
  - [x] Confirm performance claims; tone down if unverified.  
  - [x] State learning goals (Zig practice).  
  - [x] Mention AI-assisted code or tutorials.

- **Triangle Shader Lab**  
  - [x] Label as “hello triangle walkthrough” (learning tool).  
  - [x] Remove claims about helping others unless evidenced.  
  - [x] Add AI/doc references.

- **Secrets Management Tutorial** (wherever referenced)  
  - [x] Clearly state it’s AI-generated draft content reviewed for learning.  
  - [x] Mention its current status (draft vs. published).

## 5. Narrative facts to keep consistent

Fold the latest background copy (builder mindset, Army medic history, AWS internship) into the About page, hero, and any spot that mentions my trajectory.

- **Non-negotiable facts**  
  - Bradley Matera is a web developer who treats software like a builder (hands-on, not theoretical).  
  - Served as a U.S. Army combat medic with the 82nd Airborne Division; calm under pressure carries into debugging.  
  - Graduated with a B.S. in Web Development from Full Sail University in **October 2025** (already happened).  
  - Coursework emphasized shipping projects, CI/CD practice, React UIs, AWS deployments.  
  - Completed an AWS internship focused on monitoring dashboards + automated support workflows.  
  - Currently comfortable with JS/React stack + DevOps tooling, but still relies on AI to scaffold code and fill gaps.  
  - Key projects to spotlight: Car-Match, Triangle Shader Lab, Secrets Management Tutorial, Pokédex, Animal Soundboard, Professional Portfolio template.  
  - Blog is part of learning—many drafts start in AI, then I edit; call that out explicitly.  
  - Certifications: AWS Solutions Architect Associate + AI Practitioner.  
  - Keeps exploring FastAPI and applied web dev vs algorithms/low-level work.

- **AI prompt ideas**  
  - “Turn this paragraph into a single honest sentence for the About page: <paste excerpt>.”  
  - “Summarize the AWS internship in one sentence that highlights dashboards + automation without overhyping.”

- **Execution notes**  
  - Cross-check every mention of graduation date, certifications, or site URLs.  
  - When referencing “portfolio,” clarify whether it’s the Netlify site or the GitHub Pages template demo.

Only check off each project after updating both the listing card and its detailed MDX page.

---

## Blog Post Rewrite Checklist

Every MDX file under `content/posts/**` needs the same honesty pass: contextual intro, AI disclosure (if used), accurate scope (student project / personal essay), and removal of inflated stats. Use the checklist below and mark each entry once rewritten:

- [x] `content/posts/JWT's/index.mdx`
- [x] `content/posts/amazon-internship-troubleshooting/index.mdx`
- [x] `content/posts/balancing-school-work-projects/index.mdx`
- [x] `content/posts/certifications-continuous-learning/index.mdx`
- [x] `content/posts/cloud-ready-web-experiences/index.mdx`
- [x] `content/posts/containerization-orchestration/index.mdx`
- [x] `content/posts/docker-multilang-proj/index.mdx`
- [x] `content/posts/exploring-zig-efficient-parsing/index.mdx`
- [x] `content/posts/from-medic-to-engineer/index.mdx`
- [x] `content/posts/full-sail-university/index.mdx`
- [x] `content/posts/github-actions-aws/index.mdx`
- [x] `content/posts/how-i-learn-by-doing/index.mdx`
- [x] `content/posts/interactive-portfolios/index.mdx`
- [x] `content/posts/job-hunting/index.mdx`
- [x] `content/posts/native-react/index.mdx`
- [x] `content/posts/obj-parser/index.mdx`
- [x] `content/posts/pokedex/index.mdx`
- [x] `content/posts/portfolio-case-studies/index.mdx`
- [x] `content/posts/recent-projects-and-lessons/index.mdx`
- [x] `content/posts/secure-authentication-cognito-react/index.mdx`
- [x] `content/posts/technical-stack/index.mdx`
- [x] `content/posts/testing-matters/index.mdx`
- [x] `content/posts/webgpu-getting-started/index.mdx`

For each post, ensure:

1. The opening paragraph states the real context (personal project, internship reflection, etc.).  
2. AI involvement is disclosed (e.g., “Draft began with ChatGPT; edited for accuracy on 2025‑03‑01”).  
3. Claims are grounded (no imaginary metrics).  
4. Any “case study” framing makes clear it’s a student/learning case study, not paid client work.  
5. Cross-links point to current repos/demos (or note when code is private/unavailable).  
6. If the post references roles (frontend, full-stack, etc.), it reminds readers I haven’t been paid as a web dev yet and am documenting learning.

- **AI prompt ideas**  
  - “Rewrite this TL;DR so it sounds like a student reflection with clear context + AI disclosure: <paste TL;DR>.”  
  - “Give me a short ‘Reality snapshot’ blockquote for this article: topic = <topic>, current status = <status>.”  
- **Execution notes**  
  - Add a shared “Reality snapshot” block near the top (`> **Context:** …`).  
  - Use consistent wording for AI disclosure (e.g., “Draft scaffolded with ChatGPT, edited on YYYY-MM-DD”).  
  - Mark each checkbox above once both the MDX content **and** `honestplan.md` are updated.

---

## Alignment Checklist vs. `honesty.md`

To ensure every critique in `honesty.md` is addressed, confirm each box below before calling the rewrite done:

- [x] **Full-stack/experience claim** — Hero/About copy now states “early-career web dev” rather than “experienced full-stack” and clarifies demos vs. production.
- [x] **“Proficient in HTML/CSS/JS” nuance** — Skills section clarifies level (comfortable vs. expert) and mentions reliance on AI/tutorials.
- [x] **“Independent Developer educating”** — Copy now says “documenting my learning” (no claim of teaching others).
- [x] **Mission fluff** — Mission statement replaced with concrete examples (accessibility checks, empathy exercises).
- [x] **Inflated skill list** — Skills reorganized into tiers with links to proof, unnecessary buzzwords removed.
- [x] **“Currently learning everything” padding** — Learning list trimmed to realistic focus areas.
- [x] **Weakness omission** — New “What I’m practicing next / not great at yet” section mentions algorithms, low-level systems, reliance on guidance.
- [x] **AI dependency disclosure** — “How I build” section + multiple page references explain AI pair-programming habit.
- [x] **Project descriptions** — Each project now includes context (“personal prototype”), honest impact, and notes on tools/AI assistance.
- [x] **Key projects fact-check** — Car-Match, Triangle Shader Lab, Secrets Tutorial, Pokédex, Animal Soundboard descriptions match reality (no imaginary features).
- [x] **Portfolio hosting clarity** — Copy explains the difference between the GitHub Pages demo template and the live Gatsby/Netlify site wherever both are mentioned.
- [x] **Open-source contribution accuracy** — CIRIS section updated with factual contribution scope or removed if unverifiable.
- [x] **AWS internship framing** — Described as a learning/shadowing experience; no implication of solo support ownership.
- [x] **Education timeline consistency** — Graduation date matches everywhere (Oct 2025) and outdated “2026” text removed.
- [x] **Tone authenticity** — rewritten copy drops corporate buzzword tone in favor of direct language that matches personal style.
- [ ] **Public profiles alignment** — GitHub README / LinkedIn summary mirror the honest claims (dates, roles, skill tiers, disclaimers).
- [x] **Blog/content authenticity** — Posts mention when they were learning exercises and note AI assistance when relevant.
- [x] **Blog checklist complete** — Every entry listed in the Blog Post Rewrite Checklist above has been updated and annotated.
- [x] **Final pass logged** — `honesty.md` updated with completion date + summary of changes.

---

Following this plan will keep the portfolio aligned with your current stage while still communicating ambition and growth. Update sections in the order above for maximum impact. When the edits are live, revisit quarterly to keep claims accurate.
- **Roles landing page** (`content/pages/roles/index.mdx`)  
  - [x] Replace marketing bullets with context: “These are aspirational focus areas describing how I’d like to contribute; I haven’t been paid in these roles yet.”  
  - [x] Add a note explaining all role pages are student/learning case studies.

- **Per role page** (`content/pages/roles/*.mdx`) — Cloud, DevOps, Backend, Full-Stack, AI/Automation  
  - [x] Each page should open with “This is an aspirational case study describing how I practice this type of work today.”  
  - [x] Rework bullet lists so they reference actual projects/demos already on the site (link to those case studies).  
  - [x] Remove claims of production ownership or client deliverables; note AI usage where relevant.  
  - [x] Ensure each page reiterates “I have not been paid for this role yet; these are practice reps.”

- **Contributions page** (`content/pages/contributions/index.mdx`)  
  - [x] Rewrite TL;DR to reflect actual scope (docs updates, small volunteer work, study groups) rather than “production-grade features.”  
  - [x] For CIRIS cards, align copy with the CIRIS case study (volunteer contributor, small fixes, docs) and link to specific PRs.  
  - [x] For community/mentorship items, describe concrete actions taken (student club meetings, game jam participation) rather than generic metrics.  
  - [x] Add AI/tutor disclosures if any contributions were derived from generated code or templates.  
  - [x] Clarify that these are unpaid/volunteer roles.
- **Open-source contributions page** (`content/pages/open-source-contributions/index.mdx`)  
  - [x] Replace “production-ready feature” language with honest scope (docs edits, exploratory forks).  
  - [x] Specify which repos actually merged PRs vs. where I’m still drafting.  
  - [x] Link directly to the GitHub evidence (PRs/issues).  
  - [x] Make the “In progress” section sound like goals, not guaranteed launches, and disclose AI help.
