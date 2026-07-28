# Voice Platform Collaboration Protocol

## Purpose

This document coordinates work between Bradley, ChatGPT, Devin, and the repositories involved in the AI business operations and voice platform.

## Current repository reality

- `voice-ops-platform` is currently local-only on Bradley's Mac, has no Git repository, no remote, no deployment, and no verified operational components.
- `gatsby-starter-minimal-blog` contains the live `bradleymatera.dev` website. Production must not be changed directly.
- `ProjectHub` is the production knowledge and grounded-response system.
- `ProjectHub-dev` is the staging deployment target for ProjectHub work.

## Work ownership

### ChatGPT owns

- Product architecture
- Cross-repository design
- Vapi and Calendly replacement requirements
- Security boundaries
- Approval levels
- MCP and ChatGPT control design
- Acceptance criteria
- Audit review
- GitHub-side planning documentation
- Reviewing Devin's commits, diffs, tests, benchmarks, and deployment evidence
- Identifying contradictions and unsupported claims
- Updating this coordination document when architectural decisions change

ChatGPT may edit accessible GitHub repositories only on non-production branches unless Bradley gives a separate explicit production instruction.

### Devin owns

- Local inspection of `voice-ops-platform`
- Initializing Git safely after Bradley approves
- Secret scanning before the first commit
- Creating and maintaining the private `voice-ops-platform` GitHub repository
- Local implementation
- Unit, integration, security, performance, and acceptance tests
- Local and cloud benchmarks
- Cloud deployment work explicitly approved by Bradley
- Telephony proof-of-concept work
- Keeping repository documentation synchronized with real implementation state
- Pulling ChatGPT-authored planning changes before beginning each new work package
- Publishing frequent checkpoint commits so ChatGPT can review current work

### Bradley owns

- Final approvals
- Account creation and credential entry
- Payment or carrier decisions
- Production deployment approval
- Live telephone testing approval
- Outbound calling approval
- Legal, tax, financial, or regulated decisions requiring a qualified professional

## Branch and repository rules

### `gatsby-starter-minimal-blog`

- `master` is production.
- ChatGPT planning work remains on `feature/voice-agent-control-center` unless a new branch is explicitly created.
- Devin must fetch this branch before starting each work package and read the latest documents under `docs/voice-platform/`.
- Devin must not merge planning changes into `master`.

### `ProjectHub`

- `master` is production.
- `develop` is integration.
- New implementation work must branch from `develop`.
- Devin must stage through the existing `ProjectHub-dev` workflow.
- ChatGPT may audit and update documentation on a non-production branch, but implementation changes should be isolated and reviewed.

### `voice-ops-platform`

Before implementation continues:

1. Create a strong `.gitignore`.
2. Run a secret scan.
3. Initialize Git.
4. Create a private GitHub repository.
5. Commit the current local prototype as a baseline snapshot.
6. Push the baseline.
7. Create `develop` from `main`.
8. Perform feature work only on branches created from `develop`.
9. Open pull requests into `develop`.
10. Never place real credentials, SQLite runtime databases, recordings, generated speech, transcripts, or private customer data in Git.

Recommended branch examples:

- `audit/repository-baseline`
- `feat/auth-hardening`
- `feat/provider-health`
- `feat/streaming-audio-contract`
- `feat/squad-orchestration`
- `feat/scheduling-core`
- `feat/calendar-google`
- `feat/calendar-microsoft`
- `poc/asterisk-audio-bridge`
- `poc/freeswitch-audio-bridge`
- `feat/mcp-read-tools`

## Synchronization protocol

Before Devin starts a new work package:

1. Fetch all remotes.
2. Pull the latest planning branch from `gatsby-starter-minimal-blog`.
3. Pull the latest `develop` branches from `ProjectHub` and `voice-ops-platform`.
4. Read `docs/voice-platform/COLLABORATION-PROTOCOL.md`.
5. Read the current architecture, acceptance, and audit documents relevant to the task.
6. Compare the requested work against current code before editing.
7. Record the starting commit SHA for every repository touched.

During work, Devin must create checkpoint commits after each independently reviewable result. A checkpoint should normally include one of:

- Schema and migration
- Provider adapter
- API route and tests
- UI page and tests
- Benchmark harness
- Security control
- Documentation update
- Deployment configuration

After each checkpoint, Devin must update:

`docs/progress/CURRENT-STATUS.md`

The status file must contain:

- Date and time
- Repository
- Branch
- Starting SHA
- Current SHA
- Work package
- Files changed
- Tests run
- Exact results
- Real services used
- Mocked or unavailable services
- Known failures
- New decisions
- Questions for ChatGPT
- Next checkpoint

## ChatGPT review protocol

When Bradley asks ChatGPT to review current work, ChatGPT will:

1. Fetch the latest branch and commit metadata from GitHub.
2. Compare the relevant branch against its base.
3. Inspect changed files and tests.
4. Check implementation against the current acceptance criteria.
5. Report defects, missing evidence, security concerns, architecture drift, and next actions.
6. Update GitHub-side planning documents when the architecture or requirements need correction.

ChatGPT will not claim local-only work is verified until Devin pushes it and provides reproducible evidence.

## Conflict resolution

When implementation conflicts with a planning document:

- Devin must not silently change the requirement.
- Devin must document the conflict in `CURRENT-STATUS.md`.
- Devin may propose an alternative with evidence.
- Bradley and ChatGPT decide whether to revise the architecture.
- The final decision must be committed to the relevant architecture decision record.

Create architecture decisions under:

`docs/adr/ADR-####-short-title.md`

Each ADR must include:

- Context
- Decision
- Alternatives considered
- Evidence
- Security impact
- Cost impact
- Performance impact
- Migration or rollback plan
- Approval status

## No-fake-data rule

Production-facing features must never present fabricated operational data.

Allowed:

- Empty states
- Explicit test fixtures inside automated tests
- Explicitly labeled development-only fixtures
- Synthetic load-test audio and contacts that cannot be mistaken for real customer data

Not allowed:

- Fake calls displayed as real calls
- Fake provider health
- Fake appointment availability
- Fake cloud quotas
- Fake transcripts presented as real
- Fake deployment status
- Mock adapters silently used in production

## Evidence standard

A component is classified as operational only when all applicable evidence exists:

- Pushed source code
- Commit SHA
- Reproducible setup
- Automated tests
- Real integration test
- Persistence after restart
- Failure behavior
- Security checks
- Deployment evidence
- Monitoring or health evidence
- Operations documentation

## Work-package order

The current preferred order is:

1. Put `voice-ops-platform` under private version control.
2. Establish tests and CI.
3. Verify and harden authentication, sessions, CSRF, encryption, and audit logging.
4. Build normalized provider contracts and real health checks.
5. Integrate ProjectHub's grounded retrieval and provider failover safely.
6. Build the streaming audio contract and benchmark harness.
7. Benchmark STT, LLM, and TTS paths.
8. Build squad orchestration with permission isolation.
9. Build the independent scheduling core and race-condition tests.
10. Build direct Google and Microsoft calendar adapters.
11. Compare Asterisk and FreeSWITCH through real proof-of-concept branches.
12. Select telephony through an ADR backed by measurements.
13. Connect real inbound telephony.
14. Build read-only MCP tools and approval services.
15. Add reversible control tools.
16. Add outbound calling only after consent, suppression, quiet-hours, audit, and emergency controls pass acceptance testing.

## Required periodic update from Devin

Devin must pull the latest planning documents at the start of every work package and at least once before finalizing a pull request.

Devin must push a reviewable checkpoint whenever one of the following occurs:

- A major component starts working
- A benchmark completes
- A provider or account blocks progress
- An architectural assumption proves false
- A security issue is discovered
- A migration changes the data model
- A telephony proof of concept succeeds or fails
- A release candidate is ready

This protocol remains authoritative until replaced by a newer committed version.
