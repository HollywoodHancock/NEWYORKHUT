const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>New York HUT Permit & Registration Help | NewYorkHUT.com</title>
  <meta name="description" content="Get clear guidance and fast assistance with New York Highway Use Tax registration, HUT certificates, vehicle permits, renewals, and trucking compliance." />
  <meta name="robots" content="index,follow" />
  <link rel="canonical" href="https://newyorkhut.com/" />
  <meta property="og:title" content="New York HUT Permit & Registration Help" />
  <meta property="og:description" content="Fast, straightforward New York Highway Use Tax permit and registration assistance for motor carriers." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://newyorkhut.com/" />
  <meta name="theme-color" content="#0b2a4a" />
  <style>
    :root {
      --navy:#0b2a4a;
      --navy-2:#123f6b;
      --blue:#1e68c7;
      --blue-2:#0f55ad;
      --gold:#f4b942;
      --ink:#122033;
      --muted:#5d6b7d;
      --line:#dbe5ef;
      --soft:#f4f8fc;
      --white:#fff;
      --success:#137a4d;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
    *{box-sizing:border-box}
    html{scroll-behavior:smooth}
    body{margin:0;color:var(--ink);background:#fff;line-height:1.55}
    a{color:inherit}
    .wrap{width:min(1180px,calc(100% - 40px));margin:auto}
    .topbar{background:var(--navy);color:#dce9f5;font-size:.92rem}
    .topbar .wrap{display:flex;justify-content:space-between;gap:20px;padding:9px 0}
    .topbar strong{color:#fff}
    header{position:sticky;top:0;z-index:50;background:rgba(255,255,255,.96);backdrop-filter:blur(12px);border-bottom:1px solid var(--line)}
    .nav{display:flex;align-items:center;justify-content:space-between;gap:24px;padding:17px 0}
    .brand{display:flex;align-items:center;gap:12px;text-decoration:none;font-weight:900;font-size:1.25rem;letter-spacing:-.03em}
    .brand-mark{width:42px;height:42px;border-radius:11px;background:linear-gradient(135deg,var(--navy),var(--blue));display:grid;place-items:center;color:white;font-weight:900;box-shadow:0 8px 22px rgba(11,42,74,.2)}
    .navlinks{display:flex;align-items:center;gap:24px;font-size:.96rem;font-weight:700}
    .navlinks a{text-decoration:none;color:#314255}
    .btn{display:inline-flex;align-items:center;justify-content:center;gap:9px;padding:14px 21px;border-radius:10px;text-decoration:none;font-weight:800;border:1px solid transparent;transition:.2s ease}
    .btn-primary{background:var(--blue);color:#fff;box-shadow:0 10px 25px rgba(30,104,199,.24)}
    .btn-primary:hover{background:var(--blue-2);transform:translateY(-1px)}
    .btn-light{background:#fff;color:var(--navy);border-color:#ccd9e6}
    .hero{background:radial-gradient(circle at 82% 20%,rgba(30,104,199,.14),transparent 32%),linear-gradient(180deg,#f8fbff,#eef5fb);padding:78px 0 58px;border-bottom:1px solid var(--line)}
    .hero-grid{display:grid;grid-template-columns:1.15fr .85fr;gap:55px;align-items:center}
    .eyebrow{display:inline-flex;align-items:center;gap:9px;color:var(--blue);font-weight:900;text-transform:uppercase;letter-spacing:.09em;font-size:.78rem;margin-bottom:16px}
    .eyebrow:before{content:"";width:28px;height:3px;border-radius:3px;background:var(--gold)}
    h1{font-size:clamp(2.7rem,6vw,5rem);line-height:.98;letter-spacing:-.055em;margin:0 0 22px;color:var(--navy)}
    .lead{font-size:1.22rem;color:#4f6074;max-width:700px;margin:0 0 28px}
    .actions{display:flex;flex-wrap:wrap;gap:12px;margin-bottom:26px}
    .trustline{display:flex;flex-wrap:wrap;gap:18px;color:#42546a;font-size:.94rem;font-weight:700}
    .trustline span:before{content:"✓";color:var(--success);font-weight:900;margin-right:7px}
    .hero-card{background:#fff;border:1px solid #d7e3ee;border-radius:20px;padding:30px;box-shadow:0 22px 60px rgba(11,42,74,.14)}
    .hero-card h2{font-size:1.55rem;margin:0 0 8px;color:var(--navy)}
    .hero-card p{margin:0 0 20px;color:var(--muted)}
    .checklist{display:grid;gap:13px;margin:0;padding:0;list-style:none}
    .checklist li{display:flex;gap:12px;align-items:flex-start;padding:13px 0;border-bottom:1px solid #edf2f7}
    .checklist li:last-child{border-bottom:0}
    .icon{width:28px;height:28px;flex:0 0 28px;border-radius:50%;display:grid;place-items:center;background:#e9f7f0;color:var(--success);font-weight:900}
    section{padding:76px 0}
    .section-head{max-width:760px;margin-bottom:34px}
    .section-head h2{font-size:clamp(2rem,4vw,3.1rem);line-height:1.08;letter-spacing:-.04em;margin:0 0 14px;color:var(--navy)}
    .section-head p{margin:0;color:var(--muted);font-size:1.08rem}
    .cards{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
    .card{border:1px solid var(--line);border-radius:16px;padding:27px;background:#fff;box-shadow:0 8px 24px rgba(20,51,82,.05)}
    .card .num{font-size:.8rem;font-weight:900;color:var(--blue);letter-spacing:.1em;text-transform:uppercase;margin-bottom:13px}
    .card h3{margin:0 0 10px;font-size:1.27rem;color:var(--navy)}
    .card p{margin:0;color:var(--muted)}
    .soft{background:var(--soft);border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
    .split{display:grid;grid-template-columns:1fr 1fr;gap:52px;align-items:start}
    .list{display:grid;gap:14px;margin:24px 0 0;padding:0;list-style:none}
    .list li{display:grid;grid-template-columns:34px 1fr;gap:12px;align-items:start}
    .list b{display:block;color:var(--navy);margin-bottom:3px}
    .list span{color:var(--muted)}
    .faq{display:grid;gap:12px}
    details{background:#fff;border:1px solid var(--line);border-radius:13px;padding:0 19px}
    summary{cursor:pointer;font-weight:800;color:var(--navy);padding:18px 0;list-style:none}
    summary::-webkit-details-marker{display:none}
    details p{margin:0;padding:0 0 18px;color:var(--muted)}
    .cta{background:linear-gradient(135deg,var(--navy),#164f83);color:#fff;border-radius:24px;padding:48px;display:flex;align-items:center;justify-content:space-between;gap:36px;box-shadow:0 22px 60px rgba(11,42,74,.23)}
    .cta h2{font-size:clamp(2rem,4vw,3rem);line-height:1.08;letter-spacing:-.04em;margin:0 0 10px}
    .cta p{margin:0;color:#d9e8f5;max-width:660px}
    .cta .btn{background:#fff;color:var(--navy);white-space:nowrap}
    footer{background:#071d33;color:#aebed0;padding:48px 0 28px}
    .footer-grid{display:grid;grid-template-columns:1.2fr .8fr .8fr;gap:38px;margin-bottom:34px}
    footer h3,footer h4{color:#fff;margin-top:0}
    footer a{display:block;text-decoration:none;margin:9px 0;color:#c6d4e2}
    .legal{border-top:1px solid rgba(255,255,255,.12);padding-top:22px;font-size:.86rem;color:#8fa3b8}
    @media(max-width:900px){
      .hero-grid,.split{grid-template-columns:1fr}
      .cards{grid-template-columns:1fr 1fr}
      .navlinks a:not(.btn){display:none}
      .hero{padding-top:54px}
      .cta{display:block;padding:36px}.cta .btn{margin-top:24px}
      .footer-grid{grid-template-columns:1fr 1fr}
    }
    @media(max-width:620px){
      .wrap{width:min(100% - 26px,1180px)}
      .topbar .wrap{display:block;text-align:center}
      .topbar span:last-child{display:none}
      .nav{padding:13px 0}.brand{font-size:1.08rem}.brand-mark{width:37px;height:37px}
      .navlinks .btn{padding:11px 14px;font-size:.88rem}
      .hero{padding:44px 0}
      h1{font-size:2.65rem}
      .lead{font-size:1.08rem}
      .actions .btn{width:100%}
      section{padding:58px 0}
      .cards,.footer-grid{grid-template-columns:1fr}
      .hero-card,.card{padding:23px}
      .cta{border-radius:18px;padding:30px 23px}
    }
  </style>
  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"Organization","name":"NewYorkHUT.com","url":"https://newyorkhut.com/","description":"New York Highway Use Tax registration and permit assistance for motor carriers.","sameAs":["https://nyhut.com/"]}
  </script>
</head>
<body>
  <div class="topbar"><div class="wrap"><span><strong>New York HUT assistance for motor carriers</strong></span><span>Ordering and account services powered by NYHUT.com</span></div></div>
  <header>
    <div class="wrap nav">
      <a class="brand" href="/"><span class="brand-mark">NY</span><span>NewYorkHUT.com</span></a>
      <nav class="navlinks" aria-label="Primary navigation">
        <a href="#services">Services</a>
        <a href="#process">How It Works</a>
        <a href="#faq">FAQ</a>
        <a class="btn btn-primary" href="https://nyhut.com/">Start an Order</a>
      </nav>
    </div>
  </header>

  <main>
    <section class="hero">
      <div class="wrap hero-grid">
        <div>
          <div class="eyebrow">New York trucking compliance</div>
          <h1>Get your New York HUT registration handled correctly.</h1>
          <p class="lead">Clear guidance and streamlined assistance for New York Highway Use Tax registration, HUT certificates, vehicle additions, temporary permits, and renewals.</p>
          <div class="actions">
            <a class="btn btn-primary" href="https://nyhut.com/">Start Your HUT Order</a>
            <a class="btn btn-light" href="#process">See How It Works</a>
          </div>
          <div class="trustline"><span>Carrier-focused service</span><span>Secure online ordering</span><span>Real human support</span></div>
        </div>
        <aside class="hero-card" aria-label="Permit assistance summary">
          <h2>What we help with</h2>
          <p>One place to begin your New York HUT compliance process.</p>
          <ul class="checklist">
            <li><span class="icon">✓</span><span><strong>New HUT registrations</strong><br>Get started with the correct business and vehicle information.</span></li>
            <li><span class="icon">✓</span><span><strong>Additional vehicles</strong><br>Add trucks to an existing HUT account.</span></li>
            <li><span class="icon">✓</span><span><strong>Temporary permit needs</strong><br>Support for time-sensitive New York operations.</span></li>
            <li><span class="icon">✓</span><span><strong>Renewals and updates</strong><br>Keep registration details current as your fleet changes.</span></li>
          </ul>
        </aside>
      </div>
    </section>

    <section id="services">
      <div class="wrap">
        <div class="section-head">
          <div class="eyebrow">Services</div>
          <h2>Practical help for the most common New York HUT needs.</h2>
          <p>NewYorkHUT.com is the educational and service gateway. Secure order processing, customer accounts, and document delivery are handled through NYHUT.com.</p>
        </div>
        <div class="cards">
          <article class="card"><div class="num">01</div><h3>New Registration</h3><p>For carriers that need to establish a New York Highway Use Tax account and obtain credentials for qualifying vehicles.</p></article>
          <article class="card"><div class="num">02</div><h3>Vehicle Additions</h3><p>Add newly acquired or previously unlisted vehicles to an existing New York HUT registration.</p></article>
          <article class="card"><div class="num">03</div><h3>Temporary Authority</h3><p>Begin the process for short-term permit needs when a vehicle must operate before permanent credentials are available.</p></article>
          <article class="card"><div class="num">04</div><h3>Account Updates</h3><p>Update carrier, mailing, ownership, or vehicle information when your business records change.</p></article>
          <article class="card"><div class="num">05</div><h3>Renewal Assistance</h3><p>Prepare for certificate-series changes and keep eligible vehicles properly credentialed.</p></article>
          <article class="card"><div class="num">06</div><h3>Compliance Guidance</h3><p>Understand what information is needed and avoid common submission delays or mismatched records.</p></article>
        </div>
      </div>
    </section>

    <section class="soft" id="process">
      <div class="wrap split">
        <div>
          <div class="eyebrow">How it works</div>
          <div class="section-head"><h2>A straightforward path from information to credentials.</h2><p>We keep the process focused so you know what is needed, what happens next, and where to access your order.</p></div>
          <a class="btn btn-primary" href="https://nyhut.com/">Begin at NYHUT.com</a>
        </div>
        <ol class="list">
          <li><span class="icon">1</span><div><b>Submit your carrier details</b><span>Provide the legal business name, tax identification information, addresses, and contact details.</span></div></li>
          <li><span class="icon">2</span><div><b>Add vehicle information</b><span>Enter the identifying and registration details for each vehicle requiring credentials.</span></div></li>
          <li><span class="icon">3</span><div><b>Review and process</b><span>Your submission is reviewed for completeness and processed through the appropriate workflow.</span></div></li>
          <li><span class="icon">4</span><div><b>Access completed documents</b><span>Completed order documents and account activity are delivered through the NYHUT.com customer experience.</span></div></li>
        </ol>
      </div>
    </section>

    <section id="faq">
      <div class="wrap split">
        <div class="section-head">
          <div class="eyebrow">Frequently asked questions</div>
          <h2>New York HUT basics, without the confusion.</h2>
          <p>These answers provide general guidance. Requirements can depend on vehicle configuration, operation, and account status.</p>
        </div>
        <div class="faq">
          <details open><summary>What is New York HUT?</summary><p>New York's Highway Use Tax program applies to certain motor carriers operating qualifying vehicles on public highways in New York. Registered carriers receive credentials associated with their account and vehicles.</p></details>
          <details><summary>Do all trucks need a HUT certificate?</summary><p>No. Applicability depends on factors such as vehicle weight, configuration, and how the vehicle is operated. The ordering process gathers the information needed to determine the appropriate service path.</p></details>
          <details><summary>Can I add a truck to an existing account?</summary><p>Yes. Existing registrants commonly add vehicles as fleets grow or equipment changes. You will need the existing account information and the new vehicle details.</p></details>
          <details><summary>Where do I place an order?</summary><p>Orders, payments, customer accounts, and completed documents are handled through NYHUT.com. NewYorkHUT.com serves as the focused information and acquisition site.</p></details>
          <details><summary>Is this a New York State government website?</summary><p>No. NewYorkHUT.com is a private permit and compliance assistance service and is not a New York State government agency.</p></details>
        </div>
      </div>
    </section>

    <section style="padding-top:20px">
      <div class="wrap">
        <div class="cta">
          <div><h2>Ready to start your New York HUT order?</h2><p>Continue to the secure NYHUT.com ordering platform to submit your carrier and vehicle information.</p></div>
          <a class="btn" href="https://nyhut.com/">Continue to NYHUT.com →</a>
        </div>
      </div>
    </section>
  </main>

  <footer>
    <div class="wrap">
      <div class="footer-grid">
        <div><h3>NewYorkHUT.com</h3><p>Clear, carrier-focused information and assistance for New York Highway Use Tax registration and permit needs.</p></div>
        <div><h4>Resources</h4><a href="#services">HUT Services</a><a href="#process">How It Works</a><a href="#faq">Frequently Asked Questions</a></div>
        <div><h4>Customer Access</h4><a href="https://nyhut.com/">Start an Order</a><a href="https://nyhut.com/my-nyhut">My NYHUT Account</a></div>
      </div>
      <div class="legal">© ${new Date().getFullYear()} NewYorkHUT.com. All rights reserved. NewYorkHUT.com is a private service and is not affiliated with or endorsed by the New York State Department of Taxation and Finance.</div>
    </div>
  </footer>
</body>
</html>`;

export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === "/robots.txt") {
      return new Response("User-agent: *\nAllow: /\nSitemap: https://newyorkhut.com/sitemap.xml\n", { headers: { "content-type": "text/plain; charset=UTF-8" } });
    }
    if (url.pathname === "/sitemap.xml") {
      return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://newyorkhut.com/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url></urlset>`, { headers: { "content-type": "application/xml; charset=UTF-8" } });
    }
    return new Response(html, {
      headers: {
        "content-type": "text/html; charset=UTF-8",
        "cache-control": "public, max-age=300",
        "x-content-type-options": "nosniff",
        "referrer-policy": "strict-origin-when-cross-origin"
      }
    });
  }
};