import site from './index-v111.js';

const DEPLOYMENT_MARKER = 'v111-phase1-topic-cluster-reinforcement-2026-09-07';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v111',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v111.js',
        feature: 'phase1-topic-cluster-reinforcement-v111',
        seo: {
          role: 'informational authority and education',
          transactionDomain: 'https://nyhut.com/ny-hut-permit',
          parentEducationalFramework: 'Compliance University',
          referralTracking: true,
          intentSpecificConversionHandoffs: true,
          temporaryPermitCutoffEastern: '13:30',
          temporaryPermitSameDayGuaranteed: false,
          primaryPermitGuide: '/new-york-hut-guide',
          supportingIntentMetadataDifferentiated: true,
          tmt1CanonicalRoute: '/form-tmt-1-ny-hut/',
          tmt1LegacyRedirect: '/form-tmt-1 -> /form-tmt-1-ny-hut/',
          selfReferentialCanonicalsStrengthened: true,
          organizationSchemaStrengthened: true,
          complianceUniversityRelationshipDisclosed: true,
          educationCommercialSeparationDisclosed: true,
          contextualTopicClustersReinforced: true,
          closureCancellationSalesHandoffsSuppressed: true,
          canonicalHostEnforced: true
        },
        sitemap: {
          route: '/sitemap.xml',
          expectedUrlCount: 64,
          contentType: 'application/xml; charset=UTF-8'
        }
      }, null, 2), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'x-newyorkhut-version': 'v111',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-feature': 'phase1-topic-cluster-reinforcement-v111'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};
