import site from './index-v86.js';

const DEPLOYMENT_MARKER = 'v86-homepage-hero-top-alignment-2026-08-02-01';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v86',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v86.js',
        navigation: 'stable-global-navigation',
        feature: 'homepage-hero-top-alignment-v86',
        banner: {
          source: 'public/newyorkhut-header-banner.png',
          delivery: 'same-origin-worker-proxy',
          url: '/newyorkhut-header-banner.png?v=20260802-05',
          placement: 'below-global-navigation',
          desktopHeight: 'clamp(285px, 18vw, 340px)',
          tabletHeight: 'clamp(210px, 27vw, 270px)',
          mobileHeight: '170px'
        },
        homepageHero: {
          verticalAlignment: 'start',
          desktopTopPadding: '16px',
          tabletTopPadding: '14px',
          mobileTopPadding: '12px'
        }
      }, null, 2), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'x-newyorkhut-version': 'v86',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-feature': 'homepage-hero-top-alignment-v86'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};
