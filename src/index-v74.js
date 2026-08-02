import site from './index-v73.js';

const VERSION = 'v74';

function removeBrokenBanner(html) {
  return html
    .replace(/<style id="nyh-v69-banner-css">[\s\S]*?<\/style>/i, '')
    .replace(/<div class="nyh-global-banner"[\s\S]*?<\/div>/i, '');
}

export default {
  async fetch(request, env, ctx) {
    const response = await site.fetch(request, env, ctx);
    const type = response.headers.get('content-type') || '';

    if (!type.includes('text/html')) {
      return response;
    }

    const html = removeBrokenBanner(await response.text());
    const headers = new Headers(response.headers);
    headers.set('cache-control', 'no-store, no-cache, must-revalidate, max-age=0');
    headers.set('x-newyorkhut-version', VERSION);
    headers.set('x-newyorkhut-feature', 'remove-broken-header-banner-v74');

    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
