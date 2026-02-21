/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const fs = require("fs");

const buildCandidateDirs = () => {
  const candidates = [];

  if (process.env.DOWNLOADS_DIR) {
    const configured = process.env.DOWNLOADS_DIR;
    candidates.push(
      path.isAbsolute(configured) ? configured : path.resolve(process.cwd(), configured)
    );
  }

  candidates.push(path.join(__dirname, "downloads"));
  candidates.push(path.join(__dirname, "netlify", "functions", "downloads"));
  candidates.push(path.join(process.cwd(), "netlify", "functions", "downloads"));
  candidates.push(path.join(process.cwd(), "downloads"));

  return [...new Set(candidates)];
};

const resolveDownloadsDir = () => {
  const match = buildCandidateDirs().find((dir) => {
    try {
      return fs.existsSync(dir) && fs.statSync(dir).isDirectory();
    } catch (_error) {
      return false;
    }
  });
  return match || null;
};

const CONTENT_TYPES = {
  ".txt": "text/plain; charset=utf-8",
  ".pdf": "application/pdf",
  ".zip": "application/zip",
  ".csv": "text/csv; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
};

const getContentType = (filename) => {
  const ext = path.extname(filename).toLowerCase();
  return CONTENT_TYPES[ext] || "application/octet-stream";
};

const buildDownloadMap = () => {
  const downloadsDir = resolveDownloadsDir();
  if (!downloadsDir) return {};

  const files = fs
    .readdirSync(downloadsDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && !entry.name.startsWith("."))
    .map((entry) => entry.name);

  return files.reduce((acc, filename) => {
    const filePath = path.join(downloadsDir, filename);
    const fileKey = path.parse(filename).name;
    acc[fileKey] = {
      filePath,
      filename,
      contentType: getContentType(filename),
    };
    return acc;
  }, {});
};

const DOWNLOADS = buildDownloadMap();
const DOWNLOADS_DIR = resolveDownloadsDir();

module.exports = { DOWNLOADS, DOWNLOADS_DIR };
