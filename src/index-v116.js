import site from './index-v115.js';

const VERSION = 'v116';
const FEATURE = 'ny-hut-axle-count-guidance-v116';
const GUIDE = '/ny-hut-axle-count';

function pathOf(request) {
  return new URL(request.url).pathname.replace(/\/+$/, '') || '/';
}

function guidePage() {
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>How Many Axles Do I Count for NY HUT? | NewYorkHUT.com</title><meta name="description" content="Understand axle count for New York HUT, OSCAR and related vehicle-registration questions, including tractor axles versus combined tractor-and-trailer axles."><link rel="canonical" href="https://newyorkhut.com${GUIDE}"><meta property="og:title" content="How Many Axles Do I Count for NY HUT?"><meta property="og:description" content="A practical guide to tractor/truck axle count versus combined tractor-and-trailer axle count in New York credentialing systems."><meta property="og:url" content="https://newyorkhut.com${GUIDE}"><meta property="og:type" content="article"><style>:root{font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#14283d}*{box-sizing:border-box}body{margin:0;line-height:1.65;background:#fff}.w{width:min(960px,calc(100% - 36px));margin:auto}header{border-bottom:1px solid #d7e3ed}.nav{min-height:70px;display:flex;align-items:center;justify-content:space-between;gap:16px}.nav a{color:#176dcc;text-decoration:none;font-weight:750}.brand{font-size:1.25rem;color:#082b4c!important}.hero{padding:48px 0;background:#f5f9fc}h1{font-size:clamp(2rem,5vw,3.3rem);line-height:1.08;margin:0 0 15px;color:#082b4c}h2{color:#082b4c;margin-top:30px}.lead{font-size:1.1rem;max-width:800px;color:#435d75}.section{padding:34px 0}.answer{border-left:5px solid #176dcc;background:#f3f8fc;padding:18px 20px;border-radius:8px}.grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}.card{border:1px solid #d7e3ed;border-radius:12px;padding:20px}.example{background:#fbfcfd;border:1px solid #d7e3ed;border-radius:10px;padding:16px;margin:12px 0}.note{background:#fff8e6;border:1px solid #ead39a;border-radius:10px;padding:16px}.sources{font-size:.94rem;color:#526b80}.sources a{color:#176dcc}.cta{display:inline-block;margin-top:12px;padding:11px 16px;border-radius:8px;background:#176dcc;color:#fff;text-decoration:none;font-weight:800}@media(max-width:700px){.grid{grid-template-columns:1fr}.nav{display:block;padding:14px 0}}</style><script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@type':'Article',headline:'How Many Axles Do I Count for NY HUT?',mainEntityOfPage:`https://newyorkhut.com${GUIDE}`,publisher:{'@type':'Organization',name:'NewYorkHUT.com'}})}</script></head><body><header><div class="w nav"><a class="brand" href="/">NewYorkHUT.com</a><div><a href="/new-york-hut-guide">HUT Guide</a> &nbsp; <a href="/ny-hut-weight-requirements">Weight Requirements</a> &nbsp; <a href="/ny-hut-faq">FAQ</a></div></div></header><main><section class="hero"><div class="w"><h1>How many axles do I count for a New York HUT application?</h1><p class="lead">The confusion usually comes from mixing three different concepts: HUT eligibility, the vehicle's own axle count, and the combined axle count when a truck or tractor pulls a trailer.</p></div></section><section class="section"><div class="w"><div class="answer"><strong>Short answer:</strong> If a New York credentialing screen asks for <strong>Axles</strong>, count the axles on the truck or tractor itself. If it separately asks for <strong>Combined Axles</strong>, count the truck/tractor axles <strong>plus</strong> the axles on the trailer it may pull. Do not automatically enter the tractor-trailer total in a field that asks only for the vehicle's axles.</div><h2>Why this gets confusing</h2><p>New York HUT itself is principally a weight-based tax and credential requirement. The current paper TMT-1 vehicle schedule asks for vehicle type, VIN, fuel, make, year, unloaded weight, gross weight, ownership and plate information; it does not contain a separate axle-count column. Axle questions can appear in related New York online credentialing or registration workflows, so it is important to read the exact field label.</p><div class="grid"><div class="card"><h2>Axles</h2><p>Count only the axles physically on the <strong>power unit</strong>—the truck or tractor being identified.</p><p><strong>Typical road tractor:</strong> steering axle + two rear drive axles = <strong>3 axles</strong>.</p></div><div class="card"><h2>Combined Axles</h2><p>Count the power-unit axles plus the axles on the trailer the vehicle will pull.</p><p><strong>Typical combination:</strong> 3-axle tractor + 2-axle semitrailer = <strong>5 combined axles</strong>.</p></div></div><h2>Common examples</h2><div class="example"><strong>3-axle tractor pulling a 2-axle semitrailer:</strong><br>Axles = <strong>3</strong><br>Combined Axles = <strong>5</strong></div><div class="example"><strong>2-axle straight truck, no trailer:</strong><br>Axles = <strong>2</strong><br>Combined Axles, if the field is required and no trailer is pulled = <strong>2</strong></div><div class="example"><strong>3-axle straight truck pulling a 2-axle trailer:</strong><br>Axles = <strong>3</strong><br>Combined Axles = <strong>5</strong></div><div class="note"><strong>Important distinction:</strong> Do not use the IFTA axle rule as the rule for deciding whether a vehicle needs HUT. New York's HUT registration thresholds are based on gross or unloaded weight, depending on the carrier's elected HUT method. IFTA separately defines qualified motor vehicles using power-unit axle and weight criteria, including three or more axles regardless of weight.</div><h2>What should I enter if I am unsure?</h2><p>Use the vehicle's actual physical configuration. For an <strong>Axles</strong> field, count the power unit only. For <strong>Combined Axles</strong>, add the trailer axles. If the screen uses different wording or the equipment has a lift axle, tag axle, unusual trailer configuration, or multiple trailers, verify the requested definition before submitting rather than guessing.</p><p>For HUT eligibility questions, see our <a href="/ny-hut-weight-requirements">NY HUT weight requirements</a> and <a href="/who-needs-ny-hut">who needs NY HUT</a> guides.</p><h2>Official-source basis</h2><p class="sources">New York DMV's OSCAR/IRP training specifically instructs applicants that “Axles” means the number of axles on the tractor/truck only, while “Combined Axles” means the tractor/truck plus the trailer. New York Tax Department HUT materials separately describe HUT credential requirements by gross/unloaded weight, and the current TMT-1 vehicle schedule does not ask for axle count.</p><p><a class="cta" href="https://nyhut.com/ny-hut-permit?utm_source=newyorkhut.com&utm_medium=referral&utm_campaign=authority_site&utm_content=axle-count-guide">Need NY HUT permit service? Review the NYHUT.com permit service →</a></p></div></section></main></body></html>`;
  return new Response(html,{status:200,headers:{'content-type':'text/html; charset=utf-8','cache-control':'public, max-age=300','x-newyorkhut-version':VERSION,'x-newyorkhut-feature':FEATURE}});
}

function addContextLink(html) {
  if (html.includes(`href="${GUIDE}"`)) return html;
  const block = `<aside style="width:min(960px,calc(100% - 36px));margin:24px auto;padding:16px 18px;border:1px solid #d7e3ed;border-radius:10px;background:#f7fafc"><strong>Axle-count question?</strong> If you are unsure whether to count the tractor only or the tractor and trailer, see <a href="${GUIDE}">How many axles do I count for NY HUT?</a></aside>`;
  return html.replace(/<\/main>/i, `${block}</main>`);
}

function addToSitemap(xml) {
  if (xml.includes(`${GUIDE}</loc>`)) return xml;
  const entry = `<url><loc>https://newyorkhut.com${GUIDE}</loc></url>`;
  return xml.replace(/<\/urlset>/i, `${entry}</urlset>`);
}

export default {
  async fetch(request, env, ctx) {
    const path = pathOf(request);
    if (path === GUIDE) return guidePage();
    const response = await site.fetch(request, env, ctx);
    const headers = new Headers(response.headers);
    headers.set('x-newyorkhut-version', VERSION);
    headers.set('x-newyorkhut-feature', FEATURE);
    const type = headers.get('content-type') || '';
    if (path === '/sitemap.xml' && type.includes('xml')) {
      const xml = addToSitemap(await response.text());
      const count = (xml.match(/<url>/g) || []).length;
      headers.set('x-sitemap-url-count', String(count));
      return new Response(xml,{status:response.status,statusText:response.statusText,headers});
    }
    if (response.status === 200 && type.includes('text/html') && ['/ny-hut-weight-requirements','/ny-hut-registration-guide','/ny-hut-faq','/new-york-hut-guide'].includes(path)) {
      return new Response(addContextLink(await response.text()),{status:response.status,statusText:response.statusText,headers});
    }
    return new Response(response.body,{status:response.status,statusText:response.statusText,headers});
  }
};
