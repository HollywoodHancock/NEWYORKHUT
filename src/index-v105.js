import site from './index-v104.js';

const VERSION = 'v105';
const FEATURE = 'new-york-hut-permit-topic-consolidation-v105';
const GUIDE = '/new-york-hut-guide';

const SUPPORTING_PATHS = new Set([
  '/learn/who-needs-a-new-york-hut-permit',
  '/learn/how-to-register-for-new-york-hut',
  '/learn/new-york-hut-certificate-of-registration',
  '/learn/temporary-hut-permits-and-first-trip-questions',
  '/tools/hut-permit-requirement'
]);

function optimizeGuide(html) {
  html = html
    .replace(/<title>[\s\S]*?<\/title>/i, '<title>New York HUT Permit Guide: Requirements, Cost & Registration</title>')
    .replace(/<meta\s+name=["']description["'][^>]*>/i, '<meta name="description" content="New York HUT permit guide covering who needs a permit, weight requirements, registration, cost, temporary permits, filing, records, and exemptions.">')
    .replace(/<h1([^>]*)>[\s\S]*?<\/h1>/i, '<h1$1>New York HUT Permit: Complete Guide</h1>');

  const schema = `<script id="nyh-v105-guide-schema" type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'New York HUT Permit: Complete Guide',
    description: 'Carrier guide to New York HUT permit requirements, registration, costs, temporary permits, filing, records, and exemptions.',
    mainEntityOfPage: 'https://newyorkhut.com/new-york-hut-guide',
    publisher: { '@type': 'Organization', name: 'NewYorkHUT.com', url: 'https://newyorkhut.com/' }
  })}</script>`;

  return html.includes('nyh-v105-guide-schema') ? html : html.replace(/<\/head>/i, `${schema}</head>`);
}

function addGuideLink(html) {
  if (html.includes('id="nyh-v105-topic-parent"')) return html;
  const block = '<aside id="nyh-v105-topic-parent" style="width:min(980px,calc(100% - 36px));margin:24px auto;padding:18px 20px;border:1px solid #bfd0de;border-radius:12px;background:#f4f9fd;color:#18324a"><strong>Start with the complete overview:</strong> <a href="/new-york-hut-guide" style="color:#075eae;font-weight:800">New York HUT Permit Guide</a> — requirements, registration, costs, temporary permits, filing, records, and exemptions.</aside>';
  return html.replace(/<main\b[^>]*>/i, match => `${match}${block}`);
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

    const path = new URL(request.url).pathname.replace(/\/+$/, '') || '/';
    let html = await response.text();
    if (path === GUIDE) html = optimizeGuide(html);
    else if (SUPPORTING_PATHS.has(path)) html = addGuideLink(html);

    return new Response(html, { status: response.status, statusText: response.statusText, headers });
  }
};
