import site from './index-v96.js';

const VERSION = 'v97';
const FEATURE = 'direct-nyhut-order-destination-v97';
const ORDER_PATH = '/order';

function pathOf(request) {
  return new URL(request.url).pathname.replace(/\/+$/, '') || '/';
}

function directOrderUrl(sourcePath, rawHref) {
  try {
    const old = new URL(rawHref.replace(/&amp;/g, '&'), 'https://www.nyhut.com');
    const u = new URL(`https://www.nyhut.com${ORDER_PATH}`);
    for (const [key, value] of old.searchParams) u.searchParams.set(key, value);
    if (!u.searchParams.has('utm_source')) u.searchParams.set('utm_source', 'newyorkhut.com');
    if (!u.searchParams.has('utm_medium')) u.searchParams.set('utm_medium', 'referral');
    if (!u.searchParams.has('utm_campaign')) u.searchParams.set('utm_campaign', 'authority_site');
    if (!u.searchParams.has('utm_content')) {
      const content = sourcePath === '/' ? 'homepage-order-cta' : `${sourcePath.replace(/^\//, '').replace(/\//g, '-')}-order-cta`;
      u.searchParams.set('utm_content', content);
    }
    return u.toString().replace(/&/g, '&amp;');
  } catch {
    return rawHref;
  }
}

function upgradeOrderLinks(html, sourcePath) {
  return html.replace(/href=("|')(https:\/\/(?:www\.)?nyhut\.com\/?[^"']*)\1/gi, (match, quote, href) => {
    const contextStart = Math.max(0, html.lastIndexOf('<a', html.indexOf(match)));
    const context = html.slice(contextStart, html.indexOf(match) + match.length + 180).toLowerCase();
    const looksTransactional = /order|permit|temporary|register|credential|nyhut/.test(context);
    if (!looksTransactional) return match;
    return `href=${quote}${directOrderUrl(sourcePath, href)}${quote}`;
  });
}

export default {
  async fetch(request, env, ctx) {
    const response = await site.fetch(request, env, ctx);
    const path = pathOf(request);
    const headers = new Headers(response.headers);
    headers.set('x-newyorkhut-version', VERSION);
    headers.set('x-newyorkhut-feature', FEATURE);

    const type = headers.get('content-type') || '';
    if (response.status !== 200 || !type.includes('text/html')) {
      return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
    }

    let html = await response.text();
    html = upgradeOrderLinks(html, path);
    return new Response(html, { status: response.status, statusText: response.statusText, headers });
  }
};
