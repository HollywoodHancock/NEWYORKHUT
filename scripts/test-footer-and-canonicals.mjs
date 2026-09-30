import assert from 'node:assert/strict';
import test from 'node:test';
import {restoreMissingFooter} from '../src/index-v118.js';

test('restores one visible footer without changing page metadata or main content', () => {
  const original = '<!doctype html><html><head><title>Guide</title><link rel="canonical" href="https://newyorkhut.com/new-york-hut-guide"></head><body><main><h1>Guide</h1></main></body></html>';
  const repaired = restoreMissingFooter(original);
  assert.match(repaired, /<footer id="nyh47-footer" class="nyh118-footer">/);
  assert.match(repaired, /<a href="\/new-york-hut-guide">HUT permit guide<\/a>/);
  assert.equal((repaired.match(/<footer\b/g) || []).length, 1);
  assert.equal((repaired.match(/rel="canonical"/g) || []).length, 1);
  assert.match(repaired, /<main><h1>Guide<\/h1><\/main>/);
});

test('does not touch pages with an existing footer', () => {
  const original = '<html><head></head><body><main>Home</main><footer id="nyh47-footer">Existing</footer></body></html>';
  assert.equal(restoreMissingFooter(original), original);
});

test('does not alter a fragment without a closing body', () => {
  const original = '<main>Fragment</main>';
  assert.equal(restoreMissingFooter(original), original);
});

test('canonical redirect map remains explicit and one-to-one', async () => {
  const {default: canonicalSite} = await import('../src/index-v103.js');
  const routes = [
    ['http://www.newyorkhut.com/official-resources', 'https://newyorkhut.com/official-resources'],
    ['http://www.newyorkhut.com/new-york-hut-guide', 'https://newyorkhut.com/new-york-hut-guide'],
    ['https://www.newyorkhut.com/tools', 'https://newyorkhut.com/tools'],
    ['https://newyorkhut.com/what-is-hut', 'https://newyorkhut.com/new-york-hut-guide']
  ];
  for (const [source, target] of routes) {
    const response = await canonicalSite.fetch(new Request(source), {}, {});
    assert.equal(response.status, 301, source);
    assert.equal(response.headers.get('location'), target, source);
  }
});

test('active Worker restores footer on affected routes without duplicating homepage footer', async () => {
  const {default: worker} = await import('../src/index.js');
  const env = {ASSETS: {fetch: async () => new Response('not found', {status: 404})}};
  for (const path of ['/', '/new-york-hut-guide', '/tools', '/learn/form-2290-heavy-vehicle-use-tax', '/ny-hut-axle-count']) {
    const response = await worker.fetch(new Request(`https://newyorkhut.com${path}`), env, {});
    const html = await response.text();
    assert.equal(response.status, 200, path);
    assert.equal(response.headers.get('x-newyorkhut-version'), 'v118', path);
    assert.equal((html.match(/<footer\b/gi) || []).length, 1, path);
    assert.equal((html.match(/rel="canonical"/gi) || []).length, 1, path);
    assert.equal(html.includes('nyh118-footer'), path !== '/', path);
  }
});
