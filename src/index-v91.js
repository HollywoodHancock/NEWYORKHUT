import site from './index-v89.js';

const VERSION='v91';
const FEATURE='repair-sitemap-failures-v91';
const ORIGIN='https://newyorkhut.com';
const ORDER='https://www.nyhut.com/';

const ARTICLES={
  '/learn/buying-a-truck-and-new-york-hut':{
    title:'Buying a Truck and New York HUT',
    description:'Learn the New York HUT steps for buying a truck, obtaining tax clearance, registering the vehicle, and avoiding transferred credential problems.',
    intro:'A New York HUT certificate and decal do not transfer with a truck. The buyer must confirm the seller’s tax-clearance obligations and obtain a new credential under the buyer’s own HUT account before taxable operation.',
    sections:[
      ['Before completing the purchase','Verify the VIN, ownership documents, registered weight, plate information, and whether New York tax clearance is required. Do not rely on the seller’s HUT certificate or decal as authority for the buyer.'],
      ['Register the vehicle correctly','Add the truck to the buyer’s own HUT account using the exact VIN, plate, vehicle type, fuel type, and registered gross weight. Confirm the issued certificate and decal match the vehicle before operation.'],
      ['Keep the transaction file','Retain the bill of sale, title work, tax-clearance documentation, registration records, and the date the vehicle entered service. These records help establish responsibility for mileage before and after the sale.']
    ]
  },
  '/learn/replacing-a-truck-and-new-york-hut':{
    title:'Replacing a Truck and New York HUT',
    description:'Understand how to remove an old truck, register its replacement, handle HUT credentials, and preserve mileage records during a vehicle change.',
    intro:'Replacing a truck requires two separate HUT actions: properly ending the old vehicle’s credential record and registering the replacement vehicle with its own certificate and decal.',
    sections:[
      ['Close out the old vehicle','Record the final in-service date and final New York mileage, remove the old decal as required, and update or cancel the vehicle record through the appropriate HUT process.'],
      ['Add the replacement truck','Register the replacement using its own VIN, plate, ownership, fuel, vehicle type, and registered weight. Never move the old truck’s certificate or decal to the replacement.'],
      ['Preserve a clean audit trail','Keep purchase, sale, trade, title, registration, credential, and mileage records for both vehicles so each quarter can be reconciled accurately.']
    ]
  },
  '/learn/adding-a-vehicle-to-new-york-hut':{
    title:'Adding a Vehicle to New York HUT',
    description:'Follow the correct process to add a truck to a New York HUT account, verify vehicle data, receive credentials, and begin compliant operation.',
    intro:'Each qualifying vehicle must be added to the carrier’s HUT account with accurate vehicle-specific information before it operates on New York public highways.',
    sections:[
      ['Gather exact vehicle information','Use the VIN, plate number and jurisdiction, ownership status, vehicle type, fuel type, and registered gross weight shown in the carrier’s current records.'],
      ['Submit the vehicle addition','Add the vehicle through the carrier’s authorized HUT workflow. Confirm that the legal entity and account information match the existing HUT account.'],
      ['Verify the issued credential','Check the certificate and decal against the VIN, plate, and weight before dispatch. Retain the effective date and include the vehicle in mileage and filing records.']
    ]
  },
  '/learn/removing-a-vehicle-from-new-york-hut':{
    title:'Removing a Vehicle from New York HUT',
    description:'Learn how to remove a sold, retired, or transferred truck from a New York HUT account and document final mileage and credential disposition.',
    intro:'A vehicle should be removed promptly when it is sold, retired, transferred, destroyed, or no longer operated by the carrier. The final mileage and credential disposition must remain documented.',
    sections:[
      ['Establish the removal date','Record the last date the vehicle operated for the carrier and capture final New York taxable and toll-paid mileage for the applicable filing period.'],
      ['Update the HUT account','Cancel or remove the vehicle through the authorized HUT process and handle the certificate and decal as required. Do not leave an inactive vehicle appearing available for operation.'],
      ['Retain supporting records','Keep the sale, trade, title transfer, disposal, lease termination, or retirement documents with the final mileage and account-update confirmation.']
    ]
  },
  '/learn/changing-gvw-on-a-new-york-hut-vehicle':{
    title:'Changing GVW on a New York HUT Vehicle',
    description:'Learn when a registered gross weight change requires a New York HUT credential update and how the new weight can affect HUT tax rates.',
    intro:'The registered gross weight shown on a HUT vehicle record affects the applicable rate treatment. A weight change should be reflected in the HUT record and credential before the vehicle is operated at the new weight.',
    sections:[
      ['Confirm the new registered weight','Use the official registration or cab-card weight and verify that the change is effective for the correct vehicle and date.'],
      ['Update the HUT vehicle record','Submit the weight change through the authorized HUT process and obtain any updated certificate or credential required for the vehicle.'],
      ['Apply the correct rate','Use the applicable HUT rate for the updated weight and effective period. Preserve the prior and new registration documents to support the change during an audit.']
    ]
  },
  '/learn/lost-hut-certificate':{
    title:'Lost New York HUT Certificate',
    description:'Learn what to do when a New York HUT certificate is lost, damaged, or unavailable and how to request a valid replacement credential.',
    intro:'A lost or damaged HUT certificate should be replaced through the official account or replacement process. An unofficial copy or another vehicle’s certificate is not a valid substitute.',
    sections:[
      ['Verify the vehicle record','Confirm the carrier name, HUT account, VIN, plate, and registered weight before requesting a replacement.'],
      ['Request a replacement certificate','Use the authorized replacement process and retain the confirmation. Do not alter, recreate, or transfer a certificate from another vehicle.'],
      ['Confirm before dispatch','Verify that the replacement credential matches the vehicle and that any related decal remains valid and properly assigned.']
    ]
  },
  '/learn/lost-or-damaged-hut-decal':{
    title:'Lost or Damaged New York HUT Decal',
    description:'Learn how to replace a lost, stolen, unreadable, or damaged New York HUT decal and document the replacement for the correct vehicle.',
    intro:'A HUT decal is vehicle-specific and should remain legible and properly assigned. A missing or damaged decal requires the authorized replacement process rather than reuse of another vehicle’s decal.',
    sections:[
      ['Document the problem','Record whether the decal was lost, stolen, destroyed, damaged, or unreadable and confirm the vehicle’s VIN, plate, and HUT certificate information.'],
      ['Request the correct replacement','Use the official replacement process for the exact vehicle. Do not move a decal from another truck or create an unofficial substitute.'],
      ['Update the vehicle file','Retain the replacement request, issuance confirmation, and installation date with the vehicle’s HUT records.']
    ]
  }
};

const CSS=`<style>
:root{--n:#082b4c;--b:#176dcc;--l:#d7e3ed;--m:#526a80;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}*{box-sizing:border-box}html,body{margin:0;max-width:100%;overflow-x:hidden;color:#14283d;line-height:1.55}.w{width:min(1120px,calc(100% - 36px));margin:auto}.top{background:#fff;border-bottom:1px solid var(--l)}.nav{min-height:76px;display:flex;align-items:center;justify-content:space-between;gap:18px}.brand{font-size:1.35rem;font-weight:950;color:var(--n);text-decoration:none}.links{display:flex;gap:7px;flex-wrap:wrap;justify-content:flex-end}.links a{padding:9px 11px;border:1px solid #bfd0de;border-radius:9px;color:var(--n);text-decoration:none;font-weight:800}.links .order{background:var(--b);border-color:var(--b);color:#fff}.banner{height:clamp(210px,18vw,340px);overflow:hidden;background:#072b4d}.banner img{display:block;width:100%;height:100%;object-fit:cover;object-position:center 52%}.crumbs{padding:10px 0;font-size:.9rem}.crumbs a{color:var(--b);font-weight:800;text-decoration:none}.hero{padding:24px 0 28px;background:linear-gradient(135deg,#fbfdff,#edf6fc)}.eyebrow{font-size:.78rem;text-transform:uppercase;letter-spacing:.1em;color:var(--b);font-weight:950}h1{font-size:clamp(2.2rem,5vw,3.8rem);line-height:1.04;letter-spacing:-.04em;color:var(--n);margin:8px 0 13px}.lead{max-width:880px;font-size:1.08rem;color:#435d75}.section{padding:28px 0 38px}.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}.card{min-width:0;border:1px solid var(--l);border-radius:15px;padding:17px;background:#fff;box-shadow:0 7px 24px rgba(8,43,76,.05)}.card h2{font-size:1.22rem;line-height:1.22;color:var(--n);margin:0 0 8px}.card p{color:var(--m);margin:.4em 0}.actions{display:flex;gap:9px;flex-wrap:wrap;margin-top:18px}.btn{display:inline-flex;padding:10px 14px;border-radius:9px;background:var(--b);color:#fff;text-decoration:none;font-weight:900}.btn.secondary{background:#fff;color:var(--b);border:1px solid var(--b)}@media(max-width:900px){.nav{display:block;padding:12px 0}.brand{display:block;margin-bottom:9px}.links{justify-content:flex-start;overflow-x:auto;flex-wrap:nowrap}.grid{grid-template-columns:1fr}.banner{height:220px}}@media(max-width:700px){.w{width:min(100% - 24px,1120px)}.banner{height:170px}.hero{padding:18px 0 22px}.section{padding:22px 0 28px}}
</style>`;

function nav(){return `<header class="top"><div class="w nav"><a class="brand" href="/">NewYorkHUT.com</a><nav class="links" aria-label="Primary navigation"><a href="/learn">Learn</a><a href="/new-york-hut-guide">HUT Guide</a><a href="/tools">Tools</a><a href="/services">Services</a><a href="/ask-hut-ai">Ask HUT AI</a><a href="/site-map">All Pages</a><a class="order" href="${ORDER}">Order Permit</a></nav></div></header>`}
function articlePage(path,data){
  const canonical=`${ORIGIN}${path}`;
  const cards=data.sections.map(([h,p])=>`<section class="card"><h2>${h}</h2><p>${p}</p></section>`).join('');
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${data.title} | New York HUT Guide</title><meta name="description" content="${data.description}"><link rel="canonical" href="${canonical}"><meta property="og:title" content="${data.title} | New York HUT Guide"><meta property="og:url" content="${canonical}"><meta property="og:type" content="article">${CSS}</head><body>${nav()}<div class="banner"><img src="/newyorkhut-header-banner.png?v=20260802-05" alt="NewYorkHUT.com New York Highway Use Tax guides, tools, and compliance help" width="2048" height="682"></div><div class="w crumbs"><a href="/">Home</a> › <a href="/learn">Learn</a> › ${data.title}</div><main><section class="hero"><div class="w"><div class="eyebrow">New York HUT vehicle guidance</div><h1>${data.title}</h1><p class="lead">${data.intro}</p><div class="actions"><a class="btn" href="${ORDER}">Open NYHUT →</a><a class="btn secondary" href="/ask-hut-ai">Ask HUT AI →</a></div></div></section><section class="section"><div class="w grid">${cards}</div></section></main></body></html>`;
}

function replaceDescription(html,description){
  const escaped=description.replace(/&/g,'&amp;').replace(/"/g,'&quot;');
  const tag=`<meta name="description" content="${escaped}">`;
  return /<meta\b[^>]*name=(?:"description"|'description')[^>]*>/i.test(html)?html.replace(/<meta\b[^>]*name=(?:"description"|'description')[^>]*>/i,tag):html.replace('</head>',`${tag}</head>`);
}
function decodeXml(v=''){return v.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;/g,"'")}
function normalizeUrl(value){try{const u=new URL(decodeXml(value),ORIGIN);if(!['newyorkhut.com','www.newyorkhut.com'].includes(u.hostname))return null;const p=u.pathname.replace(/\/{2,}/g,'/').replace(/\/+$/,'')||'/';return `${ORIGIN}${p}`}catch{return null}}
function extractUrls(xml){const out=[],seen=new Set(),re=/<loc>\s*([\s\S]*?)\s*<\/loc>/gi;let m;while((m=re.exec(xml))){const u=normalizeUrl(m[1]);if(u&&!seen.has(u)){seen.add(u);out.push(u)}}return out}
function sitemapXml(urls){return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u=>`  <url><loc>${u}</loc></url>`).join('\n')}\n</urlset>`}
function txt(html,re){const m=html.match(re);return m?m[1].replace(/<[^>]+>/g,' ').replace(/&nbsp;/gi,' ').replace(/&amp;/gi,'&').replace(/\s+/g,' ').trim():''}
function attribute(html,re){const m=html.match(re);return m?(m[1]||m[2]||''):''}
async function serve(request,env,ctx){
  const path=new URL(request.url).pathname.replace(/\/+$/,'')||'/';
  if(ARTICLES[path])return new Response(articlePage(path,ARTICLES[path]),{headers:{'content-type':'text/html; charset=utf-8','cache-control':'no-store','x-newyorkhut-version':VERSION}});
  const response=await site.fetch(request,env,ctx);
  if(path==='/learn/selling-or-transferring-a-new-york-hut-permitted-truck'&&(response.headers.get('content-type')||'').includes('text/html')){
    const html=replaceDescription(await response.text(),'Learn the New York HUT steps for selling or transferring a permitted truck, including final mileage, credential cancellation, tax clearance, and buyer responsibilities.');
    return new Response(html,{status:response.status,statusText:response.statusText,headers:response.headers});
  }
  return response;
}
async function currentSitemap(request,env,ctx){const r=await site.fetch(new Request(new URL('/sitemap.xml',request.url),{headers:request.headers}),env,ctx);const xml=await r.text();return{r,urls:extractUrls(xml)}}
async function auditPage(target,request,env,ctx){try{const r=await serve(new Request(target,{headers:request.headers}),env,ctx);const type=r.headers.get('content-type')||'';const html=type.includes('text/html')?await r.text():'';const title=txt(html,/<title\b[^>]*>([\s\S]*?)<\/title>/i);const desc=attribute(html,/<meta\b[^>]*name=(?:"description"|'description')[^>]*content=(?:"([^"]*)"|'([^']*)')[^>]*>/i)||attribute(html,/<meta\b[^>]*content=(?:"([^"]*)"|'([^']*)')[^>]*name=(?:"description"|'description')[^>]*>/i);const canonical=attribute(html,/<link\b[^>]*rel=(?:"canonical"|'canonical')[^>]*href=(?:"([^"]+)"|'([^']+)')[^>]*>/i)||attribute(html,/<link\b[^>]*href=(?:"([^"]+)"|'([^']+)')[^>]*rel=(?:"canonical"|'canonical')[^>]*>/i);const h1=txt(html,/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);const h1Count=(html.match(/<h1\b/gi)||[]).length;const viewport=/<meta\b[^>]*name=(?:"viewport"|'viewport')/i.test(html);const expected=normalizeUrl(target);const issues=[];if(r.status!==200)issues.push(`status:${r.status}`);if(!type.includes('text/html'))issues.push('not-html');if(!title)issues.push('missing-title');if(title.length>65)issues.push('title-too-long');if(!desc)issues.push('missing-description');if(desc&&(desc.length<70||desc.length>170))issues.push('description-length');if(h1Count!==1)issues.push(`h1-count:${h1Count}`);if(!canonical)issues.push('missing-canonical');if(canonical&&normalizeUrl(canonical)!==expected)issues.push('canonical-mismatch');if(!viewport)issues.push('missing-viewport');return{url:target,status:r.status,contentType:type,title,titleLength:title.length,descriptionLength:desc.length,canonical,h1,h1Count,viewport,issues}}catch(e){return{url:target,status:0,issues:['worker-exception'],error:String(e?.message||e)}}}
async function audit(request,env,ctx){const{urls}=await currentSitemap(request,env,ctx);const limit=Math.min(Math.max(Number(new URL(request.url).searchParams.get('limit'))||urls.length,1),300);const selected=urls.slice(0,limit),pages=[];for(let i=0;i<selected.length;i+=8)pages.push(...await Promise.all(selected.slice(i,i+8).map(u=>auditPage(u,request,env,ctx))));const dt={},dc={};for(const p of pages){if(p.title)(dt[p.title]||=[]).push(p.url);if(p.canonical)(dc[p.canonical]||=[]).push(p.url)}const failed=pages.filter(p=>p.issues?.length);return new Response(JSON.stringify({application:'NewYorkHUT.com',version:VERSION,feature:FEATURE,sitemapUrlCount:urls.length,auditedCount:pages.length,passedCount:pages.length-failed.length,failedCount:failed.length,duplicateTitles:Object.fromEntries(Object.entries(dt).filter(([,v])=>v.length>1)),duplicateCanonicals:Object.fromEntries(Object.entries(dc).filter(([,v])=>v.length>1)),pages},null,2),{headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store'}})}

export default{async fetch(request,env,ctx){const path=new URL(request.url).pathname.replace(/\/+$/,'')||'/';if(path==='/__seo_audit')return audit(request,env,ctx);if(path==='/sitemap.xml'){const{r,urls}=await currentSitemap(request,env,ctx);if(!urls.length)return r;return new Response(sitemapXml(urls),{headers:{'content-type':'application/xml; charset=utf-8','cache-control':'public, max-age=3600','x-newyorkhut-version':VERSION,'x-sitemap-url-count':String(urls.length)}})}const response=await serve(request,env,ctx);const headers=new Headers(response.headers);headers.set('x-newyorkhut-version',VERSION);headers.set('x-newyorkhut-feature',FEATURE);return new Response(response.body,{status:response.status,statusText:response.statusText,headers})}};
