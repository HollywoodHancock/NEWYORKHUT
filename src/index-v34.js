import site from "./index-v33.js";

const VERSION = "v34";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/tools/compliance-calendar") {
      const response = await site.fetch(request, env, ctx);
      let html = await response.text();

      html = html.replace(
        ".tool{display:grid;grid-template-columns:minmax(0,1fr) 380px;gap:28px;align-items:start}",
        ".tool{display:block}.panel{width:100%}.result{position:static;width:100%;margin-top:28px}"
      );

      html = html.replace(
        ".event{display:grid;grid-template-columns:125px 1fr auto;gap:14px;align-items:center;border:1px solid var(--l);border-radius:13px;padding:14px}",
        ".event{display:grid;grid-template-columns:150px minmax(0,1fr) auto;gap:22px;align-items:center;border:1px solid var(--l);border-radius:13px;padding:18px 20px}"
      );

      html = html.replace(
        "@media(max-width:620px){.w{width:min(100% - 24px,1120px)}.fields,.checks{grid-template-columns:1fr}.event{grid-template-columns:1fr}}",
        "@media(max-width:620px){.w{width:min(100% - 24px,1120px)}.fields,.checks{grid-template-columns:1fr}.event{grid-template-columns:1fr;gap:8px}.tag{justify-self:start}}"
      );

      const headers = new Headers(response.headers);
      headers.set("content-type", "text/html; charset=UTF-8");
      headers.set("cache-control", "no-store");
      headers.set("x-newyorkhut-version", VERSION);

      return new Response(html, {
        status: response.status,
        statusText: response.statusText,
        headers
      });
    }

    if (url.pathname === "/__version" || url.pathname === "/api/version") {
      return new Response(JSON.stringify({
        application: "NewYorkHUT.com",
        version: VERSION,
        deployedAt: "2026-07-21",
        features: [
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
