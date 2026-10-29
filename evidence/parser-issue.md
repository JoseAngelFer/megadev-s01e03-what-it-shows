## Problem
The shared parser assumes MM/DD for input from day-first tenants. For example, R-41200 reports 7 April becoming 4 July, and R-41203 reports 2 December becoming 12 February.

## Report count: 379 unique reports
This is the supplied classifier's parser group within #4471, across 11 tenants. Deduplicated by report ID: the full export has 427 rows but 412 unique reports. The other 33 reports belong to the separate booking-v3 hint issue.

Count by tenant locale + form version + channel using the actual `causeOf`, `uniqueById`, and `groupByCause` functions, not intake tags or browser locale. Of this group, intake guessed parser for 356 and hint for 23. Full membership: `evidence/analysis.json`.

### Unresolved evidence within this count
R-41202, R-41209, R-41236, R-41344 and R-41620 describe one-day, time-dependent or temporal anomalies, not demonstrated month/day inversions. They remain included in the 379 classifier total, not double-counted. Investigate their inputs, timestamps, timezones and calendar serialization before asserting a root cause. A parser fix cannot be claimed to resolve those five based on this export.

## Reproduction and expected behavior
Use a day-first tenant (e.g. harbour.dental, en-GB) and the app/email path: 07/04/2026 means 7 April, not 4 July. Confirm the reproduction in the actual product; this repository only contains an exported KB, not production code.

## Proposed fix / acceptance
Use explicit locale/format at the shared parser boundary; reject unsupported ambiguity. Test ambiguous dates and dates with days above 12, across all tenant locales, with round trips. Verify independently from booking-v3's misleading hint, tracked separately in issue #2. Preserve existing report provenance and reconcile new reports before live migration.

## Evidence / status
`src/lib/kb/causes.ts`, tenant directory, and the signed reassessment at `src/routes/kb/incidents/4471-reassessment/+page.svx`; rendered page at `rendered/kb/incidents/4471-reassessment/index.html` and screenshot at `evidence/reassessment.png`.

Counts describe the 2026-10-04 export. Opening this issue does not mean a production fix is deployed. The desk continued merging reports after the July bulk merge.
