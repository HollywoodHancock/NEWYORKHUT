import site from './index-v67.js';

const VERSION = 'v68';
const ORDER = 'https://www.nyhut.com/';
const ASK = '/ask-hut-ai';
const PATHS = new Set(['/learn', '/knowledge-center', '/new-york-hut-knowledge-center']);

const CENTERS = [
  {
    title: 'HUT Registration Center',
    href: '/hut-registration-center',
    summary: 'Determine whether HUT applies, prepare registration information, and understand certificates, decals, temporary authority, and vehicle weight.',
    links: [
      ['Who Needs HUT?', '/learn/who-needs-a-new-york-hut-permit'],
      ['How to Register', '/learn/how-to-register-for-new-york-hut'],
      ['Registration Mistakes', '/learn/common-hut-registration-mistakes']
    ]
  },
  {
    title: 'MT-903 Filing Center',
    href: '/mt-903-filing-center',
    summary: 'Understand filing frequency, taxable miles, recordkeeping, deadlines, and amended, final, or no-activity returns.',
    links: [
      ['What Is MT-903?', '/learn/what-is-form-mt-903'],
      ['Filing Deadlines', '/learn/mt-903-filing-deadlines-and-frequency'],
      ['Taxable Miles', '/learn/new-york-hut-taxable-miles']
    ]
  },
  {
    title: 'Vehicle Lifecycle Center',
    href: '/vehicle-lifecycle',
    summary: 'Handle purchases, sales, replacements, additions, removals, weight changes, and missing credentials without breaking HUT compliance.',
    links: [
      ['Buying a Truck', '/learn/buying-a-truck-and-new-york-hut'],
      ['Selling a Truck', '/learn/selling-or-transferring-a-new-york-hut-permitted-truck'],
      ['Adding a Vehicle', '/learn/adding-a-vehicle-to-new-york-hut']
    ]
  },
  {
    title: 'Audit & Enforcement Center',
    href: '/audit-and-enforcement-center',
    summary: 'Prepare for audits, preserve records, understand common findings, respond to notices, and estimate penalty exposure.',
    links: [
      ['How HUT Audits Work', '/learn/new-york-hut-audits'],
      ['Respond to an Audit', '/learn/how-to-respond-to-a-hut-audit'],
      ['HUT Penalties', '/learn/new-york-hut-penalties']
    ]
  },
  {
    title: 'Exemptions & Special Vehicles',
    href: '/exemptions-and-special-vehicles',
    summary: 'Review farm, government, recreational, dealer, household-goods, special-mobile-equipment, excluded, and exempt vehicle rules.',
    links: [
      ['Excluded Vehicles', '/learn/new-york-hut-excluded-vehicles'],
      ['Exempt Vehicles', '/learn/new-york-hut-exempt-vehicles'],
      ['Farm Vehicle Exemption', '/learn/new-york-hut-farm-vehicle-exemption']
    ]
  },
  {
    title: 'HUT Forms Library',
    href: '/forms-library',
    summary: 'Find current registration, return, replacement, tax-clearance, refund, fuel-use, and publication guidance.',
    links: [
      ['TMT-1', '/forms/tmt-1'],
      ['MT-903', '/forms/mt-903'],
      ['MT-370.1', '/forms/mt-370-1']
    ]
  },
  {
    title: 'Carrier Compliance Center',
    href: '/carrier-compliance-center',
    summary: 'Coordinate HUT with IFTA, IRP, Form 2290, UCR, FMCSA registration, vehicle registration, and annual compliance deadlines.',
    links: [
      ['IFTA', '/learn/ifta-compliance-for-new-york-carriers'],
      ['IRP', '/learn/irp-apportioned-registration'],
      ['Compliance Calendar', '/learn/trucking-compliance-calendar']
    ]
  },
  {
    title: 'News & Regulatory Center',
    href: '/news-and-regulatory-center',
    summary: 'Follow current New York HUT bulletins, forms updates, interest rates, filing changes, and proposed legislation.',
    links: [
      ['2026 Bulletin Updates', '/news/hut-tax-bulletins-updated-march-2026'],
      ['Current Forms Update', '/news/hut-forms-index-updated-june-2026'],
      ['Current Interest Rate', '/news/hut-interest-rate-july-september-2026']
    ]
  }
];

const TASKS = [
  ['Check whether a vehicle needs HUT', '/tools/hut-permit-requirement'],
  ['Estimate HUT tax', '/tools/hut-tax-estimator'],
  ['Look up a HUT rate', '/tools/hut-rate-lookup'],
  ['Calculate an MT-903 due date', '/tools/mt903-due-date'],
  ['Estimate penalties and interest', '/tools/hut-penalty-estimator'],
  ['Ask a fact-specific HUT question', ASK]
];

const CSS = `<style id="nyh-v68-knowledge-css">
:root{--n:#082b4c;--b:#1768c5;--l:#d7e3ed;--m:#536b82;--p:#f3f8fc;--g:#147a50;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}*{box-sizing:border-box}body{margin:0;color:#14283d;line-height:1.6;background:#fff}.w{width:min(1180px,calc(100% - 40px));margin:auto}.top{position:sticky;top:0;z-index:9999;background:#fff;border-bottom:1px solid var(--l);box-shadow:0 4px 18px rgba(8,43,76,.06)}.nav{min-height:76px;display:flex;align-items:center;justify-content:space-between;gap:18px}.brand{font-weight:950;color:var(--n);text-decoration:none;font-size:1.16rem}.links{display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end}.links a{padding:9px 12px;border:1px solid #bfd0de;border-radius:10px;color:var(--n);text-decoration:none;font-weight:850}.links .order{background:var(--b);border-color:var(--b);color:#fff}.hero{padding:64px 0 50px;background:linear-gradient(135deg,#fbfdff,#eaf4fc)}.eyebrow{font-size:.76rem;text-transform:uppercase;letter-spacing:.1em;color:var(--b);font-weight:950}h1{margin:12px 0 18px;color:var(--n);font-size:clamp(2.5rem,5.5vw,4.55rem);line-height:1.01;letter-spacing:-.045em}h2,h3{color:var(--n);line-height:1.22}.lead{max-width:930px;font-size:1.12rem;color:#4d647a}.hero-actions,.actions,.chips{display:flex;gap:10px;flex-wrap:wrap}.btn{display:inline-flex;align-items:center;justify-content:center;padding:12px 16px;border-radius:10px;background:var(--b);color:#fff;text-decoration:none;font-weight:900;border:1px solid var(--b)}.btn.secondary{background:#fff;color:var(--b)}.section{padding:50px 0 72px}.section.alt{background:var(--p)}.section-head{max-width:850px;margin-bottom:24px}.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}.card{border:1px solid var(--l);border-radius:20px;padding:24px;background:#fff;box-shadow:0 10px 34px rgba(8,43,76,.06)}.card h2{margin-top:0}.card p{color:var(--m)}.card .open{color:var(--b);font-weight:900;text-decoration:none}.mini{display:grid;gap:8px;margin-top:18px}.mini a{padding:10px 12px;border:1px solid var(--l);border-radius:10px;color:var(--n);text-decoration:none;font-weight:800;background:#fbfdff}.task-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}.task-grid a{padding:18px;border:1px solid var(--l);border-radius:16px;background:#fff;color:var(--n);text-decoration:none;font-weight:900;box-shadow:0 8px 24px rgba(8,43,76,.05)}.authority{padding:28px;border-radius:20px;background:linear-gradient(135deg,var(--n),#124f82);color:#fff}.authority h2{color:#fff;margin-top:0}.authority p{color:#dce8f3;max-width:870px}.authority .btn.secondary{border-color:#fff;background:transparent;color:#fff}.crumbs{padding:12px 0;font-size:.88rem;color:var(--m)}.crumbs a{color:var(--b);font-weight:800;text-decoration:none}.crumbs span{margin:0 7px}.status{display:inline-flex;align-items:center;gap:7px;padding:7px 10px;border-radius:999px;background:#eaf7f1;color:var(--g);font-weight:900;font-size:.8rem}.status:before{content:"";width:8px;height:8px;border-radius:50%;background:var(--g)}@media(max-width:900px){.nav{display:block;padding:12px 0}.brand{display:block;margin-bottom:10px}.links{display:grid;grid-template-columns:repeat(2,minmax(0,1fr))}.links a{text-align:center}.links .order{grid-column:1/-1}.task-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:700px){.w{width:min(100% - 24px,1180px)}.grid,.task-grid{grid-template-columns:1fr}.card{padding:20px}}
</style>`;

function nav(){
  return `<header class="top"><div class="w nav"><a class="brand" href="/">NewYorkHUT.com</a><nav class="links" aria-label="Primary navigation"><a href="/learn">Knowledge Center</a><a href="/tools">Tools</a><a href="${ASK}">Ask HUT AI</a><a href="/news-and-regulatory-center">Updates</a><a class="order" href="${ORDER}">Go to NYHUT</a></nav></div></header>`;
}

function schema(){
  const data={
    '@context':'https://schema.org',
    '@graph':[
      {'@type':'Organization','@id':'https://newyorkhut.com/#org',name:'NewYorkHUT.com',url:'https://newyorkhut.com/'},
      {'@type':'WebSite','@id':'https://newyorkhut.com/#website',name:'NewYorkHUT.com',url:'https://newyorkhut.com/',publisher:{'@id':'https://newyorkhut.com/#org'}},
      {'@type':'CollectionPage','@id':'https://newyorkhut.com/learn#page',url:'https://newyorkhut.com/learn',name:'New York HUT Knowledge Center',description:'A complete directory of New York Highway Use Tax registration, filing, vehicle, audit, exemption, forms, compliance, news, tools, and AI guidance.',isPartOf:{'@id':'https://newyorkhut.com/#website'},publisher:{'@id':'https://newyorkhut.com/#org'}}
    ]
  };
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

function page(){
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>New York HUT Knowledge Center | Complete Guide Directory</title><meta name="description" content="Explore New York HUT registration, MT-903 filing, vehicle changes, audits, penalties, exemptions, forms, carrier compliance, regulatory updates, tools, and Ask HUT AI."><meta name="robots" content="index,follow,max-image-preview:large"><link rel="canonical" href="https://newyorkhut.com/learn"><meta property="og:type" content="website"><meta property="og:title" content="New York HUT Knowledge Center"><meta property="og:description" content="The complete NewYorkHUT.com directory for HUT registration, filing, vehicles, audits, exemptions, forms, tools, compliance, news, and AI guidance."><meta property="og:url" content="https://newyorkhut.com/learn"><meta name="twitter:card" content="summary_large_image">${CSS}${schema()}</head><body>${nav()}<div class="w crumbs"><a href="/">Home</a><span>›</span>Knowledge Center</div><main><section class="hero"><div class="w"><div class="status">Expanded authority library</div><div class="eyebrow" style="margin-top:14px">New York Highway Use Tax education</div><h1>New York HUT Knowledge Center</h1><p class="lead">Use one connected directory to research HUT registration, quarterly filing, vehicle changes, audits, penalties, exemptions, forms, broader carrier compliance, current regulatory updates, and the correct NYHUT workflow.</p><div class="hero-actions"><a class="btn" href="${ASK}">Ask HUT AI →</a><a class="btn secondary" href="/tools">Open free tools →</a><a class="btn secondary" href="${ORDER}">Complete a task in NYHUT →</a></div></div></section><section class="section"><div class="w"><div class="section-head"><div class="eyebrow">Knowledge centers</div><h2>Start with the topic that matches your task</h2><p>Each center connects detailed guides, official New York references, practical tools, Ask HUT AI, and the relevant service workflow.</p></div><div class="grid">${CENTERS.map(c=>`<article class="card"><h2>${c.title}</h2><p>${c.summary}</p><a class="open" href="${c.href}">Open center →</a><div class="mini">${c.links.map(([label,href])=>`<a href="${href}">${label} →</a>`).join('')}</div></article>`).join('')}</div></div></section><section class="section alt"><div class="w"><div class="section-head"><div class="eyebrow">Popular tasks</div><h2>Go directly to a tool or answer</h2></div><div class="task-grid">${TASKS.map(([label,href])=>`<a href="${href}">${label} →</a>`).join('')}</div></div></section><section class="section"><div class="w"><div class="authority"><div class="eyebrow" style="color:#9dccf6">From education to action</div><h2>Research here. Complete the secure workflow in NYHUT.</h2><p>NewYorkHUT.com is the public education and authority resource. Permit ordering, customer accounts, vehicle management, MT-903 filing services, and completed documents belong in the separate NYHUT platform.</p><div class="actions"><a class="btn" href="${ORDER}">Open NYHUT →</a><a class="btn secondary" href="${ASK}">Ask HUT AI first →</a></div></div></div></section></main></body></html>`;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';
    if (PATHS.has(path)) {
      return new Response(page(), {
        headers: {
          'content-type': 'text/html; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'x-newyorkhut-version': VERSION,
          'x-newyorkhut-feature': 'unified-knowledge-center-v68'
        }
      });
    }
    const response = await site.fetch(request, env, ctx);
    const headers = new Headers(response.headers);
    headers.set('x-newyorkhut-version', VERSION);
    return new Response(response.body, {status: response.status, statusText: response.statusText, headers});
  }
};
