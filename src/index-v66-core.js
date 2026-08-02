import site from './index-v65.js';

const VERSION='v66';
const ORDER='https://www.nyhut.com/';
const ASK='/ask-hut-ai';
const CENTER='/news-and-regulatory-center';
const LASTMOD='2026-08-02';

const updates=[
  {
    path:'/news/hut-tax-bulletins-updated-march-2026',
    title:'New York HUT Tax Bulletins Updated March 2026',
    description:'What carriers should know about New York’s March 26, 2026 Highway Use Tax bulletin refresh.',
    date:'March 26, 2026',
    answer:'New York refreshed multiple HUT bulletin pages on March 26, 2026. Carriers should use the live Tax Department pages for certificate, decal, filing, recordkeeping, exemption, tax-calculation, and enforcement guidance rather than saved or undated copies.',
    applies:['HUT carriers and permit services','Compliance teams preparing filings or audits','Businesses relying on saved HUT bulletins'],
    changes:['Multiple HUT bulletin pages now show a March 26, 2026 update date.','The live pages remain the best source for current simplified guidance.','Current form instructions should still be reviewed with the applicable bulletin.'],
    mistakes:['Assuming every page refresh changed the underlying law.','Using an archived copy without checking the live page.','Reading one bulletin without the matching form instructions.'],
    sources:[
      ['https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/hut/certificate_of_registration.htm','Certificate of Registration'],
      ['https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/hut/filing_requirements.htm','Filing Requirements'],
      ['https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/hut/recordkeeping_requirements.htm','Recordkeeping Requirements']
    ],
    related:[['/forms/hut-publications','HUT Publications'],['/learn/hut-records-you-must-keep','Records You Must Keep']]
  },
  {
    path:'/news/hut-forms-index-updated-june-2026',
    title:'New York HUT Forms Index Updated June 2026',
    description:'Review the June 29, 2026 HUT and fuel use tax forms index update and current New York forms.',
    date:'June 29, 2026',
    answer:'New York’s HUT and fuel use tax form index was updated June 29, 2026. MT-903 remains the current Highway Use Tax Return; MT-903-MN is historical and should not be used for a current filing.',
    applies:['Carriers preparing current returns','Permit services downloading registration forms','Auditors distinguishing current and archived forms'],
    changes:['The official index shows a June 29, 2026 update date.','MT-903 is listed as the current HUT return.','Current registration, replacement, refund, fuel-use, and IFTA forms remain linked from the index.'],
    mistakes:['Using MT-903-MN for a current period.','Downloading a prior-year form from a search result.','Pairing a current form with old instructions.'],
    sources:[
      ['https://www.tax.ny.gov/forms/highway_use_fuel_use_tax.htm','Current HUT and fuel use forms'],
      ['https://www.tax.ny.gov/pdf/current_forms/motor/mt903_fill_in.pdf','Current MT-903'],
      ['https://www.tax.ny.gov/forms/current-forms/motor/mt903i.htm','Current MT-903-I']
    ],
    related:[['/forms-library','HUT Forms Library'],['/forms/mt-903','MT-903 Guide'],['/forms/mt-903-mn','MT-903-MN Guide']]
  },
  {
    path:'/news/hut-interest-rate-july-september-2026',
    title:'New York HUT Interest Rates: July–September 2026',
    description:'Highway Use Tax refund and late-payment interest rates for July 1 through September 30, 2026.',
    date:'July 1–September 30, 2026',
    answer:'For July 1 through September 30, 2026, New York lists a 6% annual refund interest rate and an 11% annual late-payment and assessment interest rate for Highway Use Tax, compounded daily.',
    applies:['Carriers with late HUT balances','Taxpayers reviewing HUT refunds','Businesses reconciling audit assessments'],
    changes:['The HUT late-payment and assessment rate is 11% per year.','The HUT refund rate is 6% per year.','Both rates are compounded daily and apply only to the stated quarter.'],
    mistakes:['Applying the rate outside the stated quarter.','Treating an annual rate as a one-time charge.','Combining interest and penalties as one calculation.'],
    sources:[
      ['https://www.tax.ny.gov/pay/interest/2026/p3.htm','Official interest rates for 7/1/2026–9/30/2026'],
      ['https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/hut/enforcement_provisions.htm','HUT enforcement provisions']
    ],
    related:[['/learn/new-york-hut-penalties','HUT Penalties'],['/tools/hut-penalty-estimator','Penalty Estimator']]
  },
  {
    path:'/news/new-york-hut-repeal-bills-a25-s345',
    title:'New York HUT Repeal Bills A25 and S345',
    description:'Current status of the 2025–2026 New York bills proposing repeal of the Highway Use Tax.',
    date:'Status checked August 2, 2026',
    answer:'A25 and S345 propose repealing Article 21 of the New York Tax Law. As of August 2, 2026, both remain in committee and have not become law. Current HUT registration, filing, payment, and recordkeeping duties remain in effect.',
    applies:['Carriers following proposed HUT repeal','Industry groups discussing possible changes','Businesses deciding whether compliance can be paused'],
    changes:['A25 remains in the Assembly Ways and Means Committee.','S345 remains in the Senate Budget and Revenue Committee.','Neither bill has passed both houses or been signed.'],
    mistakes:['Treating an introduced bill as enacted law.','Stopping filings based on social-media reports.','Failing to check official bill status.'],
    sources:[
      ['https://www.nysenate.gov/legislation/bills/2025/A25','Assembly Bill A25'],
      ['https://www.nysenate.gov/legislation/bills/2025/S345','Senate Bill S345'],
      ['https://www.tax.ny.gov/bus/hut/huidx.htm','Current HUT requirements']
    ],
    related:[['/learn/who-needs-a-new-york-hut-permit','Who Needs HUT'],['/learn/who-must-file-mt-903','Who Must File']]
  }
];

const routes=[
'/','/learn','/tools','/services','/ask-hut-ai','/new-york-hut-guide','/site-map',
'/hut-registration-center','/mt-903-filing-center','/vehicle-lifecycle','/audit-and-enforcement-center',
'/exemptions-and-special-vehicles','/forms-library','/carrier-compliance-center',CENTER,
'/tools/hut-permit-requirement','/tools/hut-tax-estimator','/tools/hut-rate-lookup','/tools/hut-penalty-estimator','/tools/mt903-due-date',
'/learn/who-needs-a-new-york-hut-permit','/learn/how-to-register-for-new-york-hut','/learn/new-york-hut-certificate-of-registration',
'/learn/new-york-hut-decals-explained','/learn/temporary-hut-permits-and-first-trip-questions','/learn/how-gvw-affects-your-hut-tax',
'/learn/common-hut-registration-mistakes','/learn/what-is-form-mt-903','/learn/who-must-file-mt-903',
'/learn/mt-903-filing-deadlines-and-frequency','/learn/new-york-hut-taxable-miles','/learn/hut-recordkeeping-requirements',
'/learn/amended-final-and-no-activity-mt-903-returns','/learn/selling-or-transferring-a-new-york-hut-permitted-truck',
'/learn/buying-a-truck-and-new-york-hut','/learn/replacing-a-truck-and-new-york-hut','/learn/adding-a-vehicle-to-new-york-hut',
'/learn/removing-a-vehicle-from-new-york-hut','/learn/changing-gvw-on-a-new-york-hut-vehicle','/learn/lost-hut-certificate',
'/learn/lost-or-damaged-hut-decal','/learn/new-york-hut-audits','/learn/hut-records-you-must-keep',
'/learn/common-new-york-hut-audit-findings','/learn/new-york-hut-penalties','/learn/how-to-respond-to-a-hut-audit',
'/learn/hut-audit-checklist','/learn/new-york-hut-farm-vehicle-exemption','/learn/government-vehicle-hut-exemption',
'/learn/recreational-vehicle-hut-exemption','/learn/dealer-and-transporter-plate-hut-exemption',
'/learn/household-goods-mover-hut-exemption','/learn/special-mobile-equipment-and-road-building-machines',
'/learn/new-york-hut-excluded-vehicles','/learn/new-york-hut-exempt-vehicles',
'/forms/tmt-1','/forms/mt-903','/forms/mt-903-i','/forms/mt-903-mn','/forms/mt-370-1','/forms/mt-370-2',
'/forms/tmt-39','/forms/tmt-334','/forms/dtf-406','/forms/mt-903-fut','/forms/hut-publications',
'/learn/ifta-compliance-for-new-york-carriers','/learn/irp-apportioned-registration','/learn/form-2290-heavy-vehicle-use-tax',
'/learn/unified-carrier-registration-ucr','/learn/fmcsa-registration-and-usdot-compliance',
'/learn/commercial-vehicle-registration-checklist','/learn/trucking-compliance-calendar',
...updates.map(x=>x.path)
];

const style=`<style id="nyh-v66-seo-css">
:root{--sn:#082b4c;--sb:#1768c5;--sl:#d7e3ed;--sm:#536b82;--sp:#f3f8fc}.seo-crumbs{width:min(1160px,calc(100% - 40px));margin:14px auto 0;font-size:.88rem;color:var(--sm)}.seo-crumbs a{color:var(--sb);font-weight:800;text-decoration:none}.seo-crumbs span{margin:0 7px}.seo-review{width:min(1160px,calc(100% - 40px));margin:0 auto 28px;padding:14px 18px;border:1px solid var(--sl);border-radius:12px;background:var(--sp);color:var(--sm);font-size:.9rem}.seo-review strong{color:var(--sn)}.reg-wrap{width:min(1160px,calc(100% - 40px));margin:auto}.reg-hero{padding:58px 0 46px;background:linear-gradient(135deg,#fbfdff,#eef5fb)}.reg-hero h1{font-size:clamp(2.3rem,5vw,4rem);line-height:1.03;letter-spacing:-.04em;color:var(--sn);margin:10px 0 16px}.reg-lead{max-width:940px;color:#496078;font-size:1.08rem}.reg-section{padding:46px 0 72px}.reg-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}.reg-card{border:1px solid var(--sl);border-radius:20px;padding:24px;background:#fff;box-shadow:0 10px 34px rgba(8,43,76,.06)}.reg-card h2{color:var(--sn);margin-top:0}.reg-card p,.reg-card li{color:var(--sm)}.reg-tag{display:inline-block;padding:5px 9px;border-radius:999px;background:#e9f3fc;color:#0b5ca8;font-size:.78rem;font-weight:900}.reg-btn{display:inline-flex;margin:10px 8px 0 0;padding:12px 16px;border-radius:10px;background:var(--sb);color:#fff;text-decoration:none;font-weight:900}.reg-links{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:11px}.reg-links a{padding:12px;border:1px solid var(--sl);border-radius:12px;text-decoration:none;color:var(--sn);font-weight:850}.current-updates{margin:24px auto;width:min(1100px,calc(100% - 40px));border:1px solid var(--sl);border-radius:18px;padding:22px;background:var(--sp)}@media(max-width:850px){.reg-grid,.reg-links{grid-template-columns:1fr}.reg-wrap,.seo-crumbs,.seo-review{width:min(100% - 24px,1160px)}}
</style>`;

const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot',"'":'&#39;'}[m]));
const get=(html,re)=>(html.match(re)||[])[1]||'';
const label=s=>s.split('-').map(x=>x?x[0].toUpperCase()+x.slice(1):'').join(' ');

function breadcrumbs(path,title){
  const p=path.split('/').filter(Boolean), out=[['/','Home']];
  if(p[0]==='learn')out.push(['/learn','Learn']);
  if(p[0]==='forms')out.push(['/forms-library','Forms Library']);
  if(p[0]==='tools')out.push(['/tools','Tools']);
  if(p[0]==='news')out.push([CENTER,'News & Regulatory']);
  if(path!==out.at(-1)[0])out.push([path,title||label(p.at(-1)||'')]);
  return out;
}

function graph(path,title,description,canonical,type){
  const bc=breadcrumbs(path,title);
  const pageType=type==='article'?'Article':type==='collection'?'CollectionPage':'WebPage';
  const page={'@type':pageType,'@id':canonical+'#page',url:canonical,name:title,description,isPartOf:{'@id':'https://newyorkhut.com/#website'},breadcrumb:{'@id':canonical+'#breadcrumb'}};
  if(type==='article')Object.assign(page,{headline:title,dateModified:LASTMOD,author:{'@id':'https://newyorkhut.com/#org'},publisher:{'@id':'https://newyorkhut.com/#org'}});
  return JSON.stringify({'@context':'https://schema.org','@graph':[
    {'@type':'Organization','@id':'https://newyorkhut.com/#org',name:'NewYorkHUT.com',url:'https://newyorkhut.com/'},
    {'@type':'WebSite','@id':'https://newyorkhut.com/#website',name:'NewYorkHUT.com',url:'https://newyorkhut.com/',publisher:{'@id':'https://newyorkhut.com/#org'}},
    page,
    {'@type':'BreadcrumbList','@id':canonical+'#breadcrumb',itemListElement:bc.map(([u,n],i)=>({'@type':'ListItem',position:i+1,name:n,item:'https://newyorkhut.com'+u}))}
  ]});
}

function enhance(html,path,status=200){
  if(!/<html/i.test(html))return html;
  const title=get(html,/<title[^>]*>([\s\S]*?)<\/title>/i).replace(/<[^>]+>/g,'').trim()||'New York Highway Use Tax | NewYorkHUT.com';
  const description=get(html,/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)||'New York Highway Use Tax education, tools, forms, compliance guidance, and regulatory updates.';
  const existing=get(html,/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i);
  const canonical=existing||`https://newyorkhut.com${path}`;
  const type=path.startsWith('/learn/')||path.startsWith('/news/')?'article':path.endsWith('center')||['/','/learn','/tools','/forms-library','/site-map'].includes(path)?'collection':'webpage';
  const indexable=status<400&&!path.startsWith('/__')&&!path.startsWith('/api/');
  const tags=[
    existing?'':`<link rel="canonical" href="${esc(canonical)}">`,
    `<meta name="robots" content="${indexable?'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1':'noindex,nofollow'}">`,
    `<meta name="author" content="NewYorkHUT.com Editorial Team">`,
    `<meta property="og:type" content="${type==='article'?'article':'website'}">`,
    `<meta property="og:site_name" content="NewYorkHUT.com">`,
    `<meta property="og:title" content="${esc(title)}">`,
    `<meta property="og:description" content="${esc(description)}">`,
    `<meta property="og:url" content="${esc(canonical)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(title)}">`,
    `<meta name="twitter:description" content="${esc(description)}">`,
    `<script type="application/ld+json">${graph(path,title,description,canonical,type)}</script>`,
    html.includes('nyh-v66-seo-css')?'':style
  ].join('');
  let out=html.replace(/<\/head>/i,tags+'</head>');
  const bc=breadcrumbs(path,title);
  const nav=`<nav class="seo-crumbs" aria-label="Breadcrumb">${bc.map(([u,n],i)=>i===bc.length-1?`<strong aria-current="page">${esc(n)}</strong>`:`<a href="${u}">${esc(n)}</a><span>›</span>`).join('')}</nav>`;
  if(!out.includes('class="seo-crumbs"'))out=out.replace(/<main\b/i,nav+'<main');
  if(indexable&&(path.startsWith('/learn/')||path.startsWith('/forms/')||path.startsWith('/news/'))&&!out.includes('class="seo-review"'))out=out.replace(/<\/main>/i,`<div class="seo-review"><strong>Editorial review:</strong> Reviewed August 2, 2026. Verify current requirements through the official sources linked on this page.</div></main>`);
  return out;
}

function sitemap(){
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${[...new Set(routes)].map(p=>`<url><loc>https://newyorkhut.com${p}</loc><lastmod>${LASTMOD}</lastmod><changefreq>${p.startsWith('/news/')?'monthly':p.includes('center')?'weekly':'monthly'}</changefreq><priority>${p==='/'?'1.0':p.includes('center')?'0.9':'0.8'}</priority></url>`).join('')}</urlset>`;
}

function header(){
  return `<header style="background:#fff;border-bottom:1px solid #d7e3ed"><div class="reg-wrap" style="min-height:76px;display:flex;align-items:center;justify-content:space-between;gap:18px"><a href="/" style="font-weight:950;color:#082b4c;text-decoration:none">NewYorkHUT.com</a><nav style="display:flex;gap:12px;flex-wrap:wrap"><a href="/learn">Learn</a><a href="/tools">Tools</a><a href="/forms-library">Forms</a><a href="${CENTER}">News</a><a href="${ASK}">Ask HUT AI</a><a href="${ORDER}">Go to NYHUT</a></nav></div></header>`;
}
function shell(title,description,path,body){
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="https://newyorkhut.com${path}">${style}</head><body>${header()}${body}</body></html>`;
}
function updatePage(d){
  const body=`<main><section class="reg-hero"><div class="reg-wrap"><span class="reg-tag">Regulatory Update</span><h1>${esc(d.title)}</h1><p class="reg-lead">${esc(d.answer)}</p><p><strong>Update date:</strong> ${esc(d.date)}</p></div></section><section class="reg-section"><div class="reg-wrap"><div class="reg-grid"><article class="reg-card"><h2>Quick Answer</h2><p>${esc(d.answer)}</p><h2>Who This Applies To</h2><ul>${d.applies.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></article><article class="reg-card"><h2>What Changed</h2><ol>${d.changes.map(x=>`<li>${esc(x)}</li>`).join('')}</ol><h2>Common Mistakes</h2><ul>${d.mistakes.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></article><article class="reg-card"><h2>Official References</h2><ul>${d.sources.map(([u,n])=>`<li><a href="${u}" target="_blank" rel="noopener">${esc(n)} →</a></li>`).join('')}</ul></article><article class="reg-card"><h2>Related Guides and Tools</h2><div class="reg-links">${d.related.map(([u,n])=>`<a href="${u}">${esc(n)} →</a>`).join('')}</div><h2>Ask HUT AI</h2><a class="reg-btn" href="${ASK}">Ask about this update →</a><h2>Complete This Task in NYHUT</h2><a class="reg-btn" href="${ORDER}">Open NYHUT →</a></article></div></div></section></main>`;
  return shell(`${d.title} | NewYorkHUT.com`,d.description,d.path,body);
}
function center(){
  const cards=updates.map(d=>`<article class="reg-card"><span class="reg-tag">${esc(d.date)}</span><h2>${esc(d.title)}</h2><p>${esc(d.description)}</p><a class="reg-btn" href="${d.path}">Read update →</a></article>`).join('');
  return shell('New York HUT News & Regulatory Center','Official New York HUT bulletin updates, form changes, interest rates, and legislative developments.',CENTER,`<main><section class="reg-hero"><div class="reg-wrap"><span class="reg-tag">Current HUT developments</span><h1>News &amp; Regulatory Center</h1><p class="reg-lead">Track official Tax Department bulletin and form updates, quarterly HUT interest rates, and active legislation.</p></div></section><section class="reg-section"><div class="reg-wrap"><div class="reg-grid">${cards}</div></div></section></main>`);
}
function htmlMap(){
  const items=[...new Set(routes)].filter(p=>p!=='/').map(p=>`<li><a href="${p}">${esc(label(p.split('/').filter(Boolean).at(-1)))}</a></li>`).join('');
  return shell('NewYorkHUT.com Site Map','Browse New York HUT guides, tools, forms, centers, and regulatory updates.','/site-map',`<main><section class="reg-hero"><div class="reg-wrap"><h1>Site Map</h1><p class="reg-lead">Browse the complete NewYorkHUT.com topical authority network.</p></div></section><section class="reg-section"><div class="reg-wrap"><article class="reg-card"><ul style="columns:2;column-gap:32px">${items}</ul></article></div></section></main>`);
}
function updateBlock(){
  return `<section class="current-updates" id="current-hut-updates"><span class="reg-tag">Current regulatory knowledge</span><h2>Current New York HUT updates</h2><div class="reg-links">${updates.map(d=>`<a href="${d.path}">${esc(d.title)} →</a>`).join('')}</div></section>`;
}

export default{
  async fetch(request,env,ctx){
    const url=new URL(request.url), path=url.pathname.replace(/\/+$/,'')||'/';
    if(path==='/robots.txt')return new Response('User-agent: *\nAllow: /\nDisallow: /__deploy_probe\nDisallow: /api/\nSitemap: https://newyorkhut.com/sitemap.xml\n',{headers:{'content-type':'text/plain; charset=utf-8','cache-control':'public, max-age=3600','x-newyorkhut-version':VERSION}});
    if(path==='/sitemap.xml')return new Response(sitemap(),{headers:{'content-type':'application/xml; charset=utf-8','cache-control':'public, max-age=3600','x-newyorkhut-version':VERSION}});
    if(path==='/site-map')return new Response(enhance(htmlMap(),path),{headers:{'content-type':'text/html; charset=utf-8','cache-control':'no-store','x-newyorkhut-version':VERSION}});
    if(path===CENTER)return new Response(enhance(center(),path),{headers:{'content-type':'text/html; charset=utf-8','cache-control':'no-store','x-newyorkhut-version':VERSION,'x-newyorkhut-feature':'news-regulatory-center-v66'}});
    const update=updates.find(x=>x.path===path);
    if(update)return new Response(enhance(updatePage(update),path),{headers:{'content-type':'text/html; charset=utf-8','cache-control':'no-store','x-newyorkhut-version':VERSION,'x-newyorkhut-feature':'regulatory-update-v66'}});
    const response=await site.fetch(request,env,ctx), type=response.headers.get('content-type')||'';
    if(!type.includes('text/html'))return response;
    let html=await response.text();
    if(path==='/ask-hut-ai'&&!html.includes('current-hut-updates'))html=html.replace(/<main\b/i,updateBlock()+'<main');
    const headers=new Headers(response.headers);
    headers.set('cache-control','no-store');
    headers.set('x-newyorkhut-version',VERSION);
    headers.set('x-newyorkhut-seo','global-technical-seo-v66');
    return new Response(enhance(html,path,response.status),{status:response.status,statusText:response.statusText,headers});
  }
};
