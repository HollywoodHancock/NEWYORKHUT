import site from './index-v97.js';

const VERSION = 'v98';
const FEATURE = 'fix-about-and-legacy-api-5xx-v98';

function normalizedPath(request) {
  return new URL(request.url).pathname.replace(/\/+$/, '') || '/';
}

function aboutPage() {
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>About NewYorkHUT.com | Independent New York HUT Guidance</title>
<meta name="description" content="Learn about NewYorkHUT.com, an independent educational resource for New York Highway Use Tax requirements, compliance, filing, and permit guidance.">
<link rel="canonical" href="https://newyorkhut.com/about">
<meta property="og:title" content="About NewYorkHUT.com">
<meta property="og:description" content="Independent educational guidance for New York Highway Use Tax requirements, compliance, filing, and permit questions.">
<meta property="og:url" content="https://newyorkhut.com/about">
<meta property="og:type" content="website">
<style>
:root{font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#14283d}*{box-sizing:border-box}body{margin:0;background:#fff;line-height:1.6}.w{width:min(980px,calc(100% - 36px));margin:auto}.top{border-bottom:1px solid #d7e3ed;background:#fff}.nav{min-height:74px;display:flex;align-items:center;justify-content:space-between;gap:18px}.brand{font-size:1.3rem;font-weight:900;color:#082b4c;text-decoration:none}.nav a{color:#176dcc;text-decoration:none;font-weight:700}.hero{padding:54px 0;background:linear-gradient(135deg,#f9fcff,#eef6fb)}h1{font-size:clamp(2.2rem,5vw,3.7rem);line-height:1.05;color:#082b4c;margin:0 0 16px}.lead{font-size:1.08rem;color:#435d75;max-width:820px}.section{padding:36px 0}.card{border:1px solid #d7e3ed;border-radius:14px;padding:22px;margin:0 0 16px;background:#fff}.card h2{margin:0 0 8px;color:#082b4c}.cta{display:inline-block;margin-top:10px;background:#176dcc;color:#fff!important;padding:11px 16px;border-radius:9px;text-decoration:none;font-weight:800}@media(max-width:700px){.nav{display:block;padding:14px 0}.nav div{margin-top:8px;display:flex;gap:12px;flex-wrap:wrap}}
</style>
</head>
<body>
<header class="top"><div class="w nav"><a class="brand" href="/">NewYorkHUT.com</a><div><a href="/learn">Learn</a> &nbsp; <a href="/tools">Tools</a> &nbsp; <a href="/new-york-hut-guide">HUT Guide</a></div></div></header>
<main>
<section class="hero"><div class="w"><h1>About NewYorkHUT.com</h1><p class="lead">NewYorkHUT.com is an independent educational resource focused on New York Highway Use Tax requirements, registration, vehicle credentials, MT-903 filing, recordkeeping, audits, exemptions, and related carrier compliance topics.</p></div></section>
<section class="section"><div class="w">
<div class="card"><h2>What this site does</h2><p>We organize practical New York HUT information into guides, tools, compliance centers, and reference material intended to help carriers understand what may apply before they take action.</p></div>
<div class="card"><h2>Education and ordering are separate</h2><p>NewYorkHUT.com provides research and guidance. Secure permit ordering, payments, customer accounts, and completed permit documents are handled separately through NYHUT.com.</p><a class="cta" href="https://www.nyhut.com/order?utm_source=newyorkhut.com&utm_medium=referral&utm_campaign=authority_site&utm_content=about-page-order-cta" rel="noopener">Continue to NYHUT.com →</a></div>
<div class="card"><h2>Independent resource</h2><p>NewYorkHUT.com is not a New York State government website. Users should confirm current legal, tax, and regulatory requirements with the appropriate New York State agency when necessary.</p></div>
</div></section>
</main>
</body>
</html>`;
  return new Response(html, {
    status: 200,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public, max-age=300',
      'x-newyorkhut-version': VERSION,
      'x-newyorkhut-feature': FEATURE
    }
  });
}

export default {
  async fetch(request, env, ctx) {
    const path = normalizedPath(request);

    if (path === '/about') return aboutPage();

    if (path === '/api/leads') {
      return new Response('Gone', {
        status: 410,
        headers: {
          'content-type': 'text/plain; charset=utf-8',
          'cache-control': 'public, max-age=86400',
          'x-robots-tag': 'noindex',
          'x-newyorkhut-version': VERSION,
          'x-newyorkhut-feature': FEATURE
        }
      });
    }

    const response = await site.fetch(request, env, ctx);
    const headers = new Headers(response.headers);
    headers.set('x-newyorkhut-version', VERSION);
    headers.set('x-newyorkhut-feature', FEATURE);
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  }
};
