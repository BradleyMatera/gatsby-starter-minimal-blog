const fs = require('fs');
const path = require('path');

const audit = JSON.parse(fs.readFileSync(path.join(__dirname, 'results', 'audit-production.json'), 'utf8'));
const { summary, results } = audit;

const report = [];

// Axe violations
const axeMap = new Map();
for (const r of results) {
  for (const v of r.axeViolations || []) {
    for (const node of v.nodes || []) {
      const target = (node.target || []).join(', ');
      const key = `${r.page}|${v.id}|${target}`;
      if (!axeMap.has(key)) {
        axeMap.set(key, {
          page: r.page,
          viewport: [r.viewport],
          impact: v.impact,
          rule: v.id,
          help: v.help,
          helpUrl: v.helpUrl,
          target,
          html: node.html,
          count: 0,
        });
      }
      const entry = axeMap.get(key);
      entry.count += 1;
      if (!entry.viewport.includes(r.viewport)) entry.viewport.push(r.viewport);
    }
  }
}

const severityRank = { critical: 1, serious: 2, moderate: 3, minor: 4 };
const axeFindings = Array.from(axeMap.values()).sort((a, b) => severityRank[a.impact] - severityRank[b.impact]);

// Console/page errors
const consoleMap = new Map();
const pageErrorMap = new Map();
const failedMap = new Map();
const headingMap = new Map();

for (const r of results) {
  for (const e of r.consoleErrors || []) {
    const key = `${r.page}|${e.text}`;
    if (!consoleMap.has(key)) {
      consoleMap.set(key, { page: r.page, viewport: [], text: e.text, type: e.type, count: 0 });
    }
    const entry = consoleMap.get(key);
    entry.count += 1;
    if (!entry.viewport.includes(r.viewport)) entry.viewport.push(r.viewport);
  }

  for (const e of r.pageErrors || []) {
    const key = `${r.page}|${e}`;
    if (!pageErrorMap.has(key)) {
      pageErrorMap.set(key, { page: r.page, viewport: [], text: e, count: 0 });
    }
    const entry = pageErrorMap.get(key);
    entry.count += 1;
    if (!entry.viewport.includes(r.viewport)) entry.viewport.push(r.viewport);
  }

  for (const f of r.failedRequests || []) {
    const key = `${r.page}|${f.status}|${f.url}`;
    if (!failedMap.has(key)) {
      failedMap.set(key, { page: r.page, viewport: [], status: f.status, url: f.url, count: 0 });
    }
    const entry = failedMap.get(key);
    entry.count += 1;
    if (!entry.viewport.includes(r.viewport)) entry.viewport.push(r.viewport);
  }

  if (r.h1Count === 0) {
    headingMap.set(`${r.page}`, { page: r.page, issue: 'Missing h1' });
  }
}

report.push(`# UI/UX Bug Hunt Report — Production`);
report.push(`**Base URL:** ${summary.baseUrl}`);
report.push(`**Total axe violations:** ${summary.totalViolations}`);
report.push(`**Console errors:** ${summary.totalConsoleErrors}`);
report.push(`**Page errors:** ${summary.totalPageErrors}`);
report.push(`**Theme toggle check:** ${JSON.stringify(summary.themeCheck)}`);
report.push(`**Mobile menu check:** ${JSON.stringify(summary.menuCheck)}`);
report.push('');

report.push(`## Axe accessibility violations (${axeFindings.length} unique)`);
report.push('');
for (const f of axeFindings) {
  report.push(`- **${f.impact.toUpperCase()}** — ${f.page} — ${f.help}`);
  report.push(`  - Rule: \`${f.rule}\` | Viewports: ${f.viewport.join(', ')}`);
  if (f.target) report.push(`  - Target: \`${f.target}\``);
  if (f.helpUrl) report.push(`  - Help: ${f.helpUrl}`);
}
report.push('');

report.push(`## Console errors (${consoleMap.size} unique)`);
report.push('');
for (const f of consoleMap.values()) {
  report.push(`- ${f.page} (${f.viewport.join(', ')}) — ${f.text.slice(0, 200)}`);
}
report.push('');

report.push(`## Page JavaScript errors (${pageErrorMap.size} unique)`);
report.push('');
for (const f of pageErrorMap.values()) {
  report.push(`- ${f.page} (${f.viewport.join(', ')}) — ${f.text.slice(0, 200)}`);
}
report.push('');

report.push(`## Failed network requests (${failedMap.size} unique)`);
report.push('');
for (const f of failedMap.values()) {
  report.push(`- ${f.page} (${f.viewport.join(', ')}) — ${f.status} ${f.url.slice(0, 200)}`);
}
report.push('');

report.push(`## Heading / structure issues`);
report.push('');
for (const f of headingMap.values()) {
  report.push(`- ${f.page} — ${f.issue}`);
}
report.push('');

report.push(`## Notes`);
report.push(`- Screenshots saved to: \`e2e/screenshots/production\``);
report.push(`- Full audit data: \`e2e/results/audit-production.json\``);
report.push(`- Local dev server was not tested because \`npm run dev\` requires the Netlify CLI and the PowerShell environment made background process start fragile.`);

const reportPath = path.join(__dirname, 'ui-ux-bug-report.md');
fs.writeFileSync(reportPath, report.join('\n'));
console.log(`Report written to ${reportPath}`);
