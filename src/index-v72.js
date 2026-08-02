import site from './index-v71.js';
import bannerBase64 from './banner-v71-part-1.js';

const VERSION = 'v72';
const BANNER_PATH = '/newyorkhut-header-banner-v72.webp';
const LEGACY_PATHS = [
  '/newyorkhut-header-banner.svg',
  '/newyorkhut-header-banner-v71.svg'
];

function decodeBase64(value) {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

const BANNER_BYTES = decodeBase64(bannerBase64);

function serveBanner() {
  return new Response(BANNER_BYTES, {
    status: 200,
    headers: {
      'content-type': 'image/webp',
      'content-length': String(BANNER_BYTES.byteLength),
      'cache-control': 'public, max-age=31536000, immutable',
      'x-content-type-options': 'nosniff',
      'x-newyorkhut-version': VERSION,
      'x-newyorkhut-feature': 'embedded-webp-header-banner-v72'
    }
  });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === BANNER_PATH) {
      return serveBanner();
    }

    const response = await site.fetch(request, env, ctx);
    const type = response.headers.get('content-type') || '';

    if (!type.includes('text/html')) {
      const headers = new Headers(response.headers);
      headers.set('x-newyorkhut-version', VERSION);
      headers.set('x-newyorkhut-feature', 'embedded-webp-header-banner-v72');
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers
      });
    }

    let html = await response.text();
    for (const legacyPath of LEGACY_PATHS) {
      html = html.replaceAll(legacyPath, BANNER_PATH);
    }

    const headers = new Headers(response.headers);
    headers.set('cache-control', 'no-store, no-cache, must-revalidate, max-age=0');
    headers.set('x-newyorkhut-version', VERSION);
    headers.set('x-newyorkhut-feature', 'embedded-webp-header-banner-v72');

    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
