import site from './index-v82.js';

const DEPLOYMENT_MARKER = 'v82-forced-banner-src-replacement-2026-08-02-01';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v82',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v82.js',
        navigation: 'stable-global-navigation',
        feature: 'forced-banner-src-replacement-v82',
        banner: {
          source: 'public/newyorkhut-header-banner.png',
          delivery: 'forced-direct-public-github-png',
          url: 'https://raw.githubusercontent.com/HollywoodHancock/NEWYORKHUT/main/public/newyorkhut-header-banner.png?v=20260802-04',
          contentType: 'image/png',
          placement: 'below-global-navigation',
          replacementStrategy: 'replace-current-src-on-nyh-v76-banner-img'
        }
      }, null, 2), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'x-newyorkhut-version': 'v82',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-feature': 'forced-banner-src-replacement-v82'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};
