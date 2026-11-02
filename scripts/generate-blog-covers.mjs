import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import matter from "gray-matter";
import { slugify } from "@lekoarts/themes-utils";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const directory = path.join(root, "src/features/blog/article-visuals");
const routes = new Map();
for (const entry of await fs.readdir(path.join(root, "content/posts"), { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const file = path.join(root, "content/posts", entry.name, "index.mdx");
  const { data } = matter(await fs.readFile(file, "utf8"));
  routes.set((data.slug || entry.name).replace(/^\/+|\/+$/g, ""), slugify({ slug: data.slug, title: data.title }, "/").replace(/\/+$/g, ""));
}
const covers = {};
for (const file of (await fs.readdir(directory)).filter(file => file.endsWith(".json")).sort()) {
  const { slug, cover } = JSON.parse(await fs.readFile(path.join(directory, file), "utf8"));
  const key = routes.get(slug.replace(/^\/+|\/+$/g, ""));
  if (!key) throw new Error(`No article found for cover: ${slug}`);
  const { width, height } = await sharp(path.join(root, "static", cover.src)).metadata();
  await fs.access(path.join(root, "static", cover.mobile));
  if (!width || !height || !cover.alt) throw new Error(`Incomplete cover metadata: ${key}`);
  covers[key] = { ...cover, width, height };
}
const source = `export type ArticleCover = { src: string; mobile: string; alt: string; width: number; height: number };\n\nexport const articleCovers: Record<string, ArticleCover> = ${JSON.stringify(covers, null, 2)};\n\nexport const getArticleCover = (slug: string): ArticleCover | undefined => articleCovers[\`/\${slug.replace(/^\\/+|\\/+$/g, "")}\`];\n`;
await fs.writeFile(path.join(root, "src/features/blog/article-covers.ts"), source);
console.log(`Registered ${Object.keys(covers).length} article covers.`);
