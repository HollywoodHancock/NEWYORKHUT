import site from './index-v53.js';

const DEPLOYMENT_MARKER = 'v53-legacy-css-navigation-visibility-fix-2026-07-22-03';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v53',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v53.js',
        navigation: 'legacy-css-override-visible-buttons-v53'
      }, null, 2), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'x-newyorkhut-version': 'v53',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-navigation': 'legacy-css-override-visible-buttons-v53'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};