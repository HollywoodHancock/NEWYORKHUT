import site from './index-v105.js';

const VERSION = 'v106';
const FEATURE = 'intent-specific-cross-domain-funnel-v106';

const DESTINATIONS = new Map([
  ['/new-york-hut-guide', ['/ny-hut-permit', 'Apply for a New York HUT permit']],
  ['/what-is-new-york-highway-use-tax', ['/ny-hut-permit', 'Apply for a New York HUT permit']],
  ['/who-needs-ny-hut', ['/ny-hut-permit', 'Apply for a New York HUT permit']],
  ['/ny-hut-weight-requirements', ['/ny-hut-permit', 'Apply for a New York HUT permit']],
  ['/ny-hut-out-of-state-carriers', ['/ny-hut-permit', 'Apply for a New York HUT permit']],
  ['/ny-hut-faq', ['/ny-hut-permit', 'Compare NY HUT permit options']],
  ['/hut-registration-center', ['/ny-hut-registration', 'Start regular NY HUT registration']],
  ['/ny-hut-registration-guide', ['/ny-hut-registration', 'Start regular NY HUT registration']],
  ['/ny-hut-certificate-and-decal', ['/ny-hut-registration', 'Start regular NY HUT registration']],
  ['/learn/who-needs-a-new-york-hut-permit', ['/ny-hut-permit', 'Apply for a New York HUT permit']],
  ['/learn/how-to-register-for-new-york-hut', ['/ny-hut-registration', 'Start regular NY HUT registration']],
  ['/learn/new-york-hut-certificate-of-registration', ['/ny-hut-registration', 'Start regular NY HUT registration']],
  ['/learn/new-york-hut-decals-explained', ['/ny-hut-registration', 'Start regular NY HUT registration']],
  ['/learn/common-hut-registration-mistakes', ['/ny-hut-registration', 'Start regular NY HUT registration']],
  ['/tools/hut-permit-requirement', ['/ny-hut-permit', 'Apply for a New York HUT permit']],
  ['/services/new-hut-permit', ['/ny-hut-registration', 'Start regular NY HUT registration']],

  ['/temporary-ny-hut-permit', ['/temporary-ny-hut-permit', 'Order a temporary NY HUT trip certificate']],
  ['/ny-hut-trip-certificate-limits', ['/temporary-ny-hut-permit', 'Order a temporary NY HUT trip certificate']],
  ['/guides/get-trip-certificate', ['/temporary-ny-hut-permit', 'Order a temporary NY HUT trip certificate']],
  ['/learn/temporary-hut-permits-and-first-trip-questions', ['/temporary-ny-hut-permit', 'Order a temporary NY HUT trip certificate']],
  ['/services/temporary-hut-permit', ['/temporary-ny-hut-permit', 'Order a temporary NY HUT trip certificate']],

  ['/ny-hut-decal-replacement', ['/ny-hut-permit-replacement', 'Request a replacement HUT permit or decal']],
  ['/services/replacement-credentials', ['/ny-hut-permit-replacement', 'Request a replacement HUT permit or decal']],

  ['/ny-hut-renewal-guide', ['/ny-hut-renewal', 'Start NY HUT renewal service']],
  ['/ny-hut-renewal-calculator', ['/ny-hut-renewal', 'Start NY HUT renewal service']],
  ['/services/hut-renewal', ['/ny-hut-renewal', 'Start NY HUT renewal service']],

  ['/ny-hut-registration-cost', ['/ny-hut-cost', 'Compare NY HUT permit services and pricing']],
  ['/services', ['/ny-hut-cost', 'Compare NY HUT permit services and pricing']],

  ['/services/add-vehicle', ['/ny-hut-registration', 'Start regular NY HUT registration']]
]);

function pathOf(request) {
  return new URL(request.url).pathname.replace(/\/+$/, '') || '/';
}

function trackedUrl(sourcePath, destinationPath, rawHref) {
  const destination = new URL(destinationPath, 'https://nyhut.com');
  try {
    const old = new URL(rawHref.replace(/&amp;/g, '&'), 'https://nyhut.com');
    for (const [key, value] of old.searchParams) destination.searchParams.set(key, value);
  } catch {
    // Keep the canonical destination even if an inherited href cannot be parsed.
  }
  destination.searchParams.set('utm_source', 'newyorkhut.com');
  destination.searchParams.set('utm_medium', 'referral');
  destination.searchParams.set('utm_campaign', 'authority_site');
  destination.searchParams.set('utm_content', `${sourcePath.replace(/^\//, '').replace(/\//g, '-') || 'homepage'}-intent-handoff`);
  return destination.toString().replace(/&/g, '&amp;');
}

function rewriteCommercialLinks(html, sourcePath, destinationPath) {
  return html.replace(/href=("|')(https:\/\/(?:www\.)?nyhut\.com(?:\/[^"']*)?)\1/gi, (match, quote, href) => {
    return `href=${quote}${trackedUrl(sourcePath, destinationPath, href)}${quote}`;
  });
}

function improveGenericHandoffLabel(html, label) {
  return html
    .replace(/>Continue to NYHUT\.com\s*→?<\/a>/gi, `>${label} →</a>`)
    .replace(/>Visit NYHUT\.com\s*→?<\/a>/gi, `>${label} →</a>`)
    .replace(/>Start Your Permit\s*→?<\/a>/gi, `>${label} →</a>`);
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

    const sourcePath = pathOf(request);
    const mapping = DESTINATIONS.get(sourcePath);
    if (!mapping) {
      return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
    }

    const [destinationPath, label] = mapping;
    let html = await response.text();
    html = rewriteCommercialLinks(html, sourcePath, destinationPath);
    html = improveGenericHandoffLabel(html, label);

    return new Response(html, { status: response.status, statusText: response.statusText, headers });
  }
};
