import site from "./index-v39.js";

const VERSION="v40";
const ORDER="https://nyhut.com/";

const NAV_CSS=`
#nyh-global-header{background:#fff;border-bottom:1px solid #dbe5ef;position:sticky;top:0;z-index:9999;font-family:Inter,system-ui,sans-serif}
#nyh-global-header *{box-sizing:border-box}
#nyh-global-header .nyh-nav{width:min(1280px,calc(100% - 40px));min-height:72px;margin:auto;display:flex;align-items:center;justify-content:space-between;gap:22px}
#nyh-global-header .nyh-brand{font-weight:900;font-size:1.08rem;line-height:1.2;color:#082b4c;text-decoration:none;white-space:nowrap}
#nyh-global-header .nyh-links{display:flex;align-items:center;gap:18px}
#nyh-global-header .nyh-links a,#nyh-global-header .nyh-mobile a{font-weight:800;font-size:.94rem;line-height:1.2;color:#082b4c;text-decoration:none;white-space:nowrap}
#nyh-global-header .nyh-links a:hover,#nyh-global-header .nyh-mobile a:hover{color:#1768c5}
#nyh-global-header .nyh-order{display:inline-flex!important;align-items:center;justify-content:center;background:#1768c5!important;color:#fff!important;padding:12px 17px!important;border-radius:10px!important}
#nyh-global-header .nyh-menu{display:none;position:relative}
#nyh-global-header .nyh-menu summary{list-style:none;cursor:pointer;border:1px solid #b9c9d8;border-radius:10px;padding:10px 13px;font-weight:850;color:#082b4c;background:#fff}
#nyh-global-header .nyh-menu summary::-webkit-details-marker{display:none}
#nyh-global-header .nyh-mobile{position:absolute;right:0;top:48px;width:250px;background:#fff;border:1px solid #dbe5ef;border-radius:14px;padding:10px;box-shadow:0 16px 40px rgba(8,43,76,.18);display:grid;gap:4px}
#nyh-global-header .nyh-mobile a{padding:12px;border-radius:9px}
#nyh-global-header .nyh-mobile a:hover{background:#f5f9fc}
body>header:not(#nyh-global-header),body>.site-header,body>.header,body>.navbar,body>.nav-header{display:none!important}
@media(max-width:980px){#nyh-global-header .nyh-links{gap:12px}#nyh-global-header .nyh-links a{font-size:.88rem}}
@media(max-width:820px){#nyh-global-header .nyh-nav{width:min(100% - 24px,1280px)}#nyh-global-header .nyh-links{display:none}#nyh-global-header .nyh-menu{display:block}}
`;

function globalHeader(){return `<header id="nyh-global-header"><nav class="nyh-nav" aria-label="Primary navigation"><a class="nyh-brand" href="/">NewYorkHUT.com</a><div class="nyh-links"><a href="/">Home</a><a href="/tools">Tools</a><a href="/search">Search</a><a href="/tools/compliance-assistant">Assistant</a><a href="/official-resources">Official Resources</a><a class="nyh-order" href="${ORDER}">Start Permit</a></div><details class="nyh-menu"><summary>Menu</summary><div class="nyh-mobile"><a href="/">Home</a><a href="/tools">Tools</a><a href="/search">Search</a><a href="/tools/compliance-assistant">Compliance Assistant</a><a href="/official-resources">Official Resources</a><a class="nyh-order" href="${ORDER}">Start Permit</a></div></details></nav></header>`}

function injectGlobalNavigation(html){
  let out=html.replace(/<header[^>]*id=["']nyh-global-header["'][\s\S]*?<\/header>/i,"");
  if(out.includes("</head>"))out=out.replace("</head>",`<style>${NAV_CSS}</style></head>`);
  if(/<body[^>]*>/i.test(out))out=out.replace(/<body[^>]*>/i,m=>m+globalHeader());
  return out;
}

export default{async fetch(request,env,ctx){
  const url=new URL(request.url),path=url.pathname.replace(/\/+$/g,"")||"/";
  if(path==="/__version"||path==="/api/version")return new Response(JSON.stringify({application:"NewYorkHUT.com",version:VERSION,deployedAt:"2026-07-21",features:["forced-global-navigation","desktop-navigation","mobile-menu"]},null,2),{headers:{"content-type":"application/json; charset=UTF-8","cache-control":"no-store","x-newyorkhut-version":VERSION}});
  const response=await site.fetch(request,env,ctx),headers=new Headers(response.headers),type=headers.get("content-type")||"";
  headers.set("x-newyorkhut-version",VERSION);
  if(type.includes("text/html")){
    const html=injectGlobalNavigation(await response.text());
    headers.set("content-type","text/html; charset=UTF-8");
    headers.set("cache-control","no-store, no-cache, must-revalidate, max-age=0");
    headers.set("pragma","no-cache");
    return new Response(html,{status:response.status,statusText:response.statusText,headers});
  }
  return new Response(response.body,{status:response.status,statusText:response.statusText,headers});
}};
