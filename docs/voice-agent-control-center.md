# Bradley Voice Agent Control Center

Status: Phase 0 architecture and discovery
Branch: `feature/voice-agent-control-center`
Production branch: `master` (do not modify directly)

## Goal

Build a password-protected operations system for `bradleymatera.dev` that lets Bradley configure, monitor, test, pause, and audit autonomous voice agents used for inbound calls, approved outbound calls, customer support, lead qualification, scheduling, and follow-up.

This system must reuse existing Bradley projects where practical, especially ProjectHub/Scout for grounded knowledge and routing, and local voice/TTS projects when they are technically suitable.

## Non-negotiable rules

1. Never expose provider keys, phone credentials, prompts, recordings, transcripts, contact data, or admin controls in Gatsby client bundles.
2. Never place secrets in GitHub, Gatsby environment variables prefixed with `GATSBY_`, browser localStorage, or public Netlify build output.
3. Do not deploy directly from this feature branch to production.
4. Outbound calling must require explicit campaign approval, suppression-list checks, quiet-hour checks, consent/legal checks, rate limits, and a kill switch.
5. Call recording and transcription must be configurable and must include legally appropriate disclosure when enabled.
6. The system must support hard daily and monthly spending limits and automatically stop billable activity when limits are reached.
7. Every admin mutation must create an audit event.
8. The public website and private operations app must remain separate security zones.

## Recommended architecture

### Public website

Keep the existing Gatsby/Netlify site as the public marketing surface.

Public additions later:

- `Call Bradley's AI assistant` entry point
- Calendly embed or scheduling link
- consent and recording disclosure text
- support/contact handoff
- optional browser voice demo, separate from PSTN calling

### Private control center

Preferred URL: `https://ops.bradleymatera.dev`

Do not rely on a static Gatsby password page as the security boundary. Build a server-authenticated application with secure, HTTP-only cookies, CSRF protection, short sessions, reauthentication for dangerous actions, and optional passkey/TOTP MFA.

Initial deployment options, in order:

1. Small server-rendered app/API on Bradley's existing Google Cloud VM if capacity and security are acceptable.
2. Separate Cloud Run service if free-tier behavior and cold starts are acceptable.
3. Netlify Functions plus a private frontend only if authentication and long-running voice workflows remain external.

The existing Google Cloud e2-micro instance is appropriate for orchestration, webhook ingestion, CRUD APIs, scheduled sync, and a small database proxy. It is not appropriate for running Tortoise TTS, Whisper, or a large local LLM at real-time telephone latency.

### Provider adapter layer

Use adapters so no core business logic depends directly on Vapi:

- `TelephonyProvider`: Vapi first; future Twilio/Telnyx/SIP adapter
- `VoiceProvider`: Vapi-supported hosted voice first; optional custom Bradley TTS HTTP adapter after latency tests
- `TranscriberProvider`: Vapi-supported provider first; optional self-hosted streaming STT after testing
- `ModelProvider`: ProjectHub/Scout-compatible OpenAI-style endpoint or provider failover router
- `SchedulerProvider`: Calendly API/embed first; Google Calendar can be added later
- `KnowledgeProvider`: ProjectHub/Scout grounded knowledge endpoint
- `StorageProvider`: PostgreSQL metadata; object storage for optional recordings

### Core services

- Authentication and authorization
- Agent configuration and versioning
- Prompt templates and test sandbox
- Phone-number assignment
- Inbound call routing
- Outbound campaign approval and queueing
- Contact and consent registry
- Scheduling integration
- Call-event webhook ingestion
- Transcript/summary pipeline
- Cost ledger and budget enforcement
- Human handoff and escalation
- Audit log
- Health/status monitoring

## Initial agent roles

1. Receptionist: answer basic questions, identify caller intent, route or take a message.
2. Recruiter assistant: use Scout's verified career knowledge and avoid exaggeration.
3. Sales intake assistant: qualify website/service leads without making unsupported promises.
4. Support assistant: answer known questions, create a support item, and escalate uncertainty.
5. Scheduling assistant: offer approved Calendly slots or send the booking link.
6. Follow-up assistant: make only explicitly approved outbound calls to contacts with a documented lawful basis.

Agents are role configurations, not separate uncontrolled autonomous programs. Each role must have allowed tools, forbidden actions, escalation rules, maximum call length, budget, and prompt version.

## Required dashboard pages

- Overview: system health, active calls, recent calls, spend, failures, alerts
- Agents: create, clone, pause, edit prompts, choose model/voice, assign tools
- Phone numbers: assignments, inbound routing, status
- Calls: live/recent calls, outcomes, transcripts, summaries, recordings when enabled
- Contacts: consent status, do-not-call state, notes, source
- Campaigns: draft, approval, schedule, limits, results, emergency stop
- Scheduling: Calendly status, event types, upcoming bookings, sync status
- Knowledge: Scout knowledge source status and refresh/testing tools
- Prompts: version history, diff, rollback, test conversations
- Costs: per-provider usage, daily/monthly caps, projections
- Integrations: provider connection health; never display full secret values
- Audit log: authentication, config changes, calls launched, exports, deletes
- Settings: disclosures, retention, time zone, quiet hours, emergency contacts

## Minimum data model

- users
- sessions
- agents
- agent_versions
- phone_numbers
- contacts
- contact_consents
- suppression_entries
- calls
- call_events
- call_messages
- call_artifacts
- campaigns
- campaign_contacts
- appointments
- integration_connections
- usage_ledger
- budgets
- alerts
- audit_events

Store provider IDs and metadata, not provider secrets. Encrypt sensitive fields at rest. Use retention policies for transcripts and recordings.

## Call lifecycle

1. Provider sends signed webhook.
2. API verifies signature, timestamp, replay protection, and provider account.
3. Event is written idempotently.
4. Router loads the assigned agent version and contact state.
5. Agent receives only required context and approved tools.
6. Tool calls are authorized server-side.
7. Outcome, costs, transcript, and summary are stored according to retention settings.
8. Escalations create a visible dashboard alert and optional email notification.

## Free-first implementation strategy

- Use Vapi's available free U.S. number for the first controlled prototype.
- Use Vapi as the initial real-time call transport rather than rebuilding low-latency PSTN audio infrastructure.
- Bring existing model/provider keys only through server-side integration settings.
- Use Calendly embed and API polling/sync on the free plan; do not depend on paid webhooks.
- Run lightweight orchestration on Google Cloud free-tier compute where practical.
- Keep Tortoise TTS as an experimental offline/custom voice path until measured end-to-end latency proves it works for live calls.
- Reuse ProjectHub/Scout as the grounded knowledge and model-routing service after its API contract and authentication are audited.

“Free” does not mean unlimited. PSTN usage, model inference, transcription, voice generation, storage, and egress can become billable. The dashboard must show those boundaries and stop usage before accidental charges.

## Phase plan

### Phase 0: discovery

Inventory the Gatsby site, ProjectHub/Scout, Tortoise TTS app, Convo-AI, local Mac services, current Google Cloud VM, Netlify Identity configuration, Vapi account capabilities, and Calendly account/API access.

### Phase 1: secure control-plane skeleton

- private app shell
- real server authentication
- database migrations
- provider adapter interfaces
- encrypted integration settings
- audit log
- read-only system status
- feature flags

### Phase 2: Vapi inbound MVP

- connect one Vapi number
- one receptionist agent
- verified webhook endpoint
- call list/detail pages
- transcript and summary ingestion
- pause/kill switch
- strict cost cap

### Phase 3: Scout and scheduling

- grounded Scout knowledge endpoint
- safe tool contract
- Calendly event-type and availability display
- scheduling link or Scheduling API flow
- human escalation

### Phase 4: controlled outbound

- consent registry
- suppression list
- quiet hours in America/Chicago
- campaign draft and explicit approval
- per-campaign limits
- identity/disclosure script
- immediate opt-out handling

### Phase 5: custom voice experiments

Benchmark Tortoise TTS and other owned voice projects for startup time, real-time factor, streaming support, concurrency, CPU/GPU requirements, voice rights, and audio format compatibility. Do not route production calls to custom TTS until it passes defined latency and reliability gates.

## Acceptance gates before production calling

- authentication penetration checklist complete
- no secrets in built Gatsby assets
- signed webhook verification and replay tests
- idempotency tests
- budget stop tests
- campaign approval and suppression tests
- recording disclosure configuration reviewed
- data export/delete and retention controls tested
- failure fallback to message-taking or human handoff
- production number can be paused from one dashboard control
- complete audit trail for all privileged actions
