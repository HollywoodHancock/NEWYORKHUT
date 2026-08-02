import site from './index-v58.js';

const DEPLOYMENT_MARKER = 'v58-vehicle-sale-transfer-guide-and-ask-hut-ai-2026-08-02-01';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v58',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v58.js',
        navigation: 'stable-global-navigation',
        toolCenter: 'complete-v56-plus-contextual-guidance-v57',
        feature: 'vehicle-sale-transfer-guide-and-ask-hut-ai-knowledge-v58',
        guide: '/learn/selling-or-transferring-a-new-york-hut-permitted-truck',
        tools: [
          'hut-tax-estimator',
          'hut-rate-lookup',
          'hut-permit-requirement',
          'mt903-due-date',
          'hut-penalty-estimator'
        ]
      }, null, 2), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'x-newyorkhut-version': 'v58',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-feature': 'vehicle-sale-transfer-guide-and-ask-hut-ai-v58'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};