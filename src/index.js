import site from './index-v63.js';

const DEPLOYMENT_MARKER = 'v63-exemptions-special-vehicles-2026-08-02-01';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/__deploy_probe') {
      return new Response(JSON.stringify({
        application: 'NewYorkHUT.com',
        version: 'v63',
        deploymentMarker: DEPLOYMENT_MARKER,
        entrypoint: 'src/index.js',
        target: 'src/index-v63.js',
        navigation: 'stable-global-navigation',
        feature: 'exemptions-special-vehicles-center-and-guides-v63',
        hub: '/exemptions-and-special-vehicles',
        guides: [
          '/learn/new-york-hut-farm-vehicle-exemption',
          '/learn/government-vehicle-hut-exemption',
          '/learn/recreational-vehicle-hut-exemption',
          '/learn/dealer-and-transporter-plate-hut-exemption',
          '/learn/household-goods-mover-hut-exemption',
          '/learn/special-mobile-equipment-and-road-building-machines',
          '/learn/new-york-hut-excluded-vehicles',
          '/learn/new-york-hut-exempt-vehicles'
        ]
      }, null, 2), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'x-newyorkhut-version': 'v63',
          'x-newyorkhut-deployment-marker': DEPLOYMENT_MARKER,
          'x-newyorkhut-feature': 'exemptions-special-vehicles-v63'
        }
      });
    }

    return site.fetch(request, env, ctx);
  }
};