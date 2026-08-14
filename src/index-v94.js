import site from './index-v93.js';

const VERSION = 'v94';
const FEATURE = 'authority-intent-and-nyhut-referral-tracking-v94';

const TITLE_OVERRIDES = {
  '/services': 'New York HUT Service Options Explained | NewYorkHUT.com',
  '/hut-registration-center': 'New York HUT Registration Guide & Requirements | NewYorkHUT.com',
  '/mt-903-filing-center': 'New York HUT Filing & MT-903 Guide | NewYorkHUT.com',
  '/vehicle-lifecycle': 'New York HUT Vehicle Changes Guide | NewYorkHUT.com',
  '/audit-and-enforcement-center': 'New York HUT Audit & Enforcement Guide | NewYorkHUT.com',
  '/carrier-compliance-center': 'New York HUT Carrier Compliance Guide | NewYorkHUT.com'
};

function normalizedPath(url) {
  return url.pathname.replace(/\/+$/, '') || '/';
}

function replaceTitle(html, title) {
  const safe = title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return /<title\b[^>]*>[\s\S]*?<\/title>/i.test(html)
    ? html.replace(/<title\b[^>]*>[\s\S]*?<\/title>/i, `<title>${safe}</title>`)
    : html.replace(/<head\b[^>]*>/i, m => `${m}<title>${safe}</title>`);
}

function replaceOgTitle(html, title) {
  const safe = title.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  const tag = `<meta property="og:title" content="${safe}">`;
  return /<meta\b[^>]*property=(?:"og:title"|'og:title')[^>]*>/i.test(html)
    ? html.replace(/<meta\b[^>]*property=(?:"og:title"|'og:title')[^>]*>/i, tag)
    : html.replace('</head>', `${tag}</head>`);
}

function trackedNyhutUrl(rawHref, sourcePath) {
  try {
    const u = new URL(rawHref, 'https://newyorkhut.com');
    if (!['nyhut.com', 'www.nyhut.com'].includes(u.hostname)) return rawHref;
    u.protocol = 'https:';
    u.hostname = 'www.nyhut.com';
    if (!u.searchParams.has('utm_source')) u.searchParams.set('utm_source', 'newyorkhut.com');
    if (!u.searchParams.has('utm_medium')) u.searchParams.set('utm_medium', 'referral');
    if (!u.searchParams.has('utm_campaign')) u.searchParams.set('utm_campaign', 'authority_site');
    if (!u.searchParams.has('utm_content')) {
      const content = sourcePath === '/' ? 'homepage' : sourcePath.replace(/^\//, '').replace(/\//g, '-');
      u.searchParams.set('utm_content', content);
    }
    return u.toString();
  } catch {
    return rawHref;
  }
}

function trackNyhutLinks(html, sourcePath) {
  return html.replace(/href=("|')([^"']*nyhut\.com[^"']*)\1/gi, (match, quote, href) => {
    const tracked = trackedNyhutUrl(href.replace(/&amp;/g, '&'), sourcePath).replace(/&/g, '&amp;');
    return `href=${quote}${tracked}${quote}`;
  });
}

function addAuthoritySignal(html) {
  const marker = '<meta name="nyh-site-role" content="independent educational authority; ordering handled by NYHUT.com">';
  if (html.includes('name="nyh-site-role"')) return html;
  return html.replace('</head>', `${marker}</head>`);
}

export default {
  async fetch(request, env, ctx) {
    const response = await site.fetch(request, env, ctx);
    const headers = new Headers(response.headers);
    const type = headers.get('content-type') || '';
    const url = new URL(request.url);
    const path = normalizedPath(url);

    headers.set('x-newyorkhut-version', VERSION);
    headers.set('x-newyorkhut-feature', FEATURE);

    if (!type.includes('text/html')) {
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers
      });
    }

    let html = await response.text();
    if (TITLE_OVERRIDES[path]) {
      html = replaceTitle(html, TITLE_OVERRIDES[path]);
      html = replaceOgTitle(html, TITLE_OVERRIDES[path]);
    }
    html = trackNyhutLinks(html, path);
    html = addAuthoritySignal(html);

    headers.set('cache-control', 'no-store, no-cache, must-revalidate, max-age=0');

    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
