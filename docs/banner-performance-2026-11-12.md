# Banner delivery improvement — November 12, 2026

- Domain: NewYorkHUT.com educational knowledge base; NYHUT.com remains the ordering destination.
- Prior deployed commit / rollback target: `bfae41e2bb28bfcd92c5fed12d6fbf5c251213c1`.
- Hypothesis: reducing the existing banner payload and removing its remote GitHub dependency improves delivery without changing content, appearance, URLs or ranking signals.
- Scope: only banner image delivery on pages already using the shared banner. No page titles, copy, navigation, canonicals, sitemaps, robots rules or redirects changed.

## Measured baseline

The production banner returned 1,723,581 bytes, PNG, 2126 × 628 pixels. Its SHA-256 matched `public/newyorkhut-header-banner.png`: `9345a238cc75a7f8025969754a395701198dca613a647ef637dc738528d2274f`. The v83 handler fetched this image from raw.githubusercontent.com with a one-day cache. The image was eagerly loaded but had no explicit fetch priority.

Lossless WebP encoding (Pillow, method 6) produced 1,155,970 bytes: 567,611 bytes / 32.93% smaller. Decoded RGB pixel comparison was exactly equal. Fingerprint SHA-256: `bda5bffb9eba1a7c55f437a079ab847ffa43c4752b529cc4fd7f61e236d2fff5`.

The assessment supplied a performance score of 72 and an LCP warning, but no timings, test device, trace or LCP element. Browser tracing and field CWV instrumentation were unavailable in this environment. Payload measurements are verified; an LCP improvement or new Lighthouse score is **not** claimed. The banner is a plausible LCP candidate, not a measured LCP element.

Native GSC baseline is the November 12 exported last-28-day comparison recorded in `search-export-followup-2026-11-12.md`: 140 versus 85 impressions, one versus zero clicks. Exact date ranges and 7-day series were absent. These tiny counts do not establish recovery or isolate performance effects.

## Change

The existing scoped banner handler uses the bundled `ASSETS` binding for both the fingerprinted WebP and historical PNG route. The fingerprinted image receives a one-year immutable browser cache; PNG compatibility retains one day. Asset ETags, MIME type, HEAD and conditional requests are preserved. The same banner markup keeps its alt text, dimensions and CSS and adds `fetchpriority="high"`. No preload, new wrapper or broad page rewrite added.

## Validation

- 75 main-sitemap page bodies compared before/after: byte-identical after normalizing only banner src and fetchpriority.
- 33 runtime tests passed, including sitemap/canonical/redirect, knowledge-base, calculator and banner delivery tests.
- Bundled calculator: six tests passed. Production contract and Wrangler dry-run passed; both image assets included.
- Live delivery, visual rendering and sitemap checks are required after native deployment; results recorded in the pull request.

## Backlink review

The five assessment PDFs include only a risk summary, with no referring-domain list, source URLs, anchor text, dates or link attributes. Two public search engines did not return a usable external backlink inventory. The unusual referring domain in the supplied native URL inspection is a discovery clue, not evidence of a harmful link scheme. No link removal, disavow or outreach is justified by the material available. The actual risk claim remains unverified pending a link-level inventory from free native Search Console or the report provider.

## Follow-up

Keep the repaired URL structure and educational content stable. Assess field CWV/LCP when native data is available; compare like-for-like Search Console windows around November 19 and 26 with recrawl/reporting lag acknowledged. This release is a delivery correction, not a ranking experiment or evidence explaining the September collapse.
