import site from './index-v53.js';

const VERSION = 'v54';
const ORDER = 'https://www.nyhut.com/';
const SOURCE = 'https://www.tax.ny.gov/forms/current-forms/motor/mt903i.htm';

const RATES = [
  [18001,20000,0.0084],[20001,22000,0.0098],[22001,24000,0.0112],[24001,26000,0.0126],
  [26001,28000,0.0133],[28001,30000,0.0140],[30001,32000,0.0147],[32001,34000,0.0154],
  [34001,36000,0.0161],[36001,38000,0.0168],[38001,40000,0.0175],[40001,42000,0.0182],
  [42001,44000,0.0196],[44001,46000,0.0210],[46001,48000,0.0224],[48001,50000,0.0238],
  [50001,52000,0.0252],[52001,54000,0.0266],[54001,56000,0.0280],[56001,58000,0.0294],
  [58001,60000,0.0308],[60001,62000,0.0322],[62001,64000,0.0336],[64001,66000,0.0357],
  [66001,68000,0.0378],[68001,70000,0.0399],[70001,72000,0.0420],[72001,74000,0.0455],
  [74001,76000,0.0490],[76001,78000,0.0518],[78001,80000,0.0546]
];

function estimatorPage() {
  const ratesJson = JSON.stringify(RATES);
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>New York HUT Tax Estimator by Gross Weight | NewYorkHUT.com</title>
<meta name="description" content="Estimate New York Highway Use Tax using current MT-903 Schedule 1 gross-weight laden-mile rates.">
<link rel="canonical" href="https://newyorkhut.com/tools/hut-tax-estimator">
<style>
:root{--navy:#082b4c;--blue:#1768c5;--line:#d7e3ed;--muted:#5b6f83;--pale:#f3f8fc;--green:#157a50;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}*{box-sizing:border-box}body{margin:0;color:#13263a;background:#fff;line-height:1.55}html body>header#nyh-global-header{display:block!important;visibility:visible!important;opacity:1!important;position:sticky;top:0;z-index:9999;background:#fff;border-bottom:1px solid var(--line);box-shadow:0 4px 18px rgba(8,43,76,.08)}.nyh-global-nav{width:min(1180px,calc(100% - 40px));min-height:76px;margin:auto;display:flex;align-items:center;justify-content:space-between;gap:18px;padding:11px 0}.nyh-global-brand{font-size:1.16rem;font-weight:950;color:var(--navy);text-decoration:none;white-space:nowrap}.nyh-global-links{display:flex;align-items:center;gap:8px;flex-wrap:wrap}.nyh-global-links a{display:inline-flex;align-items:center;justify-content:center;min-height:42px;padding:9px 13px;border:1px solid #b8cad9;border-radius:10px;background:#f7fafc;color:var(--navy);font-size:.91rem;font-weight:850;text-decoration:none}.nyh-global-links .order{background:var(--blue);border-color:var(--blue);color:#fff}.hero{background:linear-gradient(135deg,#f9fcff,#eaf4fc);padding:58px 0 46px}.wrap{width:min(1100px,calc(100% - 40px));margin:auto}.eyebrow{font-size:.78rem;text-transform:uppercase;letter-spacing:.11em;color:var(--blue);font-weight:900}.hero h1{max-width:820px;margin:10px 0 16px;font-size:clamp(2.3rem,5vw,4rem);line-height:1.02;letter-spacing:-.04em;color:var(--navy)}.lead{max-width:830px;font-size:1.1rem;color:#496078}.section{padding:48px 0 70px}.layout{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(320px,.9fr);gap:24px;align-items:start}.panel{border:1px solid var(--line);border-radius:20px;background:#fff;padding:26px;box-shadow:0 10px 34px rgba(8,43,76,.07)}.panel h2{margin-top:0;color:var(--navy)}.field{margin:18px 0}.field label{display:block;margin-bottom:7px;font-weight:850;color:var(--navy)}.field input{width:100%;padding:14px 15px;border:1px solid #aebfd0;border-radius:11px;font:inherit;font-size:1.05rem}.field input:focus{outline:3px solid rgba(23,104,197,.15);border-color:var(--blue)}.hint{display:block;margin-top:6px;color:var(--muted);font-size:.88rem}.ratebox{background:var(--pale);border:1px solid #cfe0ee;border-radius:15px;padding:18px;margin-top:20px}.ratebox .label{font-size:.78rem;text-transform:uppercase;letter-spacing:.08em;font-weight:900;color:var(--blue)}.rate{font-size:2rem;font-weight:950;color:var(--navy);margin:3px 0}.range{color:var(--muted)}.result{background:var(--navy);color:#fff;border-radius:18px;padding:24px}.result h2{color:#fff}.amount{font-size:2.7rem;font-weight:950;line-height:1;margin:12px 0}.formula{color:#c9d9e8}.notice{margin-top:18px;padding:15px;border-left:4px solid #e2a500;background:#fff8df;border-radius:8px;color:#594300}.source{margin-top:22px;padding-top:18px;border-top:1px solid var(--line);font-size:.9rem;color:var(--muted)}.source a{color:var(--blue);font-weight:800}.cta{display:inline-flex;margin-top:18px;background:var(--blue);color:#fff;text-decoration:none;font-weight:900;border-radius:10px;padding:13px 18px}.status{min-height:24px;margin-top:8px;font-weight:750}.status.valid{color:var(--green)}.status.invalid{color:#a52b2b}@media(max-width:900px){.layout{grid-template-columns:1fr}.nyh-global-nav{display:block}.nyh-global-brand{display:block;margin-bottom:10px}.nyh-global-links{display:grid;grid-template-columns:repeat(4,minmax(0,1fr))}.nyh-global-links a{width:100%}}@media(max-width:650px){.wrap{width:min(100% - 24px,1100px)}.nyh-global-links{grid-template-columns:repeat(2,minmax(0,1fr))}.nyh-global-links .order{grid-column:1/-1}.hero{padding-top:38px}.panel{padding:20px}}
</style>
</head>
<body>
<header id="nyh-global-header"><div class="nyh-global-nav"><a class="nyh-global-brand" href="/">NewYorkHUT.com</a><nav class="nyh-global-links" aria-label="Primary navigation"><a href="/learn">Learn</a><a href="/new-york-hut-guide">HUT Guide</a><a href="/tools">Tools</a><a href="/services">Services</a><a href="/ask-hut-ai">Ask HUT AI</a><a href="/site-map">All Pages</a><a class="order" href="${ORDER}">Order Permit</a></nav></div></header>
<main>
<section class="hero"><div class="wrap"><div class="eyebrow">MT-903 gross-weight method</div><h1>New York HUT Tax Estimator</h1><p class="lead">Enter the vehicle's gross vehicle weight and taxable New York miles. The estimator automatically selects the current Schedule 1 laden-mile rate published with Form MT-903.</p></div></section>
<section class="section"><div class="wrap"><div class="layout">
<div class="panel"><h2>Vehicle and mileage</h2>
<div class="field"><label for="gvw">Gross vehicle weight (GVW)</label><input id="gvw" type="number" inputmode="numeric" min="0" step="1" placeholder="Example: 80000"><span class="hint">Enter pounds. Use the gross weight shown on the HUT certificate for the vehicle.</span></div>
<div class="field"><label for="miles">Laden taxable New York miles</label><input id="miles" type="number" inputmode="decimal" min="0" step="0.1" placeholder="Example: 2500"><span class="hint">Exclude qualifying toll-paid Thruway mileage and other non-taxable mileage.</span></div>
<div id="status" class="status" aria-live="polite"></div>
<div class="ratebox"><div class="label">Automatically selected tax rate</div><div id="rate" class="rate">—</div><div id="range" class="range">Enter a GVW above 18,000 lbs.</div></div>
<div class="notice"><strong>Scope:</strong> This calculation uses Schedule 1, Table 1, gross-weight method rates for laden taxable miles. It does not calculate unloaded-mile tax, Schedule 2 rates, credits, penalties, interest, or filing adjustments.</div>
<div class="source">Rate source: New York State Department of Taxation and Finance, current <a href="${SOURCE}" target="_blank" rel="noopener">Form MT-903 instructions and tax-rate tables</a>. Rate table revision shown by the state: MT-903-I (10/23).</div>
</div>
<div class="result"><h2>Estimated HUT tax</h2><div id="amount" class="amount">$0.00</div><div id="formula" class="formula">Enter GVW and taxable miles to calculate.</div><a class="cta" href="${ORDER}">Start Your Permit →</a></div>
</div></div></section>
</main>
<script>
const rates=${ratesJson};
const gvw=document.getElementById('gvw');
const miles=document.getElementById('miles');
const rateEl=document.getElementById('rate');
const rangeEl=document.getElementById('range');
const amountEl=document.getElementById('amount');
const formulaEl=document.getElementById('formula');
const statusEl=document.getElementById('status');
function rateFor(weight){
  if(!Number.isFinite(weight)||weight<=18000)return null;
  const row=rates.find(([min,max])=>weight>=min&&weight<=max);
  if(row)return {rate:row[2],label:row[0].toLocaleString()+'–'+row[1].toLocaleString()+' lbs.'};
  if(weight>80000){
    const increments=Math.ceil((weight-80000)/2000);
    return {rate:0.0546+(increments*0.0028),label:'80,001+ lbs. ('+increments+' additional ton'+(increments===1?'':'s')+' or fraction)'};
  }
  return null;
}
function calculate(){
  const weight=Number(gvw.value);
  const taxableMiles=Number(miles.value);
  const selected=rateFor(weight);
  statusEl.className='status';
  if(gvw.value&&weight<=18000){statusEl.textContent='This gross-weight laden-mile table begins at 18,001 lbs.';statusEl.classList.add('invalid')}else if(selected){statusEl.textContent='MT-903 rate selected from the GVW entered.';statusEl.classList.add('valid')}else{statusEl.textContent=''}
  if(selected){rateEl.textContent='$'+selected.rate.toFixed(4)+' per mile';rangeEl.textContent=selected.label}else{rateEl.textContent='—';rangeEl.textContent='Enter a GVW above 18,000 lbs.'}
  const tax=selected&&Number.isFinite(taxableMiles)&&taxableMiles>=0?selected.rate*taxableMiles:0;
  amountEl.textContent=tax.toLocaleString('en-US',{style:'currency',currency:'USD'});
  formulaEl.textContent=selected&&Number.isFinite(taxableMiles)&&taxableMiles>=0?taxableMiles.toLocaleString()+' miles × $'+selected.rate.toFixed(4):'Enter GVW and taxable miles to calculate.';
}
gvw.addEventListener('input',calculate);miles.addEventListener('input',calculate);calculate();
</script>
</body></html>`;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';
    if (path === '/tools/hut-tax-estimator') {
      return new Response(estimatorPage(), {
        headers: {
          'content-type': 'text/html; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'x-newyorkhut-version': VERSION,
          'x-newyorkhut-tool': 'mt903-gvw-tax-estimator-v54'
        }
      });
    }
    return site.fetch(request, env, ctx);
  }
};