import site from './index-v65.js';

const DEPLOYMENT_MARKER = 'v65-carrier-compliance-center-2026-08-02-01';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v65',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v65.js',
        navigation: 'stable-global-navigation',
        feature: 'carrier-compliance-center-and-guides-v65',
        hub: '/carrier-compliance-center',
        guides: [
          '/learn/ifta-compliance-for-new-york-carriers',
          '/learn/irp-apportioned-registration',
          '/learn/form-2290-heavy-vehicle-use-tax',
          '/learn/unified-carrier-registration-ucr',
          '/learn/fmcsa-registration-and-usdot-compliance',
          '/learn/commercial-vehicle-registration-checklist',
          '/learn/trucking-compliance-calendar'
        ]
      }, null, 2), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'x-newyorkhut-version': 'v65',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-feature': 'carrier-compliance-center-v65'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};