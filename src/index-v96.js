import site from './index-v95.js';

const VERSION = 'v96';
const FEATURE = 'intent-specific-nyhut-conversion-handoff-v96';

const HANDOFFS = {
  '/learn/who-needs-a-new-york-hut-permit': ['Need a HUT permit?', 'Start your NY HUT permit order'],
  '/learn/how-to-register-for-new-york-hut': ['Ready to register?', 'Start your NY HUT permit order'],
  '/learn/new-york-hut-certificate-of-registration': ['Need your HUT credential?', 'Start your NY HUT permit order'],
  '/learn/temporary-hut-permits-and-first-trip-questions': ['Need a temporary HUT permit?', 'Start your temporary NY HUT permit order'],
  '/learn/new-york-hut-penalties': ['Need to get compliant?', 'Start your NY HUT permit order'],
  '/learn/new-york-hut-exempt-vehicles': ['Confirmed that you need HUT?', 'Start your NY HUT permit order'],
  '/tools/hut-permit-requirement': ['Your vehicle needs HUT?', 'Start your NY HUT permit order'],
  '/hut-registration-center': ['Ready to obtain HUT credentials?', 'Start your NY HUT permit order'],
  '/services/new-hut-permit': ['Ready to order?', 'Start your NY HUT permit order'],
  '/services/temporary-hut-permit': ['Need temporary authority?', 'Start your temporary NY HUT permit order'],
  '/services/add-vehicle': ['Adding another vehicle?', 'Continue to NYHUT.com'],
  '/services/hut-renewal': ['Need HUT service?', 'Continue to NYHUT.com']
};

function pathOf(request) {
  return new URL(request.url).pathname.replace(/\/+$/, '') || '/';
}

function trackedOrderUrl(path) {
  const content = `${path.replace(/^\//, '').replace(/\//g, '-')}-intent-cta`;
  return `https://www.nyhut.com/?utm_source=newyorkhut.com&utm_medium=referral&utm_campaign=authority_site&utm_content=${encodeURIComponent(content)}`;
}

function handoffBlock(path, copy) {
  const [heading, label] = copy;
  return `<aside aria-label="NYHUT ordering handoff" style="margin:28px auto;padding:22px;width:min(1040px,calc(100% - 36px));border:1px solid #c9dceb;border-radius:14px;background:#f8fcff"><div style="font:800 1.25rem/1.25 system-ui,sans-serif;color:#082b4c;margin-bottom:7px">${heading}</div><p style="font:400 1rem/1.5 system-ui,sans-serif;color:#435d75;margin:0 0 14px">NewYorkHUT.com provides independent HUT guidance and tools. Secure permit ordering and customer account service are handled through NYHUT.com.</p><a href="${trackedOrderUrl(path)}" rel="noopener" style="display:inline-block;background:#176dcc;color:#fff;text-decoration:none;font:800 1rem system-ui,sans-serif;padding:11px 16px;border-radius:9px">${label} →</a></aside>`;
}

export default {
  async fetch(request, env, ctx) {
    const response = await site.fetch(request, env, ctx);
    const path = pathOf(request);
    const headers = new Headers(response.headers);
    headers.set('x-newyorkhut-version', VERSION);
    headers.set('x-newyorkhut-feature', FEATURE);

    const type = headers.get('content-type') || '';
    if (!HANDOFFS[path] || response.status !== 200 || !type.includes('text/html')) {
      return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
    }

    let html = await response.text();
    if (!html.includes('aria-label="NYHUT ordering handoff"')) {
      const block = handoffBlock(path, HANDOFFS[path]);
      const marker = '<section aria-label="New York HUT next steps"';
      html = html.includes(marker) ? html.replace(marker, `${block}${marker}`) : html.replace(/<\/body>/i, `${block}</body>`);
    }
    return new Response(html, { status: response.status, statusText: response.statusText, headers });
  }
};
