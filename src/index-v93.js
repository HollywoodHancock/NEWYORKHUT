import site from './index-v92.js';

const VERSION = 'v93';
const FEATURE = 'remove-sitemap-noindex-header-v93';

export default {
  async fetch(request, env, ctx) {
    const response = await site.fetch(request, env, ctx);
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';
    const headers = new Headers(response.headers);

    headers.set('x-newyorkhut-version', VERSION);
    headers.set('x-newyorkhut-feature', FEATURE);

    if (path === '/sitemap.xml') {
      headers.delete('x-robots-tag');
      headers.set('content-type', 'application/xml; charset=UTF-8');
      headers.set('cache-control', 'no-store, no-cache, must-revalidate, max-age=0');
      headers.set('x-sitemap-indexing-directive', 'none');
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
