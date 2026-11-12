import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import site from '../src/index.js';

const origin = 'https://newyorkhut.com';
const asset = '/newyorkhut-header-banner-bda5bffb9eba.webp';

test('banner is smaller, fingerprinted and requested eagerly without changing its layout attributes', async () => {
  const bytes = readFileSync(new URL('../public' + asset, import.meta.url));
  const original = readFileSync(new URL('../public/newyorkhut-header-banner.png', import.meta.url));
  assert.ok(bytes.length < original.length * 0.68);
  assert.ok(asset.includes(createHash('sha256').update(bytes).digest('hex').slice(0, 12)));
  for (const path of ['/', '/tools', '/filing/quarterly-due-dates']) {
    const html = await (await site.fetch(new Request(origin + path), {}, {})).text();
    const image = html.match(/<div\b[^>]*class="[^"]*nyh-v76-banner[^"]*"[^>]*>\s*(<img\b[^>]*>)/)?.[1];
    // Some newer core pages intentionally have no banner.
    if (!image) { assert.notEqual(path, '/'); continue; }
    for (const attr of [`src="${asset}"`, 'width="1600"', 'height="533"', 'loading="eager"', 'fetchpriority="high"']) {
      assert.ok(image.includes(attr), attr);
    }
  }
});

test('new and historical banner URLs use bundled assets and preserve HEAD/conditional semantics', async () => {
  for (const path of [asset, '/newyorkhut-header-banner.png?v=20260802-05']) {
    for (const method of ['GET', 'HEAD']) {
      let calls = 0;
      const env = {ASSETS: {fetch: async request => {
        calls++;
        assert.equal(request.url, origin + path);
        assert.equal(request.method, method);
        assert.equal(request.headers.get('if-none-match'), '"banner"');
        return new Response(null, {status: 304, headers: {etag: '"banner"'}});
      }}};
      const response = await site.fetch(new Request(origin + path, {method, headers: {'if-none-match': '"banner"'}}), env, {});
      assert.equal(calls, 1);
      assert.equal(response.status, 304);
      assert.equal(response.headers.get('etag'), '"banner"');
      assert.equal(await response.text(), '');
    }
  }
});

test('banner delivery preserves bytes and MIME type with appropriate cache policy', async () => {
  for (const path of [asset, '/newyorkhut-header-banner.png']) {
    const mime = path.endsWith('.webp') ? 'image/webp' : 'image/png';
    const bytes = readFileSync(new URL('../public' + path, import.meta.url));
    const env = {ASSETS: {fetch: async () => new Response(bytes, {headers: {'content-type': mime}})}};
    const response = await site.fetch(new Request(origin + path), env, {});
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('content-type'), mime);
    assert.deepEqual(Buffer.from(await response.arrayBuffer()), bytes);
    assert.match(response.headers.get('cache-control'), path === asset ? /max-age=31536000, immutable/ : /max-age=86400/);
  }
});
