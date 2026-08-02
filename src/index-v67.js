import site from './index-v66.js';

const VERSION='v67';
const ORDER='https://www.nyhut.com/';
const CENTER='/ask-hut-ai';

const KNOWLEDGE=[
  {
    keys:['need hut','needs hut','permit required','over 18000','weight threshold','out of state','qualify'],
    title:'Does this vehicle need New York HUT registration?',
    answer:'A truck, tractor, or other self-propelled vehicle generally needs HUT registration before operating on New York public highways when the applicable gross-weight or unloaded-weight threshold is exceeded and no exclusion or exemption applies. Interstate registration, IFTA, IRP, or a USDOT number does not replace HUT.',
    guides:[['Who Needs a New York HUT Permit?','/learn/who-needs-a-new-york-hut-permit'],['Excluded Vehicles','/learn/new-york-hut-excluded-vehicles'],['Exempt Vehicles','/learn/new-york-hut-exempt-vehicles']],
    tools:[['Permit Requirement Wizard','/tools/hut-permit-requirement']],
    workflow:['Start HUT registration in NYHUT',ORDER],
    source:['Official HUT overview','https://www.tax.ny.gov/bus/hut/huidx.htm']
  },
  {
    keys:['register','registration','oscar','tmt-1','tmt 1','tmt-39','tmt 39','new account'],
    title:'How do I register for New York HUT?',
    answer:'Gather the exact legal entity information, taxpayer identification, USDOT number, physical and mailing addresses, record location, and vehicle VIN, plate, ownership, type, fuel, and registered weight. New York supports OSCAR and paper registration paths; the correct form depends on whether the carrier is establishing an online account or requesting paper credentials.',
    guides:[['How to Register for HUT','/learn/how-to-register-for-new-york-hut'],['Common Registration Mistakes','/learn/common-hut-registration-mistakes'],['TMT-1 Form Guide','/forms/tmt-1'],['TMT-39 Form Guide','/forms/tmt-39']],
    tools:[['Permit Requirement Wizard','/tools/hut-permit-requirement']],
    workflow:['Complete registration in NYHUT',ORDER],
    source:['OSCAR registration information','https://www.tax.ny.gov/bus/ads/oscar.htm']
  },
  {
    keys:['certificate','decal','sticker','lost certificate','lost decal','replacement','duplicate','tmt-334'],
    title:'Certificate, decal, or replacement credential guidance',
    answer:'HUT certificates and decals are vehicle-specific and nontransferable. Verify the VIN, plate, weight, and carrier information immediately. Lost, damaged, or destroyed credentials should be replaced through OSCAR or the applicable replacement process; do not create an unofficial copy or move another vehicle’s decal.',
    guides:[['Certificate of Registration','/learn/new-york-hut-certificate-of-registration'],['HUT Decals Explained','/learn/new-york-hut-decals-explained'],['Lost Certificate','/learn/lost-hut-certificate'],['Lost or Damaged Decal','/learn/lost-or-damaged-hut-decal'],['TMT-334 Guide','/forms/tmt-334']],
    tools:[],
    workflow:['Manage the vehicle credential in NYHUT',ORDER],
    source:['Official decal guidance','https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/hut/decals.htm']
  },
  {
    keys:['temporary','trip permit','first trip','72 hour','pending permit'],
    title:'Temporary HUT and first-trip questions',
    answer:'Do not assume an application receipt or pending permanent credential authorizes New York operation. Confirm that a valid temporary credential is available for the exact carrier, vehicle, and operating dates before the trip, and complete the permanent registration and filing setup promptly when ongoing operation is planned.',
    guides:[['Temporary Permits and First-Trip Questions','/learn/temporary-hut-permits-and-first-trip-questions'],['Who Needs HUT?','/learn/who-needs-a-new-york-hut-permit']],
    tools:[['Permit Requirement Wizard','/tools/hut-permit-requirement']],
    workflow:['Start the correct permit workflow in NYHUT',ORDER],
    source:['Official HUT registration overview','https://www.tax.ny.gov/bus/hut/huidx.htm']
  },
  {
    keys:['gvw','gross weight','rate','tax estimate','per mile','weight change','how much tax'],
    title:'How weight affects HUT rates and tax',
    answer:'Under the gross-weight method, the HUT rate generally increases with the registered gross-weight bracket. Use the weight shown on the HUT credential, the applicable current MT-903 rate table, and taxable New York mileage. A vehicle weight change may require a credential update before the new rate treatment is used.',
    guides:[['How GVW Affects HUT Tax','/learn/how-gvw-affects-your-hut-tax'],['Changing GVW','/learn/changing-gvw-on-a-new-york-hut-vehicle'],['MT-903-I Guide','/forms/mt-903-i']],
    tools:[['HUT Rate Lookup','/tools/hut-rate-lookup'],['HUT Tax Estimator','/tools/hut-tax-estimator']],
    workflow:['Manage the vehicle weight in NYHUT',ORDER],
    source:['Current MT-903 instructions','https://www.tax.ny.gov/forms/current-forms/motor/mt903i.htm']
  },
  {
    keys:['mt-903','mt903','file return','quarterly','filing frequency','deadline','no activity','zero miles','amended','final return'],
    title:'MT-903 filing requirements and deadlines',
    answer:'A carrier issued HUT credentials generally must file the assigned MT-903 returns, including periods with no tax due or no activity when a return remains required. Use one reporting method for the calendar year, reconcile vehicle-level mileage, and correctly mark amended, final, or no-activity returns.',
    guides:[['What Is Form MT-903?','/learn/what-is-form-mt-903'],['Who Must File?','/learn/who-must-file-mt-903'],['Filing Deadlines and Frequency','/learn/mt-903-filing-deadlines-and-frequency'],['Amended, Final, and No-Activity Returns','/learn/amended-final-and-no-activity-mt-903-returns'],['MT-903 Form Guide','/forms/mt-903']],
    tools:[['MT-903 Due Date Calculator','/tools/mt903-due-date']],
    workflow:['Open the MT-903 workflow in NYHUT',ORDER],
    source:['Official MT-903 instructions','https://www.tax.ny.gov/forms/current-forms/motor/mt903i.htm']
  },
  {
    keys:['taxable miles','thruway','mileage','records','recordkeeping','eld','gps','trip sheet','toll'],
    title:'Taxable mileage and HUT recordkeeping',
    answer:'Maintain daily vehicle-level records that support every return entry, including dates, routes, beginning and ending points, odometer or hubometer readings, New York miles, toll-paid Thruway miles, and corroborating ELD, GPS, toll, fuel, dispatch, lease, and ownership records. Quarterly totals alone are not enough.',
    guides:[['New York HUT Taxable Miles','/learn/new-york-hut-taxable-miles'],['HUT Records You Must Keep','/learn/hut-records-you-must-keep'],['Recordkeeping Requirements','/learn/hut-recordkeeping-requirements']],
    tools:[['HUT Tax Estimator','/tools/hut-tax-estimator']],
    workflow:['Organize vehicles and filing records in NYHUT',ORDER],
    source:['Official recordkeeping requirements','https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/hut/recordkeeping_requirements.htm']
  },
  {
    keys:['audit','auditor','audit notice','document request','assessment','respond to audit','audit checklist'],
    title:'How to prepare for or respond to a HUT audit',
    answer:'Read the notice immediately, calendar every response and protest deadline, preserve the complete audit-period record set, build a vehicle-by-quarter index, reconcile source data to each MT-903 return, and respond to proposed findings with specific documentation. Informal discussions do not replace a timely formal protest.',
    guides:[['How HUT Audits Work','/learn/new-york-hut-audits'],['Responding to a HUT Audit','/learn/how-to-respond-to-a-hut-audit'],['HUT Audit Checklist','/learn/hut-audit-checklist'],['Common Audit Findings','/learn/common-new-york-hut-audit-findings']],
    tools:[['Penalty Estimator','/tools/hut-penalty-estimator']],
    workflow:['Build the audit-period vehicle and filing file in NYHUT',ORDER],
    source:['Official New York audit process','https://www.tax.ny.gov/enforcement/audit/']
  },
  {
    keys:['penalty','interest','late payment','late filing','suspended','revoked','enforcement'],
    title:'HUT penalties, interest, and enforcement',
    answer:'Late returns, late payments, underreported tax, and unregistered operation can create separate tax, penalty, interest, civil-fine, and credential consequences. File missing returns promptly, correct registration problems before further operation, and use the rate for the exact interest period involved.',
    guides:[['New York HUT Penalties','/learn/new-york-hut-penalties'],['Audit and Enforcement Center','/audit-and-enforcement-center'],['Current Interest Rate Update','/news/hut-interest-rate-july-september-2026']],
    tools:[['HUT Penalty Estimator','/tools/hut-penalty-estimator']],
    workflow:['Identify filing gaps in NYHUT',ORDER],
    source:['Official enforcement provisions','https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/hut/enforcement_provisions.htm']
  },
  {
    keys:['farm','government vehicle','recreational','rv','dealer plate','transporter plate','household goods','special mobile','crane','road building','excluded','exempt'],
    title:'Is this vehicle exempt or excluded from HUT?',
    answer:'Excluded vehicles qualify because of their design and designed use; exempt vehicles qualify because of ownership, control, exclusive activity, plate status, personal use, or weight. Actual use controls. A nonqualifying use can trigger registration and tax consequences for the month.',
    guides:[['Exemptions and Special Vehicles Center','/exemptions-and-special-vehicles'],['Farm Vehicle Exemption','/learn/new-york-hut-farm-vehicle-exemption'],['Government Vehicle Exemption','/learn/government-vehicle-hut-exemption'],['Recreational Vehicle Exemption','/learn/recreational-vehicle-hut-exemption'],['Special Mobile Equipment','/learn/special-mobile-equipment-and-road-building-machines']],
    tools:[['Permit Requirement Wizard','/tools/hut-permit-requirement']],
    workflow:['Classify and manage the vehicle in NYHUT',ORDER],
    source:['Official excluded and exempt vehicle bulletin','https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/hut/excluded_and_exempt_vehicles.htm']
  },
  {
    keys:['form','which form','current form','mt-903-mn','historical form','tmt-39','tmt-334','dtf-406','mt-370'],
    title:'Which New York HUT form should I use?',
    answer:'Use the official current form index and the matching current instructions. MT-903 is the current HUT return; MT-903-MN is historical. TMT-1 and TMT-39 serve different registration paths, TMT-334 handles replacement credentials, DTF-406 claims a refund, and MT-370.1 or MT-370.2 addresses tax clearance.',
    guides:[['HUT Forms Library','/forms-library'],['MT-903 Guide','/forms/mt-903'],['MT-903-MN Historical Guide','/forms/mt-903-mn'],['TMT-1 Guide','/forms/tmt-1'],['TMT-39 Guide','/forms/tmt-39']],
    tools:[],
    workflow:['Move from the form to the NYHUT workflow',ORDER],
    source:['Official HUT form index','https://www.tax.ny.gov/forms/highway_use_fuel_use_tax.htm']
  },
  {
    keys:['buying truck','selling truck','transfer truck','tax clearance','mt-370.1','mt-370.2','sold vehicle'],
    title:'Buying, selling, or transferring a HUT-permitted truck',
    answer:'The seller’s certificate and decal do not transfer. The seller should cancel the vehicle, remove and surrender the decal as required, and report final mileage. A buyer should obtain the applicable tax clearance before completing the purchase and must obtain a new credential under the buyer’s own account.',
    guides:[['Selling or Transferring a Truck','/learn/selling-or-transferring-a-new-york-hut-permitted-truck'],['Buying a Truck','/learn/buying-a-truck-and-new-york-hut'],['MT-370.1 Guide','/forms/mt-370-1'],['MT-370.2 Guide','/forms/mt-370-2']],
    tools:[],
    workflow:['Add the buyer’s vehicle in NYHUT',ORDER],
    source:['Official tax-clearance guidance','https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/hut/certificate_of_registration.htm']
  },
  {
    keys:['ifta','fuel tax','ifta decal','ifta return'],
    title:'Does IFTA replace New York HUT?',
    answer:'No. IFTA is a multijurisdictional fuel-use tax program. HUT is a separate New York highway-use tax and credential program. A carrier may need both, along with separate mileage and fuel records and separate returns.',
    guides:[['IFTA Compliance for New York Carriers','/learn/ifta-compliance-for-new-york-carriers'],['Carrier Compliance Center','/carrier-compliance-center']],
    tools:[['HUT Permit Wizard','/tools/hut-permit-requirement']],
    workflow:['Manage the New York HUT portion in NYHUT',ORDER],
    source:['Official New York IFTA guidance','https://www.tax.ny.gov/bus/ifta/fuel.htm']
  },
  {
    keys:['irp','apportioned plate','cab card','apportioned registration'],
    title:'How IRP relates to HUT',
    answer:'IRP apportions vehicle registration fees across member jurisdictions and provides an apportioned plate and cab card. It does not replace HUT, IFTA, HVUT, UCR, or federal operating authority. The vehicle data and registered weights should be consistent across systems.',
    guides:[['IRP Apportioned Registration','/learn/irp-apportioned-registration'],['Commercial Vehicle Registration Checklist','/learn/commercial-vehicle-registration-checklist']],
    tools:[],
    workflow:['Coordinate the vehicle’s HUT record in NYHUT',ORDER],
    source:['Official New York IRP guidance','https://dmv.ny.gov/business/apply-for-the-international-registration-plan-irp']
  },
  {
    keys:['2290','hvut','heavy vehicle use tax','schedule 1','55,000'],
    title:'Federal Form 2290 and HUT are different',
    answer:'Form 2290 reports federal Heavy Highway Vehicle Use Tax for vehicles meeting the federal taxable-weight threshold. HUT is a separate New York mileage-based program. A stamped Schedule 1 may be needed for vehicle registration, but it is not a HUT certificate or return.',
    guides:[['Form 2290 Heavy Vehicle Use Tax','/learn/form-2290-heavy-vehicle-use-tax'],['Commercial Vehicle Registration Checklist','/learn/commercial-vehicle-registration-checklist']],
    tools:[],
    workflow:['Manage the separate HUT credential in NYHUT',ORDER],
    source:['IRS Form 2290 instructions','https://www.irs.gov/instructions/i2290']
  },
  {
    keys:['ucr','unified carrier registration','annual registration'],
    title:'Unified Carrier Registration and HUT',
    answer:'UCR is an annual federal-state registration and fee program for many interstate carriers and related entities. It does not replace HUT registration, returns, permits, or vehicle decals.',
    guides:[['Unified Carrier Registration','/learn/unified-carrier-registration-ucr'],['Carrier Compliance Calendar','/learn/trucking-compliance-calendar']],
    tools:[],
    workflow:['Maintain New York HUT separately in NYHUT',ORDER],
    source:['Official UCR Plan','https://plan.ucr.gov/']
  },
  {
    keys:['usdot','fmcsa','operating authority','biennial update','mcs-150'],
    title:'FMCSA registration and HUT use different records',
    answer:'A USDOT number identifies the carrier for federal safety oversight, while operating authority may be required for regulated for-hire interstate activity. HUT is separate. Keep the carrier legal name, address, USDOT number, and vehicle information consistent across FMCSA, New York HUT, IRP, and other programs.',
    guides:[['FMCSA and USDOT Compliance','/learn/fmcsa-registration-and-usdot-compliance'],['Commercial Vehicle Registration Checklist','/learn/commercial-vehicle-registration-checklist']],
    tools:[],
    workflow:['Match the carrier and vehicle data in NYHUT',ORDER],
    source:['Official FMCSA registration page','https://www.fmcsa.dot.gov/registration']
  },
  {
    keys:['calendar','renewal dates','compliance deadline','annual compliance'],
    title:'Build a carrier compliance calendar',
    answer:'Combine HUT and IFTA filing periods with UCR, HVUT first-use deadlines, IRP and registration expirations, FMCSA biennial updates, and vehicle-specific credential dates. Track preparation dates, owners, proof of completion, and exceptions—not only due dates.',
    guides:[['Carrier Compliance Calendar','/learn/trucking-compliance-calendar'],['Carrier Compliance Center','/carrier-compliance-center'],['MT-903 Filing Deadlines','/learn/mt-903-filing-deadlines-and-frequency']],
    tools:[['MT-903 Due Date Calculator','/tools/mt903-due-date']],
    workflow:['Track the HUT portion in NYHUT',ORDER],
    source:['Current HUT filing guidance','https://www.tax.ny.gov/bus/hut/webfile.htm']
  },
  {
    keys:['bulletin update','march 2026','new bulletin','regulatory update'],
    title:'Current HUT bulletin updates',
    answer:'Multiple New York HUT bulletin pages show a March 26, 2026 update date. Use the live bulletin pages and current form instructions rather than saved copies, and do not assume a page refresh necessarily changed every underlying legal rule.',
    guides:[['March 2026 Bulletin Update','/news/hut-tax-bulletins-updated-march-2026'],['News and Regulatory Center','/news-and-regulatory-center']],
    tools:[],
    workflow:['Apply the current requirement in NYHUT',ORDER],
    source:['Official HUT resources','https://www.tax.ny.gov/bus/hut/huidx.htm']
  },
  {
    keys:['repeal','a25','s345','hut going away','abolish hut'],
    title:'Has New York repealed the Highway Use Tax?',
    answer:'No. A25 and S345 propose repeal, but as of August 2, 2026 both remain in committee and have not become law. Current registration, filing, payment, recordkeeping, and enforcement requirements remain in effect.',
    guides:[['HUT Repeal Bills A25 and S345','/news/new-york-hut-repeal-bills-a25-s345'],['Who Needs HUT?','/learn/who-needs-a-new-york-hut-permit']],
    tools:[['Permit Requirement Wizard','/tools/hut-permit-requirement']],
    workflow:['Continue current HUT compliance in NYHUT',ORDER],
    source:['Official A25 bill status','https://www.nysenate.gov/legislation/bills/2025/A25']
  }
];

const CSS=`<style>
:root{--n:#082b4c;--b:#1768c5;--l:#d7e3ed;--m:#536b82;--p:#f3f8fc;--g:#edf9f3;--y:#fff8df;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}*{box-sizing:border-box}body{margin:0;color:#13263a;line-height:1.62;background:#fff}.w{width:min(1160px,calc(100% - 40px));margin:auto}header{background:#fff;border-bottom:1px solid var(--l);position:sticky;top:0;z-index:100}.nav{min-height:76px;display:flex;align-items:center;justify-content:space-between;gap:18px}.brand{font-weight:950;color:var(--n);text-decoration:none}.links{display:flex;gap:9px;flex-wrap:wrap}.links a{padding:9px 12px;border:1px solid #b8cad9;border-radius:10px;text-decoration:none;color:var(--n);font-weight:850}.links .order{background:var(--b);color:#fff;border-color:var(--b)}.crumbs{padding:14px 0;font-size:.88rem}.crumbs a{color:var(--b);font-weight:800;text-decoration:none}.hero{padding:58px 0 46px;background:linear-gradient(135deg,#fbfdff,#eaf4fc)}.eyebrow{font-size:.76rem;text-transform:uppercase;letter-spacing:.1em;font-weight:950;color:var(--b)}h1{font-size:clamp(2.4rem,5vw,4.2rem);line-height:1.02;letter-spacing:-.04em;color:var(--n);margin:10px 0 16px}.lead{max-width:940px;color:#496078;font-size:1.1rem}.section{padding:46px 0 72px}.layout{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(300px,.9fr);gap:24px;align-items:start}.panel,.card{border:1px solid var(--l);border-radius:20px;padding:24px;background:#fff;box-shadow:0 10px 34px rgba(8,43,76,.06)}.panel h2,.card h2,.card h3{color:var(--n)}.field label{display:block;font-weight:900;color:var(--n);margin-bottom:8px}.field textarea{width:100%;min-height:130px;padding:15px;border:1px solid #aac0d3;border-radius:12px;font:inherit}.chips{display:flex;gap:8px;flex-wrap:wrap;margin:14px 0}.chip{border:1px solid #b8cad9;background:#fff;color:var(--n);border-radius:999px;padding:9px 12px;font:inherit;font-weight:800;cursor:pointer}.btn{display:inline-flex;align-items:center;justify-content:center;padding:12px 16px;border:0;border-radius:10px;background:var(--b);color:#fff;text-decoration:none;font:inherit;font-weight:900;cursor:pointer}.secondary{background:#fff;color:var(--b);border:1px solid var(--b)}.answer{margin-top:20px;background:var(--g);border:1px solid #b9dfcf}.answer[hidden]{display:none}.answer p{color:#335b4a}.answer-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-top:18px}.answer-box{background:#fff;border:1px solid #cfe0d7;border-radius:14px;padding:16px}.answer-box h3{margin-top:0}.answer-box a{display:block;color:var(--b);font-weight:850;text-decoration:none;margin:7px 0}.workflow{margin-top:18px;padding:18px;border-radius:14px;background:var(--n);color:#fff}.workflow h3,.workflow p{color:#fff}.notice{background:var(--y);border-left:4px solid #e2a500;padding:15px;border-radius:8px;margin-top:18px}.centers{display:grid;gap:10px}.centers a{padding:12px;border:1px solid var(--l);border-radius:12px;text-decoration:none;color:var(--n);font-weight:850}.review{margin-top:24px;color:var(--m);font-size:.9rem}@media(max-width:900px){.layout,.answer-grid{grid-template-columns:1fr}.nav{display:block;padding:12px 0}.brand{display:block;margin-bottom:10px}.links{display:grid;grid-template-columns:repeat(2,1fr)}.links a{text-align:center}.links .order{grid-column:1/-1}}@media(max-width:620px){.w{width:min(100% - 24px,1160px)}}
</style>`;

const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
function page(){
  const schema=JSON.stringify({'@context':'https://schema.org','@graph':[
    {'@type':'Organization','@id':'https://newyorkhut.com/#org',name:'NewYorkHUT.com',url:'https://newyorkhut.com/'},
    {'@type':'WebSite','@id':'https://newyorkhut.com/#website',name:'NewYorkHUT.com',url:'https://newyorkhut.com/'},
    {'@type':'WebApplication','@id':'https://newyorkhut.com/ask-hut-ai#app',name:'Ask HUT AI',applicationCategory:'BusinessApplication',operatingSystem:'Web',url:'https://newyorkhut.com/ask-hut-ai',description:'Interactive New York Highway Use Tax knowledge assistant.'},
    {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:'https://newyorkhut.com/'},{'@type':'ListItem',position:2,name:'Ask HUT AI',item:'https://newyorkhut.com/ask-hut-ai'}]}
  ]});
  const data=JSON.stringify(KNOWLEDGE);
  const centers=[
    ['/hut-registration-center','HUT Registration Center'],
    ['/mt-903-filing-center','MT-903 Filing Center'],
    ['/vehicle-lifecycle','Vehicle Lifecycle Center'],
    ['/audit-and-enforcement-center','Audit & Enforcement Center'],
    ['/exemptions-and-special-vehicles','Exemptions & Special Vehicles'],
    ['/forms-library','HUT Forms Library'],
    ['/carrier-compliance-center','Carrier Compliance Center'],
    ['/news-and-regulatory-center','News & Regulatory Center']
  ];
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Ask HUT AI | New York Highway Use Tax Guidance</title><meta name="description" content="Ask New York HUT questions and receive guidance connected to official sources, related guides, free tools, and NYHUT workflows."><link rel="canonical" href="https://newyorkhut.com/ask-hut-ai"><meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"><meta property="og:type" content="website"><meta property="og:site_name" content="NewYorkHUT.com"><meta property="og:title" content="Ask HUT AI | New York Highway Use Tax Guidance"><meta property="og:description" content="Interactive guidance connected to NewYorkHUT.com guides, tools, official sources, and NYHUT workflows."><meta property="og:url" content="https://newyorkhut.com/ask-hut-ai"><meta name="twitter:card" content="summary_large_image"><script type="application/ld+json">${schema}</script>${CSS}</head><body><header><div class="w nav"><a class="brand" href="/">NewYorkHUT.com</a><nav class="links"><a href="/learn">Learn</a><a href="/tools">Tools</a><a href="/forms-library">Forms</a><a href="/news-and-regulatory-center">News</a><a href="/ask-hut-ai">Ask HUT AI</a><a class="order" href="${ORDER}">Go to NYHUT</a></nav></div></header><div class="w crumbs"><a href="/">Home</a> › <strong>Ask HUT AI</strong></div><main><section class="hero"><div class="w"><div class="eyebrow">Knowledge-base-driven HUT guidance</div><h1>Ask HUT AI</h1><p class="lead">Ask a New York Highway Use Tax question in plain language. The answer connects you to the most relevant guide, free tool, official source, and NYHUT workflow.</p></div></section><section class="section"><div class="w"><div class="layout"><div><section class="panel"><div class="field"><label for="question">Your HUT question</label><textarea id="question" placeholder="Example: I bought a used truck with a HUT decal. Can I use the seller’s credential?"></textarea></div><div class="chips"><button class="chip">Do I need HUT?</button><button class="chip">When is MT-903 due?</button><button class="chip">What records do I keep?</button><button class="chip">Has HUT been repealed?</button><button class="chip">Does IFTA replace HUT?</button><button class="chip">How do I respond to an audit?</button></div><button class="btn" id="ask">Get HUT guidance</button><article class="card answer" id="answer" hidden aria-live="polite"></article></section><div class="notice"><strong>Privacy:</strong> Do not enter FEINs, SSNs, HUT account numbers, payment information, passwords, or other sensitive data. Ask HUT AI provides educational guidance, not legal or tax advice.</div></div><aside class="card"><div class="eyebrow">Browse by center</div><h2>HUT Knowledge Centers</h2><div class="centers">${centers.map(([u,n])=>`<a href="${u}">${n} →</a>`).join('')}</div><div class="review"><strong>Knowledge reviewed:</strong> August 2, 2026</div></aside></div></div></section></main><script>(()=>{const data=${data},q=document.getElementById('question'),out=document.getElementById('answer');document.querySelectorAll('.chip').forEach(b=>b.onclick=()=>{q.value=b.textContent;run()});document.getElementById('ask').onclick=run;q.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key==='Enter')run()});const params=new URLSearchParams(location.search);if(params.get('q')){q.value=params.get('q');setTimeout(run,0)}function score(item,s){let total=0;for(const k of item.keys){if(s.includes(k))total+=k.includes(' ')?4:2;for(const word of k.split(/\s+/)){if(word.length>3&&s.includes(word))total+=.35}}return total}function links(items){return items&&items.length?items.map(x=>'<a href="'+x[1]+'">'+x[0]+' →</a>').join(''):'<p>No additional link required.</p>'}function run(){const s=q.value.toLowerCase().trim();if(!s){out.hidden=false;out.innerHTML='<h2>Enter a question first.</h2>';return}let best=null,bestScore=0;for(const item of data){const n=score(item,s);if(n>bestScore){bestScore=n;best=item}}if(!best){best={title:'Start with the HUT requirement and knowledge centers',answer:'This question needs more specific vehicle, operation, filing-period, or notice details. Start with the Permit Requirement Wizard or browse the relevant knowledge center. Do not include sensitive account information.',guides:[['Who Needs HUT?','/learn/who-needs-a-new-york-hut-permit'],['HUT Registration Center','/hut-registration-center'],['Carrier Compliance Center','/carrier-compliance-center']],tools:[['Permit Requirement Wizard','/tools/hut-permit-requirement']],workflow:['Open NYHUT',ORDER],source:['Official HUT overview','https://www.tax.ny.gov/bus/hut/huidx.htm']}}out.hidden=false;out.innerHTML='<div class="eyebrow">HUT AI guidance</div><h2>'+best.title+'</h2><p>'+best.answer+'</p><div class="answer-grid"><div class="answer-box"><h3>Related Guides</h3>'+links(best.guides)+'</div><div class="answer-box"><h3>Related Tools</h3>'+links(best.tools)+'</div><div class="answer-box"><h3>Official Source</h3><a target="_blank" rel="noopener" href="'+best.source[1]+'">'+best.source[0]+' →</a></div><div class="answer-box"><h3>Complete This Task</h3><a href="'+best.workflow[1]+'">'+best.workflow[0]+' →</a></div></div><div class="workflow"><h3>Important</h3><p>Verify current requirements and any deadline printed on an actual Tax Department notice before acting.</p></div>'}})();</script></body></html>`;
}

export default{
  async fetch(request,env,ctx){
    const url=new URL(request.url),path=url.pathname.replace(/\/+$/,'')||'/';
    if(path===CENTER||path==='/ask')return new Response(page(),{headers:{'content-type':'text/html; charset=utf-8','cache-control':'no-store','x-newyorkhut-version':VERSION,'x-newyorkhut-feature':'expanded-ask-hut-ai-v67','x-newyorkhut-knowledge-entries':String(KNOWLEDGE.length)}});
    return site.fetch(request,env,ctx);
  }
};
