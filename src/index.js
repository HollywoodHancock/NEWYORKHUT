import site from './index-v81.js';

const DEPLOYMENT_MARKER = 'v81-direct-verified-png-banner-2026-08-02-01';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v81',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v81.js',
        navigation: 'stable-global-navigation',
        feature: 'direct-verified-png-banner-v81',
        banner: {
          source: 'public/newyorkhut-header-banner.png',
          delivery: 'direct-public-github-png',
          url: 'https://raw.githubusercontent.com/HollywoodHancock/NEWYORKHUT/main/public/newyorkhut-header-banner.png?v=20260802-03',
          contentType: 'image/png',
          placement: 'below-global-navigation',
          workerAssetBindingRequired: false
        }
      }, null, 2), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'x-newyorkhut-version': 'v81',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-feature': 'direct-verified-png-banner-v81'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};
