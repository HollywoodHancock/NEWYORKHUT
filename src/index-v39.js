import site from "./index-v38.js";

const VERSION="v39";
const ORDER="https://nyhut.com/";

const NAV_CSS=`
.nyh-site-header{background:#fff;border-bottom:1px solid #dbe5ef;position:sticky;top:0;z-index:100}
.nyh-nav{width:min(1280px,calc(100% - 40px));min-height:72px;margin:auto;display:flex;align-items:center;justify-content:space-between;gap:24px}
.nyh-brand{font:900 1.08rem/1.2 Inter,system-ui,sans-serif;color:#082b4c;text-decoration:none;white-space:nowrap}
.nyh-desktop-links{display:flex;align-items:center;gap:20px}
.nyh-desktop-links a,.nyh-mobile-links a{font:800 .95rem/1.2 Inter,system-ui,sans-serif;color:#082b4c;text-decoration:none}
.nyh-desktop-links a:hover,.nyh-mobile-links a:hover{color:#1768c5}
.nyh-order{display:inline-flex!important;align-items:center;justify-content:center;background:#1768c5!important;color:#fff!important;padding:12px 17px!important;border-radius:10px!important}
.nyh-menu{display:none;position:relative}
.nyh-menu summary{list-style:none;cursor:pointer;border:1px solid #b9c9d8;border-radius:10px;padding:10px 13px;font:850 .95rem/1 Inter,system-ui,sans-serif;color:#082b4c;background:#fff}
.nyh-menu summary::-webkit-details-marker{display:none}
.nyh-mobile-links{position:absolute;right:0;top:48px;width:240px;background:#fff;border:1px solid #dbe5ef;border-radius:14px;padding:10px;box-shadow:0 16px 40px rgba(8,43,76,.16);display:grid;gap:4px}
.nyh-mobile-links a{padding:12px;border-radius:9px}
.nyh-mobile-links a:hover{background:#f5f9fc}
@media(max-width:820px){.nyh-nav{width:min(100% - 24px,1280px)}.nyh-desktop-links{display:none}.nyh-menu{display:block}}
`;

function header(){return `<header class="nyh-site-header"><nav class="nyh-nav" aria-label="Primary navigation"><a class="nyh-brand" href="/">NewYorkHUT.com</a><div class="nyh-desktop-links"><a href="/tools">Tools</a><a href="/search">Search</a><a href="/official-resources">Official Resources</a><a class="nyh-order" href="${ORDER}">Start Permit</a></div><details class="nyh-menu"><summary>Menu</summary><div class="nyh-mobile-links"><a href="/">Home</a><a href="/tools">Tools</a><a href="/search">Search</a><a href="/tools/compliance-assistant">Compliance Assistant</a><a href="/official-resources">Official Resources</a><a class="nyh-order" href="${ORDER}">Start Permit</a></div></details></nav></header>`}

function normalizeNavigation(html){
  const withCss=html.includes("</head>")?html.replace("</head>",`<style>${NAV_CSS}</style></head>`):html;
  if(/<header[\s\S]*?<\/header>/i.test(withCss))return withCss.replace(/<header[\s\S]*?<\/header>/i,header());
  return withCss.replace(/<body[^>]*>/i,m=>m+header());
}

export default{async fetch(request,env,ctx){
  const url=new URL(request.url),path=url.pathname.replace(/\/+$/g,"")||"/";
  if(path==="/__version"||path==="/api/version")return new Response(JSON.stringify({application:"NewYorkHUT.com",version:VERSION,deployedAt:"2026-07-21",features:["consistent-site-navigation","mobile-menu","/tools","/search","/official-resources"]},null,2),{headers:{"content-type":"application/json; charset=UTF-8","cache-control":"no-store","x-newyorkhut-version":VERSION}});
  const response=await site.fetch(request,env,ctx),headers=new Headers(response.headers),type=headers.get("content-type")||"";
  headers.set("x-newyorkhut-version",VERSION);
  if(type.includes("text/html")){
    const html=normalizeNavigation(await response.text());
    headers.set("content-type","text/html; charset=UTF-8");headers.set("cache-control","no-store");
    return new Response(html,{status:response.status,statusText:response.statusText,headers});
  }
  return new Response(response.body,{status:response.status,statusText:response.statusText,headers});
}};
