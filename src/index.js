import site from './index-v61.js';

const DEPLOYMENT_MARKER = 'v61-hut-registration-center-2026-08-02-01';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v61',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v61.js',
        navigation: 'stable-global-navigation',
        feature: 'hut-registration-center-and-guides-v61',
        hub: '/hut-registration-center',
        guides: [
          '/learn/who-needs-a-new-york-hut-permit',
          '/learn/how-to-register-for-new-york-hut',
          '/learn/new-york-hut-certificate-of-registration',
          '/learn/new-york-hut-decals-explained',
          '/learn/temporary-hut-permits-and-first-trip-questions',
          '/learn/how-gvw-affects-your-hut-tax',
          '/learn/common-hut-registration-mistakes'
        ]
      }, null, 2), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'x-newyorkhut-version': 'v61',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-feature': 'hut-registration-center-v61'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};