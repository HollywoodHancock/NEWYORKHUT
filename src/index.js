import site from './index-v88.js';

const DEPLOYMENT_MARKER = 'v88-compact-tools-directory-2026-08-02-01';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v88',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v88.js',
        feature: 'compact-tools-directory-v88',
        navigation: 'pre-v87 stable navigation preserved',
        toolsDirectory: {
          path: '/tools',
          scope: 'page-specific only',
          heroSpacing: 'reduced',
          sectionSpacing: 'reduced',
          desktopGrid: 'three columns',
          cardPadding: '15px',
          individualToolPagesChanged: false
        }
      }, null, 2), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'x-newyorkhut-version': 'v88',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-feature': 'compact-tools-directory-v88'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};
