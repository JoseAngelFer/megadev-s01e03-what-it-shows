<script lang="ts">
  import reports from '#lib/data/reports-4471.json';
  import notes from '#lib/data/desk-notes.json';
  import { uniqueById, groupByCause, readAs, type Report } from '#lib/kb/causes';
  import { tenantOf } from '#lib/kb/locales';
  const merged = uniqueById(reports as Report[]).filter(r => r.mergedInto === 4471);
  const groups = groupByCause(merged, tenantOf);
  const uncertain = merged.filter(r => notes.oneDayMove.includes(r.id));
  const bulk = merged.filter(r => r.mergedAt?.startsWith('2026-07-02'));
  const subsequent = merged.filter(r => r.mergedAt && r.mergedAt.slice(0, 10) > '2026-07-02');
</script>

<h2>Export reconciliation</h2>
<p>{reports.length} exported rows become {merged.length} unique reports for #4471; {reports.length - merged.length} overlapping rows are not additional reports.</p>
<table>
  <thead><tr><th>Cause from tenant and channel</th><th>Reports</th><th>Tenants</th><th>First / last received</th><th>Intake guesses</th><th>One-day anomalies included</th></tr></thead>
  <tbody>
    {#each groups as g (g.cause)}
      <tr><td>{g.cause}</td><td>{g.reports.length}</td><td>{g.tenants}</td><td>{g.firstSeen} / {g.lastSeen}</td><td>{Object.entries(g.taggedAs).map(([k, n]) => `${k}: ${n}`).join('; ')}</td><td>{readAs(g, notes.oneDayMove)}</td></tr>
    {/each}
  </tbody>
</table>
<p>The desk bulk-merged {bulk.length} reports on 2026-07-02, then merged another {subsequent.length} through the last export entry. The queue was still changing: these are export counts, not a claim about today's live queue.</p>
<h2>Evidence the classifier cannot settle</h2>
<p>The following {uncertain.length} reports are counted under parser by the supplied tenant-based classifier. Their bodies do not establish a month/day reversal. Keep them linked for investigation; do not double-count them as another confirmed cause.</p>
<table>
  <thead><tr><th>Report</th><th>Tenant / channel</th><th>Exact report body</th></tr></thead>
  <tbody>{#each uncertain as r (r.id)}<tr><td>{r.id}</td><td>{r.tenant} / {r.channel}</td><td>{r.body}</td></tr>{/each}</tbody>
</table>
