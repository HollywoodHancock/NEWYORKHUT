import fs from 'node:fs';

const fail = message => {
  console.error(`PRODUCTION CONTRACT FAILED: ${message}`);
  process.exitCode = 1;
};

for (const file of ['wrangler.json', 'wrangler.jsonc']) {
  const config = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (config.name !== 'newyorkhut') fail(`${file} must deploy Worker newyorkhut, found ${config.name}`);
  if (config.main !== 'src/index.js') fail(`${file} must use src/index.js, found ${config.main}`);
}

const entry = fs.readFileSync('src/index.js', 'utf8');
if (!/import\s+site\s+from\s+['"]\.\/index-v53\.js['"]/.test(entry)) {
  fail('src/index.js must point to the verified v53 production implementation until an intentional version advance');
}

const active = fs.readFileSync('src/index-v53.js', 'utf8');
for (const required of [
  'id="nyh-global-header"',
  'aria-label="Primary navigation"',
  'html body > header#nyh-global-header',
  ':not(#nyh-global-header)',
  'universal-buttons-v53-visible-fixed'
]) {
  if (!active.includes(required)) fail(`src/index-v53.js is missing required navigation safeguard: ${required}`);
}

const dangerous = 'body>header:not(#nyh47-header),body>nav:not(.nyh47-menu),body>footer:not(#nyh47-footer){display:none!important}';
if (active.includes(dangerous) && !active.includes("body>header:not(#nyh47-header):not(#nyh-global-header)")) {
  fail('active runtime can emit the legacy rule that hides the global header');
}

if (!process.exitCode) console.log('Production contract verified: canonical Worker, entrypoint, and navigation safeguards are intact.');
