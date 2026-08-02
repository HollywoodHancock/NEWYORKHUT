import site from './index-v65.js';

const VERSION='v66';
const ORDER='https://www.nyhut.com/';
const ASK='/ask-hut-ai';
const CENTER='/news-and-regulatory-center';
const UPDATED='2026-08-02';

const NEWS={
  bulletins:{
    path:'/news/hut-tax-bulletins-updated-march-2026',
    title:'New York HUT Tax Bulletins Updated March 2026',
    desc:'What carriers should know about the March 26, 2026 refresh of New York Highway Use Tax bulletins.',
    date:'March 26, 2026',
    quick:'The New York Tax Department refreshed multiple HUT tax bulletins on March 26, 2026, including guidance on certificates, decals, filing requirements, recordkeeping, exemptions, tax calculations, and enforcement. The update date does not itself mean every substantive rule changed, so carriers should compare the current bulletin with the facts of their operation.',
    applies:['HUT-registered carriers and permit services.','Carriers relying on saved or printed HUT bulletins.','Compliance teams preparing registrations, returns, audits, or vehicle changes.'],
    changes:['Certificate, decal, filing, recordkeeping, exemption, tax-calculation, and related HUT bulletins now show an updated date of March 26, 2026.','The current pages continue to warn that later law or interpretation can affect bulletin accuracy.','Carriers should use the live Tax Department pages rather than undated copies found elsewhere.'],
    mistakes:['Assuming an updated page date proves a tax rate or legal standard changed.','Using an archived copy without checking the live source.','Relying on one bulletin without reviewing the current form instructions.'],
    refs:[
      ['https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/hut/certificate_of_registration.htm','Certificate of Registration'],
      ['https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/hut/filing_requirements.htm','Filing Requirements'],
      ['https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/hut/recordkeeping_requirements.htm','Recordkeeping Requirements'],
      ['https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/hut/how_to_determine_tax.htm','How to Determine HUT']
    ],
    related:[['/forms/hut-publications','HUT Bulletins and Publications'],['/learn/hut-records-you-must-keep','Records You Must Keep'],['/learn/how-gvw-affects-your-hut-tax','How GVW Affects HUT']]
  },
  forms:{
    path:'/news/hut-forms-index-updated-june-2026',
    title:'New York HUT Forms Index Updated June 2026',
    desc:'Review the June 29, 2026 New York HUT and fuel use tax forms index update and the current forms carriers should use.',
    date:'June 29, 2026',
    quick:'New York’s Highway Use and Fuel Use Tax form index was updated June 29, 2026. The current index lists MT-903 as the current Highway Use Tax Return and includes current registration, replacement, refund, IFTA, and fuel-use forms.',
    applies:['Carriers preparing current HUT or fuel-use filings.','Permit services downloading registration forms.','Auditors or preparers distinguishing current forms from prior-year archives.'],
    changes:['The official form index shows an update date of June 29, 2026.','MT-903 remains the current Highway Use Tax Return.','TMT-1, TMT-39, TMT-334, MT-903-FUT, and current IFTA forms remain available from the live index.'],
    mistakes:['Using MT-903-MN for a current filing.','Downloading a prior-year form from a search result.','Using a current form with outdated instructions.'],
    refs:[['https://www.tax.ny.gov/forms/highway_use_fuel_use_tax.htm','Current Highway Use and Fuel Use Tax forms'],['https://www.tax.ny.gov/pdf/current_forms/motor/mt903_fill_in.pdf','Current MT-903'],['https://www.tax.ny.gov/forms/current-forms/motor/mt903i.htm','Current MT-903-I instructions']],
    related:[['/forms-library','HUT Forms Library'],['/forms/mt-903','MT-903 Guide'],['/forms/mt-903-mn','MT-903-MN Historical Form']]
  },
  interest:{
    path:'/news/hut-interest-rate-july-september-2026',
    title:'New York HUT Interest Rates: July–September 2026',
    desc:'New York Highway Use Tax refund and late-payment interest rates for July 1 through September 30, 2026.',
    date:'July 1–September 30, 2026',
    quick:'For July 1 through September 30, 2026, New York lists a 6% annual refund interest rate and an 11% annual late-payment and assessment interest rate for Highway Use Tax, compounded daily.',
    applies:['Carriers estimating exposure on late HUT payments or assessments.','Taxpayers reviewing HUT refunds.','Businesses reconciling audit or amended-return balances during the quarter.'],
    changes:['The Highway Use Tax late-payment and assessment rate for the quarter is 11% per year, compounded daily.','The Highway Use Tax refund rate is 6% per year, compounded daily.','Interest is separate from filing or payment penalties.'],
    mistakes:['Applying the rate to a period outside July 1–September 30, 2026.','Treating the annual rate as a flat one-time charge.','Assuming interest and penalties are the same calculation.'],
    refs:[['https://www.tax.ny.gov/pay/interest/2026/p3.htm','Official New York interest rates for 7/1/2026–9/30/2026'],['https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/hut/enforcement_provisions.htm','HUT enforcement provisions']],
    related:[['/learn/new-york-hut-penalties','HUT Penalties and Interest'],['/tools/hut-penalty-estimator','Penalty Estimator'],['/learn/how-to-respond-to-a-hut-audit','Responding to an Audit']]
  },
  legislation:{
    path:'/news/new-york-hut-repeal-bills-a25-s345',
    title:'New York HUT Repeal Bills A25 and S345',
    desc:'Current status of the 2025–2026 New York bills proposing repeal of the Highway Use Tax.',
    date:'Status checked August 2, 2026',
    quick:'Assembly Bill A25 and Senate Bill S345 propose repealing Article 21 of the New York Tax Law, which imposes the Highway Use Tax. As of August 2, 2026, both bills remain in committee and have not become law. Existing HUT registration, filing, payment, and recordkeeping requirements therefore remain in effect.',
    applies:['Carriers following proposed HUT repeal legislation.','Industry groups and advisors discussing possible future changes.','Businesses deciding whether current HUT compliance can be paused.'],
    changes:['A25 is listed in the Assembly Ways and Means Committee.','S345 is listed in the Senate Budget and Revenue Committee.','Neither bill has passed both houses or been signed into law.'],
    mistakes:['Treating an introduced bill as enacted law.','Stopping filings or registrations based on social-media reports.','Failing to check the official bill status before advising a carrier.'],
    refs:[['https://www.nysenate.gov/legislation/bills/2025/A25','Assembly Bill A25'],['https://www.nysenate.gov/legislation/bills/2025/S345','Senate Bill S345'],['https://www.tax.ny.gov/bus/hut/huidx.htm','Current HUT requirements']],
    related:[['/learn/who-needs-a-new-york-hut-permit','Who Needs HUT'],['/learn/who-must-file-mt-903','Who Must File MT-903'],['/news-and-regulatory-center','News and Regulatory Center']]
  }
};

const ROUTES=[
  '/',
  '/learn','/tools','/services','/ask-hut-ai','/new-york-hut-guide',
  '/hut-registration-center','/mt-903-filing-center','/vehicle-lifecycle',
  '/audit-and-enforcement-center','/exemptions-and-special-vehicles',
  '/forms-library','/carrier-compliance-center',CENTER,
  '/tools/hut-permit-requirement','/tools/hut-tax-estimator','/tools/hut-rate-lookup',
  '/tools/hut-penalty-estimator','/tools/mt903-due-date',
  '/learn/who-needs-a-new-york-hut-permit','/learn/how-to-register-for-new-york-hut',
  '/learn/new-york-hut-certificate-of-registration','/learn/new-york-hut-decals-explained',
  '/learn/temporary-hut-permits-and-first-trip-questions','/learn/how-gvw-affects-your-hut-tax',
  '/learn/common-hut-registration-mistakes',
  '/learn/what-is-form-mt-903','/learn/who-must-file-mt-903',
  '/learn/mt-903-filing-deadlines-and-frequency','/learn/new-york-hut-taxable-miles',
  '/learn/hut-recordkeeping-requirements','/learn/amended-final-and-no-activity-mt-903-returns',
  '/learn/selling-or-transferring-a-new-york-hut-permitted-truck',
  '/learn/buying-a-truck-and-new-york-hut','/learn/replacing-a-truck-and-new-york-hut',
  '/learn/adding-a-vehicle-to-new-york-hut','/learn/removing-a-vehicle-from-new-york-hut',
  '/learn/changing-gvw-on-a-new-york-hut-vehicle','/learn/lost-hut-certificate',
  '/learn/lost-or-damaged-hut-decal',
  '/learn/new-york-hut-audits','/learn/hut-records-you-must-keep',
  '/learn/common-new-york-hut-audit-findings','/learn/new-york-hut-penalties',
  '/learn/how-to-respond-to-a-hut-audit','/learn/hut-audit-checklist',
  '/learn/new-york-hut-farm-vehicle-exemption','/learn/government-vehicle-hut-exemption',
  '/learn/recreational-vehicle-hut-exemption','/learn/dealer-and-transporter-plate-hut-exemption',
  '/learn/household-goods-mover-hut-exemption','/learn/special-mobile-equipment-and-road-building-machines',
  '/learn/new-york-hut-excluded-vehicles','/learn/new-york-hut-exempt-vehicles',
  '/forms/tmt-1','/forms/mt-903','/forms/mt-903-i','/forms/mt-903-mn',
  '/forms/mt-370-1','/forms/mt-370-2','/forms/tmt-39','/forms/tmt-334',
  '/forms/dtf-406','/forms/mt-903-fut','/forms/hut-publications',
  '/learn/ifta-compliance-for-new-york-carriers','/learn/irp-apportioned-registration',
  '/learn/form-2290-heavy-vehicle-use-tax','/learn/unified-carrier-registration-ucr',
  '/learn/fmcsa-registration-and-usdot-compliance','/learn/commercial-vehicle-registration-checklist',
  '/learn/trucking-compliance-calendar',
  ...Object.values(NEWS).map(x=>x.path)
];

const CSS=`<style id="nyh-v66-seo-css">
:root{--seo-n:#082b4c;--seo-b:#1768c5;--seo-l:#d7e3ed;--seo-m:#536b82;--seo-p:#f3f8fc}.nyh-breadcrumbs{width:min(1160px,calc(100% - 40px));margin:14px auto 0;font-size:.88rem;color:var(--seo-m)}.nyh-breadcrumbs a{color:var(--seo-b);font-weight:750;text-decoration:none}.nyh-breadcrumbs span{margin:0 7px}.nyh-seo-review{width:min(1160px,calc(100% - 40px));margin:0 auto 30px;padding:14px 18px;border:1px solid var(--seo-l);border-radius:12px;background:var(--seo-p);color:var(--seo-m);font-size:.9rem}.nyh-seo-review strong{color:var(--seo-n)}.nyh-news-hero{padding:58px 0 46px;background:linear-gradient(135deg,#fbfdff,#eef5fb)}.nyh-wrap{width:min(1160px,calc(100% - 40px));margin:auto}.nyh-news-hero h1{font-size:clamp(2.3rem,5vw,4rem);line-height:1.03;letter-spacing:-.04em;color:var(--seo-n);margin:10px 0 16px}.nyh-news-lead{max-width:930px;color:#496078;font-size:1.08rem}.nyh-news-section{padding:46px 0 72px}.nyh-news-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}.nyh-news-card{border:1px solid var(--seo-l);border-radius:20px;padding:24px;background:#fff;box-shadow:0 10px 34px rgba(8,43,76,.06)}.nyh-news-card h2{color:var(--seo-n);margin-top:0}.nyh-news-card p,.nyh-news-card li{color:var(--seo-m)}.nyh-news-tag{display:inline-block;padding:5px 9px;border-radius:999px;background:#e9f3fc;color:#0b5ca8;font-size:.78rem;font-weight:900}.nyh-news-btn{display:inline-flex;margin:10px 8px 0 0;padding:12px 16px;border-radius:10px;background:var(--seo-b);color:#fff;text-decoration:none;font-weight:900}.nyh-news-linkgrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:11px}.nyh-news-linkgrid a{padding:12px 14px;border:1px solid var(--seo-l);border-radius:12px;text-decoration:none;color:var(--seo-n);font-weight:850}.nyh-news-source{background:var(--seo-p)}.nyh-news-source a{color:var(--seo-b);font-weight:850}.nyh-current-updates{margin:24px auto;width:min(1100px,calc(100% - 40px));border:1px solid var(--seo-l);border-radius:18px;padding:22px;background:var(--seo-p)}.nyh-current-updates h2{color:var(--seo-n)}@media(max-width:850px){.nyh-news-grid,.nyh-news-linkgrid{grid-template-columns:1fr}.nyh-wrap,.nyh-breadcrumbs,.nyh-seo-review{width:min(100% - 24px,1160px)}}
</style>`;

function esc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function text(html,re){const m=html.match(re);return m?m[1].replace(/<[^>]+>/g,'').trim():''}
function slugLabel(s){return s.split('-').map(x=>x?x[0].toUpperCase()+x.slice(1):'').join(' ')}
function crumbs(path,title){
  const parts=path.split('/').filter(Boolean);
  const arr=[['/','Home']];
  if(parts[0]==='learn')arr.push(['/learn','Learn']);
  else if(parts[0]==='forms')arr.push(['/forms-library','Forms Library']);
  else if(parts[0]==='news')arr.push([CENTER,'News & Regulatory']);
  else if(parts[0]==='tools')arr.push(['/tools','Tools']);
  if(path!==arr[arr.length-1][0])arr.push([path,title||slugLabel(parts.at(-1)||''));
  return arr;
}
function schema(path,title,desc,canonical,type){
  const bc=crumbs(path,title);
  const pageType=type==='article'?'Article':type==='collection'?'CollectionPage':'WebPage';
  const page={'@type':pageType,'@id':canonical+'#page',url:canonical,name:title,description:desc,isPartOf:{'@id':'https://newyorkhut.com/#website'},breadcrumb:{'@id':canonical+'#breadcrumb'}};
  if(type==='article'){page.headline=title;page.dateModified=UPDATED;page.author={'@id':'https://newyorkhut.com/#organization'};page.publisher={'@id':'https://newyorkhut.com/#organization'}}
  return JSON.stringify({'@context':'https://schema.org','@graph':[
    {'@type':'Organization','@id':'https://newyorkhut.com/#organization',name:'NewYorkHUT.com',url:'https://newyorkhut.com/'},
    {'@type':'WebSite','@id':'https://newyorkhut.com/#website',url:'https://newyorkhut.com/',name:'NewYorkHUT.com',publisher:{'@id':'https://newyorkhut.com/#organization'}},
    page,
    {'@type':'BreadcrumbList','@id':canonical+'#breadcrumb',itemListElement:bc.map(([url,name],i)=>({'@type':'ListItem',position:i+1,name,item:'https://newyorkhut.com'+(url==='/'?'/':url)}))}
  ]});
}
function enhance(html,path,status){
  if(!/<html/i.test(html))return html;
  const title=text(html,/<title[^>]*>([\s\S]*?)<\/title>/i)||'New York Highway Use Tax Guidance | NewYorkHUT.com';
  const desc=(html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)||[])[1]||'New York Highway Use Tax education, tools, forms, compliance guidance, and current regulatory updates.';
  const existing=(html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i)||[])[1];
  const canonical=existing||`https://newyorkhut.com${path}`;
  const type=path.startsWith('/learn/')||path.startsWith('/news/')?'article':ROUTES.includes(path)&&!path.includes('/learn/')&&!path.includes('/forms/')&&!path.includes('/news/')?'collection':'webpage';
  const indexable=status<400&&!path.startsWith('/__')&&!path.startsWith('/api/');
  const tags=[
    !existing?`<link rel="canonical" href="${esc(canonical)}">`:'',
    `<meta name="robots" content="${indexable?'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1':'noindex,nofollow'}">`,
    `<meta name="author" content="NewYorkHUT.com Editorial Team">`,
    `<meta property="og:type" content="${type==='article'?'article':'website'}">`,
    `<meta property="og:site_name" content="NewYorkHUT.com">`,
    `<meta property="og:title" content="${esc(title)}">`,
    `<meta property="og:description" content="${esc(desc)}">`,
    `<meta property="og:url" content="${esc(canonical)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(title)}">`,
    `<meta name="twitter:description" content="${esc(desc)}">`,
    `<script type="application/ld+json">${schema(path,title,desc,canonical,type)}</script>`,
    CSS
  ].filter(Boolean).join('');
  let out=html.replace(/<\/head>/i,`${tags}</head>`);
  const bc=crumbs(path,title);
  const nav=`<nav class="nyh-breadcrumbs" aria-label="Breadcrumb">${bc.map(([u,n],i)=>i===bc.length-1?`<strong aria-current="page">${esc(n)}</strong>`:`<a href="${u}">${esc(n)}</a><span aria-hidden="true">›</span>`).join('')}</nav>`;
  out=out.replace(/<main\b/i,`${nav}<main`);
  if(indexable&&(path.startsWith('/learn/')||path.startsWith('/forms/')||path.startsWith('/news/'))){
    out=out.replace(/<\/main>/i,`<div class="nyh-seo-review"><strong>Editorial review:</strong> Reviewed August 2, 2026. Verify current requirements through the official sources linked on this page.</div></main>`);
  }
  return out;
}
function xml(){
  const rows=[...new Set(ROUTES)].map(p=>`<url><loc>https://newyorkhut.com${p==='/'?'/':p}</loc><lastmod>${UPDATED}</lastmod><changefreq>${p.startsWith('/news/')?'monthly':p.includes('center')||p==='/'?'weekly':'monthly'}</changefreq><priority>${p==='/'?'1.0':p.includes('center')?'0.9':'0.8'}</priority></url>`).join('');
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${rows}</urlset>`;
}
function newsHeader(){return `<header style="background:#fff;border-bottom:1px solid #d7e3ed"><div class="nyh-wrap" style="min-height:76px;display:flex;align-items:center;justify-content:space-between;gap:18px"><a href="/" style="font-weight:950;color:#082b4c;text-decoration:none">NewYorkHUT.com</a><nav style="display:flex;gap:12px;flex-wrap:wrap"><a href="/learn">Learn</a><a href="/tools">Tools</a><a href="/forms-library">Forms</a><a href="${CENTER}">News</a><a href="${ASK}">Ask HUT AI</a><a href="${ORDER}">Go to NYHUT</a></nav></div></header>`}
function newsShell(title,desc,path,body){return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${esc(desc)}"><link rel="canonical" href="https://newyorkhut.com${path}">${CSS}</head><body>${newsHeader()}${body}</body></html>`}
function newsPage(d){
  const body=`<main><section class="nyh-news-hero"><div class="nyh-wrap"><span class="nyh-news-tag">Regulatory Update</span><h1>${esc(d.title)}</h1><p class="nyh-news-lead">${esc(d.quick)}</p><p><strong>Update date:</strong> ${esc(d.date)}</p></div></section><section class="nyh-news-section"><div class="nyh-wrap"><div class="nyh-news-grid"><article class="nyh-news-card"><h2>Quick Answer</h2><p>${esc(d.quick)}</p><h2>Who This Applies To</h2><ul>${d.applies.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></article><article class="nyh-news-card"><h2>What Changed</h2><ol>${d.changes.map(x=>`<li>${esc(x)}</li>`).join('')}</ol><h2>Common Mistakes</h2><ul>${d.mistakes.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></article><article class="nyh-news-card nyh-news-source"><h2>Official References</h2><ul>${d.refs.map(([h,l])=>`<li><a href="${h}" target="_blank" rel="noopener">${esc(l)} →</a></li>`).join('')}</ul></article><article class="nyh-news-card"><h2>Related Guides and Tools</h2><div class="nyh-news-linkgrid">${d.related.map(([h,l])=>`<a href="${h}">${esc(l)} →</a>`).join('')}</div><h2>Ask HUT AI</h2><a class="nyh-news-btn" href="${ASK}">Ask about this update →</a><h2>Complete This Task in NYHUT</h2><a class="nyh-news-btn" href="${ORDER}">Open NYHUT →</a></article></div></div></section></main>`;
  return newsShell(`${d.title} | NewYorkHUT.com`,d.desc,d.path,body);
}
function center(){
  const cards=Object.values(NEWS).map(d=>`<article class="nyh-news-card"><span class="nyh-news-tag">${esc(d.date)}</span><h2>${esc(d.title)}</h2><p>${esc(d.desc)}</p><a class="nyh-news-btn" href="${d.path}">Read update →</a></article>`).join('');
  const body=`<main><section class="nyh-news-hero"><div class="nyh-wrap"><span class="nyh-news-tag">Current HUT developments</span><h1>News &amp; Regulatory Center</h1><p class="nyh-news-lead">Track official Tax Department bulletin and form updates, quarterly HUT interest rates, and active New York legislation that could affect Highway Use Tax compliance.</p></div></section><section class="nyh-news-section"><div class="nyh-wrap"><div class="nyh-news-grid">${cards}</div></div></section></main>`;
  return newsShell('New York HUT News & Regulatory Center','Official New York HUT bulletin updates, form changes, interest rates, and legislative developments.',CENTER,body);
}
function updatesBlock(){
  return `<section class="nyh-current-updates" id="current-hut-updates"><span class="nyh-news-tag">Current regulatory knowledge</span><h2>Current New York HUT updates</h2><div class="nyh-news-linkgrid">${Object.values(NEWS).map(d=>`<a href="${d.path}">${esc(d.title)} →</a>`).join('')}</div></section>`;
}
function siteMap(){
  const items=[...new Set(ROUTES)].filter(p=>p!=='/').map(p=>`<li><a href="${p}">${esc(slugLabel(p.split('/').filter(Boolean).at(-1)))}</a></li>`).join('');
  return newsShell('NewYorkHUT.com Site Map','Browse every major New York HUT guide, tool, form, compliance center, and regulatory update.','/site-map',`<main><section class="nyh-news-hero"><div class="nyh-wrap"><h1>Site Map</h1><p class="nyh-news-lead">Browse the complete NewYorkHUT.com knowledge and tools network.</p></div></section><section class="nyh-news-section"><div class="nyh-wrap"><article class="nyh-news-card"><ul style="columns:2;column-gap:32px">${items}</ul></article></div></section></main>`);
}

export default{
  async fetch(request,env,ctx){
    const url=new URL(request.url);
    const path=url.pathname.replace(/\/+$/,'')||'/';
    if(path==='/robots.txt')return new Response(`User-agent: *\nAllow: /\nDisallow: /__deploy_probe\nDisallow: /api/\nSitemap: https://newyorkhut.com/sitemap.xml\n`,{headers:{'content-type':'text/plain; charset=utf-8','cache-control':'public, max-age=3600','x-newyorkhut-version':VERSION}});
    if(path==='/sitemap.xml')return new Response(xml(),{headers:{'content-type':'application/xml; charset=utf-8','cache-control':'public, max-age=3600','x-newyorkhut-version':VERSION}});
    if(path==='/site-map')return new Response(enhance(siteMap(),path,200),{headers:{'content-type':'text/html; charset=utf-8','cache-control':'no-store','x-newyorkhut-version':VERSION}});
    if(path===CENTER)return new Response(enhance(center(),path,200),{headers:{'content-type':'text/html; charset=utf-8','cache-control':'no-store','x-newyorkhut-version':VERSION,'x-newyorkhut-feature':'news-regulatory-center-v66'}});
    const item=Object.values(NEWS).find(x=>x.path===path);
    if(item)return new Response(enhance(newsPage(item),path,200),{headers:{'content-type':'text/html; charset=utf-8','cache-control':'no-store','x-newyorkhut-version':VERSION,'x-newyorkhut-feature':'regulatory-update-v66'}});
    const response=await site.fetch(request,env,ctx);
    const ct=response.headers.get('content-type')||'';
    if(!ct.includes('text/html'))return response;
    let html=await response.text();
    if(path==='/ask-hut-ai'&&!html.includes('current-hut-updates'))html=html.replace(/<main\b/i,`${updatesBlock()}<main`);
    const headers=new Headers(response.headers);
    headers.set('cache-control','no-store');
    headers.set('x-newyorkhut-version',VERSION);
    headers.set('x-newyorkhut-seo','global-technical-seo-v66');
    return new Response(enhance(html,path,response.status),{status:response.status,statusText:response.statusText,headers});
  }
};
