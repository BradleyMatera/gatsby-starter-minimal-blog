/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const fs = require("fs");

const DOWNLOADS_DIR = path.join(__dirname, "downloads");

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
  if (!fs.existsSync(DOWNLOADS_DIR)) return {};

  const files = fs
    .readdirSync(DOWNLOADS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isFile() && !entry.name.startsWith("."))
    .map((entry) => entry.name);

  return files.reduce((acc, filename) => {
    const filePath = path.join(DOWNLOADS_DIR, filename);
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

module.exports = { DOWNLOADS };
