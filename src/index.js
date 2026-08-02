import site from './index-v67.js';

const DEPLOYMENT_MARKER = 'v67-expanded-ask-hut-ai-2026-08-02-01';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v67',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v67.js',
        navigation: 'stable-global-navigation',
        feature: 'expanded-ask-hut-ai-knowledge-base-v67',
        hub: '/ask-hut-ai',
        knowledgeEntries: 20,
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
        responseLinks: [
          'related-guides',
          'related-tools',
          'official-source',
          'nyhut-workflow'
        ]
      }, null, 2), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'x-newyorkhut-version': 'v67',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-feature': 'expanded-ask-hut-ai-v67'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};