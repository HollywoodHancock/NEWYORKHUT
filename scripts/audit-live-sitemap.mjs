const origin = 'https://newyorkhut.com';
const sitemapResponse = await fetch(`${origin}/sitemap.xml`, { redirect: 'manual' });
if (sitemapResponse.status !== 200) throw new Error(`Sitemap returned HTTP ${sitemapResponse.status}`);

const xml = await sitemapResponse.text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
if (!urls.length) throw new Error('Sitemap contains no URLs');
if (new Set(urls).size !== urls.length) throw new Error('Sitemap contains duplicate URLs');

const failures = [];
const titles = new Map();
const descriptions = new Map();
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
      const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.replace(/\s+/g, ' ').trim();
      const description = html.match(/<meta\s+[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i)?.[1]
        ?? html.match(/<meta\s+[^>]*content=["']([^"']+)["'][^>]*name=["']description["'][^>]*>/i)?.[1];
      const h1Count = (html.match(/<h1\b/gi) || []).length;
      const canonical = html.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i)?.[1]
        ?? html.match(/<link\s+[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["'][^>]*>/i)?.[1];
      if (canonical !== url) failures.push(`${url}: canonical is ${canonical ?? 'missing'}`);
      if (/<meta\s+[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)) failures.push(`${url}: page is noindex`);
      if (!title) failures.push(`${url}: title is missing`);
      else titles.set(title.toLowerCase(), [...(titles.get(title.toLowerCase()) ?? []), url]);
      if (!description) failures.push(`${url}: meta description is missing`);
      else descriptions.set(description.toLowerCase(), [...(descriptions.get(description.toLowerCase()) ?? []), url]);
      if (h1Count !== 1) failures.push(`${url}: expected one H1, found ${h1Count}`);
      const expectedUtilityLinks = new Map([
        ['my nyhut', '/my-nyhut'],
        ['customer dashboard', '/my-nyhut'],
        ['order status', '/lookup'],
        ['trip certificate', '/order'],
        ['add a vehicle', '/order']
      ]);
      for (const anchor of html.matchAll(/<a\b[^>]*href=["'](https:\/\/(?:www\.)?nyhut\.com[^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
        const label = anchor[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
        const expectedPath = expectedUtilityLinks.get(label);
        if (!expectedPath) continue;
        const destination = new URL(anchor[1].replace(/&amp;/g, '&'));
        if (destination.pathname !== expectedPath) failures.push(`${url}: "${label}" points to ${destination.pathname}, expected ${expectedPath}`);
      }
    } catch (error) {
      failures.push(`${url}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

await Promise.all(Array.from({ length: 8 }, () => worker()));
for (const [title, matchingUrls] of titles) {
  if (matchingUrls.length > 1) failures.push(`duplicate title "${title}" on ${matchingUrls.join(', ')}`);
}
for (const [description, matchingUrls] of descriptions) {
  if (matchingUrls.length > 1) failures.push(`duplicate description "${description}" on ${matchingUrls.join(', ')}`);
}
if (failures.length) {
  console.error(`Live sitemap audit failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log(`Live sitemap audit passed for ${urls.length} canonical URLs.`);
