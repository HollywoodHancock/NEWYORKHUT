import site from './index-v94.js';

const VERSION = 'v95';
const FEATURE = 'authority-cluster-internal-links-and-conversion-v95';

const PRIORITY_PATHS = new Set([
  '/',
  '/learn',
  '/learn/who-needs-a-new-york-hut-permit',
  '/learn/how-to-register-for-new-york-hut',
  '/learn/new-york-hut-certificate-of-registration',
  '/learn/temporary-hut-permits-and-first-trip-questions',
  '/learn/new-york-hut-penalties',
  '/learn/new-york-hut-exempt-vehicles',
  '/learn/new-york-hut-audits',
  '/learn/hut-recordkeeping-requirements',
  '/tools/hut-permit-requirement'
]);

function normalizedPath(url) {
  return url.pathname.replace(/\/+$/, '') || '/';
}

function orderUrl(path) {
  const content = path === '/' ? 'homepage-seo-cta' : `${path.replace(/^\//, '').replace(/\//g, '-')}-seo-cta`;
  return `https://www.nyhut.com/?utm_source=newyorkhut.com&utm_medium=referral&utm_campaign=authority_site&utm_content=${encodeURIComponent(content)}`;
}

function authorityBlock(path) {
  return `<section aria-label="New York HUT next steps" style="border-top:1px solid #d7e3ed;background:#f7fbfe;padding:30px 18px"><div style="width:min(1040px,100%);margin:auto"><h2 style="margin:0 0 10px;color:#082b4c;font:800 1.55rem/1.2 system-ui,sans-serif">Continue your New York HUT research</h2><p style="margin:0 0 16px;color:#435d75;font:400 1rem/1.55 system-ui,sans-serif">Use these related NewYorkHUT.com resources to confirm requirements. When you are ready to obtain a permit, ordering is handled separately through NYHUT.com.</p><div style="display:flex;gap:9px;flex-wrap:wrap"><a href="/learn/who-needs-a-new-york-hut-permit" style="color:#176dcc;font-weight:700">Who needs HUT?</a><span aria-hidden="true">•</span><a href="/learn/how-to-register-for-new-york-hut" style="color:#176dcc;font-weight:700">Registration guide</a><span aria-hidden="true">•</span><a href="/learn/new-york-hut-certificate-of-registration" style="color:#176dcc;font-weight:700">Certificate guide</a><span aria-hidden="true">•</span><a href="/tools/hut-permit-requirement" style="color:#176dcc;font-weight:700">Permit requirement tool</a></div><p style="margin:20px 0 0"><a href="${orderUrl(path)}" rel="noopener" style="display:inline-block;background:#176dcc;color:#fff;text-decoration:none;font:800 1rem system-ui,sans-serif;padding:11px 16px;border-radius:9px">Ready to order? Continue to NYHUT.com →</a></p></div></section>`;
}

export default {
  async fetch(request, env, ctx) {
    const response = await site.fetch(request, env, ctx);
    const path = normalizedPath(new URL(request.url));
    const headers = new Headers(response.headers);
    headers.set('x-newyorkhut-version', VERSION);
    headers.set('x-newyorkhut-feature', FEATURE);

    const type = headers.get('content-type') || '';
    if (!PRIORITY_PATHS.has(path) || !type.includes('text/html') || response.status !== 200) {
      return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
    }

    let html = await response.text();
    if (!html.includes('aria-label="New York HUT next steps"')) {
      html = html.replace(/<\/body>/i, `${authorityBlock(path)}</body>`);
    }
    return new Response(html, { status: response.status, statusText: response.statusText, headers });
  }
};
