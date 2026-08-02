import site from './index-v64.js';

const DEPLOYMENT_MARKER = 'v64-hut-forms-library-2026-08-02-01';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v64',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v64.js',
        navigation: 'stable-global-navigation',
        feature: 'hut-forms-library-and-form-guides-v64',
        hub: '/forms-library',
        guides: [
          '/forms/tmt-1',
          '/forms/mt-903',
          '/forms/mt-903-i',
          '/forms/mt-903-mn',
          '/forms/mt-370-1',
          '/forms/mt-370-2',
          '/forms/tmt-39',
          '/forms/tmt-334',
          '/forms/dtf-406',
          '/forms/mt-903-fut',
          '/forms/hut-publications'
        ]
      }, null, 2), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'x-newyorkhut-version': 'v64',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-feature': 'hut-forms-library-v64'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};