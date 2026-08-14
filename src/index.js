import site from './index-v97.js';

const DEPLOYMENT_MARKER = 'v97-direct-nyhut-order-destination-2026-08-14';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v97',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v97.js',
        feature: 'direct-nyhut-order-destination-v97',
        seo: {
          role: 'informational authority and education',
          transactionDomain: 'https://www.nyhut.com/order',
          referralTracking: true,
          authorityClusterLinks: true,
          intentSpecificConversionHandoffs: true,
          directOrderDestination: true,
          utmSource: 'newyorkhut.com',
          utmMedium: 'referral',
          utmCampaign: 'authority_site',
          humanSiteMapNoindex: true
        },
        sitemap: {
          route: '/sitemap.xml',
          urlCount: 76,
          contentType: 'application/xml; charset=UTF-8',
          xRobotsTagRemoved: true
        }
      }, null, 2), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'x-newyorkhut-version': 'v97',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-feature': 'direct-nyhut-order-destination-v97'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};
