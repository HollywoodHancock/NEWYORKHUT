import site from './index-v70.js';

const DEPLOYMENT_MARKER = 'v70-worker-served-header-banner-2026-08-02-01';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v70',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v70.js',
        navigation: 'stable-global-navigation',
        feature: 'worker-served-header-banner-v70',
        banner: {
          asset: '/newyorkhut-header-banner.svg',
          source: 'public/newyorkhut-header-banner.svg',
          delivery: 'worker-proxied-repository-asset',
          dimensions: '1600x300',
          placement: 'below-global-navigation'
        }
      }, null, 2), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'x-newyorkhut-version': 'v70',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-feature': 'worker-served-header-banner-v70'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};
