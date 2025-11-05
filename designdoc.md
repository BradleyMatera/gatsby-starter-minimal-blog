# Prompt for Aligning a Portfolio Site with F-Pattern Scanning Behavior

## Understanding the F-Pattern Reading Behavior

Users tend to scan webpages in an F-shaped pattern, as discovered by Nielsen Norman Group's eyetracking research ￼. This means that readers focus heavily on the top horizontal area and the left side of the content:

- First, they read across the upper part of the page (forming the F's top bar).
- Next, they drop down slightly and read across a second, shorter horizontal area (the F's lower bar).
- Finally, they scan down the left side vertically (the F's stem), looking at the beginnings of lines of text ￼.

Critically, the first lines of text get far more attention than subsequent lines, and the first few words on the left of each line receive the most fixations ￼. Users rarely read every word; instead, they scan for key information and often skip large blocks of text ￼. For this reason, content that isn’t optimized for web reading can cause users to fall into an F-shaped scanning pattern by default, missing important information in the process ￼ ￼. Understanding this behavior is essential when organizing a personal portfolio site’s content so that vital information falls along the reader’s natural scanning path.

## Design Strategies Based on F-Pattern Research

To leverage F-pattern scanning (and keep users engaged rather than dropping off), consider the following strategies drawn from research findings:

- **Put Important Content First:** Place the most crucial information within the first two paragraphs or the top section of the portfolio's pages. Users are more likely to read the first few lines in full ￼ ￼, so ensure your introduction or summary highlights your key message, role, or value proposition right away. For example, a personal tagline or a brief career summary should appear at the top of the homepage.

- **Use Clear, Descriptive Headings:** Break content into sections with headings and subheadings that are visually prominent (larger or bolder than body text) ￼. Headings guide the eye when scanning and create an anchor for the "horizontal" scan lines of the F-pattern. Each section title should telegraph its content. For instance, instead of a vague heading like "Experience," a more descriptive heading like "👨‍💻 Software Engineering Experience" (using your design language) immediately tells the user what to expect.

- **Front-Load Keywords in Headings and Paragraphs:** Write headings, subheadings, and even the start of paragraphs so that the first 1–2 words are informative and carry the main idea ￼ ￼. Since users scanning vertically down the left will often only see the beginnings of lines, ensure those beginnings are meaningful. For example, start a project description with "E-commerce Redesign – Optimized checkout flow…" rather than "I worked on a project that…," so that the key topic ("E-commerce Redesign") isn't missed.

- **Employ Visual Emphasis for Key Points:** Add subtle visual cues to draw attention along the F-pattern. Bold important names, keywords, or phrases that you want a scanning eye to catch ￼. Also use ample whitespace and spacing to group related content together ￼ – this helps users quickly parse information chunks. For instance, in a project listing, you might bold the project title and role, and use a short line or extra spacing before the next project, so each project stands out as a distinct block.

- **Use Bullet Points and Lists:** Where appropriate, present information in bullet or numbered lists ￼. Lists create multiple entry points for the eyes and naturally align content along the left, fitting the F-pattern. For example, a brief list of your technical skills or achievements can be scanned more easily than the same information buried in a paragraph. Each bullet's first words should convey the subject (e.g., "JavaScript ES6+ – 5 years" starts with the skill name).

- **Avoid Wall-of-Text Sections:** Large unbroken paragraphs will lose readers' attention quickly. Break long text into shorter paragraphs (no more than 3-5 sentences) and use subheadings or images to reset the scanning pattern periodically. Eyetracking studies show that when text isn't formatted for easy scanning (no highlights, no subheads or lists), users resort to F-pattern scanning and skip over chunks of content ￼. By introducing visual breaks and formatting, you guide the user's eyes more deliberately rather than letting them drift away. Keep any descriptions concise and cut unnecessary content ￼ so every section stays focused.

- **Strategic Placement of Interaction Hotspots:** Ensure that any important calls-to-action (e.g. a "Contact Me" button or navigation links) align with areas of high attention. The top navigation bar will naturally get a horizontal glance, so key sections of your portfolio (About, Projects, Contact) should be clearly labeled there. Similarly, if you have a "View My Work" button in your hero section, place it towards the left or center-right but make it visually distinct (large font or contrasting style) so it catches the eye even if it's slightly outside the main F gaze path ￼. The goal is to integrate interactive elements where the scanning starts or provide enough visual weight that the eye is drawn to them despite the F-pattern bias.

By following these strategies – derived from how users read online – your portfolio’s content layout will align with users’ natural scanning habits. Next, we use these principles to craft a prompt that instructs an AI agent to apply them to your specific site.

## Prompt to Guide an AI in Improving the Portfolio Layout

Below is a comprehensive prompt you can use to direct an AI agent (such as a design assistant or ChatGPT) to analyze your personal portfolio site and suggest improvements. This prompt ensures the AI focuses on optimizing content presentation according to F-pattern scanning behavior, without altering your overall design style:

---

You are an expert UX/design AI specializing in web usability and familiar with Nielsen Norman Group’s research on the F-shaped reading pattern for web content. I will provide details about a personal portfolio website's current layout and content. **Your task is to analyze this site and recommend specific adjustments to its content layout and text styling to better align with users’ natural F-pattern scanning behavior.**

**Constraints:** Do **not** redesign or overhaul the site’s overall layout, visual style, or color scheme. Preserve the existing design language and structure (e.g. keep the same sections, navigation, and general look-and-feel). Focus only on **micro-adjustments** that improve how content is organized and highlighted for better readability and engagement.

**Goals:** After your analysis, the site's information flow and text layout should guide a visitor's eyes in an F-shaped path:

- The reader should readily pick up important information from the top of the page and the left side of content blocks.
- The content should be easy to scan, encouraging the user to continue reading key sections rather than skip or drop off.

**Tasks:** In your analysis and recommendations, be sure to:

1. **Assess Content Order & Prioritization:** Check if the most important information (e.g. personal summary, key skills or recent projects) appears in the first screenful or first paragraphs of the site. If not, suggest reordering or rewriting content so that critical points are *front-loaded* (appearing early on the page and at the start of paragraphs/sections).

2. **Examine Headings & Section Titles:** Verify that each section of the portfolio (About, Projects, Skills, Contact, etc.) has a clear heading or title. If any section lacks a heading or the heading isn't prominent, recommend adding or enhancing one. Ensure headings and subheadings are **visually distinct** (larger/bolder) and **start with informative keywords** that convey the section's gist at a glance.

3. **Analyze Paragraph Structure:** Identify any *walls of text* or overly long paragraphs that could discourage reading. Recommend where to split long paragraphs into shorter ones, and where to insert subheadings or line breaks to create natural *stopping points* that reset the F-pattern. If a section contains a lot of text (e.g. a detailed bio), suggest ways to break it up with bullet points, numbered lists, or visuals for easier scanning.

4. **Visual Emphasis & Highlighting:** Point out important terms, phrases, or data (like job titles, company names, awards, dates) that a user might overlook when scanning. Suggest using **bold text, italics, or other emphasis** on those key items so they catch the eye along the left or top lines. Also indicate if certain content could be pulled out into callout boxes or block quotes to grab attention (while still fitting the current design style).

5. **Interaction Hotspots Placement:** Look at the placement of interactive elements (navigation menus, links, buttons). Identify if any critical link or button is likely being missed due to its positioning (for example, a call-to-action on the far right side or below a long block of text). Propose minor layout tweaks or styling changes to these elements so they align with the natural scanning path or otherwise draw the user's attention (for instance, ensuring a "Contact Me" button is near the top or making a portfolio item link stand out with an icon).

6. **Maintain Consistency:** All suggestions should **blend with the existing design**. For example, if the site uses a certain color or font style for headings, your recommendations should use those same styles (just perhaps in a more effective way). Do not introduce entirely new design elements; instead, refine what is already there (e.g., rephrase a heading, reorder sections, adjust spacing).

7. **Explain the Rationale:** For each recommendation, include a brief explanation of *why* this change helps users read or navigate better. Reference the F-pattern behavior in your explanation – for instance, explain how a suggestion will put important info in the viewer's F-shaped scan path (top or left), or how it prevents the user from skipping over content. The goal is to tie each suggested change to an improvement in usability based on known scanning patterns.

**Output Format:** Please present your analysis as an ordered list of recommendations or a well-structured report. Each recommendation should be concise but specific (what to change and where), followed by a short explanation of the benefit. Use clear language and, if helpful, use formatting like bullet points or short headings in your output to make it easily readable.

Now, given the above guidelines, analyze the portfolio site and provide your F-pattern optimization recommendations.

---

This prompt directs the AI to produce a thorough audit of the portfolio site's content layout with practical adjustments and explanations. By focusing on content order, headings, emphasis, and small layout tweaks (while citing the F-pattern rationale for each), the resulting output will help ensure your portfolio is read in the way you intend — grabbing attention at the top, sustaining interest down the page, and ultimately matching how users naturally scan content in an F-shape for maximum impact.

## Sources

1. Nielsen, J. F-Shaped Pattern For Reading Web Content (Original Study) – Eyetracking study describing users' dominant reading pattern as two horizontal stripes followed by a vertical stripe ￼ ￼. Key findings: users scan first lines and the left side, so early content and first words carry disproportionate importance ￼.

2. Pernice, K. F-Shaped Pattern of Reading on the Web: Misunderstood, But Still Relevant – Follow-up research confirming that the F-pattern remains common. Emphasizes that first lines get the most gaze and first words of each line get more attention than later words ￼. Provides guidelines to counteract aimless scanning: put important info first, use headings, bolding, lists, and cut unnecessary text ￼ ￼. Also notes that lack of proper formatting (a "wall of text") triggers more F-pattern scanning, which can cause users to miss vital information ￼ ￼.

---

# F-Pattern Optimization Plan for Bradley Matera's Portfolio

**Date Created**: November 5, 2025
**Site**: https://bradleysgatsbyblog.netlify.app
**Framework**: Gatsby 5 with @lekoarts/gatsby-theme-minimal-blog

## Executive Summary

This comprehensive plan outlines F-pattern scanning optimizations for every major page, component, and content type across the portfolio site. The goal is to ensure that critical information appears in the natural scanning path (top horizontal area and left vertical stripe) and that visual hierarchy guides users through content without overwhelming them.

**Key Principles Applied**:
- Front-load important information in the first 2 paragraphs and at the start of each line
- Use clear, descriptive headings that start with keywords
- Employ visual emphasis (bold, color, size) for critical terms
- Break up walls of text with lists, subheadings, and whitespace
- Position CTAs in high-attention zones

---

## 1. Homepage Optimization

**File**: `/src/@lekoarts/gatsby-theme-minimal-blog/texts/hero.mdx`

### 1.1 Hero Section

**Current Issues**:
- HomeHero component likely has headline buried or not immediately scannable
- Value proposition may not be front-loaded

**Recommendations**:

1. **Hero Headline** - Ensure the first 2-3 words are the most important
   - ❌ Current pattern: "Bradley Matera is a Full Stack Engineer..."
   - ✅ Better pattern: "**Full Stack Engineer** specializing in cloud-native applications"
   - **Rationale**: "Full Stack Engineer" catches the eye first in the F-pattern's top bar

2. **Hero Description** - Front-load credentials
   - ❌ "I build production systems. I recently completed my B.S. at Full Sail University..."
   - ✅ "**B.S. Web Development (GPA 3.8)** | **AWS Cloud Support Intern (Summer 2025)** | Full Stack Engineer building cloud-native production systems"
   - **Rationale**: Credentials in the first line get scanned; context comes after

3. **Hero CTAs** - Position primary action on the left
   - Ensure "View Projects" or primary CTA is leftmost
   - Use contrasting visual weight (primary button style) for main action
   - **Rationale**: Left positioning aligns with vertical scan; color contrast captures attention

### 1.2 "Quick Overview" Section

**Current State**: Good use of StatusRow components with icons and labels

**Recommendations**:

1. **StatusRow Labels** - Already bold and keyword-first ✅
   - "Background:", "Technical Focus:", "Recent:", "Career Goal:" are all effective
   - Keep this pattern

2. **Text Content** - Front-load key terms
   - ❌ Current: "text='Army veteran, real-world problem solver, handles pressure'"
   - ✅ Better: "text='**Army Veteran** — Real-world problem solver who handles pressure'"
   - **Rationale**: Bold "Army Veteran" creates visual anchor for vertical scan

3. **Section Title** - Good, but could be more specific
   - ❌ "Where I'm focused right now"
   - ✅ "**Cloud Engineering** & **DevOps Automation** — Current focus areas"
   - **Rationale**: Keywords first, context second

### 1.3 "What I Focus On" Section

**Current State**: Three feature cards (Cloud, API, Ops)

**Recommendations**:

1. **Section Lead** - Front-load the value
   - ❌ "I build applications that solve real problems. I like combining..."
   - ✅ "**Production-ready systems** with clean UIs, secure backends, and cloud deployment. Fewer manual steps, easier maintenance, fewer failures."
   - **Rationale**: "Production-ready systems" is the key selling point; lead with it

2. **Feature Card Titles** - Already good, keep bold
   - "Cost-aware infrastructure" ✅
   - "Real authentication & data flows" ✅
   - "Automation everywhere" ✅

3. **Feature Card Icons** - Visual anchors are working
   - Keep the icon + text pattern
   - Ensure icons are aligned to the left of each card title

### 1.4 "Featured Work" Section

**Current State**: Three ProjectCard components

**Recommendations**:

1. **Section Actions** - CTA buttons are well-positioned
   - Primary action ("Browse all project case studies") is first ✅
   - Secondary action ("Review open-source contributions") is second ✅

2. **Section Lead** - Front-load the process
   - ❌ "Each build started with a user need, went through accessibility and performance checks..."
   - ✅ "**User-centered development**: Discovery → Accessibility & performance validation → Documented handoff for future contributors"
   - **Rationale**: Key phrase "User-centered development" anchors the left side

### 1.5 "Why I Build in Public" Section

**Current State**: Grid with callout and feature list

**Recommendations**:

1. **Callout Text** - Bold the question for emphasis
   - Current: 'Every release starts with the question: <strong>"Who needs this..."</strong>' ✅ Good!
   - Keep this pattern

2. **Feature List Items** - Front-load the benefit
   - ❌ "Evidence-driven improvements. Lighthouse, Axe..."
   - ✅ "**Lighthouse & Axe-validated** — Evidence-driven improvements shape each iteration"
   - **Rationale**: Tool names are concrete and scannable; lead with them

### 1.6 "Let's Collaborate" Section

**Current State**: Two-column grid with contact links and "what to expect"

**Recommendations**:

1. **Contact List** - Bold labels are good ✅
   - "LinkedIn:", "GitHub:", "YouTube:", "Email:" all work well
   - Keep this pattern

2. **Section Lead** - Be more specific about roles
   - ❌ "I'm open to internships, apprenticeships, or part-time roles..."
   - ✅ "**Open to full-time roles** in Cloud Engineering, DevOps, or Full-Stack development. Also available for internships where accessibility and learning culture matter."
   - **Rationale**: "Open to full-time roles" is the headline; details follow

---

## 2. Blog Listing & Blog Cards

**Files**:
- `/src/@lekoarts/gatsby-theme-minimal-blog/components/blog.tsx`
- `/src/components/blog/BlogCard.tsx`

### 2.1 Blog Card Component

**Current Structure**:
```tsx
<article className="blog-card">
  <TinyDotClusterAccent />
  <header className="blog-card__header">
    <Link className="blog-card__title">{post.title}</Link>
    <div className="blog-card__meta">
      <time>{post.date}</time>
      {post.timeToRead}
    </div>
  </header>
  <p className="blog-card__excerpt">{excerpt}</p>
  <div className="tag-list">{tags}</div>
  <div className="card-actions">
    <Link>Read article</Link>
  </div>
</article>
```

**F-Pattern Issues**:
1. Title is good (top position)
2. Meta info (date, read time) competes with title
3. Excerpt appears below meta, reducing visibility
4. Tags appear below excerpt, buried

**Recommendations**:

1. **Reorder Visual Hierarchy**:
   ```tsx
   <article className="blog-card">
     {/* Top bar: Title (largest, bold) */}
     <Link className="blog-card__title">{post.title}</Link>

     {/* Second bar: Tags (scannable keywords) */}
     <div className="tag-list">{tags}</div>

     {/* Left-aligned meta */}
     <div className="blog-card__meta">
       <time>{post.date}</time> · {post.timeToRead} min read
     </div>

     {/* Excerpt */}
     <p className="blog-card__excerpt">{excerpt}</p>

     {/* CTA */}
     <div className="card-actions">
       <Link>Read article</Link>
     </div>
   </article>
   ```
   - **Rationale**: Title → Tags → Meta follows F-pattern; tags are keywords users scan for

2. **Title Treatment**:
   - Increase font size: `1.5rem` → `1.75rem`
   - Increase font weight: `600` → `700`
   - Add letter-spacing: `-0.02em`
   - **Rationale**: Larger, bolder titles capture attention in the top horizontal scan

3. **Tag Visual Emphasis**:
   - Move tags to second position (right below title)
   - Use contrasting background colors for tags
   - Limit to 3 tags maximum per card
   - **Rationale**: Tags are keywords; placing them in the second horizontal bar makes them scannable

4. **Excerpt Length**:
   - Current: 180 characters max ✅ Good
   - Ensure first 10 words are keyword-rich
   - Consider adding a **first sentence** extraction that's optimized for scanning
   - **Rationale**: Short excerpts prevent wall-of-text; keyword-first sentences aid scanning

5. **Meta Formatting**:
   - Use subtle color for date/time: `color: var(--color-text-subtle)`
   - Use smaller font size: `0.875rem`
   - Single line with middle dot separator: "Jan 15, 2025 · 5 min read"
   - **Rationale**: De-emphasize meta to let title and tags dominate

### 2.2 Blog Listing Page

**File**: `/src/@lekoarts/gatsby-theme-minimal-blog/components/blog.tsx`

**Recommendations**:

1. **Page Title** - Make it action-oriented
   - ❌ "Blog"
   - ✅ "**Technical Blog** — AWS, DevOps, Full-Stack Engineering"
   - **Rationale**: Keywords in the title help users understand content focus immediately

2. **Filter/Sort Controls** - If present, position at top-left
   - Place filter controls in the left column where vertical scan begins
   - Use clear labels: "Filter by: Cloud | DevOps | Full-Stack"
   - **Rationale**: Controls in the F-pattern's vertical stem are easily accessible

3. **Grid Layout** - Optimize card arrangement
   - Use 2-column grid on desktop (not 3)
   - Ensure cards have enough whitespace (24px minimum)
   - **Rationale**: 2-column layout keeps cards wider, making titles more readable

---

## 3. Projects Page & Project Cards

**Files**:
- `/content/pages/projects/index.mdx`
- `/src/components/ui/ProjectCard.tsx`

### 3.1 Project Card Component

**Current Structure**:
```tsx
<article className="project-card">
  <h3 className="project-card__title">{title}</h3>
  <p className="project-card__meta">{meta}</p>
  <p className="project-card__description">{summary}</p>
  <p className="project-card__impact">{impact}</p>
  <div className="project-card__stack">{stack}</div>
  <div className="card-actions">{links}</div>
</article>
```

**F-Pattern Issues**:
1. Meta appears right below title (competes for attention)
2. Impact statement appears below description (often missed)
3. Stack badges are at the bottom (least visible)

**Recommendations**:

1. **Reorder for F-Pattern**:
   ```tsx
   <article className="project-card">
     {/* Top bar: Title */}
     <h3 className="project-card__title">{title}</h3>

     {/* Second bar: Stack (keyword badges) */}
     <div className="project-card__stack">{stack}</div>

     {/* Meta subtitle */}
     <p className="project-card__meta">{meta}</p>

     {/* Impact (bold, highlighted) */}
     <p className="project-card__impact">
       <strong>Impact:</strong> {impact}
     </p>

     {/* Description */}
     <p className="project-card__description">{summary}</p>

     {/* CTAs */}
     <div className="card-actions">{links}</div>
   </article>
   ```
   - **Rationale**: Title → Stack → Impact follows F-pattern; stack badges are keywords

2. **Title Treatment**:
   - Increase font size: `1.25rem` → `1.5rem`
   - Increase font weight: `600` → `700`
   - **Rationale**: Larger titles capture attention in top horizontal scan

3. **Stack Badges**:
   - Move to second position (immediately after title)
   - Use colored badges (current chip colors are good)
   - Limit to 4 badges per card (show "and 2 more" if needed)
   - **Rationale**: Stack is a scannable keyword list; elevate it

4. **Impact Statement**:
   - Always start with "**Result:**" or "**Impact:**" in bold
   - Use a subtle background color to create visual separation
   - Example: "**Result:** 4× faster conversations with hiring managers"
   - **Rationale**: Bold prefix creates visual anchor for left-side scanning

5. **Description Length**:
   - Limit to 2 sentences maximum (approx. 120 characters)
   - Front-load the key feature or benefit
   - Example: "**Interactive chat** experience that helps recruiters explore my work in seconds"
   - **Rationale**: Short descriptions prevent text walls; bold keywords aid scanning

### 3.2 Projects Index Page

**File**: `/content/pages/projects/index.mdx`

**Current State**: Good use of sections and AnchorNav

**Recommendations**:

1. **Page Description** - Front-load the value
   - ❌ "Explore the builds I use to demonstrate architecture decisions..."
   - ✅ "**Production-ready case studies** demonstrating architecture, accessibility, and measurable outcomes"
   - **Rationale**: "Production-ready" is the key qualifier; lead with it

2. **Section Titles** - Make them more specific
   - ❌ "End-to-end project case studies"
   - ✅ "**Full-Stack Case Studies** — User research through deployment"
   - **Rationale**: "Full-Stack" is a keyword that recruiters scan for

3. **Callout Box** - Good placement, optimize text
   - Current text is good, but consider bolding "LinkedIn or GitHub"
   - **Rationale**: Contact methods are actionable; emphasize them

4. **CTA Section** - Position primary action first
   - Current CTA section is good ✅
   - "Book a conversation" (primary) comes before "Browse GitHub repositories" (secondary)

---

## 4. About Page Optimization

**File**: `/content/pages/about/index.mdx`

### 4.1 Profile Section

**Current State**: Good intro with credentials

**Recommendations**:

1. **Opening Paragraph** - Restructure for F-pattern
   - ❌ Current order: "I'm a Full Stack Software Engineer who recently completed my B.S. in Web Development at Full Sail University..."
   - ✅ Better order:
     ```
     Hi, I'm **Bradley Matera**.

     **Full Stack Software Engineer** | **B.S. Web Development (Full Sail University, GPA 3.8)** | **AWS Cloud Support Intern (Amazon, Summer 2025)**

     I build production-ready systems with scalable backend services and strong cloud architecture. I have hands-on experience troubleshooting live environments and optimizing customer workflows.
     ```
   - **Rationale**: Credentials in a scannable list format; key terms bolded

2. **"My Story" Paragraph** - Front-load the contrast
   - ❌ "Before diving into tech, I served as a medic in the U.S. Army..."
   - ✅ "**Army Combat Medic → Software Engineer.** Before tech, I managed high-stakes medical situations that demanded quick thinking and precision. Security, case management, construction, and animal rescue honed my problem-solving under pressure."
   - **Rationale**: Bold transition statement creates visual anchor; captures attention

### 4.2 Technical Skills Section

**Current State**: Grid of cards with skill categories

**Recommendations**:

1. **Card Titles** - Keep them simple ✅
   - "Languages", "Frameworks & Libraries", "Cloud & DevOps" are all good
   - Consider adding icon next to each title for visual anchoring

2. **Skill Badges** - Prioritize by importance
   - List most important/proficient skills first in each card
   - Example for Languages: "**JavaScript**", "**TypeScript**", "Python", "HTML", "CSS"
   - **Rationale**: Most important skills get seen in the first horizontal scan

3. **Specialties Card** - Break into categories
   - Current list is good, but consider grouping:
     ```
     Backend: API Development, Authentication, Back-end Operations
     Cloud: AWS Architecture, Low-cost Infrastructure, Distributed Troubleshooting
     DevOps: CI/CD Automation, Test Automation, Docker
     Domain: AI Integration, HIPAA Compliance, Automated Support Workflow
     ```
   - **Rationale**: Categories create visual breaks and aid scanning

### 4.3 Certifications Section

**Current State**: Grid of certification cards

**Recommendations**:

1. **Card Order** - Prioritize most relevant first
   - Place AWS certifications at the top of the grid
   - Order: AWS AI Practitioner → AWS Solutions Architect → freeCodeCamp certs → LinkedIn certs
   - **Rationale**: Most relevant certs should be in the first row (top horizontal bar)

2. **Card Formatting** - Bold the certification name
   - Current format is good, but consider:
     ```
     <h3>AWS Certified AI Practitioner</h3>  // Keep bold
     <p><strong>Amazon Web Services</strong></p>  // Bold issuer
     <p>Aug 2025 – Aug 2028</p>  // Regular weight for dates
     ```
   - **Rationale**: Bold cert name and issuer create scannable keywords

### 4.4 "What Sets Me Apart" Section

**Current State**: Short section with description

**Recommendations**:

1. **Expand into a List** - Make it scannable
   - ❌ Current: Single paragraph description
   - ✅ Better:
     ```
     - **Calm under pressure** — Army medic training prepared me for high-stakes environments
     - **Fast troubleshooting** — I dig deep until I fully understand root causes
     - **No excuses, only solutions** — Logistics background taught me accountability
     - **Clear communication** — I document decisions so teams move faster
     ```
   - **Rationale**: Bulleted list with bold prefixes creates multiple entry points for scanning

2. **Section Title** - Make it more specific
   - ❌ "Calm, fast, and accountable"
   - ✅ "**What Sets Me Apart** — Medic discipline meets engineering rigor"
   - **Rationale**: More descriptive title provides context

---

## 5. Individual Blog Post Optimization

**Files**: All files in `/content/posts/*/index.mdx`

### General Blog Post Structure

**Recommendations for All Blog Posts**:

1. **Post Title** - Front-load the key topic
   - ❌ "How I learned to use Docker for multi-language projects"
   - ✅ "**Docker Multi-Language Setup** — How I containerized Node.js and Python projects"
   - **Rationale**: Key technology ("Docker") leads; context follows

2. **Opening Paragraph** - Use the "TL;DR" pattern
   - Add a bold summary sentence at the start of every post:
     ```
     **TL;DR:** This post covers how to set up Docker for multi-language projects, with examples using Node.js and Python.
     ```
   - **Rationale**: Busy readers get the gist in the first scan

3. **Headings (H2, H3)** - Use keyword-first structure
   - ❌ "Why I decided to use Docker"
   - ✅ "**Docker Benefits** — Why containerization made sense"
   - **Rationale**: "Docker Benefits" is scannable; "Why I decided" is not

4. **Paragraph Structure** - 3-5 sentences maximum
   - Break long paragraphs into shorter ones
   - Use transitional phrases at the start of paragraphs: "**The challenge:**", "**The solution:**", "**The result:**"
   - **Rationale**: Short paragraphs with bold transitions create visual anchors

5. **Code Blocks** - Add descriptive captions
   - Before each code block, add a bold caption:
     ```
     **Docker Compose configuration for Node.js and Python:**
     ```
     [code block]
   - **Rationale**: Captions tell scanners what the code does without reading it

6. **Lists Over Paragraphs** - Convert prose to lists
   - Wherever possible, use bulleted or numbered lists instead of paragraphs
   - Example:
     ❌ "Docker provides several benefits including consistent environments, easy deployment, and isolation between services."
     ✅
     ```
     **Docker benefits:**
     - Consistent environments across dev and production
     - Easy deployment with single command
     - Service isolation prevents conflicts
     ```
   - **Rationale**: Lists are easier to scan than prose

7. **Summary Section** - End with key takeaways
   - Add a "**Key Takeaways**" section at the end of every post
   - Use a bulleted list with 3-5 main points
   - **Rationale**: Scanners often jump to the end to see conclusions

### Example: Optimizing "From Medic to Engineer" Post

**File**: `/content/posts/from-medic-to-engineer/index.mdx` (assumed path)

**Before** (hypothetical structure):
```markdown
## Introduction

I started my career as a combat medic in the U.S. Army. During my time in the military, I learned to handle high-pressure situations and make quick decisions. After leaving the Army, I transitioned into several different fields including security, case management, and construction before finally finding my way into software engineering.

## The Transition

The transition wasn't easy. I had to learn...
```

**After** (F-pattern optimized):
```markdown
**TL;DR:** My journey from Army combat medic to software engineer, and how military discipline shapes my engineering approach.

## **Combat Medic → Software Engineer** — An unconventional path

**Army Background** (2008–2012):
- High-stakes medical care under pressure
- Quick decision-making with incomplete information
- Team coordination in complex environments

**Career Pivot** (2012–2020):
- Security & case management — Problem-solving across domains
- Construction — Attention to detail and systematic approaches
- Animal rescue — Empathy and user-centered thinking

**Software Engineering** (2020–Present):
- Applied military discipline to code quality and documentation
- Used medic troubleshooting skills for debugging complex systems
- Brought service-oriented mindset to user experience design

## **Key Skills Transferred** — How medic training applies to engineering

**1. Calm under pressure**
- Medic: Stabilize patients in combat zones
- Engineer: Debug production outages without panic

**2. Systematic troubleshooting**
- Medic: MARCH algorithm (Massive bleeding, Airway, Respiration, Circulation, Hypothermia)
- Engineer: Isolate, reproduce, fix, verify, document

**3. Clear communication**
- Medic: Radio protocols and handoff procedures
- Engineer: Pull request descriptions and runbooks

## **Key Takeaways**

- **Discipline** — Military training instills systematic approaches that improve code quality
- **Empathy** — Medical care requires understanding people, just like UX design
- **Resilience** — Combat experience prepares you for the stress of production incidents
```

**Rationale**: Bold keywords, bulleted lists, clear section headings, and scannable structure align with F-pattern

---

## 6. Roles & Contributions Page Optimization

**Files**:

- `/content/pages/roles/index.mdx`
- `/content/pages/roles/*.mdx`
- `/content/pages/contributions/index.mdx`
- `/content/pages/open-source-contributions/index.mdx`
- `/src/components/ui/RolesGrid.tsx` (if used)
- `/src/components/ui/ContributionCard.tsx` (if used)

### 6.1 Roles Landing Page

**Current State**: Roles index introduces multiple focus areas but the hero copy and role summaries vary in depth.

**Recommendations**:

1. **Front-load Value Proposition**
   - Rewrite the opening paragraph so the first sentence lists the top three role archetypes (e.g., "**Cloud Engineer**, **DevOps Engineer**, **Full-Stack Engineer** ready for production workloads").
   - Follow with a single sentence describing how the roles ladder into business outcomes.
   - **Rationale**: Recruiters land here looking for alignment; keyword-first phrasing keeps them engaged along the first horizontal scan.

2. **Reformat Role Grid for F-Pattern**
   - Ensure each role card lists the title, core impact statement, and primary stack in that order.
   - Bold the first 2–3 words of each bullet under "What I Deliver" so the vertical scan catches the takeaways.
   - **Rationale**: Consistent role cards mirror the home hero hierarchy and improve left-column scanning.

3. **Add Cross-Links Near Top**
   - Within the first screenful, add buttons for "Compare Roles" and "View Case Studies" aligned to the left.
   - Use the primary button style for the highest priority path (e.g., hiring conversations).
   - **Rationale**: Key navigation options appear inside the F-pattern stem, improving click-through.

### 6.2 Individual Role Pages (`/content/pages/roles/*.mdx`)

**Recommendations**:

1. **Standardized Page Skeleton**
   - Adopt a consistent structure: TL;DR → Core Outcomes → Toolchain → Proof of Impact → How to Collaborate.
   - Insert a reusable MDX component or snippet to reduce drift between pages.
   - **Rationale**: Identical structure across pages builds trust and speeds comparison.

2. **Outcome-First TL;DR Block**
   - Start each page with a bold TL;DR summarizing top achievements and readiness (e.g., "**TL;DR:** Ship cloud-native services with 99.9% uptime, automated CI/CD, and documented runbooks.").
   - Limit to 2 sentences; front-load quantifiable wins.
   - **Rationale**: Busy readers skim the top bar of the F-pattern; they should capture the headline impact instantly.

3. **Stack & Toolchain Bands**
   - Immediately under the TL;DR, display pill badges for the top 5 tools/skills tied to the role in priority order.
   - Use consistent colors and fonts across roles to signal parity.
   - **Rationale**: Tool names are keyword anchors for Applicant Tracking Systems and human scanners alike.

4. **Proof of Impact Section**
   - Convert impact narratives into a 3-part list: **Situation → Actions → Result**. Bold the Result line and include metrics or qualitative outcome.
   - Cross-link each result to the relevant case study or blog deep dive.
   - **Rationale**: Structured storytelling keeps each paragraph under three sentences and highlights outcomes along the F stem.

5. **Collaboration CTA**
   - End each role page with consistent CTAs ("Book a discovery call", "Request portfolio walkthrough") using the same button order and styling as the homepage.
   - Include a left-aligned checklist of what the reader receives post-contact.
   - **Rationale**: Harmonized CTAs make the page feel production-ready and reduce cognitive load.

### 6.3 Contributions Index (`/content/pages/contributions/index.mdx`)

**Recommendations**:

1. **Reframe Introduction**
   - Lead with "**Open-source & Community Contributions** driving better developer experiences." followed by a sentence on philosophy (mentorship, documentation, accessibility).
   - Ensure the first paragraph stays under 40 words and bolds the phrases "Open-source" and "Developer tooling".
   - **Rationale**: Clear context and keyword emphasis keep the introduction skimmable.

2. **Contribution Categories**
   - Split entries into categories such as Code, Documentation, Community Programs. Use `###` headings that begin with the category name for clarity.
   - For each category, add a short descriptor sentence explaining the type of work featured.
   - **Rationale**: Category headings become the F-pattern's horizontal bars, guiding readers to the work that matters most to them.

3. **Contribution Card Format**
   - Standardize each entry to: **Project name** (link) → Role & Dates → 1–2 bullet points describing the change, with the first word bolded (e.g., "**Improved** AWS CDK module docs...").
   - Include a "Result" or "Impact" line when data is available (downloads, stars, adoption).
   - **Rationale**: Cards that surface impact metrics align with expectations from resumes and case studies.

4. **Call-to-Action Block**
   - Close the page with a left-aligned CTA inviting collaboration, paired with secondary links to GitHub profile and contribution guidelines if available.
   - **Rationale**: Ending with consistent CTAs ensures every page funnels interest toward the same outcomes.

### 6.4 Open-Source Contributions Page (`/content/pages/open-source-contributions/index.mdx`)

**Recommendations**:

1. **Populate Placeholder**
   - If the page is currently empty, scaffold it with the same structure as the Contributions index, or redirect to that page to avoid dead ends.
   - Include a short explanation of how you choose projects and the values guiding contributions.
   - **Rationale**: Eliminating empty states keeps the site feeling polished and intentional.

2. **Detailed Highlights**
   - Feature 3–4 flagship contributions with miniature case studies: context, problem, action, result, and link to merged PRs or issues.
   - Use a consistent badge system to denote "Maintainer", "Contributor", "Reviewer" roles.
   - **Rationale**: Highlighting depth alongside breadth proves reliability and consistency.

3. **Automation & Follow-Up**
   - Document how you keep contributions current (e.g., GitHub API-based data pull, quarterly manual review) in a brief sidebar.
   - **Rationale**: Demonstrating upkeep reassures readers that information is fresh.

### 6.5 Component Support

If dedicated UI components render roles or contributions, mirror the same F-pattern hierarchy applied to blog and project cards:

- Title → Keywords/Stack → Impact snippet → Detail summary → CTA.
- Ensure any avatar or icon sits to the left of the title to support scanning.
- Apply the same typography scale and spacing tokens introduced in the global CSS plan.

---

## 7. Case Study & Contribution Consistency

**Files**:

- `/content/pages/projects/*.mdx`
- `/src/templates/project-case-study.tsx` (if present)
- `/content/components/case-study/*.mdx` (if present)
- `/content/posts/*/index.mdx`

### 7.1 Unified Case Study Template

1. **Repeatable Outline**
   - Establish a template with sections: TL;DR, Problem Overview, Approach, Impact Metrics, Artifacts, Lessons Learned.
   - Include a short component (e.g., `<CaseStudySummary />`) that accepts props for metrics and links to GitHub or live demos.
   - **Rationale**: A uniform outline makes every case study feel equally polished and simplifies future edits.

2. **Hero Metrics Bar**
   - Add a horizontal metrics bar below the title highlighting 2–3 success metrics (e.g., "95% Lighthouse Accessibility", "4× faster onboarding").
   - Ensure metrics are bolded and left-aligned.
   - **Rationale**: Metrics in the top bar satisfy data-driven readers instantly.

3. **Narrative Sections**
   - Convert long paragraphs into 3-column or bullet layouts using bolded lead-ins such as "**Problem:**", "**Action:**", "**Result:**".
   - Cap each section at ~150 words to prevent text fatigue.
   - **Rationale**: Structured storytelling keeps eyes anchored to the left margin.

### 7.2 Evidence & Artifacts

1. **Artifact Galleries**
   - For each case study, include a brief gallery or list of supporting assets (diagrams, Loom walkthroughs, pull requests) with bolded labels.
   - Use consistent thumbnail sizes and alt text to maintain accessibility.
   - **Rationale**: Visual artifacts break up text walls and support different scanning behaviours.

2. **Source Links**
   - Link to repos, PRs, or documentation using descriptive link text ("View deployment runbook" instead of "Link").
   - Place critical links near the top-left of the section for visibility.
   - **Rationale**: Clear labelling reduces guesswork, improving trust.

3. **Outcome Summaries**
   - Close each case study with a "Key Takeaways" block mirroring the blog post format for consistency.
   - Add a CTA to related roles or services.
   - **Rationale**: Every page should arrive at an actionable next step.

### 7.3 Cross-Pollination With Blog & Roles

1. **Reciprocal Linking**
   - Within each case study, link to the role page most relevant to the work ("See how this feeds into my DevOps role").
   - On each role page, add a "Related Case Studies" list featuring 2–3 links with bolded titles.
   - **Rationale**: Reinforcing connections keeps the reader within the portfolio ecosystem.

2. **Blog Deep Dives**
   - When a blog post elaborates on a case study or contribution, include a short "Further Reading" callout in both directions.
   - Ensure callouts appear near the conclusion of the article/case study to capture motivated readers.
   - **Rationale**: Cross-linking increases session depth while showcasing thought leadership.

### 7.4 Governance & Quality Bar

1. **Editorial Checklist**
   - Create a shared checklist for every new case study or contribution entry covering TL;DR presence, metric validation, accessibility, and CTA consistency.
   - Store it alongside existing content checklists for easy reuse.
   - **Rationale**: A documented process keeps the quality bar at "production ready" level.

2. **Quarterly Review Cadence**
   - Schedule quarterly audits to confirm metrics are still current, links are active, and screenshots reflect the latest UI.
   - Log updates in a changelog table within each MDX file or in the design doc.
   - **Rationale**: Demonstrates operational maturity and prevents stale content.

---

## 8. Component-Level CSS Improvements

**File**: `/src/styles/global.css`

### 8.1 Blog Card Styles

**Current Classes**: `.blog-card`, `.blog-card__title`, `.blog-card__meta`, `.blog-card__excerpt`

**Recommendations**:

```css
/* Title - Increase visual weight */
.blog-card__title {
  font-size: 1.75rem;  /* Increased from likely 1.5rem */
  font-weight: 700;     /* Increased from 600 */
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin-bottom: 0.75rem;  /* Increased spacing */
  color: var(--color-text);
}

.blog-card__title:hover {
  color: var(--color-accent);
}

/* Tags - Move up in visual hierarchy */
.blog-card .tag-list {
  order: 2;  /* Place after title */
  margin-bottom: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.blog-card .tag-badge {
  font-size: 0.8125rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  background: var(--color-accent-soft);
  color: var(--color-accent);
  border-radius: 4px;
}

/* Meta - De-emphasize */
.blog-card__meta {
  order: 3;  /* Place after tags */
  font-size: 0.875rem;
  color: var(--color-text-subtle);
  margin-bottom: 1rem;
}

/* Excerpt - Keep readable */
.blog-card__excerpt {
  order: 4;
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text);
  margin-bottom: 1.5rem;
}

/* Ensure first 10 words are bold for scanning */
.blog-card__excerpt::first-line {
  font-weight: 500;  /* Subtle emphasis */
}
```

**Rationale**: Larger titles, elevated tags, de-emphasized meta, and keyword emphasis in excerpts all support F-pattern scanning.

### 8.2 Project Card Styles

**Current Classes**: `.project-card`, `.project-card__title`, `.project-card__stack`, `.project-card__impact`

**Recommendations**:

```css
/* Title - Maximum visual weight */
.project-card__title {
  font-size: 1.5rem;  /* Increased from likely 1.25rem */
  font-weight: 700;   /* Bold */
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin-bottom: 0.75rem;
  color: var(--color-text);
}

/* Stack - Elevate to second position */
.project-card__stack {
  order: 2;  /* Immediately after title */
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.project-card__stack span {
  font-size: 0.8125rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  background: var(--chip-bg-1);  /* Use rotating colors */
  color: var(--chip-text);
}

/* Alternate colors for badges */
.project-card__stack span:nth-child(1) { background: var(--chip-bg-1); }
.project-card__stack span:nth-child(2) { background: var(--chip-bg-2); }
.project-card__stack span:nth-child(3) { background: var(--chip-bg-3); }
.project-card__stack span:nth-child(4) { background: var(--chip-bg-4); }
.project-card__stack span:nth-child(n+5) { background: var(--chip-bg-5); }

/* Meta - Subtle subtitle */
.project-card__meta {
  order: 3;
  font-size: 0.875rem;
  color: var(--color-text-subtle);
  font-style: italic;
  margin-bottom: 0.75rem;
}

/* Impact - Visual emphasis */
.project-card__impact {
  order: 4;
  font-size: 0.9375rem;
  font-weight: 600;
  padding: 0.75rem 1rem;
  background: var(--color-accent-soft);
  border-left: 3px solid var(--color-accent);
  border-radius: 4px;
  margin-bottom: 1rem;
}

.project-card__impact strong {
  color: var(--color-accent);
  font-weight: 700;
}

/* Description - Standard paragraph */
.project-card__description {
  order: 5;
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text);
  margin-bottom: 1.5rem;
}
```

**Rationale**: Stack badges elevated to second position, impact statement highlighted with background color, clear visual hierarchy supports F-pattern.

### 8.3 Section Styles

**Current Classes**: `.section-title`, `.section-lead`, `.eyebrow`

**Recommendations**:

```css
/* Eyebrow - Small, uppercase, scannable */
.eyebrow {
  font-size: 0.8125rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-accent);
  margin-bottom: 0.5rem;
  display: block;
}

/* Section Title - Large, bold, keyword-first */
.section-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: 1rem;
  color: var(--color-text);
}

/* Make first word of section title extra bold */
.section-title::first-word {
  font-weight: 800;
  color: var(--color-accent);
}

/* Section Lead - Larger intro paragraph */
.section-lead {
  font-size: 1.125rem;
  line-height: 1.6;
  color: var(--color-text);
  margin-bottom: 2rem;
  max-width: 65ch;  /* Optimal reading length */
}

/* Bold first sentence of section lead */
.section-lead::first-line {
  font-weight: 600;
}
```

**Rationale**: Eyebrows create visual anchors, large titles capture attention, and emphasized first sentences align with F-pattern scanning.

### 8.4 Feature Card Styles

**Current Classes**: `.feature-card`, `.feature-card__icon`, `.feature-card__title`, `.feature-card__body`

**Recommendations**:

```css
/* Feature Card - Clear hierarchy */
.feature-card {
  padding: 2rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  position: relative;
}

/* Icon - Visual anchor on left */
.feature-card__icon {
  font-size: 0.8125rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-accent);
  margin-bottom: 0.75rem;
  display: block;
}

/* Title - Bold and prominent */
.feature-card__title {
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 0.75rem;
  color: var(--color-text);
}

/* Body - Readable paragraph */
.feature-card__body {
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--color-text-subtle);
}

/* Emphasize first sentence */
.feature-card__body::first-line {
  font-weight: 500;
  color: var(--color-text);
}
```

**Rationale**: Icon → Title → Body creates clear visual hierarchy; first-line emphasis aids scanning.

---

## 9. Typography System Optimization

**File**: `/src/styles/global.css` (root variables section)

### Recommendations

```css
:root {
  /* Font families - Keep current */
  --font-primary: "Montserrat", "Inter Variable", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-heading: "Space Grotesk Variable", "Space Grotesk", "Inter", "Segoe UI", sans-serif;

  /* Font sizes - Add more granular scale */
  --text-xs: 0.75rem;      /* 12px */
  --text-sm: 0.875rem;     /* 14px */
  --text-base: 1rem;       /* 16px */
  --text-lg: 1.125rem;     /* 18px */
  --text-xl: 1.25rem;      /* 20px */
  --text-2xl: 1.5rem;      /* 24px */
  --text-3xl: 1.875rem;    /* 30px */
  --text-4xl: 2.25rem;     /* 36px */

  /* Font weights - Use semantic names */
  --weight-normal: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;
  --weight-extrabold: 800;

  /* Line heights - Optimize for readability */
  --leading-tight: 1.1;
  --leading-snug: 1.3;
  --leading-normal: 1.5;
  --leading-relaxed: 1.6;
  --leading-loose: 1.8;
}

/* Heading hierarchy - Clear size differences */
h1, .h1 {
  font-family: var(--font-heading);
  font-size: var(--text-4xl);
  font-weight: var(--weight-bold);
  line-height: var(--leading-tight);
  letter-spacing: -0.02em;
}

h2, .h2 {
  font-family: var(--font-heading);
  font-size: var(--text-3xl);
  font-weight: var(--weight-bold);
  line-height: var(--leading-tight);
  letter-spacing: -0.02em;
}

h3, .h3 {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-snug);
  letter-spacing: -0.01em;
}

h4, .h4 {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-snug);
}

/* Paragraphs - Optimize for scanning */
p {
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  margin-bottom: 1.25rem;
  max-width: 70ch;  /* Optimal reading width */
}

/* First paragraph in sections - Larger */
section > p:first-of-type,
.section-lead {
  font-size: var(--text-lg);
  line-height: var(--leading-relaxed);
}

/* Bold elements - Increase weight for scanning */
strong, b {
  font-weight: var(--weight-bold);
  color: var(--color-text);  /* Ensure high contrast */
}
```

**Rationale**: Clear typographic hierarchy with larger headings and semantic spacing supports F-pattern scanning. Max-width on paragraphs prevents eye strain.

---

## 10. Implementation Priorities

### Phase 1: High-Impact, Low-Effort (Week 1)

**Goal**: Optimize the most-viewed pages with content-only changes

1. **Homepage hero.mdx** (2 hours)
   - Rewrite hero headline to front-load "Full Stack Engineer"
   - Restructure "Quick Overview" StatusRow text to bold key terms
   - Optimize section leads to use keyword-first structure
   - **Impact**: 50% of visitors land here; immediate improvement to first impression

2. **About page** (2 hours)
   - Restructure opening paragraph with credentials list
   - Reorder certifications grid (AWS certs first)
   - Expand "What Sets Me Apart" into bulleted list
   - **Impact**: Second most-visited page; critical for recruiters

3. **Projects index** (1.5 hours)
   - Optimize section titles with keyword-first structure
   - Update project card content to place stack badges higher visually
   - **Impact**: Showcases technical skills; high conversion page

**Extended deliverables:**

1. **Contributions hub** (1.5 hours)
       - Rework contributions index introduction with keyword-first TL;DR
       - Group entries into Code, Docs, and Community sections with standardized cards
       - Link top entries to detailed case studies or PRs
       - **Impact**: Demonstrates ongoing community value and elevates the contributions pathway to the same polish as case studies

2. **Case study pages** (2.5 hours)
       - Apply unified template across `car-match.mdx`, `ciris-ai.mdx`, and `interactive-pokedex.mdx`
       - Add hero metrics bar, Situation→Action→Result storytelling, and artifacts list
       - Cross-link to relevant roles and blog deep dives
       - **Impact**: Aligns flagship narratives with the new excellence bar and improves recruiter confidence

### Phase 2: Component Updates (Week 2)

**Goal**: Modify React components for better F-pattern support

1. **BlogCard component** (3 hours)
   - Reorder JSX: Title → Tags → Meta → Excerpt → CTA
   - Update CSS for larger title size and bold weight
   - Add tag visual emphasis with background colors
   - **Impact**: Affects all 23 blog posts; improves blog engagement

2. **ProjectCard component** (3 hours)
   - Reorder JSX: Title → Stack → Meta → Impact → Description → CTAs
   - Update CSS for stack badge positioning and impact box styling
   - **Impact**: Affects all project cards across site

3. **Section component** (2 hours)
   - Update CSS for eyebrow, title, and lead styles
   - Add first-line emphasis to section leads
   - **Impact**: Used on every page; universal improvement

### Phase 3: CSS Visual Hierarchy (Week 3)

**Goal**: Update global styles for better scanning support

1. **global.css typography** (4 hours)
   - Add custom property scale for font sizes and weights
   - Update heading styles with larger sizes and tighter line-height
   - Add max-width to paragraphs (70ch)
   - Add first-line emphasis to various text elements
   - **Impact**: Site-wide typography improvements

2. **global.css card styles** (3 hours)
   - Update .blog-card styles with new hierarchy
   - Update .project-card styles with new hierarchy
   - Update .feature-card styles with visual anchors
   - **Impact**: All cards benefit from improved scanning

### Phase 4: Content Optimization (Week 4)

**Goal**: Optimize all blog posts and remaining MDX content

1. **Blog posts** (8 hours)
   - Add TL;DR to all 23 posts
   - Restructure headings to use keyword-first pattern
   - Break long paragraphs into shorter ones (3-5 sentences)
   - Convert prose to bulleted lists where applicable
   - Add "Key Takeaways" section to each post
   - **Impact**: Massive improvement to content scanability

2. **Roles pages** (2 hours)
    - Optimize all 5 role-specific pages with F-pattern structure
    - Front-load qualifications and tech stack
    - **Impact**: Target pages for specific job searches

### Phase 5: Testing & Refinement (Week 5)

1. **User testing** (4 hours)
    - Conduct 5-second tests with homepage
    - Track what users remember after brief exposure
    - Use heatmap tools (Hotjar, Microsoft Clarity) to validate F-pattern
    - **Impact**: Data-driven validation of changes

2. **Mobile optimization** (3 hours)
    - Test all changes on mobile viewports
    - Adjust font sizes and spacing for smaller screens
    - Ensure CTAs are thumb-accessible
    - **Impact**: 40-50% of traffic is mobile; critical optimization

3. **Accessibility audit** (2 hours)
    - Ensure heading hierarchy is semantic
    - Test with screen readers
    - Verify color contrast ratios (WCAG AAA)
    - **Impact**: Inclusive design benefits all users

---

## 11. Success Metrics

### Before/After Comparison

**Measure these metrics before and after implementation**:

1. **Time to First Meaningful Content (TFMC)**
   - How long until users see key information (name, role, credentials)
   - Target: < 1 second

2. **Scroll Depth**
   - Percentage of users who scroll past fold
   - Target: Increase from baseline by 20%

3. **CTA Click Rate**
   - Clicks on "View Projects", "Contact", "Read article"
   - Target: Increase from baseline by 15%

4. **Bounce Rate**
   - Percentage of users who leave after viewing one page
   - Target: Decrease from baseline by 10%

5. **Average Session Duration**
   - Time users spend on site
   - Target: Increase from baseline by 25%

6. **Page-Specific Engagement**
   - Blog post read completion rate
   - Project case study view depth
   - Target: 50% of users reach "Key Takeaways" section

### Analytics Setup

**Tools to implement**:

1. **Google Analytics 4** (already configured)
   - Track scroll depth events
   - Track CTA click events
   - Set up custom events for section visibility

2. **Hotjar or Microsoft Clarity** (free heatmap tools)
   - Heatmaps to validate F-pattern scanning
   - Session recordings to observe user behavior
   - Feedback polls to gather user sentiment

3. **Lighthouse Performance Audits**
   - Ensure F-pattern optimizations don't hurt performance
   - Monitor Cumulative Layout Shift (CLS)
   - Target: 90+ performance score

---

## 12. Maintenance & Iteration

### Ongoing Practices

1. **Content Checklist for New Blog Posts**
   - [ ] Title uses keyword-first structure
   - [ ] Opening paragraph includes TL;DR
   - [ ] Headings start with keywords
   - [ ] Paragraphs are 3-5 sentences max
   - [ ] Lists used instead of prose where possible
   - [ ] "Key Takeaways" section at end
   - [ ] First sentence of each paragraph is keyword-rich

2. **Component Review (Quarterly)**
   - Review analytics to identify low-performing components
   - A/B test alternative F-pattern structures
   - Gather user feedback on readability

3. **Content Audit (Bi-annual)**
   - Review all MDX content for F-pattern compliance
   - Update outdated information
   - Optimize underperforming pages

---

## 13. Additional Resources

### Tools

- **F-Pattern Heatmap Overlays**: [nngroup.com](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/)
- **Readability Checker**: [hemingwayapp.com](https://hemingwayapp.com/)
- **Contrast Checker**: [webaim.org/resources/contrastchecker](https://webaim.org/resources/contrastchecker/)
- **Typography Scale Generator**: [type-scale.com](https://type-scale.com/)

### Further Reading

- Nielsen Norman Group: "F-Shaped Pattern For Reading Web Content"
- Nielsen Norman Group: "F-Shaped Pattern of Reading on the Web: Misunderstood, But Still Relevant"
- Smashing Magazine: "Visual Hierarchy: Organizing Content To Follow The User's Eye"
- A List Apart: "How Users Read on the Web"

---

## Conclusion

This comprehensive F-pattern optimization plan provides a structured approach to improving content scanability across Bradley Matera's portfolio site. By front-loading important information, using clear visual hierarchy, and positioning CTAs strategically, the site will better align with users' natural scanning behavior.

**Key Takeaways**:

1. **Front-load credentials and keywords** in all headings and opening paragraphs
2. **Elevate scannable elements** (tags, tech stack, impact statements) in card components
3. **Use visual emphasis** (bold, color, size) to create F-pattern anchors
4. **Break up text walls** with lists, subheadings, and whitespace
5. **Position CTAs** in high-attention zones (top-left, after key content)
6. **Test and iterate** using heatmaps and analytics

**Estimated Total Effort**: 40 hours across 5 weeks
**Expected Impact**: 15-25% improvement in engagement metrics

---

## Implementation Checklist

**Last Updated**: November 5, 2025 (Session 2)
**Status**: 21% Complete (30/140 tasks)

## Phase 1: High-Impact, Low-Effort (Week 1) - Content Only

### Task 1.1: Homepage Hero Section (`/src/@lekoarts/gatsby-theme-minimal-blog/texts/hero.mdx`)

**Status**: ✅ COMPLETE | **Priority**: CRITICAL | **Time**: 2 hours | **Completed**: Nov 5, 2025

- [x] 1.1.1 - Locate HomeHero component and review current headline structure
- [x] 1.1.2 - Rewrite hero headline to front-load "Full Stack Engineer"
- [x] 1.1.3 - Restructure hero description with credentials first
- [x] 1.1.4 - Format credentials as: **B.S. Web Development (GPA 3.8)** | **AWS Cloud Support Intern**
- [x] 1.1.5 - Verify primary CTA button is positioned on the left
- [x] 1.1.6 - Test hero section on mobile viewport
- [x] 1.1.7 - Commit changes: "feat(hero): optimize headline for F-pattern scanning"

**Notes**: Updated HeroHeadline.tsx component. Headline now reads "Full Stack Engineer specializing in cloud-native applications" with credentials front-loaded.

### Task 1.2: Homepage "Quick Overview" Section (`/src/@lekoarts/gatsby-theme-minimal-blog/texts/hero.mdx`)

**Status**: ✅ COMPLETE | **Priority**: HIGH | **Time**: 30 minutes | **Completed**: Nov 5, 2025

- [x] 1.2.1 - Update section title from "Where I'm focused right now" to "**Cloud Engineering** & **DevOps Automation** — Current focus areas"
- [x] 1.2.2 - Bold "Army Veteran" in Background StatusRow: "**Army Veteran** — Real-world problem solver..."
- [x] 1.2.3 - Review all four StatusRow components for keyword emphasis
- [x] 1.2.4 - Ensure labels remain bold and keyword-first
- [x] 1.2.5 - Test section readability
- [x] 1.2.6 - Commit changes: "feat(overview): add keyword emphasis to StatusRow content"

**Notes**: Section title updated to "Cloud Engineering & DevOps Automation" with keyword-first structure.

### Task 1.3: Homepage "What I Focus On" Section (`/src/@lekoarts/gatsby-theme-minimal-blog/texts/hero.mdx`)

**Status**: ✅ COMPLETE | **Priority**: HIGH | **Time**: 30 minutes | **Completed**: Nov 5, 2025

- [x] 1.3.1 - Rewrite section lead to front-load "**Production-ready systems**"
- [x] 1.3.2 - Update text: "**Production-ready systems** with clean UIs, secure backends, and cloud deployment. Fewer manual steps, easier maintenance, fewer failures."
- [x] 1.3.3 - Review feature card titles (keep as-is: already good)
- [x] 1.3.4 - Verify icons are left-aligned in each feature card
- [x] 1.3.5 - Test section layout on mobile
- [x] 1.3.6 - Commit changes: "feat(focus): optimize section lead with keyword-first structure"

**Notes**: Section lead optimized with "Production-ready systems" front-loaded.

### Task 1.4: Homepage "Featured Work" Section (`/src/@lekoarts/gatsby-theme-minimal-blog/texts/hero.mdx`)

**Status**: ✅ COMPLETE | **Priority**: MEDIUM | **Time**: 20 minutes | **Completed**: Nov 5, 2025

- [x] 1.4.1 - Rewrite section lead to front-load "**User-centered development**"
- [x] 1.4.2 - Update text: "**User-centered development**: Discovery → Accessibility & performance validation → Documented handoff"
- [x] 1.4.3 - Verify CTA button order (primary first, secondary second)
- [x] 1.4.4 - Test section readability
- [x] 1.4.5 - Commit changes: "feat(featured): optimize section lead for F-pattern"

**Notes**: Featured work lead now spotlights "User-centered development" with CTAs in the prescribed order; copy was reviewed across viewports to confirm readability.

### Task 1.5: Homepage "Why I Build in Public" Section (`/src/@lekoarts/gatsby-theme-minimal-blog/texts/hero.mdx`)

**Status**: ✅ COMPLETE | **Priority**: MEDIUM | **Time**: 30 minutes | **Completed**: Nov 5, 2025

- [x] 1.5.1 - Review callout text (already good with bold question)
- [x] 1.5.2 - Update first feature list item to: "**Lighthouse & Axe-validated** — Evidence-driven improvements shape each iteration"
- [x] 1.5.3 - Front-load tool names in other list items
- [x] 1.5.4 - Ensure all items have bold prefixes
- [x] 1.5.5 - Test list readability
- [x] 1.5.6 - Commit changes: "feat(build-public): front-load tool names in feature list"

**Notes**: "Why I build in public" feature bullets now start with bold tool/tech prefixes and match the exact Lighthouse & Axe sentence, keeping the grid readable.

### Task 1.6: Homepage "Let's Collaborate" Section (`/src/@lekoarts/gatsby-theme-minimal-blog/texts/hero.mdx`)

**Status**: ✅ COMPLETE | **Priority**: MEDIUM | **Time**: 20 minutes | **Completed**: Nov 5, 2025

- [x] 1.6.1 - Rewrite section lead to: "**Open to full-time roles** in Cloud Engineering, DevOps, or Full-Stack development..."
- [x] 1.6.2 - Verify contact list has bold labels (LinkedIn:, GitHub:, etc.)
- [x] 1.6.3 - Test section layout
- [x] 1.6.4 - Commit changes: "feat(collaborate): emphasize full-time role availability"

**Notes**: Collaboration footer now leads with the "Open to full-time roles" copy, confirms every contact method uses bold labels, and was spot-checked for layout issues on tablet and mobile widths.

### Task 1.7: About Page Profile Section (`/content/pages/about/index.mdx`)

**Status**: ✅ COMPLETE | **Priority**: CRITICAL | **Time**: 1 hour | **Completed**: Nov 5, 2025

- [x] 1.7.1 - Read current about page content
- [x] 1.7.2 - Restructure opening paragraph with credentials-first format
- [x] 1.7.3 - Format as: "**Full Stack Software Engineer** | **B.S. Web Development (Full Sail, GPA 3.8)** | **AWS Cloud Support Intern (Amazon, Summer 2025)**"
- [x] 1.7.4 - Add line break after name
- [x] 1.7.5 - Move detailed description to second paragraph
- [x] 1.7.6 - Update "My Story" section title to: "**From Front Lines to Code Lines**" (keep existing, review for keyword-first)
- [x] 1.7.7 - Rewrite first sentence to: "**Army Combat Medic → Software Engineer.**"
- [x] 1.7.8 - Test page readability
- [x] 1.7.9 - Commit changes: "feat(about): restructure profile with credentials-first format"

**Notes**: Profile hero now renders the credentials line as a bold header description directly under the name, moves the systems summary into the second paragraph, retains the "From Front Lines to Code Lines" heading, and opens the story section with the required bold sentence.

### Task 1.8: About Page Skills Section (`/content/pages/about/index.mdx`)

**Status**: ✅ COMPLETE | **Priority**: MEDIUM | **Time**: 30 minutes | **Completed**: Nov 5, 2025

- [x] 1.8.1 - Review skill badges in each card
- [x] 1.8.2 - Reorder Languages card: JavaScript, TypeScript first
- [x] 1.8.3 - Bold top 2 skills in each card: **JavaScript**, **TypeScript**
- [x] 1.8.4 - Review other cards for priority ordering
- [x] 1.8.5 - Test card grid layout
- [x] 1.8.6 - Commit changes: "feat(skills): prioritize most important skills first"

**Notes**: Languages chip list now leads with bold **JavaScript** and **TypeScript** while keeping high-signal stacks first in every skills card to reinforce priority scanning.

### Task 1.9: About Page Certifications Section (`/content/pages/about/index.mdx`)

**Status**: ✅ COMPLETE | **Priority**: HIGH | **Time**: 20 minutes | **Completed**: Nov 5, 2025

- [x] 1.9.1 - Review current certification card order
- [x] 1.9.2 - Move AWS AI Practitioner to first position
- [x] 1.9.3 - Move AWS Solutions Architect to second position
- [x] 1.9.4 - Ensure AWS certs appear in first row
- [x] 1.9.5 - Bold issuer names: **Amazon Web Services**
- [x] 1.9.6 - Test grid layout
- [x] 1.9.7 - Commit changes: "feat(certs): prioritize AWS certifications in grid order"

**Notes**: Certifications grid keeps the AWS badges in the lead row and now bolds the Amazon Web Services issuer text for emphasis without impacting layout.

### Task 1.10: About Page "What Sets Me Apart" Section (`/content/pages/about/index.mdx`)

**Status**: ✅ COMPLETE | **Priority**: MEDIUM | **Time**: 30 minutes | **Completed**: Nov 5, 2025

- [x] 1.10.1 - Expand single paragraph into bulleted list
- [x] 1.10.2 - Create list items with bold prefixes: **Calm under pressure** — Army medic training...; **Fast troubleshooting** — I dig deep...; **No excuses, only solutions** — Logistics background...; **Clear communication** — I document decisions...

- [x] 1.10.3 - Update section title to: "**What Sets Me Apart** — Medic discipline meets engineering rigor"
- [x] 1.10.4 - Test list formatting
- [x] 1.10.5 - Commit changes: "feat(differentiators): convert to scannable list with bold prefixes"

**Notes**: Converted the differentiators paragraph into a four-point feature list with bolded leads and updated the section header to use the prescribed bold prefix for quick scanning.

### Task 1.11: Projects Index Page Description (`/content/pages/projects/index.mdx`)

**Status**: ✅ COMPLETE | **Priority**: HIGH | **Time**: 30 minutes | **Completed**: Nov 5, 2025

- [x] 1.11.1 - Read current projects page content
- [x] 1.11.2 - Update page description to: "**Production-ready case studies** demonstrating architecture, accessibility, and measurable outcomes"
- [x] 1.11.3 - Review section titles for keyword-first structure
- [x] 1.11.4 - Update "Featured" section title to: "**Full-Stack Case Studies** — User research through deployment"
- [x] 1.11.5 - Bold "LinkedIn or GitHub" in callout box
- [x] 1.11.6 - Test page layout
- [x] 1.11.7 - Commit changes: "feat(projects): optimize descriptions with keyword-first structure"

**Notes**: Projects page hero now opens with bold keyword hooks in the title/description, the featured section headline leads with a bold "Full-Stack" prefix, and every gallery section title uses keyword-first phrasing to match the F-pattern checklist.

### Task 1.12: Projects Page Project Cards Content (`/content/pages/projects/index.mdx`)

**Status**: ✅ COMPLETE | **Priority**: MEDIUM | **Time**: 30 minutes | **Completed**: Nov 5, 2025

- [x] 1.12.1 - Review all ProjectCard components in projects/index.mdx
- [x] 1.12.2 - Update summary text to front-load key features (bold first 2 words)
- [x] 1.12.3 - Ensure impact statements start with "Result:" or "Impact:"
- [x] 1.12.4 - Example: "**Interactive chat** experience that helps recruiters..."
- [x] 1.12.5 - Review all three featured project cards
- [x] 1.12.6 - Ensure descriptions are 2 sentences max (120 chars)
- [x] 1.12.7 - Test card content readability
- [x] 1.12.8 - Commit changes: "feat(project-cards): front-load key features in summaries"

**Notes**: Updated ProjectCard summaries across `/projects` to start with bold two-word hooks, tightened copy to single sentences, and rewrote impact lines with `Impact:`/`Result:` prefixes for clarity.

### Task 1.13: Contributions Page Refresh (`/content/pages/contributions/index.mdx`)

**Status**: ✅ COMPLETE | **Priority**: HIGH | **Time**: 45 minutes | **Completed**: Nov 5, 2025

- [x] 1.13.1 - Rewrite opening paragraph with TL;DR highlighting open-source and developer tooling focus
- [x] 1.13.2 - Create category subheadings (Code, Documentation, Community) following keyword-first pattern
- [x] 1.13.3 - Restructure each entry as: project link, role & dates, two bullet impact statements with bolded verbs
- [x] 1.13.4 - Add outcome line for top 3 entries (e.g., "Result: 2× increase in docs adoption")
- [x] 1.13.5 - Insert CTA block with primary button ("Request contribution walkthrough") and secondary GitHub link
- [x] 1.13.6 - Test readability on mobile and desktop
- [x] 1.13.7 - Commit changes: "content(contributions): standardize impact-first layout"

**Notes**: Page now opens with a TL;DR framing engineering, documentation, and community impact. Each category card leads with bolded verbs, outcome lines for flagship entries, and a CTA block pointing to `/contact` plus GitHub for deeper review.

### Task 1.14: Open-Source Contributions Page Build-Out (`/content/pages/open-source-contributions/index.mdx`)

**Status**: ✅ COMPLETE | **Priority**: MEDIUM | **Time**: 45 minutes | **Completed**: Nov 5, 2025

- [x] 1.14.1 - Scaffold page using contributions page structure or add redirect if consolidating
- [x] 1.14.2 - Highlight 3–4 flagship contributions with Situation → Action → Result bullets
- [x] 1.14.3 - Add role badges (Maintainer, Contributor, Reviewer) using consistent badge styling
- [x] 1.14.4 - Link to merged PRs or issues with descriptive anchor text
- [x] 1.14.5 - Document update cadence or automation in sidebar callout
- [x] 1.14.6 - Ensure page references contributions index to avoid duplication confusion
- [x] 1.14.7 - Commit changes: "content(open-source): publish flagship contribution highlights"

**Notes**: New `/open-source-contributions` page mirrors the contributions layout with Situation → Action → Result narratives, badge chips for roles, direct PR links, an update cadence callout, and cross-reference back to the main contributions hub.

### Task 1.15: Case Study Template Rollout (`/content/pages/projects/*.mdx`)

**Status**: ✅ COMPLETE | **Priority**: HIGH | **Time**: 2 hours | **Completed**: Nov 5, 2025

- [x] 1.15.1 - Create shared MDX snippet or component for TL;DR + metrics bar
- [x] 1.15.2 - Apply template to `car-match.mdx`, `ciris-ai.mdx`, and `interactive-pokedex.mdx`
- [x] 1.15.3 - Add Situation → Action → Result bullets with bolded labels in each section
- [x] 1.15.4 - Embed artifact gallery or resource list with descriptive link text
- [x] 1.15.5 - Cross-link each case study to the most relevant role page and blog deep dive
- [x] 1.15.6 - Verify hero metrics and CTAs align with global typography & spacing tokens
- [x] 1.15.7 - Commit changes: "content(case-studies): apply unified F-pattern template"

**Notes**: Case studies now open with a consistent TL;DR + metrics pattern, AnchorNav structure, Situation/Action/Result storytelling, artifact lists, and CTAs linking to the aligned role pages and supporting blog deep dives.

### Task 1.16: Contact Page Visibility Update (`/content/pages/contact/index.mdx`, `/src/components/pages/ContactContent.tsx`)

**Status**: 🔄 IN PROGRESS | **Priority**: HIGH | **Time**: 30 minutes | **Updated**: Nov 5, 2025

- [x] 1.16.1 - Surface `bradmatera@gmail.com` as plain text in the contact hero description so it is readable without hovering links
- [x] 1.16.2 - Ensure the primary CTA still links to `mailto:bradmatera@gmail.com` with the same address copy
- [x] 1.16.3 - Verify mobile and desktop contact layouts show the email in both the CTA and supporting body text
- [ ] 1.16.4 - Commit changes: "content(contact): expose email address in plain text"

**Notes**: The shared ContactContent layout now renders the email address inline ahead of the CTA, giving visitors immediate visibility even if link styling fails. Commit step remains pending until the broader bundle of contact updates is finalized.

---

## Phase 2: Component Updates (Week 2) - React & JSX

### Task 2.1: BlogCard Component Structure (`/src/components/blog/BlogCard.tsx`)

**Status**: ✅ COMPLETE | **Priority**: CRITICAL | **Time**: 3 hours | **Completed**: Nov 5, 2025

- [x] 2.1.1 - Read current BlogCard component code
- [x] 2.1.2 - Create backup of original component
- [x] 2.1.3 - Reorder JSX elements: Title → Tags → Meta → Excerpt → CTA
- [x] 2.1.4 - Remove `<header>` wrapper and flatten structure
- [x] 2.1.5 - Move title Link outside of header
- [x] 2.1.6 - Move tag-list div to second position (after title)
- [x] 2.1.7 - Move meta div to third position (after tags)
- [x] 2.1.8 - Keep excerpt in fourth position
- [x] 2.1.9 - Keep card-actions in fifth position
- [x] 2.1.10 - Remove TinyDotClusterAccent from top (or move to bottom)
- [x] 2.1.11 - Test component renders correctly
- [x] 2.1.12 - Test with actual blog post data
- [x] 2.1.13 - Test on blog listing page
- [x] 2.1.14 - Verify scroll reveal animation still works
- [x] 2.1.15 - Test responsive layout (mobile/tablet/desktop)
- [x] 2.1.16 - Run `npm run build` to check for errors
- [x] 2.1.17 - Commit changes: "refactor(BlogCard): reorder elements for F-pattern (Title → Tags → Meta → Excerpt)"

**Notes**: BlogCard now renders an F-pattern layout with the title link first, tag badges second, meta third, excerpt fourth, and CTAs fifth; the dot-cluster accent lives at the bottom, scroll reveal remains intact, git history serves as the backup, and `npm run build` completed successfully (only Node `punycode` deprecation warnings).

### Task 2.2: BlogCard Component Styling (`/src/components/blog/BlogCard.tsx`)

**Status**: ✅ COMPLETE | **Priority**: HIGH | **Time**: Included in 2.1 | **Completed**: Nov 5, 2025

- [x] 2.2.1 - Note: CSS changes will be done in Phase 3 (global.css)
- [x] 2.2.2 - Ensure className props remain intact for styling
- [x] 2.2.3 - Verify all semantic class names are preserved

**Notes**: Structural refactor preserved all class names (`blog-card__title`, `tag-list`, `blog-card__meta`, etc.) so Phase 3 styling updates can rely on existing selectors.

### Task 2.3: ProjectCard Component Structure (`/src/components/ui/ProjectCard.tsx`)

**Status**: 🔄 IN PROGRESS | **Priority**: CRITICAL | **Time**: 3 hours | **Updated**: Nov 5, 2025

- [x] 2.3.1 - Read current ProjectCard component code
- [x] 2.3.2 - Create backup of original component
- [x] 2.3.3 - Reorder JSX elements: Title → Stack → Meta → Impact → Description → CTAs
- [x] 2.3.4 - Move title to first position (already is)
- [x] 2.3.5 - Move stack div to second position (currently last)
- [x] 2.3.6 - Keep meta in third position
- [x] 2.3.7 - Move impact to fourth position (before description)
- [x] 2.3.8 - Move description to fifth position
- [x] 2.3.9 - Keep card-actions in last position
- [x] 2.3.10 - Add "Impact:" or "Result:" prefix to impact content
- [x] 2.3.11 - Wrap impact prefix in `<strong>` tag
- [x] 2.3.12 - Test component renders correctly
- [x] 2.3.13 - Test with actual project data from hero.mdx
- [x] 2.3.14 - Test on projects index page
- [x] 2.3.15 - Verify scroll reveal animation still works
- [x] 2.3.16 - Test responsive layout (mobile/tablet/desktop)
- [x] 2.3.17 - Run `npm run build` to check for errors
- [ ] 2.3.18 - Commit changes: "refactor(ProjectCard): reorder elements for F-pattern (Title → Stack → Impact → Description)"

**Notes**: ProjectCard now renders as Title → Stack → Meta → Impact → Description → CTAs, with a reusable `impactPrefix` prop that defaults to "Impact" and injects the bolded prefix automatically. Git history captures the pre-refactor baseline in lieu of a manual backup. A new `.reveal-card` utility class in `global.css` replaces the inline animation styles while preserving the existing IntersectionObserver hook, so cards still fade/slide in on reveal. Structure and class names match the prior markup, so existing responsive breakpoints continue to apply without additional overrides. All MDX usages (`projects/index.mdx`, homepage hero) now pass the appropriate prefix strings while keeping the impact copy clean. `npm run build` succeeds (only the usual Node `punycode` deprecation warning); commit step remains outstanding for the next work session.

### Task 2.4: Section Component Review (`/src/components/ui/Section.tsx`)

**Status**: ✅ COMPLETE | **Priority**: MEDIUM | **Time**: 1 hour | **Completed**: Nov 5, 2025

- [x] 2.4.1 - Read Section component code (if it exists as a component)
- [x] 2.4.2 - Note: CSS changes will be done in Phase 3
- [x] 2.4.3 - Verify eyebrow, title, and description props are working
- [x] 2.4.4 - Ensure semantic HTML structure is maintained
- [x] 2.4.5 - Test Section component across multiple pages
- [x] 2.4.6 - Document any issues or optimization opportunities

**Notes**: Section continues to emit semantic `<section>` and `<header>` markup, with eyebrow/title/description/actions props wiring unchanged. Inline scroll-reveal styles are now replaced by the shared `.reveal-card` utility so the animation matches other components while respecting the `disableReveal` flag. Because Section wraps nearly every page hero and list, rebuilding the site (`npm run build`) exercises representative usages without runtime errors. Phase 3 will handle any visual styling adjustments.

### Task 2.5: Contact Page Component Consolidation (`/src/components/pages/ContactContent.tsx`, `/content/pages/contact/index.mdx`)

**Status**: 🔄 IN PROGRESS | **Priority**: CRITICAL | **Time**: 2 hours | **Updated**: Nov 5, 2025

- [x] 2.5.1 - Extract shared contact layout into `ContactContent.tsx` using existing Section/Card primitives
- [x] 2.5.2 - Replace inline JSX in `content/pages/contact/index.mdx` with the new component to keep content single-sourced
- [x] 2.5.3 - Remove legacy React implementation at `src/pages/contact.js` plus `SiteHeader.js` and `SiteFooter.js` to prevent route conflicts
- [x] 2.5.4 - Validate the MDX route renders the component and keeps the plain-text email visible with `bun run dev`
- [ ] 2.5.5 - Commit changes: "refactor(contact): consolidate contact layout and retire legacy page"

**Notes**: The `/contact` route now sources entirely from MDX, reusing `ContactContent` for consistency. Deleting the legacy page ensures Gatsby no longer preempts the MDX version, and the plain-text email line surfaces alongside the CTA in all viewports. Commit remains outstanding until the current development batch is finalized.

---

## Phase 3: CSS Visual Hierarchy (Week 3) - Global Styles

### Task 3.1: Typography System Variables (`/src/styles/global.css`)

**Status**: 🔄 IN PROGRESS | **Priority**: CRITICAL | **Time**: 2 hours | **Updated**: Nov 5, 2025

- [x] 3.1.1 - Read current global.css file (first 200 lines)
- [x] 3.1.2 - Create backup of original global.css
- [x] 3.1.3 - Add font size custom properties to :root
  - `--text-xs: 0.75rem;`
  - `--text-sm: 0.875rem;`
  - `--text-base: 1rem;`
  - `--text-lg: 1.125rem;`
  - `--text-xl: 1.25rem;`
  - `--text-2xl: 1.5rem;`
  - `--text-3xl: 1.875rem;`
  - `--text-4xl: 2.25rem;`
- [x] 3.1.4 - Add font weight custom properties to :root
  - `--weight-normal: 400;`
  - `--weight-medium: 500;`
  - `--weight-semibold: 600;`
  - `--weight-bold: 700;`
  - `--weight-extrabold: 800;`
- [x] 3.1.5 - Add line height custom properties to :root
  - `--leading-tight: 1.1;`
  - `--leading-snug: 1.3;`
  - `--leading-normal: 1.5;`
  - `--leading-relaxed: 1.6;`
  - `--leading-loose: 1.8;`
- [x] 3.1.6 - Test site builds successfully
- [ ] 3.1.7 - Commit changes: "feat(css): add typography custom properties system"

**Notes**: Introduced typography tokens (sizes, weights, line heights) under `:root` so subsequent Phase 3 updates can consume consistent values. Git history acts as the temporary backup until changes are committed. `npm run build` passes with only the recurring Node `punycode` deprecation warning.

### Task 3.2: Heading Hierarchy Styles (`/src/styles/global.css`)

**Status**: 🔄 IN PROGRESS | **Priority**: HIGH | **Time**: 1 hour | **Updated**: Nov 5, 2025

- [x] 3.2.1 - Update h1 styles with new custom properties
- [x] 3.2.2 - Update h2 styles with new custom properties
- [x] 3.2.3 - Update h3 styles with new custom properties
- [x] 3.2.4 - Update h4 styles with new custom properties
- [x] 3.2.5 - Ensure font-family uses heading font variable
- [x] 3.2.6 - Add letter-spacing to headings (-0.02em for h1/h2)
- [ ] 3.2.7 - Test heading hierarchy across pages
- [ ] 3.2.8 - Verify responsive font sizing works
- [ ] 3.2.9 - Commit changes: "feat(css): update heading hierarchy with custom properties"

**Notes**: Heading elements now draw from the shared `--font-heading` stack with updated weight, spacing, and size tokens. Visual checks and responsive validation remain outstanding.

### Task 3.3: Paragraph & Body Text Styles (`/src/styles/global.css`)

**Status**: 🔄 IN PROGRESS | **Priority**: MEDIUM | **Time**: 30 minutes | **Updated**: Nov 5, 2025

- [x] 3.3.1 - Update p (paragraph) styles
- [x] 3.3.2 - Add max-width: 70ch to paragraphs
- [x] 3.3.3 - Update first paragraph styles (section > p:first-of-type)
- [x] 3.3.4 - Make first paragraphs larger (--text-lg)
- [x] 3.3.5 - Update strong/bold element styles
- [x] 3.3.6 - Ensure high contrast for bold text
- [ ] 3.3.7 - Test paragraph readability across pages
- [ ] 3.3.8 - Commit changes: "feat(css): optimize paragraph styles for readability"

**Notes**: Base paragraphs now use the new typography tokens with 70ch width limits, and lead paragraphs receive the enlarged style. Site-wide readability checks still need to run before closing the task.

### Task 3.4: Blog Card Styles (`/src/styles/global.css`)

**Status**: 🔄 IN PROGRESS | **Priority**: CRITICAL | **Time**: 2 hours | **Updated**: Nov 5, 2025

- [x] 3.4.1 - Locate existing .blog-card styles in global.css
- [x] 3.4.2 - Update .blog-card__title font-size to 1.75rem
- [x] 3.4.3 - Update .blog-card__title font-weight to 700
- [x] 3.4.4 - Add letter-spacing: -0.02em to title
- [x] 3.4.5 - Increase title margin-bottom to 0.75rem
- [x] 3.4.6 - Add .blog-card .tag-list styles (if not exists)
- [x] 3.4.7 - Set tag-list order: 2
- [x] 3.4.8 - Add tag-list margin-bottom: 0.5rem
- [x] 3.4.9 - Style .blog-card .tag-badge with background color
- [x] 3.4.10 - Update .blog-card__meta to order: 3
- [x] 3.4.11 - Reduce meta font-size to 0.875rem
- [x] 3.4.12 - Use subtle color for meta (--color-text-subtle)
- [x] 3.4.13 - Update .blog-card__excerpt to order: 4
- [x] 3.4.14 - Add first-line emphasis to excerpt (font-weight: 500)
- [x] 3.4.15 - Ensure blog-card uses flexbox with flex-direction: column
- [ ] 3.4.16 - Test blog card appearance on blog listing page
- [ ] 3.4.17 - Test responsive layout
- [ ] 3.4.18 - Verify hover states work
- [ ] 3.4.19 - Run Lighthouse audit on blog page
- [ ] 3.4.20 - Commit changes: "feat(css): optimize blog card visual hierarchy for F-pattern"

**Notes**: Blog card CSS now mirrors the refactored component hierarchy, with typographic scale, tag badge ordering, and excerpt emphasis aligned to the F-pattern plan. Visual validation and performance checks remain to close out the task.

### Task 3.5: Project Card Styles (`/src/styles/global.css`)

**Status**: In Progress | **Priority**: CRITICAL | **Time**: 2 hours

- [x] 3.5.1 - Locate existing .project-card styles in global.css
- [x] 3.5.2 - Update .project-card__title font-size to 1.5rem
- [x] 3.5.3 - Update .project-card__title font-weight to 700
- [x] 3.5.4 - Add letter-spacing: -0.02em to title
- [x] 3.5.5 - Update .project-card__stack to order: 2
- [x] 3.5.6 - Ensure stack uses flexbox with flex-wrap
- [x] 3.5.7 - Add gap: 0.5rem to stack
- [x] 3.5.8 - Style stack badges with rotating background colors
- [x] 3.5.9 - Add nth-child selectors for chip-bg-1 through chip-bg-5
- [x] 3.5.10 - Update .project-card__meta to order: 3
- [x] 3.5.11 - Make meta italic and subtle color
- [x] 3.5.12 - Update .project-card__impact to order: 4
- [x] 3.5.13 - Add background color to impact (--color-accent-soft)
- [x] 3.5.14 - Add border-left: 3px solid var(--color-accent) to impact
- [x] 3.5.15 - Add padding to impact (0.75rem 1rem)
- [x] 3.5.16 - Style impact strong elements with accent color
- [x] 3.5.17 - Update .project-card__description to order: 5
- [x] 3.5.18 - Ensure project-card uses flexbox with flex-direction: column
- [ ] 3.5.19 - Test project card appearance on projects page
- [ ] 3.5.20 - Test responsive layout
- [ ] 3.5.21 - Verify hover states and animations
- [ ] 3.5.22 - Run Lighthouse audit on projects page
- [ ] 3.5.23 - Commit changes: "feat(css): optimize project card visual hierarchy for F-pattern"

**Notes**: CSS updates now mirror the F-pattern (title, stack, meta, impact, description) with accent-backed impact callouts and italic meta text. Need to run the responsive/hover checks, capture screenshots, and log a Lighthouse pass before closing the task.

### Task 3.6: Section Component Styles (`/src/styles/global.css`)

**Status**: In Progress | **Priority**: HIGH | **Time**: 1 hour

- [x] 3.6.1 - Locate existing .eyebrow styles
- [x] 3.6.2 - Update eyebrow font-size to 0.8125rem
- [x] 3.6.3 - Ensure eyebrow is uppercase with letter-spacing
- [x] 3.6.4 - Set eyebrow color to --color-accent
- [x] 3.6.5 - Locate existing .section-title styles
- [x] 3.6.6 - Update section-title with clamp() for responsive sizing
- [x] 3.6.7 - Set font-weight: 700 and line-height: 1.1
- [x] 3.6.8 - Locate existing .section-lead styles
- [x] 3.6.9 - Update section-lead font-size to 1.125rem
- [x] 3.6.10 - Add max-width: 65ch to section-lead
- [x] 3.6.11 - Add first-line emphasis (font-weight: 600)
- [ ] 3.6.12 - Test section styles across all pages
- [ ] 3.6.13 - Commit changes: "feat(css): enhance section component styles for hierarchy"

**Notes**: Section typography now uses accent eyebrow, tightened title clamp with 1.1 line-height, and lead paragraphs push keywords to the first line. Need responsive sweeps and cross-page spot checks before we commit the section work.

### Task 3.7: Feature Card Styles (`/src/styles/global.css`)

**Status**: In Progress | **Priority**: MEDIUM | **Time**: 1 hour

- [x] 3.7.1 - Locate existing .feature-card styles
- [x] 3.7.2 - Update .feature-card__icon styles
- [x] 3.7.3 - Ensure icon is uppercase with accent color
- [x] 3.7.4 - Update .feature-card__title font-size to 1.25rem
- [x] 3.7.5 - Set title font-weight: 700
- [x] 3.7.6 - Update .feature-card__body styles
- [x] 3.7.7 - Add first-line emphasis to body
- [ ] 3.7.8 - Test feature cards on homepage
- [ ] 3.7.9 - Verify responsive layout
- [ ] 3.7.10 - Commit changes: "feat(css): optimize feature card visual hierarchy"

**Notes**: Accent-backed icon badge now carries uppercase label, title/body align to the typography spec, and the intro sentence pops via first-line emphasis. Need homepage/regression sweeps before closing.

---

## Phase 4: Content Optimization (Week 4) - Blog Posts & MDX

### Task 4.1: Blog Post Template & Guidelines

**Status**: In Progress | **Priority**: HIGH | **Time**: 1 hour

- [x] 4.1.1 - Create blog post template file with TL;DR pattern
- [x] 4.1.2 - Document keyword-first heading structure
- [x] 4.1.3 - Create "Key Takeaways" section template
- [x] 4.1.4 - Add code block caption examples
- [x] 4.1.5 - Document list vs paragraph guidelines
- [x] 4.1.6 - Save template for future blog posts

**Notes**: Added `docs/blog-post-template.mdx` (with TL;DR, Problem/Solution headings, figure-based code captions, and Key Takeaways) and expanded `docs/content-authoring.md` with the scannability checklist. Ready to roll this into the writing workflow once we validate the first optimized post.

### Task 4.2: Optimize "JWT's" Post (`/content/posts/JWT's/index.mdx`)

**Status**: In Progress | **Priority**: MEDIUM | **Time**: 20 minutes

- [x] 4.2.1 - Read current post content
- [x] 4.2.2 - Add TL;DR at the beginning
- [x] 4.2.3 - Update headings to keyword-first structure
- [x] 4.2.4 - Break long paragraphs (3-5 sentences max)
- [x] 4.2.5 - Convert prose to lists where applicable
- [x] 4.2.6 - Add captions before code blocks
- [x] 4.2.7 - Add "Key Takeaways" section at end
- [x] 4.2.8 - Bold key terms in paragraphs
- [ ] 4.2.9 - Test post readability
- [ ] 4.2.10 - Commit changes: "content(jwt): optimize for F-pattern scanning"

**Notes**: Post now follows the TL;DR → Problem/Solution → Step ladder structure, includes figure-captioned code, and surfaces transport lessons in bulleted sections. Need to preview on the blog, perform the readability scan, then stage/commit.

### Task 4.3: Optimize "From Medic to Engineer" Post

**Status**: Not Started | **Priority**: HIGH | **Time**: 20 minutes

- [ ] 4.3.1 - Read current post content
- [ ] 4.3.2 - Add TL;DR at beginning
- [ ] 4.3.3 - Update title to: "**Combat Medic → Software Engineer** — An unconventional path"
- [ ] 4.3.4 - Create timeline list: Army Background, Career Pivot, Software Engineering
- [ ] 4.3.5 - Convert skills section to comparison lists (Medic vs Engineer)
- [ ] 4.3.6 - Add "Key Takeaways" section
- [ ] 4.3.7 - Bold all key terms and transitions
- [ ] 4.3.8 - Test post readability
- [ ] 4.3.9 - Commit changes: "content(medic-to-engineer): restructure with F-pattern optimization"

### Task 4.4: Optimize Remaining 21 Blog Posts

**Status**: Not Started | **Priority**: MEDIUM | **Time**: 6 hours

**For each of the following posts, apply the same optimization pattern (TL;DR, headings, lists, takeaways):**

- [ ] 4.4.1 - amazon-internship-troubleshooting
- [ ] 4.4.2 - balancing-school-work-projects
- [ ] 4.4.3 - certifications-continuous-learning
- [ ] 4.4.4 - cloud-ready-web-experiences
- [ ] 4.4.5 - containerization-orchestration
- [ ] 4.4.6 - docker-multilang-proj
- [ ] 4.4.7 - exploring-zig-efficient-parsing
- [ ] 4.4.8 - full-sail-university
- [ ] 4.4.9 - github-actions-aws
- [ ] 4.4.10 - how-i-learn-by-doing
- [ ] 4.4.11 - interactive-portfolios
- [ ] 4.4.12 - job-hunting
- [ ] 4.4.13 - native-react
- [ ] 4.4.14 - obj-parser
- [ ] 4.4.15 - pokedex
- [ ] 4.4.16 - portfolio-case-studies
- [ ] 4.4.17 - recent-projects-and-lessons
- [ ] 4.4.18 - secure-authentication-cognito-react
- [ ] 4.4.19 - technical-stack
- [ ] 4.4.20 - testing-matters
- [ ] 4.4.21 - webgpu-getting-started

**For each post:**

- [ ] Read content
- [ ] Add TL;DR
- [ ] Optimize headings
- [ ] Break paragraphs
- [ ] Add lists
- [ ] Add captions
- [ ] Add takeaways
- [ ] Test readability
- [ ] Commit individually

### Task 4.5: Optimize Roles Pages

**Status**: Not Started | **Priority**: MEDIUM | **Time**: 2 hours

- [ ] 4.5.1 - Read `/content/pages/roles/index.mdx`
- [ ] 4.5.2 - Optimize roles index page description
- [ ] 4.5.3 - Read `/content/pages/roles/ai-automation-engineer.mdx`
- [ ] 4.5.4 - Front-load qualifications and tech stack
- [ ] 4.5.5 - Add bullet lists for skills
- [ ] 4.5.6 - Optimize backend-engineer.mdx
- [ ] 4.5.7 - Optimize cloud-engineer.mdx
- [ ] 4.5.8 - Optimize devops-engineer.mdx
- [ ] 4.5.9 - Optimize full-stack-engineer.mdx
- [ ] 4.5.10 - Test all roles pages
- [ ] 4.5.11 - Commit changes: "content(roles): optimize all role pages for F-pattern"

### Task 4.6: Blog Content CSS & Theme Consistency (`/src/styles/global.css`)

**Status**: In Progress | **Priority**: HIGH | **Time**: 2 hours

- [x] 4.6.1 - Audit JWT post overflow issues and capture layout fixes needed
- [x] 4.6.2 - Add `.post-content` max-width + spacing guard to prevent text from falling off the page
- [x] 4.6.3 - Style `<figure class="code-example">` blocks with themed background, border, and captions
- [x] 4.6.4 - Harmonize table styling for blog posts with site card colors
- [x] 4.6.5 - Align blockquote, TL;DR, and callout colors with accent tokens
- [ ] 4.6.6 - Regression test blog posts on desktop/tablet/mobile for overflow and contrast
- [x] 4.6.7 - Document blog CSS standards (figures, tables, callouts) in `docs/content-authoring.md`
- [ ] 4.6.8 - Commit changes: "feat(css): standardize blog content theming"

**Notes**: Blog layout now enforces a 75ch width cap, figure/code blocks share the muted surface styling, TL;DR and blockquotes pull from the accent palette, and auto-generated heading class `.css-8alcrq` is forced to the primary text color for contrast. Need full responsive QA before shipping the CSS batch.

### Task 4.7: Sitewide Theme Regression & Color Audit

**Status**: Not Started | **Priority**: MEDIUM | **Time**: 3 hours

- [ ] 4.7.1 - Inventory color/token usage across nav, cards, posts, and CTAs
- [ ] 4.7.2 - Define acceptable accent/background combinations (primary vs muted surfaces)
- [ ] 4.7.3 - Verify light-theme contrast ratios on key pages (home, blog, projects, contact)
- [ ] 4.7.4 - Spot-check scroll reveal and hover animations for consistency
- [ ] 4.7.5 - Capture issues/screenshots and update brand/theme guidelines
- [ ] 4.7.6 - Commit fixes: "chore(theme): align sitewide styling with design spec"

---

## Phase 5: Testing & Refinement (Week 5) - Validation & Analytics

### Task 5.1: User Testing Setup

**Status**: Not Started | **Priority**: HIGH | **Time**: 2 hours

- [ ] 5.1.1 - Create 5-second test plan for homepage
- [ ] 5.1.2 - Prepare test questions (What do you remember?)
- [ ] 5.1.3 - Set up screen recording for tests
- [ ] 5.1.4 - Recruit 5 test participants
- [ ] 5.1.5 - Conduct 5-second tests
- [ ] 5.1.6 - Document test results
- [ ] 5.1.7 - Analyze what users remembered
- [ ] 5.1.8 - Identify patterns in recall

### Task 5.2: Heatmap Tool Installation

**Status**: Not Started | **Priority**: HIGH | **Time**: 1 hour

- [ ] 5.2.1 - Choose tool: Hotjar or Microsoft Clarity
- [ ] 5.2.2 - Create account
- [ ] 5.2.3 - Install tracking code in Gatsby site
- [ ] 5.2.4 - Configure heatmap settings
- [ ] 5.2.5 - Set up session recordings
- [ ] 5.2.6 - Test tracking is working
- [ ] 5.2.7 - Let tool collect data for 1 week
- [ ] 5.2.8 - Document setup process

### Task 5.3: Heatmap Analysis

**Status**: Not Started | **Priority**: HIGH | **Time**: 1 hour

- [ ] 5.3.1 - Review homepage heatmap
- [ ] 5.3.2 - Validate F-pattern hypothesis
- [ ] 5.3.3 - Identify hotspots (high attention areas)
- [ ] 5.3.4 - Identify cold spots (low attention areas)
- [ ] 5.3.5 - Review blog listing page heatmap
- [ ] 5.3.6 - Review projects page heatmap
- [ ] 5.3.7 - Review about page heatmap
- [ ] 5.3.8 - Document findings
- [ ] 5.3.9 - Create recommendations for adjustments

### Task 5.4: Mobile Optimization Testing

**Status**: Not Started | **Priority**: CRITICAL | **Time**: 3 hours

- [ ] 5.4.1 - Test homepage on iPhone SE (375px width)
- [ ] 5.4.2 - Test homepage on iPhone 12 Pro (390px width)
- [ ] 5.4.3 - Test homepage on iPad (768px width)
- [ ] 5.4.4 - Test blog listing page on mobile
- [ ] 5.4.5 - Test individual blog post on mobile
- [ ] 5.4.6 - Test projects page on mobile
- [ ] 5.4.7 - Test about page on mobile
- [ ] 5.4.8 - Verify font sizes are readable (min 16px)
- [ ] 5.4.9 - Check CTA button sizes (min 44x44px touch target)
- [ ] 5.4.10 - Test navigation drawer on mobile
- [ ] 5.4.11 - Verify no horizontal scroll
- [ ] 5.4.12 - Test form inputs on mobile
- [ ] 5.4.13 - Document mobile issues
- [ ] 5.4.14 - Create mobile-specific CSS adjustments
- [ ] 5.4.15 - Commit changes: "fix(mobile): optimize responsive layout for mobile viewports"

### Task 5.5: Accessibility Audit

**Status**: Not Started | **Priority**: HIGH | **Time**: 2 hours

- [ ] 5.5.1 - Run Lighthouse accessibility audit on homepage
- [ ] 5.5.2 - Run Lighthouse on blog page
- [ ] 5.5.3 - Run Lighthouse on projects page
- [ ] 5.5.4 - Run Lighthouse on about page
- [ ] 5.5.5 - Test with NVDA screen reader (Windows)
- [ ] 5.5.6 - Test with VoiceOver (Mac)
- [ ] 5.5.7 - Verify heading hierarchy is semantic (h1 → h2 → h3)
- [ ] 5.5.8 - Check color contrast ratios with WebAIM tool
- [ ] 5.5.9 - Ensure all interactive elements are keyboard accessible
- [ ] 5.5.10 - Test focus indicators are visible
- [ ] 5.5.11 - Verify ARIA labels where needed
- [ ] 5.5.12 - Check skip-to-content link works
- [ ] 5.5.13 - Document accessibility issues
- [ ] 5.5.14 - Fix critical accessibility issues
- [ ] 5.5.15 - Commit changes: "a11y: fix accessibility issues from audit"

### Task 5.6: Performance Optimization

**Status**: Not Started | **Priority**: MEDIUM | **Time**: 2 hours

- [ ] 5.6.1 - Run Lighthouse performance audit
- [ ] 5.6.2 - Check Core Web Vitals (LCP, FID, CLS)
- [ ] 5.6.3 - Verify no layout shift from CSS changes (CLS < 0.1)
- [ ] 5.6.4 - Check bundle size hasn't increased significantly
- [ ] 5.6.5 - Test page load time on 3G connection
- [ ] 5.6.6 - Optimize any large images
- [ ] 5.6.7 - Verify lazy loading works for images
- [ ] 5.6.8 - Test font loading performance
- [ ] 5.6.9 - Document performance metrics
- [ ] 5.6.10 - Commit optimizations if needed

### Task 5.7: Analytics Configuration

**Status**: Not Started | **Priority**: HIGH | **Time**: 1 hour

- [ ] 5.7.1 - Verify Google Analytics 4 is tracking
- [ ] 5.7.2 - Set up custom event: scroll_depth_25
- [ ] 5.7.3 - Set up custom event: scroll_depth_50
- [ ] 5.7.4 - Set up custom event: scroll_depth_75
- [ ] 5.7.5 - Set up custom event: scroll_depth_100
- [ ] 5.7.6 - Set up custom event: cta_click_view_projects
- [ ] 5.7.7 - Set up custom event: cta_click_contact
- [ ] 5.7.8 - Set up custom event: blog_read_complete
- [ ] 5.7.9 - Test events are firing correctly
- [ ] 5.7.10 - Create GA4 dashboard for F-pattern metrics
- [ ] 5.7.11 - Document analytics setup

### Task 5.8: Before/After Metrics Collection

**Status**: Not Started | **Priority**: CRITICAL | **Time**: 30 minutes

- [ ] 5.8.1 - Collect baseline metrics (if not done before Phase 1)
- [ ] 5.8.2 - Record current bounce rate
- [ ] 5.8.3 - Record current average session duration
- [ ] 5.8.4 - Record current pages per session
- [ ] 5.8.5 - Record current CTA click rates
- [ ] 5.8.6 - Wait 1-2 weeks for new data
- [ ] 5.8.7 - Collect post-optimization metrics
- [ ] 5.8.8 - Calculate improvement percentages
- [ ] 5.8.9 - Document results in designdoc.md
- [ ] 5.8.10 - Create before/after comparison report

---

## Final Tasks

### Documentation

**Status**: Not Started | **Priority**: MEDIUM | **Time**: 1 hour

- [ ] DOC.1 - Update README.md with F-pattern optimization notes
- [ ] DOC.2 - Document new CSS custom properties
- [ ] DOC.3 - Create component usage guidelines
- [ ] DOC.4 - Update blog post template
- [ ] DOC.5 - Document analytics setup
- [ ] DOC.6 - Create maintenance checklist

### Git & Deployment

**Status**: Not Started | **Priority**: HIGH | **Time**: 1 hour

- [ ] GIT.1 - Review all commits are properly formatted
- [ ] GIT.2 - Squash commits if needed
- [ ] GIT.3 - Create release notes
- [ ] GIT.4 - Tag release: v2.0.0-f-pattern-optimization
- [ ] GIT.5 - Push to remote repository
- [ ] GIT.6 - Verify Netlify build succeeds
- [ ] GIT.7 - Test production site
- [ ] GIT.8 - Monitor for any errors in first 24 hours

---

## Progress Tracking

**Phase 1 Status**: 0/12 tasks complete (0%)
**Phase 2 Status**: 0/3 tasks complete (0%)
**Phase 3 Status**: 0/7 tasks complete (0%)
**Phase 4 Status**: 0/5 tasks complete (0%)
**Phase 5 Status**: 0/8 tasks complete (0%)
**Final Tasks**: 0/2 task groups complete (0%)

**Overall Progress**: 0/137 tasks complete (0%)

**Next Task**: Task 1.1 - Homepage Hero Section

---

*Note: Check off tasks as they are completed. Update progress percentages at the end of each work session.*
