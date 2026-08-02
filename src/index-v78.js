import site from './index-v77.js';
import bannerBase64 from './banner-v75-uploaded.js';

const VERSION = 'v78';
const FEATURE = 'url-served-header-banner-v78';
const BANNER_PATH = '/newyorkhut-header-banner-v78.webp';
const BANNER_URL = `${BANNER_PATH}?v=20260802-01`;

function decodeBanner() {
  const binary = atob(bannerBase64);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes.buffer;
}

function serveBanner() {
  const body = decodeBanner();

  return new Response(body, {
    status: 200,
    headers: {
      'content-type': 'image/webp',
      'content-length': String(body.byteLength),
      'cache-control': 'public, max-age=31536000, immutable',
      'x-content-type-options': 'nosniff',
      'cross-origin-resource-policy': 'same-origin',
      'x-newyorkhut-version': VERSION,
      'x-newyorkhut-feature': FEATURE
    }
  });
}

function useBannerUrl(html) {
  if (!/<html/i.test(html)) return html;

  return html.replace(
    /src="data:image\/webp;base64,[^"]+"/i,
    `src="${BANNER_URL}"`
  );
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === BANNER_PATH) {
      return serveBanner();
    }

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

    const html = useBannerUrl(await response.text());
    headers.set('cache-control', 'no-store, no-cache, must-revalidate, max-age=0');

    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
