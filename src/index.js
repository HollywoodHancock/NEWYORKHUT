import site from './index-v92.js';

const DEPLOYMENT_MARKER = 'v92-static-google-readable-sitemap-2026-08-02-01';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v92',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v92.js',
        feature: 'static-google-readable-sitemap-v92',
        sitemap: {
          route: '/sitemap.xml',
          delivery: 'direct static XML response',
          urlCount: 77,
          contentType: 'application/xml; charset=UTF-8',
          robotsTxtDeclaration: true,
          dynamicSelfFetchRemoved: true
        },
        auditEndpoint: '/__seo_audit'
      }, null, 2), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'x-newyorkhut-version': 'v92',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-feature': 'static-google-readable-sitemap-v92'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};
