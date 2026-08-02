import site from './index-v74.js';

const DEPLOYMENT_MARKER = 'v74-remove-broken-header-banner-2026-08-02-01';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v74',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v74.js',
        navigation: 'stable-global-navigation',
        feature: 'remove-broken-header-banner-v74',
        banner: {
          status: 'removed-pending-verified-binary-asset',
          reason: 'malformed-image-payload-proven-by-direct-url-test'
        }
      }, null, 2), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'x-newyorkhut-version': 'v74',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-feature': 'remove-broken-header-banner-v74'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};
