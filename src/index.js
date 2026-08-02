import site from './index-v91.js';

const DEPLOYMENT_MARKER = 'v91-repair-sitemap-failures-2026-08-02-01';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v91',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v91.js',
        feature: 'repair-sitemap-failures-v91',
        repairs: {
          recursiveVehicleLifecycleRoutesReplaced: 7,
          overlongDescriptionCorrected: true,
          homepageCanonicalAuditCorrected: true,
          sitemapUrlCountPreserved: 77,
          auditEndpoint: '/__seo_audit'
        }
      }, null, 2), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'x-newyorkhut-version': 'v91',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-feature': 'repair-sitemap-failures-v91'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};
