import site from './index-v68.js';

const VERSION = 'v69';
const BANNER_PATH = '/newyorkhut-header-banner.svg';

const BANNER = `<div class="nyh-global-banner" role="img" aria-label="NewYorkHUT.com — New York Highway Use Tax guides, tools, and compliance help"><img src="${BANNER_PATH}" alt="NewYorkHUT.com — New York Highway Use Tax guides, tools, and compliance help" width="1600" height="300" loading="eager" decoding="async"></div>`;

const STYLE = `<style id="nyh-v69-banner-css">
.nyh-global-banner{width:100%;overflow:hidden;background:#072b4d;border-bottom:1px solid rgba(255,255,255,.14)}
.nyh-global-banner img{display:block;width:100%;height:auto;max-height:300px;object-fit:cover;object-position:center}
@media(max-width:700px){.nyh-global-banner img{min-height:132px;object-fit:cover;object-position:center}}
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
    const response = await site.fetch(request, env, ctx);
    const type = response.headers.get('content-type') || '';

    if (!type.includes('text/html')) return response;

    const html = addBanner(await response.text());
    const headers = new Headers(response.headers);
    headers.set('cache-control', 'no-store');
    headers.set('x-newyorkhut-version', VERSION);
    headers.set('x-newyorkhut-feature', 'global-header-banner-v69');

    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
