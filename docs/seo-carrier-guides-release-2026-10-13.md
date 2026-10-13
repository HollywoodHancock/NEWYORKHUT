# Carrier decision guide release — October 13, 2026

Authorized goal: improve useful search landing pages and verify the NewYorkHUT.com → NYHUT.com → paid-order path. This release improves six existing canonical pages, preserving their existing final titles and H1s. No migration or new redirect map is introduced.

Pages:
- /learn/who-needs-a-new-york-hut-permit — gross/unloaded method, threshold examples, occasional trips, leased vehicles, dispatch verification.
- /learn/new-york-hut-certificate-of-registration — certificate storage, issued TR-8, identity/vehicle reconciliation, plate/weight revisions, lease requirements, duplicates, tax clearance.
- /learn/new-york-hut-decals-explained — vehicle-specific nontransferability, placement by equipment, replacement, five-day surrender events.
- /services/hut-renewals — actual current state renewal-page status, no invented series window/expiry date, renewal versus registration/replacement, account preparation, tax returns separate.
- /cost — state fees versus commercial quotes versus mileage tax and late charges; illustrative rate examples; trip scope; correct pricing and filing handoffs.
- /learn/new-york-hut-exempt-vehicle-guide — design/use versus exclusive-use tests, whole-month effect of nonexempt use, equipment distinctions, farming/household goods/recreational/bus examples, evidence checklist.

Sources checked October 13:
- https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/hut/certificate_of_registration.htm
- https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/hut/decals.htm
- https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/hut/excluded_and_exempt_vehicles.htm
- https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/hut/cor_trip_certificate.htm
- https://www.tax.ny.gov/bus/hut/hut-renewal.htm
- https://www.tax.ny.gov/bus/hut/huidx.htm
- Existing October 6/7 checked MT-903 instructions, Schedule 1 rates, enforcement and filing material used for cost examples; source links retained.

Each guide uses the existing substantive guide renderer, organization authorship, source list, accessible contents navigation, related guides, and service-specific tracked NYHUT link. Existing six guides retain October 6 review dates; only newly reviewed pages use October 13 in visible text, Article dateModified, and XML lastmod. Main sitemap includes the six updated guides; count becomes 75 because four were already listed and two existing canonical pages were absent.

Attribution verification — read only, no transactional changes:
Current NYHUT main tree f3f23597647f062262abc3612f1c074133c71722 was reviewed. conversionTracking captures source/UTM fields; stripe.ts sends them with checkout; create-checkout-session saves them in public_orders; stripe-webhook marks that same record paid without removing acquisition fields; AttributionDashboardPage reads public_orders.
Aggregate NYHUT production SQL for August 1 through the October 13 cutoff returned one September and one October NewYorkHUT-tagged paid record whose stored Stripe event has livemode=true. These demonstrate referral attribution retained through live payments, not organic-search origin. August had zero tagged order records; that does not prove zero untagged referrals. A read-only last-28-day event count also showed 35 recorded referred visitor IDs on page_view and 18 on view_order_form; these are instrumented records, not reconciled unique customers or conversion rates.
No names, tax IDs, customer details, or individual order IDs were retrieved. No payments or test orders were created.

Measurement baseline: the supplied Search Console screenshot still shows collapsed impressions and is not page/query detail. GSC Wizard is unavailable due to expired subscription/trial; direct Search Console requires Google sign-in in the cloud browser. Neither limitation establishes a cause. This release cannot be called ranking recovery at deployment time.

Validation: 26 regression tests covering indexability and canonical URLs across all published XML sitemaps, expected source facts, review dates, functional calculator parity, all linked internal guide destinations, and correct CTA source/content tags. Worker dry-run and production contract. Existing six deployment workflows include live page, route, sitemap and bundled calculator checks.

Release marker: v118-carrier-decision-guides-2026-10-13. Rollback baseline: c44366807a90102e3bacabc5e28965ea27741935. Revert only this release's changes if needed; preserve concurrent work.
