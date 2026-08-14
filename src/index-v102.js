import site from './index-v101.js';

const VERSION = 'v102';
const FEATURE = 'article-to-hub-topic-links-v102';

const ARTICLE_HUB = {
  '/learn/who-needs-a-new-york-hut-permit': ['/hut-registration-center','HUT Registration Center'],
  '/learn/how-to-register-for-new-york-hut': ['/hut-registration-center','HUT Registration Center'],
  '/learn/new-york-hut-certificate-of-registration': ['/hut-registration-center','HUT Registration Center'],
  '/learn/new-york-hut-decals-explained': ['/hut-registration-center','HUT Registration Center'],
  '/learn/temporary-hut-permits-and-first-trip-questions': ['/hut-registration-center','HUT Registration Center'],
  '/learn/common-hut-registration-mistakes': ['/hut-registration-center','HUT Registration Center'],
  '/learn/what-is-form-mt-903': ['/mt-903-filing-center','MT-903 Filing Center'],
  '/learn/who-must-file-mt-903': ['/mt-903-filing-center','MT-903 Filing Center'],
  '/learn/mt-903-filing-deadlines-and-frequency': ['/mt-903-filing-center','MT-903 Filing Center'],
  '/learn/new-york-hut-taxable-miles': ['/mt-903-filing-center','MT-903 Filing Center'],
  '/learn/hut-recordkeeping-requirements': ['/mt-903-filing-center','MT-903 Filing Center'],
  '/learn/amended-final-and-no-activity-mt-903-returns': ['/mt-903-filing-center','MT-903 Filing Center'],
  '/learn/adding-a-vehicle-to-new-york-hut': ['/vehicle-lifecycle','Vehicle Lifecycle Guide'],
  '/learn/removing-a-vehicle-from-new-york-hut': ['/vehicle-lifecycle','Vehicle Lifecycle Guide'],
  '/learn/replacing-a-truck-and-new-york-hut': ['/vehicle-lifecycle','Vehicle Lifecycle Guide'],
  '/learn/buying-a-truck-and-new-york-hut': ['/vehicle-lifecycle','Vehicle Lifecycle Guide'],
  '/learn/selling-or-transferring-a-new-york-hut-permitted-truck': ['/vehicle-lifecycle','Vehicle Lifecycle Guide'],
  '/learn/changing-gvw-on-a-new-york-hut-vehicle': ['/vehicle-lifecycle','Vehicle Lifecycle Guide'],
  '/learn/new-york-hut-audits': ['/audit-and-enforcement-center','Audit & Enforcement Center'],
  '/learn/common-new-york-hut-audit-findings': ['/audit-and-enforcement-center','Audit & Enforcement Center'],
  '/learn/new-york-hut-penalties': ['/audit-and-enforcement-center','Audit & Enforcement Center'],
  '/learn/how-to-respond-to-a-hut-audit': ['/audit-and-enforcement-center','Audit & Enforcement Center'],
  '/learn/hut-audit-checklist': ['/audit-and-enforcement-center','Audit & Enforcement Center'],
  '/learn/new-york-hut-exempt-vehicles': ['/exemptions-and-special-vehicles','Exemptions & Special Vehicles'],
  '/learn/new-york-hut-excluded-vehicles': ['/exemptions-and-special-vehicles','Exemptions & Special Vehicles'],
  '/learn/new-york-hut-farm-vehicle-exemption': ['/exemptions-and-special-vehicles','Exemptions & Special Vehicles'],
  '/learn/government-vehicle-hut-exemption': ['/exemptions-and-special-vehicles','Exemptions & Special Vehicles'],
  '/learn/recreational-vehicle-hut-exemption': ['/exemptions-and-special-vehicles','Exemptions & Special Vehicles'],
  '/learn/special-mobile-equipment-and-road-building-machines': ['/exemptions-and-special-vehicles','Exemptions & Special Vehicles'],
  '/learn/ifta-compliance-for-new-york-carriers': ['/carrier-compliance-center','Carrier Compliance Center'],
  '/learn/irp-apportioned-registration': ['/carrier-compliance-center','Carrier Compliance Center'],
  '/learn/form-2290-heavy-vehicle-use-tax': ['/carrier-compliance-center','Carrier Compliance Center'],
  '/learn/unified-carrier-registration-ucr': ['/carrier-compliance-center','Carrier Compliance Center'],
  '/learn/fmcsa-registration-and-usdot-compliance': ['/carrier-compliance-center','Carrier Compliance Center'],
  '/learn/trucking-compliance-calendar': ['/carrier-compliance-center','Carrier Compliance Center']
};

function pathOf(request) {
  return new URL(request.url).pathname.replace(/\/+$/, '') || '/';
}

function parentLink(href, label) {
  return `<nav aria-label="Topic hub" style="width:min(1040px,calc(100% - 36px));margin:18px auto 0;padding:10px 0"><a href="${href}" style="color:#176dcc;font:800 .95rem system-ui,sans-serif;text-decoration:none">← Back to ${label}</a></nav>`;
}

export default {
  async fetch(request, env, ctx) {
    const response = await site.fetch(request, env, ctx);
    const path = pathOf(request);
    const headers = new Headers(response.headers);
    headers.set('x-newyorkhut-version', VERSION);
    headers.set('x-newyorkhut-feature', FEATURE);

    const parent = ARTICLE_HUB[path];
    const type = headers.get('content-type') || '';
    if (!parent || response.status !== 200 || !type.includes('text/html')) {
      return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
    }

    let html = await response.text();
    if (!html.includes('aria-label="Topic hub"')) {
      const [href, label] = parent;
      html = html.replace(/<main\b/i, `${parentLink(href,label)}<main`);
    }
    return new Response(html, { status: response.status, statusText: response.statusText, headers });
  }
};
