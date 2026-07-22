import site from './index-v52.js';

const VERSION = 'v53';
const ORDER = 'https://www.nyhut.com/';

const NAV_CSS = `<style id="nyh-v53-navigation-css">
html body > header#nyh-global-header{display:block!important;visibility:visible!important;opacity:1!important;position:sticky;top:0;z-index:2147483646;background:#fff;border-bottom:1px solid #d7e3ed;box-shadow:0 4px 18px rgba(8,43,76,.09);font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;transform:none!important}
#nyh-global-header .nyh-global-nav{width:min(1180px,calc(100% - 40px));min-height:76px;margin:auto;display:flex!important;align-items:center;justify-content:space-between;gap:20px;padding:11px 0}
#nyh-global-header .nyh-global-brand{display:block!important;font-weight:950;font-size:1.16rem;color:#082b4c;text-decoration:none;white-space:nowrap}
#nyh-global-header .nyh-global-links{display:flex!important;visibility:visible!important;opacity:1!important;align-items:center;gap:9px;flex-wrap:wrap;position:static!important;transform:none!important}
#nyh-global-header .nyh-global-links a{display:inline-flex!important;visibility:visible!important;opacity:1!important;align-items:center;justify-content:center;min-height:42px;padding:9px 13px;border:1px solid #b8cad9;border-radius:10px;background:#f7fafc;color:#082b4c!important;font-size:.91rem;font-weight:900;line-height:1.1;text-decoration:none;box-shadow:0 2px 7px rgba(8,43,76,.05)}
#nyh-global-header .nyh-global-links a:hover,#nyh-global-header .nyh-global-links a:focus{background:#e9f3fb;border-color:#1768c5;color:#0d559f!important}
#nyh-global-header .nyh-global-links .nyh-order-link{background:#1768c5;color:#fff!important;border-color:#1768c5}
@media(max-width:900px){#nyh-global-header .nyh-global-nav{display:block!important}#nyh-global-header .nyh-global-brand{display:block!important;margin-bottom:11px}#nyh-global-header .nyh-global-links{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}#nyh-global-header .nyh-global-links a{width:100%;text-align:center}}
@media(max-width:650px){#nyh-global-header{position:relative}#nyh-global-header .nyh-global-nav{width:min(100% - 24px,1180px);padding:13px 0}#nyh-global-header .nyh-global-links{grid-template-columns:repeat(2,minmax(0,1fr))}#nyh-global-header .nyh-global-links .nyh-order-link{grid-column:1/-1}}
</style>`;

function navHeader() {
  return `<header id="nyh-global-header"><div class="nyh-global-nav"><a class="nyh-global-brand" href="/">NewYorkHUT.com</a><nav class="nyh-global-links" aria-label="Primary navigation"><a href="/learn">Learn</a><a href="/new-york-hut-guide">HUT Guide</a><a href="/tools">Tools</a><a href="/services">Services</a><a href="/ask-hut-ai">Ask HUT AI</a><a href="/site-map">All Pages</a><a href="${ORDER}" class="nyh-order-link">Order Permit</a></nav></div></header>`;
}

function injectNavigation(html) {
  if (!html || !/<html\b|<body\b|<!doctype\s+html/i.test(html)) return html;

  let output = html;

  output = output.replace(/<header\b[^>]*(?:id=["']nyh-global-header["']|class=["'][^"']*\bnyh-global-header\b[^"']*["'])[^>]*>[\s\S]*?<\/header>/gi, '');
  output = output.replace(/<header\b[^>]*id=["']nyh47-header["'][^>]*>[\s\S]*?<\/header>/gi, '');

  // Neutralize the legacy v47 rule that hides every top-level header except nyh47-header.
  output = output.replace(
    /body>header:not\(#nyh47-header\),body>nav:not\(\.nyh47-menu\),body>footer:not\(#nyh47-footer\)\{display:none!important\}/gi,
    'body>header:not(#nyh47-header):not(#nyh-global-header),body>nav:not(.nyh47-menu),body>footer:not(#nyh47-footer){display:none!important}'
  );

  if (!output.includes('id="nyh-v53-navigation-css"')) {
    output = /<\/head>/i.test(output)
      ? output.replace(/<\/head>/i, `${NAV_CSS}</head>`)
      : `${NAV_CSS}${output}`;
  }

  if (/<body\b[^>]*>/i.test(output)) {
    output = output.replace(/<body\b([^>]*)>/i, `<body$1>${navHeader()}`);
  } else {
    output = `${navHeader()}${output}`;
  }

  return output;
}

export default {
  async fetch(request, env, ctx) {
    const response = await site.fetch(request, env, ctx);
    const headers = new Headers(response.headers);
    headers.set('x-newyorkhut-version', VERSION);
    headers.set('x-newyorkhut-navigation', 'universal-buttons-v53-visible-fixed');
    headers.set('cache-control', 'no-store, no-cache, must-revalidate, max-age=0');

    const type = headers.get('content-type') || '';
    if (type.includes('text/html')) {
      const html = await response.text();
      return new Response(injectNavigation(html), {
        status: response.status,
        statusText: response.statusText,
        headers
      });
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};