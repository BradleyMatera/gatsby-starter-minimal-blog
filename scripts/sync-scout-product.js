const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFileSync } = require('child_process');

// Scout is versioned in its own repository. Each Netlify build pulls the current
// product-site source from main, including the reusable-runtime hero copy, full Docs, Learn,
// API,
// Changelog, source snapshots,
// diagrams, scholarly references, vetted learning resources, accounting corrections,
// and the current reference library. The Scout preparation step controls documentation
// initialization and rewrites known stale accounting template text before the files
// are copied into /scout/.
const REPO = 'https://github.com/BradleyMatera/Scout-product-page.git';
const SOURCE_REF = process.env.SCOUT_PRODUCT_REF || 'main';
const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');
const scoutOut = path.join(publicDir, 'scout');
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'scout-product-'));
const checkout = path.join(tempDir, 'repo');

const htmlFiles = [
  'index.html',
  'pricing.html',
  'docs.html',
  'learn.html',
  'api.html',
  'changelog.html',
];

const files = [
  ...htmlFiles,
  'styles.css',
  'enhancements.css',
  'further-reading.css',
  'launch.css',
  'pricing.css',
  'docs.css',
  'learn.css',
  'learn-resources.css',
  'scene.js',
  'site.js',
  'docs.js',
  'docs-graphics.js',
  'learn.js',
  'learn-resources.js',
  'freshness.js',
  'snapshot-refresh.js',
  'accounting-correction.js',
  'site.webmanifest',
  'robots.txt',
  'sitemap.xml',
];

const assets = [
  'assets/scout-mark.svg',
  'assets/scout-og.svg',
  'assets/docs/how-scout-works.svg',
  'assets/docs/retrieval-knowledge-to-evidence.svg',
  'assets/docs/response-contracts.svg',
  'assets/docs/session-state-followups.svg',
  'assets/docs/grounding-validation-repair.svg',
  'assets/docs/source-truth-release-flow.svg',
  'assets/learn/bm25-explained.svg',
  'assets/learn/rrf-explained.svg',
  'assets/learn/edit-distance-explained.svg',
  'assets/learn/retrieval-evaluation.svg',
  'assets/learn/retrieval-is-not-vector.svg',
];

function copyFile(relativePath) {
  const source = path.join(checkout, relativePath);
  const target = path.join(scoutOut, relativePath);
  if (!fs.existsSync(source)) {
    throw new Error(`Scout product file missing: ${relativePath}`);
  }
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
}

function rewriteHtml(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  html = html
    .replaceAll('https://bradleymatera.github.io/Scout-product-page/pricing.html', 'https://bradleymatera.dev/scout/pricing.html')
    .replaceAll('https://bradleymatera.github.io/Scout-product-page/docs.html', 'https://bradleymatera.dev/scout/docs.html')
    .replaceAll('https://bradleymatera.github.io/Scout-product-page/learn.html', 'https://bradleymatera.dev/scout/learn.html')
    .replaceAll('https://bradleymatera.github.io/Scout-product-page/api.html', 'https://bradleymatera.dev/scout/api.html')
    .replaceAll('https://bradleymatera.github.io/Scout-product-page/changelog.html', 'https://bradleymatera.dev/scout/changelog.html')
    .replaceAll('https://bradleymatera.github.io/Scout-product-page/', 'https://bradleymatera.dev/scout/');
  fs.writeFileSync(filePath, html);
}

try {
  execFileSync('git', ['clone', '--depth', '1', '--single-branch', '--branch', SOURCE_REF, REPO, checkout], {
    stdio: 'inherit',
  });

  const sourceCommit = execFileSync('git', ['-C', checkout, 'rev-parse', 'HEAD'], {
    encoding: 'utf8',
  }).trim();

  execFileSync(process.execPath, [path.join(checkout, 'scripts', 'prepare-site.js')], {
    cwd: checkout,
    stdio: 'inherit',
  });

  fs.rmSync(scoutOut, { recursive: true, force: true });
  fs.mkdirSync(scoutOut, { recursive: true });

  [...files, ...assets].forEach(copyFile);
  htmlFiles.forEach(file => rewriteHtml(path.join(scoutOut, file)));

  fs.writeFileSync(
    path.join(scoutOut, 'scout-source.json'),
    `${JSON.stringify({ sourceRepo: 'BradleyMatera/Scout-product-page', sourceRef: SOURCE_REF, sourceCommit }, null, 2)}\n`
  );

  console.log(`Scout product site synced to ${scoutOut} from ${sourceCommit}`);
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
