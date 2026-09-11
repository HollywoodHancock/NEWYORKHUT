const origin = 'https://newyorkhut.com';
const sitemapResponse = await fetch(`${origin}/sitemap.xml`, { redirect: 'manual' });
if (sitemapResponse.status !== 200) throw new Error(`Sitemap returned HTTP ${sitemapResponse.status}`);

const xml = await sitemapResponse.text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
if (!urls.length) throw new Error('Sitemap contains no URLs');
if (new Set(urls).size !== urls.length) throw new Error('Sitemap contains duplicate URLs');

const failures = [];
let cursor = 0;
async function worker() {
  while (cursor < urls.length) {
    const url = urls[cursor++];
    if (!url.startsWith(`${origin}/`)) {
      failures.push(`${url}: sitemap URL is not on the canonical HTTPS/non-www host`);
      continue;
    }
    try {
      const response = await fetch(url, { redirect: 'manual', headers: { 'user-agent': 'NewYorkHUT-Search-Integrity-Guard/1.0' } });
      if (response.status !== 200) {
        failures.push(`${url}: HTTP ${response.status}`);
        continue;
      }
      const html = await response.text();
      const canonical = html.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i)?.[1]
        ?? html.match(/<link\s+[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["'][^>]*>/i)?.[1];
      if (canonical !== url) failures.push(`${url}: canonical is ${canonical ?? 'missing'}`);
      if (/<meta\s+[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)) failures.push(`${url}: page is noindex`);
    } catch (error) {
      failures.push(`${url}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

await Promise.all(Array.from({ length: 8 }, () => worker()));
if (failures.length) {
  console.error(`Live sitemap audit failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log(`Live sitemap audit passed for ${urls.length} canonical URLs.`);
