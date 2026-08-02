import site from './index-v81.js';

const VERSION = 'v82';
const FEATURE = 'forced-banner-src-replacement-v82';
const BANNER_URL = 'https://raw.githubusercontent.com/HollywoodHancock/NEWYORKHUT/main/public/newyorkhut-header-banner.png?v=20260802-04';

function forceBannerSource(html) {
  if (!/<html/i.test(html)) return html;

  return html.replace(
    /(<div\b[^>]*class="[^"]*nyh-v76-banner[^"]*"[^>]*>\s*<img\b[^>]*\bsrc=")[^"]*("[^>]*>)/i,
    `$1${BANNER_URL}$2`
  ).replace(
    /\s+onerror="this\.parentElement\.remove\(\)"/i,
    ''
  );
}

export default {
  async fetch(request, env, ctx) {
    const response = await site.fetch(request, env, ctx);
    const headers = new Headers(response.headers);
    const type = headers.get('content-type') || '';

    headers.set('x-newyorkhut-version', VERSION);
    headers.set('x-newyorkhut-feature', FEATURE);

    if (!type.includes('text/html')) {
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers
      });
    }

    const html = forceBannerSource(await response.text());
    headers.set('cache-control', 'no-store, no-cache, must-revalidate, max-age=0');

    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
