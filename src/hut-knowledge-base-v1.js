export const HUT_KNOWLEDGE_BASE = [
  {
    id: "permit-duration",
    title: "How long is a HUT permit valid?",
    keywords: ["how long", "valid", "expire", "expiration", "good for", "duration", "permit good"],
    answer: "There are two different HUT credentials, and their validity is different. A HUT trip certificate expires at midnight on the third day after the date it was issued; the printed expiration date controls. A regular HUT certificate of registration and decal remains valid until New York requires renewal, or until it is cancelled, suspended, revoked, replaced, or no longer applies to that vehicle. New York currently issues 25th-series credentials, but the Tax Department's public renewal page does not state a fixed expiration date for every regular credential.",
    followUp: "Are you asking about a temporary trip certificate or a regular HUT certificate and decal?",
    actions: [{label:"Start HUT Permit",href:"https://nyhut.com/"}],
    sources: [
      {label:"NY Tax Bulletin TB-HU-116 — Trip Certificate",href:"https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/hut/cor_trip_certificate.htm"},
      {label:"NY Tax Bulletin TB-HU-115 — Certificate of Registration",href:"https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/hut/certificate_of_registration.htm"}
    ]
  },
  {
    id: "need-hut",
    title: "Do I need New York HUT?",
    keywords: ["do i need", "need hut", "required", "requirement", "who needs", "weight", "18,000", "18000"],
    answer: "A HUT certificate is generally required before operating on New York public highways for a truck, tractor, or other self-propelled vehicle with a gross weight over 18,000 pounds. If the carrier elects the unloaded-weight filing method, the threshold can instead involve trucks over 8,000 pounds unloaded and tractors over 4,000 pounds unloaded. Exclusions and exemptions may apply based on the vehicle and its exclusive use.",
    followUp: "What is the vehicle's registered or gross weight, is it a truck or tractor, and will it operate on New York public highways?",
    actions: [{label:"Decode Vehicle VIN",href:"/tools/vin-decoder"},{label:"Start HUT Permit",href:"https://nyhut.com/"}],
    sources: [{label:"New York Highway Use Tax overview",href:"https://www.tax.ny.gov/bus/hut/huidx.htm"},{label:"NY Tax Bulletin TB-HU-115",href:"https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/hut/certificate_of_registration.htm"}]
  },
  {
    id: "trip-certificate",
    title: "HUT trip certificate",
    keywords: ["trip permit", "trip certificate", "temporary permit", "temporary hut", "one trip", "occasional"],
    answer: "A HUT trip certificate is intended for occasional New York operation instead of obtaining a regular certificate, decal, and filing HUT returns for that vehicle. It expires at midnight on the third day after issuance. A carrier may not obtain more than 10 HUT trip certificates in a calendar year, and trip certificates are not available for vehicles transporting automotive fuel.",
    followUp: "Will this vehicle make only occasional New York trips, and has the carrier already used any HUT trip certificates this calendar year?",
    actions: [{label:"Start Trip Permit",href:"https://nyhut.com/"}],
    sources: [{label:"NY Tax Bulletin TB-HU-116",href:"https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/hut/cor_trip_certificate.htm"}]
  },
  {
    id: "filing",
    title: "HUT return filing requirements",
    keywords: ["file", "filing", "return", "mt-903", "quarterly", "due date", "no miles", "zero return"],
    answer: "A carrier issued a regular HUT or AFC certificate generally must file a HUT return even when no tax is due. New accounts normally begin with quarterly filing unless the Tax Department assigns another filing frequency. Standard quarterly due dates are April 30, July 31, October 31, and January 31 for the preceding quarter. Trip certificates are treated differently and do not require a HUT return for the covered trip period.",
    followUp: "Are you asking about a regular HUT account, an AFC account, or a trip certificate?",
    actions: [{label:"Build Compliance Calendar",href:"/tools/compliance-calendar"}],
    sources: [{label:"NY Tax Bulletin TB-HU-260 — Filing Requirements",href:"https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/hut/filing_requirements.htm"}]
  },
  {
    id: "records",
    title: "HUT mileage and recordkeeping",
    keywords: ["records", "recordkeeping", "mileage", "miles", "logs", "keep records", "audit"],
    answer: "Motor carriers subject to HUT must keep daily records of New York miles for each registered truck or tractor. Records must support the actual miles used to calculate HUT liability and distinguish taxable from nontaxable operations. Trip-certificate copies should be retained for at least four years.",
    followUp: "Do you need a vehicle mileage log, a fleet reconciliation process, or help with a specific audit period?",
    actions: [{label:"Open Fleet Toolkit",href:"/fleet-toolkit"}],
    sources: [{label:"NY Tax Bulletin TB-HU-765 — Recordkeeping",href:"https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/hut/recordkeeping_requirements.htm"},{label:"NY Tax Bulletin TB-HU-116",href:"https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/hut/cor_trip_certificate.htm"}]
  },
  {
    id: "credentials",
    title: "Getting or changing HUT credentials",
    keywords: ["get permit", "apply", "application", "credential", "decal", "add vehicle", "change plate", "replacement", "duplicate"],
    answer: "New York allows carriers to obtain and manage HUT credentials through OSCAR, by filing the applicable paper form, or through an approved permit service company. Existing account holders can add vehicles, revise credentials, transfer certain plate information, cancel credentials, and print temporary credentials while awaiting the permanent certificate and decal.",
    followUp: "Is this for a new HUT account, adding a vehicle to an existing account, or correcting an existing credential?",
    actions: [{label:"Start Permit",href:"https://nyhut.com/"}],
    sources: [{label:"NY Tax Bulletin TB-HU-115",href:"https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/hut/certificate_of_registration.htm"},{label:"New York OSCAR information",href:"https://www.tax.ny.gov/bus/ads/oscar.htm"}]
  },
  {
    id: "exemptions",
    title: "Excluded and exempt vehicles",
    keywords: ["exempt", "exemption", "excluded", "farm", "emergency", "recreational", "bus", "construction"],
    answer: "Some vehicles are excluded from HUT when used for the purpose for which they were designed, and other vehicles may be exempt when used exclusively for a qualifying activity. Common categories include certain buses, highway construction or maintenance vehicles, emergency vehicles, farm vehicles, and recreational vehicles. Eligibility depends on the exact vehicle and use, not only its title or ownership.",
    followUp: "What type of vehicle is it, who owns it, and exactly how will it be used in New York?",
    actions: [{label:"Open Fleet Dashboard",href:"/tools/fleet-compliance"}],
    sources: [{label:"NY Tax Bulletin TB-HU-245 — Excluded and Exempt Vehicles",href:"https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/hut/excluded_exempt_vehicles.htm"}]
  },
  {
    id: "enforcement",
    title: "Suspension, revocation, and compliance problems",
    keywords: ["suspended", "revoked", "denied", "delinquent", "penalty", "enforcement", "unfiled", "owe tax"],
    answer: "The Tax Department may deny, suspend, or revoke HUT credentials for failures such as not filing required returns or not paying amounts due. Outstanding HUT liabilities can also interfere with vehicle registration or transfer until the required tax-clearance documentation is issued.",
    followUp: "Is the problem an unfiled return, unpaid balance, suspended credential, or inability to register or transfer a vehicle?",
    actions: [{label:"Review Official Resources",href:"/official-resources"}],
    sources: [{label:"NY Tax Bulletin TB-HU-835 — Enforcement",href:"https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/hut/enforcement_provisions.htm"},{label:"NY Tax Bulletin TB-HU-115",href:"https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/hut/certificate_of_registration.htm"}]
  }
];

function normalize(value){return String(value||"").toLowerCase().replace(/[^a-z0-9\s.-]/g," ").replace(/\s+/g," ").trim()}

export function answerHutQuestion(question){
  const q=normalize(question);
  if(!q) return {error:"Enter a New York HUT question."};
  let best=null;
  let bestScore=0;
  for(const item of HUT_KNOWLEDGE_BASE){
    let score=0;
    for(const keyword of item.keywords){
      const k=normalize(keyword);
      if(q.includes(k)) score += k.includes(" ") ? 5 : 2;
      else {
        const words=k.split(" ");
        if(words.length>1 && words.every(word=>q.includes(word))) score += 3;
      }
    }
    if(score>bestScore){best=item;bestScore=score}
  }
  if(!best || bestScore<2){
    return {
      title:"I need a little more detail",
      answer:"I could not reliably match that question to the current HUT knowledge base. Ask about permit validity, whether a vehicle needs HUT, trip certificates, filing dates, mileage records, credentials, exemptions, or account enforcement.",
      followUp:"Include the vehicle type, weight, New York operation, and whether you mean a regular HUT credential or a trip certificate.",
      actions:[{label:"Open Fleet Dashboard",href:"/tools/fleet-compliance"}],
      sources:[],
      confidence:"low"
    };
  }
  return {...best,confidence:bestScore>=8?"high":"medium"};
}
