import site from "./index-v40.js";

const VERSION="v41";
const ORDER="https://nyhut.com/";

const NAV_CSS=`
#nyh-global-header{background:#fff;border-bottom:1px solid #dbe5ef;position:sticky;top:0;z-index:9999;font-family:Inter,system-ui,sans-serif}
#nyh-global-header *{box-sizing:border-box}
#nyh-global-header .nyh-nav{width:min(1280px,calc(100% - 40px));min-height:74px;margin:auto;display:flex;align-items:center;justify-content:space-between;gap:22px}
#nyh-global-header .nyh-brand{font-weight:900;font-size:1.08rem;line-height:1.2;color:#082b4c;text-decoration:none;white-space:nowrap}
#nyh-global-header .nyh-links{display:flex;align-items:center;gap:8px}
#nyh-global-header .nyh-link,#nyh-global-header summary{font-weight:800;font-size:.94rem;line-height:1.2;color:#082b4c;text-decoration:none;white-space:nowrap;padding:11px 12px;border-radius:9px;cursor:pointer;list-style:none}
#nyh-global-header summary::-webkit-details-marker{display:none}
#nyh-global-header .nyh-link:hover,#nyh-global-header summary:hover,#nyh-global-header details[open]>summary{background:#f1f6fa;color:#1768c5}
#nyh-global-header .nyh-drop{position:relative}
#nyh-global-header .nyh-dropmenu{position:absolute;top:48px;left:0;width:310px;background:#fff;border:1px solid #dbe5ef;border-radius:15px;padding:10px;box-shadow:0 18px 45px rgba(8,43,76,.16);display:grid;gap:3px}
#nyh-global-header .nyh-dropmenu.resources{width:270px}
#nyh-global-header .nyh-dropmenu a{display:block;color:#082b4c;text-decoration:none;padding:11px 12px;border-radius:9px}
#nyh-global-header .nyh-dropmenu a:hover{background:#f5f9fc}
#nyh-global-header .nyh-dropmenu strong{display:block;font-size:.93rem}
#nyh-global-header .nyh-dropmenu span{display:block;font-size:.79rem;color:#607286;margin-top:2px;font-weight:600;line-height:1.35}
#nyh-global-header .nyh-order{display:inline-flex!important;align-items:center;justify-content:center;background:#1768c5!important;color:#fff!important;padding:12px 17px!important;border-radius:10px!important;text-decoration:none;font-weight:850;white-space:nowrap}
#nyh-global-header .nyh-mobile-menu{display:none;position:relative}
#nyh-global-header .nyh-mobile-menu>summary{border:1px solid #b9c9d8;background:#fff}
#nyh-global-header .nyh-mobile-panel{position:absolute;right:0;top:50px;width:min(330px,calc(100vw - 28px));max-height:calc(100vh - 90px);overflow:auto;background:#fff;border:1px solid #dbe5ef;border-radius:15px;padding:10px;box-shadow:0 18px 45px rgba(8,43,76,.18)}
#nyh-global-header .nyh-mobile-panel a{display:block;color:#082b4c;text-decoration:none;font-weight:800;padding:12px;border-radius:9px}
#nyh-global-header .nyh-mobile-panel a:hover{background:#f5f9fc}
#nyh-global-header .nyh-mobile-label{padding:13px 12px 5px;color:#1768c5;font-size:.74rem;font-weight:900;text-transform:uppercase;letter-spacing:.08em}
#nyh-global-header .nyh-mobile-panel .nyh-order{margin-top:8px;text-align:center}
body>header:not(#nyh-global-header),body>.site-header,body>.header,body>.navbar,body>.nav-header{display:none!important}
@media(max-width:900px){#nyh-global-header .nyh-links{display:none}#nyh-global-header .nyh-mobile-menu{display:block}#nyh-global-header .nyh-nav{width:min(100% - 24px,1280px)}}
`;

function toolLink(href,title,description){return `<a href="${href}"><strong>${title}</strong><span>${description}</span></a>`}

function globalHeader(){return `<header id="nyh-global-header"><nav class="nyh-nav" aria-label="Primary navigation"><a class="nyh-brand" href="/">NewYorkHUT.com</a><div class="nyh-links"><a class="nyh-link" href="/">Home</a><details class="nyh-drop"><summary>Tools ▾</summary><div class="nyh-dropmenu">${toolLink("/tools","All Compliance Tools","View the complete tools directory.")}${toolLink("/tools/vin-decoder","Truck VIN Decoder","Decode vehicle data and review preliminary compliance guidance.")}${toolLink("/tools/fleet-compliance","Fleet Compliance Dashboard","Assess fleet readiness and missing compliance controls.")}${toolLink("/tools/compliance-calendar","Compliance Calendar","Build HUT, IFTA, IRP, UCR, and fleet planning dates.")}${toolLink("/tools/compliance-assistant","Compliance Assistant","Ask questions using the curated HUT knowledge base.")}${toolLink("/fleet-toolkit","Fleet Compliance Toolkit","Download fleet inventory, mileage, fuel, and audit templates.")}</div></details><details class="nyh-drop"><summary>Resources ▾</summary><div class="nyh-dropmenu resources">${toolLink("/search","Knowledge Search","Search HUT permits, filings, records, exemptions, and enforcement.")}${toolLink("/official-resources","Official Resources","Open New York Tax Department forms and guidance.")}</div></details><a class="nyh-order" href="${ORDER}">Start Permit</a></div><details class="nyh-mobile-menu"><summary>Menu</summary><div class="nyh-mobile-panel"><a href="/">Home</a><div class="nyh-mobile-label">Tools</div><a href="/tools">All Compliance Tools</a><a href="/tools/vin-decoder">Truck VIN Decoder</a><a href="/tools/fleet-compliance">Fleet Compliance Dashboard</a><a href="/tools/compliance-calendar">Compliance Calendar</a><a href="/tools/compliance-assistant">Compliance Assistant</a><a href="/fleet-toolkit">Fleet Compliance Toolkit</a><div class="nyh-mobile-label">Resources</div><a href="/search">Knowledge Search</a><a href="/official-resources">Official Resources</a><a class="nyh-order" href="${ORDER}">Start Permit</a></div></details></nav></header>`}

function injectNavigation(html){
  let out=html.replace(/<header[^>]*id=["']nyh-global-header["'][\s\S]*?<\/header>/i,"");
  out=out.replace(/<style>\s*#nyh-global-header[\s\S]*?<\/style>/i,"");
  if(out.includes("</head>"))out=out.replace("</head>",`<style>${NAV_CSS}</style></head>`);
  if(/<body[^>]*>/i.test(out))out=out.replace(/<body[^>]*>/i,m=>m+globalHeader());
  return out;
}

export default{async fetch(request,env,ctx){
  const url=new URL(request.url),path=url.pathname.replace(/\/+$/g,"")||"/";
  if(path==="/__version"||path==="/api/version")return new Response(JSON.stringify({application:"NewYorkHUT.com",version:VERSION,deployedAt:"2026-07-21",features:["full-navigation","tools-dropdown","resources-dropdown","mobile-full-menu"],navigationRoutes:["/tools","/tools/vin-decoder","/tools/fleet-compliance","/tools/compliance-calendar","/tools/compliance-assistant","/fleet-toolkit","/search","/official-resources"]},null,2),{headers:{"content-type":"application/json; charset=UTF-8","cache-control":"no-store","x-newyorkhut-version":VERSION}});
  const response=await site.fetch(request,env,ctx),headers=new Headers(response.headers),type=headers.get("content-type")||"";
  headers.set("x-newyorkhut-version",VERSION);
  if(type.includes("text/html")){
    const html=injectNavigation(await response.text());
    headers.set("content-type","text/html; charset=UTF-8");
    headers.set("cache-control","no-store, no-cache, must-revalidate, max-age=0");
    return new Response(html,{status:response.status,statusText:response.statusText,headers});
  }
  return new Response(response.body,{status:response.status,statusText:response.statusText,headers});
}};
