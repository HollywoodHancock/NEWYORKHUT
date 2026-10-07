# HUT calculator update — October 7, 2026

User-authorized functional correction: carry the NYHUT.com MT-903 penalty/interest improvements into the NewYorkHUT.com public tools. This release is not a ranking experiment. Search Console baseline is unavailable; no traffic recovery is claimed.

Affected canonical URLs: /tools/hut-tax-estimator, /tools/hut-penalty-estimator. Tool Center description updated to reflect interest support. No URLs, titles, canonical rules, or transactional ordering implementation changed.

The tax estimator retains selected-period tax and quarterly/annual projections. Optional late-payment calculation uses tax for the selected mileage period; an override accepts the full net unpaid return tax, after credits. Annual/quarterly projections are not charged as separate late returns. The standalone penalty estimator now takes dates and includes interest. Both tools import one calculation module and one field/result module.

Parity reference read directly from HollywoodHancock/NYHUT, src/pages/MyNyhutV2Page.tsx, main b9cd7a0e5c00eec271978886e7869a8f24527236: keep tax cents; whole-dollar late-charge base; monthly penalty; daily interest after deadline through the day before NYS receipt. Shared verified interest periods stop after December 31, 2026. Unsupported periods show unavailable interest and suppress the combined total. Dates are validated using UTC calendar dates; payment on/before deadline yields no late charges. Due date is entered explicitly after business-day adjustments; Q3 2026 example is November 2.

Sources reviewed October 7:
- https://www.tax.ny.gov/forms/current-forms/motor/mt903i.htm
- https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/hut/enforcement_provisions.htm
- https://www.tax.ny.gov/pay/interest/2026/p1.htm — HUT 11%
- https://www.tax.ny.gov/pay/interest/2026/p2.htm — HUT 10%
- https://www.tax.ny.gov/pay/interest/2026/p3.htm — HUT 11%
- https://www.tax.ny.gov/pay/interest/2026/p4.htm — HUT 11%
- https://www.tax.ny.gov/pay/file-pay.htm — full return/payment together scope

The filing-service CTA has an explicit destination label in the existing commercial-link map so historical link rewriting cannot change it to permit ordering.

Validation: 22 local regression tests including rendered browser scripts, known $134.10/$13.40/$0.08/$147.58 example, on-time/zero/invalid dates, monthly boundaries, cap, quarterly transitions, unsupported periods, optional toggle, selected-period/projection separation, final metadata/navigation/footer/link contract. Worker dry-run and production-contract guard. Functional Guard also runs calculator assertions against live HTML after publication, alongside existing route checks.

Deployment marker: v118-late-charge-tools-verified-2026-10-07. Rollback baseline: bc2d1cebe3549d2c607ba9f6f32c8acbc450a27c. Restore only this release's files if rollback is needed; preserve concurrent project changes.

Live calculation verification caught an esbuild keep-names helper introduced inside a function serialized into browser JavaScript. Removed the local named arrow-function dependency and added a regression run against a bundled Worker with keep-names enabled; source tests alone had not exposed it.
