import site from './index-v52.js';

const DEPLOYMENT_MARKER = 'v52-homepage-navigation-injection-fix-2026-07-21-03';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v52',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v52.js'
      }, null, 2), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'x-newyorkhut-version': 'v52',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};