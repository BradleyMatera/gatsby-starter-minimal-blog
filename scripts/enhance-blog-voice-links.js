const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, 'content', 'posts');

const VOICE_START = '{/* auto-enhancement:voice-start */}';
const VOICE_END = '{/* auto-enhancement:voice-end */}';
const LINKS_START = '{/* auto-enhancement:links-start */}';
const LINKS_END = '{/* auto-enhancement:links-end */}';

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return null;

  const fm = match[1];
  const body = raw.slice(match[0].length);
  const getValue = (key) => {
    const m = fm.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
    if (!m) return '';
    return m[1].trim();
  };

  const stripQuotes = (v) => v.replace(/^['\"]|['\"]$/g, '');
  const title = stripQuotes(getValue('title'));
  const slug = stripQuotes(getValue('slug'));
  const date = stripQuotes(getValue('date'));

  const tagsRaw = getValue('tags');
  let tags = [];
  if (tagsRaw.startsWith('[') && tagsRaw.endsWith(']')) {
    const inner = tagsRaw.slice(1, -1).trim();
    tags = inner
      ? inner
          .split(',')
          .map((t) => stripQuotes(t.trim()).toLowerCase())
          .filter(Boolean)
      : [];
  }

  return { frontmatter: fm, body, title, slug, date, tags, matchText: match[0] };
}

function normalizeSlug(slug) {
  if (!slug) return '/';
  if (slug === '/') return slug;
  return slug.endsWith('/') ? slug : `${slug}/`;
}

function words(input) {
  return new Set(
    String(input || '')
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 2)
  );
}

function dayDiff(a, b) {
  const aDate = new Date(a);
  const bDate = new Date(b);
  if (Number.isNaN(aDate.getTime()) || Number.isNaN(bDate.getTime())) return 365;
  return Math.abs((aDate - bDate) / (1000 * 60 * 60 * 24));
}

function detectGroup(post) {
  const tags = new Set((post.tags || []).map((t) => t.toLowerCase()));
  const textWords = new Set(
    `${post.title || ''} ${post.slug || ''}`
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, ' ')
      .split(/\s+/)
      .filter(Boolean)
  );
  const hasAny = (...vals) => vals.some((v) => tags.has(v) || textWords.has(v));

  if (hasAny('webgpu', 'graphics', 'rendering')) return 'graphics';
  if (hasAny('aws', 'azure', 'gcp', 'cloud', 'free-tier', 'costs', 'troubleshooting')) return 'cloud';
  if (hasAny('docker', 'kubernetes', 'devops', 'containers', 'deployment', 'github-actions')) return 'devops';
  if (hasAny('security', 'jwt', 'ctf', 'auth', 'authentication', 'cognito')) return 'security';
  if (hasAny('zig', 'parsing', 'performance', 'obj-parser')) return 'systems';
  if (hasAny('ai', 'llm', 'workflow', 'automation', 'productivity')) return 'ai';
  if (hasAny('portfolio', 'ux', 'web', 'react', 'frontend', 'nextjs', 'gatsby', 'service-worker', 'github-pages')) return 'frontend';
  if (hasAny('career', 'learning', 'process', 'writing', 'mindset', 'education', 'certifications', 'time-management')) return 'career';
  return 'general';
}

function pickFocus(tags) {
  const set = new Set((tags || []).map((t) => t.toLowerCase()));
  if (set.has('webgpu') || set.has('graphics') || set.has('rendering')) {
    return 'graphics pipelines, rendering correctness, and matching docs to real behavior';
  }
  if (set.has('aws') || set.has('azure') || set.has('gcp') || set.has('cloud')) {
    return 'cloud reliability, cost control, and repeatable troubleshooting';
  }
  if (set.has('docker') || set.has('kubernetes') || set.has('devops') || set.has('containers')) {
    return 'deployment consistency, environment parity, and safer release workflows';
  }
  if (set.has('react') || set.has('frontend') || set.has('web') || set.has('ux') || set.has('portfolio')) {
    return 'frontend delivery quality, accessibility, and clear user-facing behavior';
  }
  if (set.has('ai') || set.has('workflow') || set.has('automation') || set.has('productivity')) {
    return 'practical AI-assisted workflows with explicit quality checks';
  }
  if (set.has('security') || set.has('jwt') || set.has('ctf') || set.has('auth')) {
    return 'security validation and reducing false confidence from partial checks';
  }
  if (set.has('zig') || set.has('parsing') || set.has('performance')) {
    return 'performance-sensitive implementation details and verifiable parser behavior';
  }
  if (set.has('career') || set.has('learning') || set.has('process') || set.has('writing')) {
    return 'career execution with practical systems, documentation, and measurable progress';
  }
  return 'shipping software with clear documentation and observable outcomes';
}

function makeVoiceBlock(post) {
  const focus = pickFocus(post.tags);
  const variants = [
    [
      `I wrote this from my own build notes while focusing on ${focus}.`,
      `I keep this kind of post operational on purpose so another person, or future me, can rerun it without guessing where decisions came from.`,
      `If you adapt this flow, track what you changed and why at each step so your final setup stays explainable.`
    ],
    [
      `This guide reflects how I actually execute work when the goal is ${focus}.`,
      `I prefer explicit checklists over vague advice because that is what keeps delivery stable when timelines are tight.`,
      `Use the steps as a baseline, then annotate your own environment differences as you go.`
    ],
    [
      `I assembled this post from real implementation reps centered on ${focus}.`,
      `The structure is intentional: I want the sequence to be audit-friendly so troubleshooting later is faster.`,
      `When you run this yourself, capture outcomes after each major step to keep your changes reproducible.`
    ],
  ];

  const idx = Math.abs(Array.from(post.slug || '').reduce((acc, ch) => acc + ch.charCodeAt(0), 0)) % variants.length;
  const lines = variants[idx];

  return [
    VOICE_START,
    '',
    '## Personal Build Reflection',
    '',
    lines[0],
    '',
    lines[1],
    '',
    lines[2],
    '',
    VOICE_END,
  ].join('\n');
}

function groupLabel(group) {
  const labels = {
    graphics: 'Graphics',
    cloud: 'Cloud',
    devops: 'DevOps',
    security: 'Security',
    systems: 'Systems',
    ai: 'AI Workflow',
    frontend: 'Frontend',
    career: 'Career',
    general: 'Related',
  };
  return labels[group] || labels.general;
}

function makeLinksBlock(post, related, group) {
  const bullets = related.map((r) => `- [${r.title}](${normalizeSlug(r.slug)})`).join('\n');
  const label = groupLabel(group);
  const heading = group === 'general' ? 'Continue Reading on This Site' : `Continue Reading in This ${label} Series`;
  const intro =
    group === 'general'
      ? 'If you want connected breakdowns, these posts are the best next stops:'
      : 'If you want to go deeper on this topic cluster, these are the best next reads:';

  return [
    LINKS_START,
    '',
    `## ${heading}`,
    '',
    intro,
    '',
    bullets,
    '',
    LINKS_END,
  ].join('\n');
}

function replaceOrAppend(body, startMarker, endMarker, block) {
  const start = body.indexOf(startMarker);
  const end = body.indexOf(endMarker);
  if (start !== -1 && end !== -1 && end > start) {
    return `${body.slice(0, start).replace(/\s*$/, '')}\n\n${block}\n\n${body.slice(end + endMarker.length).replace(/^\s*/, '')}`;
  }
  return `${body.replace(/\s*$/, '')}\n\n${block}\n`;
}

function main() {
  const dirs = fs
    .readdirSync(POSTS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  const posts = [];
  for (const dir of dirs) {
    const file = path.join(POSTS_DIR, dir, 'index.mdx');
    if (!fs.existsSync(file)) continue;
    const raw = fs.readFileSync(file, 'utf8');
    const parsed = parseFrontmatter(raw);
    if (!parsed || !parsed.slug || !parsed.title) continue;
    posts.push({
      file,
      raw,
      ...parsed,
      titleWords: words(parsed.title),
      dateValue: new Date(parsed.date),
    });
  }

  let updated = 0;

  for (const post of posts) {
    const group = detectGroup(post);
    const related = posts
      .filter((other) => other.file !== post.file)
      .map((other) => {
        const otherGroup = detectGroup(other);
        const sharedTags = other.tags.filter((t) => post.tags.includes(t)).length;
        let sharedTitleWords = 0;
        for (const w of other.titleWords) {
          if (post.titleWords.has(w)) sharedTitleWords += 1;
        }
        const proximity = Math.max(0, 365 - dayDiff(post.date, other.date));
        const sameGroupBoost = otherGroup === group ? 55 : 0;
        const score = sameGroupBoost + sharedTags * 100 + sharedTitleWords * 8 + proximity / 20;
        return { other, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((r) => r.other);

    const voiceBlock = makeVoiceBlock(post);
    const linksBlock = makeLinksBlock(post, related, group);

    let body = post.body;
    body = replaceOrAppend(body, VOICE_START, VOICE_END, voiceBlock);
    body = replaceOrAppend(body, LINKS_START, LINKS_END, linksBlock);

    const next = `${post.matchText}${body.replace(/\n{3,}/g, '\n\n')}`;
    if (next !== post.raw) {
      fs.writeFileSync(post.file, next, 'utf8');
      updated += 1;
    }
  }

  console.log(`posts_scanned=${posts.length}`);
  console.log(`posts_updated=${updated}`);
}

main();
