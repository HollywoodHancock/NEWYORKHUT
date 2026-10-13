import assert from 'node:assert/strict';
import test from 'node:test';
import worker from '../src/index.js';
import {LEGACY_SITEMAP_PATHS, HANDLER_ALIAS_REDIRECTS} from '../src/legacy-sitemaps.js';
import {EDUCATIONAL_REDIRECTS, canonicalPath} from '../src/seo-consolidation.js';
const origin='https://newyorkhut.com';
const get=url=>worker.fetch(new Request(url),{ASSETS:{fetch:async()=>new Response('not found',{status:404})}},{});

test('all 25 published sitemaps contain only distinct final indexable 200 URLs',async()=>{
 for(const path of ['/sitemap.xml',...LEGACY_SITEMAP_PATHS]){
  const r=await get(origin+path);assert.equal(r.status,200,path);assert.match(r.headers.get('content-type'),/xml/);
  const xml=await r.text(),urls=[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
  assert.equal(new Set(urls).size,urls.length,path);assert.equal(Number(r.headers.get('x-sitemap-url-count')),urls.length,path);
  for(const url of urls){
   assert.equal(new URL(url).origin,origin,url);assert.equal(canonicalPath(new URL(url).pathname),new URL(url).pathname,url);
   const page=await get(url);assert.equal(page.status,200,url);assert.doesNotMatch(page.headers.get('x-robots-tag')||'',/noindex/i);
   const html=await page.text();assert.doesNotMatch(html,/<meta[^>]*name=["']robots["'][^>]*noindex/i);
   assert.ok(html.includes(`rel="canonical" href="${url}"`),url);
  }
 }
});
test('legacy sitemaps keep their own topics without injecting unrelated historical pages',async()=>{
 const xml=await(await get(origin+'/sitemap-states.xml')).text();
 assert.doesNotMatch(xml,/\/filing\/quarterly-due-dates|\/vehicles\/box-trucks|\/cost\/late-filing/);
 const root=await(await get(origin+'/sitemap.xml')).text();assert.match(root,/\/filing\/quarterly-due-dates/);
});
test('older source-handler aliases go straight to upgraded canonical guides and tools on all hosts',async()=>{
 for(const [path,target] of HANDLER_ALIAS_REDIRECTS){
  for(const host of [origin,'http://www.newyorkhut.com','https://www.newyorkhut.com']){
   const r=await get(host+path+'/?ref=old-bookmark');assert.equal(r.status,301,path);
   assert.equal(r.headers.get('location'),origin+target+'?ref=old-bookmark');
  }
  const r=await get(origin+target);assert.equal(r.status,200,target);const html=await r.text();assert.ok(html.includes(`rel="canonical" href="${origin}${target}"`));
  if(target.includes('estimator'))assert.match(html,/calculateHutLateCharges/);
 }
});
