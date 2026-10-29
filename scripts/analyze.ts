import reports from '../src/lib/data/reports-4471.json';
import notes from '../src/lib/data/desk-notes.json';
import { uniqueById, groupByCause, sameCause, type Report } from '../src/lib/kb/causes';
import { tenantOf } from '../src/lib/kb/locales';
import { DEDUPE_CASES } from '../src/lib/kb/dedupe-cases';
import { deskRef } from '../src/lib/kb/desk-ref';
import { metadata } from '../src/routes/kb/incidents/4471-reassessment/+page.svx';
export function analyze() {
  const unique = uniqueById(reports as Report[]).filter(r => r.mergedInto === 4471);
  return {
    rawRows: reports.length, uniqueReports: unique.length,
    groups: groupByCause(unique, tenantOf).map(g => ({ cause: g.cause, count: g.reports.length, tenants: g.tenants, taggedAs: g.taggedAs, firstSeen: g.firstSeen, lastSeen: g.lastSeen, reportIds: g.reports.map(r => r.id) })),
    unresolvedOneDayReports: notes.oneDayMove,
    dedupeCases: DEDUPE_CASES.map(c => ({ case: c.why, sameCause: sameCause(c.a, tenantOf(c.a), c.b, tenantOf(c.b)) })),
    deskRef: deskRef(metadata.signature)
  };
}
