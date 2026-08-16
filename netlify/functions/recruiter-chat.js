const CHAT_BACKEND_URL = process.env.CHAT_BACKEND_URL || 'https://projecthub-chat.bradleymatera.dev/api/chat';
const DEFAULT_TIMEOUT = 14000;
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
        console.warn('Neon session memory disabled:', error.message);
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
      console.warn('Neon read failed:', error.message);
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
      console.warn('Neon write failed:', error.message);
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
      console.warn('Neon clear failed:', error.message);
    }
  }
  sessionMemory.delete(sessionId);
}

function sessionHint(memory) {
  const recentUserTurns = trimMemory(memory).filter(item => item.role === 'user').slice(-2).map(item => item.content);
  return recentUserTurns.length ? `Recent session context: ${recentUserTurns.join(' | ')}` : '';
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

  try {
    const memory = await readSession(sessionId);
    const history = memoryToHistory(memory);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);

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

    clearTimeout(timer);

    if (!response.ok) {
      throw new Error(`Backend HTTP ${response.status}`);
    }

    const data = await response.json();
    const cleaned = String(data.reply || '').trim().slice(0, 600);

    if (!cleaned) {
      return json(200, {
        reply: 'I do not have that detail verified. I can answer questions about Bradley\'s projects, AWS background, skills, education, or how to contact him.',
        fallback: true,
        source: 'backend-fallback'
      }, headers);
    }

    // Persist this turn to session memory
    const updatedMemory = [...memory, { role: 'user', content: message, at: Date.now() }, { role: 'assistant', content: cleaned, at: Date.now() }];
    const memoryStore = await writeSession(sessionId, updatedMemory);

    return json(200, {
      reply: cleaned,
      provider: data.provider || 'backend',
      model: data.model || 'unknown',
      fallback: data.fallback || false,
      generative: !data.fallback,
      source: data.fallback ? 'backend-fallback' : 'backend-llm',
      memoryStore
    }, headers);

  } catch (error) {
    console.error('Recruiter chat error:', error.message);

    return json(200, {
      reply: 'Scout is temporarily unavailable. Please try again in a moment.',
      fallback: true,
      source: 'backend-error',
      error: error.message
    }, headers);
  }
};
