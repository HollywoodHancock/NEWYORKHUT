import site from "./index-v36.js";

const VERSION = "v37";

function inject(html, css) {
  return html.replace("</head>", `<style>${css}</style></head>`);
}

const shared = `
.w,.wrap{width:min(1280px,calc(100% - 40px))!important}
.hero{padding:54px 0 38px!important}
section{padding:42px 0 70px!important}
.panel,.result,.card{border-radius:18px!important;padding:28px!important}
.tool{display:block!important}
.result{position:static!important;width:100%!important;margin-top:28px!important}
.fields{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:18px!important}
.actions{gap:12px!important;margin-top:22px!important}
.btn{padding:13px 18px!important;border-radius:11px!important}
input,select,textarea{padding:14px 15px!important;border-radius:11px!important}
@media(max-width:720px){.w,.wrap{width:min(100% - 24px,1280px)!important}.fields{grid-template-columns:1fr!important}.panel,.result,.card{padding:20px!important}}
`;

const dashboardCss = shared + `
.tool>.panel{max-width:none!important}
.metrics{grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:14px!important}
.checks{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:12px!important}
.result .cards,.cards{grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:16px!important}
@media(max-width:900px){.metrics{grid-template-columns:repeat(2,1fr)!important}.result .cards,.cards{grid-template-columns:1fr 1fr!important}}
@media(max-width:620px){.metrics,.checks,.result .cards,.cards{grid-template-columns:1fr!important}}
`;

const assistantCss = shared + `
.tool>.panel{max-width:none!important}
textarea{min-height:150px!important;resize:vertical!important}
.result{min-height:220px!important}
.result h2{font-size:1.7rem!important}
.cards{grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:18px!important}
@media(max-width:900px){.cards{grid-template-columns:1fr!important}}
`;

const toolkitCss = shared + `
.cards,.grid{grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:20px!important}
.card{display:flex!important;flex-direction:column!important;min-height:240px!important}
.card .btn,.card a.button{margin-top:auto!important;align-self:flex-start!important}
.card p{font-size:1rem!important;line-height:1.65!important}
@media(max-width:980px){.cards,.grid{grid-template-columns:repeat(2,1fr)!important}}
@media(max-width:640px){.cards,.grid{grid-template-columns:1fr!important}.card{min-height:0!important}}
`;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/g, "") || "/";

    if (["/tools/fleet-compliance", "/tools/compliance-assistant", "/fleet-toolkit"].includes(path)) {
      const response = await site.fetch(request, env, ctx);
      let html = await response.text();
      const css = path === "/tools/fleet-compliance" ? dashboardCss : path === "/tools/compliance-assistant" ? assistantCss : toolkitCss;
      html = inject(html, css);
      const headers = new Headers(response.headers);
      headers.set("content-type", "text/html; charset=UTF-8");
      headers.set("cache-control", "no-store");
      headers.set("x-newyorkhut-version", VERSION);
      return new Response(html, { status: response.status, statusText: response.statusText, headers });
    }

    if (path === "/__version" || path === "/api/version") {
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
