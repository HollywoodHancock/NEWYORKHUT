import site from './index-v82.js';

const VERSION = 'v83';
const FEATURE = 'same-origin-banner-proxy-v83';
const BANNER_PATH = '/newyorkhut-header-banner.png';
const SOURCE_URL = 'https://raw.githubusercontent.com/HollywoodHancock/NEWYORKHUT/main/public/newyorkhut-header-banner.png?v=20260802-04';
const BANNER_URL = `${BANNER_PATH}?v=20260802-05`;

function forceSameOriginBanner(html) {
  if (!/<html/i.test(html)) return html;

  return html
    .replace(
      /(<div\b[^>]*class="[^"]*nyh-v76-banner[^"]*"[^>]*>\s*<img\b[^>]*\bsrc=")[^"]*("[^>]*>)/i,
      `$1${BANNER_URL}$2`
    )
    .replace(/\s+onerror="[^"]*"/i, '');
}

async function serveBanner() {
  const upstream = await fetch(SOURCE_URL, {
    cf: {
      cacheEverything: true,
      cacheTtl: 86400
    }
  });

  if (!upstream.ok) {
    return new Response(`Banner upstream failed: ${upstream.status}`, {
      status: 502,
      headers: {
        'content-type': 'text/plain; charset=utf-8',
        'cache-control': 'no-store',
        'x-newyorkhut-version': VERSION,
        'x-newyorkhut-feature': FEATURE
      }
    });
  }

  const headers = new Headers(upstream.headers);
  headers.set('content-type', 'image/png');
  headers.set('cache-control', 'public, max-age=86400');
  headers.set('x-content-type-options', 'nosniff');
  headers.set('x-newyorkhut-version', VERSION);
  headers.set('x-newyorkhut-feature', FEATURE);

  return new Response(upstream.body, {
    status: 200,
    headers
  });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === BANNER_PATH) {
      return serveBanner();
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
