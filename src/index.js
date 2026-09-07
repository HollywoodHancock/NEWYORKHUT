import site from './index-v109.js';

const DEPLOYMENT_MARKER = 'v109-phase1-cannibalization-route-normalization-2026-09-07';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v109',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v109.js',
        feature: 'phase1-cannibalization-and-route-normalization-v109',
        seo: {
          role: 'informational authority and education',
          transactionDomain: 'https://nyhut.com/ny-hut-permit',
          referralTracking: true,
          intentSpecificConversionHandoffs: true,
          temporaryPermitCutoffEastern: '13:30',
          temporaryPermitSameDayGuaranteed: false,
          primaryPermitGuide: '/new-york-hut-guide',
          supportingIntentMetadataDifferentiated: true,
          tmt1CanonicalRoute: '/form-tmt-1-ny-hut/',
          tmt1LegacyRedirect: '/form-tmt-1 -> /form-tmt-1-ny-hut/',
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
          'x-newyorkhut-version': 'v109',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-feature': 'phase1-cannibalization-and-route-normalization-v109'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};
