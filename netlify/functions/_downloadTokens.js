const crypto = require("crypto");

const base64UrlEncode = (input) =>
  Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

const base64UrlDecode = (input) => {
  const normalized = input.replace(/-/g, "+").replace(/_/g, "/");
  const pad = normalized.length % 4 === 0 ? "" : "=".repeat(4 - (normalized.length % 4));
  return Buffer.from(normalized + pad, "base64").toString("utf8");
};

const signToken = (payload, secret) => {
  const body = base64UrlEncode(JSON.stringify(payload));
  const signature = base64UrlEncode(
    crypto.createHmac("sha256", secret).update(body).digest()
  );
  return `${body}.${signature}`;
};

const verifyToken = (token, secret) => {
  const [body, signature] = token.split(".");
  if (!body || !signature) {
    throw new Error("Malformed token");
  }
  const expected = base64UrlEncode(
    crypto.createHmac("sha256", secret).update(body).digest()
  );
  if (signature !== expected) {
    throw new Error("Invalid token signature");
  }
  const payload = JSON.parse(base64UrlDecode(body));
  return payload;
};

module.exports = { signToken, verifyToken };
