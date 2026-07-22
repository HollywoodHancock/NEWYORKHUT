import site from './index-v51.js';

const DEPLOYMENT_MARKER = 'v51-universal-public-navigation-2026-07-21-01';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v51',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v51.js'
      }, null, 2), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'x-newyorkhut-version': 'v51',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};
