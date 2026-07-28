# Bradley Self-Hosted Voice Platform v2

## Decision

Build the Vapi-equivalent platform ourselves. Vapi is only a product reference and optional temporary interoperability adapter.

## Compute we will use

### Always-on control plane

Use the existing Google Cloud free-tier e2-micro VM for lightweight services:

- authentication gateway
- dashboard API
- agent and prompt configuration
- call state and event ingestion
- job queues
- Calendly synchronization
- health checks
- audit records
- routing requests to available inference nodes

Do not run large speech or language models on the e2-micro.

### Primary inference node

Use Bradley's Windows RTX 4080 computer as the primary zero-marginal-cost inference server when it is online:

- local LLM through Ollama or another measured runtime
- faster-whisper or whisper.cpp streaming STT
- Piper, Kokoro, Coqui-compatible, or existing Tortoise TTS after latency benchmarks
- embeddings and reranking
- ProjectHub/Scout grounded answer generation

Expose it only through a secure outbound tunnel or private overlay network. Never open Ollama, model servers, Windows file sharing, or raw inference ports directly to the public internet.

### Hugging Face node

Use Hugging Face for:

- model and dataset storage
- testing candidate STT, TTS, VAD, embedding, and small language models
- free CPU Spaces where account eligibility permits
- quota-limited ZeroGPU workloads
- community GPU grant applications
- optional burst inference and fallback experiments

Do not architect production telephone calls around unlimited Hugging Face GPU availability. Free GPU access is quota-based and Spaces can sleep.

### Browser compute

Use client-side WebAssembly/WebGPU where practical for:

- noise suppression
- echo cancellation
- VAD
- optional local transcription experiments
- browser-to-agent WebRTC calls

### Provider fallback pool

Reuse ProjectHub's failover approach for any free inference providers already configured. Every provider is an adapter behind one internal interface. Local inference remains the preferred path.

## Open-source voice stack

### Media and call control

Preferred initial stack:

- Asterisk for PBX, SIP, routing, DTMF, transfer, voicemail, and external media
- LiveKit or a lightweight WebRTC gateway for browser calls
- ARI/Stasis for call control
- AudioSocket or external media WebSocket for bidirectional PCM streaming

Alternative to benchmark: LiveKit Agents as the real-time orchestration framework. It is open source and supports interchangeable STT, LLM, TTS, WebRTC, and telephony integrations.

### Real-time agent runtime

Create a new service named `bradley-voice-runtime` with:

- bidirectional audio sessions
- resampling and codec normalization
- VAD
- streaming STT
- partial transcript events
- end-of-turn detection
- interruption/barge-in cancellation
- agent state machine
- Scout knowledge retrieval
- tool authorization
- streaming TTS
- live event publication to the dashboard
- fallbacks and timeouts

Suggested implementation: Python 3.12, FastAPI, asyncio, WebSockets, Pydantic, Redis-compatible queue only if necessary, and PostgreSQL for durable records.

## Telephone network access

The software, AI, dashboard, and internet calling can be self-hosted. Normal calls to and from the public telephone network still require a physical or carrier connection.

Build three interchangeable gateways:

1. Browser/WebRTC and SIP calls: entirely internet-based and self-hosted.
2. Existing mobile-line gateway: dedicated phone/SIM connected to Asterisk when technically reliable and permitted by the mobile plan.
3. Optional SIP trunk adapter: fallback only, not the product foundation.

Do not falsely label the platform as dependent on paid per-minute AI vendors. The carrier gateway is an edge adapter, just like internet service is an edge dependency.

## Private dashboard

Build a real password-protected application at `ops.bradleymatera.dev`, separate from Gatsby's public static bundle.

Required modules:

- Overview and node health
- Live calls
- Call history, transcripts, summaries, and outcomes
- Agents and versioned prompts
- Voices and model routing
- Phone/SIP/WebRTC gateways
- Contacts, consent, and suppression state
- Outbound campaigns with approval controls
- Calendly scheduling
- Scout knowledge and grounding tests
- Compute nodes and failover order
- Cost and quota tracking
- Audit log
- Emergency global stop

Use server-side sessions in HTTP-only secure cookies, password hashing with Argon2id, rate limiting, CSRF protection, MFA/passkey-ready design, and reauthentication for outbound campaigns, key changes, exports, and deletion.

## Availability-aware routing

Each compute node publishes:

- online state
- supported capabilities
- loaded models
- queue depth
- available VRAM/RAM
- median latency
- error rate
- last heartbeat

Example routing priority:

- STT: RTX 4080 faster-whisper -> local CPU Whisper -> approved HF fallback
- LLM: RTX 4080 Ollama -> ProjectHub free-provider failover -> small CPU model
- TTS: fastest measured local streaming voice -> lightweight CPU voice -> approved HF fallback

Calls must degrade gracefully. When inference is unavailable, the PBX should take a message, offer Calendly, forward to Bradley, or send a callback request rather than hanging up.

## Local-project discovery required from Devin

Before choosing final models or frameworks, Devin must inspect the Mac and accessible repositories for:

- ProjectHub and ProjectHub-dev API contracts
- projecthub-proxy
- Tortoise TTS app
- Convo-Ai
- empathic-voice-interface-starter
- Ollama configuration and reachable RTX 4080 endpoint
- existing Google Cloud VM deployment scripts and services
- any Whisper, faster-whisper, WebSocket, WebRTC, FastAPI, Node, Docker, or tunnel code

Devin must report exact paths, branches, startup commands, ports, environment-variable names without values, model names, licenses, measured latency, and reusable modules. It must not copy secrets into its report.

## First build milestone

Create a local proof of concept that does not use Vapi:

1. Browser microphone connects to a local WebRTC/WebSocket session.
2. Runtime streams audio to local STT.
3. Transcript goes to a Scout-compatible grounded agent.
4. Response streams through local TTS.
5. Caller can interrupt speech.
6. Dashboard shows the live session, transcript, latency, selected compute nodes, and stop control.
7. All components run through Docker Compose except the existing Windows GPU services when direct access is required.

Only after this passes should we connect Asterisk and a real telephone gateway.
