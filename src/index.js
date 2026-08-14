import site from './index-v102.js';

const DEPLOYMENT_MARKER = 'v102-article-to-hub-topic-links-2026-08-14';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v102',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v102.js',
        feature: 'article-to-hub-topic-links-v102',
        seo: {
          role: 'informational authority and education',
          transactionDomain: 'https://www.nyhut.com/order',
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
          'x-newyorkhut-version': 'v102',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-feature': 'article-to-hub-topic-links-v102'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};
