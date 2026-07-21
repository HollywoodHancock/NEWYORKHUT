import site from './index-v47.js';

const VERSION='v48';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/api/version' || path === '/__version') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: VERSION,
        deployedAt: '2026-07-21',
        features: [
          'visible-desktop-navigation',
          'wrapped-tablet-navigation',
          'phone-only-mobile-menu',
          'contact',
          'my-nyhut',
          'complete-footer'
        ],
        knowledgeBaseEntries: 25
      }, null, 2), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store',
          'x-newyorkhut-version': VERSION
        }
      });
    }

    const response = await site.fetch(request, env, ctx);
    const headers = new Headers(response.headers);
    headers.set('x-newyorkhut-version', VERSION);
    const type = headers.get('content-type') || '';

    if (!type.includes('text/html')) {
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers
      });
    }

    let html = await response.text();

    // Keep the full navigation visible through normal desktop and tablet widths.
    html = html.replaceAll('@media(max-width:1080px)', '@media(max-width:720px)');
    html = html.replaceAll('innerWidth<=1080', 'innerWidth<=720');

    // Allow desktop/tablet links to wrap instead of disappearing.
    html = html.replace(
      '.nyh47-wrap{width:min(1240px,calc(100% - 32px));min-height:76px;margin:auto;display:flex;align-items:center;gap:18px}',
      '.nyh47-wrap{width:min(1320px,calc(100% - 24px));min-height:76px;margin:auto;display:flex;align-items:center;gap:12px;flex-wrap:wrap;padding:8px 0}'
    );
    html = html.replace(
      '.nyh47-menu{display:flex!important;align-items:center;gap:4px;margin-left:auto;',
      '.nyh47-menu{display:flex!important;align-items:center;gap:2px;margin-left:auto;flex-wrap:wrap;justify-content:flex-end;'
    );
    html = html.replace(
      'padding:11px 9px;',
      'padding:10px 7px;font-size:.92rem;'
    );

    headers.set('cache-control', 'no-store, no-cache, must-revalidate, max-age=0');
    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
