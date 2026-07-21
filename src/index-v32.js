import site from "./index-v31.js";

const VERSION = "v32";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/tools/compliance-calendar") {
      const response = await site.fetch(request, env, ctx);
      let html = await response.text();

      // v31 emitted a literal CRLF inside the browser-side quoted string used
      // by lines.join(), which caused the entire inline script to fail parsing.
      html = html.replace(
        "lines.join('\r\n')",
        "lines.join('\\r\\n')"
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
