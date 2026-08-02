import site from './index-v88.js';

const VERSION = 'v89';
const FEATURE = 'sitewide-layout-seo-normalization-v89';
const ORIGIN = 'https://newyorkhut.com';

const BASE_STYLE = `<style id="nyh-v89-sitewide-audit-css">
/* Sitewide containment and overflow safeguards. */
html,body{max-width:100%!important;overflow-x:clip!important}
*,*::before,*::after{box-sizing:border-box}
header,nav,main,section,article,aside,footer,
.w,.wrap,.container,.grid,.card,.hero,.section{min-width:0;max-width:100%}
img,svg,video,canvas,iframe{max-width:100%;height:auto}
pre{max-width:100%;overflow-x:auto;white-space:pre-wrap;overflow-wrap:anywhere}
code,a,p,li,td,th,label{overflow-wrap:anywhere}
input,select,textarea,button{max-width:100%}
table{width:100%;max-width:100%;table-layout:auto}
.grid>*{min-width:0}
.links,.actions,.hero-actions,.chips{max-width:100%}

/* Consistent content rhythm without replacing page templates. */
.nyh-v89-compact .hero{padding-top:24px!important;padding-bottom:28px!important}
.nyh-v89-compact .section{padding-top:28px!important;padding-bottom:34px!important}
.nyh-v89-compact .section-head{margin-bottom:15px!important}
.nyh-v89-compact .grid,.nyh-v89-compact .task-grid{gap:14px!important}
.nyh-v89-compact .card{padding:17px!important}
.nyh-v89-compact h1{margin-top:6px!important;margin-bottom:12px!important}
.nyh-v89-compact h2{margin-bottom:10px!important}
.nyh-v89-compact p{margin-top:.45em;margin-bottom:.72em}

.nyh-v89-detail .hero{padding-top:26px!important;padding-bottom:30px!important}
.nyh-v89-detail .section{padding-top:30px!important;padding-bottom:38px!important}
.nyh-v89-detail article{max-width:900px}

@media(max-width:900px){
  html,body{overflow-x:hidden!important}
  .nyh-v89-compact .hero,.nyh-v89-detail .hero{padding-top:20px!important;padding-bottom:24px!important}
  .nyh-v89-compact .section,.nyh-v89-detail .section{padding-top:24px!important;padding-bottom:30px!important}
  table{display:block;overflow-x:auto;-webkit-overflow-scrolling:touch}
}
@media(max-width:700px){
  .nyh-v89-compact .hero,.nyh-v89-detail .hero{padding-top:16px!important;padding-bottom:20px!important}
  .nyh-v89-compact .section,.nyh-v89-detail .section{padding-top:20px!important;padding-bottom:25px!important}
  .nyh-v89-compact .card{padding:14px!important}
}
</style>`;

const DIRECTORY_PATHS = new Set([
  '/tools','/learn','/knowledge-center','/new-york-hut-knowledge-center',
  '/hut-guide','/services','/all-pages','/forms-library',
  '/hut-registration-center','/mt-903-filing-center','/vehicle-lifecycle',
  '/audit-and-enforcement-center','/exemptions-and-special-vehicles',
  '/carrier-compliance-center','/news-and-regulatory-center'
]);

function stripTags(value = '') {
  return value
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function trimTitle(value, max = 64) {
  const clean = stripTags(value);
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max + 1);
  const boundary = cut.lastIndexOf(' ');
  return `${cut.slice(0, boundary > 42 ? boundary : max).trim()}…`;
}

function firstH1(html) {
  const match = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
  return match ? stripTags(match[1]) : '';
}

function seoTitle(path, h1) {
  const exact = {
    '/': 'New York HUT Guide, Tools & Compliance Help | NewYorkHUT.com',
    '/tools': 'Free New York HUT Calculators & Compliance Tools',
    '/hut-guide': 'New York HUT Guide | Registration, Filing & Compliance',
    '/learn': 'New York HUT Knowledge Center | Guides & Compliance Help',
    '/knowledge-center': 'New York HUT Knowledge Center | Guides & Compliance Help',
    '/new-york-hut-knowledge-center': 'New York HUT Knowledge Center | Guides & Compliance Help',
    '/services': 'New York HUT Services | Registration & Compliance Help',
    '/ask-hut-ai': 'Ask HUT AI | New York Highway Use Tax Answers',
    '/all-pages': 'New York HUT Resources & Site Directory',
    '/forms-library': 'New York HUT Forms Library | Current Forms & Guides'
  };
  if (exact[path]) return exact[path];

  const heading = h1 || path.split('/').filter(Boolean).pop()?.replace(/-/g, ' ') || 'New York HUT Resource';
  if (path.startsWith('/tools/')) return trimTitle(`${heading} | Free New York HUT Tool`);
  if (path.startsWith('/learn/')) return trimTitle(`${heading} | New York HUT Guide`);
  if (path.startsWith('/forms/')) return trimTitle(`${heading} | New York HUT Form Guide`);
  if (path.startsWith('/news/')) return trimTitle(`${heading} | New York HUT Update`);
  if (path.endsWith('-center') || DIRECTORY_PATHS.has(path)) return trimTitle(`${heading} | New York HUT Resource`);
  return trimTitle(`${heading} | NewYorkHUT.com`);
}

function replaceOrInsertTitle(html, title) {
  const escaped = title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  if (/<title\b[^>]*>[\s\S]*?<\/title>/i.test(html)) {
    return html.replace(/<title\b[^>]*>[\s\S]*?<\/title>/i, `<title>${escaped}</title>`);
  }
  return html.replace(/<head\b[^>]*>/i, match => `${match}<title>${escaped}</title>`);
}

function replaceOrInsertCanonical(html, canonical) {
  const tag = `<link rel="canonical" href="${canonical}">`;
  if (/<link\b[^>]*rel=(?:"canonical"|'canonical')[^>]*>/i.test(html)) {
    return html.replace(/<link\b[^>]*rel=(?:"canonical"|'canonical')[^>]*>/i, tag);
  }
  return html.replace('</head>', `${tag}</head>`);
}

function replaceMetaProperty(html, property, content) {
  const escaped = content.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  const pattern = new RegExp(`<meta\\b[^>]*property=(?:"${property}"|'${property}')[^>]*>`, 'i');
  const tag = `<meta property="${property}" content="${escaped}">`;
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `${tag}</head>`);
}

function addBodyClass(html, className) {
  return html.replace(/<body\b([^>]*)>/i, (match, attrs) => {
    const classMatch = attrs.match(/\bclass=(?:"([^"]*)"|'([^']*)')/i);
    if (!classMatch) return `<body${attrs} class="${className}">`;
    const current = classMatch[1] || classMatch[2] || '';
    if (current.split(/\s+/).includes(className)) return match;
    const replacement = `class="${`${current} ${className}`.trim()}"`;
    return `<body${attrs.replace(classMatch[0], replacement)}>`;
  });
}

function normalizeHtml(html, requestUrl) {
  if (!/<html/i.test(html)) return html;
  const url = new URL(requestUrl);
  const path = url.pathname.replace(/\/+$/, '') || '/';
  const h1 = firstH1(html);
  const title = seoTitle(path, h1);
  const canonical = `${ORIGIN}${path === '/' ? '/' : path}`;

  let output = replaceOrInsertTitle(html, title);
  output = replaceOrInsertCanonical(output, canonical);
  output = replaceMetaProperty(output, 'og:title', title);
  output = replaceMetaProperty(output, 'og:url', canonical);

  if (!output.includes('nyh-v89-sitewide-audit-css')) {
    output = output.includes('</head>')
      ? output.replace('</head>', `${BASE_STYLE}</head>`)
      : `${BASE_STYLE}${output}`;
  }

  if (path !== '/') {
    output = addBodyClass(output, DIRECTORY_PATHS.has(path) ? 'nyh-v89-compact' : 'nyh-v89-detail');
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

    const html = normalizeHtml(await response.text(), request.url);
    headers.set('cache-control', 'no-store, no-cache, must-revalidate, max-age=0');

    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
