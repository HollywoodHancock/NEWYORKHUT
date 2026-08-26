import site from './index-v103.js';

const VERSION = 'v104';
const FEATURE = 'universal-navigation-normalization-v104';

const NAV_STYLE = `<style id="nyh-v104-navigation-css">#nyh-global-header{position:relative!important;display:block!important;visibility:visible!important;opacity:1!important;background:#fff!important;border-bottom:1px solid #d7e3ed!important;color:#082b4c!important;z-index:1000!important}#nyh-global-header .nyh-nav-wrap{width:min(1120px,calc(100% - 36px));min-height:76px;margin:auto;display:flex;align-items:center;justify-content:space-between;gap:18px}#nyh-global-header .nyh-brand{color:#082b4c!important;text-decoration:none!important;font:900 1.35rem/1.2 Inter,system-ui,sans-serif!important;white-space:nowrap}#nyh-global-header nav{display:flex!important;align-items:center;justify-content:flex-end;gap:7px;flex-wrap:wrap}#nyh-global-header nav a{display:inline-flex!important;align-items:center!important;min-height:40px;padding:9px 11px;border:1px solid #bfd0de;border-radius:9px;color:#082b4c!important;background:#fff;text-decoration:none!important;font:800 .92rem/1.2 Inter,system-ui,sans-serif!important}#nyh-global-header nav a.nyh-order{background:#176dcc!important;border-color:#176dcc!important;color:#fff!important}@media(max-width:900px){#nyh-global-header .nyh-nav-wrap{display:block;padding:12px 0}#nyh-global-header .nyh-brand{display:block;margin-bottom:9px}#nyh-global-header nav{justify-content:flex-start;flex-wrap:nowrap;overflow-x:auto;padding-bottom:3px}}</style>`;

function universalHeader() {
  return `<header id="nyh-global-header" class="nyh-global-header"><div class="nyh-nav-wrap"><a class="nyh-brand" href="/">NewYorkHUT.com</a><nav aria-label="Primary navigation"><a href="/learn">Learn</a><a href="/new-york-hut-guide">HUT Guide</a><a href="/tools">Tools</a><a href="/services">Services</a><a href="/ask-hut-ai">Ask HUT AI</a><a href="/site-map">All Pages</a><a class="nyh-order" href="https://nyhut.com/ny-hut-permit?utm_source=newyorkhut.com&amp;utm_medium=referral&amp;utm_campaign=authority_site&amp;utm_content=universal-navigation">Order Permit</a></nav></div></header>`;
}

function normalizeNavigation(html) {
  if (html.includes('id="nyh-global-header"') && html.includes('aria-label="Primary navigation"')) return html;

  if (!html.includes('nyh-v104-navigation-css')) {
    html = /<\/head>/i.test(html) ? html.replace(/<\/head>/i, `${NAV_STYLE}</head>`) : `${NAV_STYLE}${html}`;
  }

  const header = universalHeader();
  if (/<header\b[\s\S]*?<\/header>/i.test(html)) {
    return html.replace(/<header\b[\s\S]*?<\/header>/i, header);
  }
  return html.replace(/<body\b[^>]*>/i, match => `${match}${header}`);
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

    const html = normalizeNavigation(await response.text());
    return new Response(html, { status: response.status, statusText: response.statusText, headers });
  }
};
