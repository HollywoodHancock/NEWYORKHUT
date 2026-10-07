import assert from 'node:assert/strict';
import test from 'node:test';
import vm from 'node:vm';
import worker from '../src/index.js';
import {calculateHutLateCharges as charges, parseHutDate} from '../src/hut-late-charges.js';
import {hutFilingDueDate} from '../src/hut-deadline.js';

const env={ASSETS:{fetch:async()=>new Response('Not found',{status:404})}};
const htmlFor=async path=>{
 const response=process.env.LIVE_SITE ? await fetch(process.env.LIVE_SITE+path) : await worker.fetch(new Request('https://newyorkhut.com'+path),env,{});
 assert.equal(response.status,200,path);return response.text();
};
function browser(html){
 const elements=new Map();
 for(const match of html.matchAll(/\bid="([^"]+)"/g))elements.set(match[1],{value:'',checked:false,hidden:false,textContent:'',addEventListener(){}});
 elements.get('period')&&(elements.get('period').value='quarter');
 const context=vm.createContext({document:{getElementById:id=>elements.get(id)??null}});
 for(const match of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)){
  if(match[0].includes('application/ld+json'))continue;
  vm.runInContext(match[1],context);
 }
 return {elements,context};
}
test('matches NYHUT receipt example and preserves tax cents',()=>{
 assert.deepEqual(charges(134.10,'2026-11-02','2026-11-05'),{tax:134.10,base:134,months:1,penalty:13.4,interest:.08,days:2,total:147.58});
 assert.equal(charges(134.10,'2026-11-02','2026-11-03').days,0);
 assert.equal(charges(134.10,'2026-11-02','2026-11-03').penalty,13.4);
});
test('on-time, zero tax, invalid dates and missing inputs do not invent charges',()=>{
 assert.equal(charges(500,'2026-11-02','2026-11-02').total,500);
 assert.equal(charges(0,'2026-11-02','2027-02-01').total,0);
 for(const args of [[-1,'2026-11-02','2026-11-05'],[NaN,'2026-11-02','2026-11-05'],[500,'2026-02-30','2026-11-05'],[500,'','']])assert.ok(charges(...args).error);
 assert.equal(parseHutDate('2026-02-30'),null);
});
test('monthly boundaries, cap and unknown rate protection match filing rules',()=>{
 assert.equal(charges(500,'2026-05-02','2026-06-02').penalty,50);
 assert.equal(charges(500,'2026-05-02','2026-06-03').penalty,55);
 const capped=charges(500,'2024-01-01','2026-11-05');assert.equal(capped.penalty,150);assert.equal(capped.interest,null);assert.equal(capped.total,null);
 assert.equal(charges(500,'2026-12-30','2027-01-03').interest,null);
});
test('interest switches quarterly and deadline uses adjusted business day',()=>{
 const result=charges(1000,'2026-03-30','2026-04-03');
 assert.equal(result.days,3);
 assert.equal(result.interest,Math.round((1000*(1+.11/365)*(1+.10/365)**2-1000)*100)/100);
 assert.equal(hutFilingDueDate(2026,'quarterly',3).toISOString().slice(0,10),'2026-11-02');
});
test('both final rendered tools run the same calculator and show missing-rate errors',async()=>{
 for(const path of ['/tools/hut-tax-estimator','/tools/hut-penalty-estimator']){
  const html=await htmlFor(path);assert.equal((html.match(/<h1\b/g)||[]).length,1);assert.equal((html.match(/<footer\b/g)||[]).length,1);
  assert.match(html,new RegExp('rel="canonical" href="https://newyorkhut.com'+path+'"'));
  assert.match(html,/\/services/);assert.match(html,/\/site-map/);assert.match(html,/https:\/\/nyhut.com\/my-nyhut/);
  const {elements:e,context:c}=browser(html);
  e.get('late-enabled')&&(e.get('late-enabled').checked=true);
  e.get('late-tax').value='134.10';e.get('late-due').value='2026-11-02';e.get('late-receipt').value='2026-11-05';vm.runInContext('updateLateCharges()',c);
  assert.equal(e.get('late-penalty').textContent,'$13.40');assert.equal(e.get('late-interest').textContent,'$0.08');assert.equal(e.get('late-total').textContent,'$147.58');
  e.get('late-receipt').value='2027-01-05';vm.runInContext('updateLateCharges()',c);assert.equal(e.get('late-interest').textContent,'Unavailable');assert.equal(e.get('late-total').textContent,'—');
 }
});
test('tax estimator retains mileage projections and uses selected-period tax only for late charges',async()=>{
 const {elements:e,context:c}=browser(await htmlFor('/tools/hut-tax-estimator'));
 e.get('gvw').value='80000';e.get('miles').value='2500';e.get('period').value='month';
 vm.runInContext('calc()',c);assert.equal(e.get('amount').textContent,'$136.50');assert.equal(e.get('quarter').textContent,'$409.50');assert.equal(e.get('annual').textContent,'$1,638.00');
 e.get('late-enabled').checked=true;e.get('late-due').value='2026-11-02';e.get('late-receipt').value='2026-11-05';vm.runInContext('updateLateCharges()',c);
 assert.equal(e.get('late-tax-result').textContent,'$136.50');assert.equal(e.get('late-penalty').textContent,'$13.70');
 e.get('late-enabled').checked=false;vm.runInContext('updateLateCharges()',c);assert.equal(e.get('late-results').hidden,true);
});
