import site from './index-v51.js';

const VERSION = 'v52';

const BUTTON_NAV_CSS = `<style id="nyh-nav-button-override">
.nyh-global-header{position:sticky;top:0;box-shadow:0 4px 18px rgba(8,43,76,.09)}
.nyh-global-nav{padding:11px 0;min-height:76px}
.nyh-global-links{gap:9px}
.nyh-global-links a{display:inline-flex;align-items:center;justify-content:center;min-height:42px;padding:9px 13px;border:1px solid #b8cad9;border-radius:10px;background:#f7fafc;color:#082b4c!important;font-size:.91rem;font-weight:900;line-height:1.1;box-shadow:0 2px 7px rgba(8,43,76,.05);transition:background .15s,border-color .15s,transform .15s,box-shadow .15s}
.nyh-global-links a:hover,.nyh-global-links a:focus{background:#e9f3fb;border-color:#1768c5;color:#0d559f!important;transform:translateY(-1px);box-shadow:0 5px 12px rgba(8,43,76,.1)}
.nyh-global-links .nyh-order-link{background:#1768c5;color:#fff!important;border-color:#1768c5;padding-left:16px;padding-right:16px}
.nyh-global-links .nyh-order-link:hover,.nyh-global-links .nyh-order-link:focus{background:#0f57aa;color:#fff!important;border-color:#0f57aa}
@media(max-width:900px){.nyh-global-nav{display:block}.nyh-global-brand{display:block;margin-bottom:11px}.nyh-global-links{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}.nyh-global-links a{width:100%;text-align:center}}
@media(max-width:650px){.nyh-global-header{position:relative}.nyh-global-nav{padding:13px 0}.nyh-global-links{grid-template-columns:repeat(2,minmax(0,1fr))}.nyh-global-links a{min-height:44px;padding:9px 7px;font-size:.86rem}.nyh-global-links .nyh-order-link{grid-column:1/-1}}
</style>`;

function upgradeNavigation(html){
  if(!html || !/<html[\s>]/i.test(html)) return html;
  if(html.includes('nyh-nav-button-override')) return html;
  return html.replace(/<\/head>/i, BUTTON_NAV_CSS + '</head>');
}

export default {
  async fetch(request, env, ctx) {
    const response = await site.fetch(request, env, ctx);
    const headers = new Headers(response.headers);
    headers.set('x-newyorkhut-version', VERSION);
    const type = headers.get('content-type') || '';

    if(type.includes('text/html')) {
      headers.set('cache-control', 'no-store, no-cache, must-revalidate, max-age=0');
      return new Response(upgradeNavigation(await response.text()), {
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
