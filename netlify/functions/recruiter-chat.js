const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-1.5-flash-latest';
const KNOWLEDGE_URL = 'https://raw.githubusercontent.com/BradleyMatera/ProjectHub/master/data/recruiter-knowledge.json';
const DEFAULT_TIMEOUT = 12000;
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
    console.warn('Knowledge fetch failed:', error.message);
    return knowledgeCache;
  }
}

function buildGeminiPrompt(knowledge, question, contextLines) {
  const identity = knowledge?.identity || {};
  const summary = knowledge?.summary || {};
  const goals = knowledge?.goals || {};
  const education = knowledge?.education || {};
  const experience = knowledge?.experience || [];
  const skills = knowledge?.skills || {};
  const projects = knowledge?.projects || [];
  const antiSlop = knowledge?.commonPatterns?.antiSlop || {};

  const avoidWords = (antiSlop.avoidWords || []).join(', ');
  const avoidPhrases = (antiSlop.avoidPhrases || []).join(', ');

  const parts = [];
  parts.push(`You are Bradley Matera's recruiter assistant. You answer naturally and conversationally, as if talking to a recruiter who is evaluating Bradley for a junior software engineering role.`);
  parts.push(`CRITICAL RULES:`);
  parts.push(`1. Use ONLY the verified facts below. Do NOT invent personal details, hobbies, food preferences, or facts not listed.`);
  parts.push(`2. Answer in a friendly, professional tone. Write 1-3 complete sentences that sound human, not robotic.`);
  parts.push(`3. If asked something not in the facts, say you don't have that detail and suggest a related recruiter topic you CAN answer.`);
  parts.push(`4. Speak as an assistant ("Bradley has...", "He is..."), never as Bradley himself.`);
  parts.push(`5. AVOID these AI-slop words: ${avoidWords || 'passionate, robust, leverage, synergy, dynamic, extensive expertise'}`);
  parts.push(`6. AVOID these AI-slop phrases: ${avoidPhrases || 'Certainly, Absolutely, Great question, As an AI, I would be happy to'}`);
  parts.push(`7. Keep answers SHORT. 1-3 sentences. Recruiters want quick facts, not essays.`);

  if (contextLines && contextLines.length) {
    parts.push('');
    parts.push('CONVERSATION HISTORY (for context only):');
    contextLines.forEach(line => parts.push(line));
  }

  parts.push('');
  parts.push('VERIFIED PROFILE:');
  parts.push(`Name: ${identity.name || 'Bradley Matera'}`);
  parts.push(`Title: ${identity.title || 'Junior Software Engineer'}`);
  parts.push(`Location: ${identity.location || 'Davis, Illinois'} (open to relocation)`);
  if (education.degree) parts.push(`Education: ${education.degree} from ${education.school || 'Full Sail University'}${education.gpa ? `, GPA ${education.gpa}` : ''}`);
  if (skills.languagesAndFrameworks) parts.push(`Skills: ${skills.languagesAndFrameworks.join(', ')}`);
  if (skills.cloudAndInfrastructure) parts.push(`Cloud: ${skills.cloudAndInfrastructure.slice(0, 5).join(', ')}`);
  if (goals.targetRoles) parts.push(`Target roles: ${goals.targetRoles.slice(0, 5).join(', ')}`);
  if (summary.whoIAm) parts.push(`Summary: ${summary.whoIAm}`);
  if (experience.length) {
    parts.push('Experience:');
    experience.slice(0, 4).forEach(e => parts.push(`- ${e.role} at ${e.company}: ${e.summary || ''}`));
  }
  if (projects.length) {
    parts.push('Projects:');
    projects.slice(0, 5).forEach(p => parts.push(`- ${p.name}: ${p.description}`));
  }
  parts.push('');
  parts.push(`Recruiter asks: "${question}"`);
  parts.push('Your answer:');

  return parts.join('\n');
}

async function callGemini(prompt) {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY not configured');
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);

  try {
    const response = await fetch(url, {
      method: 'POST',
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.35,
          maxOutputTokens: 150,
          topP: 0.85,
          topK: 40
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' }
        ]
      })
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Gemini HTTP ${response.status}: ${text.slice(0, 200)}`);
    }

    const data = await response.json();
    const candidate = data.candidates?.[0];
    if (!candidate) {
      throw new Error('No candidates in Gemini response');
    }
    if (candidate.finishReason === 'SAFETY') {
      throw new Error('Gemini blocked response for safety');
    }

    const text = candidate.content?.parts?.[0]?.text || '';
    return text.trim();
  } catch (error) {
    clearTimeout(timeout);
    throw error;
  }
}

function cleanGeminiReply(reply, knowledge) {
  const cleaned = String(reply || '').trim().replace(/\s+/g, ' ');
  const antiSlop = knowledge?.commonPatterns?.antiSlop || {};
  const avoidWords = antiSlop.avoidWords || [];
  const avoidPhrases = antiSlop.avoidPhrases || [];

  const forbiddenRegex = new RegExp('\\b(' + avoidWords.join('|') + ')\\b', 'i');
  const forbiddenPhrasesRegex = new RegExp('(' + avoidPhrases.join('|') + ')', 'i');
  const inventedPersonal = /\b(pizza|sushi|burger|spaghetti|tacos|favorite food is|loves eating|hates eating|married|children|wife|husband|girlfriend|boyfriend|born in [0-9]{4}|age [0-9]{1,2})\b/i;
  const looksIncomplete = /[,;:]$/i.test(cleaned);
  const tooShort = cleaned.length < 10;
  const tooLong = cleaned.length > 400;

  if (tooShort || tooLong || forbiddenRegex.test(cleaned) || forbiddenPhrasesRegex.test(cleaned) || inventedPersonal.test(cleaned) || looksIncomplete) {
    return null;
  }
  return cleaned;
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
    // Load knowledge + session memory
    const [knowledge, memory] = await Promise.all([
      fetchKnowledge(),
      readSession(sessionId)
    ]);

    if (!knowledge) {
      return json(503, { error: 'Knowledge file unavailable.', fallback: true }, headers);
    }

    // Build context lines from previous turns for the prompt
    const contextLines = memory.length
      ? memory.map(m => `${m.role === 'user' ? 'Recruiter' : 'Assistant'}: ${m.content}`)
      : [];

    const prompt = buildGeminiPrompt(knowledge, message, contextLines);
    let reply = await callGemini(prompt);
    let cleaned = cleanGeminiReply(reply, knowledge);

    // Retry once if validation fails
    if (!cleaned) {
      const strictPrompt = prompt + '\n\nIMPORTANT: Your previous answer was rejected. Answer in exactly 1-2 short, natural sentences. Be direct and honest. Do not use buzzwords.';
      reply = await callGemini(strictPrompt);
      cleaned = cleanGeminiReply(reply, knowledge);
    }

    if (!cleaned) {
      return json(200, {
        reply: 'I do not have that detail verified. I can answer questions about Bradley\'s projects, AWS background, skills, education, or how to contact him.',
        fallback: true,
        source: 'gemini-fallback'
      }, headers);
    }

    // Persist this turn to session memory
    const updatedMemory = [...memory, { role: 'user', content: message, at: Date.now() }, { role: 'assistant', content: cleaned, at: Date.now() }];
    const memoryStore = await writeSession(sessionId, updatedMemory);

    return json(200, {
      reply: cleaned,
      model: GEMINI_MODEL,
      generative: true,
      source: 'gemini-flash',
      memoryStore
    }, headers);

  } catch (error) {
    console.error('Recruiter chat error:', error.message);

    return json(200, {
      reply: 'I am having trouble generating an answer right now. I can still help with questions about Bradley\'s projects, skills, AWS experience, or contact info.',
      fallback: true,
      source: 'gemini-error',
      error: error.message
    }, headers);
  }
};
