import site from './index-v111.js';

const VERSION = 'v112';
const FEATURE = 'phase1-technical-seo-consistency-v112';
const ORIGIN = 'https://newyorkhut.com';

const NOINDEX = new Set(['/search', '/site-map']);

const BREADCRUMBS = new Map([
  ['/new-york-hut-guide', [['Home','/'],['New York HUT Guide','/new-york-hut-guide']]],
  ['/what-is-new-york-highway-use-tax', [['Home','/'],['New York HUT Guide','/new-york-hut-guide'],['What Is New York HUT?','/what-is-new-york-highway-use-tax']]],
  ['/who-needs-ny-hut', [['Home','/'],['New York HUT Guide','/new-york-hut-guide'],['Who Needs NY HUT?','/who-needs-ny-hut']]],
  ['/ny-hut-registration-guide', [['Home','/'],['New York HUT Guide','/new-york-hut-guide'],['Registration Guide','/ny-hut-registration-guide']]],
  ['/temporary-ny-hut-permit', [['Home','/'],['New York HUT Guide','/new-york-hut-guide'],['Temporary HUT Permit','/temporary-ny-hut-permit']]],
  ['/ny-hut-renewal-guide', [['Home','/'],['New York HUT Guide','/new-york-hut-guide'],['Renewal Guide','/ny-hut-renewal-guide']]],
  ['/ny-hut-decal-replacement', [['Home','/'],['New York HUT Guide','/new-york-hut-guide'],['Replacement Credentials','/ny-hut-decal-replacement']]],
  ['/form-tmt-1-ny-hut', [['Home','/'],['Registration Guide','/ny-hut-registration-guide'],['Form TMT-1','/form-tmt-1-ny-hut']]],
  ['/form-mt-903', [['Home','/'],['Quarterly Filing','/ny-hut-quarterly-filing'],['Form MT-903','/form-mt-903']]],
  ['/ny-hut-quarterly-filing', [['Home','/'],['New York HUT Guide','/new-york-hut-guide'],['Quarterly Filing','/ny-hut-quarterly-filing']]],
  ['/ny-hut-weight-requirements', [['Home','/'],['New York HUT Guide','/new-york-hut-guide'],['Weight Requirements','/ny-hut-weight-requirements']]]
]);

function pathOf(request) {
  return new URL(request.url).pathname.replace(/\/+$/, '') || '/';
}

function canonicalUrl(path) {
  return `${ORIGIN}${path === '/' ? '/' : path}`;
}

function normalizeInternalLinks(html) {
  return html
    .replace(/href=(['"])\/form-tmt-1\/?\1/gi, 'href=$1/form-tmt-1-ny-hut/$1')
    .replace(/New York\.s/g, "New York's");
}

function ensureCanonicalAndOg(html, path) {
  const url = canonicalUrl(path);
  const canonical = `<link rel="canonical" href="${url}">`;
  if (/<link\s+[^>]*rel=["']canonical["'][^>]*>/i.test(html)) {
    html = html.replace(/<link\s+[^>]*rel=["']canonical["'][^>]*>/i, canonical);
  } else {
    html = html.replace(/<\/head>/i, `${canonical}</head>`);
  }

  const og = `<meta property="og:url" content="${url}">`;
  if (/<meta\s+property=["']og:url["'][^>]*>/i.test(html)) {
    html = html.replace(/<meta\s+property=["']og:url["'][^>]*>/i, og);
  } else {
    html = html.replace(/<\/head>/i, `${og}</head>`);
  }
  return html;
}

function breadcrumbSchema(path) {
  const crumbs = BREADCRUMBS.get(path);
  if (!crumbs) return '';
  const itemListElement = crumbs.map(([name, href], index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name,
    item: `${ORIGIN}${href}`
  }));
  return `<script id="nyh-v112-breadcrumb-schema" type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement
  })}</script>`;
}

function addBreadcrumbSchema(html, path) {
  if (html.includes('id="nyh-v112-breadcrumb-schema"')) return html;
  const schema = breadcrumbSchema(path);
  return schema ? html.replace(/<\/head>/i, `${schema}</head>`) : html;
}

function addWebsiteSchema(html) {
  if (html.includes('id="nyh-v112-website-schema"')) return html;
  const schema = `<script id="nyh-v112-website-schema" type="application/ld+json">${JSON.stringify({
    '@context':'https://schema.org',
    '@type':'WebSite',
    '@id':'https://newyorkhut.com/#website',
    url:'https://newyorkhut.com/',
    name:'NewYorkHUT.com',
    description:'Independent educational resource for New York Highway Use Tax requirements, registration, filing, temporary permits, renewals, records, and compliance.',
    publisher:{'@id':'https://newyorkhut.com/#organization'}
  })}</script>`;
  return html.replace(/<\/head>/i, `${schema}</head>`);
}

export default {
  async fetch(request, env, ctx) {
    const response = await site.fetch(request, env, ctx);
    const headers = new Headers(response.headers);
    headers.set('x-newyorkhut-version', VERSION);
    headers.set('x-newyorkhut-feature', FEATURE);

    const path = pathOf(request);
    if (NOINDEX.has(path) || path.startsWith('/downloads/')) headers.set('x-robots-tag', 'noindex, follow');

    const type = headers.get('content-type') || '';
    if (response.status !== 200 || !type.includes('text/html')) {
      return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
    }

    let html = normalizeInternalLinks(await response.text());
    if (!NOINDEX.has(path) && !path.startsWith('/downloads/')) html = ensureCanonicalAndOg(html, path);
    html = addBreadcrumbSchema(html, path);
    if (path === '/') html = addWebsiteSchema(html);

    return new Response(html, { status: response.status, statusText: response.statusText, headers });
  }
};
