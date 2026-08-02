import site from './index-v73.js';

const DEPLOYMENT_MARKER = 'v73-worker-first-banner-delivery-2026-08-02-01';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v73',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v73.js',
        navigation: 'stable-global-navigation',
        feature: 'worker-first-banner-delivery-v73',
        banner: {
          asset: '/newyorkhut-header-banner-v72.webp',
          source: 'src/banner-v71-part-1.js',
          delivery: 'worker-embedded-webp-without-static-asset-interception',
          dimensions: '1600x300',
          placement: 'below-global-navigation'
        }
      }, null, 2), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'x-newyorkhut-version': 'v73',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-feature': 'worker-first-banner-delivery-v73'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};
