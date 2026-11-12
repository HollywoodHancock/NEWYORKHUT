# Search comparison and legacy URL repair — November 12, 2026

## Evidence

Source: the user's native Search Console ZIP `newyorkhut.com-Performance-on-Search-2026-11-12.zip`, comparing “Last 28 days” against “Previous 28 days”, Web (text-based). Filters.csv does not state exact date boundaries, and no daily Chart.csv is included. Do not invent explicit dates or attribute this comparison to today's release.

Device rows sum to the following totals, independently matched by the country rows. Average positions are approximate impression-weighted calculations from rounded device positions.

| Metric | Previous 28 days | Last 28 days |
| --- | ---: | ---: |
| Impressions | 85 | 140 |
| Clicks | 0 | 1 |
| Approximate average position | 58.3 | 46.3 |
| US impressions | 82 | 105 |
| Named-query impressions | 68 | 74 |

Impressions increased by a derived 64.7%, but the base is extremely small and remains far below the August baseline. Only 74 of the 140 current-period impressions appear in named-query rows; do not sum queries or pages as a substitute for property totals. Aggregate position improvement also reflects a changing query mix; it is not proof that the same queries gained 12 positions.

Pages.csv shows the homepage increasing from 67 to 89 impressions, with position improving from 64.91 to 52.33. Tools increased from six to 15 impressions while its average position moved from 3.17 to 14.73. Filing deadlines had three current impressions at position eight. The main overview had two current impressions at position 81, compared with eight at 56.75. One- or two-impression positions do not establish durable rankings or justify mass title/content changes. Broad commercial phrases remain weak and are not the knowledge site's primary recovery target.

User-supplied native account checks now confirm: no reported Manual Actions or Security Issues; main sitemap successfully processed November 8 with 75 discovered pages; the homepage, tools, filing deadlines, box-truck guide and cancellation answer are indexed with the intended Google-selected canonicals. The inspected crawls predate the November 12 recovery release. No current index block is demonstrated for those five pages. These results do not exclude algorithmic ranking issues.

## Confirmed repair

All 66 URL rows in Pages.csv were checked live, following redirects. Six ended in 404; the others reached 200. These six correspond to the alternate historical educational site's slugs. Review of its source and the current destinations supports this explicit map:

| Old path, with or without trailing slash | Matching existing answer |
| --- | --- |
| `/what-is-new-york-highway-use-tax` | `/new-york-hut-guide` |
| `/ny-hut-account-closure` | `/new-york-hut/how-do-i-close-a-new-york-hut-account` |
| `/ny-hut-certificate-cancellation` | `/new-york-hut/how-do-i-remove-or-cancel-a-hut-vehicle` |
| `/ny-hut-mileage-record-requirements` | `/learn/hut-recordkeeping-requirements` |
| `/ny-hut-filing-frequency-changes` | `/filing/quarterly-due-dates` |
| `/irp-vs-ny-hut` | `/learn/irp-apportioned-registration` |

Add these to the existing explicit redirect map so all HTTP/HTTPS and www/non-www variants resolve in one 301 to the final HTTPS canonical, preserving query parameters. No page is deleted, no transactional destination is introduced, and no new content or tax claim is added. Existing internal-link/sitemap reconciliation uses the same map. Existing runtime and production guards automatically cover the expanded map; test host coverage is extended to all four origins.

This repairs confirmed broken destinations. Their recorded impressions are few; do not present them as the sole cause of the site-wide visibility loss or predict a specific amount of recovered traffic.

Rollback baseline: `73befd9af780758f3d259475d011a5b3d1b8e714`. The prior knowledge-base release remains intact. Deployment and live completion evidence are recorded in the associated pull request.

## Next ranking decision

Keep the successful knowledge-base release stable through recrawl. Prioritize tools, filing/forms, requirements, mileage records and vehicle-specific questions. Measure settled page/query results and attributable NYHUT.com referrals. No additional URL consolidation, mass page expansion, paid service, GSC Wizard call or repeat indexing submission is justified by this low-volume comparison alone.
