const COSTS_BACKEND_URL = process.env.COSTS_BACKEND_URL || 'https://projecthub-chat.bradleymatera.dev/api/costs';
const DEFAULT_TIMEOUT = 8000;

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'https://bradleymatera.dev,https://www.bradleymatera.dev,https://bradleymatera.github.io')
  .split(',')
  .map(o => o.trim())
  .filter(Boolean);

function corsHeaders(origin) {
  const allowed = !origin || ALLOWED_ORIGINS.includes(origin) || /^https:\/\/[^\/]+\.codepen\.io$/.test(origin)
    ? origin || ALLOWED_ORIGINS[0]
    : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Vary': 'Origin',
    'Content-Type': 'application/json'
  };
}

function json(statusCode, body, headers) {
  return { statusCode, headers, body: JSON.stringify(body) };
}

exports.handler = async function handler(event) {
  const origin = event.headers.origin || event.headers.Origin || '';
  const headers = corsHeaders(origin);

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return json(405, { error: 'Method not allowed.' }, headers);
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);

    const response = await fetch(COSTS_BACKEND_URL, {
      method: 'GET',
      signal: controller.signal,
      headers: { 'Accept': 'application/json' }
    });

    clearTimeout(timer);

    if (!response.ok) {
      throw new Error(`Backend HTTP ${response.status}`);
    }

    const data = await response.json();
    return json(200, data, headers);
  } catch (error) {
    console.error('ProjectHub costs proxy error:', error.message);
    return json(502, { error: 'Costs data currently unavailable.' }, headers);
  }
};
