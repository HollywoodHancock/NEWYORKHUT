import site from './index-v110.js';

const VERSION = 'v111';
const FEATURE = 'phase1-topic-cluster-reinforcement-v111';

const CLUSTERS = new Map([
  ['/ny-hut-registration-guide', [
    ['/form-tmt-1-ny-hut/', 'Form TMT-1 application guide'],
    ['/ny-hut-certificate-and-decal', 'Certificates and decals'],
    ['/ny-hut-weight-requirements', 'HUT weight requirements']
  ]],
  ['/form-tmt-1-ny-hut', [
    ['/ny-hut-registration-guide', 'Registration process'],
    ['/ny-hut-certificate-and-decal', 'Certificates and decals'],
    ['/documents-needed-for-ny-hut', 'Documents and information to prepare']
  ]],
  ['/ny-hut-certificate-and-decal', [
    ['/ny-hut-registration-guide', 'Registration guide'],
    ['/form-tmt-1-ny-hut/', 'Form TMT-1 guide'],
    ['/ny-hut-decal-replacement', 'Replacement credentials']
  ]],
  ['/ny-hut-weight-requirements', [
    ['/who-needs-ny-hut', 'Who needs NY HUT'],
    ['/ny-hut-gross-weight-calculator', 'Gross-weight calculator'],
    ['/ny-hut-registration-guide', 'Registration guide']
  ]],
  ['/ny-hut-out-of-state-carriers', [
    ['/who-needs-ny-hut', 'Who needs NY HUT'],
    ['/temporary-ny-hut-permit', 'Temporary HUT permit guide'],
    ['/ny-hut-registration-guide', 'Regular registration guide']
  ]],
  ['/ny-hut-leased-trucks', [
    ['/who-needs-ny-hut', 'Who needs NY HUT'],
    ['/ny-hut-registration-guide', 'Registration guide'],
    ['/documents-needed-for-ny-hut', 'Documents and information to prepare']
  ]],

  ['/temporary-ny-hut-permit', [
    ['/ny-hut-trip-certificate-limits', 'Trip-certificate limits'],
    ['/guides/get-trip-certificate', 'How trip certificates work'],
    ['/temporary-vs-permanent-ny-hut-wizard', 'Temporary vs. regular credential']
  ]],
  ['/ny-hut-trip-certificate-limits', [
    ['/temporary-ny-hut-permit', 'Temporary HUT permit guide'],
    ['/guides/get-trip-certificate', 'How to obtain a trip certificate'],
    ['/temporary-vs-permanent-ny-hut-wizard', 'Temporary vs. regular credential']
  ]],
  ['/guides/get-trip-certificate', [
    ['/temporary-ny-hut-permit', 'Temporary HUT permit guide'],
    ['/ny-hut-trip-certificate-limits', 'Trip-certificate limits'],
    ['/ny-hut-out-of-state-carriers', 'Out-of-state carrier guidance']
  ]],

  ['/ny-hut-quarterly-filing', [
    ['/form-mt-903', 'Form MT-903 guide'],
    ['/ny-hut-filing-deadlines', 'HUT filing deadlines'],
    ['/learn/hut-recordkeeping-requirements', 'Recordkeeping requirements']
  ]],
  ['/form-mt-903', [
    ['/ny-hut-quarterly-filing', 'Quarterly filing guide'],
    ['/ny-hut-filing-deadlines', 'Filing deadlines'],
    ['/learn/hut-recordkeeping-requirements', 'Records to keep']
  ]],
  ['/ny-hut-filing-deadlines', [
    ['/ny-hut-quarterly-filing', 'Quarterly filing guide'],
    ['/form-mt-903', 'Form MT-903 guide'],
    ['/learn/hut-recordkeeping-requirements', 'Recordkeeping requirements']
  ]],

  ['/ny-hut-renewal-guide', [
    ['/ny-hut-certificate-and-decal', 'Certificates and decals'],
    ['/ny-hut-decal-replacement', 'Replacement credentials'],
    ['/new-york-hut-guide', 'Complete HUT guide']
  ]],
  ['/ny-hut-decal-replacement', [
    ['/ny-hut-certificate-and-decal', 'Certificates and decals'],
    ['/ny-hut-renewal-guide', 'Renewal guide'],
    ['/new-york-hut-guide', 'Complete HUT guide']
  ]],

  ['/who-needs-ny-hut', [
    ['/what-is-new-york-highway-use-tax', 'What New York HUT is'],
    ['/ny-hut-weight-requirements', 'Weight requirements'],
    ['/ny-hut-eligibility-checker', 'Eligibility checker']
  ]],
  ['/what-is-new-york-highway-use-tax', [
    ['/who-needs-ny-hut', 'Who needs NY HUT'],
    ['/new-york-hut-guide', 'Complete HUT guide'],
    ['/ifta-vs-ny-hut', 'IFTA vs. NY HUT']
  ]],
  ['/ifta-vs-ny-hut', [
    ['/irp-vs-ny-hut', 'IRP vs. NY HUT'],
    ['/who-needs-ny-hut', 'Who needs NY HUT'],
    ['/new-york-hut-guide', 'Complete HUT guide']
  ]],
  ['/irp-vs-ny-hut', [
    ['/ifta-vs-ny-hut', 'IFTA vs. NY HUT'],
    ['/ny-hut-apportioned-vehicles', 'HUT for apportioned vehicles'],
    ['/who-needs-ny-hut', 'Who needs NY HUT']
  ]]
]);

function pathOf(request) {
  return new URL(request.url).pathname.replace(/\/+$/, '') || '/';
}

function relatedBlock(links) {
  const items = links.map(([href, label]) => `<li><a href="${href}">${label}</a></li>`).join('');
  return `<aside id="nyh-v111-related" aria-label="Related New York HUT guidance" style="width:min(980px,calc(100% - 36px));margin:28px auto;padding:18px 20px;border:1px solid #d6e1e8;border-radius:12px;background:#fbfdfe;color:#18324a"><strong>Related New York HUT guidance</strong><ul style="margin:10px 0 0;padding-left:20px">${items}</ul></aside>`;
}

function addRelated(html, links) {
  if (html.includes('id="nyh-v111-related"')) return html;
  const block = relatedBlock(links);
  if (/<\/article>/i.test(html)) return html.replace(/<\/article>/i, `${block}</article>`);
  if (/<\/main>/i.test(html)) return html.replace(/<\/main>/i, `${block}</main>`);
  return html;
}

export default {
  async fetch(request, env, ctx) {
    const response = await site.fetch(request, env, ctx);
    const headers = new Headers(response.headers);
    headers.set('x-newyorkhut-version', VERSION);
    headers.set('x-newyorkhut-feature', FEATURE);

    const type = headers.get('content-type') || '';
    if (response.status !== 200 || !type.includes('text/html')) {
      return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
    }

    const path = pathOf(request);
    const links = CLUSTERS.get(path);
    if (!links) return new Response(response.body, { status: response.status, statusText: response.statusText, headers });

    const html = addRelated(await response.text(), links);
    return new Response(html, { status: response.status, statusText: response.statusText, headers });
  }
};
