import site from './index-v114.js';

const VERSION = 'v115';
const FEATURE = 'tmt1-indexability-recovery-v115';
const CANONICAL_PATH = '/form-tmt-1-ny-hut';
const NYHUT_ORIGIN = 'https://nyhut.com';

const PAGE_HANDOFFS = new Map([
  ['/services/add-a-vehicle', '/order?product=nyhut-new'],
  ['/new-york-hut/how-do-i-add-a-vehicle-to-my-hut-account', '/order?product=nyhut-new'],
  ['/new-york-hut/how-do-i-change-a-license-plate-on-a-hut-credential', '/order?product=nyhut-revision'],
  ['/new-york-hut/what-are-25th-series-hut-credentials', '/ny-hut-renewal'],
  ['/guides/get-trip-certificate', '/order?product=nyhut-temporary'],
  ['/cost', '/ny-hut-cost'],
  ['/cost/late-filing', '/ny-hut-quarterly-filing-basics'],
  ['/filing/quarterly-due-dates', '/ny-hut-quarterly-filing-basics'],
  ['/vehicles/box-trucks', '/who-needs-a-ny-hut-permit']
]);

const NO_SALES_HANDOFF = new Set([
  '/new-york-hut/how-do-i-remove-or-cancel-a-hut-vehicle',
  '/ny-hut-account-closure',
  '/ny-hut-certificate-cancellation'
]);

const LABEL_DESTINATIONS = new Map([
  ['my nyhut', '/my-nyhut'],
  ['customer dashboard', '/my-nyhut'],
  ['order status', '/lookup'],
  ['trip certificate', '/order?product=nyhut-temporary'],
  ['add a vehicle', '/order?product=nyhut-new'],
  ['new hut permit', '/order?product=nyhut-new'],
  ['replacement permit', '/order?product=nyhut-replacement'],
  ['credential revision', '/order?product=nyhut-revision']
]);

function normalizePath(url) {
  return url.pathname.replace(/\/+$/, '') || '/';
}

function trackedDestination(destination, sourcePath, label) {
  const url = new URL(destination, NYHUT_ORIGIN);
  url.searchParams.set('utm_source', 'newyorkhut.com');
  url.searchParams.set('utm_medium', 'referral');
  url.searchParams.set('utm_campaign', 'authority_site');
  url.searchParams.set('utm_content', `${sourcePath.replace(/^\//, '').replace(/\//g, '-') || 'homepage'}-${label.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`);
  return url.toString().replace(/&/g, '&amp;');
}

function repairCommercialDestinations(html, sourcePath) {
  return html.replace(/<a\b([^>]*?)href=(["'])https:\/\/(?:www\.)?nyhut\.com[^"']*\2([^>]*)>([\s\S]*?)<\/a>/gi, (anchor, before, quote, after, body) => {
    const label = body.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
    const fixedDestination = LABEL_DESTINATIONS.get(label);
    const isPrimaryOrderLink = /nyh-order-link/i.test(`${before} ${after}`) || ['order permit', 'start a hut permit', 'start your permit', 'continue to nyhut.com', 'visit nyhut.com'].includes(label);
    const destination = fixedDestination ?? (isPrimaryOrderLink ? PAGE_HANDOFFS.get(sourcePath) ?? '/ny-hut-permit' : null);
    if (!destination) return anchor;
    if (NO_SALES_HANDOFF.has(sourcePath) && !['/my-nyhut', '/lookup'].includes(destination)) return '';
    return `<a${before}href=${quote}${trackedDestination(destination, sourcePath, label)}${quote}${after}>${body}</a>`;
  });
}

function tmtPage() {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Form TMT-1: New York HUT Application Guide | NewYorkHUT.com</title>
  <meta name="description" content="Learn what New York Form TMT-1 is, what carrier and vehicle information it requires, and how it relates to HUT certificates and decals.">
  <meta name="robots" content="index,follow">
  <link rel="canonical" href="https://newyorkhut.com/form-tmt-1-ny-hut">
  <meta property="og:url" content="https://newyorkhut.com/form-tmt-1-ny-hut">
  <meta property="og:title" content="Form TMT-1: New York HUT Application Guide">
  <meta property="og:description" content="An educational guide to the carrier and vehicle information used for New York HUT registration.">
  <style>
    :root{font-family:Inter,ui-sans-serif,system-ui,sans-serif;color:#18324a;background:#f5f9fc}*{box-sizing:border-box}body{margin:0}a{color:#075eae}.wrap{width:min(980px,calc(100% - 36px));margin:auto}.top{background:#082b4c;color:#fff;padding:18px 0}.top a{color:#fff;text-decoration:none;font-weight:800}.hero{padding:54px 0 30px}.eyebrow{font-size:.78rem;font-weight:900;letter-spacing:.08em;text-transform:uppercase;color:#1768c5}h1{font-size:clamp(2rem,5vw,3.4rem);line-height:1.06;margin:.5rem 0 1rem;color:#082b4c}h2{color:#082b4c;margin-top:2rem}.lead{font-size:1.12rem;line-height:1.7;color:#425d73}.card{background:#fff;border:1px solid #d5e1ea;border-radius:16px;padding:24px;margin:18px 0;box-shadow:0 8px 28px rgba(8,43,76,.06)}li{margin:.55rem 0;line-height:1.55}.cta{display:inline-block;margin-top:12px;padding:13px 18px;border-radius:10px;background:#1768c5;color:#fff;text-decoration:none;font-weight:900}.note{border-left:4px solid #e3ad2f;background:#fffaf0;padding:14px 16px;margin:20px 0}footer{margin-top:46px;background:#082b4c;color:#dce9f3;padding:28px 0;font-size:.9rem}
  </style>
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://newyorkhut.com/"},{"@type":"ListItem","position":2,"name":"Registration Guide","item":"https://newyorkhut.com/ny-hut-registration-guide"},{"@type":"ListItem","position":3,"name":"Form TMT-1","item":"https://newyorkhut.com/form-tmt-1-ny-hut"}]}</script>
</head>
<body>
  <header class="top"><div class="wrap"><nav aria-label="Primary navigation"><a href="/">NewYorkHUT.com</a> · <a href="/new-york-hut-guide">HUT Guide</a> · <a href="/learn">Learning Center</a></nav><div>Compliance University™ knowledge center</div></div></header>
  <main class="wrap">
    <section class="hero"><div class="eyebrow">New York HUT registration</div><h1>Form TMT-1: New York HUT Certificate and Decal Application</h1><p class="lead">Form TMT-1 is used in the New York Highway Use Tax registration process. This guide explains the information carriers should prepare before requesting HUT credentials.</p></section>
    <section class="card"><h2>Information commonly needed</h2><ul><li>Legal business name, contact details, and taxpayer identification information.</li><li>USDOT and operating-authority information, when applicable.</li><li>Vehicle identification number, plate details, unit number, fuel type, axles, and weight information.</li><li>Ownership or lease information for each vehicle being registered.</li></ul></section>
    <section class="card"><h2>What the application produces</h2><p>After New York accepts the registration, the carrier receives the applicable HUT certificate of registration and vehicle decal. Filing an application does not replace the carrier's ongoing highway-use-tax reporting and recordkeeping obligations.</p><p><a href="/ny-hut-registration-guide">Read the NY HUT registration guide</a> or review <a href="/ny-hut-certificate-and-decal">certificate and decal requirements</a>.</p></section>
    <aside class="note"><strong>Educational resource:</strong> NewYorkHUT.com explains the requirement. Permit ordering and payment are handled separately by NYHUT.com by Authorities Direct.</aside>
    <section class="card"><h2>Ready to request registration service?</h2><p>Use the commercial application only after confirming that regular registration—not a temporary trip certificate or replacement credential—is the right service.</p><a class="cta" href="https://nyhut.com/order?product=nyhut-new&amp;utm_source=newyorkhut.com&amp;utm_medium=referral&amp;utm_campaign=authority_site&amp;utm_content=form-tmt-1-ny-hut-intent-handoff">Start regular NY HUT registration →</a></section>
  </main>
  <footer><div class="wrap">© 2026 NewYorkHUT.com. Educational content within the Compliance University™ framework.</div></footer>
</body>
</html>`;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = normalizePath(url);

    if (path === '/form-tmt-1') {
      url.pathname = `${CANONICAL_PATH}/`;
      return Response.redirect(url.toString(), 301);
    }

    if (path === CANONICAL_PATH) {
      return new Response(tmtPage(), {
        headers: {
          'content-type': 'text/html; charset=UTF-8',
          'cache-control': 'public, max-age=300',
          'x-newyorkhut-version': VERSION,
          'x-newyorkhut-feature': FEATURE
        }
      });
    }

    const response = await site.fetch(request, env, ctx);
    const headers = new Headers(response.headers);
    headers.set('x-newyorkhut-version', VERSION);
    headers.set('x-newyorkhut-feature', FEATURE);
    const type = headers.get('content-type') || '';
    if (response.status === 200 && type.includes('text/html')) {
      const html = repairCommercialDestinations(await response.text(), path);
      return new Response(html, { status: response.status, statusText: response.statusText, headers });
    }
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  }
};
