import site from './index-v102.js';

const VERSION = 'v103';
const FEATURE = 'canonical-host-and-indexing-repair-v103';
const CANONICAL_ORIGIN = 'https://newyorkhut.com';

const PERMANENT_REDIRECTS = new Map([
  ['/what-is-hut', '/new-york-hut-guide'],
  ['/new-york-hut-weight-threshold', '/learn/how-gvw-affects-your-hut-tax'],
  ['/learn/adding-a-vehicle-to-your-new-york-hut-account', '/learn/adding-a-vehicle-to-new-york-hut']
]);

const NOINDEX_PATHS = new Set(['/search', '/site-map']);

function normalizedPath(url) {
  return url.pathname.replace(/\/+$/, '') || '/';
}

function permanentRedirect(url, pathname = url.pathname) {
  const destination = new URL(pathname || '/', CANONICAL_ORIGIN);
  destination.search = url.search;
  return new Response(null, {
    status: 301,
    headers: {
      location: destination.toString(),
      'cache-control': 'public, max-age=86400',
      'x-newyorkhut-version': VERSION,
      'x-newyorkhut-feature': FEATURE
    }
  });
}

function legalPage({ path, title, description, heading, body }) {
  const canonical = `${CANONICAL_ORIGIN}${path}`;
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><meta name="description" content="${description}"><meta name="robots" content="index,follow"><link rel="canonical" href="${canonical}"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:url" content="${canonical}"><meta property="og:type" content="website"><style>:root{font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#14283d}*{box-sizing:border-box}body{margin:0;line-height:1.65;background:#fff}.w{width:min(900px,calc(100% - 36px));margin:auto}.top{border-bottom:1px solid #d7e3ed}.nav{min-height:72px;display:flex;align-items:center;justify-content:space-between;gap:18px}.brand{font-size:1.3rem;font-weight:900;color:#082b4c;text-decoration:none}.links{display:flex;gap:15px;flex-wrap:wrap}.links a{color:#176dcc;font-weight:750;text-decoration:none}.hero{padding:44px 0 28px;background:linear-gradient(135deg,#fbfdff,#eef6fb)}h1{margin:0 0 12px;color:#082b4c;font-size:clamp(2.1rem,5vw,3.4rem);line-height:1.08}.lead{color:#435d75;font-size:1.08rem}.content{padding:30px 0 46px}.content h2{color:#082b4c;margin-top:28px}.content a{color:#176dcc}.note{border:1px solid #d7e3ed;border-radius:12px;background:#f8fbfd;padding:16px}@media(max-width:700px){.nav{display:block;padding:14px 0}.links{margin-top:8px}}</style></head><body><header class="top"><div class="w nav"><a class="brand" href="/">NewYorkHUT.com</a><nav class="links" aria-label="Primary navigation"><a href="/learn">Learn</a><a href="/tools">Tools</a><a href="/about">About</a></nav></div></header><main><section class="hero"><div class="w"><h1>${heading}</h1><p class="lead">${description}</p></div></section><article class="w content">${body}<p class="note"><strong>Independent resource:</strong> NewYorkHUT.com is not a New York State government website. Official requirements should be confirmed with the appropriate New York State agency.</p></article></main></body></html>`;
  return new Response(html, {
    status: 200,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public, max-age=300',
      'x-newyorkhut-version': VERSION,
      'x-newyorkhut-feature': FEATURE
    }
  });
}

function termsPage() {
  return legalPage({
    path: '/terms',
    title: 'Terms of Use | NewYorkHUT.com',
    description: 'Terms governing use of the independent NewYorkHUT.com educational website, guides, calculators, and compliance resources.',
    heading: 'Terms of Use',
    body: `<p><strong>Last updated: August 26, 2026.</strong></p><h2>Educational information</h2><p>NewYorkHUT.com provides general educational information about New York Highway Use Tax registration, filing, recordkeeping, vehicles, and compliance. The website does not provide legal or tax advice and does not replace instructions issued by the New York State Department of Taxation and Finance or another government agency.</p><h2>No government affiliation</h2><p>NewYorkHUT.com is an independent resource and is not operated by, endorsed by, or affiliated with New York State.</p><h2>Accuracy and availability</h2><p>We work to keep the information useful and current, but laws, forms, rates, deadlines, agency practices, and website features can change. Information is provided without a guarantee that it applies to every carrier, vehicle, filing period, or fact pattern.</p><h2>Tools and external links</h2><p>Calculators and screening tools provide planning estimates only. Links to government resources and NYHUT.com are provided for convenience. Separate websites and services are governed by their own terms and privacy practices.</p><h2>Acceptable use</h2><p>You may use this website for lawful research and compliance planning. You may not interfere with its operation, attempt unauthorized access, submit malicious material, or misrepresent the site as an official government resource.</p><h2>Contact</h2><p>Questions about these terms may be submitted through the <a href="/about">About page</a>.</p>`
  });
}

function privacyPage() {
  return legalPage({
    path: '/privacy-policy',
    title: 'Privacy Policy | NewYorkHUT.com',
    description: 'How NewYorkHUT.com handles website usage information and protects visitors using its educational guides and compliance tools.',
    heading: 'Privacy Policy',
    body: `<p><strong>Last updated: August 26, 2026.</strong></p><h2>Information collected</h2><p>The website may receive standard technical information sent by a browser, such as IP address, device and browser type, referring page, requested page, and approximate visit time. If a visitor voluntarily submits a question or request through an available feature, the information entered is used to respond to that request.</p><h2>Analytics and referral measurement</h2><p>We may use privacy-conscious website analytics to understand which resources are useful. Links from NewYorkHUT.com to NYHUT.com may contain campaign parameters that identify the referring page; those parameters do not contain a visitor's FEIN, SSN, payment information, or vehicle data.</p><h2>Sensitive information</h2><p>Do not send FEIN, SSN, payment details, or confidential documents through ordinary educational or search features. Secure ordering and customer-account functions are handled separately through NYHUT.com.</p><h2>Sharing</h2><p>We do not sell personal information. Information may be processed by service providers supporting hosting, security, analytics, or communications, and may be disclosed when required by law or necessary to protect the website and its users.</p><h2>Retention and choices</h2><p>Technical and voluntarily submitted information is retained only as reasonably needed for security, operations, analytics, responses, and legal obligations. Browser controls may be used to limit cookies or similar storage where applicable.</p><h2>Contact</h2><p>Privacy questions may be submitted through the <a href="/about">About page</a>.</p>`
  });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Enforce one protocol and hostname before any legacy route handler runs.
    if (url.protocol !== 'https:' || url.hostname !== 'newyorkhut.com') {
      return permanentRedirect(url);
    }

    const path = normalizedPath(url);
    const redirectTarget = PERMANENT_REDIRECTS.get(path);
    if (redirectTarget) return permanentRedirect(url, redirectTarget);

    // These routes previously fell through a legacy handler and produced 5xx errors.
    if (path === '/terms') return termsPage();
    if (path === '/privacy-policy') return privacyPage();

    const response = await site.fetch(request, env, ctx);
    const headers = new Headers(response.headers);
    headers.set('x-newyorkhut-version', VERSION);
    headers.set('x-newyorkhut-feature', FEATURE);

    // Search results, human directory pages, and downloadable data are useful to
    // visitors but are not independent search landing pages.
    if (NOINDEX_PATHS.has(path) || path.startsWith('/downloads/')) {
      headers.set('x-robots-tag', 'noindex, follow');
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
