import site from './index-v82.js';

const VERSION = 'v83';
const FEATURE = 'bundled-lossless-banner';
const BANNER_PATH = '/newyorkhut-header-banner.png';
const BANNER_URL = '/newyorkhut-header-banner-bda5bffb9eba.webp';

function forceSameOriginBanner(html) {
  if (!/<html/i.test(html)) return html;

  return html
    .replace(
      /(<div\b[^>]*class="[^"]*nyh-v76-banner[^"]*"[^>]*>\s*<img\b[^>]*\bsrc=")[^"]*("[^>]*>)/i,
      (_, before, after) => `${before}${BANNER_URL}${after.replace(/\s+fetchpriority="[^"]*"/i, '').replace(/>$/, ' fetchpriority="high">')}`
    )
    .replace(/\s+onerror="[^"]*"/i, '');
}

async function serveBanner(request, env) {
  if (!env?.ASSETS?.fetch) {
    return new Response('Banner asset unavailable', {status: 503, headers: {'cache-control': 'no-store'}});
  }
  // Use the deployment's own asset binding, never the public Worker URL or GitHub.
  // Forward request headers/method so HEAD and conditional requests keep asset semantics.
  const upstream = await env.ASSETS.fetch(request);
  if (!upstream.ok && upstream.status !== 304) return upstream;
  const headers = new Headers(upstream.headers);
  headers.set('cache-control', new URL(request.url).pathname === BANNER_URL
    ? 'public, max-age=31536000, immutable'
    : 'public, max-age=86400');
  headers.set('x-content-type-options', 'nosniff');
  headers.set('x-newyorkhut-banner', 'bundled-lossless-webp-2026-11-12');
  return new Response(upstream.body, {status: upstream.status, statusText: upstream.statusText, headers});
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === BANNER_PATH || path === BANNER_URL) {
      return serveBanner(request, env);
    }

    const response = await site.fetch(request, env, ctx);
    const headers = new Headers(response.headers);
    const type = headers.get('content-type') || '';

    headers.set('x-newyorkhut-version', VERSION);
    headers.set('x-newyorkhut-feature', FEATURE);

    if (!type.includes('text/html')) {
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers
      });
    }

    const html = forceSameOriginBanner(await response.text());
    headers.set('cache-control', 'no-store, no-cache, must-revalidate, max-age=0');

    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
