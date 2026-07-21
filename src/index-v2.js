import site from "./index.js";

const ORDER_URL = "https://nyhut.com/";
const articles = [
  {
    slug: "what-is-new-york-hut",
    title: "What Is New York HUT?",
    metaTitle: "What Is New York HUT? Highway Use Tax Explained",
    metaDescription: "Learn what New York Highway Use Tax is, which credentials covered carriers receive, and how HUT fits into trucking compliance.",
    category: "Getting Started",
    summary: "A plain-language introduction to New York Highway Use Tax, HUT accounts, vehicle credentials, and continuing carrier responsibilities.",
    sections: [
      { heading: "New York Highway Use Tax explained", body: "New York Highway Use Tax, commonly called HUT, is a state tax and registration program that applies to certain motor vehicles operating on New York public highways. The program is administered by the New York State Department of Taxation and Finance." },
      { heading: "What a HUT credential does", body: "For covered operations, a carrier generally establishes a HUT account and obtains credentials for qualifying vehicles. A HUT credential identifies a vehicle as associated with a registered account. It does not replace operating authority, vehicle registration, insurance, IFTA, IRP, or other permits that may apply." },
      { heading: "Registration is only the beginning", body: "Carriers may also have filing, tax-payment, mileage-record, and credential-maintenance responsibilities after registration. Requirements can depend on vehicle weight, configuration, use, and exemptions." }
    ],
    related: ["who-needs-a-new-york-hut-permit", "how-to-get-a-new-york-hut-permit"]
  },
  {
    slug: "who-needs-a-new-york-hut-permit",
    title: "Who Needs a New York HUT Permit?",
    metaTitle: "Who Needs a New York HUT Permit? Eligibility Guide",
    metaDescription: "Review the vehicle weight, commercial operation, configuration, and exemption factors that affect New York HUT requirements.",
    category: "Eligibility",
    summary: "A practical screening guide for carriers determining whether a vehicle may require New York HUT credentials.",
    sections: [
      { heading: "Start with the vehicle", body: "New York HUT commonly applies to commercial carriers operating qualifying motor vehicles on New York public highways. The analysis should begin with the vehicle and its operation, not merely the carrier's home state." },
      { heading: "Primary screening factors", items: ["Whether the vehicle will operate on New York public highways", "Whether the operation is commercial", "The vehicle's gross and unloaded weight", "The vehicle configuration and use", "Whether a specific exemption applies"] },
      { heading: "Out-of-state carriers", body: "A carrier does not have to be based in New York for HUT requirements to apply. A qualifying vehicle entering New York may still require credentials." }
    ],
    related: ["what-is-new-york-hut", "new-york-hut-weight-requirements"]
  },
  {
    slug: "new-york-hut-weight-requirements",
    title: "New York HUT Weight Requirements",
    metaTitle: "New York HUT Weight Requirements for Trucks",
    metaDescription: "Understand why gross weight, unloaded weight, and vehicle configuration matter when determining New York HUT requirements.",
    category: "Vehicle Requirements",
    summary: "An overview of the vehicle-weight information carriers should gather before screening or registering for HUT.",
    sections: [
      { heading: "Why weight matters", body: "Vehicle weight is a central part of New York HUT eligibility. Carriers should not rely only on one registration field, a door sticker, or a general fleet assumption." },
      { heading: "Information to gather", items: ["Registered gross weight", "Actual or declared gross weight", "Unloaded weight", "Number of axles and vehicle configuration", "Trailer use, when applicable"] },
      { heading: "Avoid incomplete information", body: "Incorrect weight information can lead to the wrong registration path or incomplete credentials. Use vehicle registration, title, manufacturer information, and the actual operating configuration when preparing an order." }
    ],
    related: ["who-needs-a-new-york-hut-permit", "how-to-get-a-new-york-hut-permit"]
  },
  {
    slug: "how-to-get-a-new-york-hut-permit",
    title: "How to Get a New York HUT Permit",
    metaTitle: "How to Get a New York HUT Permit: Step-by-Step",
    metaDescription: "Follow a practical process for preparing carrier and vehicle information and submitting a New York HUT registration request.",
    category: "Registration",
    summary: "A step-by-step registration guide covering service selection, carrier information, vehicle details, and secure submission.",
    sections: [
      { heading: "Choose the correct service", body: "Determine whether you need a first-time registration, temporary permit, vehicle addition, renewal, replacement, or account update." },
      { heading: "Gather carrier information", items: ["Legal business name and DBA", "Physical and mailing addresses", "Federal tax identification information", "USDOT number, when applicable", "Primary contact details"] },
      { heading: "Gather vehicle information", items: ["VIN, year, make, plate, and unit number", "Registered and gross weight", "Ownership and registration details"] },
      { heading: "Submit securely", body: "Use the secure NYHUT.com application for tax identification, payment, customer account access, and document delivery." }
    ],
    related: ["what-is-new-york-hut", "temporary-new-york-hut-permit-guide"]
  },
  {
    slug: "temporary-new-york-hut-permit-guide",
    title: "Temporary New York HUT Permit Guide",
    metaTitle: "Temporary New York HUT Permit Guide",
    metaDescription: "Learn when a temporary New York HUT permit may be needed and what information to prepare for a time-sensitive request.",
    category: "Temporary Permits",
    summary: "Guidance for carriers preparing a vehicle-specific temporary HUT permit request before entering New York.",
    sections: [
      { heading: "When temporary authority may be relevant", body: "A temporary HUT permit may be relevant when a qualifying vehicle must operate in New York before permanent credentials are available. Temporary authority is vehicle-specific and should be requested before the trip." },
      { heading: "Information to prepare", items: ["Carrier legal name and contact information", "Vehicle VIN, plate, state, year, and make", "Vehicle weight and configuration", "Expected New York operating date", "Existing HUT account information, if any"] },
      { heading: "Do not wait until after the trip", body: "A temporary permit should be requested before operation. Do not assume temporary authority will correct prior unregistered travel." }
    ],
    related: ["how-to-get-a-new-york-hut-permit", "new-york-hut-penalties-and-recordkeeping"]
  },
  {
    slug: "new-york-hut-penalties-and-recordkeeping",
    title: "New York HUT Penalties and Recordkeeping",
    metaTitle: "New York HUT Penalties, Filings and Recordkeeping",
    metaDescription: "Review why timely registration, accurate mileage records, filings, and credential maintenance matter for New York HUT compliance.",
    category: "Compliance",
    summary: "An overview of continuing HUT responsibilities and common compliance risks after vehicle credentials are issued.",
    sections: [
      { heading: "Compliance continues after registration", body: "HUT compliance does not end when a certificate is issued. Carriers may have continuing filing, tax-payment, mileage-record, and credential-maintenance responsibilities." },
      { heading: "Common risk areas", items: ["Operating before obtaining required credentials", "Using credentials assigned to another vehicle", "Failing to update fleet or account information", "Incomplete mileage and trip records", "Late or missing returns"] },
      { heading: "Maintain organized records", body: "Penalties, interest, assessments, or enforcement may result when requirements are not met. Maintain organized records by vehicle and reporting period." }
    ],
    related: ["what-is-new-york-hut", "temporary-new-york-hut-permit-guide"]
  }
];

const css = `:root{--navy:#082b4c;--blue:#1768c5;--blue2:#0e55aa;--gold:#f4b83f;--ink:#122033;--muted:#5b6b7e;--line:#dbe5ef;--soft:#f4f8fc;--success:#147a4f;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}*{box-sizing:border-box}body{margin:0;color:var(--ink);line-height:1.65}a{color:inherit}.wrap{width:min(1120px,calc(100% - 40px));margin:auto}.top{background:var(--navy);color:#d9e7f3;font-size:.9rem;padding:8px 0}.top strong{color:#fff}header{position:sticky;top:0;z-index:20;background:rgba(255,255,255,.97);border-bottom:1px solid var(--line)}nav{min-height:74px;display:flex;align-items:center;justify-content:space-between;gap:24px}.brand{display:flex;align-items:center;gap:11px;text-decoration:none;font-weight:900;font-size:1.2rem}.mark{width:41px;height:41px;border-radius:11px;background:linear-gradient(135deg,var(--navy),var(--blue));display:grid;place-items:center;color:#fff}.links{display:flex;align-items:center;gap:20px;font-weight:750;font-size:.93rem}.links a{text-decoration:none}.btn{display:inline-flex;align-items:center;justify-content:center;padding:12px 19px;border-radius:10px;text-decoration:none;font-weight:850;border:1px solid transparent}.primary{background:var(--blue);color:#fff}.light{border-color:#cad8e6;background:#fff;color:var(--navy)}.hero{background:linear-gradient(180deg,#f9fcff,#eef5fb);border-bottom:1px solid var(--line);padding:64px 0 52px}.eyebrow{color:var(--blue);font-size:.78rem;font-weight:900;text-transform:uppercase;letter-spacing:.1em;margin-bottom:14px}h1{font-size:clamp(2.5rem,5.5vw,4.6rem);line-height:1;letter-spacing:-.05em;color:var(--navy);max-width:900px;margin:0 0 20px}h2{font-size:clamp(1.65rem,3vw,2.3rem);line-height:1.15;color:var(--navy);margin:38px 0 12px}.lead{font-size:1.16rem;color:#4e6074;max-width:780px}.crumb{font-size:.88rem;color:var(--muted);margin-bottom:17px}.crumb a{color:var(--blue);text-decoration:none}section{padding:70px 0}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.card{border:1px solid var(--line);border-radius:16px;padding:25px;background:#fff;display:flex;flex-direction:column;box-shadow:0 8px 24px rgba(20,51,82,.05)}.card .cat{font-size:.76rem;font-weight:900;color:var(--blue);letter-spacing:.09em;text-transform:uppercase}.card h2{font-size:1.35rem;margin:12px 0 9px}.card p{color:var(--muted);flex:1}.card a{color:var(--blue);font-weight:850;text-decoration:none}.article{display:grid;grid-template-columns:minmax(0,760px) 280px;gap:55px;align-items:start}.content p,.content li{color:var(--muted);font-size:1.05rem}.content ul{padding-left:24px}.notice{border-left:4px solid var(--gold);background:#fff8e5;padding:18px 20px;border-radius:0 12px 12px 0;margin:32px 0}.side{position:sticky;top:100px;border:1px solid var(--line);border-radius:16px;padding:22px}.side h3{margin-top:0;color:var(--navy)}.side a{display:block;color:var(--blue);font-weight:750;text-decoration:none;margin:12px 0}.cta{background:linear-gradient(135deg,var(--navy),#164f83);color:#fff;border-radius:22px;padding:38px;margin-top:55px}.cta h2{color:#fff;margin:0 0 8px}.cta p{color:#d9e8f5}.cta .btn{background:#fff;color:var(--navy)}footer{background:#071d33;color:#aebed0;padding:42px 0 26px}footer a{color:#d4e0eb}.legal{border-top:1px solid rgba(255,255,255,.12);margin-top:22px;padding-top:20px;font-size:.85rem}@media(max-width:900px){.article{grid-template-columns:1fr}.side{position:static}.grid{grid-template-columns:1fr 1fr}.links a:not(.btn){display:none}}@media(max-width:620px){.wrap{width:min(100% - 26px,1120px)}.grid{grid-template-columns:1fr}.hero{padding:45px 0}h1{font-size:2.6rem}section{padding:52px 0}.brand{font-size:1rem}.links .btn{padding:10px 12px;font-size:.84rem}}`;

function header(){return `<div class="top"><div class="wrap"><strong>Independent New York HUT guidance for motor carriers</strong></div></div><header><nav class="wrap"><a class="brand" href="/"><span class="mark">NY</span><span>NewYorkHUT.com</span></a><div class="links"><a href="/services">Permits</a><a href="/learning-center">Learning Center</a><a href="/resources">Resources</a><a href="/tools">Tools</a><a class="btn primary" href="${ORDER_URL}">Start Permit</a></div></nav></header>`}
function footer(){return `<footer><div class="wrap"><strong>NewYorkHUT.com</strong><p>Carrier-focused education and private permit assistance for New York Highway Use Tax requirements.</p><a href="/contact">Contact</a><div class="legal">© ${new Date().getFullYear()} NewYorkHUT.com. Private service; not affiliated with or endorsed by New York State.</div></div></footer>`}
function layout({title,description,path,body,schema}){return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><meta name="description" content="${description}"><meta name="robots" content="index,follow"><link rel="canonical" href="https://newyorkhut.com${path}"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:type" content="article"><meta property="og:url" content="https://newyorkhut.com${path}"><meta name="theme-color" content="#082b4c"><style>${css}</style>${schema||""}</head><body>${header()}${body}${footer()}</body></html>`}
function articleCard(a){return `<article class="card"><div class="cat">${a.category}</div><h2>${a.title}</h2><p>${a.summary}</p><a href="/learning-center/${a.slug}">Read article →</a></article>`}
function learningIndex(){const schema=`<script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@type":"CollectionPage","name":"New York HUT Learning Center","url":"https://newyorkhut.com/learning-center","hasPart":articles.map(a=>({"@type":"Article","headline":a.title,"url":`https://newyorkhut.com/learning-center/${a.slug}`}))})}</script>`;return layout({title:"New York HUT Learning Center | NewYorkHUT.com",description:"Plain-language guides covering New York HUT eligibility, weight requirements, registration, temporary permits, penalties, and recordkeeping.",path:"/learning-center",schema,body:`<main><section class="hero"><div class="wrap"><div class="eyebrow">Learning Center</div><h1>Understand New York HUT before you operate.</h1><p class="lead">Practical guides organized around the questions carriers ask most often—from eligibility and vehicle weight to registration and continuing compliance.</p></div></section><section><div class="wrap grid">${articles.map(articleCard).join("")}</div></section></main>`})}
function articlePage(article){const related=article.related.map(slug=>articles.find(a=>a.slug===slug)).filter(Boolean);const schema=`<script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@type":"Article","headline":article.title,"description":article.metaDescription,"datePublished":"2026-07-21","dateModified":"2026-07-21","mainEntityOfPage":`https://newyorkhut.com/learning-center/${article.slug}`,"publisher":{"@type":"Organization","name":"NewYorkHUT.com","url":"https://newyorkhut.com/"}})}</script>`;const sections=article.sections.map(s=>`<section><h2>${s.heading}</h2>${s.body?`<p>${s.body}</p>`:""}${s.items?`<ul>${s.items.map(i=>`<li>${i}</li>`).join("")}</ul>`:""}</section>`).join("");return layout({title:`${article.metaTitle} | NewYorkHUT.com`,description:article.metaDescription,path:`/learning-center/${article.slug}`,schema,body:`<main><section class="hero"><div class="wrap"><div class="crumb"><a href="/">Home</a> / <a href="/learning-center">Learning Center</a> / ${article.title}</div><div class="eyebrow">${article.category}</div><h1>${article.title}</h1><p class="lead">${article.summary}</p></div></section><section><div class="wrap article"><article class="content">${sections}<div class="notice"><strong>General information only.</strong> Vehicle configuration, exact weight, use, account status, and exemptions can change the correct filing path. Do not send FEIN, SSN, or payment information through ordinary email.</div><div class="cta"><h2>Ready to take the next step?</h2><p>Use NYHUT.com for secure carrier information, vehicle details, payment, account access, and document delivery.</p><a class="btn" href="${ORDER_URL}">Start Your Permit →</a></div></article><aside class="side"><h3>Related guides</h3>${related.map(a=>`<a href="/learning-center/${a.slug}">${a.title}</a>`).join("")}<hr style="border:0;border-top:1px solid #dbe5ef;margin:20px 0"><a href="/tools/eligibility-checker">Use Eligibility Checker</a><a href="/services">View Permit Services</a></aside></div></section></main>`})}
function sitemap(){const paths=["/","/services","/learning-center",...articles.map(a=>`/learning-center/${a.slug}`),"/resources","/tools","/tools/eligibility-checker","/faq","/contact"];return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((p,i)=>`<url><loc>https://newyorkhut.com${p}</loc><lastmod>2026-07-21</lastmod><changefreq>${i===0?"weekly":"monthly"}</changefreq><priority>${i===0?"1.0":"0.8"}</priority></url>`).join("")}</urlset>`}
const headers={"content-type":"text/html; charset=UTF-8","cache-control":"public, max-age=300","x-content-type-options":"nosniff","referrer-policy":"strict-origin-when-cross-origin","permissions-policy":"camera=(), microphone=(), geolocation=()","content-security-policy":"default-src 'self'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self' https://nyhut.com"};

export default {async fetch(request,env,ctx){const url=new URL(request.url);const path=url.pathname.replace(/\/+$/," ").trim()||"/";if(path==="/sitemap.xml")return new Response(sitemap(),{headers:{"content-type":"application/xml; charset=UTF-8"}});if(path==="/learning-center")return new Response(learningIndex(),{headers});if(path.startsWith("/learning-center/")){const slug=path.slice("/learning-center/".length);const article=articles.find(a=>a.slug===slug);if(article)return new Response(articlePage(article),{headers});}return site.fetch(request,env,ctx)}};
