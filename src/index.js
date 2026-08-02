import site from './index-v78.js';

const DEPLOYMENT_MARKER = 'v78-url-served-header-banner-2026-08-02-01';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v78',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v78.js',
        navigation: 'stable-global-navigation',
        feature: 'url-served-header-banner-v78',
        layout: {
          bannerMaxHeight: '220px desktop / 118px mobile',
          heroPadding: '38px desktop / 26px mobile',
          sectionPadding: '38px 0 48px desktop',
          cardPadding: '18px desktop / 16px mobile',
          headingScale: 'reduced globally',
          gridSpacing: 'reduced globally'
        },
        banner: {
          source: 'uploaded ChatGPT Image Aug 2, 2026, 05_42_01 AM.png',
          delivery: 'dedicated-worker-image-url',
          url: '/newyorkhut-header-banner-v78.webp?v=20260802-01',
          contentType: 'image/webp',
          sourceDimensions: '1600x533',
          placement: 'below-global-navigation'
        }
      }, null, 2), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'x-newyorkhut-version': 'v78',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-feature': 'url-served-header-banner-v78'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};
