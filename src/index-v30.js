import site from "./index-v29.js";

const VERSION = "v30";
const DEPLOYED_FEATURES = [
  "/tools/vin-decoder",
  "/tools/compliance-calendar",
  "/tools/fleet-compliance",
  "/fleet-toolkit",
  "/tools/compliance-assistant"
];

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/__version" || url.pathname === "/api/version") {
      return new Response(JSON.stringify({
        application: "NewYorkHUT.com",
        version: VERSION,
        deployedAt: "2026-07-21",
        features: DEPLOYED_FEATURES
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
