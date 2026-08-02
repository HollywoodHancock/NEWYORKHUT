import site from './index-v74.js';
import bannerBase64 from './banner-v75-uploaded.js';

const VERSION = 'v75';
const BANNER_PATH = '/newyorkhut-header-banner-v75.webp';

function decodeBase64(value) {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

const BANNER_BYTES = decodeBase64(bannerBase64);

const BANNER = `<div class="nyh-global-banner" role="img" aria-label="NewYorkHUT.com — New York Highway Use Tax guides, tools, and compliance help"><img src="${BANNER_PATH}" alt="NewYorkHUT.com — New York Highway Use Tax guides, tools, and compliance help" width="1600" height="533" loading="eager" decoding="async"></div>`;

const STYLE = `<style id="nyh-v75-banner-css">
.nyh-global-banner{width:100%;overflow:hidden;background:#072b4d;border-bottom:1px solid rgba(255,255,255,.14)}
.nyh-global-banner img{display:block;width:100%;height:auto;max-height:533px;object-fit:cover;object-position:center}
@media(max-width:700px){.nyh-global-banner img{min-height:150px;object-fit:cover;object-position:center}}
</style>`;

function addBanner(html) {
  if (!/<html/i.test(html) || html.includes('nyh-global-banner')) return html;

  let output = html.includes('</head>')
    ? html.replace('</head>', `${STYLE}</head>`)
    : `${STYLE}${html}`;

  if (/<\/header>/i.test(output)) {
    return output.replace(/<\/header>/i, `</header>${BANNER}`);
  }

  if (/<body[^>]*>/i.test(output)) {
    return output.replace(/<body[^>]*>/i, match => `${match}${BANNER}`);
  }

  return output;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === BANNER_PATH) {
      return new Response(BANNER_BYTES, {
        status: 200,
        headers: {
          'content-type': 'image/webp',
          'content-length': String(BANNER_BYTES.byteLength),
          'cache-control': 'public, max-age=31536000, immutable',
          'x-content-type-options': 'nosniff',
          'x-newyorkhut-version': VERSION,
          'x-newyorkhut-feature': 'uploaded-header-banner-v75'
        }
      });
    }

    const response = await site.fetch(request, env, ctx);
    const type = response.headers.get('content-type') || '';

    if (!type.includes('text/html')) return response;

    const html = addBanner(await response.text());
    const headers = new Headers(response.headers);
    headers.set('cache-control', 'no-store, no-cache, must-revalidate, max-age=0');
    headers.set('x-newyorkhut-version', VERSION);
    headers.set('x-newyorkhut-feature', 'uploaded-header-banner-v75');

    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
