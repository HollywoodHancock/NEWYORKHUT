# NewYorkHUT.com search recovery — November 12, 2026

## Finding and evidence limits

The leading historical cause is a disruptive replacement of the site's URL structure around the August 26 deployment/cutover. This is stronger evidence than a generic claim about ranking volatility. It is not a confirmed account of every response Googlebot received, and it does not prove that one event alone explains continued suppression.

Sources inspected:

- User's native Search Console export `newyorkhut.com-Performance-on-Search-2026-11-04.zip`: Web (text-based), Chart.csv and Pages.csv. Its data ends November 1. Also cross-checked the September 10 and October 19 exports.
- Current NEWYORKHUT repository, baseline commit `cb527388ffad988f76d91e12b5ae403ae42f4129`.
- Historical COMPLIANCE-UNIVERSITY repository at `73dc2a7`, whose latest commit is August 26. Its build and validator reproduce 38 HTML files and 37 sitemap URLs.
- Cloudflare account deployment history, zone audit logs, active custom domains, native build triggers, bot configuration and redirect rules, read November 12.
- Google Search Status Dashboard ranking history: https://status.search.google.com/products/rGHU1u87FJnkP6W2GwMi/history . No announced rollout in that history starts on the September 1 break. This does not exclude unannounced ranking changes.

Derived from Chart.csv; average position is impression-weighted:

| Period | Days | Clicks | Impressions | Impressions/day | Average position |
| --- | ---: | ---: | ---: | ---: | ---: |
| August 3–30 | 28 | 14 | 2,048 | 73.14 | 36.33 |
| August 31–September 27 | 28 | 0 | 141 | 5.04 | 50.12 |
| September 28–October 25 | 28 | 1 | 98 | 3.50 | 53.23 |
| October 26–November 1 | 7 | 0 | 42 | 6.00 | 42.76 |

The first two equal-length periods show a derived 93.1% impression decline. Daily impressions were 55 on August 30, 44 on August 31 and 3 on September 1. This is a sustained visibility loss, not merely the last few incomplete reporting days.

The export contains 15 clicks across 12 paths: four on `/tools` and one on each other path in `scripts/search-recovery-pages.mjs`. Eleven clicks were credited to HTTP/www URLs. The historical alternate build has neither a page nor an explicit redirect for **any of those 12 paths**; its configured `404-page` handling makes those omitted routes fail instead of transferring their relevance. Its own validation still passed because it validated its replacement inventory, not the earlier site's successful URLs.

Cloudflare logs show DNS record replacement and certificate changes on August 26 and September 6. The `newyorkhut` Worker was deployed five times on August 26 before the `complianceuniversity` application was deployed repeatedly later that day. The earlier conversation records describe the domain cutover to the latter application. The November 12 API read confirms both live hostnames now belong to the correct `newyorkhut` service. Historical audit reads do not establish the complete hostname-to-service assignment interval or Google's selected canonicals during that interval; do not overstate the cause as proven.

Some individual educational pages had first-page average positions, including box-truck guidance and filing deadlines. The export does **not** establish first-page placement for the broad commercial query “new york hut permit”; its aggregate position was around 70. Recovery should distinguish restoring demonstrated educational visibility from attaining new rankings.

## November 12 direct checks before this release

- All 75 main-sitemap pages fetched: no detected canonical, noindex, title-count, H1-count or footer-count defect.
- 77 additional internal link targets checked: 76 returned 200; the recordkeeping alias returned its intended 301.
- Every historically clicked HTTP/www URL checked: direct 301 to the same HTTPS/non-www path; current destinations return 200 in runtime checks.
- Unknown invented URL: 404.
- Current bot fight mode is disabled. The general robots group permits search crawling. This is not proof of every Googlebot request's status.
- No new DNS, canonical host or URL migration is justified by these current checks.
- Current Search Console manual actions, security issues, Google-selected canonicals, crawl history and data after the saved exports have not been inspected. They remain open evidence gaps. GSC Wizard must not be called: the user has no subscription and explicitly prohibited retries.

## Domain roles and search intent

NewYorkHUT.com is the knowledge base. NYHUT.com owns paid-service ordering, payment, customer accounts and fulfillment. Both keep their own canonical URLs.

| Educational question | Existing NewYorkHUT.com destination |
| --- | --- |
| Who needs HUT? | `/learn/who-needs-a-new-york-hut-permit` |
| Does a box truck need HUT? | `/vehicles/box-trucks` |
| What are the state fees and tax costs? | `/cost` |
| When is MT-903 due? | `/filing/quarterly-due-dates` |
| How do I remove a truck? | `/new-york-hut/how-do-i-remove-or-cancel-a-hut-vehicle` |
| How do I update a plate? | `/new-york-hut/how-do-i-change-a-license-plate-on-a-hut-credential` |
| How do I replace a missing document? | `/learn/lost-hut-certificate`, `/learn/lost-or-damaged-hut-decal` |
| How do I estimate HUT or check requirements? | Existing free tools under `/tools` |

Keep transactional phrases such as apply, buy, order, checkout and permit processing focused on NYHUT.com. Referral links remain contextual and attributable.

## Release hypothesis and implementation

Primary hypothesis: make useful existing educational answers easier for readers and crawlers to reach from the homepage and relevant guides, while clearly preserving the two-domain purpose. No URL, redirect-map, tax-rule, rate or transaction-flow change is part of this release.

- Existing homepage layout now leads with guides and free tools instead of a permit-service catalog. Its primary hero action opens the HUT guide. It offers six knowledge topics, four common questions and six existing practical-answer links. The final paid-service handoff remains at NYHUT.com with referral parameters.
- Homepage title, description and its original structured-data graph describe the knowledge base; the original graph no longer declares NewYorkHUT.com to be a permit-processing `Service`.
- Registration and certificate guides link to the relevant existing box-truck and vehicle-change answers.
- The vehicle hub's eight cards link directly to main-sitemap canonical guides instead of sending readers through older duplicate slug variants. The older pages remain available; this release does not remove their content or redirect them.
- A fixed historical-click inventory protects the successful paths independently of whatever a future sitemap contains. Local tests verify their 200s, self-canonicals and three noncanonical-host variants. The live functional check now checks these paths, their actual canonical values and HTTP/www redirects. Existing six-hour smoke checks execute that live check.
- Both Wrangler config files and the deployment marker use `v118-knowledge-recovery-2026-11-12`.

## Validation and release status

Before publishing: 30 runtime tests passed, production contract passed, Wrangler dry-run passed, and six compiled-calculator tests passed. All pre-existing route-status contracts remain covered. Local Chromium screenshot capture was unavailable because this runtime disallowed its process singleton socket; do not claim desktop/mobile visual QA was completed. The homepage reuses the existing layout classes and responsive styles.

Rollback baseline: `cb527388ffad988f76d91e12b5ae403ae42f4129`. Revert this release as one unit if production loses content, links, indexability or tool behavior. Do not restore the historical alternate site's reduced URL inventory.

Production deployment and post-deployment results are recorded in the release completion entry below after verification.

## Measurement and next decisions — no paid services

Use native Google Search Console and its CSV/ZIP exports. No GSC Wizard, ads, paid rank tracker or purchased links are needed.

1. Check Search Console Manual Actions and Security Issues, then inspect the homepage, `/tools`, filing deadlines, box-truck guide and one vehicle-change answer. Record the Google-selected canonical and last crawl. A manual action or unexpected canonical takes priority over content experiments. This requires access to the native account; current evidence cannot clear those checks.
2. Request indexing once for a changed priority page after a successful live test. Unchanged pages do not need repeated requests. Sitemap acceptance or a request submission is not recovery evidence.
3. Review settled seven-day page/query results after recrawl, with a first review target of November 19 and a second target of November 26. These are review targets, not newly created scheduled tasks. Compare informational queries separately from commercial queries and retain the same Web search filter.
4. Record impressions, clicks, top-10 query positions and attributable referrals to NYHUT.com. The baseline is weak and low-volume; do not infer a win from one click or promise a fixed ranking date.
5. If crawled pages remain suppressed, prioritize the real questions and pages with prior visibility for a source-checked content review. Do not mass-create similar pages, add fabricated expertise, buy links or repeat URL consolidations without page-level evidence.

Success means renewed educational search visibility and useful referrals to NYHUT.com. Technical checks passing is a prerequisite, not the definition of success.
