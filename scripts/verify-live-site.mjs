const base = process.env.SITE_URL || 'https://newyorkhut.com';
const routes = ['/', '/learn', '/tools', '/services', '/new-york-hut-guide'];
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

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

const probe = await get('/__deploy_probe');
const data = JSON.parse(probe.body);
for (const [key, expected] of Object.entries({application: 'NewYorkHUT.com', entrypoint: 'src/index.js', target: 'src/index-v53.js'})) {
  if (data[key] !== expected) throw new Error(`Probe ${key} expected ${expected}, received ${data[key]}`);
}

for (const route of routes) {
  const {response, body} = await get(route);
  if (!body.includes('id="nyh-global-header"')) throw new Error(`${route} is missing #nyh-global-header`);
  if (!body.includes('aria-label="Primary navigation"')) throw new Error(`${route} is missing accessible primary navigation`);
  if (!body.includes('html body > header#nyh-global-header')) throw new Error(`${route} is missing the high-specificity visibility safeguard`);
  if (body.includes('body>header:not(#nyh47-header),body>nav:not(.nyh47-menu),body>footer:not(#nyh47-footer){display:none!important}')) {
    throw new Error(`${route} still contains the unmodified legacy header-hiding rule`);
  }
  const marker = response.headers.get('x-newyorkhut-navigation');
  if (marker !== 'universal-buttons-v53-visible-fixed') throw new Error(`${route} has unexpected navigation marker: ${marker}`);
  console.log(`PASS ${route}`);
}

console.log('Live production functional check passed for deployment probe and all critical routes.');
