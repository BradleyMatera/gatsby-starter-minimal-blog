import assert from "node:assert/strict";
import { test } from "node:test";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { slugify } from "@lekoarts/themes-utils";

const root = process.cwd();
const posts = fs.readdirSync(path.join(root, "content/posts"), { withFileTypes: true })
  .filter(entry => entry.isDirectory())
  .map(entry => path.join(root, "content/posts", entry.name, "index.mdx"))
  .filter(file => fs.existsSync(file))
  .map(file => ({ file, ...matter(fs.readFileSync(file, "utf8")) }));
const slugFor = post => (post.data.slug || path.basename(path.dirname(post.file))).replace(/^\/+|\/+$/g, "");

test("cover registration follows Gatsby URLs, including posts without explicit slugs", () => {
  const source = fs.readFileSync(path.join(root, "src/features/blog/article-covers.ts"), "utf8");
  const registry = JSON.parse(source.match(/articleCovers[^=]*= ([\s\S]*?);\n\nexport/)[1]);
  assert.equal(Object.keys(registry).length, posts.length);
  for (const post of posts) {
    const route = slugify({ slug: post.data.slug, title: post.data.title }, "/").replace(/\/+$/g, "");
    assert.equal(registry[route]?.src, `/images/blog/${slugFor(post)}/cover.png`, `${route}: published URL has no matching cover`);
  }
});

test("every published article has its own real cover and at least two embedded visual guides", () => {
  const hashes = new Map();
  const paths = new Set();
  for (const post of posts) {
    const slug = slugFor(post);
    const metadataFile = path.join(root, "src/features/blog/article-visuals", `${slug}.json`);
    assert.ok(fs.existsSync(metadataFile), `${slug}: visual metadata is missing`);
    const metadata = JSON.parse(fs.readFileSync(metadataFile, "utf8"));
    assert.equal(metadata.slug.replace(/^\/+|\/+$/g, ""), slug);
    assert.ok(metadata.cover.alt.length > 20, `${slug}: descriptive cover alt text is missing`);
    assert.equal(metadata.cover.src, `/images/blog/${slug}/cover.png`);
    assert.ok(!paths.has(metadata.cover.src), `${slug}: a cover path was reused`);
    paths.add(metadata.cover.src);
    const image = fs.readFileSync(path.join(root, "static", metadata.cover.src));
    assert.equal(image.subarray(1, 4).toString(), "PNG", `${slug}: cover must be a PNG`);
    const hash = createHash("sha256").update(image).digest("hex");
    assert.ok(!hashes.has(hash), `${slug}: cover duplicates ${hashes.get(hash)}`);
    hashes.set(hash, slug);
    assert.ok(fs.statSync(path.join(root, "static", metadata.cover.mobile)).size > 1000, `${slug}: mobile image is missing`);
    assert.ok(metadata.figures.length >= 2, `${slug}: needs at least two article-specific figures`);
    assert.ok(post.content.includes("<ArticleVisual spec={articleVisuals.figures[0]} />"), `${slug}: first figure is not embedded`);
    assert.ok(post.content.includes("<ArticleVisual spec={articleVisuals.figures[1]} />"), `${slug}: second figure is not embedded`);
    assert.ok(!/\/assets\/visuals\/blog\/[^)\s]+-break-\d+\.(png|webp)/.test(post.content), `${slug}: repeated placeholder graphics remain`);
  }
  assert.equal(hashes.size, posts.length);
});

test("article figures have readable explanations and numeric charts declare their context", () => {
  const allowed = new Set(["flow", "comparison", "layers", "timeline", "checklist", "bar-chart"]);
  const figureTitles = new Set();
  for (const post of posts) {
    const slug = slugFor(post);
    const metadata = JSON.parse(fs.readFileSync(path.join(root, "src/features/blog/article-visuals", `${slug}.json`), "utf8"));
    const ids = new Set();
    for (const figure of metadata.figures) {
      assert.ok(allowed.has(figure.kind), `${slug}: unsupported diagram kind`);
      assert.ok(figure.title && figure.summary && figure.caption, `${slug}: figure needs a title, explanation and caption`);
      assert.ok(!ids.has(figure.id), `${slug}: duplicate figure ID`);
      ids.add(figure.id);
      assert.ok(figure.items.length >= 2 && figure.items.length <= 8, `${slug}: unreasonable figure density`);
      for (const item of figure.items) assert.ok(item.label && item.detail, `${slug}: an item lacks a readable label or explanation`);
      if (figure.kind === "bar-chart") {
        assert.ok(figure.unit, `${slug}: chart units are missing`);
        assert.ok(figure.sourceHref || /article|example|illustrat|document|project|fixture|sample/i.test(figure.caption), `${slug}: chart data context is missing`);
        for (const item of figure.items) assert.ok(Number.isFinite(item.value) && item.value >= 0, `${slug}: invalid chart value`);
      }
      figureTitles.add(figure.title);
    }
  }
  assert.ok(figureTitles.size >= posts.length, "Most visual guides must have article-specific titles");
});
