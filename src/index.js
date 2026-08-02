import site from './index-v77.js';

const DEPLOYMENT_MARKER = 'v77-compact-global-layouts-2026-08-02-02-redeploy-trigger';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v77',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v77.js',
        navigation: 'stable-global-navigation',
        feature: 'compact-global-layouts-v77',
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
          delivery: 'inline-data-uri',
          sourceDimensions: '1600x533',
          placement: 'below-global-navigation'
        }
      }, null, 2), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'x-newyorkhut-version': 'v77',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-feature': 'compact-global-layouts-v77'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};
