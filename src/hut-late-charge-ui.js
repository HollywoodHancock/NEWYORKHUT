import {hutLateChargesBrowserCode} from './hut-late-charges.js';

export function lateChargeFields(optional = false) {
  return `<section id="hut-late-charges" style="margin-top:24px"><h3>Penalty and interest estimate</h3>${optional ? '<label style="display:flex;align-items:center;gap:10px"><input id="late-enabled" type="checkbox" style="width:auto"> Include late-payment charges</label>' : ''}<div id="late-fields" ${optional ? 'hidden' : ''}><div class="field"><label for="late-tax">Unpaid tax for this return, after credits ($)</label><input id="late-tax" type="number" min="0" step="0.01" placeholder="${optional ? 'Uses the mileage estimate unless entered' : 'Example: 134.10'}"><span class="hint">${optional ? 'Leave blank to use tax for the selected mileage period. Enter your complete return amount to include other vehicles, mileage, and credits.' : 'Enter the net unpaid tax amount, equivalent to MT-903 line 3.'}</span></div><div class="field"><label for="late-due">Adjusted return due date</label><input id="late-due" type="date"><span class="hint">Use the deadline after weekend and legal-holiday adjustments. Q3 2026 is due November 2, 2026. <a href="/tools/mt903-due-date">Check your filing deadline</a>.</span></div><div class="field"><label for="late-receipt">Expected date New York receives return and payment</label><input id="late-receipt" type="date"></div><p>General penalty: 10% for the first month or part, plus 1% per additional month or part, capped at 30%. Interest uses the applicable quarterly HUT rate and compounds daily. Tax keeps its cents; the late-charge base is rounded to whole dollars, matching our MT-903 filing service.</p><p>This estimate assumes the return and full payment are received together. Partial payments, assessed bills, and amended-return adjustments need separate review.</p><p class="source">Sources checked October 7, 2026: <a href="https://www.tax.ny.gov/forms/current-forms/motor/mt903i.htm">MT-903 instructions</a>, <a href="https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/hut/enforcement_provisions.htm">HUT penalty rules</a>, and <a href="https://www.tax.ny.gov/pay/interest/2026/">2026 NY interest rates</a>. Use <a href="https://www.tax.ny.gov/pay/file-pay.htm">New York’s official calculator</a> to confirm your payoff.</p></div></section>`;
}
export function lateChargeResults(optional = false) {
  return `<section id="late-results" ${optional ? 'hidden' : ''} aria-live="polite" style="margin-top:24px"><h3>Tax and late-payment breakdown</h3><div class="rows"><div class="row"><span>Unpaid tax</span><strong id="late-tax-result">—</strong></div><div class="row"><span>Estimated penalty</span><strong id="late-penalty">—</strong></div><div class="row"><span>Estimated interest</span><strong id="late-interest">—</strong></div><div class="row"><span>Estimated total</span><strong id="late-total">—</strong></div></div><p id="late-status"></p><a class="cta btn" href="https://nyhut.com/my-nyhut?utm_source=newyorkhut&utm_medium=tool&utm_campaign=mt903&utm_content=late-charge-estimate">Prepare your MT-903 at NYHUT.com →</a></section>`;
}
export function lateChargeScript(optional = false) {
  return `${hutLateChargesBrowserCode}
const lateTax=document.getElementById('late-tax'),lateDue=document.getElementById('late-due'),lateReceipt=document.getElementById('late-receipt'),lateEnabled=document.getElementById('late-enabled');
function updateLateCharges(){
 const enabled=${optional ? 'lateEnabled.checked' : 'true'};
 document.getElementById('late-fields').hidden=!enabled;document.getElementById('late-results').hidden=!enabled;
 if(!enabled)return;
 const fallback=${optional ? "(()=>{const selected=rateFor(Number(g.value));const mileage=Number(m.value);return g.value&&m.value&&Number.isInteger(Number(g.value))&&selected&&Number.isFinite(mileage)&&mileage>=0?selected.rate*mileage:NaN})()" : 'NaN'};
 const tax=lateTax.value.trim()===''?fallback:Number(lateTax.value);
 const result=calculateHutLateCharges(tax,lateDue.value,lateReceipt.value);
 const display=value=>typeof value==='number'&&Number.isFinite(value)?value.toLocaleString('en-US',{style:'currency',currency:'USD'}):'—';
 document.getElementById('late-tax-result').textContent=display(result.tax);
 document.getElementById('late-penalty').textContent=display(result.penalty);
 document.getElementById('late-interest').textContent=result.interest===null?'Unavailable':display(result.interest);
 document.getElementById('late-total').textContent=display(result.total);
 document.getElementById('late-status').textContent=result.error||(result.months===0?'No late charges for the entered dates and tax.':result.months+' month(s) or parts late; '+result.days+' interest day(s). Final amount depends on actual state receipt.');
}
[lateTax,lateDue,lateReceipt${optional ? ',lateEnabled,g,m,p' : ''}].forEach(input=>{input.addEventListener('input',updateLateCharges);input.addEventListener('change',updateLateCharges)});
updateLateCharges();`;
}
