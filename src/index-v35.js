import site from "./index-v34.js";

const VERSION = "v35";
const HEADERS = {
  "content-type": "text/html; charset=UTF-8",
  "cache-control": "no-store"
};

function toolsPage() {
  const tools = [
    {
      href: "/tools/vin-decoder",
      eyebrow: "Vehicle intelligence",
      title: "Truck VIN Decoder",
      description: "Decode a 17-character VIN using NHTSA data and review preliminary New York HUT, IRP, IFTA, weight, and vehicle-class guidance.",
      action: "Open VIN Decoder"
    },
    {
      href: "/tools/fleet-compliance",
      eyebrow: "Fleet readiness",
      title: "Fleet Compliance Dashboard",
      description: "Build a preliminary compliance profile and identify missing HUT, IFTA, IRP, UCR, credential, and recordkeeping controls.",
      action: "Open Fleet Dashboard"
    },
    {
      href: "/tools/compliance-calendar",
      eyebrow: "Deadline planning",
      title: "Fleet Compliance Calendar",
      description: "Generate HUT, IFTA, IRP, UCR, mileage, fuel, and fleet-review planning dates and download them as an ICS calendar.",
      action: "Build Compliance Calendar"
    },
    {
      href: "/tools/compliance-assistant",
      eyebrow: "Guided help",
      title: "New York HUT Compliance Assistant",
      description: "Ask practical questions about registration, filing, credentials, vehicle changes, records, notices, and deadlines.",
      action: "Open Compliance Assistant"
    },
    {
      href: "/fleet-toolkit",
      eyebrow: "Downloads",
      title: "Fleet Compliance Toolkit",
      description: "Download vehicle inventory, mileage, fuel, credential-audit, and compliance-review templates.",
      action: "Open Fleet Toolkit"
    }
  ];

  const cards = tools.map((tool) => `
    <article class="card">
      <div class="eyebrow">${tool.eyebrow}</div>
      <h2>${tool.title}</h2>
      <p>${tool.description}</p>
      <a class="button" href="${tool.href}">${tool.action}</a>
    </article>`).join("");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>New York HUT Compliance Tools | NewYorkHUT.com</title>
<meta name="description" content="Free New York HUT and fleet compliance tools including a truck VIN decoder, fleet dashboard, compliance calendar, assistant, and downloadable templates.">
<link rel="canonical" href="https://newyorkhut.com/tools">
<style>
:root{--navy:#082b4c;--blue:#1768c5;--line:#dbe5ef;--muted:#5b6b7e;--bg:#f5f9fc;font-family:Inter,system-ui,sans-serif}*{box-sizing:border-box}body{margin:0;color:#122033;line-height:1.55}.wrap{width:min(1120px,calc(100% - 36px));margin:auto}.top{background:var(--navy);color:#fff;padding:8px 0;font-size:.9rem}header{border-bottom:1px solid var(--line);background:#fff}nav{min-height:72px;display:flex;align-items:center;justify-content:space-between;gap:18px}.brand{font-weight:900;color:var(--navy);text-decoration:none}.links{display:flex;align-items:center;gap:16px}.links a{color:var(--navy);text-decoration:none;font-weight:750}.hero{padding:64px 0 54px;background:linear-gradient(#f9fcff,#edf5fb)}.crumb{font-size:.9rem;color:var(--muted)}.crumb a{color:var(--blue);text-decoration:none}.eyebrow{text-transform:uppercase;letter-spacing:.09em;font-size:.76rem;font-weight:900;color:var(--blue)}h1{font-size:clamp(2.4rem,5vw,4.2rem);line-height:1;letter-spacing:-.045em;color:var(--navy);margin:12px 0 18px}h2{color:var(--navy);margin:8px 0 10px}.lead{font-size:1.15rem;color:#4e6074;max-width:850px}.section{padding:56px 0}.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}.card{border:1px solid var(--line);border-radius:18px;background:#fff;padding:26px;box-shadow:0 8px 30px rgba(8,43,76,.05);display:flex;flex-direction:column;align-items:flex-start}.card:first-child{grid-column:1/-1;background:linear-gradient(135deg,#f7fbff,#edf5fb)}.card p{color:var(--muted);margin:0 0 22px;max-width:760px}.button{display:inline-flex;margin-top:auto;background:var(--blue);color:#fff;text-decoration:none;font-weight:850;padding:12px 17px;border-radius:10px}footer{margin-top:30px;background:#071d33;color:#b7c6d6;padding:38px 0}@media(max-width:720px){.grid{grid-template-columns:1fr}.card:first-child{grid-column:auto}.links a:not(.button){display:none}.wrap{width:min(100% - 24px,1120px)}}
</style>
</head>
<body>
<div class="top"><div class="wrap">Independent New York HUT guidance</div></div>
<header><nav class="wrap"><a class="brand" href="/">NewYorkHUT.com</a><div class="links"><a href="/tools">Tools</a><a href="/official-resources">Official Resources</a><a class="button" href="https://nyhut.com/">Start Permit</a></div></nav></header>
<main>
<section class="hero"><div class="wrap"><div class="crumb"><a href="/">Home</a> / Tools</div><div class="eyebrow">Free compliance resources</div><h1>New York HUT & Fleet Compliance Tools</h1><p class="lead">Use these tools to decode a truck VIN, assess fleet readiness, build compliance deadlines, ask practical HUT questions, and download operating templates.</p></div></section>
<section class="section"><div class="wrap"><div class="grid">${cards}</div></div></section>
</main>
<footer><div class="wrap"><strong>NewYorkHUT.com</strong><p>Private educational guidance and permit assistance. Not affiliated with New York State or NHTSA.</p></div></footer>
</body>
</html>`;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname.replace(/\/+$/g, "") || "/";

    if (pathname === "/tools") {
      return new Response(toolsPage(), { headers: HEADERS });
    }

    if (pathname === "/__version" || pathname === "/api/version") {
      return new Response(JSON.stringify({
        application: "NewYorkHUT.com",
        version: VERSION,
        deployedAt: "2026-07-21",
        features: [
          "/tools",
          "/tools/vin-decoder",
          "/tools/compliance-calendar",
          "/tools/fleet-compliance",
          "/fleet-toolkit",
          "/tools/compliance-assistant"
        ]
      }, null, 2), {
        headers: {
          "content-type": "application/json; charset=UTF-8",
          "cache-control": "no-store",
          "x-newyorkhut-version": VERSION
        }
      });
    }

    const response = await site.fetch(request, env, ctx);
    const headers = new Headers(response.headers);
    headers.set("x-newyorkhut-version", VERSION);
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};