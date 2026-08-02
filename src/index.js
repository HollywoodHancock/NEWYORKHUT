import site from './index-v83.js';

const DEPLOYMENT_MARKER = 'v83-same-origin-banner-proxy-2026-08-02-01';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v83',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v83.js',
        navigation: 'stable-global-navigation',
        feature: 'same-origin-banner-proxy-v83',
        banner: {
          source: 'public/newyorkhut-header-banner.png',
          upstream: 'raw.githubusercontent.com',
          delivery: 'same-origin-worker-proxy',
          url: '/newyorkhut-header-banner.png?v=20260802-05',
          contentType: 'image/png',
          placement: 'below-global-navigation',
          browserExternalOriginRequired: false
        }
      }, null, 2), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'x-newyorkhut-version': 'v83',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-feature': 'same-origin-banner-proxy-v83'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};
