import site from './index-v43.js';
import {HUT_KNOWLEDGE_BASE,searchKnowledge} from './hut-knowledge-base-v2.js';

const VERSION='v44';
const ORDER='https://nyhut.com/';
const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const json=(data,status=200)=>new Response(JSON.stringify(data,null,2),{status,headers:{'content-type':'application/json; charset=UTF-8','cache-control':'no-store'}});

const STATIC=[
 {type:'Tool',title:'Truck VIN Decoder',description:'Decode vehicle information and review preliminary compliance guidance.',href:'/tools/vin-decoder',keywords:'vin truck vehicle decoder'},
 {type:'Tool',title:'Fleet Compliance Dashboard',description:'Assess fleet readiness and identify missing compliance controls.',href:'/tools/fleet-compliance',keywords:'fleet compliance dashboard audit'},
 {type:'Tool',title:'Compliance Calendar',description:'Build HUT, IFTA, IRP, UCR, and fleet filing dates.',href:'/tools/compliance-calendar',keywords:'calendar due dates filing mt-903'},
 {type:'Tool',title:'Compliance Assistant',description:'Ask a HUT question or run a guided requirement check.',href:'/tools/compliance-assistant',keywords:'assistant question eligibility requirement'},
 {type:'Resource',title:'Fleet Compliance Toolkit',description:'Download fleet inventory, mileage, fuel, and audit templates.',href:'/fleet-toolkit',keywords:'download template mileage fuel audit'},
 {type:'Resource',title:'Official New York Resources',description:'Open New York Tax Department forms, bulletins, and filing resources.',href:'/official-resources',keywords:'official forms tax department bulletin'},
 {type:'Resource',title:'HUT FAQ Library',description:'Browse detailed answers to common New York HUT questions.',href:'/new-york-hut',keywords:'faq answers hut knowledge'}
];

const HUBS={
 permits:{title:'New York HUT Permits and Credentials',description:'Understand regular HUT credentials, temporary trip certificates, costs, timing, and permit selection.',slugs:['do-i-need-new-york-hut','do-out-of-state-trucks-need-hut','how-much-does-a-new-york-hut-permit-cost','how-long-is-a-new-york-hut-permit-valid','what-is-a-new-york-hut-trip-certificate','how-many-new-york-hut-trip-permits-can-i-get','how-fast-can-i-get-a-new-york-hut-credential','how-do-i-open-a-new-york-hut-account']},
 'filing-and-taxes':{title:'New York HUT Filing and Taxes',description:'Review MT-903 deadlines, zero-mile returns, mileage records, Thruway treatment, and account closure.',slugs:['when-is-form-mt-903-due','do-i-file-hut-if-i-had-no-new-york-miles','how-do-i-close-a-new-york-hut-account','what-records-must-i-keep-for-new-york-hut','is-new-york-thruway-mileage-subject-to-hut','new-york-hut-vs-ifta']},
 'vehicles-and-decals':{title:'HUT Vehicles, Decals, and Fleet Changes',description:'Manage vehicle additions, removals, decals, plate changes, leased trucks, and fleet credential updates.',slugs:['how-do-i-add-a-vehicle-to-my-hut-account','how-do-i-remove-or-cancel-a-hut-vehicle','what-if-my-hut-decal-is-lost-or-damaged','how-do-i-change-a-license-plate-on-a-hut-credential','who-needs-hut-on-a-leased-truck','new-york-hut-weight-threshold']},
 exemptions:{title:'New York HUT Exemptions and Eligibility',description:'Evaluate weight thresholds, exempt vehicles, out-of-state operation, leased vehicles, and special-use situations.',slugs:['do-i-need-new-york-hut','new-york-hut-weight-threshold','do-out-of-state-trucks-need-hut','what-vehicles-are-exempt-from-new-york-hut','who-needs-hut-on-a-leased-truck','can-an-automotive-fuel-carrier-use-a-hut-trip-certificate']},
 enforcement:{title:'New York HUT Enforcement and Account Status',description:'Understand penalties, credential restrictions, tax clearances, filing failures, and corrective next steps.',slugs:['what-happens-if-i-do-not-file-or-pay-hut','how-do-i-close-a-new-york-hut-account','do-i-file-hut-if-i-had-no-new-york-miles','when-is-form-mt-903-due']}
};

const CSS=`:root{--n:#082b4c;--b:#1768c5;--l:#dbe5ef;--m:#5b6b7e;--bg:#f5f9fc;font-family:Inter,system-ui,sans-serif}*{box-sizing:border-box}body{margin:0;color:#122033;line-height:1.58}.w{width:min(1180px,calc(100% - 40px));margin:auto}.hero{padding:58px 0 44px;background:linear-gradient(#f9fcff,#edf5fb)}h1{font-size:clamp(2.4rem,5vw,4.4rem);line-height:1;letter-spacing:-.045em;color:var(--n);margin:10px 0 18px}h2,h3{color:var(--n)}.lead{font-size:1.14rem;color:#4e6074;max-width:900px}.section{padding:46px 0 70px}.panel,.card{border:1px solid var(--l);border-radius:18px;background:#fff;padding:24px;box-shadow:0 8px 30px rgba(8,43,76,.05)}.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}.card a{color:var(--b);font-weight:850;text-decoration:none}.category{font-size:.76rem;text-transform:uppercase;letter-spacing:.08em;font-weight:900;color:var(--b)}.searchbar{display:grid;grid-template-columns:1fr auto;gap:10px}.searchbar input,select,input,textarea{width:100%;padding:14px;border:1px solid #b9c9d8;border-radius:11px;font:inherit}.btn{display:inline-flex;align-items:center;justify-content:center;background:var(--b);color:#fff;padding:13px 18px;border-radius:10px;text-decoration:none;font-weight:850;border:0;cursor:pointer}.filters{display:flex;gap:8px;flex-wrap:wrap;margin:18px 0}.filter{border:1px solid var(--l);background:#fff;padding:8px 12px;border-radius:999px;cursor:pointer;font-weight:750}.filter.active{background:var(--n);color:#fff}.result{display:block;border:1px solid var(--l);border-radius:14px;padding:18px;margin-top:12px;text-decoration:none;color:inherit}.result:hover{border-color:var(--b)}mark{background:#fff1a8}.crumbs{font-size:.9rem;margin-bottom:18px}.crumbs a{color:var(--b)}.cta{margin-top:34px;background:var(--n);color:#fff;border-radius:18px;padding:26px}.cta h2{color:#fff}.formgrid{display:grid;grid-template-columns:1fr 1fr;gap:15px}.full{grid-column:1/-1}.notice{padding:14px;border-radius:11px;background:var(--bg);margin-top:14px}.hubnav{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-top:24px}.hubnav a{padding:12px;border:1px solid var(--l);border-radius:12px;text-decoration:none;color:var(--n);font-weight:800;background:#fff}@media(max-width:900px){.grid{grid-template-columns:1fr 1fr}.hubnav{grid-template-columns:1fr 1fr}}@media(max-width:620px){.w{width:min(100% - 24px,1180px)}.grid,.formgrid{grid-template-columns:1fr}.full{grid-column:auto}.searchbar{grid-template-columns:1fr}.hubnav{grid-template-columns:1fr}}`;

function page(title,description,path,body,schema=''){
 return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="https://newyorkhut.com${path}"><style>${CSS}</style>${schema}</head><body>${body}</body></html>`;
}

function searchPage(){
 const body=`<main><section class="hero"><div class="w"><div class="category">Authority search</div><h1>Search New York HUT Guidance</h1><p class="lead">Search HUT answers, compliance tools, official resources, and permit guidance from one place.</p><div class="searchbar"><input id="q" autocomplete="off" placeholder="Try: trip permit, MT-903, lost decal, exemptions"><button class="btn" id="go">Search</button></div><div class="filters" id="filters"><button class="filter active" data-type="All">All</button><button class="filter" data-type="FAQ">FAQ</button><button class="filter" data-type="Tool">Tools</button><button class="filter" data-type="Resource">Resources</button></div></div></section><section class="section"><div class="w"><div id="summary"></div><div id="results"></div><div id="empty" class="panel" hidden><h2>No exact match found</h2><p>Try fewer words, browse the FAQ library, or ask the Compliance Assistant.</p><a class="btn" href="/tools/compliance-assistant">Ask Compliance Assistant</a></div></div></section></main><script>
let type='All';const q=document.getElementById('q'),results=document.getElementById('results'),empty=document.getElementById('empty'),summary=document.getElementById('summary');
const e=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const hi=(text,term)=>{let s=e(text);for(const w of term.trim().split(/\\s+/).filter(x=>x.length>1)){s=s.replace(new RegExp('('+w.replace(/[.*+?^${}()|[\\]\\\\]/g,'\\\\$&')+')','ig'),'<mark>$1</mark>')}return s};
async function run(){const term=q.value.trim();const d=await(await fetch('/api/site-search?q='+encodeURIComponent(term)+'&type='+encodeURIComponent(type))).json();results.innerHTML='';summary.textContent=d.results.length?d.results.length+' result'+(d.results.length===1?'':'s')+' found':'';empty.hidden=d.results.length>0;for(const r of d.results){const a=document.createElement('a');a.className='result';a.href=r.href;a.innerHTML='<div class="category">'+e(r.type)+'</div><h2>'+hi(r.title,term)+'</h2><p>'+hi(r.description,term)+'</p>';results.appendChild(a)}}
q.addEventListener('input',()=>{clearTimeout(window._s);window._s=setTimeout(run,180)});document.getElementById('go').onclick=run;document.getElementById('filters').onclick=x=>{const b=x.target.closest('.filter');if(!b)return;document.querySelectorAll('.filter').forEach(y=>y.classList.remove('active'));b.classList.add('active');type=b.dataset.type;run()};run();
</script>`;
 return page('Search New York HUT Guidance','Search New York HUT FAQs, compliance tools, official resources, and permit guidance.','/search',body);
}

function hubsIndex(){
 const cards=Object.entries(HUBS).map(([slug,h])=>`<article class="card"><div class="category">Topic hub</div><h2>${esc(h.title)}</h2><p>${esc(h.description)}</p><a href="/new-york-hut/${slug}">Explore topic →</a></article>`).join('');
 return page('New York HUT Topic Guides','Explore grouped New York HUT permit, filing, vehicle, exemption, and enforcement guidance.','/new-york-hut/topics',`<main><section class="hero"><div class="w"><div class="category">HUT topic guides</div><h1>Explore New York HUT by Topic</h1><p class="lead">Use these authority hubs to move from a broad question to the exact guidance, official source, or permit action you need.</p></div></section><section class="section"><div class="w"><div class="grid">${cards}</div></div></section></main>`);
}

function hubPage(slug,h){
 const items=h.slugs.map(s=>HUT_KNOWLEDGE_BASE.find(x=>x.slug===s)).filter(Boolean);
 const cards=items.map(x=>`<article class="card"><div class="category">${esc(x.category)}</div><h2>${esc(x.title)}</h2><p>${esc(x.shortAnswer)}</p><a href="/new-york-hut/${esc(x.slug)}">Read full answer →</a></article>`).join('');
 const schema=`<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:'https://newyorkhut.com/'},{'@type':'ListItem',position:2,name:'HUT FAQ Library',item:'https://newyorkhut.com/new-york-hut'},{'@type':'ListItem',position:3,name:h.title,item:'https://newyorkhut.com/new-york-hut/'+slug}]})}</script>`;
 return page(h.title,h.description,'/new-york-hut/'+slug,`<main><section class="hero"><div class="w"><div class="crumbs"><a href="/">Home</a> / <a href="/new-york-hut">HUT FAQ Library</a> / ${esc(h.title)}</div><div class="category">Authority topic hub</div><h1>${esc(h.title)}</h1><p class="lead">${esc(h.description)}</p><div class="hubnav">${Object.entries(HUBS).map(([s,x])=>`<a href="/new-york-hut/${s}">${esc(x.title.replace('New York HUT ','').replace('HUT ',''))}</a>`).join('')}</div></div></section><section class="section"><div class="w"><div class="grid">${cards}</div><div class="cta"><h2>Ready to obtain or update a HUT credential?</h2><p>Continue to NYHUT.com for permit ordering and account assistance.</p><a class="btn" href="${ORDER}" data-track="start-permit" data-source="${esc(slug)}">Start Permit</a></div></div></section></main>`,schema);
}

function leadPage(){
 const body=`<main><section class="hero"><div class="w"><div class="category">Carrier assistance</div><h1>Need Help Determining What You Need?</h1><p class="lead">Send us the carrier and vehicle details you have. We will use them to identify the likely HUT credential or next compliance step.</p></div></section><section class="section"><div class="w"><form id="lead" class="panel"><div class="formgrid"><div><label>Name<input required name="name"></label></div><div><label>Company<input name="company"></label></div><div><label>Email<input required type="email" name="email"></label></div><div><label>Phone<input name="phone"></label></div><div><label>USDOT number<input name="usdot" inputmode="numeric"></label></div><div><label>How can we help?<select name="interest"><option>Determine HUT requirement</option><option>New HUT account</option><option>Add or update vehicle</option><option>Trip certificate</option><option>Filing or account issue</option></select></label></div><div class="full"><label>Question or details<textarea required name="question" rows="6"></textarea></label></div></div><input type="hidden" name="source_page"><input type="hidden" name="referrer"><button class="btn">Request Assistance</button><div id="notice" class="notice" hidden></div></form></div></section></main><script>
const f=document.getElementById('lead'),n=document.getElementById('notice');f.source_page.value=location.pathname;f.referrer.value=document.referrer;
f.onsubmit=async e=>{e.preventDefault();n.hidden=false;n.textContent='Submitting…';const payload=Object.fromEntries(new FormData(f));const r=await fetch('/api/leads',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(payload)});const d=await r.json();n.textContent=r.ok?'Thank you. Your request has been received.':(d.error||'Unable to submit right now. Please try again.');if(r.ok)f.reset()};
</script>`;
 return page('New York HUT Help Request','Request help determining the correct New York HUT credential or compliance step.','/contact',body);
}

function doSearch(url){
 const q=(url.searchParams.get('q')||'').trim().toLowerCase(),type=url.searchParams.get('type')||'All';
 let rows=HUT_KNOWLEDGE_BASE.map(x=>({type:'FAQ',title:x.title,description:x.shortAnswer,href:'/new-york-hut/'+x.slug,hay:[x.title,x.shortAnswer,x.detail,x.category,...(x.keywords||[])].join(' ').toLowerCase()})).concat(STATIC.map(x=>({...x,hay:[x.title,x.description,x.keywords].join(' ').toLowerCase()})));
 if(type!=='All')rows=rows.filter(x=>x.type===type);
 if(q){const words=q.split(/\s+/).filter(Boolean);rows=rows.map(x=>({...x,score:words.reduce((s,w)=>s+(x.title.toLowerCase().includes(w)?8:0)+(x.hay.includes(w)?2:0),0)})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score)}else rows=rows.map(x=>({...x,score:0}));
 return rows.slice(0,30).map(({hay,keywords,...x})=>x);
}

async function saveLead(request,env){
 let data;try{data=await request.json()}catch{return json({error:'Invalid request body.'},400)}
 const clean={name:String(data.name||'').trim().slice(0,120),company:String(data.company||'').trim().slice(0,160),email:String(data.email||'').trim().slice(0,200),phone:String(data.phone||'').trim().slice(0,80),usdot:String(data.usdot||'').replace(/\D/g,'').slice(0,12),interest:String(data.interest||'').trim().slice(0,120),question:String(data.question||'').trim().slice(0,4000),source_page:String(data.source_page||'').slice(0,300),referrer:String(data.referrer||'').slice(0,500),created_at:new Date().toISOString()};
 if(!clean.name||!clean.email||!clean.question)return json({error:'Name, email, and question are required.'},400);
 if(!/^\S+@\S+\.\S+$/.test(clean.email))return json({error:'Enter a valid email address.'},400);
 let stored=false,emailed=false,errors=[];
 if(env.SUPABASE_URL&&env.SUPABASE_SERVICE_ROLE_KEY){try{const r=await fetch(env.SUPABASE_URL.replace(/\/$/,'')+'/rest/v1/newyorkhut_leads',{method:'POST',headers:{apikey:env.SUPABASE_SERVICE_ROLE_KEY,authorization:'Bearer '+env.SUPABASE_SERVICE_ROLE_KEY,'content-type':'application/json',prefer:'return=minimal'},body:JSON.stringify(clean)});stored=r.ok;if(!r.ok)errors.push('storage '+r.status)}catch(e){errors.push('storage unavailable')}}
 if(env.RESEND_API_KEY&&env.LEAD_NOTIFY_EMAIL){try{const r=await fetch('https://api.resend.com/emails',{method:'POST',headers:{authorization:'Bearer '+env.RESEND_API_KEY,'content-type':'application/json'},body:JSON.stringify({from:env.LEAD_FROM_EMAIL||'NewYorkHUT.com <noreply@newyorkhut.com>',to:[env.LEAD_NOTIFY_EMAIL],reply_to:clean.email,subject:'New NewYorkHUT.com assistance request',text:`Name: ${clean.name}\nCompany: ${clean.company}\nEmail: ${clean.email}\nPhone: ${clean.phone}\nUSDOT: ${clean.usdot}\nInterest: ${clean.interest}\nSource: ${clean.source_page}\nReferrer: ${clean.referrer}\n\n${clean.question}`})});emailed=r.ok;if(!r.ok)errors.push('email '+r.status)}catch(e){errors.push('email unavailable')}}
 if(!stored&&!emailed)return json({error:'Lead delivery is not configured yet.',configuration:['SUPABASE_URL','SUPABASE_SERVICE_ROLE_KEY','RESEND_API_KEY','LEAD_NOTIFY_EMAIL'],details:errors},503);
 return json({ok:true,stored,emailed});
}

async function track(request,env){
 let d={};try{d=await request.json()}catch{}
 const event={event:String(d.event||'unknown').slice(0,80),source:String(d.source||'').slice(0,300),path:String(d.path||'').slice(0,300),created_at:new Date().toISOString()};
 if(env.SUPABASE_URL&&env.SUPABASE_SERVICE_ROLE_KEY)fetch(env.SUPABASE_URL.replace(/\/$/,'')+'/rest/v1/newyorkhut_events',{method:'POST',headers:{apikey:env.SUPABASE_SERVICE_ROLE_KEY,authorization:'Bearer '+env.SUPABASE_SERVICE_ROLE_KEY,'content-type':'application/json',prefer:'return=minimal'},body:JSON.stringify(event)}).catch(()=>{});
 return json({ok:true});
}

function injectTracking(html){
 const script=`<script>(function(){document.addEventListener('click',function(e){const a=e.target.closest('a');if(!a)return;let event=a.dataset.track||'';if(!event){if(a.href.includes('nyhut.com'))event='start-permit';else if(a.pathname==='/tools/compliance-assistant')event='ask-assistant';else if(a.pathname==='/fleet-toolkit')event='download-toolkit';else if(a.pathname==='/contact')event='contact-support'}if(event)navigator.sendBeacon('/api/track',new Blob([JSON.stringify({event:event,source:a.dataset.source||document.title,path:location.pathname})],{type:'application/json'}))})})();</script>`;
 return html.includes('</body>')?html.replace('</body>',script+'</body>'):html;
}

export default{async fetch(request,env,ctx){
 const url=new URL(request.url),path=url.pathname.replace(/\/+$/,'')||'/';
 if(path==='/api/version'||path==='/__version')return json({application:'NewYorkHUT.com',version:VERSION,deployedAt:'2026-07-21',knowledgeBaseEntries:HUT_KNOWLEDGE_BASE.length,features:['authority-site-search','search-category-filters','SEO-topic-hubs','breadcrumb-schema','lead-capture','Supabase-ready-lead-storage','Resend-ready-notifications','CTA-conversion-tracking']});
 if(path==='/api/site-search')return json({query:url.searchParams.get('q')||'',type:url.searchParams.get('type')||'All',results:doSearch(url)});
 if(path==='/api/leads'&&request.method==='POST')return saveLead(request,env);
 if(path==='/api/track'&&request.method==='POST')return track(request,env);
 if(path==='/search')return new Response(searchPage(),{headers:{'content-type':'text/html; charset=UTF-8','cache-control':'no-store'}});
 if(path==='/new-york-hut/topics')return new Response(hubsIndex(),{headers:{'content-type':'text/html; charset=UTF-8','cache-control':'no-store'}});
 if(path==='/contact')return new Response(leadPage(),{headers:{'content-type':'text/html; charset=UTF-8','cache-control':'no-store'}});
 const hm=path.match(/^\/new-york-hut\/(permits|filing-and-taxes|vehicles-and-decals|exemptions|enforcement)$/);if(hm)return new Response(hubPage(hm[1],HUBS[hm[1]]),{headers:{'content-type':'text/html; charset=UTF-8','cache-control':'no-store'}});
 const response=await site.fetch(request,env,ctx),headers=new Headers(response.headers),type=headers.get('content-type')||'';headers.set('x-newyorkhut-version',VERSION);
 if(type.includes('text/html'))return new Response(injectTracking(await response.text()),{status:response.status,statusText:response.statusText,headers});
 return new Response(response.body,{status:response.status,statusText:response.statusText,headers});
}};
