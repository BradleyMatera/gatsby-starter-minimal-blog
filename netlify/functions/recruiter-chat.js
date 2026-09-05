const CHAT_BACKEND_URL = process.env.CHAT_BACKEND_URL || 'https://projecthub-chat.bradleymatera.dev/api/chat';
// Scout's product deadline is 15000 ms. The outer proxy timeout must be greater
// than that so Scout can fail closed with a typed TECHNICAL_ERROR. Netlify
// synchronous functions allow up to 60 seconds, so 18 seconds is safe.
const DEFAULT_TIMEOUT = 18000;
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 14;
const SESSION_MEMORY_LIMIT = 240;

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
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Vary': 'Origin',
    'Content-Type': 'application/json'
  };
}

function json(statusCode, body, headers) {
  return { statusCode, headers, body: JSON.stringify(body) };
}

function safeSessionId(value) {
  const cleaned = String(value || '').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 80);
  return cleaned || `anon-${Date.now().toString(36)}`;
}

function generateRequestId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

const UNAVAILABLE_REPLY = 'Scout is temporarily unavailable. Please try again in a moment.';

function safeDiagnostic(error) {
  const names = ['Error', 'TypeError', 'SyntaxError', 'AbortError', 'TimeoutError'];
  const codes = ['ECONNREFUSED', 'ECONNRESET', 'ENOTFOUND', 'EAI_AGAIN', 'ETIMEDOUT', 'UND_ERR_CONNECT_TIMEOUT', 'UND_ERR_HEADERS_TIMEOUT', 'UND_ERR_BODY_TIMEOUT', 'UND_ERR_SOCKET'];
  const code = error?.code || error?.cause?.code;
  return {
    name: names.includes(error?.name) ? error.name : 'Error',
    code: codes.includes(code) ? code : 'UNKNOWN'
  };
}

function technicalErrorResponse(requestId, errorType, headers, diagnostic = {}) {
  const messages = {
    BACKEND_TIMEOUT: `Backend did not respond within ${DEFAULT_TIMEOUT}ms.`,
    BACKEND_HTTP_ERROR: 'Backend returned an unsuccessful response.',
    BACKEND_EMPTY_REPLY: 'Backend returned an empty reply.',
    BACKEND_CONNECTION_ERROR: 'Unable to complete the backend request.'
  };
  const message = messages[errorType] || messages.BACKEND_CONNECTION_ERROR;
  console.error('Recruiter chat proxy error:', { requestId, errorType, ...diagnostic });
  return json(200, {
    reply: UNAVAILABLE_REPLY,
    fallback: true,
    generative: false,
    proseSource: 'TECHNICAL_ERROR',
    source: 'NETLIFY_PROXY_ERROR',
    errorType,
    errorCode: errorType,
    error: message,
    requestId
  }, headers);
}

function trimMemory(memory) {
  return (Array.isArray(memory) ? memory : [])
    .filter(item => item && typeof item === 'object')
    .slice(-10)
    .map(item => ({
      role: String(item.role || '').slice(0, 16),
      content: String(item.content || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 420),
      intent: item.intent ? String(item.intent).slice(0, 40) : undefined,
      at: Number(item.at) || Date.now()
    }));
}

let neonSqlPromise = null;
const sessionMemory = new Map();

async function getNeonSql() {
  const connectionString = process.env.NETLIFY_DATABASE_URL || process.env.DATABASE_URL;
  if (!connectionString) return null;
  if (!neonSqlPromise) {
    neonSqlPromise = import('@neondatabase/serverless')
      .then(({ neon }) => neon(connectionString))
      .catch(error => {
        console.warn('Neon session memory disabled:', safeDiagnostic(error));
        return null;
      });
  }
  return neonSqlPromise;
}

async function ensureSessionTable(sql) {
  if (!sql) return;
  await sql`
    CREATE TABLE IF NOT EXISTS projecthub_chat_sessions (
      session_id text PRIMARY KEY,
      memory jsonb NOT NULL DEFAULT '[]'::jsonb,
      updated_at timestamptz NOT NULL DEFAULT now()
    )
  `;
}

async function readSession(sessionId) {
  const sql = await getNeonSql();
  if (sql) {
    try {
      await ensureSessionTable(sql);
      const rows = await sql`SELECT memory FROM projecthub_chat_sessions WHERE session_id = ${sessionId}`;
      return trimMemory(rows[0]?.memory || []);
    } catch (error) {
      console.warn('Neon read failed:', safeDiagnostic(error));
    }
  }
  const cached = sessionMemory.get(sessionId);
  if (!cached || Date.now() - cached.at > SESSION_TTL_MS) return [];
  return trimMemory(cached.memory);
}

async function writeSession(sessionId, memory) {
  const trimmed = trimMemory(memory);
  const sql = await getNeonSql();
  if (sql) {
    try {
      await ensureSessionTable(sql);
      await sql`
        INSERT INTO projecthub_chat_sessions (session_id, memory, updated_at)
        VALUES (${sessionId}, ${JSON.stringify(trimmed)}::jsonb, now())
        ON CONFLICT (session_id)
        DO UPDATE SET memory = EXCLUDED.memory, updated_at = now()
      `;
      return 'neon';
    } catch (error) {
      console.warn('Neon write failed:', safeDiagnostic(error));
    }
  }
  sessionMemory.set(sessionId, { at: Date.now(), memory: trimmed });
  while (sessionMemory.size > SESSION_MEMORY_LIMIT) {
    sessionMemory.delete(sessionMemory.keys().next().value);
  }
  return 'memory';
}

async function clearSession(sessionId) {
  const sql = await getNeonSql();
  if (sql) {
    try {
      await ensureSessionTable(sql);
      await sql`DELETE FROM projecthub_chat_sessions WHERE session_id = ${sessionId}`;
    } catch (error) {
      console.warn('Neon clear failed:', safeDiagnostic(error));
    }
  }
  sessionMemory.delete(sessionId);
}

function sessionHint(memory) {
  const recentUserTurns = trimMemory(memory).filter(item => item.role === 'user').slice(-2).map(item => item.content);
  return recentUserTurns.length ? `Recent session context: ${recentUserTurns.join(' | ')}` : '';
}

let knowledgeCache = null;
let knowledgeCacheTime = 0;
const CACHE_TTL_MS = 5 * 60 * 1000;

async function fetchKnowledge() {
  const now = Date.now();
  if (knowledgeCache && (now - knowledgeCacheTime) < CACHE_TTL_MS) {
    return knowledgeCache;
  }
  try {
    const response = await fetch(KNOWLEDGE_URL, { signal: AbortSignal.timeout(8000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    knowledgeCache = data;
    knowledgeCacheTime = now;
    return data;
  } catch (error) {
    console.warn('Knowledge fetch failed:', safeDiagnostic(error));
    return knowledgeCache;
  }
}

function memoryToHistory(memory) {
  return (Array.isArray(memory) ? memory : []).reduce((acc, turn) => {
    if (turn.role === 'user') {
      acc.push({ user: turn.content, assistant: '' });
    } else if (turn.role === 'assistant' && acc.length > 0) {
      acc[acc.length - 1].assistant = turn.content;
    }
    return acc;
  }, []).slice(-4);
}

exports.handler = async function handler(event) {
  const requestId = generateRequestId();
  const origin = event.headers.origin || event.headers.Origin || '';
  const headers = corsHeaders(origin);

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed.' }, headers);
  }

  let body = {};
  try {
    body = JSON.parse(event.body || '{}');
  } catch (error) {
    return json(400, { error: 'Invalid JSON.' }, headers);
  }

  const message = String(body.message || '').trim();
  const sessionId = safeSessionId(body.sessionId);
  const action = String(body.action || '').trim().toLowerCase();

  if (!message && action !== 'clear') {
    return json(400, { error: 'Missing message.' }, headers);
  }
  if (message.length > 600) return json(400, { error: 'Message is too long.' }, headers);

  // Handle clear-memory action
  if (action === 'clear') {
    await clearSession(sessionId);
    return json(200, { reply: 'Memory cleared.', cleared: true, source: 'system' }, headers);
  }

  let stage = 'session-read';
  let backendStatus;
  let timedOut = false;
  let httpError = false;
  try {
    const memory = await readSession(sessionId);
    const history = memoryToHistory(memory);

    const controller = new AbortController();
    let timer;
    let data;
    stage = 'headers';
    try {
      const deadline = new Promise((_, reject) => {
        timer = setTimeout(() => {
          timedOut = true;
          controller.abort();
          reject(new Error('Backend deadline exceeded.'));
        }, DEFAULT_TIMEOUT);
      });
      data = await Promise.race([
        (async () => {
          const response = await fetch(CHAT_BACKEND_URL, {
            method: 'POST',
            signal: controller.signal,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              message,
              sessionId,
              history
            })
          });
          backendStatus = Number.isInteger(response.status) && response.status >= 100 && response.status <= 599
            ? response.status : undefined;
          if (!response.ok) {
            httpError = true;
            throw new Error('Backend HTTP error.');
          }
          stage = 'body';
          return await response.json();
        })(),
        deadline
      ]);
    } finally {
      clearTimeout(timer);
    }
    const cleaned = String(data?.reply || '').trim().slice(0, 600);

    if (!cleaned) {
      return technicalErrorResponse(requestId, 'BACKEND_EMPTY_REPLY', headers, { stage, backendStatus });
    }

    if (data.proseSource === 'TECHNICAL_ERROR' || data.fallback) {
      return json(200, {
        ...data,
        reply: cleaned,
        proseSource: data.proseSource || 'TECHNICAL_ERROR',
        fallback: true,
        generative: false,
        requestId
      }, headers);
    }

    // Persist this turn to session memory
    stage = 'session-write';
    const updatedMemory = [...memory, { role: 'user', content: message, at: Date.now() }, { role: 'assistant', content: cleaned, at: Date.now() }];
    const memoryStore = await writeSession(sessionId, updatedMemory);

    return json(200, {
      ...data,
      reply: cleaned,
      provider: data.provider || 'backend',
      model: data.model || 'unknown',
      proseSource: data.proseSource || 'MODEL_GENERATION',
      fallback: false,
      generative: data.generative ?? true,
      source: data.source || 'backend-llm',
      requestId,
      memoryStore
    }, headers);

  } catch (error) {
    const errorType = timedOut || error?.name === 'AbortError' || error?.name === 'TimeoutError'
      ? 'BACKEND_TIMEOUT'
      : httpError ? 'BACKEND_HTTP_ERROR' : 'BACKEND_CONNECTION_ERROR';
    return technicalErrorResponse(requestId, errorType, headers, {
      stage, backendStatus, ...safeDiagnostic(error)
    });
  }
};
