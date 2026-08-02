import site from './index-v89.js';

const VERSION = 'v90';
const FEATURE = 'deterministic-sitemap-seo-audit-v90';
const ORIGIN = 'https://newyorkhut.com';

function decodeXml(value = '') {
  return value.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
}

function normalizeUrl(value) {
  try {
    const url = new URL(decodeXml(value), ORIGIN);
    if (url.hostname !== 'newyorkhut.com' && url.hostname !== 'www.newyorkhut.com') return null;
    const path = url.pathname.replace(/\/{2,}/g, '/').replace(/\/+$/, '') || '/';
    return `${ORIGIN}${path}`;
  } catch {
    return null;
  }
}

function extractSitemapUrls(xml) {
  const urls = [];
  const seen = new Set();
  const pattern = /<loc>\s*([\s\S]*?)\s*<\/loc>/gi;
  let match;
  while ((match = pattern.exec(xml))) {
    const normalized = normalizeUrl(match[1]);
    if (normalized && !seen.has(normalized)) {
      seen.add(normalized);
      urls.push(normalized);
    }
  }
  return urls;
}

function sitemapXml(urls) {
  const rows = urls.map(url => `  <url><loc>${url.replace(/&/g, '&amp;')}</loc></url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows}\n</urlset>`;
}

function text(html, pattern) {
  const match = html.match(pattern);
  return match ? match[1].replace(/<[^>]+>/g, ' ').replace(/&nbsp;/gi, ' ').replace(/&amp;/gi, '&').replace(/\s+/g, ' ').trim() : '';
}

function count(html, pattern) {
  return (html.match(pattern) || []).length;
}

function attr(html, pattern) {
  const match = html.match(pattern);
  return match ? match[1] : '';
}

async function getCurrentSitemap(request, env, ctx) {
  const url = new URL('/sitemap.xml', request.url);
  const response = await site.fetch(new Request(url.toString(), { headers: request.headers }), env, ctx);
  const xml = await response.text();
  return { response, xml, urls: extractSitemapUrls(xml) };
}

async function auditPage(target, request, env, ctx) {
  try {
    const response = await site.fetch(new Request(target, { headers: request.headers }), env, ctx);
    const type = response.headers.get('content-type') || '';
    const html = type.includes('text/html') ? await response.text() : '';
    const title = text(html, /<title\b[^>]*>([\s\S]*?)<\/title>/i);
    const canonical = attr(html, /<link\b[^>]*rel=(?:"canonical"|'canonical')[^>]*href=(?:"([^"]+)"|'([^']+)')[^>]*>/i) || attr(html, /<link\b[^>]*href=(?:"([^"]+)"|'([^']+)')[^>]*rel=(?:"canonical"|'canonical')[^>]*>/i);
    const description = attr(html, /<meta\b[^>]*name=(?:"description"|'description')[^>]*content=(?:"([^"]*)"|'([^']*)')[^>]*>/i) || attr(html, /<meta\b[^>]*content=(?:"([^"]*)"|'([^']*)')[^>]*name=(?:"description"|'description')[^>]*>/i);
    const h1 = text(html, /<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
    const h1Count = count(html, /<h1\b/gi);
    const viewport = /<meta\b[^>]*name=(?:"viewport"|'viewport')/i.test(html);
    const canonicalExpected = target.replace(/\/+$/, '') || `${ORIGIN}/`;
    const issues = [];
    if (response.status !== 200) issues.push(`status:${response.status}`);
    if (!type.includes('text/html')) issues.push('not-html');
    if (!title) issues.push('missing-title');
    if (title.length > 65) issues.push('title-too-long');
    if (!description) issues.push('missing-description');
    if (description && (description.length < 70 || description.length > 170)) issues.push('description-length');
    if (h1Count !== 1) issues.push(`h1-count:${h1Count}`);
    if (!canonical) issues.push('missing-canonical');
    if (canonical && normalizeUrl(canonical) !== canonicalExpected) issues.push('canonical-mismatch');
    if (!viewport) issues.push('missing-viewport');
    return { url: target, status: response.status, contentType: type, title, titleLength: title.length, descriptionLength: description.length, canonical, h1, h1Count, viewport, issues };
  } catch (error) {
    return { url: target, status: 0, issues: ['worker-exception'], error: String(error?.message || error) };
  }
}

async function audit(request, env, ctx) {
  const { urls } = await getCurrentSitemap(request, env, ctx);
  const requestUrl = new URL(request.url);
  const limit = Math.min(Math.max(Number(requestUrl.searchParams.get('limit')) || urls.length, 1), 300);
  const selected = urls.slice(0, limit);
  const pages = [];
  const concurrency = 8;
  for (let i = 0; i < selected.length; i += concurrency) {
    const batch = selected.slice(i, i + concurrency);
    pages.push(...await Promise.all(batch.map(url => auditPage(url, request, env, ctx))));
  }
  const duplicateTitles = {};
  const duplicateCanonicals = {};
  for (const page of pages) {
    if (page.title) (duplicateTitles[page.title] ||= []).push(page.url);
    if (page.canonical) (duplicateCanonicals[page.canonical] ||= []).push(page.url);
  }
  const titleDuplicates = Object.fromEntries(Object.entries(duplicateTitles).filter(([, list]) => list.length > 1));
  const canonicalDuplicates = Object.fromEntries(Object.entries(duplicateCanonicals).filter(([, list]) => list.length > 1));
  const failed = pages.filter(page => page.issues?.length);
  return new Response(JSON.stringify({
    application: 'NewYorkHUT.com',
    version: VERSION,
    feature: FEATURE,
    sitemapUrlCount: urls.length,
    auditedCount: pages.length,
    passedCount: pages.length - failed.length,
    failedCount: failed.length,
    duplicateTitles: titleDuplicates,
    duplicateCanonicals: canonicalDuplicates,
    pages
  }, null, 2), { headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__seo_audit') return audit(request, env, ctx);

    if (path === '/sitemap.xml') {
      const { response, urls } = await getCurrentSitemap(request, env, ctx);
      if (!urls.length) return response;
      return new Response(sitemapXml(urls), {
        status: 200,
        headers: {
          'content-type': 'application/xml; charset=utf-8',
          'cache-control': 'public, max-age=3600',
          'x-newyorkhut-version': VERSION,
          'x-newyorkhut-feature': FEATURE,
          'x-sitemap-url-count': String(urls.length)
        }
      });
    }

    const response = await site.fetch(request, env, ctx);
    const headers = new Headers(response.headers);
    headers.set('x-newyorkhut-version', VERSION);
    headers.set('x-newyorkhut-feature', FEATURE);
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  }
};
