# Codex Build Instructions

1. Preserve all pre-existing uncommitted changes; do not reset or clean.
2. Work in the nested repository `jumbos-hamburgers-tulsa`.
3. Use the centralized data in `lib/site-data.ts` for NAP, URLs, menu facts, and event names.
4. Prefer the authoritative CSS/browser-API depth system. Keep R3F optional and use it only when it improves the approved composition without weakening fallbacks.
5. Treat the reference images as visual direction, not factual menu sources.
6. Run `npm run build`, then automated tests. Fix failures and rerun.
7. Perform screenshot-led QA at every width listed in `QA-CHECKLIST.md`. Compilation alone is not completion.
8. Do not deploy or write to production.
