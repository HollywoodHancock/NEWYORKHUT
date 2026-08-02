import site from './index-v77.js';

const VERSION = 'v80';
const FEATURE = 'explicit-static-asset-banner-v80';
const BANNER_PATH = '/newyorkhut-header-banner.png';
const BANNER_URL = `${BANNER_PATH}?v=20260802-02`;

function useStaticBanner(html) {
  if (!/<html/i.test(html)) return html;

  return html
    .replace(
      /src="data:image\/webp;base64,[^"]+"/i,
      `src="${BANNER_URL}"`
    )
    .replace(
      /\s+onerror="this\.parentElement\.remove\(\)"/i,
      ''
    );
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === BANNER_PATH) {
      const assetResponse = await env.ASSETS.fetch(request);
      const headers = new Headers(assetResponse.headers);
      headers.set('cache-control', 'public, max-age=86400');
      headers.set('x-newyorkhut-version', VERSION);
      headers.set('x-newyorkhut-feature', FEATURE);

      return new Response(assetResponse.body, {
        status: assetResponse.status,
        statusText: assetResponse.statusText,
        headers
      });
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

    const html = useStaticBanner(await response.text());
    headers.set('cache-control', 'no-store, no-cache, must-revalidate, max-age=0');

    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
