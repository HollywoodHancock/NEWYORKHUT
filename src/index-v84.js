import site from './index-v83.js';

const VERSION = 'v84';
const FEATURE = 'banner-crop-correction-v84';

const STYLE = `<style id="nyh-v84-banner-crop-css">
.nyh-v76-banner{
  height:clamp(250px,16.5vw,310px)!important;
}
.nyh-v76-banner img{
  width:100%!important;
  height:100%!important;
  object-fit:cover!important;
  object-position:center 52%!important;
}
@media(max-width:900px){
  .nyh-v76-banner{height:clamp(180px,24vw,240px)!important}
  .nyh-v76-banner img{object-position:center 52%!important}
}
@media(max-width:700px){
  .nyh-v76-banner{height:150px!important}
  .nyh-v76-banner img{object-position:center 50%!important}
}
</style>`;

function correctBannerCrop(html) {
  if (!/<html/i.test(html) || html.includes('nyh-v84-banner-crop-css')) return html;
  return html.includes('</head>')
    ? html.replace('</head>', `${STYLE}</head>`)
    : `${STYLE}${html}`;
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

    const html = correctBannerCrop(await response.text());
    headers.set('cache-control', 'no-store, no-cache, must-revalidate, max-age=0');

    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
