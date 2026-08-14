import site from './index-v96.js';

const DEPLOYMENT_MARKER = 'v96-intent-specific-nyhut-conversion-handoff-2026-08-14';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v96',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v96.js',
        feature: 'intent-specific-nyhut-conversion-handoff-v96',
        seo: {
          role: 'informational authority and education',
          transactionDomain: 'https://www.nyhut.com/',
          referralTracking: true,
          authorityClusterLinks: true,
          intentSpecificConversionHandoffs: true,
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
          'x-newyorkhut-version': 'v96',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-feature': 'intent-specific-nyhut-conversion-handoff-v96'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};
