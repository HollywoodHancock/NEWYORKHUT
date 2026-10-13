import assert from 'node:assert/strict';
import test from 'node:test';
import worker from '../src/index.js';
import {CORE_GUIDES} from '../src/content/core-guides.js';
import {CONSOLIDATION_REDIRECTS, EDUCATIONAL_REDIRECTS, canonicalPath, reconcileEducationalLinks} from '../src/seo-consolidation.js';
import baseline from './site-route-baseline.json' with {type:'json'};

const origin = 'https://newyorkhut.com';
const env = {ASSETS:{fetch:async()=>new Response('Not found',{status:404})}};
const get = path => worker.fetch(new Request(origin + path), env, {});

test('reviewed merges resolve directly to useful indexed destinations on every host variant', async () => {
  assert.equal(CONSOLIDATION_REDIRECTS.size, 28);
  for (const [source, target] of CONSOLIDATION_REDIRECTS) {
    assert.equal(canonicalPath(target), target, source);
    for (const host of [origin, 'http://www.newyorkhut.com', 'https://www.newyorkhut.com']) {
      const response = await worker.fetch(new Request(`${host}${source}/?ref=test`), env, {});
      assert.equal(response.status, 301, source);
      assert.equal(response.headers.get('location'), `${origin}${target}?ref=test`, source);
    }
    const response = await get(target);
    assert.equal(response.status, 200, target);
    const html = await response.text();
    assert.ok(html.includes(`rel="canonical" href="${origin}${target}"`), target);
    assert.doesNotMatch(response.headers.get('x-robots-tag') ?? '', /noindex/i);
  }
});

test('all previously discovered routes retain their expected status except reviewed permanent merges', async () => {
  for (const [path, status] of baseline) {
    const expected = EDUCATIONAL_REDIRECTS.has(path.replace(/\/+$/, '') || '/') ? 301 : status;
    const response = await get(path);
    assert.equal(response.status, expected, path);
    if (response.status !== 200 || !response.headers.get('content-type')?.includes('text/html')) continue;
    const html = await response.text();
    for (const match of html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)) {
      const url = new URL(match[1].replace(/&amp;/g,'&'), origin + path);
      if (url.origin !== origin) continue;
      assert.equal(EDUCATIONAL_REDIRECTS.has(url.pathname.replace(/\/+$/, '') || '/'), false,
        `${path} still links to alias ${url.pathname}`);
    }
  }
});

test('six core pages have visible navigation, a single canonical and Article, real organization authorship, and valid section links', async () => {
  for (const [path, page] of CORE_GUIDES) {
    const html = await (await get(path)).text();
    assert.equal((html.match(/<h1\b/g)||[]).length, 1, path);
    assert.equal((html.match(/rel="canonical"/g)||[]).length, 1, path);
    assert.equal((html.match(/<footer\b/g)||[]).length, 1, path);
    assert.match(html, /aria-label="Primary navigation"/);
    const navigation = html.match(/<nav aria-label="Primary navigation">(.*?)<\/nav>/s)?.[1];
    for (const href of ['/learn', '/new-york-hut-guide', '/tools', '/services', '/ask-hut-ai', '/site-map']) {
      assert.ok(navigation?.includes(`href="${href}"`), `${path} missing navigation link ${href}`);
    }
    assert.ok(html.includes(page.heading), path);
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(m=>JSON.parse(m[1]));
    assert.equal(schemas.length, 1, path);
    assert.equal(schemas[0].author['@type'], 'Organization');
    assert.equal(schemas[0].author.name, 'NewYorkHUT.com');
    for (const m of html.matchAll(/href="#([^"]+)"/g)) assert.ok(html.includes(`id="${m[1]}"`), `${path} missing ${m[1]}`);
  }
});

test('temporary guidance distinguishes carrier limits, printed expiry, TR-8 and regular filing', async () => {
  const html = await (await get('/guides/get-trip-certificate')).text();
  assert.match(html, /10 certificates per carrier/);
  assert.match(html, /midnight on the third day after issuance/);
  assert.match(html, /TR-8/);
  assert.match(html, /does not erase a carrier’s separate regular-registration filing obligations/);
  assert.match(html, /product=nyhut-temporary/);
});

test('existing clicked filing URL remains 200 and preserves frequency boundaries and the adjusted 2026 Q3 deadline', async () => {
  const response = await get('/filing/quarterly-due-dates');
  assert.equal(response.status, 200);
  const html = await response.text();
  for (const phrase of ['November 2, 2026', '$1,200 or less', 'More than $1,200 through $12,000', 'More than $12,000', 'entire preceding calendar year']) assert.ok(html.includes(phrase), phrase);
});

test('weight guide retains all six former weight-page answers and the unloaded-method thresholds', async () => {
  const html = await (await get('/learn/how-gvw-affects-your-hut-tax')).text();
  for (const weight of ['18,000','20,000','26,000','40,000','55,000','80,000']) assert.ok(html.includes(weight), weight);
  assert.match(html, /More than 8,000 pounds unloaded/);
  assert.match(html, /More than 4,000 pounds unloaded/);
  assert.match(html, /\$0\.84 and \$5\.46/);
});

test('link reconciliation preserves queries, fragments, and transactional destination semantics', () => {
  const html = '<a href="/weight/18000?ref=a&amp;campaign=b#weight-examples">Weight</a><a href="https://nyhut.com/temporary-ny-hut-permit?product=x">Service</a><a href="mailto:info@example.com">Email</a>';
  const fixed = reconcileEducationalLinks(html);
  assert.match(fixed, /href="\/learn\/how-gvw-affects-your-hut-tax\?ref=a&amp;campaign=b#weight-examples"/);
  assert.ok(fixed.includes('href="https://nyhut.com/temporary-ny-hut-permit?product=x"'));
  assert.ok(fixed.includes('href="mailto:info@example.com"'));
});

test('sitemap contains only final 200 canonicals and dates only the changed guides', async () => {
  const response = await get('/sitemap.xml');
  const xml = await response.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
  assert.equal(new Set(urls).size, urls.length);
  assert.equal(Number(response.headers.get('x-sitemap-url-count')), urls.length);
  for (const url of urls) {
    const path = new URL(url).pathname;
    assert.equal(canonicalPath(path), path, url);
    const page = await get(path);
    assert.equal(page.status, 200, path);
    assert.ok((await page.text()).includes(`rel="canonical" href="${url}"`), url);
  }
  for (const path of CORE_GUIDES.keys()) assert.ok(xml.includes(`<loc>${origin}${path}</loc><lastmod>${CORE_GUIDES.get(path).sourceCheckDate || "2026-10-06"}</lastmod>`), path);
});

test('expanded eligibility, credential, renewal, cost and exemption guides answer the specific decision',async()=>{
 const cases=new Map([
  ['/learn/who-needs-a-new-york-hut-permit',['18,000','8,000','4,000','ten trip certificates','ten days or less']],
  ['/learn/new-york-hut-certificate-of-registration',['regular place of business','TR-8','TMT-334','January']],
  ['/learn/new-york-hut-decals-explained',['front registration plate','rear registration plate','five days','cannot move a decal']],
  ['/services/hut-renewals',['renewal is over','not an announcement','does not renew registration']],
  ['/cost',['$1.50','$25','$0.84','$5.46','Recurring mileage tax','penalty and interest estimator']],
  ['/learn/new-york-hut-exempt-vehicle-guide',['entire calendar month','Concrete pumps','snow blade','passengers for hire']]
 ]);
 for(const[path,phrases]of cases){
  const page=CORE_GUIDES.get(path);assert.equal(page.sourceCheckDate,'2026-10-13');
  const html=await(await get(path)).text();assert.ok(html.includes(`<title>${page.title}</title>`),path);
  assert.ok(html.includes('<time datetime="2026-10-13">October 13, 2026</time>'),path);
  for(const phrase of phrases)assert.ok(html.toLowerCase().includes(phrase.toLowerCase()),path+': '+phrase);
  for(const m of html.matchAll(/<a[^>]*href="([^"]+)"/g)){
   const u=new URL(m[1].replace(/&amp;/g,'&'),origin+path);
   if(u.origin===origin&&!u.hash)assert.equal((await get(u.pathname)).status,200,path+': '+u.pathname);
  }
  const cta=html.match(/<a class="cta" href="([^"]+)"/)[1];const u=new URL(cta.replace(/&amp;/g,'&'));
  assert.equal(u.hostname,'nyhut.com');assert.equal(u.searchParams.get('utm_source'),'newyorkhut.com');assert.equal(u.searchParams.get('utm_content'),path.slice(1));
 }
});
