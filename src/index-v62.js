import site from './index-v61.js';

const VERSION = 'v62';
const ORDER = 'https://www.nyhut.com/';
const ASK = '/ask-hut-ai';
const CENTER = '/audit-and-enforcement-center';

const OFFICIAL = {
  hut: 'https://www.tax.ny.gov/bus/hut/huidx.htm',
  records: 'https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/hut/recordkeeping_requirements.htm',
  enforcement: 'https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/hut/enforcement_provisions.htm',
  audit: 'https://www.tax.ny.gov/enforcement/audit/',
  auditConclusion: 'https://www.tax.ny.gov/enforcement/criminal_enforcement/audit_conclusion.htm',
  mt903i: 'https://www.tax.ny.gov/forms/current-forms/motor/mt903i.htm'
};

const CSS = `<style id="nyh-v62-audit-css">
:root{--n:#082b4c;--b:#1768c5;--l:#d7e3ed;--m:#536b82;--p:#f3f8fc;--y:#fff8df;--r:#fff1f1;--g:#edf9f3;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}*{box-sizing:border-box}body{margin:0;color:#13263a;line-height:1.62;background:#fff}.w{width:min(1160px,calc(100% - 40px));margin:auto}header{position:sticky;top:0;z-index:9999;background:#fff;border-bottom:1px solid var(--l);box-shadow:0 4px 18px rgba(8,43,76,.06)}.nav{min-height:76px;display:flex;align-items:center;justify-content:space-between;gap:18px}.brand{font-weight:950;color:var(--n);text-decoration:none;font-size:1.15rem}.links{display:flex;gap:8px;flex-wrap:wrap}.links a{padding:9px 12px;border:1px solid #b8cad9;border-radius:10px;text-decoration:none;color:var(--n);font-weight:850}.links .order{background:var(--b);color:#fff;border-color:var(--b)}.hero{padding:58px 0 46px;background:linear-gradient(135deg,#f9fcff,#e7f2fb)}h1{font-size:clamp(2.35rem,5vw,4.05rem);line-height:1.03;letter-spacing:-.04em;color:var(--n);margin:10px 0 16px}h2,h3{color:var(--n);line-height:1.2}.lead{max-width:940px;color:#496078;font-size:1.09rem}.eyebrow{font-size:.76rem;text-transform:uppercase;letter-spacing:.09em;font-weight:900;color:var(--b)}.section{padding:46px 0 72px}.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}.card,.panel{border:1px solid var(--l);border-radius:20px;padding:24px;background:#fff;box-shadow:0 10px 34px rgba(8,43,76,.06)}.card p,.card li,.panel p,.panel li{color:var(--m)}.card h2,.panel h2{margin-top:0}.wide{grid-column:1/-1}.btn{display:inline-flex;align-items:center;justify-content:center;margin:10px 8px 0 0;padding:12px 16px;border-radius:10px;background:var(--b);color:#fff;text-decoration:none;font-weight:900}.secondary{background:#fff;color:var(--b);border:1px solid var(--b)}.danger{background:#a12626}.notice{background:var(--y);border-left:4px solid #e2a500;padding:16px;border-radius:8px;margin:20px 0}.alert{background:var(--r);border-left:4px solid #b52b2b;padding:16px;border-radius:8px;margin:20px 0}.success{background:var(--g);border-left:4px solid #198754;padding:16px;border-radius:8px;margin:20px 0}.steps,.checks{padding-left:22px}.steps li,.checks li{margin:10px 0}.sources{background:var(--p);border:1px solid #cfe0ee;border-radius:18px;padding:22px}.sources ul{margin-bottom:0}.sources a{color:var(--b);font-weight:850}.linkgrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.linkgrid a,.pill{display:block;padding:12px 14px;border:1px solid var(--l);border-radius:12px;text-decoration:none;color:var(--n);font-weight:850;background:#fff}.cta{background:linear-gradient(135deg,#082b4c,#124f80);color:#fff;border-radius:20px;padding:26px;margin-top:22px}.cta h2,.cta p{color:#fff}.cta .secondary{background:transparent;color:#fff;border-color:#fff}.tag{display:inline-block;padding:5px 9px;border-radius:999px;background:#e9f3fc;color:#0b5ca8;font-size:.78rem;font-weight:900;margin-bottom:8px}.audit-index{margin-top:24px;display:flex;gap:9px;flex-wrap:wrap}.audit-index a{padding:9px 12px;border:1px solid var(--l);border-radius:999px;background:#fff;text-decoration:none;color:var(--n);font-weight:800}.mini{font-size:.92rem;color:var(--m)}@media(max-width:900px){.grid,.linkgrid{grid-template-columns:1fr}.wide{grid-column:auto}.nav{display:block;padding:12px 0}.brand{display:block;margin-bottom:10px}.links{display:grid;grid-template-columns:repeat(2,1fr)}.links a{text-align:center}.links .order{grid-column:1/-1}}@media(max-width:620px){.w{width:min(100% - 24px,1160px)}}
</style>`;

function header() {
  return `<header><div class="w nav"><a class="brand" href="/">NewYorkHUT.com</a><nav class="links" aria-label="Primary navigation"><a href="/learn">Learn</a><a href="/hut-registration-center">Registration</a><a href="/mt-903-filing-center">MT-903 Filing</a><a href="${CENTER}">Audits</a><a href="/tools">Tools</a><a href="${ASK}">Ask HUT AI</a><a class="order" href="${ORDER}">Go to NYHUT</a></nav></div></header>`;
}

function shell(title, description, path, body) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><meta name="description" content="${description}"><link rel="canonical" href="https://newyorkhut.com${path}">${CSS}</head><body>${header()}${body}</body></html>`;
}

const tools = [
  ['/tools/hut-penalty-estimator', 'HUT Penalty Estimator'],
  ['/tools/mt903-due-date', 'MT-903 Due Date Calculator'],
  ['/tools/hut-tax-estimator', 'HUT Tax Estimator'],
  ['/tools/hut-rate-lookup', 'HUT Rate Lookup']
];

const guideLinks = [
  ['/learn/new-york-hut-audits', 'How New York HUT Audits Work'],
  ['/learn/hut-records-you-must-keep', 'HUT Records You Must Keep'],
  ['/learn/common-new-york-hut-audit-findings', 'Common HUT Audit Findings'],
  ['/learn/new-york-hut-penalties', 'New York HUT Penalties'],
  ['/learn/how-to-respond-to-a-hut-audit', 'How to Respond to a HUT Audit'],
  ['/learn/hut-audit-checklist', 'HUT Audit Checklist']
];

const pages = {
  '/learn/new-york-hut-audits': {
    title: 'New York HUT Audits: What Carriers Should Expect',
    desc: 'Understand how a New York Highway Use Tax audit begins, which records may be requested, and how proposed findings are resolved.',
    quick: 'A HUT audit generally tests whether the carrier registered every taxable vehicle, filed every required return, reported the correct New York mileage and weight method, and retained records that support the tax calculation. The Tax Department commonly begins by mailing a request for records and may review returns from the prior three years or another period stated in the notice.',
    applies: ['Carriers currently registered for HUT or AFC.', 'Carriers that operated taxable vehicles in New York without complete registration or returns.', 'Businesses receiving an audit appointment letter, information document request, proposed audit changes, or assessment.'],
    steps: ['Read the notice immediately and calendar every response deadline.', 'Identify the audit period, tax types, vehicles, and returns under review.', 'Preserve trip records, GPS/ELD data, fuel and toll records, registrations, leases, dispatch documents, and filed MT-903 returns.', 'Reconcile vehicle-level New York mileage to the returns before sending records.', 'Explain exceptions in writing and label every document set clearly.', 'Review proposed findings line by line and submit missing support promptly.', 'Use the appeal instructions and deadline shown on any formal notice if disagreement remains.'],
    mistakes: ['Ignoring an initial records request because no bill has been issued yet.', 'Sending raw ELD or GPS exports without a reconciliation to MT-903 mileage.', 'Assuming a prior clean audit prevents a future audit.', 'Missing the formal protest deadline while continuing informal discussions.'],
    refs: [[OFFICIAL.audit, 'New York Tax Department: Audit process'], [OFFICIAL.auditConclusion, 'Concluding an audit and appeal rights'], [OFFICIAL.records, 'TB-HU-765 recordkeeping requirements']],
    related: ['/learn/hut-records-you-must-keep', '/learn/how-to-respond-to-a-hut-audit', '/learn/hut-audit-checklist'],
    task: 'Organize vehicles, permits, mileage, and filing records in NYHUT before responding.'
  },
  '/learn/hut-records-you-must-keep': {
    title: 'HUT Records You Must Keep',
    desc: 'A practical list of daily mileage, vehicle, trip, toll, fuel, and filing records needed to support New York HUT returns.',
    quick: 'Every HUT carrier must keep daily records for each truck or tractor issued a certificate of registration and retain the records used to calculate HUT liability. Records may be paper or electronic, but they must substantiate actual New York mileage, distinguish taxable from nontaxable operation, and support every return entry.',
    applies: ['Every carrier subject to HUT.', 'Fleet owners using ELD, GPS, dispatch, fuel-card, or toll data to calculate New York mileage.', 'Accountants, tax preparers, and compliance managers responsible for MT-903 filings.'],
    steps: ['Maintain a daily trip record for each registered truck or tractor.', 'Record beginning and ending points, routes, dates, odometer or hubometer readings, and New York miles.', 'Separate toll-paid New York State Thruway mileage when applicable.', 'Retain vehicle registrations, HUT certificates, decal records, leases, and ownership changes.', 'Keep fuel, toll, dispatch, bills of lading, repair, and GPS/ELD records that corroborate mileage.', 'Create monthly or quarterly summaries that tie directly to the MT-903 return.', 'Retain filed returns, confirmations, payments, amendments, and correspondence for the required period.'],
    mistakes: ['Keeping only quarterly totals with no daily vehicle detail.', 'Failing to preserve electronic records after changing ELD or telematics vendors.', 'Combining all New York miles without identifying Thruway or exempt activity.', 'Discarding records after a vehicle is sold or removed from the fleet.'],
    refs: [[OFFICIAL.records, 'TB-HU-765 Recordkeeping Requirements'], [OFFICIAL.mt903i, 'Current MT-903 instructions'], [OFFICIAL.hut, 'New York Highway Use Tax overview']],
    related: ['/learn/new-york-hut-taxable-miles', '/learn/common-new-york-hut-audit-findings', '/learn/hut-audit-checklist'],
    task: 'Use NYHUT to centralize vehicles, permits, filing periods, and supporting compliance records.'
  },
  '/learn/common-new-york-hut-audit-findings': {
    title: 'Common New York HUT Audit Findings',
    desc: 'Review the registration, mileage, weight, filing, and documentation issues that commonly create HUT assessments.',
    quick: 'HUT assessments commonly arise when vehicle records do not match filed returns, taxable New York miles are omitted, the wrong weight or reporting method is used, required returns are missing, or the carrier cannot produce records supporting an exemption or mileage exclusion.',
    applies: ['Carriers preparing for an audit or internal compliance review.', 'Businesses that added, sold, leased, or replaced vehicles during the audit period.', 'Carriers with incomplete ELD, toll, fuel, or dispatch data.'],
    steps: ['Build a complete vehicle list for every quarter in the review period.', 'Compare certificate dates and registered weights to actual operating dates and fleet records.', 'Reconcile GPS/ELD, toll, fuel, dispatch, and odometer data to reported New York miles.', 'Identify missing, late, no-activity, amended, or final returns.', 'Document every exempt or excluded use and every mileage adjustment.', 'Quantify potential tax, penalty, and interest before the auditor finalizes findings.'],
    mistakes: ['Unregistered taxable vehicles operating in New York.', 'Mileage gaps between state-line entry, delivery points, and departure.', 'Using gross vehicle weight, GVWR, or registered weight inconsistently.', 'Reporting no activity despite toll, fuel, GPS, or dispatch evidence.', 'Continuing to use a decal or certificate after a vehicle sale or transfer.', 'Claiming exempt operation without exclusive-use documentation.'],
    refs: [[OFFICIAL.records, 'TB-HU-765 recordkeeping rules'], [OFFICIAL.enforcement, 'TB-HU-835 enforcement provisions'], [OFFICIAL.mt903i, 'MT-903 filing instructions']],
    related: ['/learn/hut-records-you-must-keep', '/learn/new-york-hut-penalties', '/learn/how-gvw-affects-your-hut-tax'],
    task: 'Compare your active fleet, credential history, and MT-903 filings inside NYHUT.'
  },
  '/learn/new-york-hut-penalties': {
    title: 'New York HUT Penalties, Interest, and Enforcement',
    desc: 'Learn about late filing, late payment, unregistered operation, certificate suspension, and other New York HUT enforcement consequences.',
    quick: 'New York may impose tax, interest, filing and payment penalties, civil fines for unregistered operation, and certificate denial, suspension, or revocation. Under TB-HU-835, late filing or payment can begin at 10% of tax due plus 1% for each additional month or part of a month, up to 30%, while operating without a required certificate or decal can produce separate civil fines.',
    applies: ['Carriers with late or missing MT-903 returns.', 'Carriers that underpaid tax or operated an unregistered vehicle.', 'Businesses with suspended, revoked, or denied HUT credentials.', 'Carriers reviewing a proposed assessment or collection notice.'],
    steps: ['Identify every missing return and unpaid period.', 'File accurate returns even when full payment is not immediately available.', 'Calculate estimated penalty and interest using current Tax Department tools and rates.', 'Correct vehicle registration or decal problems before further operation.', 'Respond to bills, proposed findings, or suspension notices by the stated deadline.', 'Preserve reasonable-cause documentation when requesting penalty relief.'],
    mistakes: ['Assuming a no-activity quarter never requires a return.', 'Waiting for a bill before filing delinquent returns.', 'Continuing New York operation after a certificate is suspended or revoked.', 'Treating interest as waivable in the same manner as some penalties.'],
    refs: [[OFFICIAL.enforcement, 'TB-HU-835 Summary of Enforcement Provisions'], [OFFICIAL.hut, 'Highway Use Tax overview'], [OFFICIAL.auditConclusion, 'Audit findings and formal appeal process']],
    related: ['/learn/mt-903-filing-deadlines-and-frequency', '/learn/how-to-respond-to-a-hut-audit', '/learn/hut-audit-checklist'],
    task: 'Use NYHUT to identify filing gaps and complete the required HUT workflow.'
  },
  '/learn/how-to-respond-to-a-hut-audit': {
    title: 'How to Respond to a New York HUT Audit',
    desc: 'A step-by-step response process for HUT audit notices, document requests, proposed changes, and formal appeal deadlines.',
    quick: 'Respond on time, preserve the complete audit-period record set, reconcile every vehicle and filing period before production, and separate factual documentation from legal or procedural disagreements. Informal discussions do not replace a timely formal protest when a Notice of Determination or other appealable notice is issued.',
    applies: ['Any carrier that received a HUT audit letter or records request.', 'Carriers reviewing proposed audit adjustments.', 'Owners authorizing a representative to communicate with the Tax Department.'],
    steps: ['Confirm the authenticity of the letter and the assigned auditor.', 'Calendar the requested response date and every statutory protest deadline.', 'Designate one contact person and, when appropriate, authorize a qualified representative.', 'Create an audit index organized by quarter and vehicle.', 'Reconcile source records to each MT-903 line before producing documents.', 'Respond in writing to proposed adjustments with specific evidence.', 'If unresolved, follow the formal appeal directions on the notice within the stated deadline.'],
    mistakes: ['Calling the auditor without first understanding the scope and records requested.', 'Producing inconsistent partial records from multiple departments.', 'Signing proposed changes before confirming the calculations.', 'Missing a formal appeal deadline because an auditor is still reviewing additional information.'],
    refs: [[OFFICIAL.audit, 'What to expect during a New York tax audit'], [OFFICIAL.auditConclusion, 'Agreeing, disagreeing, and appealing audit findings'], [OFFICIAL.records, 'HUT records required to support returns']],
    related: ['/learn/new-york-hut-audits', '/learn/hut-audit-checklist', '/learn/new-york-hut-penalties'],
    task: 'Build a clean vehicle-and-filing record package in NYHUT before responding.'
  },
  '/learn/hut-audit-checklist': {
    title: 'New York HUT Audit Checklist',
    desc: 'Use this HUT audit checklist to organize carrier, vehicle, mileage, toll, fuel, filing, payment, and correspondence records.',
    quick: 'A defensible HUT audit file should let a reviewer move from the carrier account, to each vehicle, to each trip record, to quarterly mileage summaries, and finally to the filed MT-903 return and payment. Missing links in that chain create audit risk.',
    applies: ['Carriers preparing for an announced audit.', 'Compliance teams performing a self-audit.', 'Businesses acquiring another carrier or cleaning up inherited HUT records.'],
    steps: ['Carrier account: legal name, EIN, addresses, responsible persons, and authorization documents.', 'Vehicle roster: VIN, plate, jurisdiction, registered weight, certificate, decal, acquisition and disposal dates.', 'Trip evidence: daily logs, routes, odometer readings, ELD/GPS exports, dispatch and bills of lading.', 'Corroborating records: tolls, fuel, repairs, scale tickets, leases, and driver settlements.', 'Tax workpapers: New York mileage summaries, Thruway treatment, rate calculations, and exemptions.', 'Returns and payments: all MT-903 filings, confirmations, amendments, canceled payments, and notices.', 'Audit file: request log, documents produced, explanations, open items, proposed changes, and response deadlines.'],
    mistakes: ['Starting document collection without freezing deletion policies.', 'Failing to include inactive, sold, leased, or replacement vehicles.', 'Using spreadsheets that cannot be traced back to source records.', 'Leaving unresolved differences between toll, ELD, fuel, and reported mileage.'],
    refs: [[OFFICIAL.records, 'TB-HU-765 recordkeeping requirements'], [OFFICIAL.audit, 'New York audit process'], [OFFICIAL.enforcement, 'HUT enforcement provisions']],
    related: ['/learn/hut-records-you-must-keep', '/learn/common-new-york-hut-audit-findings', '/learn/how-to-respond-to-a-hut-audit'],
    task: 'Track the audit-period fleet, credentials, and filing records in NYHUT.'
  }
};

function linkList(items) {
  return items.map(([href, label]) => `<a href="${href}">${label} →</a>`).join('');
}

function guide(path, data) {
  const related = data.related.map(href => {
    const found = guideLinks.find(([p]) => p === href);
    return [href, found ? found[1] : href.split('/').pop().replace(/-/g, ' ')];
  });
  const body = `<main><section class="hero"><div class="w"><div class="eyebrow">New York HUT audit and enforcement guide</div><h1>${data.title}</h1><p class="lead">${data.quick}</p><div class="audit-index"><a href="${CENTER}">Audit Center</a><a href="#steps">Step-by-Step</a><a href="#mistakes">Common Mistakes</a><a href="#official">Official References</a></div></div></section><section class="section"><div class="w"><div class="grid"><article class="card"><span class="tag">Quick Answer</span><h2>Quick Answer</h2><p>${data.quick}</p></article><article class="card"><span class="tag">Applicability</span><h2>Who This Applies To</h2><ul class="checks">${data.applies.map(x => `<li>${x}</li>`).join('')}</ul></article><article class="card" id="steps"><span class="tag">Action Plan</span><h2>Step-by-Step Instructions</h2><ol class="steps">${data.steps.map(x => `<li>${x}</li>`).join('')}</ol></article><article class="card" id="mistakes"><span class="tag">Risk Control</span><h2>Common Mistakes</h2><ul class="checks">${data.mistakes.map(x => `<li>${x}</li>`).join('')}</ul><div class="notice"><strong>Important:</strong> Audit notices and formal assessments can carry different response deadlines. Use the date and instructions printed on the actual notice.</div></article><article class="sources wide" id="official"><span class="tag">Primary Sources</span><h2>Official New York References</h2><ul>${data.refs.map(([href, label]) => `<li><a href="${href}" target="_blank" rel="noopener">${label} →</a></li>`).join('')}</ul><p class="mini">Tax bulletins provide general guidance and may be affected by later statutory, regulatory, or interpretive changes.</p></article><article class="card"><span class="tag">Knowledge Graph</span><h2>Related Guides</h2><div class="linkgrid">${linkList(related)}</div></article><article class="card"><span class="tag">Free Calculators</span><h2>Related Tools</h2><div class="linkgrid">${linkList(tools)}</div></article><article class="card"><span class="tag">Interactive Help</span><h2>Ask HUT AI</h2><p>Ask a specific question about records, audit notices, mileage reconciliation, penalties, proposed findings, or next steps.</p><a class="btn secondary" href="${ASK}">Ask HUT AI →</a></article><article class="card"><span class="tag">Workflow</span><h2>Complete This Task in NYHUT</h2><p>${data.task}</p><a class="btn" href="${ORDER}">Open NYHUT →</a></article></div></div></section></main>`;
  return shell(`${data.title} | NewYorkHUT.com`, data.desc, path, body);
}

function hub() {
  const cards = guideLinks.map(([href, label]) => {
    const data = pages[href];
    return `<article class="card"><span class="tag">Audit Guide</span><h2>${label}</h2><p>${data.desc}</p><a class="btn" href="${href}">Open guide →</a></article>`;
  }).join('');
  const body = `<main><section class="hero"><div class="w"><div class="eyebrow">New York HUT compliance protection</div><h1>Audit &amp; Enforcement Center</h1><p class="lead">Prepare for a New York HUT audit, build defensible mileage records, identify common exposure, understand penalties, and respond to Tax Department notices with an organized record trail.</p><div class="audit-index"><a href="/learn/hut-records-you-must-keep">Required Records</a><a href="/learn/common-new-york-hut-audit-findings">Audit Findings</a><a href="/learn/new-york-hut-penalties">Penalties</a><a href="/learn/hut-audit-checklist">Audit Checklist</a></div></div></section><section class="section"><div class="w"><div class="alert"><strong>Do not ignore a HUT notice.</strong> Calendar both the requested response date and any separate formal protest deadline printed on the notice.</div><div class="grid">${cards}</div><div class="cta"><h2>Turn scattered records into a compliance file</h2><p>Use the free guides and calculators here, then manage vehicles, permits, filing periods, and compliance workflows through NYHUT.</p><a class="btn" href="${ORDER}">Open NYHUT →</a><a class="btn secondary" href="${ASK}">Ask HUT AI →</a></div><div class="sources" style="margin-top:22px"><h2>Official starting points</h2><div class="linkgrid"><a href="${OFFICIAL.records}" target="_blank" rel="noopener">HUT recordkeeping requirements →</a><a href="${OFFICIAL.enforcement}" target="_blank" rel="noopener">HUT enforcement provisions →</a><a href="${OFFICIAL.audit}" target="_blank" rel="noopener">New York audit process →</a><a href="${OFFICIAL.auditConclusion}" target="_blank" rel="noopener">Audit findings and appeals →</a></div></div></div></section></main>`;
  return shell('New York HUT Audit & Enforcement Center', 'Guides for New York HUT audits, recordkeeping, common findings, penalties, audit responses, and audit preparation.', CENTER, body);
}

function injectCenter(html) {
  if (html.includes('nyh-v62-audit-center-link')) return html;
  const block = `<section id="nyh-v62-audit-center-link" class="panel" style="margin:24px auto;width:min(1100px,calc(100% - 40px))"><div class="eyebrow">New compliance center</div><h2>Prepare for HUT audits and enforcement issues</h2><p>Review required records, common audit findings, penalties, response steps, and the complete HUT audit checklist.</p><a class="btn" href="${CENTER}">Open Audit &amp; Enforcement Center →</a></section>`;
  let out = html;
  if (!out.includes('nyh-v62-audit-css')) out = out.replace(/<\/head>/i, `${CSS}</head>`);
  return out.replace(/<\/main>/i, `${block}</main>`);
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';
    if (path === CENTER || path === '/hut-audit-center') {
      return new Response(hub(), { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store', 'x-newyorkhut-version': VERSION, 'x-newyorkhut-feature': 'audit-enforcement-center-v62' } });
    }
    if (pages[path]) {
      return new Response(guide(path, pages[path]), { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store', 'x-newyorkhut-version': VERSION, 'x-newyorkhut-feature': 'audit-enforcement-guides-v62' } });
    }
    const response = await site.fetch(request, env, ctx);
    if ((path === '/learn' || path === '/ask-hut-ai' || path === '/services') && (response.headers.get('content-type') || '').includes('text/html')) {
      const headers = new Headers(response.headers);
      headers.set('cache-control', 'no-store');
      headers.set('x-newyorkhut-version', VERSION);
      headers.set('x-newyorkhut-knowledge', 'audit-enforcement-v62');
      return new Response(injectCenter(await response.text()), { status: response.status, headers });
    }
    return response;
  }
};
