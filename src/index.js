import site from './index-v95.js';

const DEPLOYMENT_MARKER = 'v95-authority-cluster-internal-links-and-conversion-2026-08-14';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v95',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v95.js',
        feature: 'authority-cluster-internal-links-and-conversion-v95',
        seo: {
          role: 'informational authority and education',
          transactionDomain: 'https://www.nyhut.com/',
          referralTracking: true,
          authorityClusterLinks: true,
          priorityPagesEnhanced: 11,
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
          'x-newyorkhut-version': 'v95',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-feature': 'authority-cluster-internal-links-and-conversion-v95'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};
