import site from './index-v108.js';

const VERSION = 'v109';
const FEATURE = 'phase1-cannibalization-and-route-normalization-v109';
const PRIMARY_GUIDE = '/new-york-hut-guide';

const META = new Map([
  ['/what-is-new-york-highway-use-tax', {
    title: 'What Is New York Highway Use Tax? HUT Explained for Carriers',
    description: 'Understand what New York Highway Use Tax is, which highway operations it covers, how HUT differs from a permit credential, and where carriers should start.',
    h1: 'What Is New York Highway Use Tax (HUT)?'
  }],
  ['/who-needs-ny-hut', {
    title: 'Who Needs NY HUT? Weight & Carrier Requirements Explained',
    description: 'Learn which trucks and carriers may need New York HUT credentials, the general weight threshold, common exceptions, and how to check your situation.',
    h1: 'Who Needs New York HUT Credentials?'
  }],
  ['/ny-hut-registration-guide', {
    title: 'NY HUT Registration Guide: Accounts, Vehicles, Certificates & Decals',
    description: 'Learn the New York HUT registration process, account prerequisites, vehicle information, certificates, decals, and what carriers should prepare.',
    h1: 'NY HUT Registration Guide'
  }],
  ['/temporary-ny-hut-permit', {
    title: 'Temporary NY HUT Permit: Trip Certificate Rules & Requirements',
    description: 'Learn when a temporary New York HUT trip certificate may be appropriate, its operating limits, annual limit, timing considerations, and next steps.',
    h1: 'Temporary New York HUT Permit: Trip Certificate Guide'
  }],
  ['/ny-hut-renewal-guide', {
    title: 'NY HUT Renewal Guide: Certificates, Decals & Renewal Timing',
    description: 'Understand New York HUT renewal cycles, certificates and decals, what carriers should verify, and how renewal differs from replacement or revision.',
    h1: 'New York HUT Renewal Guide'
  }],
  ['/ny-hut-decal-replacement', {
    title: 'NY HUT Decal Replacement: Lost or Damaged Credentials',
    description: 'Learn what to do when a New York HUT certificate or decal is lost, damaged, destroyed, or unavailable and when replacement service is appropriate.',
    h1: 'New York HUT Decal and Credential Replacement'
  }],
  ['/ny-hut-registration-cost', {
    title: 'NY HUT Cost: Registration Fees, Service Charges & Tax Obligations',
    description: 'Understand New York HUT credential costs, service charges, and the difference between permit or registration costs and ongoing Highway Use Tax liability.',
    h1: 'New York HUT Registration Cost and Fees'
  }],
  ['/form-tmt-1-ny-hut', {
    title: 'Form TMT-1: New York HUT Certificate & Decal Application Guide',
    description: 'Guide to New York Form TMT-1 for HUT and AFC certificates and decals, including carrier, vehicle, VIN, weight, plate, and ownership information.',
    h1: 'Form TMT-1: New York HUT Certificate and Decal Application'
  }]
]);

function pathOf(request) {
  return new URL(request.url).pathname.replace(/\/+$/, '') || '/';
}

function setMeta(html, values) {
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${values.title}</title>`);
  if (/<meta\s+name=["']description["'][^>]*>/i.test(html)) {
    html = html.replace(/<meta\s+name=["']description["'][^>]*>/i, `<meta name="description" content="${values.description}">`);
  } else {
    html = html.replace(/<\/head>/i, `<meta name="description" content="${values.description}"></head>`);
  }
  if (/<h1\b[^>]*>[\s\S]*?<\/h1>/i.test(html)) {
    html = html.replace(/<h1([^>]*)>[\s\S]*?<\/h1>/i, `<h1$1>${values.h1}</h1>`);
  }
  return html;
}

function addPrimaryGuideContext(html, path) {
  if (path === PRIMARY_GUIDE || html.includes('id="nyh-v109-primary-guide-context"')) return html;
  const block = '<aside id="nyh-v109-primary-guide-context" style="width:min(980px,calc(100% - 36px));margin:22px auto;padding:16px 18px;border:1px solid #c8d8e6;border-radius:12px;background:#f7fbfe;color:#18324a"><strong>Need the full HUT overview?</strong> See the <a href="/new-york-hut-guide" style="font-weight:800;color:#075eae">complete New York HUT permit guide</a> for requirements, registration, temporary permits, costs, filing, records, and exemptions.</aside>';
  return html.replace(/<main\b[^>]*>/i, match => `${match}${block}`);
}

function normalizeTmtLegacy(request) {
  const url = new URL(request.url);
  if (url.pathname.replace(/\/+$/, '') === '/form-tmt-1') {
    url.pathname = '/form-tmt-1-ny-hut/';
    return Response.redirect(url.toString(), 301);
  }
  return null;
}

export default {
  async fetch(request, env, ctx) {
    const redirect = normalizeTmtLegacy(request);
    if (redirect) return redirect;

    const response = await site.fetch(request, env, ctx);
    const headers = new Headers(response.headers);
    headers.set('x-newyorkhut-version', VERSION);
    headers.set('x-newyorkhut-feature', FEATURE);

    const type = headers.get('content-type') || '';
    if (response.status !== 200 || !type.includes('text/html')) {
      return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
    }

    const path = pathOf(request);
    const values = META.get(path);
    if (!values) return new Response(response.body, { status: response.status, statusText: response.statusText, headers });

    let html = await response.text();
    html = setMeta(html, values);
    html = addPrimaryGuideContext(html, path);

    return new Response(html, { status: response.status, statusText: response.statusText, headers });
  }
};
