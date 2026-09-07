import site from './index-v109.js';

const VERSION = 'v110';
const FEATURE = 'phase1-canonical-schema-brand-relationship-v110';

const INDEXABLE = new Set([
  '/', '/new-york-hut-guide', '/what-is-new-york-highway-use-tax', '/who-needs-ny-hut',
  '/ny-hut-registration-guide', '/temporary-ny-hut-permit', '/ny-hut-renewal-guide',
  '/ny-hut-decal-replacement', '/ny-hut-registration-cost', '/form-tmt-1-ny-hut',
  '/ny-hut-weight-requirements', '/ny-hut-out-of-state-carriers', '/ny-hut-faq',
  '/ny-hut-quarterly-filing', '/ny-hut-filing-deadlines', '/ny-hut-certificate-and-decal',
  '/ny-hut-trip-certificate-limits', '/ifta-vs-ny-hut', '/irp-vs-ny-hut'
]);

function pathOf(request) {
  return new URL(request.url).pathname.replace(/\/+$/, '') || '/';
}

function ensureCanonical(html, path) {
  const href = `https://newyorkhut.com${path === '/' ? '/' : path}`;
  const tag = `<link rel="canonical" href="${href}">`;
  if (/<link\s+[^>]*rel=["']canonical["'][^>]*>/i.test(html)) {
    return html.replace(/<link\s+[^>]*rel=["']canonical["'][^>]*>/i, tag);
  }
  return html.replace(/<\/head>/i, `${tag}</head>`);
}

function organizationSchema() {
  return `<script id="nyh-v110-org-schema" type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://newyorkhut.com/#organization',
    name: 'NewYorkHUT.com',
    url: 'https://newyorkhut.com/',
    description: 'New York Highway Use Tax educational authority and knowledge center within the Compliance University educational framework.',
    parentOrganization: {
      '@type': 'Organization',
      name: 'Compliance University'
    }
  })}</script>`;
}

function addOrganizationSchema(html) {
  if (html.includes('id="nyh-v110-org-schema"')) return html;
  return html.replace(/<\/head>/i, `${organizationSchema()}</head>`);
}

function addBrandRelationship(html) {
  if (html.includes('id="nyh-v110-brand-relationship"')) return html;
  const block = '<aside id="nyh-v110-brand-relationship" aria-label="Compliance University relationship" style="width:min(1040px,calc(100% - 36px));margin:26px auto;padding:18px 20px;border:1px solid #cbd8e3;border-radius:12px;background:#f7fafc;color:#18324a"><strong>Part of the Compliance University™ educational framework.</strong> NewYorkHUT.com is the dedicated New York Highway Use Tax knowledge center. Educational guidance is kept separate from commercial permit processing; when service is needed, relevant pages connect to NYHUT.com by Authorities Direct.</aside>';
  return html.replace(/<\/main>/i, `${block}</main>`);
}

export default {
  async fetch(request, env, ctx) {
    const response = await site.fetch(request, env, ctx);
    const headers = new Headers(response.headers);
    headers.set('x-newyorkhut-version', VERSION);
    headers.set('x-newyorkhut-feature', FEATURE);

    const type = headers.get('content-type') || '';
    if (response.status !== 200 || !type.includes('text/html')) {
      return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
    }

    const path = pathOf(request);
    let html = await response.text();
    if (INDEXABLE.has(path)) html = ensureCanonical(html, path);
    html = addOrganizationSchema(html);
    if (path === '/' || path === '/new-york-hut-guide' || path === '/about') html = addBrandRelationship(html);

    return new Response(html, { status: response.status, statusText: response.statusText, headers });
  }
};
