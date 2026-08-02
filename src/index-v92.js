import site from './index-v91.js';

const VERSION = 'v92';
const FEATURE = 'static-google-readable-sitemap-v92';
const ORIGIN = 'https://newyorkhut.com';

const PATHS = `
/
/learn
/tools
/services
/ask-hut-ai
/new-york-hut-guide
/site-map
/hut-registration-center
/mt-903-filing-center
/vehicle-lifecycle
/audit-and-enforcement-center
/exemptions-and-special-vehicles
/forms-library
/carrier-compliance-center
/news-and-regulatory-center
/tools/hut-permit-requirement
/tools/hut-tax-estimator
/tools/hut-rate-lookup
/tools/hut-penalty-estimator
/tools/mt903-due-date
/learn/who-needs-a-new-york-hut-permit
/learn/how-to-register-for-new-york-hut
/learn/new-york-hut-certificate-of-registration
/learn/new-york-hut-decals-explained
/learn/temporary-hut-permits-and-first-trip-questions
/learn/how-gvw-affects-your-hut-tax
/learn/common-hut-registration-mistakes
/learn/what-is-form-mt-903
/learn/who-must-file-mt-903
/learn/mt-903-filing-deadlines-and-frequency
/learn/new-york-hut-taxable-miles
/learn/hut-recordkeeping-requirements
/learn/amended-final-and-no-activity-mt-903-returns
/learn/selling-or-transferring-a-new-york-hut-permitted-truck
/learn/buying-a-truck-and-new-york-hut
/learn/replacing-a-truck-and-new-york-hut
/learn/adding-a-vehicle-to-new-york-hut
/learn/removing-a-vehicle-from-new-york-hut
/learn/changing-gvw-on-a-new-york-hut-vehicle
/learn/lost-hut-certificate
/learn/lost-or-damaged-hut-decal
/learn/new-york-hut-audits
/learn/hut-records-you-must-keep
/learn/common-new-york-hut-audit-findings
/learn/new-york-hut-penalties
/learn/how-to-respond-to-a-hut-audit
/learn/hut-audit-checklist
/learn/new-york-hut-farm-vehicle-exemption
/learn/government-vehicle-hut-exemption
/learn/recreational-vehicle-hut-exemption
/learn/dealer-and-transporter-plate-hut-exemption
/learn/household-goods-mover-hut-exemption
/learn/special-mobile-equipment-and-road-building-machines
/learn/new-york-hut-excluded-vehicles
/learn/new-york-hut-exempt-vehicles
/forms/tmt-1
/forms/mt-903
/forms/mt-903-i
/forms/mt-903-mn
/forms/mt-370-1
/forms/mt-370-2
/forms/tmt-39
/forms/tmt-334
/forms/dtf-406
/forms/mt-903-fut
/forms/hut-publications
/learn/ifta-compliance-for-new-york-carriers
/learn/irp-apportioned-registration
/learn/form-2290-heavy-vehicle-use-tax
/learn/unified-carrier-registration-ucr
/learn/fmcsa-registration-and-usdot-compliance
/learn/commercial-vehicle-registration-checklist
/learn/trucking-compliance-calendar
/news/hut-tax-bulletins-updated-march-2026
/news/hut-forms-index-updated-june-2026
/news/hut-interest-rate-july-september-2026
/news/new-york-hut-repeal-bills-a25-s345
`.trim().split('\n');

function sitemap() {
  const rows = PATHS.map(path => `  <url><loc>${ORIGIN}${path}</loc></url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows}\n</urlset>\n`;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/sitemap.xml') {
      return new Response(sitemap(), {
        status: 200,
        headers: {
          'content-type': 'application/xml; charset=UTF-8',
          'cache-control': 'public, max-age=300, s-maxage=300',
          'x-robots-tag': 'noindex, follow',
          'access-control-allow-origin': '*',
          'x-content-type-options': 'nosniff',
          'x-newyorkhut-version': VERSION,
          'x-newyorkhut-feature': FEATURE,
          'x-sitemap-url-count': String(PATHS.length)
        }
      });
    }

    if (path === '/robots.txt') {
      const response = await site.fetch(request, env, ctx);
      const body = await response.text();
      const sitemapLine = 'Sitemap: https://newyorkhut.com/sitemap.xml';
      const normalized = body.includes(sitemapLine) ? body : `${body.trim()}\n${sitemapLine}\n`;
      const headers = new Headers(response.headers);
      headers.set('content-type', 'text/plain; charset=UTF-8');
      headers.set('cache-control', 'public, max-age=300, s-maxage=300');
      headers.set('x-newyorkhut-version', VERSION);
      headers.set('x-newyorkhut-feature', FEATURE);
      return new Response(normalized, { status: 200, headers });
    }

    const response = await site.fetch(request, env, ctx);
    const headers = new Headers(response.headers);
    headers.set('x-newyorkhut-version', VERSION);
    headers.set('x-newyorkhut-feature', FEATURE);
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
