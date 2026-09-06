import site from './index-v107.js';

const VERSION = 'v108';
const FEATURE = 'high-intent-funnel-and-temporary-cutoff-v108';

const DESTINATIONS = new Map([
  ['/ny-hut-eligibility-checker', ['/ny-hut-permit', 'Apply for a New York HUT permit']],
  ['/ny-hut-leased-trucks', ['/ny-hut-registration', 'Start regular NY HUT registration']],
  ['/ny-hut-faq', ['/ny-hut-permit', 'Compare NY HUT permit options']],
  ['/ny-hut-out-of-state-carriers', ['/ny-hut-permit', 'Compare NY HUT permit options']],
  ['/ny-hut-certificate-and-decal', ['/ny-hut-registration', 'Start regular NY HUT registration']]
]);

const TEMPORARY_PATHS = new Set([
  '/temporary-ny-hut-permit',
  '/ny-hut-trip-certificate-limits',
  '/guides/get-trip-certificate',
  '/learn/temporary-hut-permits-and-first-trip-questions',
  '/services/temporary-hut-permit',
  '/temporary-vs-permanent-ny-hut-wizard'
]);

function pathOf(request) {
  return new URL(request.url).pathname.replace(/\/+$/, '') || '/';
}

function trackedUrl(sourcePath, destinationPath, rawHref) {
  const destination = new URL(destinationPath, 'https://nyhut.com');
  try {
    const old = new URL(rawHref.replace(/&amp;/g, '&'), 'https://nyhut.com');
    for (const [key, value] of old.searchParams) destination.searchParams.set(key, value);
  } catch {}
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

function temporaryCutoffBlock() {
  return '<aside id="nyh-v108-temporary-cutoff" style="width:min(1040px,calc(100% - 36px));margin:24px auto;padding:18px 20px;border:1px solid #e0c980;border-radius:12px;background:#fffaf0;color:#3f3420"><strong>Temporary permit timing:</strong> For same-business-day processing consideration, submit requests by <strong>1:30 PM Eastern Time</strong>. Requests received after the cutoff, on weekends, or around holidays or closures may be processed on the next available business day. Issuance is not guaranteed and can be affected by vendor availability, New York State processing, account discrepancies, or carrier eligibility issues.</aside>';
}

function addTemporaryCutoff(html) {
  if (html.includes('id="nyh-v108-temporary-cutoff"')) return html;
  const block = temporaryCutoffBlock();
  const marker = '<aside aria-label="NYHUT ordering handoff"';
  if (html.includes(marker)) return html.replace(marker, `${block}${marker}`);
  const marker2 = '<section aria-label="New York HUT next steps"';
  if (html.includes(marker2)) return html.replace(marker2, `${block}${marker2}`);
  return html.replace(/<\/body>/i, `${block}</body>`);
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
    const temporary = TEMPORARY_PATHS.has(sourcePath);
    if (!mapping && !temporary) {
      return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
    }

    let html = await response.text();
    if (mapping) {
      const [destinationPath, label] = mapping;
      html = rewriteCommercialLinks(html, sourcePath, destinationPath);
      html = improveGenericHandoffLabel(html, label);
    }
    if (temporary) html = addTemporaryCutoff(html);

    return new Response(html, { status: response.status, statusText: response.statusText, headers });
  }
};
