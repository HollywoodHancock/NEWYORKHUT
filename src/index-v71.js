import site from './index-v70.js';

const VERSION = 'v71';
const OLD_BANNER_PATH = '/newyorkhut-header-banner.svg';
const BANNER_PATH = '/newyorkhut-header-banner-v71.svg';
const BANNER_SOURCE = 'https://raw.githubusercontent.com/HollywoodHancock/NEWYORKHUT/main/public/newyorkhut-header-banner.svg?v=71';

async function serveBanner() {
  const upstream = await fetch(BANNER_SOURCE, {
    headers: {
      'user-agent': 'NewYorkHUT.com Worker',
      'accept': 'image/svg+xml,*/*;q=0.8'
    },
    cf: {
      cacheEverything: false
    }
  });

  if (!upstream.ok) {
    return new Response('Banner asset unavailable', {
      status: 502,
      headers: {
        'content-type': 'text/plain; charset=utf-8',
        'cache-control': 'no-store',
        'x-newyorkhut-version': VERSION
      }
    });
  }

  const bytes = await upstream.arrayBuffer();

  return new Response(bytes, {
    status: 200,
    headers: {
      'content-type': 'image/svg+xml; charset=utf-8',
      'content-length': String(bytes.byteLength),
      'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
      'x-content-type-options': 'nosniff',
      'x-newyorkhut-version': VERSION,
      'x-newyorkhut-feature': 'clean-svg-header-banner-v71'
    }
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
    const type = response.headers.get('content-type') || '';

    if (!type.includes('text/html')) {
      const headers = new Headers(response.headers);
      headers.set('x-newyorkhut-version', VERSION);
      headers.set('x-newyorkhut-feature', 'clean-svg-header-banner-v71');
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers
      });
    }

    const html = (await response.text()).replaceAll(OLD_BANNER_PATH, BANNER_PATH);
    const headers = new Headers(response.headers);
    headers.set('cache-control', 'no-store, no-cache, must-revalidate, max-age=0');
    headers.set('x-newyorkhut-version', VERSION);
    headers.set('x-newyorkhut-feature', 'clean-svg-header-banner-v71');

    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
