import site from './index-v99.js';

const VERSION = 'v100';
const FEATURE = 'consolidate-recordkeeping-cannibalization-v100';
const PRIMARY = '/learn/hut-recordkeeping-requirements';
const DUPLICATE = '/learn/hut-records-you-must-keep';

function pathOf(request) {
  return new URL(request.url).pathname.replace(/\/+$/, '') || '/';
}

function removeDuplicateFromSitemap(xml) {
  return xml.replace(/\s*<url><loc>https:\/\/newyorkhut\.com\/learn\/hut-records-you-must-keep<\/loc><\/url>\s*/i, '\n');
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = pathOf(request);

    // Consolidate two pages targeting substantially the same HUT recordkeeping intent.
    // Preserve accumulated signals with a permanent redirect to the stronger canonical URL.
    if (path === DUPLICATE) {
      const target = new URL(PRIMARY, url.origin);
      target.search = url.search;
      return new Response(null, {
        status: 301,
        headers: {
          location: target.toString(),
          'cache-control': 'public, max-age=3600',
          'x-newyorkhut-version': VERSION,
          'x-newyorkhut-feature': FEATURE
        }
      });
    }

    const response = await site.fetch(request, env, ctx);
    const headers = new Headers(response.headers);
    headers.set('x-newyorkhut-version', VERSION);
    headers.set('x-newyorkhut-feature', FEATURE);

    const type = headers.get('content-type') || '';
    if (path === '/sitemap.xml' && type.includes('xml')) {
      const xml = removeDuplicateFromSitemap(await response.text());
      headers.set('x-sitemap-url-count', '64');
      return new Response(xml, { status: response.status, statusText: response.statusText, headers });
    }

    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  }
};
