import site from './index-v86.js';

const VERSION = 'v87';
const FEATURE = 'canonical-global-navigation-v87';

const STYLE = `<style id="nyh-v87-canonical-nav-css">
.nyh-canonical-header{
  position:relative!important;
  z-index:100!important;
  width:100%!important;
  background:#fff!important;
  border-bottom:1px solid #d9e5ef!important;
  box-shadow:0 1px 0 rgba(8,43,76,.03)!important;
}
.nyh-canonical-nav{
  width:min(100% - 32px,1215px)!important;
  min-height:88px!important;
  margin:0 auto!important;
  padding:14px 0!important;
  display:flex!important;
  align-items:center!important;
  justify-content:space-between!important;
  gap:28px!important;
  box-sizing:border-box!important;
}
.nyh-canonical-brand{
  flex:0 0 auto!important;
  display:inline-flex!important;
  align-items:center!important;
  color:#082b4c!important;
  font:800 clamp(1.35rem,2vw,1.75rem)/1.1 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif!important;
  letter-spacing:-.035em!important;
  text-decoration:none!important;
  white-space:nowrap!important;
}
.nyh-canonical-links{
  display:flex!important;
  align-items:center!important;
  justify-content:flex-end!important;
  gap:9px!important;
  margin:0!important;
  padding:0!important;
  list-style:none!important;
}
.nyh-canonical-links a{
  display:inline-flex!important;
  align-items:center!important;
  justify-content:center!important;
  min-height:48px!important;
  padding:10px 16px!important;
  border:1px solid #bfd2e3!important;
  border-radius:11px!important;
  background:#f8fbfd!important;
  color:#082b4c!important;
  font:750 1rem/1 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif!important;
  text-decoration:none!important;
  white-space:nowrap!important;
  box-sizing:border-box!important;
  box-shadow:0 2px 6px rgba(8,43,76,.035)!important;
}
.nyh-canonical-links a:hover,
.nyh-canonical-links a:focus-visible{
  background:#eef6fb!important;
  border-color:#8eb6d5!important;
}
.nyh-canonical-links .nyh-order-link{
  background:#176dcc!important;
  border-color:#176dcc!important;
  color:#fff!important;
  box-shadow:0 7px 18px rgba(23,109,204,.18)!important;
}
.nyh-canonical-links .nyh-order-link:hover,
.nyh-canonical-links .nyh-order-link:focus-visible{
  background:#0f5daf!important;
  border-color:#0f5daf!important;
}
@media(max-width:1100px){
  .nyh-canonical-nav{width:min(100% - 24px,1215px)!important;gap:18px!important}
  .nyh-canonical-links{gap:6px!important}
  .nyh-canonical-links a{padding:9px 11px!important;font-size:.93rem!important}
}
@media(max-width:860px){
  .nyh-canonical-nav{
    min-height:auto!important;
    padding:12px 0 10px!important;
    flex-direction:column!important;
    align-items:stretch!important;
    gap:11px!important;
  }
  .nyh-canonical-brand{justify-content:center!important}
  .nyh-canonical-links{
    justify-content:flex-start!important;
    overflow-x:auto!important;
    padding:0 0 4px!important;
    scrollbar-width:thin!important;
  }
  .nyh-canonical-links a{min-height:43px!important}
}
</style>`;

const FALLBACKS = {
  brand: '/',
  learn: '/learn',
  guide: '/hut-guide',
  tools: '/tools',
  services: '/services',
  ask: '/ask-hut-ai',
  pages: '/all-pages',
  order: 'https://nyhut.com/order'
};

function cleanText(value) {
  return value.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/gi, ' ').replace(/\s+/g, ' ').trim();
}

function safeHref(value, fallback) {
  if (!value) return fallback;
  return value.replace(/&quot;/gi, '').replace(/["'<>]/g, '');
}

function findHref(header, matcher, fallback) {
  const anchorPattern = /<a\b[^>]*href=(?:"([^"]*)"|'([^']*)')[^>]*>([\s\S]*?)<\/a>/gi;
  let match;
  while ((match = anchorPattern.exec(header))) {
    const text = cleanText(match[3]);
    if (matcher.test(text)) return safeHref(match[1] || match[2], fallback);
  }
  return fallback;
}

function canonicalizeNavigation(html) {
  if (!/<html/i.test(html)) return html;

  const headerMatch = html.match(/<header\b[^>]*>[\s\S]*?<\/header>/i);
  if (!headerMatch) return html;

  const current = headerMatch[0];
  const hrefs = {
    brand: findHref(current, /NewYorkHUT\.com/i, FALLBACKS.brand),
    learn: findHref(current, /^Learn$/i, FALLBACKS.learn),
    guide: findHref(current, /HUT Guide/i, FALLBACKS.guide),
    tools: findHref(current, /^Tools$/i, FALLBACKS.tools),
    services: findHref(current, /^Services$/i, FALLBACKS.services),
    ask: findHref(current, /Ask HUT AI/i, FALLBACKS.ask),
    pages: findHref(current, /All Pages/i, FALLBACKS.pages),
    order: findHref(current, /Order Permit/i, FALLBACKS.order)
  };

  const header = `<header class="nyh-canonical-header"><nav class="nyh-canonical-nav" aria-label="Primary navigation"><a class="nyh-canonical-brand" href="${hrefs.brand}">NewYorkHUT.com</a><div class="nyh-canonical-links"><a href="${hrefs.learn}">Learn</a><a href="${hrefs.guide}">HUT Guide</a><a href="${hrefs.tools}">Tools</a><a href="${hrefs.services}">Services</a><a href="${hrefs.ask}">Ask HUT AI</a><a href="${hrefs.pages}">All Pages</a><a class="nyh-order-link" href="${hrefs.order}">Order Permit</a></div></nav></header>`;

  let output = html.replace(current, header);
  if (!output.includes('nyh-v87-canonical-nav-css')) {
    output = output.includes('</head>')
      ? output.replace('</head>', `${STYLE}</head>`)
      : `${STYLE}${output}`;
  }
  return output;
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

    const html = canonicalizeNavigation(await response.text());
    headers.set('cache-control', 'no-store, no-cache, must-revalidate, max-age=0');

    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
