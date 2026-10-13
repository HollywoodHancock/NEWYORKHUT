// Older publicly served XML sitemaps must obey the same canonical rules as /sitemap.xml.
export const LEGACY_SITEMAP_PATHS = new Set([
  '/sitemap-account-management.xml', '/sitemap-assistant.xml', '/sitemap-calculators.xml',
  '/sitemap-comparisons.xml', '/sitemap-cost.xml', '/sitemap-exemptions.xml',
  '/sitemap-faq.xml', '/sitemap-filing.xml', '/sitemap-glossary.xml', '/sitemap-guides.xml',
  '/sitemap-industries.xml', '/sitemap-official-resources.xml', '/sitemap-permit-types.xml',
  '/sitemap-phase2.xml', '/sitemap-registration-series.xml', '/sitemap-resources.xml',
  '/sitemap-services.xml', '/sitemap-states.xml', '/sitemap-tools-v26.xml',
  '/sitemap-tools.xml', '/sitemap-university.xml', '/sitemap-vehicles.xml',
  '/sitemap-violations.xml', '/sitemap-weights.xml'
]);

// These aliases used the same source handlers before the canonical page was upgraded.
// Keeping the aliases as separate 200 pages exposed older content and calculator logic.
export const HANDLER_ALIAS_REDIRECTS = new Map([
  ['/complete-guide-to-new-york-hut', '/new-york-hut-guide'],
  ['/tools/hut-calculator', '/tools/hut-tax-estimator'],
  ['/tools/trip-estimator', '/tools/hut-tax-estimator'],
  ['/tools/trip-cost-estimator', '/tools/hut-tax-estimator']
]);
