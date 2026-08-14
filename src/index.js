import site from './index-v101.js';

const DEPLOYMENT_MARKER = 'v101-hub-to-article-crawl-paths-2026-08-14';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v101',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v101.js',
        feature: 'hub-to-article-crawl-paths-v101',
        seo: {
          role: 'informational authority and education',
          transactionDomain: 'https://www.nyhut.com/order',
          referralTracking: true,
          authorityClusterLinks: true,
          hubToArticleCrawlPaths: true,
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
          humanSiteMapNoindex: true
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
          'x-newyorkhut-version': 'v101',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-feature': 'hub-to-article-crawl-paths-v101'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};
