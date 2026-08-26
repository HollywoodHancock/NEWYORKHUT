import site from './index-v104.js';

const DEPLOYMENT_MARKER = 'v104-universal-navigation-normalization-2026-08-26';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v104',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v104.js',
        feature: 'universal-navigation-normalization-v104',
        seo: {
          role: 'informational authority and education',
          transactionDomain: 'https://nyhut.com/ny-hut-permit',
          referralTracking: true,
          authorityClusterLinks: true,
          hubToArticleCrawlPaths: true,
          articleToHubTopicLinks: true,
          intentSpecificConversionHandoffs: true,
          directOrderDestination: true,
          aboutRouteFixed: true,
          legacyLeadsEndpointStatus: 410,
          formDetailPagesNoindex: 11,
          formsLibraryIndexable: true,
          recordkeepingCanonical: '/learn/hut-recordkeeping-requirements',
          recordkeepingRedirect: '/learn/hut-records-you-must-keep',
          utmSource: 'newyorkhut.com',
          utmMedium: 'referral',
          utmCampaign: 'authority_site',
          humanSiteMapNoindex: true,
          canonicalHostEnforced: true,
          legacyFiveXxRoutesFixed: true,
          addingVehicleDuplicateRedirected: true,
          searchAndDownloadsNoindex: true,
          universalNavigationNormalized: true
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
          'x-newyorkhut-version': 'v104',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-feature': 'universal-navigation-normalization-v104'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};
