import site from './index-v72.js';

const DEPLOYMENT_MARKER = 'v72-exact-webp-header-banner-2026-08-02-01';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v72',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v72.js',
        navigation: 'stable-global-navigation',
        feature: 'exact-webp-header-banner-v72',
        banner: {
          asset: '/newyorkhut-header-banner-v72.webp',
          source: 'src/banner-v71-part-1.js',
          delivery: 'worker-embedded-webp-bytes',
          dimensions: '1600x300',
          placement: 'below-global-navigation'
        }
      }, null, 2), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'x-newyorkhut-version': 'v72',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-feature': 'exact-webp-header-banner-v72'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};
