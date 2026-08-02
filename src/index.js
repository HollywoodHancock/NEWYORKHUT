import site from './index-v75.js';

const DEPLOYMENT_MARKER = 'v75-uploaded-header-banner-2026-08-02-01';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v75',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v75.js',
        navigation: 'stable-global-navigation',
        feature: 'uploaded-header-banner-v75',
        banner: {
          asset: '/newyorkhut-header-banner-v75.webp',
          source: 'uploaded ChatGPT Image Aug 2, 2026, 05_42_01 AM.png',
          delivery: 'worker-embedded-verified-webp',
          dimensions: '1600x533',
          placement: 'below-global-navigation'
        }
      }, null, 2), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'x-newyorkhut-version': 'v75',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-feature': 'uploaded-header-banner-v75'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};
