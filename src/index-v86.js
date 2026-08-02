import site from './index-v85.js';

const VERSION = 'v86';
const FEATURE = 'homepage-hero-top-alignment-v86';

const STYLE = `<style id="nyh-v86-homepage-hero-align-css">
/* Move the homepage hero content up beneath the trust strip. */
.hero{
  padding-top:16px!important;
}
.hero>.w,
.hero>.wrap,
.hero>.container,
.hero .grid{
  align-items:start!important;
}
.hero .grid>div:first-child{
  align-self:start!important;
  padding-top:0!important;
  margin-top:0!important;
}
@media(max-width:900px){
  .hero{padding-top:14px!important}
}
@media(max-width:700px){
  .hero{padding-top:12px!important}
}
</style>`;

function alignHomepageHero(html, requestUrl) {
  if (!/<html/i.test(html) || html.includes('nyh-v86-homepage-hero-align-css')) return html;
  const path = new URL(requestUrl).pathname.replace(/\/+$/, '') || '/';
  if (path !== '/') return html;

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

    const html = alignHomepageHero(await response.text(), request.url);
    headers.set('cache-control', 'no-store, no-cache, must-revalidate, max-age=0');

    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
