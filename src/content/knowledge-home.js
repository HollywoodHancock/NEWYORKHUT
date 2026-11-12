// Homepage discovery links. Keep existing answer URLs and send orders to NYHUT.com.
export const KNOWLEDGE_TOPICS = [
  ['Requirements', 'Who needs New York HUT?', 'Understand vehicle weights, out-of-state operation, and possible exemptions before you travel.', '/learn/who-needs-a-new-york-hut-permit', 'Read the requirements'],
  ['Registration', 'Certificates, decals, and accounts', 'Learn the difference between a carrier account, a vehicle credential, and a replacement document.', '/hut-registration-center', 'Explore registration guidance'],
  ['Occasional trips', 'Trip certificate or regular registration?', 'Compare the documents, trip limits, expiration rules, and continuing filing responsibilities.', '/guides/get-trip-certificate', 'Compare the options'],
  ['Returns and records', 'MT-903 filing and mileage', 'Find filing deadlines, taxable-mile guidance, recordkeeping, and return-preparation resources.', '/mt-903-filing-center', 'Explore the filing center'],
  ['Fleet changes', 'Adding, selling, or replacing a truck', 'Follow the right checklist when a vehicle leaves the fleet or its plate, weight, or credentials change.', '/vehicle-lifecycle', 'Read vehicle-change guidance'],
  ['Free tools', 'Calculate, check, and prepare', 'Use HUT requirement checks, tax estimates, rate lookups, and due-date tools with their stated assumptions.', '/tools', 'Open the free tools']
];

export const KNOWLEDGE_QUESTIONS = [
  ['/cost', 'What does New York HUT cost?', 'Separate state fees, service charges, and mileage tax.'],
  ['/filing/quarterly-due-dates', 'When is my HUT return due?', 'Check filing frequency and quarterly deadlines.'],
  ['/vehicles/box-trucks', 'Does a box truck need HUT?', 'Understand why the CDL threshold is a different question.'],
  ['/new-york-hut/how-do-i-remove-or-cancel-a-hut-vehicle', 'How do I remove a truck?', 'Distinguish vehicle cancellation from closing an account.']
];

export const HISTORICAL_ANSWERS = [
  ['/new-york-hut/how-do-i-add-a-vehicle-to-my-hut-account', 'Add a truck to an existing HUT account'],
  ['/new-york-hut/how-do-i-change-a-license-plate-on-a-hut-credential', 'Change a plate on a HUT credential'],
  ['/new-york-hut/what-are-25th-series-hut-credentials', 'Understand 25th-series HUT credentials'],
  ['/learn/lost-hut-certificate', 'Replace a lost HUT certificate'],
  ['/learn/lost-or-damaged-hut-decal', 'Replace a lost or damaged HUT decal'],
  ['/cost/late-filing', 'Understand late HUT returns']
];

export function renderKnowledgeTopics() {
  return KNOWLEDGE_TOPICS.map(([category, title, description, href, label]) =>
    `<article class="service"><div class="cat">${category}</div><h3>${title}</h3><p>${description}</p><a href="${href}">${label} →</a></article>`).join('');
}

export function renderKnowledgeQuestions() {
  return KNOWLEDGE_QUESTIONS.map(([href, title, description], index) =>
    `<div class="route"><div class="route-num">${index + 1}</div><div><strong><a href="${href}">${title}</a></strong><small>${description}</small></div></div>`).join('');
}

export function renderHistoricalAnswers() {
  return HISTORICAL_ANSWERS.map(([href, label]) => `<a href="${href}">${label} →</a>`).join('');
}
