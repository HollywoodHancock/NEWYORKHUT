import {LEGACY_SITEMAP_PATHS, HANDLER_ALIAS_REDIRECTS} from '../src/legacy-sitemaps.js';
const origin='https://newyorkhut.com';
const failures=[],urls=new Set();
async function read(url){
 let error;
 for(let attempt=0;attempt<3;attempt++){
  try {const response=await fetch(url,{redirect:'manual',signal:AbortSignal.timeout(25000),headers:{'user-agent':'NewYorkHUT-All-Sitemaps-Guard/1.0'}});const html=await response.text();if(response.status>=500)throw new Error('HTTP '+response.status);return{response,html};}catch(e){error=e;}
 }
 throw error;
}
const paths=['/sitemap.xml',...LEGACY_SITEMAP_PATHS];let cursor=0;
await Promise.all(Array.from({length:6},async()=>{
 while(cursor<paths.length){const path=paths[cursor++];try{
  const{response,html}=await read(origin+path);if(response.status!==200)throw new Error('HTTP '+response.status);
  if(!response.headers.get('content-type')?.includes('xml'))throw new Error('not XML');
  const entries=[...html.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
  if(!entries.length||new Set(entries).size!==entries.length)throw new Error('empty or duplicate entries');
  if(Number(response.headers.get('x-sitemap-url-count'))!==entries.length)throw new Error('incorrect sitemap count header');
  for(const url of entries)urls.add(url);
 }catch(e){failures.push(path+': '+e.message);}}
}));
const pageUrls=[...urls];cursor=0;
await Promise.all(Array.from({length:8},async()=>{
 while(cursor<pageUrls.length){const url=pageUrls[cursor++];try{
  if(new URL(url).origin!==origin)throw new Error('wrong host/protocol');
  const{response,html}=await read(url);if(response.status!==200)throw new Error('HTTP '+response.status);
  if(!response.headers.get('content-type')?.includes('text/html'))throw new Error('not HTML');
  if(/noindex/i.test(response.headers.get('x-robots-tag')||'')||/<meta[^>]*name=["']robots["'][^>]*noindex/i.test(html))throw new Error('noindex');
  const tags=[...html.matchAll(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi)];
  if(tags.length!==1||tags[0][0].match(/href=["']([^"']+)/)?.[1]!==url)throw new Error('wrong or duplicate canonical');
 }catch(e){failures.push(url+': '+e.message);}}
}));
for(const[path,target]of HANDLER_ALIAS_REDIRECTS){
 for(const host of[origin,'http://www.newyorkhut.com']){try{
  const{response}=await read(host+path+'/?ref=sitemap-guard');
  if(response.status!==301||response.headers.get('location')!==origin+target+'?ref=sitemap-guard')throw new Error('alias does not resolve directly to final canonical');
 }catch(e){failures.push(path+': '+e.message);}}
}
if(failures.length){console.error(failures.join('\n'));process.exitCode=1;}
else console.log(`All-sitemap live audit passed: ${paths.length} sitemaps, ${pageUrls.length} unique indexable canonical pages, ${HANDLER_ALIAS_REDIRECTS.size} handler aliases.`);
