# Gatsby theme shadow

This directory exists because Gatsby theme shadowing requires exact file paths.

Treat these files as adapters.
They should stay thin and import the real app code from:
- `src/features`
- `src/site`
- `src/ui`

Rule: do not let this directory become the source of truth for feature logic.
