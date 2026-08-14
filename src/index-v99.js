import site from './index-v98.js';

const VERSION = 'v99';
const FEATURE = 'trim-form-detail-pages-from-index-v99';

const FORM_DETAIL_PATHS = new Set([
  '/forms/dtf-406',
  '/forms/hut-publications',
  '/forms/mt-370-1',
  '/forms/mt-370-2',
  '/forms/mt-903',
  '/forms/mt-903-fut',
  '/forms/mt-903-i',
  '/forms/mt-903-mn',
  '/forms/tmt-1',
  '/forms/tmt-334',
  '/forms/tmt-39'
]);

function normalizedPath(url) {
  return url.pathname.replace(/\/+$/, '') || '/';
}

function trimFormDetailsFromSitemap(xml) {
  for (const path of FORM_DETAIL_PATHS) {
    const escaped = path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`\\s*<url><loc>https:\\/\\/newyorkhut\\.com${escaped}<\\/loc><\\/url>\\s*`, 'i');
    xml = xml.replace(re, '\n');
  }
  return xml;
}

export default {
  async fetch(request, env, ctx) {
    const response = await site.fetch(request, env, ctx);
    const path = normalizedPath(new URL(request.url));
    const headers = new Headers(response.headers);
    headers.set('x-newyorkhut-version', VERSION);
    headers.set('x-newyorkhut-feature', FEATURE);

    const type = headers.get('content-type') || '';

    if (path === '/sitemap.xml' && type.includes('xml')) {
      const xml = trimFormDetailsFromSitemap(await response.text());
      headers.set('x-sitemap-url-count', '65');
      return new Response(xml, { status: response.status, statusText: response.statusText, headers });
    }

    if (FORM_DETAIL_PATHS.has(path)) {
      headers.set('x-robots-tag', 'noindex, follow');
    }

    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  }
};
