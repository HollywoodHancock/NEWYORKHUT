import site from './index-v55.js';

const DEPLOYMENT_MARKER = 'v55-mt903-quarterly-planning-2026-07-22-01';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v55',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v55.js',
        navigation: 'legacy-css-override-visible-buttons-v53',
        tool: 'mt903-quarterly-planning-v55',
        retiredTool: 'trip-cost-estimator-redirected'
      }, null, 2), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'x-newyorkhut-version': 'v55',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-navigation': 'legacy-css-override-visible-buttons-v53',
          'x-newyorkhut-tool': 'mt903-quarterly-planning-v55'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};