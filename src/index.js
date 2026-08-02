import site from './index-v76.js';

const DEPLOYMENT_MARKER = 'v76-compact-inline-header-banner-2026-08-02-01';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v76',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v76.js',
        navigation: 'stable-global-navigation',
        feature: 'compact-inline-header-banner-v76',
        banner: {
          source: 'uploaded ChatGPT Image Aug 2, 2026, 05_42_01 AM.png',
          delivery: 'inline-data-uri',
          sourceDimensions: '1600x533',
          displayedHeight: 'clamp(180px, 18.75vw, 300px)',
          placement: 'below-global-navigation',
          fallback: 'remove-banner-on-image-error'
        }
      }, null, 2), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'x-newyorkhut-version': 'v76',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-feature': 'compact-inline-header-banner-v76'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};
