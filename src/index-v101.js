import site from './index-v100.js';

const VERSION = 'v101';
const FEATURE = 'hub-to-article-crawl-paths-v101';

const HUB_LINKS = {
  '/hut-registration-center': [
    ['/learn/who-needs-a-new-york-hut-permit','Who needs a New York HUT permit?'],
    ['/learn/how-to-register-for-new-york-hut','How to register for New York HUT'],
    ['/learn/new-york-hut-certificate-of-registration','HUT certificate of registration'],
    ['/learn/new-york-hut-decals-explained','New York HUT decals explained'],
    ['/learn/temporary-hut-permits-and-first-trip-questions','Temporary HUT permits'],
    ['/learn/common-hut-registration-mistakes','Common HUT registration mistakes']
  ],
  '/mt-903-filing-center': [
    ['/learn/what-is-form-mt-903','What is Form MT-903?'],
    ['/learn/who-must-file-mt-903','Who must file MT-903?'],
    ['/learn/mt-903-filing-deadlines-and-frequency','MT-903 filing deadlines'],
    ['/learn/new-york-hut-taxable-miles','New York HUT taxable miles'],
    ['/learn/hut-recordkeeping-requirements','HUT recordkeeping requirements'],
    ['/learn/amended-final-and-no-activity-mt-903-returns','Amended, final and no-activity returns']
  ],
  '/vehicle-lifecycle': [
    ['/learn/adding-a-vehicle-to-new-york-hut','Adding a vehicle to New York HUT'],
    ['/learn/removing-a-vehicle-from-new-york-hut','Removing a vehicle from HUT'],
    ['/learn/replacing-a-truck-and-new-york-hut','Replacing a truck'],
    ['/learn/buying-a-truck-and-new-york-hut','Buying a truck'],
    ['/learn/selling-or-transferring-a-new-york-hut-permitted-truck','Selling or transferring a permitted truck'],
    ['/learn/changing-gvw-on-a-new-york-hut-vehicle','Changing GVW on a HUT vehicle']
  ],
  '/audit-and-enforcement-center': [
    ['/learn/new-york-hut-audits','New York HUT audits'],
    ['/learn/common-new-york-hut-audit-findings','Common HUT audit findings'],
    ['/learn/new-york-hut-penalties','New York HUT penalties'],
    ['/learn/how-to-respond-to-a-hut-audit','How to respond to a HUT audit'],
    ['/learn/hut-audit-checklist','HUT audit checklist'],
    ['/learn/hut-recordkeeping-requirements','HUT recordkeeping requirements']
  ],
  '/exemptions-and-special-vehicles': [
    ['/learn/new-york-hut-exempt-vehicles','New York HUT exempt vehicles'],
    ['/learn/new-york-hut-excluded-vehicles','New York HUT excluded vehicles'],
    ['/learn/new-york-hut-farm-vehicle-exemption','Farm vehicle exemption'],
    ['/learn/government-vehicle-hut-exemption','Government vehicle exemption'],
    ['/learn/recreational-vehicle-hut-exemption','Recreational vehicle exemption'],
    ['/learn/special-mobile-equipment-and-road-building-machines','Special mobile equipment']
  ],
  '/carrier-compliance-center': [
    ['/learn/ifta-compliance-for-new-york-carriers','IFTA compliance'],
    ['/learn/irp-apportioned-registration','IRP apportioned registration'],
    ['/learn/form-2290-heavy-vehicle-use-tax','Form 2290 heavy vehicle use tax'],
    ['/learn/unified-carrier-registration-ucr','Unified Carrier Registration'],
    ['/learn/fmcsa-registration-and-usdot-compliance','FMCSA and USDOT compliance'],
    ['/learn/trucking-compliance-calendar','Trucking compliance calendar']
  ]
};

function pathOf(request) {
  return new URL(request.url).pathname.replace(/\/+$/, '') || '/';
}

function clusterBlock(path, links) {
  const items = links.map(([href,label]) => `<li><a href="${href}" style="color:#176dcc;font-weight:700;text-decoration:none">${label}</a></li>`).join('');
  return `<section aria-label="Related New York HUT guides" style="border-top:1px solid #d7e3ed;background:#fbfdff;padding:28px 18px"><div style="width:min(1040px,100%);margin:auto"><h2 style="margin:0 0 8px;color:#082b4c;font:800 1.45rem/1.2 system-ui,sans-serif">Related New York HUT guides</h2><p style="margin:0 0 14px;color:#435d75;font:400 1rem/1.5 system-ui,sans-serif">Use these focused guides for the next step in this topic.</p><ul style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:9px 22px;margin:0;padding-left:20px">${items}</ul></div></section>`;
}

export default {
  async fetch(request, env, ctx) {
    const response = await site.fetch(request, env, ctx);
    const path = pathOf(request);
    const headers = new Headers(response.headers);
    headers.set('x-newyorkhut-version', VERSION);
    headers.set('x-newyorkhut-feature', FEATURE);

    const links = HUB_LINKS[path];
    const type = headers.get('content-type') || '';
    if (!links || response.status !== 200 || !type.includes('text/html')) {
      return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
    }

    let html = await response.text();
    if (!html.includes('aria-label="Related New York HUT guides"')) {
      html = html.replace(/<\/body>/i, `${clusterBlock(path, links)}</body>`);
    }
    return new Response(html, { status: response.status, statusText: response.statusText, headers });
  }
};
