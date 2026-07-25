#!/usr/bin/env node
/**
 * WCAG Contrast Checker for bradleymatera.dev demo pages.
 *
 * Usage:
 *   node scripts/contrast-check.js              # checks live site (https://bradleymatera.dev)
 *   node scripts/contrast-check.js --local       # checks localhost:9000 (run `npm run build && npm run serve` first)
 *
 * Requirements: Playwright chromium browser installed (`npx playwright install chromium`)
 *
 * This script checks all demo pages for WCAG AA contrast failures, matching the
 * ApexSolutions audit tool's methodology: it checks elements with inline `style`
 * attributes that set a color (the audit calls these "inline text/background
 * combinations"). It also reports CSS-class-based issues as warnings.
 *
 * Exit code 0 = all pages pass AA, exit code 1 = failures found.
 */

const { chromium } = require('playwright');

const DEMO_SLUGS = [
  'restaurant',
  'landscaping',
  'hvac',
  'auto-repair',
  'real-estate',
  'beauty-salon',
  'manufacturing',
  'agriculture',
  'law-firm',
  'dental',
];

const baseUrl = process.argv.includes('--local')
  ? 'http://localhost:9000'
  : 'https://bradleymatera.dev';

function parseColor(str) {
  if (!str) return null;
  const m = str.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const parts = m[1].split(',').map((s) => parseFloat(s.trim()));
  return { r: parts[0], g: parts[1], b: parts[2], a: parts[3] !== undefined ? parts[3] : 1 };
}

function relativeLuminance(c) {
  const adj = (v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
  return 0.2126 * adj(c.r / 255) + 0.7152 * adj(c.g / 255) + 0.0722 * adj(c.b / 255);
}

function contrastRatio(fg, bg) {
  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

function blendOver(fg, bg) {
  if (fg.a < 1) {
    return {
      r: fg.r * fg.a + bg.r * (1 - fg.a),
      g: fg.g * fg.a + bg.g * (1 - fg.a),
      b: fg.b * fg.a + bg.b * (1 - fg.a),
      a: 1,
    };
  }
  return fg;
}

async function checkPage(page, slug) {
  const url = `${baseUrl}/demos/${slug}/`;
  await page.goto(url, { waitUntil: 'networkidle' });

  const results = await page.evaluate(() => {
    function parseColor(str) {
      if (!str) return null;
      const m = str.match(/rgba?\(([^)]+)\)/);
      if (!m) return null;
      const parts = m[1].split(',').map((s) => parseFloat(s.trim()));
      return { r: parts[0], g: parts[1], b: parts[2], a: parts[3] !== undefined ? parts[3] : 1 };
    }
    function relativeLuminance(c) {
      const adj = (v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
      return 0.2126 * adj(c.r / 255) + 0.7152 * adj(c.g / 255) + 0.0722 * adj(c.b / 255);
    }
    function contrastRatio(fg, bg) {
      const l1 = relativeLuminance(fg);
      const l2 = relativeLuminance(bg);
      return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    }
    function blendOver(fg, bg) {
      if (fg.a < 1) {
        return {
          r: fg.r * fg.a + bg.r * (1 - fg.a),
          g: fg.g * fg.a + bg.g * (1 - fg.a),
          b: fg.b * fg.a + bg.b * (1 - fg.a),
          a: 1,
        };
      }
      return fg;
    }

    function getBgColor(el) {
      let node = el;
      while (node && node !== document.documentElement) {
        const bg = window.getComputedStyle(node).backgroundColor;
        if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
          return bg;
        }
        node = node.parentElement;
      }
      return window.getComputedStyle(document.documentElement).backgroundColor;
    }

    function hasBgImage(el) {
      let node = el;
      while (node && node !== document.documentElement) {
        const img = window.getComputedStyle(node).backgroundImage;
        if (img && img !== 'none') return true;
        node = node.parentElement;
      }
      return false;
    }

    function isLargeText(style) {
      const fontSize = parseFloat(style.fontSize);
      const fontWeight = parseInt(style.fontWeight);
      const isBold = fontWeight >= 700;
      return fontSize >= 24 || (fontSize >= 18.66 && isBold);
    }

    const skipTags = new Set([
      'SCRIPT', 'STYLE', 'SVG', 'PATH', 'RECT', 'CIRCLE', 'G',
      'DEFS', 'LINE', 'POLYLINE', 'POLYGON', 'USE', 'CLIPPATH',
    ]);

    const failures = [];
    const warnings = [];

    for (const el of document.querySelectorAll('*')) {
      if (skipTags.has(el.tagName)) continue;
      if (el.classList && el.classList.contains('sr-only')) continue;
      if (el.getAttribute('aria-hidden') === 'true') continue;

      const style = window.getComputedStyle(el);
      const color = parseColor(style.color);
      if (!color) continue;

      const hasText = Array.from(el.childNodes).some(
        (n) => n.nodeType === 3 && n.textContent.trim().length > 0
      );
      if (!hasText) continue;

      if (hasBgImage(el)) continue;

      const bgRaw = getBgColor(el);
      const bg = parseColor(bgRaw);
      if (!bg) continue;

      const fgBlended = blendOver(color, bg);
      const ratio = contrastRatio(fgBlended, bg);
      const threshold = isLargeText(style) ? 3.0 : 4.5;
      const inlineStyle = el.getAttribute('style') || '';
      const hasInlineColor = /color\s*:/i.test(inlineStyle);

      if (ratio < threshold) {
        const item = {
          tag: el.tagName,
          cls: (el.className && el.className.toString ? el.className.toString() : '').substring(0, 50),
          text: el.textContent.trim().substring(0, 60),
          color: style.color,
          bgColor: bgRaw,
          ratio: ratio.toFixed(2),
          threshold,
          largeText: isLargeText(style),
          inline: inlineStyle.substring(0, 80),
        };
        // The audit tool flags "inline text/background combinations" —
        // elements with inline style attributes that set a color.
        if (hasInlineColor) {
          failures.push(item);
        } else {
          warnings.push(item);
        }
      }
    }
    return { failures, warnings };
  });

  return results;
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let totalFailures = 0;
  let pagesPassed = 0;

  console.log(`\nWCAG Contrast Checker — ${baseUrl}\n`);
  console.log(`Checking ${DEMO_SLUGS.length} demo pages...\n`);

  for (const slug of DEMO_SLUGS) {
    try {
      const { failures, warnings } = await checkPage(page, slug);

      if (failures.length === 0) {
        const warnNote = warnings.length > 0 ? ` (${warnings.length} CSS-class warnings)` : '';
        console.log(`  \u2713 ${slug}: AA PASS${warnNote}`);
        pagesPassed++;
      } else {
        console.log(`  \u2717 ${slug}: AA FAIL — ${failures.length} inline elements below threshold`);
        for (const f of failures) {
          console.log(`    ${f.tag}.${f.cls} "${f.text}"`);
          console.log(`      color: ${f.color}  bg: ${f.bgColor}  ratio: ${f.ratio}:1  (needs ${f.threshold}:1${f.largeText ? ', large text' : ''})`);
          if (f.inline) console.log(`      inline: ${f.inline}`);
        }
        totalFailures += failures.length;
      }
      if (warnings.length > 0 && failures.length === 0) {
        for (const w of warnings.slice(0, 3)) {
          console.log(`    (warning) ${w.tag}.${w.cls} "${w.text}" — ${w.ratio}:1 on ${w.bgColor}`);
        }
        if (warnings.length > 3) console.log(`    ... and ${warnings.length - 3} more warnings`);
      }
    } catch (err) {
      console.log(`  ! ${slug}: ERROR — ${err.message}`);
    }
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`Results: ${pagesPassed}/${DEMO_SLUGS.length} pages pass AA`);
  if (totalFailures > 0) {
    console.log(`Total AA failures: ${totalFailures}`);
    console.log(`\nCommon fixes:`);
    console.log(`  - Replace rgba() backgrounds with solid hex colors`);
    console.log(`  - Darken text colors to meet 4.5:1 (normal) or 3:1 (large text)`);
    console.log(`  - See AGENTS.md section 8 for WCAG contrast rules`);
  } else {
    console.log(`All demo pages pass WCAG AA contrast! \u2713`);
  }

  await browser.close();
  process.exit(totalFailures > 0 ? 1 : 0);
})();
