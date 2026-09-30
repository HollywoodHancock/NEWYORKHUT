# SEO release rules — NewYorkHUT.com and NYHUT.com

These rules apply to future search work on both sites. This repository deploys the NewYorkHUT.com educational Worker only. Changes to NYHUT.com require its own repository, tests, and release review; never change its ordering or payment flow as a side effect of educational SEO work.

## Before a change

1. Record the date, deployed version, affected URLs and queries, and the reason for the change. Save a Search Console baseline for the same property, search type, pages, and queries using the previous 28 days and 7 days. Mark any missing or unverified data explicitly. Public search observations are separate from verified Search Console data.
2. State one measurable hypothesis and one primary change per release. Fix defects with clear evidence immediately; give ranking experiments time to be recrawled and measured before making another change to the same URLs.
3. For any URL, host, or content consolidation, prepare an old-to-new URL map before editing. Use direct permanent redirects to the most relevant live page. Align internal links, sitemap URLs, and self-referencing canonicals. Check top traffic and legacy URLs individually. Avoid simultaneous host migration and title/content overhaul where practical.
4. State the domain role: NewYorkHUT.com answers the question and links contextually to the relevant NYHUT.com action; NYHUT.com handles orders. Neither site's canonical should point to a different domain merely to create a funnel. Do not duplicate near-identical pages across domains.

## Build and release

5. Make page metadata and navigation deliberate at the source. Do not add another broad, sitewide regex replacement or versioned Worker wrapper to solve a local page problem. Refactor the page shell or use an explicit route-scoped transformation when needed, with final-response tests for affected routes.
6. Review the final HTML returned by the active Worker on the homepage, major hubs, affected pages, and one long-form article. An indexable page must return 200, have one title, one canonical matching its intended URL, one H1, one visible primary navigation, one footer, no `noindex`, and useful main content. Check mobile rendering and crawlable links for visible UI changes.
7. Verify redirects end at the intended 200 URL without a loop or unnecessary chain. Test HTTPS/non-www variants, old URLs, sitemap, robots rules, and contextual links to the correct NYHUT.com destination. Run the build, functional guard, and live sitemap audit. After deployment, require the live deployment probe and production smoke checks to pass.
8. Keep a rollback path: identify the prior commit and restore it if production renders incorrectly, indexing is accidentally blocked, or critical order links fail. Log the deployment date and exact changed URLs so subsequent traffic changes can be attributed accurately.

## After release

9. Check the live technical contract immediately. Review Search Console twice weekly for material indexing or query/page changes. Compare like-for-like periods and account for reporting lag, seasonality, and recrawl. Revisit the affected URLs after about one week and again after two weeks if they have not been recrawled. Escalate an unexpected `noindex`, wrong canonical, broken redirect, or order-link failure immediately.
10. Do not present an accepted sitemap, indexing request, `site:` search, or public ranking observation as proof of recovered performance. Use verified Search Console impressions, clicks, page/query breakdowns, and Google-selected canonicals to decide whether the hypothesis worked. Record the result before the next experiment. Avoid repeated indexing requests for unchanged pages.

## Release note template

- Hypothesis and intended outcome:
- Baseline and source (or access limitation):
- Affected URLs / queries / domain:
- Old-to-new URL map, if any:
- Changes made and prior commit for rollback:
- Build, final-response, redirect, sitemap, and order-link checks:
- Deployment timestamp and probe version:
- One-week and two-week Search Console review:
- Result: confirmed, inconclusive, or reverted:

The September 2026 visibility drop began before the September 10 markup cleanup. Its exact cause remains unproven; these rules prevent known classes of mistakes and make future causes easier to isolate. They do not guarantee a ranking timeline.
