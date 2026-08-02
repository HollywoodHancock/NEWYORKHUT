import site from './index-v90.js';

const DEPLOYMENT_MARKER = 'v90-deterministic-sitemap-seo-audit-2026-08-02-01';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v90',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v90.js',
        feature: 'deterministic-sitemap-seo-audit-v90',
        navigation: 'pre-v87 stable navigation preserved',
        audit: {
          endpoint: '/__seo_audit',
          source: 'current sitemap URLs rendered through active Worker chain',
          checks: ['status','content-type','title','title-length','description','canonical','H1-count','viewport','duplicate-titles','duplicate-canonicals']
        },
        sitemap: {
          route: '/sitemap.xml',
          normalization: 'same-origin URLs only; remove query strings, trailing-slash duplicates, and exact duplicates',
          pageContentChanged: false
        }
      }, null, 2), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'x-newyorkhut-version': 'v90',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-feature': 'deterministic-sitemap-seo-audit-v90'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};
