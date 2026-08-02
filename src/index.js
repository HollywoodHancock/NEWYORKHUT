import site from './index-v79.js';

const DEPLOYMENT_MARKER = 'v79-static-png-header-banner-2026-08-02-01';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v79',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v79.js',
        navigation: 'stable-global-navigation',
        feature: 'static-png-header-banner-v79',
        layout: {
          bannerMaxHeight: '220px desktop / 118px mobile',
          heroPadding: '38px desktop / 26px mobile',
          sectionPadding: '38px 0 48px desktop',
          cardPadding: '18px desktop / 16px mobile',
          headingScale: 'reduced globally',
          gridSpacing: 'reduced globally'
        },
        banner: {
          source: 'public/newyorkhut-header-banner.png',
          delivery: 'cloudflare-worker-static-assets',
          url: '/newyorkhut-header-banner.png?v=20260802-01',
          contentType: 'image/png',
          placement: 'below-global-navigation'
        }
      }, null, 2), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'x-newyorkhut-version': 'v79',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-feature': 'static-png-header-banner-v79'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};
