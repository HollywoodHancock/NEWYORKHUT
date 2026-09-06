# NewYorkHUT deployment configuration fix — 2026-09-06

Cloudflare native Git deployment must use the same Worker configuration as the repository's explicit Wrangler scripts.

This release synchronizes `wrangler.json` with `wrangler.jsonc` so either default-config discovery or the explicit package scripts deploy the same entrypoint, static asset binding, compatibility date, and v106 release marker.

Expected production entrypoint: `src/index.js`
Expected release: `v106-intent-specific-cross-domain-funnel-2026-09-06`
Expected diagnostic route: `/__deploy_probe`
