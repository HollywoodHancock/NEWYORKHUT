import site from './index-v112.js';

const VERSION = 'v113';
const FEATURE = 'phase1-sitemap-indexability-reconciliation-v113';
const CANONICAL_ORIGIN = 'https://newyorkhut.com';

const REMOVE_FROM_SITEMAP = new Set([
  '/search',
  '/site-map',
  '/learn/hut-records-you-must-keep',
  '/what-is-hut',
  '/new-york-hut-weight-threshold',
  '/learn/adding-a-vehicle-to-your-new-york-hut-account'
]);

function pathOf(request) {
  return new URL(request.url).pathname.replace(/\/+$/, '') || '/';
}

function reconcileSitemap(xml) {
  const urls = [];
  const seen = new Set();
  const re = /<url>\s*<loc>([^<]+)<\/loc>\s*<\/url>/gi;
  let match;
  while ((match = re.exec(xml))) {
    let loc = match[1].trim();
    try {
      const u = new URL(loc);
      let path = u.pathname.replace(/\/+$/, '') || '/';
      if (path === '/form-tmt-1') path = '/form-tmt-1-ny-hut';
      if (REMOVE_FROM_SITEMAP.has(path) || path.startsWith('/downloads/')) continue;
      loc = `${CANONICAL_ORIGIN}${path === '/' ? '/' : path}`;
      if (seen.has(loc)) continue;
      seen.add(loc);
      urls.push(`<url><loc>${loc}</loc></url>`);
    } catch {}
  }

  const canonicalTmt = `${CANONICAL_ORIGIN}/form-tmt-1-ny-hut`;
  if (!seen.has(canonicalTmt)) urls.push(`<url><loc>${canonicalTmt}</loc></url>`);

  return {
    xml: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`,
    count: urls.length
  };
}

export default {
  async fetch(request, env, ctx) {
    const response = await site.fetch(request, env, ctx);
    const path = pathOf(request);
    const headers = new Headers(response.headers);
    headers.set('x-newyorkhut-version', VERSION);
    headers.set('x-newyorkhut-feature', FEATURE);

    if (path === '/sitemap.xml' && response.status === 200) {
      const type = headers.get('content-type') || '';
      if (type.includes('xml') || type.includes('text/plain')) {
        const result = reconcileSitemap(await response.text());
        headers.set('content-type', 'application/xml; charset=UTF-8');
        headers.delete('x-robots-tag');
        headers.set('x-sitemap-url-count', String(result.count));
        headers.set('cache-control', 'public, max-age=300');
        return new Response(result.xml, { status: 200, headers });
      }
    }

    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  }
};
