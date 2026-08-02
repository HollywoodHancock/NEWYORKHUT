import site from './index-v68.js';

const DEPLOYMENT_MARKER = 'v68-unified-hut-knowledge-center-2026-08-02-01';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v68',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v68.js',
        navigation: 'stable-global-navigation',
        feature: 'unified-hut-knowledge-center-v68',
        hub: '/learn',
        aliases: [
          '/knowledge-center',
          '/new-york-hut-knowledge-center'
        ],
        knowledgeCenters: [
          '/hut-registration-center',
          '/mt-903-filing-center',
          '/vehicle-lifecycle',
          '/audit-and-enforcement-center',
          '/exemptions-and-special-vehicles',
          '/forms-library',
          '/carrier-compliance-center',
          '/news-and-regulatory-center'
        ],
        connectedFeatures: [
          'knowledge-centers',
          'popular-tools',
          'ask-hut-ai',
          'nyhut-workflows',
          'collection-page-structured-data'
        ]
      }, null, 2), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'x-newyorkhut-version': 'v68',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-feature': 'unified-hut-knowledge-center-v68'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};