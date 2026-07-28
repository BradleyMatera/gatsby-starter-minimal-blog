# Bradley Self-Hosted Voice Platform v3

## Decision

Build the Vapi-equivalent platform ourselves using free cloud resources and open-source models.

Vapi is only a product reference and optional interoperability adapter. Bradley's home PC, Mac, and RTX 4080 are not required production infrastructure. They may be used for development tests only.

## Free-cloud compute architecture

### Oracle Cloud Always Free: primary application host

Preferred primary host when Bradley can provision capacity:

- OCI Ampere A1 Flex
- up to 2 OCPUs and 12 GB RAM under the current Always Free allowance
- Ubuntu ARM64

Responsibilities:

- private control-center backend
- agent runtime coordinator
- Asterisk or SIP/WebRTC services after ARM compatibility testing
- PostgreSQL or lightweight application database
- prompt and agent configuration
- call state
- queues
- Calendly synchronization
- audit logs
- routing among free inference services
- CPU-optimized VAD, STT, LLM, and TTS when benchmarks pass

Do not assume Oracle capacity is always immediately available. Deployment must support another host through containers and configuration rather than hard-coded OCI services.

### Google Cloud free-tier e2-micro: independent gateway and watchdog

Use the existing Google Cloud free-tier VM for lightweight services only:

- public webhook gateway
- DNS health target
- authentication edge or reverse proxy
- uptime checks
- emergency stop relay
- provider status collection
- failover coordination
- static configuration backup

Do not run normal speech inference or a full PBX workload on the e2-micro.

### Hugging Face free services: model hub and burst compute

Use Hugging Face for:

- open-source model discovery and storage
- free CPU Spaces for small stateless services
- ZeroGPU for quota-limited testing, burst jobs, demos, and noncontinuous tasks
- community GPU grant applications
- model evaluation
- optional fallback inference

Do not make a live telephone call depend on ZeroGPU always being available. Free-account GPU time is quota-limited and queued. The router must know the remaining quota and treat ZeroGPU as an opportunistic node.

### Additional free serverless nodes

Research and use only where their current free allocations fit:

- Google Cloud Run or Functions for event-driven endpoints
- AWS Lambda free requests for asynchronous jobs
- Azure Functions or Container Apps free allocations
- Cloudflare Workers for lightweight routing and signed webhook processing
- GitHub Actions for builds, tests, scheduled checks, and deployments, not live call audio

Every service must be behind an internal adapter and replaceable. No critical business rule belongs only inside one provider-specific function.

## Model strategy: CPU-first, distributed, and task-specific

Do not try to run one giant model for the entire call.

Use small specialized components:

- VAD: Silero VAD or WebRTC VAD
- STT: benchmark whisper.cpp tiny/base quantized, faster-whisper CPU where compatible, Vosk, Moonshine, and other permissively licensed streaming CPU models
- intent and routing: deterministic ProjectHub/Scout classifier first
- retrieval: compact embeddings and keyword retrieval
- conversational model: small quantized instruction model that can run on ARM CPU, plus ProjectHub's existing free-provider failover
- TTS: benchmark Piper, Kokoro-compatible CPU implementations, Sherpa-ONNX voices, and other streaming CPU voices
- summaries: delayed/asynchronous processing when real-time generation is unnecessary

Tortoise TTS should be evaluated as an offline high-quality voice option, not assumed to be suitable for live calls.

## Open-source voice stack

### Media and call control

Benchmark these before final selection:

1. Asterisk with PJSIP, ARI/Stasis, and external media.
2. LiveKit open-source server and Agents framework.
3. A smaller SIP/WebRTC stack if Asterisk plus LiveKit exceeds the free ARM host's memory budget.

The chosen system must support:

- browser WebRTC calls
- SIP endpoints
- inbound and outbound routing
- DTMF
- transfer
- voicemail fallback
- two-way PCM streaming
- interruption and barge-in
- live call events
- emergency termination

### Bradley Voice Runtime

Create `bradley-voice-runtime` with:

- bidirectional audio sessions
- resampling and codec normalization
- VAD
- streaming or chunked STT
- partial transcript events
- end-of-turn detection
- interruption cancellation
- deterministic intent classification
- Scout knowledge retrieval
- model-router calls
- tool authorization
- streaming TTS
- live dashboard events
- strict timeouts and fallback responses

Suggested implementation:

- Python 3.12
- FastAPI
- asyncio
- WebSockets
- Pydantic
- PostgreSQL
- Redis-compatible queue only if measurements show it is needed

All services must build for ARM64 and AMD64 using Docker.

## Telephone network boundary

The AI platform, browser calling, SIP calling, dashboard, inference routing, and application logic can be self-hosted on free cloud resources.

Normal calls to and from arbitrary public telephone numbers still require a PSTN edge connection. Build this as a replaceable gateway rather than using Vapi as the platform:

1. Browser WebRTC and SIP calls: self-hosted internet calls.
2. Existing-number or mobile/SIP gateway: research available lawful methods and account capabilities.
3. Optional carrier adapter: used only when public telephone connectivity requires it.

The architecture must not confuse a carrier connection with the voice-agent platform itself.

## Private control center

Build a real server-backed application at `ops.bradleymatera.dev`, separate from Gatsby's public static JavaScript.

Required modules:

- Overview and free-resource health
- Live calls
- Call history, transcripts, summaries, and outcomes
- Agents and versioned prompts
- Voices and model routing
- SIP/WebRTC/telephone gateways
- Contacts, consent, and suppression status
- Outbound campaigns with explicit approval controls
- Calendly scheduling
- Scout knowledge and grounding tests
- Compute nodes, quotas, and failover order
- Audit log
- Emergency global stop

Security requirements:

- server-side sessions
- secure HTTP-only cookies
- Argon2id password hashing
- CSRF protection
- login throttling
- encrypted secrets
- MFA/passkey-ready design
- reauthentication for outbound campaigns, integration changes, exports, and deletion

## Free-resource-aware routing

Each compute adapter reports:

- online state
- provider and region
- supported capability
- CPU architecture
- available memory
- queue depth
- quota remaining
- cold or warm state
- median latency
- error rate
- last heartbeat

Example routing:

### STT

1. CPU model on OCI A1 if latency target passes.
2. Free CPU Space endpoint if warm and healthy.
3. Quota-available Hugging Face ZeroGPU endpoint.
4. Message-taking fallback.

### LLM

1. Deterministic Scout response.
2. Small CPU model on OCI A1.
3. Existing ProjectHub free-provider failover.
4. Constrained template response or human handoff.

### TTS

1. Streaming CPU TTS on OCI A1.
2. Warm free CPU Space.
3. Quota-available GPU endpoint.
4. Pre-generated phrase library for standard fallbacks.

The runtime must be able to continue common calls using deterministic responses and pre-generated audio even when every generative provider is unavailable.

## Required research from Devin

Devin must research current official free allocations and account eligibility before deployment, including:

- Oracle Cloud Always Free capacity and Bradley's available home region
- Google Cloud free-tier region and current VM configuration
- Hugging Face account type, CPU Spaces availability, ZeroGPU eligibility, daily quota, and grant options
- Cloudflare, AWS, Azure, GitHub Actions, and other free services Bradley already owns
- ARM64 compatibility of all candidate voice components
- memory and latency measurements on a 2 OCPU / 12 GB ARM VM

Devin must not assume the Windows PC is online, reachable, or part of production.

## First build milestone

Create a cloud-portable proof of concept that does not use Vapi and does not require Bradley's PC:

1. Browser microphone connects to the voice runtime through WebRTC or WebSocket.
2. A free-cloud CPU service performs VAD and STT.
3. Transcript goes to Scout's deterministic classifier and grounded knowledge layer.
4. A small free-cloud model is used only when necessary.
5. A CPU TTS service streams the response.
6. Caller can interrupt speech.
7. The dashboard shows the live session, transcript, latency, selected free resources, quota state, and stop control.
8. Everything runs in ARM64/AMD64 containers.
9. A documented degraded mode uses pre-generated audio and message-taking when inference quotas are unavailable.

Only after this passes should the system connect to a real public telephone gateway.
