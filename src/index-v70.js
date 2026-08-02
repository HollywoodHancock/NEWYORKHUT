import site from './index-v69.js';

const VERSION = 'v70';
const BANNER_PATH = '/newyorkhut-header-banner.svg';
const BANNER_SOURCE = 'https://raw.githubusercontent.com/HollywoodHancock/NEWYORKHUT/main/public/newyorkhut-header-banner.svg';

async function serveBanner(request) {
  const upstream = await fetch(BANNER_SOURCE, {
    headers: {
      'user-agent': 'NewYorkHUT.com Worker',
      'accept': 'image/svg+xml,image/*;q=0.8,*/*;q=0.5'
    },
    cf: {
      cacheEverything: true,
      cacheTtl: 86400
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

  const headers = new Headers(upstream.headers);
  headers.set('content-type', 'image/svg+xml; charset=utf-8');
  headers.set('cache-control', 'public, max-age=86400, s-maxage=86400');
  headers.set('x-content-type-options', 'nosniff');
  headers.set('x-newyorkhut-version', VERSION);
  headers.set('x-newyorkhut-feature', 'worker-served-header-banner-v70');

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
      return serveBanner(request);
    }

    const response = await site.fetch(request, env, ctx);
    const headers = new Headers(response.headers);
    headers.set('x-newyorkhut-version', VERSION);
    headers.set('x-newyorkhut-feature', 'worker-served-header-banner-v70');

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
