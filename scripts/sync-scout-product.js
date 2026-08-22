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

const files = [
  'index.html',
  'pricing.html',
  'styles.css',
  'enhancements.css',
  'pricing.css',
  'scene.js',
  'site.js',
  'site.webmanifest',
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
    .replaceAll('https://bradleymatera.github.io/Scout-product-page/', 'https://bradleymatera.dev/scout/');
  fs.writeFileSync(filePath, html);
}

try {
  execFileSync('git', ['clone', '--depth', '1', '--single-branch', '--branch', 'main', REPO, checkout], {
    stdio: 'inherit',
  });

  fs.rmSync(scoutOut, { recursive: true, force: true });
  fs.mkdirSync(scoutOut, { recursive: true });

  [...files, ...assets].forEach(copyFile);

  rewriteHtml(path.join(scoutOut, 'index.html'));
  rewriteHtml(path.join(scoutOut, 'pricing.html'));

  console.log(`Scout product site synced to ${scoutOut}`);
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
