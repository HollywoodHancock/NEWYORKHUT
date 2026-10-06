// Reviewed against MT-903-I and NY's nonbusiness-day guidance, 2026-10-06.
// Calendar arithmetic uses UTC so a browser's timezone cannot move a deadline.
export function isNyTaxHoliday(date) {
  const y = date.getUTCFullYear(), m = date.getUTCMonth(), d = date.getUTCDate(), w = date.getUTCDay();
  if ((m === 0 && d === 1) || (m === 5 && d === 19) || (m === 6 && d === 4) || (m === 10 && d === 11) || (m === 11 && d === 25)) return true;
  if (w === 1 && ((m === 0 && d >= 15 && d <= 21) || (m === 1 && d >= 15 && d <= 21) || (m === 4 && d >= 25) || (m === 8 && d <= 7) || (m === 9 && d >= 8 && d <= 14))) return true;
  if (m === 10 && w === 4 && d >= 22 && d <= 28) return true;
  // Sunday fixed-date holidays are observed the following Monday.
  if (w === 1) {
    const yesterday = new Date(Date.UTC(y, m, d - 1));
    const pm = yesterday.getUTCMonth(), pd = yesterday.getUTCDate();
    if ((pm === 0 && pd === 1) || (pm === 5 && pd === 19) || (pm === 6 && pd === 4) || (pm === 10 && pd === 11) || (pm === 11 && pd === 25)) return true;
  }
  return false;
}

export function nextNyTaxBusinessDay(date) {
  const due = new Date(date);
  while (due.getUTCDay() === 0 || due.getUTCDay() === 6 || isNyTaxHoliday(due)) due.setUTCDate(due.getUTCDate() + 1);
  return due;
}

export function hutFilingDueDate(year, frequency, period) {
  const endMonth = frequency === "annual" ? 11 : frequency === "quarterly" ? period * 3 - 1 : period - 1;
  return nextNyTaxBusinessDay(new Date(Date.UTC(year, endMonth + 2, 0)));
}

export const hutDeadlineBrowserCode = "// Reviewed against MT-903-I and NY's nonbusiness-day guidance, 2026-10-06.\n// Calendar arithmetic uses UTC so a browser's timezone cannot move a deadline.\nfunction isNyTaxHoliday(date) {\n  const y = date.getUTCFullYear(), m = date.getUTCMonth(), d = date.getUTCDate(), w = date.getUTCDay();\n  if ((m === 0 && d === 1) || (m === 5 && d === 19) || (m === 6 && d === 4) || (m === 10 && d === 11) || (m === 11 && d === 25)) return true;\n  if (w === 1 && ((m === 0 && d >= 15 && d <= 21) || (m === 1 && d >= 15 && d <= 21) || (m === 4 && d >= 25) || (m === 8 && d <= 7) || (m === 9 && d >= 8 && d <= 14))) return true;\n  if (m === 10 && w === 4 && d >= 22 && d <= 28) return true;\n  // Sunday fixed-date holidays are observed the following Monday.\n  if (w === 1) {\n    const yesterday = new Date(Date.UTC(y, m, d - 1));\n    const pm = yesterday.getUTCMonth(), pd = yesterday.getUTCDate();\n    if ((pm === 0 && pd === 1) || (pm === 5 && pd === 19) || (pm === 6 && pd === 4) || (pm === 10 && pd === 11) || (pm === 11 && pd === 25)) return true;\n  }\n  return false;\n}\n\nfunction nextNyTaxBusinessDay(date) {\n  const due = new Date(date);\n  while (due.getUTCDay() === 0 || due.getUTCDay() === 6 || isNyTaxHoliday(due)) due.setUTCDate(due.getUTCDate() + 1);\n  return due;\n}\n\nfunction hutFilingDueDate(year, frequency, period) {\n  const endMonth = frequency === \"annual\" ? 11 : frequency === \"quarterly\" ? period * 3 - 1 : period - 1;\n  return nextNyTaxBusinessDay(new Date(Date.UTC(year, endMonth + 2, 0)));\n}\n";
