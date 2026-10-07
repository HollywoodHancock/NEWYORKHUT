import site from './index-v118.js';

const DEPLOYMENT_MARKER = 'v118-late-charge-tools-verified-2026-10-07';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v118',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v118.js',
        feature: 'core-guides-and-reviewed-consolidation',
        lateChargeTools: {rules: 'NYHUT MT-903 parity', ratesVerified: '2026-10-07', interestRateCoverage: '2026-01-01 through 2026-12-31'},
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
          canonicalHostEnforced: true,
          coreGuidesSourceCheck: '2026-10-06',
          improvedCorePages: 6,
          reviewedContentMerges: 28
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
          'x-newyorkhut-version': 'v118',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-feature': 'restore-missing-footer-v118'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};
