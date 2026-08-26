import fs from 'node:fs';

const base = process.env.SITE_URL || 'https://newyorkhut.com';
const routes = ['/', '/learn', '/tools', '/services', '/new-york-hut-guide', '/terms', '/privacy-policy'];
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const entry = fs.readFileSync('src/index.js', 'utf8');
const targetMatch = entry.match(/import\s+site\s+from\s+['"]\.\/(index-v(\d+)\.js)['"]/);
if (!targetMatch) throw new Error('Unable to determine active production target from src/index.js');
const expectedTarget = `src/${targetMatch[1]}`;
const expectedVersion = `v${targetMatch[2]}`;

async function get(path) {
  let lastError;
  for (let attempt = 1; attempt <= 12; attempt++) {
    try {
      const response = await fetch(`${base}${path}`, {redirect: 'follow', headers: {'user-agent': 'NewYorkHUT-functional-guard/1.0'}});
      const body = await response.text();
      if (response.ok) return {response, body};
      lastError = new Error(`${path} returned HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    await sleep(15000);
  }
  throw lastError;
}

async function getExpectedProbe() {
  let lastError;
  for (let attempt = 1; attempt <= 16; attempt++) {
    try {
      const probe = await get('/__deploy_probe');
      const data = JSON.parse(probe.body);
      if (data.version === expectedVersion && data.target === expectedTarget) return {probe, data};
      lastError = new Error(`Deployment is ${data.version}/${data.target}; waiting for ${expectedVersion}/${expectedTarget}`);
    } catch (error) {
      lastError = error;
    }
    await sleep(15_000);
  }
  throw lastError;
}

const {probe, data} = await getExpectedProbe();
for (const [key, expected] of Object.entries({application: 'NewYorkHUT.com', version: expectedVersion, entrypoint: 'src/index.js', target: expectedTarget})) {
  if (data[key] !== expected) throw new Error(`Probe ${key} expected ${expected}, received ${data[key]}`);
}

for (const route of routes) {
  const {response, body} = await get(route);
  if (!body.includes('aria-label="Primary navigation"')) throw new Error(`${route} is missing accessible primary navigation`);
  if (body.includes('body>header:not(#nyh47-header),body>nav:not(.nyh47-menu),body>footer:not(#nyh47-footer){display:none!important}')) {
    throw new Error(`${route} still contains the unmodified legacy header-hiding rule`);
  }
  if (response.headers.get('x-newyorkhut-version') !== expectedVersion) throw new Error(`${route} is not served by ${expectedVersion}`);
  console.log(`PASS ${route}`);
}

for (const [source, target] of [
  ['/what-is-hut', '/new-york-hut-guide'],
  ['/new-york-hut-weight-threshold', '/learn/how-gvw-affects-your-hut-tax'],
  ['/learn/adding-a-vehicle-to-your-new-york-hut-account', '/learn/adding-a-vehicle-to-new-york-hut']
]) {
  const response = await fetch(`${base}${source}`, {redirect: 'manual'});
  if (response.status !== 301) throw new Error(`${source} expected 301, received ${response.status}`);
  if (new URL(response.headers.get('location')).pathname !== target) throw new Error(`${source} has unexpected redirect target`);
  console.log(`PASS ${source} → ${target}`);
}

console.log('Live production functional check passed for deployment probe and all critical routes.');
