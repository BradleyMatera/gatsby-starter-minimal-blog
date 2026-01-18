# Refactor Changelog

- Added `docs/BUILD-STATUS.md` to capture the working commands (`npm install`, `npm run dev -- --help`, `npm run test`, `npm run build`, `npm run check`).
- Captured the new folder proposal in `docs/FOLDER-STRUCTURE-PROPOSAL.md` and created the empty directories (`src/layout`, `src/sections`, `src/primitives`, `src/visuals`, `src/hooks`, `src/utilities`) so future moves can happen in a predictable spot.
- Introduced the smoke test script `scripts/verify-main-route.js` plus new `test`/`check` scripts in `package.json`; `eslint.config.js` now ignores `scripts/**` so lint focuses on source files.
- Renamed `src/utils/cx.ts` to `src/utils/joinClasses.ts` and updated every importer inside `src/components` and the shadowed theme components to use the descriptive helper name.
- Authored the new onboarding docs `docs/PROJECT-TOUR.md`, `docs/ARCHITECTURE.md`, `docs/ENVIRONMENT.md`, `docs/DEBUGGING.md`, `docs/DEPLOYMENT.md`, `docs/GLOSSARY.md`, plus the rollout plans in `docs/CHANGELOG-REFactor.md` and `docs/NEXT-STEPS.md`.
- Future move plan: use the new directories to relocate UI/layout/section files in batches, keeping imports aligned via re-exports if necessary. (No files have yet moved out of `src/components/` to avoid braking references while the new layout is validated.)
