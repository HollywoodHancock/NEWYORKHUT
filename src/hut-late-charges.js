// Parity with HollywoodHancock/NYHUT MyNyhutV2Page.tsx at b9cd7a0e5c00eec271978886e7869a8f24527236.
// Verified Highway Use late-payment rates: tax.ny.gov/pay/interest/2026/p1.htm through p4.htm, 2026-10-07.
export const HUT_INTEREST_RATES = [
  {start:'2026-01-01', end:'2026-03-31', rate:.11},
  {start:'2026-04-01', end:'2026-06-30', rate:.10},
  {start:'2026-07-01', end:'2026-09-30', rate:.11},
  {start:'2026-10-01', end:'2026-12-31', rate:.11}
];
export function parseHutDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return null;
  const date = new Date(value + 'T12:00:00Z');
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0,10) === value ? date : null;
}
export function calculateHutLateCharges(tax, dueDate, receiptDate) {
  const due = parseHutDate(dueDate), received = parseHutDate(receiptDate);
  if (!Number.isFinite(tax) || tax < 0 || !due || !received) return {error:'Enter a valid nonnegative tax amount, adjusted due date, and expected NYS receipt date.'};
  const taxAmount = Math.round((tax + Number.EPSILON) * 100) / 100, base = Math.round(taxAmount);
  if (received <= due || taxAmount === 0) return {tax:taxAmount, base, months:0, penalty:0, interest:0, days:0, total:taxAmount};
  let months = (received.getUTCFullYear()-due.getUTCFullYear())*12 + received.getUTCMonth()-due.getUTCMonth();
  if (received.getUTCDate()>due.getUTCDate() || months===0) months++;
  const penalty = Math.round((base * Math.min(.30,.10+Math.max(0,months-1)*.01) + Number.EPSILON) * 100) / 100;
  let principal = base, days = 0;
  // Match NYHUT: accrue after the due date through the day before state receipt.
  for (let day = new Date(due.getTime()+86400000); day < received; day = new Date(day.getTime()+86400000)) {
    const key = day.toISOString().slice(0,10);
    const period = HUT_INTEREST_RATES.find(row => key >= row.start && key <= row.end);
    if (!period) return {tax:taxAmount, base, months, penalty, interest:null, total:null, error:'Interest is unavailable for part of this date range. Verified rates cover January–December 2026; no total is estimated using an unknown rate.'};
    principal *= 1 + period.rate/365;
    days++;
  }
  const interest = Math.round((principal-base + Number.EPSILON) * 100) / 100;
  return {tax:taxAmount, base, months, penalty, interest, days, total:Math.round((taxAmount+penalty+interest + Number.EPSILON) * 100) / 100};
}
export const hutLateChargesBrowserCode = `const HUT_INTEREST_RATES=${JSON.stringify(HUT_INTEREST_RATES)};\n${parseHutDate.toString()}\n${calculateHutLateCharges.toString()}`;
