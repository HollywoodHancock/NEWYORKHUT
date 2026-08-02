import site from './index-v87.js';

const DEPLOYMENT_MARKER = 'v87-canonical-global-navigation-2026-08-02-01';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v87',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v87.js',
        feature: 'canonical-global-navigation-v87',
        navigation: {
          strategy: 'replace-first-header-with-canonical-navigation',
          destinations: 'preserved from each page header with canonical fallbacks',
          desktopLayout: 'single-row centered navigation',
          mobileLayout: 'centered brand with horizontally scrollable links',
          uniformAcrossHtmlPages: true
        },
        banner: {
          source: 'public/newyorkhut-header-banner.png',
          delivery: 'same-origin-worker-proxy',
          url: '/newyorkhut-header-banner.png?v=20260802-05',
          placement: 'below-global-navigation',
          desktopHeight: 'clamp(285px, 18vw, 340px)',
          tabletHeight: 'clamp(210px, 27vw, 270px)',
          mobileHeight: '170px'
        }
      }, null, 2), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'x-newyorkhut-version': 'v87',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-feature': 'canonical-global-navigation-v87'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};
