const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>NewYorkHUT.com</title>
  <meta name="description" content="New York Highway Use Tax permit and trucking compliance services." />
  <style>
    :root { font-family: Arial, Helvetica, sans-serif; color: #152238; background: #f4f7fb; }
    * { box-sizing: border-box; }
    body { margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 24px; }
    main { width: min(760px, 100%); background: #fff; border: 1px solid #dbe3ee; border-radius: 18px; padding: 48px; box-shadow: 0 18px 45px rgba(21,34,56,.10); }
    h1 { margin: 0 0 14px; font-size: clamp(2rem, 6vw, 4rem); letter-spacing: -.04em; }
    p { margin: 0 0 24px; font-size: 1.12rem; line-height: 1.65; color: #4d5b70; }
    a { display: inline-block; padding: 14px 22px; border-radius: 10px; background: #165dba; color: #fff; text-decoration: none; font-weight: 700; }
    small { display: block; margin-top: 28px; color: #738096; }
  </style>
</head>
<body>
  <main>
    <h1>NewYorkHUT.com</h1>
    <p>This site is being restored on its new Cloudflare infrastructure. New York HUT permit ordering and account services remain available through NYHUT.com.</p>
    <a href="https://nyhut.com">Continue to NYHUT.com</a>
    <small>NewYorkHUT.com</small>
  </main>
</body>
</html>`;

export default {
  async fetch() {
    return new Response(html, {
      headers: {
        "content-type": "text/html; charset=UTF-8",
        "cache-control": "public, max-age=300"
      }
    });
  }
};
