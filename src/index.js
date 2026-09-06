import site from './index-v107.js';

const DEPLOYMENT_MARKER = 'v107-expanded-intent-funnel-2026-09-06';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v107',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v107.js',
        feature: 'expanded-intent-specific-funnel-v107',
        seo: {
          role: 'informational authority and education',
          transactionDomain: 'https://nyhut.com/ny-hut-permit',
          referralTracking: true,
          authorityClusterLinks: true,
          hubToArticleCrawlPaths: true,
          articleToHubTopicLinks: true,
          intentSpecificConversionHandoffs: true,
          intentSpecificCommercialDestinations: true,
          closureCancellationSalesHandoffsSuppressed: true,
          directOrderDestination: true,
          canonicalHostEnforced: true,
          primaryPermitGuideConsolidated: true
        },
        sitemap: {
          route: '/sitemap.xml',
          urlCount: 64,
          contentType: 'application/xml; charset=UTF-8',
          xRobotsTagRemoved: true
        }
      }, null, 2), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'x-newyorkhut-version': 'v107',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-feature': 'expanded-intent-specific-funnel-v107'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};
