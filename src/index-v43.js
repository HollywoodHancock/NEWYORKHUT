import site from "./index-v42.js";
const VERSION="v43";
function finalizeHtml(html,path){
  let out=html;
  const canonical=`https://newyorkhut.com${path}`;
  if(/<link rel=["']canonical["'][^>]*>/i.test(out))out=out.replace(/<link rel=["']canonical["'][^>]*>/i,`<link rel="canonical" href="${canonical}">`);
  else out=out.replace("</head>",`<link rel="canonical" href="${canonical}"></head>`);
  if(!out.includes('href="/new-york-hut"')){
    out=out.replaceAll('<a href="/search">Knowledge Search</a>','<a href="/new-york-hut">HUT FAQ Library</a><a href="/search">Knowledge Search</a>');
    out=out.replaceAll('<a href="/search"><strong>Knowledge Search</strong>','<a href="/new-york-hut"><strong>HUT FAQ Library</strong><span>Browse 25 detailed HUT answers.</span></a><a href="/search"><strong>Knowledge Search</strong>');
  }
  return out;
}
export default{async fetch(request,env,ctx){
  const url=new URL(request.url),path=url.pathname.replace(/\/+$/g,"")||"/";
  if(path==="/__version"||path==="/api/version")return new Response(JSON.stringify({application:"NewYorkHUT.com",version:VERSION,deployedAt:"2026-07-21",knowledgeBaseEntries:25,features:["expanded-25-topic-knowledge-base","SEO-FAQ-library","FAQ-schema","guided-HUT-requirement-check","sitewide-FAQ-navigation","correct-page-canonicals"]},null,2),{headers:{"content-type":"application/json; charset=UTF-8","cache-control":"no-store","x-newyorkhut-version":VERSION}});
  const response=await site.fetch(request,env,ctx),headers=new Headers(response.headers),type=headers.get("content-type")||"";
  headers.set("x-newyorkhut-version",VERSION);
  if(type.includes("text/html")){
    headers.set("cache-control","no-store, no-cache, must-revalidate, max-age=0");
    return new Response(finalizeHtml(await response.text(),path),{status:response.status,statusText:response.statusText,headers});
  }
  return new Response(response.body,{status:response.status,statusText:response.statusText,headers});
}};
