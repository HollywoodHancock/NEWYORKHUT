import site from './index-v117.js';

const VERSION = 'v118';
const FEATURE = 'restore-missing-footer-v118';
const FOOTER_STYLE = `<style id="nyh118-footer-css">
#nyh47-footer.nyh118-footer{display:block!important;background:#061f37;color:#dce8f3;padding:42px 0 20px;font-family:Inter,system-ui,sans-serif}
.nyh118-inner{width:min(1180px,calc(100% - 40px));margin:auto}
.nyh118-grid{display:grid;grid-template-columns:1.5fr repeat(3,1fr);gap:28px}
#nyh47-footer.nyh118-footer h2,#nyh47-footer.nyh118-footer h3{color:#fff;margin:0 0 12px}
#nyh47-footer.nyh118-footer h3{font-size:.85rem;text-transform:uppercase;letter-spacing:.07em}
#nyh47-footer.nyh118-footer a{display:block;color:#dce8f3!important;margin:8px 0;text-decoration:none}
#nyh47-footer.nyh118-footer a:hover{text-decoration:underline}
.nyh118-bottom{border-top:1px solid rgba(255,255,255,.18);margin-top:25px;padding-top:16px;font-size:.85rem}
@media(max-width:700px){.nyh118-grid{grid-template-columns:1fr 1fr}.nyh118-grid>div:first-child{grid-column:1/-1}}
@media(max-width:430px){.nyh118-grid{grid-template-columns:1fr}.nyh118-grid>div:first-child{grid-column:auto}}
</style>`;

const FOOTER = `<footer id="nyh47-footer" class="nyh118-footer"><div class="nyh118-inner"><div class="nyh118-grid">
<div><h2>NewYorkHUT.com</h2><p>Independent New York Highway Use Tax education and carrier tools.</p><a href="https://nyhut.com/ny-hut-permit">Start a HUT permit at NYHUT.com</a></div>
<div><h3>Learn</h3><a href="/new-york-hut-guide">HUT permit guide</a><a href="/learn">Learning center</a><a href="/official-resources">Official resources</a></div>
<div><h3>Tools</h3><a href="/tools">All tools</a><a href="/tools/hut-permit-requirement">Permit requirement tool</a><a href="/ny-hut-axle-count">Axle-count guide</a></div>
<div><h3>Company</h3><a href="/about">About</a><a href="/privacy-policy">Privacy policy</a><a href="/terms">Terms</a></div>
</div><div class="nyh118-bottom">Independent educational resource—not a New York State agency.</div></div></footer>`;

export function restoreMissingFooter(html) {
  if (/<footer\b/i.test(html) || !/<\/body>/i.test(html)) return html;
  const withStyle = html.replace(/<\/head>/i, `${FOOTER_STYLE}</head>`);
  return withStyle.replace(/<\/body>/i, `${FOOTER}</body>`);
}

export default {
  async fetch(request, env, ctx) {
    const response = await site.fetch(request, env, ctx);
    const headers = new Headers(response.headers);
    headers.set('x-newyorkhut-version', VERSION);
    headers.set('x-newyorkhut-feature', FEATURE);
    const type = headers.get('content-type') || '';
    if (response.status === 200 && type.includes('text/html')) {
      return new Response(restoreMissingFooter(await response.text()), {
        status: response.status, statusText: response.statusText, headers
      });
    }
    return new Response(response.body, {status: response.status, statusText: response.statusText, headers});
  }
};
