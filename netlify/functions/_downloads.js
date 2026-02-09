const path = require("path");

const DOWNLOADS = {
  "example-pack": {
    filePath: path.join(__dirname, "downloads", "example-pack.txt"),
    filename: "example-pack.txt",
    contentType: "text/plain; charset=utf-8",
  },
};

module.exports = { DOWNLOADS };
