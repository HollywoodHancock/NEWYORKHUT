import site from './index-v66.js';

const DEPLOYMENT_MARKER = 'v66-global-seo-regulatory-center-2026-08-02-01';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v66',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v66.js',
        navigation: 'stable-global-navigation',
        feature: 'global-technical-seo-and-regulatory-center-v66',
        hub: '/news-and-regulatory-center',
        seo: {
          sitemap: '/sitemap.xml',
          robots: '/robots.txt',
          htmlSiteMap: '/site-map',
          metadata: 'canonical-robots-open-graph-twitter',
          structuredData: 'organization-website-webpage-article-collection-breadcrumb'
        },
        guides: [
          '/news/hut-tax-bulletins-updated-march-2026',
          '/news/hut-forms-index-updated-june-2026',
          '/news/hut-interest-rate-july-september-2026',
          '/news/new-york-hut-repeal-bills-a25-s345'
        ]
      }, null, 2), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'x-newyorkhut-version': 'v66',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-feature': 'global-seo-regulatory-center-v66'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};