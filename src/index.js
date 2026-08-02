import site from './index-v80.js';

const DEPLOYMENT_MARKER = 'v80-explicit-static-asset-banner-2026-08-02-01';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v80',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v80.js',
        navigation: 'stable-global-navigation',
        feature: 'explicit-static-asset-banner-v80',
        banner: {
          source: 'public/newyorkhut-header-banner.png',
          delivery: 'explicit-ASSETS-binding',
          url: '/newyorkhut-header-banner.png?v=20260802-02',
          contentType: 'image/png',
          placement: 'below-global-navigation',
          failureBehavior: 'image remains visible for diagnosis; container is not auto-removed'
        }
      }, null, 2), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'x-newyorkhut-version': 'v80',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-feature': 'explicit-static-asset-banner-v80'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};
