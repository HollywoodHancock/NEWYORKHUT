import site from './index-v89.js';

const DEPLOYMENT_MARKER = 'v89-sitewide-layout-seo-normalization-2026-08-02-01';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v89',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v89.js',
        feature: 'sitewide-layout-seo-normalization-v89',
        navigation: 'pre-v87 stable navigation preserved',
        audit: {
          scope: 'all HTML routes',
          horizontalOverflowProtection: true,
          responsiveMediaContainment: true,
          responsiveTableHandling: true,
          routeFamilySpacingNormalization: true,
          existingPageContentPreserved: true,
          existingNavigationPreserved: true
        },
        seo: {
          titlePattern: 'route-specific title derived from page purpose and H1',
          canonicalPattern: 'https://newyorkhut.com + canonical pathname',
          openGraphTitleAndUrlSynchronized: true,
          sitemapContentChanged: false
        }
      }, null, 2), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'x-newyorkhut-version': 'v89',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-feature': 'sitewide-layout-seo-normalization-v89'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};
