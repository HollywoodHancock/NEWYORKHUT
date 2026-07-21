import site from './index-v45.js';

const VERSION='v46';
const MY_NYHUT='https://www.nyhut.com/my-nyhut';
const ORDER='https://www.nyhut.com/';

const shellCss=`
<style id="nyh-shell-css">
:root{--nyh-navy:#082b4c;--nyh-blue:#1768c5;--nyh-line:#d8e3ed;--nyh-muted:#607286}
body>header:not(.nyh-header),body>nav:not(.nyh-header){display:none!important}
.nyh-header{position:sticky;top:0;z-index:9999;background:rgba(255,255,255,.98);border-bottom:1px solid var(--nyh-line);box-shadow:0 4px 18px rgba(8,43,76,.06);font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
.nyh-nav{width:min(1220px,calc(100% - 34px));height:76px;margin:auto;display:flex;align-items:center;gap:22px}
.nyh-brand{display:flex;align-items:center;gap:10px;color:var(--nyh-navy)!important;text-decoration:none!important;font-size:1.18rem;font-weight:950;white-space:nowrap;letter-spacing:-.02em}
.nyh-mark{width:34px;height:34px;border-radius:9px;display:grid;place-items:center;background:var(--nyh-navy);color:#fff;font-size:.78rem;letter-spacing:.02em}
.nyh-menu{display:flex;align-items:center;gap:5px;margin-left:auto}
.nyh-item{position:relative}
.nyh-link,.nyh-trigger{display:flex;align-items:center;gap:5px;padding:11px 10px;border:0;background:transparent;color:var(--nyh-navy)!important;text-decoration:none!important;font:inherit;font-weight:800;cursor:pointer;white-space:nowrap;border-radius:9px}
.nyh-link:hover,.nyh-trigger:hover,.nyh-item:focus-within>.nyh-trigger{background:#eef5fb}
.nyh-drop{position:absolute;top:calc(100% + 8px);left:0;min-width:285px;padding:10px;background:#fff;border:1px solid var(--nyh-line);border-radius:15px;box-shadow:0 18px 45px rgba(8,43,76,.17);opacity:0;visibility:hidden;transform:translateY(-5px);transition:.16s ease}
.nyh-item:hover>.nyh-drop,.nyh-item:focus-within>.nyh-drop,.nyh-item.open>.nyh-drop{opacity:1;visibility:visible;transform:none}
.nyh-drop a{display:block;padding:11px 12px;border-radius:9px;color:var(--nyh-navy)!important;text-decoration:none!important;font-weight:800}
.nyh-drop a:hover{background:#eef5fb;color:var(--nyh-blue)!important}
.nyh-drop small{display:block;margin-top:2px;color:var(--nyh-muted);font-weight:500;line-height:1.25}
.nyh-portal{border:1px solid #aac4dc!important;padding:10px 13px!important}
.nyh-order{background:var(--nyh-blue)!important;color:#fff!important;padding:11px 16px!important;border-radius:10px!important}
.nyh-toggle{display:none;margin-left:auto;border:1px solid var(--nyh-line);background:#fff;color:var(--nyh-navy);border-radius:9px;padding:9px 11px;font-size:1.2rem}
.nyh-footer{background:#061f37;color:#dce8f3;font-family:Inter,system-ui,sans-serif;padding:54px 0 20px;margin-top:0}
.nyh-footer-inner{width:min(1180px,calc(100% - 40px));margin:auto}
.nyh-footer-grid{display:grid;grid-template-columns:1.25fr repeat(4,1fr);gap:32px}
.nyh-footer h2,.nyh-footer h3{color:#fff!important;margin-top:0}
.nyh-footer h3{font-size:.83rem;text-transform:uppercase;letter-spacing:.09em}
.nyh-footer p{color:#b7c9d9}
.nyh-footer a{display:block;color:#dce8f3!important;text-decoration:none!important;margin:9px 0}
.nyh-footer a:hover{color:#fff!important;text-decoration:underline!important}
.nyh-footer .nyh-foot-order{display:inline-block;background:var(--nyh-blue);color:#fff!important;padding:11px 15px;border-radius:9px;font-weight:850;margin-top:8px}
.nyh-footer-bottom{border-top:1px solid rgba(255,255,255,.14);margin-top:34px;padding-top:18px;display:flex;justify-content:space-between;gap:15px;color:#9fb3c5;font-size:.88rem}
@media(max-width:1050px){.nyh-nav{height:auto;min-height:70px;flex-wrap:wrap;padding:11px 0}.nyh-toggle{display:block}.nyh-menu{display:none;order:3;width:100%;margin:0;flex-direction:column;align-items:stretch;padding:8px 0 14px}.nyh-header.open .nyh-menu{display:flex}.nyh-link,.nyh-trigger{width:100%;justify-content:space-between;padding:12px}.nyh-item{width:100%}.nyh-drop{position:static;display:none;opacity:1;visibility:visible;transform:none;box-shadow:none;border:0;border-left:3px solid var(--nyh-line);border-radius:0;margin:0 0 7px 12px;padding:3px 8px}.nyh-item.open>.nyh-drop{display:block}.nyh-portal,.nyh-order{justify-content:center!important}.nyh-footer-grid{grid-template-columns:1fr 1fr 1fr}}
@media(max-width:650px){.nyh-brand{font-size:1.03rem}.nyh-mark{width:31px;height:31px}.nyh-footer-grid{grid-template-columns:1fr 1fr}.nyh-footer-grid>div:first-child{grid-column:1/-1}.nyh-footer-bottom{flex-direction:column}}
@media(max-width:430px){.nyh-footer-grid{grid-template-columns:1fr}.nyh-footer-grid>div:first-child{grid-column:auto}}
</style>`;

const header=`<header class="nyh-header" id="nyhHeader"><div class="nyh-nav">
<a class="nyh-brand" href="/"><span class="nyh-mark">NY</span><span>NewYorkHUT.com</span></a>
<button class="nyh-toggle" id="nyhToggle" type="button" aria-label="Open navigation" aria-expanded="false">☰</button>
<nav class="nyh-menu" aria-label="Primary navigation">
<a class="nyh-link" href="/">Home</a>
<div class="nyh-item"><button class="nyh-trigger" type="button">Learn <span>⌄</span></button><div class="nyh-drop">
<a href="/what-is-hut">What Is New York HUT?<small>Understand the tax and credential system.</small></a>
<a href="/new-york-hut/do-i-need-new-york-hut">Do I Need HUT?<small>Review eligibility and weight thresholds.</small></a>
<a href="/new-york-hut">HUT FAQ Library<small>Browse detailed answers to common questions.</small></a>
<a href="/new-york-hut/topics">Topic Guides<small>Explore permits, filing, vehicles, and enforcement.</small></a>
<a href="/official-resources">Official Resources<small>New York forms, bulletins, and filing links.</small></a>
</div></div>
<div class="nyh-item"><button class="nyh-trigger" type="button">Tools <span>⌄</span></button><div class="nyh-drop">
<a href="/tools/compliance-assistant">Compliance Assistant<small>Get guided HUT requirement help.</small></a>
<a href="/tools/vin-decoder">VIN Decoder<small>Review vehicle information and classifications.</small></a>
<a href="/tools/fleet-compliance">Fleet Compliance Check<small>Identify missing fleet controls.</small></a>
<a href="/tools/compliance-calendar">Compliance Calendar<small>Track HUT and trucking deadlines.</small></a>
<a href="/fleet-toolkit">Fleet Toolkit<small>Download mileage, fuel, and audit templates.</small></a>
<a href="/search">Search Knowledge Center<small>Search every FAQ, tool, and resource.</small></a>
</div></div>
<div class="nyh-item"><button class="nyh-trigger" type="button">Services <span>⌄</span></button><div class="nyh-drop">
<a href="${ORDER}" data-track="start-permit">New HUT Permit<small>Apply for a new regular credential.</small></a>
<a href="${ORDER}" data-track="start-permit">HUT Trip Certificate<small>Request temporary occasional-operation authority.</small></a>
<a href="${ORDER}" data-track="start-permit">Add or Update a Vehicle<small>Manage a vehicle on an existing account.</small></a>
<a href="/contact" data-track="contact-support">HUT Account Help<small>Ask for help with account or filing issues.</small></a>
</div></div>
<a class="nyh-link" href="/about">About</a>
<a class="nyh-link" href="/contact" data-track="contact-support">Contact</a>
<a class="nyh-link nyh-portal" href="${MY_NYHUT}">MY NYHUT</a>
<a class="nyh-link nyh-order" href="${ORDER}" data-track="start-permit">Start Permit</a>
</nav></div></header>`;

const footer=`<footer class="nyh-footer"><div class="nyh-footer-inner"><div class="nyh-footer-grid">
<div><h2>NewYorkHUT.com</h2><p>Independent New York Highway Use Tax education, carrier tools, and credential assistance.</p><a class="nyh-foot-order" href="${ORDER}" data-track="start-permit">Start a HUT Permit</a></div>
<div><h3>Learn</h3><a href="/what-is-hut">What Is HUT?</a><a href="/new-york-hut/do-i-need-new-york-hut">Do I Need HUT?</a><a href="/new-york-hut">FAQ Library</a><a href="/new-york-hut/topics">Topic Guides</a><a href="/official-resources">Official Resources</a></div>
<div><h3>Tools</h3><a href="/tools/compliance-assistant">Compliance Assistant</a><a href="/tools/vin-decoder">VIN Decoder</a><a href="/tools/fleet-compliance">Fleet Compliance</a><a href="/tools/compliance-calendar">Compliance Calendar</a><a href="/fleet-toolkit">Fleet Toolkit</a><a href="/search">Site Search</a></div>
<div><h3>Services</h3><a href="${ORDER}" data-track="start-permit">New HUT Permit</a><a href="${ORDER}" data-track="start-permit">Trip Certificate</a><a href="${ORDER}" data-track="start-permit">Add a Vehicle</a><a href="/contact">Existing Account Help</a></div>
<div><h3>Customer & Company</h3><a href="${MY_NYHUT}">MY NYHUT</a><a href="${MY_NYHUT}">Order Status</a><a href="${MY_NYHUT}">Customer Dashboard</a><a href="/about">About</a><a href="/contact">Contact</a><a href="/privacy-policy">Privacy Policy</a><a href="/terms">Terms</a></div>
</div><div class="nyh-footer-bottom"><span>© ${new Date().getFullYear()} NewYorkHUT.com. All rights reserved.</span><span>Independent permit service and educational resource—not a New York State agency.</span></div></div></footer>`;

const shellScript=`<script id="nyh-shell-js">(()=>{const h=document.getElementById('nyhHeader'),t=document.getElementById('nyhToggle');if(t){t.onclick=()=>{const o=h.classList.toggle('open');t.setAttribute('aria-expanded',String(o))}}document.querySelectorAll('.nyh-trigger').forEach(b=>b.onclick=e=>{if(innerWidth<=1050){e.preventDefault();b.parentElement.classList.toggle('open')}});document.addEventListener('click',e=>{if(innerWidth>1050&&!e.target.closest('.nyh-item'))document.querySelectorAll('.nyh-item.open').forEach(x=>x.classList.remove('open'))})})()</script>`;

function applyShell(html,path){
 let out=html;
 out=out.replace(/<header\b[^>]*>[\s\S]*?<\/header>/i,'');
 out=out.replace(/<nav\b[^>]*>[\s\S]*?<\/nav>/i,'');
 out=out.replace(/<footer\b[^>]*>[\s\S]*?<\/footer>/ig,'');
 out=out.replace('</head>',shellCss+'</head>');
 out=out.replace(/<body([^>]*)>/i,`<body$1>${header}`);
 out=out.replace('</body>',footer+shellScript+'</body>');
 const canonical='https://newyorkhut.com'+path;
 if(/<link rel=["']canonical["'][^>]*>/i.test(out))out=out.replace(/<link rel=["']canonical["'][^>]*>/i,`<link rel="canonical" href="${canonical}">`);
 return out;
}

export default {async fetch(request,env,ctx){
 const url=new URL(request.url);const path=url.pathname.replace(/\/+$/,'')||'/';
 if(path==='/api/version'||path==='/__version')return new Response(JSON.stringify({application:'NewYorkHUT.com',version:VERSION,deployedAt:'2026-07-21',features:['sitewide-sticky-navigation','desktop-dropdowns','mobile-navigation','top-level-contact','top-level-my-nyhut','complete-authority-footer','sitewide-shell-normalization'],knowledgeBaseEntries:25},null,2),{headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store','x-newyorkhut-version':VERSION}});
 const response=await site.fetch(request,env,ctx);const headers=new Headers(response.headers);headers.set('x-newyorkhut-version',VERSION);const type=headers.get('content-type')||'';
 if(type.includes('text/html')){headers.set('cache-control','no-store, no-cache, must-revalidate, max-age=0');return new Response(applyShell(await response.text(),path),{status:response.status,statusText:response.statusText,headers})}
 return new Response(response.body,{status:response.status,statusText:response.statusText,headers});
}};
