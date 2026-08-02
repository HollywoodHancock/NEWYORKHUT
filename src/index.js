import site from './index-v69.js';

const DEPLOYMENT_MARKER = 'v69-global-header-banner-2026-08-02-01';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v69',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v69.js',
        navigation: 'stable-global-navigation',
        feature: 'global-header-banner-v69',
        banner: {
          asset: '/newyorkhut-header-banner.svg',
          source: 'public/newyorkhut-header-banner.svg',
          dimensions: '1600x300',
          placement: 'below-global-navigation'
        }
      }, null, 2), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'x-newyorkhut-version': 'v69',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-feature': 'global-header-banner-v69'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};
