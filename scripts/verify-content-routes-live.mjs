import baseline from './site-route-baseline.json' with {type:'json'};
import {EDUCATIONAL_REDIRECTS, canonicalPath} from '../src/seo-consolidation.js';
import {CORE_GUIDES} from '../src/content/core-guides.js';

const base = process.env.SITE_URL || 'https://newyorkhut.com';
const jobs = [...baseline.map(([path, status]) => ({url:base + path,
  status:EDUCATIONAL_REDIRECTS.has(path.replace(/\/+$/, '') || '/') ? 301 : status})),
  ...[...EDUCATIONAL_REDIRECTS.keys()].flatMap(path => [
    {url:base + path, status:301},
    {url:`http://www.newyorkhut.com${path}/?ref=consolidation-check`, status:301}
  ]), {url:base + '/missing-route-regression', status:404}];
let cursor = 0;
const failures = [];
await Promise.all(Array.from({length:8}, async () => {
  while (cursor < jobs.length) {
    const job = jobs[cursor++];
    let error;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const response = await fetch(job.url, {redirect:'manual', signal:AbortSignal.timeout(25_000),
          headers:{'user-agent':'NewYorkHUT-content-route-check/1.0'}});
        const html = await response.text();
        if (response.status !== job.status) throw new Error(`expected ${job.status}, received ${response.status}`);
        const url = new URL(job.url);
        if (EDUCATIONAL_REDIRECTS.has(url.pathname.replace(/\/+$/, '') || '/')) {
          const expected = new URL(canonicalPath(url.pathname), 'https://newyorkhut.com');
          expected.search = url.search;
          if (response.headers.get('location') !== expected.toString()) throw new Error('incorrect final redirect');
        }
        if (response.status === 200 && response.headers.get('content-type')?.includes('text/html')) {
          for (const m of html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)) {
            const link = new URL(m[1].replace(/&amp;/g,'&'), job.url);
            if (link.hostname === 'newyorkhut.com' && EDUCATIONAL_REDIRECTS.has(link.pathname.replace(/\/+$/, '') || '/')) throw new Error(`stale internal link ${link.pathname}`);
          }
          if (CORE_GUIDES.has(url.pathname)) {
            if (!html.includes(`rel="canonical" href="${base}${url.pathname}"`)) throw new Error('incorrect canonical');
            if (!html.includes('Official sources checked')) throw new Error('old core guide content');
          }
        }
        error = null;
        break;
      } catch (e) { error = e.message; }
      await new Promise(resolve=>setTimeout(resolve,1000));
    }
    if (error) failures.push(`${job.url}: ${error}`);
  }
}));
if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else console.log(`Live content and consolidation check passed for ${jobs.length} URL checks.`);
