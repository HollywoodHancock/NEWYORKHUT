import site from './index-v74.js';
import bannerBase64 from './banner-v75-uploaded.js';

const VERSION = 'v76';
const BANNER_DATA_URI = `data:image/webp;base64,${bannerBase64}`;

const BANNER = `<div class="nyh-global-banner nyh-v76-banner" aria-label="NewYorkHUT.com — New York Highway Use Tax guides, tools, and compliance help"><img src="${BANNER_DATA_URI}" alt="NewYorkHUT.com — New York Highway Use Tax guides, tools, and compliance help" width="1600" height="533" loading="eager" decoding="sync" onerror="this.parentElement.remove()"></div>`;

const STYLE = `<style id="nyh-v76-banner-css">
.nyh-v76-banner{
  width:100%;
  height:clamp(180px,18.75vw,300px);
  overflow:hidden;
  background:#072b4d;
  border-bottom:1px solid rgba(255,255,255,.14);
}
.nyh-v76-banner img{
  display:block;
  width:100%;
  height:100%;
  object-fit:cover;
  object-position:center 45%;
}
@media(max-width:700px){
  .nyh-v76-banner{height:160px}
  .nyh-v76-banner img{object-position:center center}
}
</style>`;

function addBanner(html) {
  if (!/<html/i.test(html) || html.includes('nyh-v76-banner')) return html;

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
    headers.set('cache-control', 'no-store, no-cache, must-revalidate, max-age=0');
    headers.set('x-newyorkhut-version', VERSION);
    headers.set('x-newyorkhut-feature', 'compact-inline-header-banner-v76');

    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
