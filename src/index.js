import site from './index-v93.js';

const DEPLOYMENT_MARKER = 'v93-remove-sitemap-noindex-header-2026-08-02-01';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v93',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v93.js',
        feature: 'remove-sitemap-noindex-header-v93',
        sitemap: {
          route: '/sitemap.xml',
          urlCount: 77,
          contentType: 'application/xml; charset=UTF-8',
          xRobotsTagRemoved: true,
          cacheControl: 'no-store during verification'
        }
      }, null, 2), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'x-newyorkhut-version': 'v93',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-feature': 'remove-sitemap-noindex-header-v93'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};
