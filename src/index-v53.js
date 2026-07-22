import site from './index-v52.js';

const VERSION = 'v53';

export default {
  async fetch(request, env, ctx) {
    const response = await site.fetch(request, env, ctx);
    const headers = new Headers(response.headers);
    headers.set('x-newyorkhut-version', VERSION);
    headers.set('x-newyorkhut-navigation', 'universal-buttons-v53');
    headers.set('cache-control', 'no-store, no-cache, must-revalidate, max-age=0');

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
