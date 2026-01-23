const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const IMAGE_DIR = path.resolve(__dirname, "../static");
const IGNORE_GLOBS = ["node_modules", "public", ".git"];
const TEXT_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".md",
  ".mdx",
  ".css",
  ".scss",
  ".json",
  ".yml",
  ".yaml",
  ".html",
  ".txt",
  ".svg",
]);

const imageFiles = fs
  .readdirSync(IMAGE_DIR)
  .filter((name) => /\.(jpe?g|png|gif|svg)$/i.test(name));

const renameMap = [];

for (const file of imageFiles) {
  const filePath = path.join(IMAGE_DIR, file);
  const stdout = execSync(`sips -g pixelWidth -g pixelHeight "${filePath}"`, {
    encoding: "utf8",
  });
  const widthMatch = stdout.match(/pixelWidth:\s*(\d+)/);
  const heightMatch = stdout.match(/pixelHeight:\s*(\d+)/);
  if (!widthMatch || !heightMatch) {
    continue;
  }
  const width = widthMatch[1];
  const height = heightMatch[1];
  const ext = path.extname(file);
  const base = path.basename(file, ext);
  const newName = `${base}-${width}x${height}${ext}`;
  if (newName === file) {
    continue;
  }
  const newPath = path.join(IMAGE_DIR, newName);
  if (fs.existsSync(newPath)) {
    console.warn(`Skipping ${file} because ${newName} already exists`);
    continue;
  }
  fs.renameSync(filePath, newPath);
  renameMap.push({ oldName: file, newName });
  console.log(`Renamed ${file} → ${newName}`);
}

if (renameMap.length === 0) {
  console.log("No images renamed.");
  process.exit(0);
}

const glob = require("glob");
const repoRoot = path.resolve(__dirname, "..");
const textFiles = glob
  .sync("**/*.*", {
    cwd: repoRoot,
    nodir: true,
    ignore: IGNORE_GLOBS.map((globPath) => `${globPath}/**`),
  })
  .filter((relativePath) => {
    const ext = path.extname(relativePath).toLowerCase();
    return TEXT_EXTENSIONS.has(ext);
  });

for (const { oldName, newName } of renameMap) {
  const oldOccurrences = [];
  for (const relativePath of textFiles) {
    const absolutePath = path.join(repoRoot, relativePath);
    const content = fs.readFileSync(absolutePath, "utf8");
    if (!content.includes(oldName)) {
      continue;
    }
    const updated = content.split(oldName).join(newName);
    fs.writeFileSync(absolutePath, updated);
    oldOccurrences.push(relativePath);
  }
  if (oldOccurrences.length > 0) {
    console.log(
      `Updated references for ${oldName} -> ${newName} in ${oldOccurrences.length} file(s)`
    );
  }
}
