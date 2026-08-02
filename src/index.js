import site from './index-v60.js';

const DEPLOYMENT_MARKER = 'v60-mt903-filing-center-2026-08-02-01';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v60',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v60.js',
        navigation: 'stable-global-navigation',
        feature: 'mt903-filing-center-and-core-guides-v60',
        hub: '/mt-903-filing-center',
        guides: [
          '/learn/what-is-form-mt-903',
          '/learn/who-must-file-mt-903',
          '/learn/mt-903-filing-deadlines-and-frequency',
          '/learn/new-york-hut-taxable-miles',
          '/learn/hut-recordkeeping-requirements',
          '/learn/amended-final-and-no-activity-mt-903-returns'
        ]
      }, null, 2), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'x-newyorkhut-version': 'v60',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-feature': 'mt903-filing-center-v60'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};