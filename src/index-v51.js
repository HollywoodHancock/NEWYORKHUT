import site from './index-v50.js';

const VERSION='v51';
const ORDER='https://www.nyhut.com/';
const PORTAL='https://www.nyhut.com/my-nyhut';

const groups=[
  {title:'Start Here',links:[
    ['Home','/'],
    ['Complete HUT Guide','/new-york-hut-guide'],
    ['Learning Center','/learn'],
    ['Ask HUT AI','/ask-hut-ai']
  ]},
  {title:'Compliance Tools',links:[
    ['All Compliance Tools','/tools'],
    ['HUT Eligibility Checker','/tools/eligibility-checker'],
    ['Permit Service Finder','/tools/permit-service-finder'],
    ['Registration Readiness Checklist','/tools/readiness-checklist'],
    ['HUT Tax Estimator','/tools/hut-tax-estimator'],
    ['Trip Cost Estimator','/tools/trip-cost-estimator'],
    ['Vehicle Weight Guide','/tools/weight-guide'],
    ['Filing Deadline Planner','/tools/filing-deadlines']
  ]},
  {title:'Permit Services',links:[
    ['All Permit Services','/services'],
    ['New HUT Permit','/services/new-hut-permit'],
    ['Temporary HUT Permit','/services/temporary-hut-permit'],
    ['HUT Renewal','/services/hut-renewal'],
    ['Add a Vehicle','/services/add-a-vehicle'],
    ['Replacement Credential','/services/replacement-permit'],
    ['Account Update','/services/account-update']
  ]},
  {title:'HUT Guidance',links:[
    ['What Is New York HUT?','/what-is-hut'],
    ['Who Needs New York HUT?','/new-york-hut/do-i-need-new-york-hut'],
    ['HUT Weight Requirements','/new-york-hut/new-york-hut-weight-threshold'],
    ['Temporary HUT Certificates','/new-york-hut/what-is-a-new-york-hut-trip-certificate'],
    ['Vehicles and Decals','/new-york-hut/vehicles-and-decals'],
    ['Filing and Taxes','/new-york-hut/filing-and-taxes'],
    ['Exemptions','/new-york-hut/exemptions'],
    ['Enforcement and Account Status','/new-york-hut/enforcement']
  ]}
];

const publicPaths=[...new Set(groups.flatMap(g=>g.links.map(x=>x[1])).concat(['/site-map']))];

const GLOBAL_CSS=`<style id="nyh-universal-nav-css">
.nyh-global-header{position:relative;z-index:1000;background:#fff;border-bottom:1px solid #d7e3ed;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}.nyh-global-nav{width:min(1180px,calc(100% - 40px));min-height:72px;margin:auto;display:flex;align-items:center;justify-content:space-between;gap:20px}.nyh-global-brand{font-weight:950;font-size:1.16rem;color:#082b4c;text-decoration:none;white-space:nowrap}.nyh-global-links{display:flex;align-items:center;gap:17px;flex-wrap:wrap}.nyh-global-links a{font-weight:850;color:#082b4c;text-decoration:none}.nyh-global-links a:hover,.nyh-global-links a:focus{color:#1768c5}.nyh-order-link{padding:10px 14px;border-radius:9px;background:#1768c5;color:#fff!important}.nyh-global-footer{background:#082b4c;color:#fff;padding:48px 0 28px;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}.nyh-footer-inner{width:min(1180px,calc(100% - 40px));margin:auto}.nyh-footer-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:28px}.nyh-global-footer h2{font-size:1rem;color:#fff;margin:0 0 13px}.nyh-global-footer a{display:block;color:#dbe9f5;text-decoration:none;margin:8px 0;line-height:1.35}.nyh-global-footer a:hover,.nyh-global-footer a:focus{color:#fff;text-decoration:underline}.nyh-footer-bottom{margin-top:32px;padding-top:22px;border-top:1px solid rgba(255,255,255,.18);display:flex;justify-content:space-between;gap:18px;flex-wrap:wrap;color:#c8d9e7;font-size:.91rem}.nyh-footer-bottom a{display:inline;margin:0;color:#fff}.nyh-directory{width:min(1180px,calc(100% - 40px));margin:0 auto;padding:58px 0 78px;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}.nyh-directory h1{color:#082b4c;font-size:clamp(2.4rem,5vw,4.2rem);line-height:1;margin:0 0 16px}.nyh-directory-intro{max-width:820px;color:#53677a;font-size:1.1rem}.nyh-directory-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;margin-top:34px}.nyh-directory-card{border:1px solid #d7e3ed;border-radius:18px;padding:24px;background:#fff}.nyh-directory-card h2{color:#082b4c;margin-top:0}.nyh-directory-card a{display:block;color:#1768c5;font-weight:800;text-decoration:none;padding:7px 0}.nyh-directory-card a:hover{text-decoration:underline}@media(max-width:900px){.nyh-footer-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:700px){.nyh-global-nav{align-items:flex-start;padding:16px 0;flex-direction:column}.nyh-global-links{gap:11px;font-size:.92rem}.nyh-directory-grid,.nyh-footer-grid{grid-template-columns:1fr}.nyh-global-nav,.nyh-footer-inner,.nyh-directory{width:min(100% - 24px,1180px)}}
</style>`;

function header(){return `<header class="nyh-global-header"><div class="nyh-global-nav"><a class="nyh-global-brand" href="/">NewYorkHUT.com</a><nav class="nyh-global-links" aria-label="Primary navigation"><a href="/learn">Learn</a><a href="/new-york-hut-guide">HUT Guide</a><a href="/tools">Tools</a><a href="/services">Services</a><a href="/ask-hut-ai">Ask HUT AI</a><a href="/site-map">All Pages</a><a href="${ORDER}" class="nyh-order-link">Order Permit</a></nav></div></header>`}

function footer(){return `<footer class="nyh-global-footer"><div class="nyh-footer-inner"><div class="nyh-footer-grid">${groups.map(g=>`<section><h2>${g.title}</h2>${g.links.map(x=>`<a href="${x[1]}">${x[0]}</a>`).join('')}</section>`).join('')}</div><div class="nyh-footer-bottom"><span>NewYorkHUT.com provides independent educational guidance for New York Highway Use Tax compliance.</span><span><a href="/site-map">View all public pages</a> · <a href="${PORTAL}">MY NYHUT</a></span></div></div></footer>`}

function decorate(html){
  if(!html||!/<html[\s>]/i.test(html))return html;
  let out=html;
  if(!out.includes('nyh-universal-nav-css'))out=out.replace(/<\/head>/i,GLOBAL_CSS+'</head>');
  if(/<header class="top">[\s\S]*?<\/header>/i.test(out))out=out.replace(/<header class="top">[\s\S]*?<\/header>/i,header());
  else if(!out.includes('nyh-global-header'))out=out.replace(/<body([^>]*)>/i,`<body$1>${header()}`);
  if(!out.includes('nyh-global-footer'))out=out.replace(/<\/body>/i,footer()+'</body>');
  return out;
}

function htmlResponse(html,status=200,headers={}){const h=new Headers(headers);h.set('content-type','text/html; charset=utf-8');h.set('cache-control','no-store, no-cache, must-revalidate, max-age=0');h.set('x-newyorkhut-version',VERSION);return new Response(decorate(html),{status,headers:h})}

function directoryPage(){const cards=groups.map(g=>`<section class="nyh-directory-card"><h2>${g.title}</h2>${g.links.map(x=>`<a href="${x[1]}">${x[0]} →</a>`).join('')}</section>`).join('');return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>All New York HUT Resources | NewYorkHUT.com</title><meta name="description" content="Browse all public NewYorkHUT.com guides, compliance tools, permit services, and interactive resources."><link rel="canonical" href="https://newyorkhut.com/site-map"></head><body>${header()}<main class="nyh-directory"><div>Resource directory</div><h1>All New York HUT resources.</h1><p class="nyh-directory-intro">Every customer-facing guide, tool, and permit-service page is available here. Nothing intended for public use should be hidden or dependent on knowing a direct URL.</p><div class="nyh-directory-grid">${cards}</div></main>${footer()}</body></html>`}

function sitemap(){const lastmod='2026-07-21';return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${publicPaths.map(p=>`\n  <url><loc>https://newyorkhut.com${p}</loc><lastmod>${lastmod}</lastmod></url>`).join('')}\n</urlset>`}

export default{
  async fetch(request,env,ctx){
    const url=new URL(request.url),path=url.pathname.replace(/\/+$/,'')||'/';
    if(path==='/site-map'||path==='/all-pages')return htmlResponse(directoryPage());
    if(path==='/sitemap.xml')return new Response(sitemap(),{headers:{'content-type':'application/xml; charset=utf-8','cache-control':'public, max-age=3600','x-newyorkhut-version':VERSION}});
    if(path==='/api/version'||path==='/__version')return new Response(JSON.stringify({application:'NewYorkHUT.com',version:VERSION,deployedAt:'2026-07-21',features:['universal-public-navigation','complete-public-page-directory','global-resource-footer','public-xml-sitemap','legacy-page-navigation-injection'],publicPageCount:publicPaths.length},null,2),{headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store','x-newyorkhut-version':VERSION}});
    const r=await site.fetch(request,env,ctx),h=new Headers(r.headers);h.set('x-newyorkhut-version',VERSION);
    const type=h.get('content-type')||'';
    if(type.includes('text/html'))return htmlResponse(await r.text(),r.status,h);
    return new Response(r.body,{status:r.status,statusText:r.statusText,headers:h});
  }
};
