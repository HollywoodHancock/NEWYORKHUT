import site from './index-v99.js';

const DEPLOYMENT_MARKER = 'v99-trim-form-detail-pages-from-index-2026-08-14';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v99',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v99.js',
        feature: 'trim-form-detail-pages-from-index-v99',
        seo: {
          role: 'informational authority and education',
          transactionDomain: 'https://www.nyhut.com/order',
          referralTracking: true,
          authorityClusterLinks: true,
          intentSpecificConversionHandoffs: true,
          directOrderDestination: true,
          aboutRouteFixed: true,
          legacyLeadsEndpointStatus: 410,
          formDetailPagesNoindex: 11,
          formsLibraryIndexable: true,
          utmSource: 'newyorkhut.com',
          utmMedium: 'referral',
          utmCampaign: 'authority_site',
          humanSiteMapNoindex: true
        },
        sitemap: {
          route: '/sitemap.xml',
          urlCount: 65,
          contentType: 'application/xml; charset=UTF-8',
          xRobotsTagRemoved: true
        }
      }, null, 2), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'x-newyorkhut-version': 'v99',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-feature': 'trim-form-detail-pages-from-index-v99'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};
