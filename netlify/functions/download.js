const fs = require("fs");
const { DOWNLOADS, DOWNLOADS_DIR } = require("./_downloads");
const { verifyToken } = require("./_downloadTokens");

exports.handler = async (event) => {
  const token = event.queryStringParameters?.token;
  if (!token) {
    return { statusCode: 400, body: "Missing download token." };
  }

  const secret = process.env.DOWNLOAD_TOKEN_SECRET;
  if (!secret) {
    return { statusCode: 500, body: "Download token secret not configured." };
  }

  let payload;
  try {
    payload = verifyToken(token, secret);
  } catch (error) {
    return { statusCode: 401, body: "Invalid download token." };
  }

  if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
    return { statusCode: 410, body: "Download link expired." };
  }

  const download = DOWNLOADS[payload.file_key];
  if (!download) {
    console.error("download missing file key", {
      requested_file_key: payload.file_key,
      available_file_keys: Object.keys(DOWNLOADS),
      downloads_dir: DOWNLOADS_DIR,
    });
    return { statusCode: 404, body: "Download not found." };
  }

  try {
    const data = fs.readFileSync(download.filePath);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": download.contentType,
        "Content-Disposition": `attachment; filename=\"${download.filename}\"`,
        "Cache-Control": "private, max-age=0, no-store",
      },
      isBase64Encoded: true,
      body: data.toString("base64"),
    };
  } catch (error) {
    console.error("download error", error);
    return { statusCode: 500, body: "Unable to read download." };
  }
};
