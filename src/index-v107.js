import site from './index-v106.js';

const VERSION = 'v107';
const FEATURE = 'expanded-intent-specific-funnel-v107';

// Pages not already covered by v106. These remain informational on NewYorkHUT.com
// while their commercial handoff points to the most relevant NYHUT.com service page.
const DESTINATIONS = new Map([
  ['/', ['/ny-hut-permit', 'Apply for a New York HUT permit']],
  ['/ifta-vs-ny-hut', ['/ny-hut-permit', 'Apply for a New York HUT permit']],
  ['/irp-vs-ny-hut', ['/ny-hut-permit', 'Apply for a New York HUT permit']],
  ['/ny-hut-gross-weight-calculator', ['/ny-hut-permit', 'Apply for a New York HUT permit']],
  ['/ny-hut-quarterly-filing', ['/ny-hut-registration', 'Review NY HUT registration services']],
  ['/ny-hut-filing-deadlines', ['/ny-hut-registration', 'Review NY HUT registration services']],
  ['/form-mt-903', ['/ny-hut-registration', 'Review NY HUT registration services']],
  ['/form-tmt-1', ['/ny-hut-registration', 'Start regular NY HUT registration']],
  ['/ny-hut-temporary-plates', ['/ny-hut-registration', 'Start regular NY HUT registration']],
  ['/ny-hut-canadian-carriers', ['/ny-hut-permit', 'Compare NY HUT permit options']],
  ['/ny-hut-apportioned-vehicles', ['/ny-hut-permit', 'Apply for a New York HUT permit']],
  ['/temporary-vs-permanent-ny-hut-wizard', ['/ny-hut-cost', 'Compare NY HUT permit options and pricing']],
  ['/tools', ['/ny-hut-cost', 'Compare NY HUT permit services and pricing']]
]);

// Closure/cancellation pages intentionally do not receive a sales CTA. A carrier
// trying to end an account or cancel a vehicle should not be pushed into ordering
// a new credential. Existing generic handoffs are removed, while educational and
// official-source links remain intact.
const NO_SALES_HANDOFF = new Set([
  '/ny-hut-account-closure',
  '/ny-hut-certificate-cancellation'
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
    // Preserve the canonical destination if an inherited href cannot be parsed.
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

function removeMisleadingSalesHandoff(html) {
  // Remove the standard generated CTA block only when it contains the generic
  // credential/order language. Do not touch official-source or educational links.
  return html
    .replace(/<section[^>]*>\s*(?:<[^>]+>\s*)*From education to action[\s\S]*?Continue to NYHUT\.com\s*→?\s*<\/a>[\s\S]*?<\/section>/gi, '')
    .replace(/<div[^>]*>\s*(?:<[^>]+>\s*)*From education to action[\s\S]*?Continue to NYHUT\.com\s*→?\s*<\/a>[\s\S]*?<\/div>/gi, '');
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
    const suppressSales = NO_SALES_HANDOFF.has(sourcePath);
    if (!mapping && !suppressSales) {
      return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
    }

    let html = await response.text();
    if (mapping) {
      const [destinationPath, label] = mapping;
      html = rewriteCommercialLinks(html, sourcePath, destinationPath);
      html = improveGenericHandoffLabel(html, label);
    }
    if (suppressSales) html = removeMisleadingSalesHandoff(html);

    return new Response(html, { status: response.status, statusText: response.statusText, headers });
  }
};
