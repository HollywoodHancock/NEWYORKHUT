import site from './index-v59.js';

const DEPLOYMENT_MARKER = 'v59-vehicle-lifecycle-center-2026-08-02-01';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v59',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v59.js',
        navigation: 'stable-global-navigation',
        toolCenter: 'complete-v56-plus-contextual-guidance-v57',
        feature: 'vehicle-lifecycle-center-and-guides-v59',
        hub: '/vehicle-lifecycle',
        guides: [
          '/learn/buying-a-new-york-hut-permitted-truck',
          '/learn/selling-or-transferring-a-new-york-hut-permitted-truck',
          '/learn/replacing-a-new-york-hut-truck',
          '/learn/adding-a-vehicle-to-your-new-york-hut-account',
          '/learn/removing-a-vehicle-from-your-new-york-hut-account',
          '/learn/changing-your-registered-gross-vehicle-weight',
          '/learn/lost-new-york-hut-certificate',
          '/learn/lost-new-york-hut-decal'
        ]
      }, null, 2), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'x-newyorkhut-version': 'v59',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-feature': 'vehicle-lifecycle-center-v59'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};