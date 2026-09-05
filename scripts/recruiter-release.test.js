const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const source = file => fs.readFileSync(path.join(root, file), 'utf8');
const proxyFile = 'netlify/functions/recruiter-chat.js';
const buildFile = 'config/gatsby/node.js';
const layoutFile = 'src/features/recruiter/components/RecruiterLayout.tsx';
const sha = '0123456789abcdef0123456789abcdef01234567';
const secret = 'postgres://private-user:private-password@internal-host/db?token=private-token';

function load(file, overrides = {}) {
  const timers = new Map();
  const delays = [];
  const logs = [];
  let nextTimer = 0;
  const context = vm.createContext({
    exports: {}, process: { env: {} }, require, AbortController, AbortSignal,
    console: Object.fromEntries(['log', 'warn', 'error'].map(level => [level, (...args) => logs.push(args)])),
    setTimeout(callback, delay) {
      delays.push(delay);
      timers.set(++nextTimer, callback);
      return nextTimer;
    },
    clearTimeout(id) { timers.delete(id); },
    ...overrides
  });
  vm.runInContext(source(file), context, { filename: file });
  return {
    context, timers, delays, logs,
    fire() { for (const callback of [...timers.values()]) callback(); }
  };
}

const event = (message = 'Tell me about AWS') => ({
  httpMethod: 'POST', headers: { origin: 'https://bradleymatera.dev' },
  body: JSON.stringify({ message, sessionId: 'regression-session' })
});
const ok = data => ({ ok: true, status: 200, json: async () => data });
const flush = async () => { for (let i = 0; i < 30; i++) await Promise.resolve(); };

async function deadlineResult(harness, pending) {
  await flush();
  harness.fire();
  let result;
  pending.then(value => { result = value; });
  await flush();
  assert.ok(result, 'deadline must settle even when fetch/body never settles');
  return JSON.parse(result.body);
}

test('successful backend telemetry, prose source and conversation history survive the proxy', async () => {
  const payload = {
    reply: '  Verified answer  ', proseSource: 'VERIFIED_LOOKUP', generative: false,
    source: 'verified-router', provider: 'local', model: 'verified', fallback: false,
    timings: { totalMs: 42 }, releaseSha: sha, verification: { passed: true },
    matchedIntent: 'aws', confidence: 0.93, customTelemetry: ['preserve', 'all']
  };
  const requests = [];
  const h = load(proxyFile, { fetch: async (url, options) => {
    requests.push(JSON.parse(options.body));
    return ok(payload);
  } });
  const response = await h.context.exports.handler(event());
  const body = JSON.parse(response.body);
  for (const [key, value] of Object.entries(payload)) {
    assert.deepEqual(body[key], key === 'reply' ? 'Verified answer' : value, key);
  }
  assert.ok(body.requestId);
  assert.equal(body.memoryStore, 'memory');
  await h.context.exports.handler(event('More details'));
  assert.deepEqual(requests[1].history, [{ user: 'Tell me about AWS', assistant: 'Verified answer' }]);
  assert.equal(h.timers.size, 0);
  assert.ok(h.delays.every(delay => delay === 18000));
});

for (const fallback of [undefined, false, true]) {
  test(`backend TECHNICAL_ERROR with fallback=${fallback} is not generative and never enters memory`, async () => {
    const requests = [];
    let calls = 0;
    const h = load(proxyFile, { fetch: async (url, options) => {
      requests.push(JSON.parse(options.body));
      return ok(++calls === 1
        ? { reply: 'Temporarily unavailable', proseSource: 'TECHNICAL_ERROR', generative: true, fallback, errorType: 'PROVIDER_TIMEOUT' }
        : { reply: 'A successful response', proseSource: 'MODEL_GENERATION' });
    } });
    const body = JSON.parse((await h.context.exports.handler(event())).body);
    assert.equal(body.proseSource, 'TECHNICAL_ERROR');
    assert.equal(body.generative, false);
    assert.equal(body.fallback, true);
    assert.equal(body.errorType, 'PROVIDER_TIMEOUT');
    await h.context.exports.handler(event('Try again'));
    assert.deepEqual(requests[1].history, []);
  });
}

for (const [name, fetchMock, expectedType] of [
  ['connection rejection', async () => { throw Object.assign(new Error(secret), { code: 'ECONNREFUSED' }); }, 'BACKEND_CONNECTION_ERROR'],
  ['HTTP failure', async () => ({ ok: false, status: 503 }), 'BACKEND_HTTP_ERROR'],
  ['invalid JSON body', async () => ({ ok: true, status: 200, json: async () => { throw new SyntaxError(secret); } }), 'BACKEND_CONNECTION_ERROR'],
  ['empty reply', async () => ok({ reply: '' }), 'BACKEND_EMPTY_REPLY'],
  ['null body', async () => ok(null), 'BACKEND_EMPTY_REPLY'],
  ['adversarial exception fields', async () => { throw { name: secret, code: secret, message: secret, stack: secret }; }, 'BACKEND_CONNECTION_ERROR'],
  ['abort rejection', async () => { throw Object.assign(new Error(secret), { name: 'AbortError' }); }, 'BACKEND_TIMEOUT'],
  ['nested transport code', async () => { throw new TypeError(secret, { cause: { code: 'ECONNRESET', message: secret } }); }, 'BACKEND_CONNECTION_ERROR']
]) {
  test(`${name}: sanitized public error, useful safe logs and timer cleanup`, async () => {
    const h = load(proxyFile, { fetch: fetchMock });
    const result = await h.context.exports.handler(event());
    const body = JSON.parse(result.body);
    assert.equal(result.statusCode, 200);
    assert.equal(body.errorType, expectedType);
    assert.equal(body.proseSource, 'TECHNICAL_ERROR');
    assert.equal(body.generative, false);
    assert.ok(body.requestId);
    assert.equal(body.errorCode, expectedType);
    assert.doesNotMatch(result.body + JSON.stringify(h.logs), /private-user|private-password|internal-host|private-token/);
    assert.equal(h.timers.size, 0);
    assert.ok(h.logs.some(args => args.some(arg => arg && arg.requestId === body.requestId)));
    if (name === 'connection rejection') assert.match(JSON.stringify(h.logs), /ECONNREFUSED/);
    if (name === 'HTTP failure') assert.match(JSON.stringify(h.logs), /503/);
    if (name === 'nested transport code') assert.match(JSON.stringify(h.logs), /ECONNRESET/);
  });
}

for (const stage of ['headers', 'body']) {
  test(`18 second deadline covers stalled ${stage}, aborts and cleans up`, async () => {
    let signal;
    const h = load(proxyFile, { fetch: async (url, options) => {
      signal = options.signal;
      if (stage === 'headers') return new Promise(() => {});
      return { ok: true, status: 200, json: () => new Promise(() => {}) };
    } });
    const body = await deadlineResult(h, h.context.exports.handler(event()));
    assert.deepEqual(h.delays, [18000]);
    assert.equal(signal.aborted, true);
    assert.equal(body.errorType, 'BACKEND_TIMEOUT');
    assert.equal(body.proseSource, 'TECHNICAL_ERROR');
    assert.equal(h.timers.size, 0);
  });
}

test('a response arriving after the deadline cannot poison subsequent conversation memory', async () => {
  let finishBody;
  let calls = 0;
  const requests = [];
  const h = load(proxyFile, { fetch: async (url, options) => {
    requests.push(JSON.parse(options.body));
    if (++calls === 1) return { ok: true, status: 200, json: () => new Promise(resolve => { finishBody = resolve; }) };
    return ok({ reply: 'Current answer' });
  } });
  const result = await deadlineResult(h, h.context.exports.handler(event()));
  assert.equal(result.errorType, 'BACKEND_TIMEOUT');
  finishBody({ reply: 'Late answer' });
  await flush();
  await h.context.exports.handler(event('Retry'));
  assert.deepEqual(requests[1].history, []);
  assert.equal(h.timers.size, 0);
});

test('preflight, method/input validation and clear-memory action preserve existing behavior', async () => {
  let calls = 0;
  const h = load(proxyFile, { fetch: async () => { calls++; return ok({ reply: 'Answer' }); } });
  for (const [request, status] of [
    [{ ...event(), httpMethod: 'OPTIONS' }, 204],
    [{ ...event(), httpMethod: 'GET' }, 405],
    [{ ...event(), body: '{' }, 400],
    [event(''), 400],
    [event('x'.repeat(601)), 400]
  ]) {
    const response = await h.context.exports.handler(request);
    assert.equal(response.statusCode, status);
    assert.equal(response.headers['Access-Control-Allow-Origin'], 'https://bradleymatera.dev');
  }
  assert.equal(calls, 0);
  await h.context.exports.handler(event());
  const response = await h.context.exports.handler({ ...event(), body: JSON.stringify({ action: 'clear', sessionId: 'regression-session' }) });
  assert.equal(JSON.parse(response.body).cleared, true);
  assert.equal(vm.runInContext('sessionMemory.size', h.context), 0);
});

test('explicit full release SHA takes precedence without a network request', async () => {
  const env = { GATSBY_PROJECTHUB_VERSION: sha };
  const h = load(buildFile, { process: { env }, fetch: async () => assert.fail('must not fetch') });
  await h.context.exports.onPreInit();
  assert.equal(env.GATSBY_PROJECTHUB_VERSION, sha);
});

for (const version of ['', 'deadbeef', 'not-a-sha', `${sha}?token=secret`, 'g'.repeat(40), `${sha}\n`]) {
  test(`invalid explicit build identity is rejected: ${JSON.stringify(version)}`, async () => {
    const h = load(buildFile, { process: { env: { GATSBY_PROJECTHUB_VERSION: version } }, fetch: async () => assert.fail('must not fetch') });
    await assert.rejects(h.context.exports.onPreInit(), /SHA|version|identity/i);
  });
}

test('GitHub resolver retains all 40 validated SHA characters', async () => {
  const h = load(buildFile, { fetch: async () => ({ ok: true, text: async () => `${sha}\n` }) });
  await h.context.exports.onPreInit();
  assert.equal(h.context.process.env.GATSBY_PROJECTHUB_VERSION, sha);
  assert.equal(h.timers.size, 0);
});

for (const [name, fetchMock] of [
  ['non-SHA response', async () => ({ ok: true, text: async () => '{"sha":"not-the-expected-format"}' })],
  ['HTTP failure', async () => ({ ok: false, status: 429 })],
  ['network failure', async () => { throw new Error(secret); }]
]) {
  test(`build resolver fails closed on ${name}`, async () => {
    const h = load(buildFile, { fetch: fetchMock });
    await assert.rejects(h.context.exports.onPreInit(), /SHA|version|identity/i);
    assert.equal(h.context.process.env.GATSBY_PROJECTHUB_VERSION, undefined);
    assert.equal(h.timers.size, 0);
    assert.doesNotMatch(JSON.stringify(h.logs), /private-password|private-token/);
  });
}

for (const stage of ['headers', 'body']) {
  test(`build resolver deadline covers stalled ${stage}`, async () => {
    let signal;
    const h = load(buildFile, { fetch: async (url, options) => {
      signal = options.signal;
      if (stage === 'headers') return new Promise(() => {});
      return { ok: true, text: () => new Promise(() => {}) };
    } });
    const pending = h.context.exports.onPreInit();
    let rejected = false;
    pending.catch(() => { rejected = true; });
    await flush();
    h.fire();
    await flush();
    assert.equal(rejected, true, 'unresolved build identity must stop the build');
    assert.equal(signal.aborted, true);
    assert.deepEqual(h.delays, [8000]);
    assert.equal(h.timers.size, 0);
  });
}

test('post-build SEO hook repairs tag and index canonicals, descriptions and direct answers idempotently', () => {
  const publicDir = path.join(root, 'public');
  const tagsDir = path.join(publicDir, 'tags');
  const template = '<head><link rel="canonical" href="wrong"><meta name="description" content="wrong"><meta property="og:url" content="wrong"><meta name="twitter:url" content="wrong"></head><h1>Tags</h1>';
  const files = new Map([
    [path.join(tagsDir, 'react', 'index.html'), template],
    [path.join(tagsDir, 'index.html'), template]
  ]);
  const mockFs = {
    existsSync: file => file === tagsDir || files.has(file),
    readdirSync: () => ['react', 'index.html'],
    statSync: file => ({ isDirectory: () => !file.endsWith('.html') }),
    readFileSync: file => files.get(file),
    writeFileSync: (file, html) => files.set(file, html)
  };
  const h = load(buildFile, { require: name => name === 'fs' ? mockFs : require(name) });
  assert.equal(typeof h.context.exports.onPostBuild, 'function');
  const args = { store: { getState: () => ({ program: { directory: root }, site: {} }) } };
  h.context.exports.onPostBuild(args);
  const firstRun = [...files.values()];
  for (const [file, html] of files) {
    const slug = file.includes(`${path.sep}react${path.sep}`) ? 'react/' : '';
    assert.match(html, new RegExp(`href="https://bradleymatera.dev/tags/${slug}"`));
    assert.doesNotMatch(html, /content="wrong"|Last updated:|dateModified/);
    assert.match(html, /class="direct-answer"/);
    assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
  }
  h.context.exports.onPostBuild(args);
  assert.deepEqual([...files.values()], firstRun);
});

test('recruiter layout retains progress, command palette, voice navigation and hydration guard', () => {
  const text = source(layoutFile);
  for (const component of ['ProgressRail', 'RecruiterCommandPalette', 'VoiceNavButton']) {
    assert.match(text, new RegExp(`import ${component} from "./${component}"`));
    assert.match(text, new RegExp(`<${component}[ />]`));
  }
  assert.match(text, /const \[commandOpen, setCommandOpen\] = React.useState\(false\)/);
  assert.match(text, /e\.metaKey \|\| e\.ctrlKey/);
  assert.match(text, /window.addEventListener\("keydown", onKeyDown\)/);
  assert.match(text, /window.removeEventListener\("keydown", onKeyDown\)/);
  assert.match(text, /suppressHydrationWarning/);
  assert.match(text, /isOpen=\{commandOpen\}/);
});

test('dynamic widget loader uses build identity, loads once, retries, hides on navigation and never fakes DOMContentLoaded', () => {
  const text = source(layoutFile);
  assert.match(text, /process.env.GATSBY_PROJECTHUB_VERSION/);
  assert.doesNotMatch(text, /dispatchEvent\(new Event\(["']DOMContentLoaded/);
  const scripts = [];
  let chat;
  let cleanup;
  const window = { location: { pathname: '/recruiter/' } };
  const context = vm.createContext({
    window, PROJECTHUB_SCRIPT_URL: `https://example.test/ProjectHub.js?v=${sha}`,
    React: { useEffect: callback => { cleanup = callback(); } },
    document: {
      getElementById: () => chat,
      createElement: () => ({ remove() { this.removed = true; } }),
      body: { appendChild: script => scripts.push(script) }
    }
  });
  vm.runInContext(`${text.slice(text.indexOf('const useProjectHubChat ='), text.indexOf('const RecruiterLayout:'))}\nuseProjectHubChat();`, context);
  assert.equal(scripts.length, 1);
  assert.match(scripts[0].src, new RegExp(sha));
  vm.runInContext('useProjectHubChat();', context);
  assert.equal(scripts.length, 1);
  scripts[0].onerror();
  assert.equal(window.__projectHubLoaded, false);
  vm.runInContext('useProjectHubChat();', context);
  assert.equal(scripts.length, 2);
  let display = '';
  chat = { style: { setProperty: (key, value) => { display = value; }, removeProperty: () => { display = ''; } } };
  window.location.pathname = '/';
  scripts[1].onload();
  assert.equal(display, 'none');
  window.location.pathname = '/recruiter/';
  vm.runInContext('useProjectHubChat();', context);
  assert.equal(display, '');
  cleanup();
  assert.equal(display, 'none');
});
