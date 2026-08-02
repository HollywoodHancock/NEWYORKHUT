import site from './index-v86.js';

const DEPLOYMENT_MARKER = 'v86-homepage-hero-top-alignment-2026-08-02-02-emergency-rollback';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v86',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v86.js',
        feature: 'homepage-hero-top-alignment-v86',
        navigation: 'pre-v87 stable navigation restored',
        rollback: {
          from: 'v87-canonical-global-navigation',
          reason: 'Worker exception on HTML routes'
        }
      }, null, 2), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'x-newyorkhut-version': 'v86',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-feature': 'homepage-hero-top-alignment-v86'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};
