import site from './index-v86.js';

const VERSION = 'v88';
const FEATURE = 'compact-tools-directory-v88';

const STYLE = `<style id="nyh-v88-tools-compact-css">
/* Compact only the /tools directory page. */
body{line-height:1.46!important}
.hero{
  padding-top:20px!important;
  padding-bottom:22px!important;
}
.hero h1{
  margin-top:6px!important;
  margin-bottom:10px!important;
}
.hero .lead{
  margin-top:8px!important;
  margin-bottom:12px!important;
  max-width:860px!important;
}
.hero-actions,.actions,.chips{
  margin-top:12px!important;
  gap:8px!important;
}
.section{
  padding-top:24px!important;
  padding-bottom:30px!important;
}
.section-head{
  margin-bottom:14px!important;
}
.section-head h2{
  margin-bottom:7px!important;
}
.section-head p{
  margin-top:5px!important;
  margin-bottom:8px!important;
}
.grid,.task-grid{
  gap:12px!important;
  align-items:stretch!important;
}
.card{
  padding:15px!important;
  border-radius:14px!important;
}
.card h2,.card h3{
  margin-bottom:7px!important;
}
.card p{
  margin-top:5px!important;
  margin-bottom:9px!important;
  line-height:1.48!important;
}
.card .mini{
  margin-top:9px!important;
  gap:6px!important;
}
.card .mini a{
  padding:7px 9px!important;
}
.task-grid a{
  padding:12px!important;
  border-radius:12px!important;
}
.authority{
  padding:18px!important;
  border-radius:15px!important;
}
.authority h2{
  margin-bottom:8px!important;
}
.authority p{
  margin-top:6px!important;
  margin-bottom:12px!important;
}
@media(min-width:901px){
  .grid{grid-template-columns:repeat(3,minmax(0,1fr))!important}
}
@media(max-width:900px){
  .hero{padding-top:17px!important;padding-bottom:19px!important}
  .section{padding-top:20px!important;padding-bottom:25px!important}
}
@media(max-width:700px){
  .hero{padding-top:14px!important;padding-bottom:17px!important}
  .section{padding-top:18px!important;padding-bottom:22px!important}
  .card{padding:14px!important}
}
</style>`;

function compactTools(html, requestUrl) {
  if (!/<html/i.test(html) || html.includes('nyh-v88-tools-compact-css')) return html;
  const path = new URL(requestUrl).pathname.replace(/\/+$/, '') || '/';
  if (path !== '/tools') return html;

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

    const html = compactTools(await response.text(), request.url);
    headers.set('cache-control', 'no-store, no-cache, must-revalidate, max-age=0');

    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
