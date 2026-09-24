import site from './index-v117.js';

const DEPLOYMENT_MARKER = 'v117-hut-power-unit-axle-guidance-2026-09-24';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v117',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v117.js',
        feature: 'hut-power-unit-axle-guidance-v117',
        seo: {
          role: 'informational authority and education',
          transactionDomain: 'https://nyhut.com/ny-hut-permit',
          parentEducationalFramework: 'Compliance University',
          axleCountGuide: '/ny-hut-axle-count',
          hutAxleGuidance: 'NY HUT axle count = truck/tractor power unit only; do not include trailer axles',
          combinedAxlesClarifiedAsSeparateRegistrationConcept: true,
          contextualAxleLinksCorrected: true,
          temporaryPermitCutoffEastern: '13:30',
          primaryPermitGuide: '/new-york-hut-guide',
          canonicalHostEnforced: true
        },
        sitemap: {
          route: '/sitemap.xml',
          countHeader: 'x-sitemap-url-count',
          contentType: 'application/xml; charset=UTF-8',
          dynamicallyReconciled: true,
          axleGuideIncluded: true
        }
      }, null, 2), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'x-newyorkhut-version': 'v117',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-feature': 'hut-power-unit-axle-guidance-v117'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};
