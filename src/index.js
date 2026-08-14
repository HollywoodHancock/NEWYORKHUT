import site from './index-v94.js';

const DEPLOYMENT_MARKER = 'v94-authority-intent-and-nyhut-referral-tracking-2026-08-14-01';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v94',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v94.js',
        feature: 'authority-intent-and-nyhut-referral-tracking-v94',
        seo: {
          role: 'informational authority and education',
          transactionDomain: 'https://www.nyhut.com/',
          referralTracking: true,
          utmSource: 'newyorkhut.com',
          utmMedium: 'referral',
          utmCampaign: 'authority_site'
        },
        sitemap: {
          route: '/sitemap.xml',
          urlCount: 77,
          contentType: 'application/xml; charset=UTF-8',
          xRobotsTagRemoved: true
        }
      }, null, 2), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'x-newyorkhut-version': 'v94',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-feature': 'authority-intent-and-nyhut-referral-tracking-v94'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};
