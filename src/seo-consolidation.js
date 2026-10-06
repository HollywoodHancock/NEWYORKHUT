import {LEGACY_ROUTE_REDIRECTS} from './legacy-route-redirects.js';
import {CORE_GUIDES, SOURCE_CHECK_DATE} from './content/core-guides.js';

// Every source was read and its useful details carried into the destination.
// See docs/seo-core-guide-release-2026-10-06.md for the review and rollback.
export const CONSOLIDATION_REDIRECTS = new Map([
  [
    "/learning-center/what-is-new-york-hut",
    "/new-york-hut-guide"
  ],
  [
    "/guides/register-hut",
    "/learn/how-to-register-for-new-york-hut"
  ],
  [
    "/learning-center/how-to-get-a-new-york-hut-permit",
    "/learn/how-to-register-for-new-york-hut"
  ],
  [
    "/new-york-hut/how-do-i-open-a-new-york-hut-account",
    "/learn/how-to-register-for-new-york-hut"
  ],
  [
    "/permit-types/permanent-hut-registration",
    "/learn/how-to-register-for-new-york-hut"
  ],
  [
    "/services/new-hut-permit",
    "/learn/how-to-register-for-new-york-hut"
  ],
  [
    "/services/new-york-hut-permit",
    "/learn/how-to-register-for-new-york-hut"
  ],
  [
    "/faq/trip-certificate-limit",
    "/guides/get-trip-certificate"
  ],
  [
    "/learning-center/temporary-new-york-hut-permit-guide",
    "/guides/get-trip-certificate"
  ],
  [
    "/new-york-hut/how-many-new-york-hut-trip-permits-can-i-get",
    "/guides/get-trip-certificate"
  ],
  [
    "/new-york-hut/what-is-a-new-york-hut-trip-certificate",
    "/guides/get-trip-certificate"
  ],
  [
    "/permit-types/hut-trip-certificate",
    "/guides/get-trip-certificate"
  ],
  [
    "/services/temporary-hut-permit",
    "/guides/get-trip-certificate"
  ],
  [
    "/learn/temporary-hut-permits-and-first-trip-questions",
    "/guides/get-trip-certificate"
  ],
  [
    "/faq/hut-threshold",
    "/learn/how-gvw-affects-your-hut-tax"
  ],
  [
    "/learning-center/new-york-hut-weight-requirements",
    "/learn/how-gvw-affects-your-hut-tax"
  ],
  [
    "/new-york-hut/new-york-hut-weight-threshold",
    "/learn/how-gvw-affects-your-hut-tax"
  ],
  [
    "/weight/18000",
    "/learn/how-gvw-affects-your-hut-tax"
  ],
  [
    "/weight/20000",
    "/learn/how-gvw-affects-your-hut-tax"
  ],
  [
    "/weight/26000",
    "/learn/how-gvw-affects-your-hut-tax"
  ],
  [
    "/weight/40000",
    "/learn/how-gvw-affects-your-hut-tax"
  ],
  [
    "/weight/55000",
    "/learn/how-gvw-affects-your-hut-tax"
  ],
  [
    "/weight/80000",
    "/learn/how-gvw-affects-your-hut-tax"
  ],
  [
    "/weight-guide",
    "/learn/how-gvw-affects-your-hut-tax"
  ],
  [
    "/filing",
    "/mt-903-filing-center"
  ],
  [
    "/new-york-hut/filing-and-taxes",
    "/mt-903-filing-center"
  ],
  [
    "/new-york-hut/when-is-form-mt-903-due",
    "/filing/quarterly-due-dates"
  ],
  [
    "/learn/mt-903-filing-deadlines-and-frequency",
    "/filing/quarterly-due-dates"
  ]
]);

export const EDUCATIONAL_REDIRECTS = new Map([
  ...LEGACY_ROUTE_REDIRECTS,
  ...CONSOLIDATION_REDIRECTS,
  ['/what-is-hut', '/new-york-hut-guide'],
  ['/new-york-hut-weight-threshold', '/learn/how-gvw-affects-your-hut-tax'],
  ['/learn/adding-a-vehicle-to-your-new-york-hut-account', '/learn/adding-a-vehicle-to-new-york-hut'],
  ['/form-tmt-1', '/form-tmt-1-ny-hut']
]);

export function canonicalPath(path) {
  const normalized = path.replace(/\/+$/, '') || '/';
  let current = normalized;
  const seen = new Set();
  while (EDUCATIONAL_REDIRECTS.has(current)) {
    if (seen.has(current)) throw new Error(`Circular educational redirect: ${path}`);
    seen.add(current);
    current = EDUCATIONAL_REDIRECTS.get(current);
  }
  return current;
}

function rewriteHref(href) {
  const decoded = href.replace(/&amp;/g, '&');
  if (!decoded.startsWith('/') && !/^https?:\/\/(?:www\.)?newyorkhut\.com(?:[/:?#]|$)/i.test(decoded)) return href;
  try {
    const url = new URL(decoded, 'https://newyorkhut.com');
    if (!['newyorkhut.com', 'www.newyorkhut.com'].includes(url.hostname)) return href;
    const path = canonicalPath(url.pathname);
    if (!EDUCATIONAL_REDIRECTS.has(url.pathname.replace(/\/+$/, '') || '/')) return href;
    return `${path}${url.search}${url.hash}`.replace(/&/g, '&amp;');
  } catch { return href; }
}

export function reconcileEducationalLinks(html) {
  html = html.replace(/(<a\b[^>]*?\bhref=)(["'])([^"']*)\2/gi,
    (match, prefix, quote, href) => `${prefix}${quote}${rewriteHref(href)}${quote}`);
  // Breadcrumbs and other structured links must agree with visible navigation.
  return html.replace(/(<script\b[^>]*type=["']application\/ld\+json["'][^>]*>)([\s\S]*?)(<\/script>)/gi,
    (match, opening, json, closing) => {
      try {
        const data = JSON.parse(json);
        const walk = value => {
          if (Array.isArray(value)) return value.map(walk);
          if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, child]) => {
            if (['item', 'url', '@id', 'mainEntityOfPage'].includes(key) && typeof child === 'string') {
              const rewritten = rewriteHref(child);
              if (rewritten !== child) return [key, new URL(rewritten.replace(/&amp;/g, '&'), 'https://newyorkhut.com').toString()];
            }
            return [key, walk(child)];
          }));
          return value;
        };
        return opening + JSON.stringify(walk(data)).replace(/</g, '\\u003c') + closing;
      } catch { return match; }
    });
}

export function reconcileConsolidatedSitemap(xml) {
  const seen = new Set();
  const entries = [];
  for (const match of xml.matchAll(/<url\b[^>]*>[\s\S]*?<\/url>/gi)) {
    const loc = match[0].match(/<loc>([^<]+)<\/loc>/i)?.[1];
    if (!loc) continue;
    const path = canonicalPath(new URL(loc.replace(/&amp;/g, '&')).pathname);
    const canonical = `https://newyorkhut.com${path}`;
    if (seen.has(canonical)) continue;
    seen.add(canonical);
    const lastmod = CORE_GUIDES.has(path) ? `<lastmod>${SOURCE_CHECK_DATE}</lastmod>` : '';
    entries.push(`<url><loc>${canonical}</loc>${lastmod}</url>`);
  }
  for (const path of CORE_GUIDES.keys()) {
    const canonical = `https://newyorkhut.com${path}`;
    if (!seen.has(canonical)) {
      seen.add(canonical);
      entries.push(`<url><loc>${canonical}</loc><lastmod>${SOURCE_CHECK_DATE}</lastmod></url>`);
    }
  }
  return {xml:`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>`, count:entries.length};
}
