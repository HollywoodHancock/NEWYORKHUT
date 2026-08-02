import site from './index-v71.js';

const DEPLOYMENT_MARKER = 'v71-clean-svg-header-banner-2026-08-02-01';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v71',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v71.js',
        navigation: 'stable-global-navigation',
        feature: 'clean-svg-header-banner-v71',
        banner: {
          asset: '/newyorkhut-header-banner-v71.svg',
          source: 'public/newyorkhut-header-banner.svg',
          delivery: 'clean-worker-byte-response',
          dimensions: '1600x300',
          placement: 'below-global-navigation'
        }
      }, null, 2), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'x-newyorkhut-version': 'v71',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-feature': 'clean-svg-header-banner-v71'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};
