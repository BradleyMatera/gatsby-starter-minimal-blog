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
