# October 13, 2026: Repair legacy XML sitemap and handler-alias gaps

Reason: user's October 12 Search Console screenshot shows visibility still near zero after the late-August drop; user explicitly requested repair. Verified GSC screenshot totals are 16 clicks, 2.29K impressions, 0.7% CTR, 37.4 average position for the displayed three-month range. The screenshot does not prove the cause or the Google-selected canonicals. GSC Wizard refused data reads because the subscription/trial is inactive. No direct GSC inspection or recovery claim is made.

Confirmed defects in code and live routes:
- The current main sitemap was correct, but 24 legacy XML sitemaps were still served. Five contained 13 redirected entries: weights (7), permit types (2), filing (1), FAQ (2), guides (1). Our prior checks missed these.
- v114 appended nine historical traffic URLs to every XML response, placing unrelated filing, vehicle, and cost entries into topic sitemaps. The change now applies only to the main sitemap.
- Source-handler aliases /complete-guide-to-new-york-hut, /tools/hut-calculator, and /tools/trip-estimator continued returning older guide/calculator content under self-referencing canonicals. The canonical routes had since been improved by later handlers. /tools/trip-cost-estimator already redirected but its alias now follows the same explicit map on every host.

Corrections:
- Apply the existing reviewed canonical map and deduplication to all 25 XML sitemaps; core guide inclusion remains specific to /sitemap.xml.
- Redirect the three stale 200 copies and existing trip-cost alias directly to their updated canonical guide or tax estimator, preserving query strings.
- Rewrite any incoming links to these known aliases through the existing reconciliation function.
- Add local final-response tests for all sitemaps and their destinations, and a live scheduled audit for every sitemap and every unique declared URL.

The primary URLs, titles, content, canonical hostname, and NYHUT.com ordering implementation are preserved. This is a technical consistency repair, not a promise of traffic recovery or proof these defects caused the August drop. A hostname rollback is not justified by the screenshot: the August 26 code used explicit 301s, and the currently checked redirects work. The initial claim that Response.redirect defaulted to 302 does not describe that commit.

Validation: 25 regression tests; all 25 locally rendered sitemaps resolve only to distinct, final, indexable 200 URLs; compiled Worker dry-run; production-contract safeguards. Postpublication: live all-sitemap audit, existing root sitemap and route checks, compiled browser calculator parity tests, release probe.

Release marker: v118-all-sitemap-canonical-repair-2026-10-13. Rollback baseline: dbbd635d04be2381ac46c514d5e31850a773b408. The main sitemap still has 73 URLs; legacy topic sitemaps retain their own content rather than receiving unrelated historical additions.

Next performance assessment must use actual page/query data and Google-selected canonicals when access is available. More arbitrary title, URL, host, or bulk content changes are not justified by this screenshot.
