const decodeJwtEmail = (authHeader) => {
  if (!authHeader) return null;
  const token = authHeader.replace(/^Bearer\s+/i, "").trim();
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length < 2) return null;
  try {
    const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8"));
    return payload?.email || payload?.user_metadata?.email || null;
  } catch (error) {
    return null;
  }
};

const fetchIdentityEmail = async (authHeader) => {
  if (!authHeader) return null;
  const baseUrl = process.env.SITE_URL || process.env.URL;
  if (!baseUrl) return null;

  try {
    const response = await fetch(`${baseUrl}/.netlify/identity/user`, {
      headers: {
        Authorization: authHeader,
      },
    });
    if (!response.ok) return null;
    const data = await response.json();
    return data?.email || data?.user_metadata?.email || null;
  } catch (error) {
    return null;
  }
};

const getAuthedEmail = async (event) => {
  const contextEmail = event.clientContext?.user?.email || null;
  if (contextEmail) return contextEmail;

  const authHeader = event.headers?.authorization || event.headers?.Authorization || "";
  if (!authHeader) return null;

  if (process.env.NETLIFY_DEV === "true") {
    return decodeJwtEmail(authHeader);
  }

  return fetchIdentityEmail(authHeader);
};

module.exports = { getAuthedEmail };
