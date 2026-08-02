import site from './index-v62.js';

const DEPLOYMENT_MARKER = 'v62-audit-enforcement-center-2026-08-02-01';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v62',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v62.js',
        navigation: 'stable-global-navigation',
        feature: 'audit-enforcement-center-and-guides-v62',
        hub: '/audit-and-enforcement-center',
        guides: [
          '/learn/new-york-hut-audits',
          '/learn/hut-records-you-must-keep',
          '/learn/common-new-york-hut-audit-findings',
          '/learn/new-york-hut-penalties',
          '/learn/how-to-respond-to-a-hut-audit',
          '/learn/hut-audit-checklist'
        ]
      }, null, 2), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'x-newyorkhut-version': 'v62',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-feature': 'audit-enforcement-center-v62'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};