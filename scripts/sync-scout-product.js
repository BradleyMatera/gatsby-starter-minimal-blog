const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFileSync } = require('child_process');

const REPO = 'https://github.com/BradleyMatera/Scout-product-page.git';
const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');
const scoutOut = path.join(publicDir, 'scout');
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'scout-product-'));
const checkout = path.join(tempDir, 'repo');

const htmlFiles = [
  'index.html',
  'pricing.html',
  'docs.html',
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
  'scene.js',
  'site.js',
  'docs.js',
  'site.webmanifest',
  'robots.txt',
  'sitemap.xml',
];

const assets = [
  'assets/scout-mark.svg',
  'assets/scout-og.svg',
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
    .replaceAll('https://bradleymatera.github.io/Scout-product-page/api.html', 'https://bradleymatera.dev/scout/api.html')
    .replaceAll('https://bradleymatera.github.io/Scout-product-page/changelog.html', 'https://bradleymatera.dev/scout/changelog.html')
    .replaceAll('https://bradleymatera.github.io/Scout-product-page/', 'https://bradleymatera.dev/scout/');
  fs.writeFileSync(filePath, html);
}

try {
  execFileSync('git', ['clone', '--depth', '1', '--single-branch', '--branch', 'main', REPO, checkout], {
    stdio: 'inherit',
  });

  const sourceCommit = execFileSync('git', ['-C', checkout, 'rev-parse', 'HEAD'], {
    encoding: 'utf8',
  }).trim();

  fs.rmSync(scoutOut, { recursive: true, force: true });
  fs.mkdirSync(scoutOut, { recursive: true });

  [...files, ...assets].forEach(copyFile);
  htmlFiles.forEach(file => rewriteHtml(path.join(scoutOut, file)));

  fs.writeFileSync(
    path.join(scoutOut, 'scout-source.json'),
    `${JSON.stringify({ sourceRepo: 'BradleyMatera/Scout-product-page', sourceCommit }, null, 2)}\n`
  );

  console.log(`Scout product site synced to ${scoutOut} from ${sourceCommit}`);
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
