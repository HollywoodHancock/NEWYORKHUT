import site from './index-v84.js';

const DEPLOYMENT_MARKER = 'v84-banner-crop-correction-2026-08-02-01';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v84',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v84.js',
        navigation: 'stable-global-navigation',
        feature: 'banner-crop-correction-v84',
        banner: {
          source: 'public/newyorkhut-header-banner.png',
          delivery: 'same-origin-worker-proxy',
          url: '/newyorkhut-header-banner.png?v=20260802-05',
          placement: 'below-global-navigation',
          desktopHeight: 'clamp(250px, 16.5vw, 310px)',
          tabletHeight: 'clamp(180px, 24vw, 240px)',
          mobileHeight: '150px',
          objectPosition: 'center 52%'
        }
      }, null, 2), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'x-newyorkhut-version': 'v84',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-feature': 'banner-crop-correction-v84'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};
