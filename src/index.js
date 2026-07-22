import site from './index-v54.js';

const DEPLOYMENT_MARKER = 'v54-mt903-gvw-tax-estimator-2026-07-22-02';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v54',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v54.js',
        navigation: 'legacy-css-override-visible-buttons-v53',
        tool: 'mt903-gvw-tax-estimator-v54'
      }, null, 2), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'x-newyorkhut-version': 'v54',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-navigation': 'legacy-css-override-visible-buttons-v53',
          'x-newyorkhut-tool': 'mt903-gvw-tax-estimator-v54'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};
