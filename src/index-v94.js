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

const DESCRIPTION_OVERRIDES = {
  '/services': 'Understand New York HUT registration, filing, vehicle, temporary permit, and compliance service options before choosing the right next step.',
  '/hut-registration-center': 'Learn New York HUT registration requirements, what information carriers need, and when a HUT credential may be required.',
  '/mt-903-filing-center': 'Learn New York HUT MT-903 filing requirements, reporting basics, deadlines, records, and common compliance questions.',
  '/vehicle-lifecycle': 'Learn how New York HUT requirements apply when adding, replacing, selling, leasing, or changing vehicles in a fleet.',
  '/audit-and-enforcement-center': 'Learn about New York HUT records, audits, enforcement, penalties, and practical compliance considerations for carriers.',
  '/carrier-compliance-center': 'A practical guide to New York HUT carrier compliance, registration, filing, vehicle credentials, records, and ongoing obligations.'
};

function normalizedPath(url) {
  return url.pathname.replace(/\/+$/, '') || '/';
}

function escapeText(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeAttr(value) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function replaceTitle(html, title) {
  const safe = escapeText(title);
  return /<title\b[^>]*>[\s\S]*?<\/title>/i.test(html)
    ? html.replace(/<title\b[^>]*>[\s\S]*?<\/title>/i, `<title>${safe}</title>`)
    : html.replace(/<head\b[^>]*>/i, m => `${m}<title>${safe}</title>`);
}

function replaceMeta(html, selectorPattern, tag) {
  return selectorPattern.test(html)
    ? html.replace(selectorPattern, tag)
    : html.replace('</head>', `${tag}</head>`);
}

function replaceOgTitle(html, title) {
  const safe = escapeAttr(title);
  return replaceMeta(
    html,
    /<meta\b[^>]*property=(?:"og:title"|'og:title')[^>]*>/i,
    `<meta property="og:title" content="${safe}">`
  );
}

function replaceDescription(html, description) {
  const safe = escapeAttr(description);
  html = replaceMeta(
    html,
    /<meta\b(?=[^>]*name=(?:"description"|'description'))[^>]*>/i,
    `<meta name="description" content="${safe}">`
  );
  return replaceMeta(
    html,
    /<meta\b(?=[^>]*property=(?:"og:description"|'og:description'))[^>]*>/i,
    `<meta property="og:description" content="${safe}">`
  );
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
    if (DESCRIPTION_OVERRIDES[path]) {
      html = replaceDescription(html, DESCRIPTION_OVERRIDES[path]);
    }
    html = trackNyhutLinks(html, path);
    html = addAuthoritySignal(html);

    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
