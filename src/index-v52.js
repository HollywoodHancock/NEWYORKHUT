import site from './index-v51.js';

const VERSION = 'v52';
const ORDER = 'https://www.nyhut.com/';

const BUTTON_NAV_CSS = `<style id="nyh-nav-button-override">
.nyh-global-header{position:sticky;top:0;z-index:1000;background:#fff;border-bottom:1px solid #d7e3ed;box-shadow:0 4px 18px rgba(8,43,76,.09);font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
.nyh-global-nav{width:min(1180px,calc(100% - 40px));min-height:76px;margin:auto;display:flex;align-items:center;justify-content:space-between;gap:20px;padding:11px 0}
.nyh-global-brand{font-weight:950;font-size:1.16rem;color:#082b4c;text-decoration:none;white-space:nowrap}
.nyh-global-links{display:flex;align-items:center;gap:9px;flex-wrap:wrap}
.nyh-global-links a{display:inline-flex;align-items:center;justify-content:center;min-height:42px;padding:9px 13px;border:1px solid #b8cad9;border-radius:10px;background:#f7fafc;color:#082b4c!important;font-size:.91rem;font-weight:900;line-height:1.1;text-decoration:none;box-shadow:0 2px 7px rgba(8,43,76,.05);transition:background .15s,border-color .15s,transform .15s,box-shadow .15s}
.nyh-global-links a:hover,.nyh-global-links a:focus{background:#e9f3fb;border-color:#1768c5;color:#0d559f!important;transform:translateY(-1px);box-shadow:0 5px 12px rgba(8,43,76,.1)}
.nyh-global-links .nyh-order-link{background:#1768c5;color:#fff!important;border-color:#1768c5;padding-left:16px;padding-right:16px}
.nyh-global-links .nyh-order-link:hover,.nyh-global-links .nyh-order-link:focus{background:#0f57aa;color:#fff!important;border-color:#0f57aa}
@media(max-width:900px){.nyh-global-nav{display:block}.nyh-global-brand{display:block;margin-bottom:11px}.nyh-global-links{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}.nyh-global-links a{width:100%;text-align:center}}
@media(max-width:650px){.nyh-global-header{position:relative}.nyh-global-nav{width:min(100% - 24px,1180px);padding:13px 0}.nyh-global-links{grid-template-columns:repeat(2,minmax(0,1fr))}.nyh-global-links a{min-height:44px;padding:9px 7px;font-size:.86rem}.nyh-global-links .nyh-order-link{grid-column:1/-1}}
</style>`;

function universalHeader(){
  return `<header id="nyh-global-header" class="nyh-global-header"><div class="nyh-global-nav"><a class="nyh-global-brand" href="/">NewYorkHUT.com</a><nav class="nyh-global-links" aria-label="Primary navigation"><a href="/learn">Learn</a><a href="/new-york-hut-guide">HUT Guide</a><a href="/tools">Tools</a><a href="/services">Services</a><a href="/ask-hut-ai">Ask HUT AI</a><a href="/site-map">All Pages</a><a href="${ORDER}" class="nyh-order-link">Order Permit</a></nav></div></header>`;
}

function hasUniversalHeader(html){
  return /<header\b[^>]*(?:id=["']nyh-global-header["']|class=["'][^"']*\bnyh-global-header\b[^"']*["'])/i.test(html);
}

function enforceNavigation(html){
  if(!html || !/<(?:!doctype\s+html|html|head|body)\b/i.test(html)) return html;
  let out = html;

  if(!out.includes('id="nyh-nav-button-override"')){
    if(/<\/head>/i.test(out)) out = out.replace(/<\/head>/i, BUTTON_NAV_CSS + '</head>');
    else out = BUTTON_NAV_CSS + out;
  }

  if(!hasUniversalHeader(out)){
    const legacyHeader = /<header\b[^>]*class=["'][^"']*\btop\b[^"']*["'][^>]*>[\s\S]*?<\/header>/i;
    if(legacyHeader.test(out)) out = out.replace(legacyHeader, universalHeader());
    else if(/<body\b[^>]*>/i.test(out)) out = out.replace(/<body\b([^>]*)>/i, `<body$1>${universalHeader()}`);
    else out = universalHeader() + out;
  } else if(!/id=["']nyh-global-header["']/i.test(out)) {
    out = out.replace(/<header\b([^>]*class=["'][^"']*\bnyh-global-header\b[^"']*["'][^>]*)>/i, '<header id="nyh-global-header"$1>');
  }

  return out;
}

export default {
  async fetch(request, env, ctx) {
    const response = await site.fetch(request, env, ctx);
    const headers = new Headers(response.headers);
    headers.set('x-newyorkhut-version', VERSION);
    const type = headers.get('content-type') || '';

    if(type.includes('text/html')) {
      headers.set('cache-control', 'no-store, no-cache, must-revalidate, max-age=0');
      return new Response(enforceNavigation(await response.text()), {
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