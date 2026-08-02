import site from './index-v76.js';

const VERSION = 'v77';

const COMPACT_STYLE = `<style id="nyh-v77-compact-layout-css">
/* Global compact layout pass */
:root{
  --nyh-page-width:1180px;
  --nyh-section-gap:42px;
}
body{line-height:1.52}

/* Header and navigation */
header .nav,.top .nav{min-height:64px!important;gap:14px!important}
header .links,.top .links{gap:7px!important}
header .links a,.top .links a{padding:8px 11px!important;border-radius:9px!important}

/* Uploaded header banner */
.nyh-v76-banner{
  height:clamp(132px,13.75vw,220px)!important;
  min-height:0!important;
}
.nyh-v76-banner img{
  object-fit:cover!important;
  object-position:center 46%!important;
}

/* Primary page structure */
.w,.wrap,.container{max-width:var(--nyh-page-width)}
.hero{padding:38px 0 34px!important}
.section{padding:38px 0 48px!important}
.section-head{margin-bottom:18px!important}
.crumbs{padding-top:9px!important;padding-bottom:9px!important}

/* Typography */
h1{
  font-size:clamp(2.15rem,4.4vw,3.75rem)!important;
  line-height:1.04!important;
  margin-top:9px!important;
  margin-bottom:14px!important;
}
h2{font-size:clamp(1.55rem,2.8vw,2.35rem);margin-top:0;margin-bottom:12px}
h3{font-size:clamp(1.16rem,2vw,1.45rem);margin-top:0;margin-bottom:9px}
.lead{font-size:1.04rem!important;line-height:1.58!important}
p{margin-top:.55em;margin-bottom:.85em}

/* Cards, grids, task blocks */
.grid{gap:16px!important}
.card{
  padding:18px!important;
  border-radius:16px!important;
  box-shadow:0 7px 24px rgba(8,43,76,.055)!important;
}
.card p{margin-bottom:12px}
.mini{margin-top:13px!important;gap:7px!important}
.mini a{padding:8px 10px!important}
.task-grid{gap:11px!important}
.task-grid a{padding:14px!important;border-radius:13px!important}
.authority{padding:22px!important;border-radius:17px!important}

/* Buttons and controls */
.btn,button,input[type="submit"],input[type="button"]{
  padding:10px 14px!important;
  border-radius:9px!important;
}
.hero-actions,.actions,.chips{gap:8px!important}
input,select,textarea{padding:10px 12px}
textarea{min-height:110px}

/* Tables and long content */
table{font-size:.94rem}
th,td{padding:9px 10px}
article>h1:first-child,main>h1:first-child{margin-top:0}
article,main{scroll-margin-top:76px}

/* Common oversized inline layouts */
[style*="padding: 80px"],[style*="padding:80px"]{padding-top:46px!important;padding-bottom:46px!important}
[style*="padding: 64px"],[style*="padding:64px"]{padding-top:40px!important;padding-bottom:40px!important}

@media(max-width:900px){
  header .nav,.top .nav{padding-top:10px!important;padding-bottom:10px!important}
  .hero{padding:32px 0 28px!important}
  .section{padding:32px 0 40px!important}
  .nyh-v76-banner{height:clamp(118px,20vw,180px)!important}
}

@media(max-width:700px){
  .nyh-v76-banner{height:118px!important}
  .nyh-v76-banner img{object-position:center center!important}
  .hero{padding:26px 0 24px!important}
  .section{padding:28px 0 34px!important}
  .card{padding:16px!important;border-radius:14px!important}
  .authority{padding:18px!important}
  h1{font-size:clamp(1.95rem,10vw,2.8rem)!important}
  h2{font-size:clamp(1.4rem,7vw,2rem)}
}
</style>`;

function compact(html) {
  if (!/<html/i.test(html) || html.includes('nyh-v77-compact-layout-css')) return html;
  return html.includes('</head>')
    ? html.replace('</head>', `${COMPACT_STYLE}</head>`)
    : `${COMPACT_STYLE}${html}`;
}

export default {
  async fetch(request, env, ctx) {
    const response = await site.fetch(request, env, ctx);
    const type = response.headers.get('content-type') || '';

    if (!type.includes('text/html')) {
      const headers = new Headers(response.headers);
      headers.set('x-newyorkhut-version', VERSION);
      headers.set('x-newyorkhut-feature', 'compact-global-layouts-v77');
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers
      });
    }

    const html = compact(await response.text());
    const headers = new Headers(response.headers);
    headers.set('cache-control', 'no-store, no-cache, must-revalidate, max-age=0');
    headers.set('x-newyorkhut-version', VERSION);
    headers.set('x-newyorkhut-feature', 'compact-global-layouts-v77');

    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
