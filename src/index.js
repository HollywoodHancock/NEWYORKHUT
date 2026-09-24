import site from './index-v116.js';

const DEPLOYMENT_MARKER = 'v116-ny-hut-axle-count-guidance-2026-09-24';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v116',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v116.js',
        feature: 'ny-hut-axle-count-guidance-v116',
        seo: {
          role: 'informational authority and education',
          transactionDomain: 'https://nyhut.com/ny-hut-permit',
          parentEducationalFramework: 'Compliance University',
          referralTracking: true,
          intentSpecificConversionHandoffs: true,
          axleCountGuide: '/ny-hut-axle-count',
          axleGuidance: 'Axles = power unit only; Combined Axles = power unit plus trailer',
          hutEligibilityDistinguishedFromIftaAxleRules: true,
          contextualAxleLinksAdded: true,
          temporaryPermitCutoffEastern: '13:30',
          temporaryPermitSameDayGuaranteed: false,
          primaryPermitGuide: '/new-york-hut-guide',
          supportingIntentMetadataDifferentiated: true,
          selfReferentialCanonicalsStrengthened: true,
          complianceUniversityRelationshipDisclosed: true,
          educationCommercialSeparationDisclosed: true,
          contextualTopicClustersReinforced: true,
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
          'x-newyorkhut-version': 'v116',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-feature': 'ny-hut-axle-count-guidance-v116'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};
