import site from './index-v113.js';

const VERSION = 'v114';
const FEATURE = 'search-visibility-recovery-v114';
const CANONICAL_ORIGIN = 'https://newyorkhut.com';

// These canonical paths produced verified Search Console clicks before the
// August migration. Keep them discoverable while Google transfers host and
// canonical signals to HTTPS/non-www.
const PROVEN_LEGACY_PATHS = [
  '/filing/quarterly-due-dates',
  '/new-york-hut/how-do-i-remove-or-cancel-a-hut-vehicle',
  '/new-york-hut/how-do-i-add-a-vehicle-to-my-hut-account',
  '/cost',
  '/vehicles/box-trucks',
  '/new-york-hut/how-do-i-change-a-license-plate-on-a-hut-credential',
  '/new-york-hut/what-are-25th-series-hut-credentials',
  '/guides/get-trip-certificate',
  '/cost/late-filing',
];

function reconcileSitemap(xml) {
  const closingTag = '</urlset>';
  if (!xml.includes(closingTag)) return xml;

  const additions = PROVEN_LEGACY_PATHS
    .map((path) => `${CANONICAL_ORIGIN}${path}`)
    .filter((url) => !xml.includes(`<loc>${url}</loc>`))
    .map((url) => `<url><loc>${url}</loc></url>`)
    .join('\n');

  if (!additions) return xml;
  return xml.replace(closingTag, `${additions}\n${closingTag}`);
}

function cleanLayeredMarkup(html) {
  // Earlier releases added replacement navigation and footer layers without
  // removing the originals. Search crawlers therefore received duplicate
  // site-wide navigation and three footers on every page.
  html = html
    .replace(/<header class="nyh-site-header">[\s\S]*?<\/header>/i, '')
    .replace(/<footer>[\s\S]*?<\/footer>/i, '')
    .replace(/<footer class="nyh-global-footer">[\s\S]*?<\/footer>/i, '')
    .replace(/<script id="nyh47-js">[\s\S]*?<\/script>/i, '')
    .replace(/© 1970 NewYorkHUT\.com\./g, '© 2026 NewYorkHUT.com.');

  // Keep the contextual next-step links, but place them inside the document
  // flow before the one retained footer instead of after it.
  const nextSteps = html.match(/<section aria-label="New York HUT next steps"[\s\S]*?<\/section>/i)?.[0];
  if (nextSteps) {
    html = html.replace(nextSteps, '');
    html = html.replace(/<footer id="nyh47-footer"/i, `${nextSteps}<footer id="nyh47-footer"`);
  }

  return html;
}

export default {
  async fetch(request, env, ctx) {
    const response = await site.fetch(request, env, ctx);
    const headers = new Headers(response.headers);
    headers.set('x-newyorkhut-version', VERSION);
    headers.set('x-newyorkhut-feature', FEATURE);

    const contentType = headers.get('content-type') || '';
    if (response.status === 200 && contentType.includes('xml')) {
      const xml = reconcileSitemap(await response.text());
      const count = (xml.match(/<loc>/g) || []).length;
      headers.set('x-sitemap-url-count', String(count));
      return new Response(xml, { status: response.status, statusText: response.statusText, headers });
    }

    if (response.status === 200 && contentType.includes('text/html')) {
      const html = cleanLayeredMarkup(await response.text());
      return new Response(html, { status: response.status, statusText: response.statusText, headers });
    }

    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  },
};
