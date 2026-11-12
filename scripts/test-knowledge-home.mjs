import test from 'node:test';
import assert from 'node:assert/strict';
import site from '../src/index.js';
import {KNOWLEDGE_TOPICS, KNOWLEDGE_QUESTIONS, HISTORICAL_ANSWERS} from '../src/content/knowledge-home.js';
import {RECOVERY_PATHS} from './search-recovery-pages.mjs';

const origin = 'https://newyorkhut.com';
const fetchPage = path => site.fetch(new Request(origin + path), {}, {});

test('homepage teaches first and hands paid service requests to the ordering domain', async () => {
  const response = await fetchPage('/');
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<h1[^>]*>New York HUT knowledge center<\/h1>/);
  for (const tag of ['title', 'h1', 'main', 'footer']) {
    assert.equal([...html.matchAll(new RegExp(`<${tag}\\b`, 'g'))].length, 1, tag);
  }
  assert.match(html, /rel="canonical" href="https:\/\/newyorkhut\.com\/"/);
  const hero = html.match(/<section class="hero">[\s\S]*?<\/section>/)[0];
  const primary = hero.match(/<a class="btn primary" href="([^"]+)"/)[1];
  assert.equal(primary, '/new-york-hut-guide');
  assert.doesNotMatch(hero, /href="https:\/\/(?:www\.)?nyhut\.com/);
  const schemas = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
  assert.doesNotMatch(JSON.stringify(schemas), /"@type":"Service"/);
  const orderLinks = [...html.matchAll(/href="(https:\/\/(?:www\.)?nyhut\.com[^\"]*)"/g)].map(m => new URL(m[1].replaceAll('&amp;', '&')));
  assert.ok(orderLinks.some(u => u.pathname === '/ny-hut-permit'), 'Keep the contextual order handoff');
  assert.ok(orderLinks.some(u => u.searchParams.get('utm_source') === 'newyorkhut.com'), 'Keep referral attribution');
  assert.doesNotMatch(html, /<form\b[^>]*action="[^\"]*(?:order|checkout)/i);
});

test('homepage restores crawlable links to useful answers at their existing 200 URLs', async () => {
  const html = await (await fetchPage('/')).text();
  const paths = new Set([
    ...KNOWLEDGE_TOPICS.map(t => t[3]),
    ...KNOWLEDGE_QUESTIONS.map(t => t[0]),
    ...HISTORICAL_ANSWERS.map(t => t[0])
  ]);
  for (const path of paths) {
    assert.ok(html.includes(`href="${path}"`), `${path} must be a visible anchor`);
    const response = await fetchPage(path);
    assert.equal(response.status, 200, path);
    const page = await response.text();
    assert.ok(page.includes(`rel="canonical" href="${origin}${path}"`), `${path} keeps its canonical`);
    assert.doesNotMatch(response.headers.get('x-robots-tag') || '', /noindex/i);
  }
});

test('vehicle hub links directly to the canonical guides advertised by the main sitemap', async () => {
  const html = await (await fetchPage('/vehicle-lifecycle')).text();
  const sitemap = await (await fetchPage('/sitemap.xml')).text();
  const cards = html.match(/<div class="grid">([\s\S]*?)<div class="source">/)[1];
  const paths = [...cards.matchAll(/href="([^\"]+)"/g)].map(m => m[1]);
  assert.equal(paths.length, 8);
  for (const path of paths) {
    assert.ok(sitemap.includes(`<loc>${origin}${path}</loc>`), path);
    assert.equal((await fetchPage(path)).status, 200, path);
  }
});

test('every historically clicked path survives with a self-canonical and a direct old-host redirect', async () => {
  for (const path of RECOVERY_PATHS) {
    const response = await fetchPage(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.ok(html.includes(`rel="canonical" href="${origin}${path}"`), path);
    for (const host of ['http://www.newyorkhut.com', 'https://www.newyorkhut.com', 'http://newyorkhut.com']) {
      const redirect = await site.fetch(new Request(host + path), {}, {});
      assert.equal(redirect.status, 301, host + path);
      assert.equal(redirect.headers.get('location'), origin + path, host + path);
    }
  }
});
