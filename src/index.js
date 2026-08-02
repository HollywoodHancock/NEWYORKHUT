import site from './index-v57.js';

const DEPLOYMENT_MARKER = 'v57-exempt-vehicle-guide-and-wizard-next-steps-2026-08-02-01';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v57',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v57.js',
        navigation: 'stable-global-navigation',
        toolCenter: 'complete-v56-plus-contextual-guidance-v57',
        feature: 'exempt-vehicle-guide-and-permit-wizard-next-steps',
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
          'x-newyorkhut-version': 'v57',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-tool-center': 'contextual-guidance-v57'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};