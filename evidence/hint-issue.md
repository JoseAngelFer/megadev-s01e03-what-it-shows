## Problem
booking-v3 prints MM/DD/YYYY under the date field, while the form reads the input using its day-first tenant's order. People follow the hint and get the wrong date. This is distinct from the shared parser bug in issue #1.

## Report count: 33 unique reports
33 deduplicated reports in #4471, across alder.physio (de-DE), copper.studio (es-ES), and pale.harbour (pt-PT). All are channel=form and booking-v3 on a day-first tenant. The other 379 reports belong to the parser classifier group, including its five explicitly unresolved anomalies.

Computed with the supplied `causeOf`, `groupByCause`, tenant directory and Intl locale order after `uniqueById`. Browser locale and intake tags are not the cause: intake called 15 of these parser and only 18 hint. Full membership: `evidence/analysis.json`.

## Examples
- R-41230, copper.studio: 1 June instead of 6 January.
- R-41241, alder.physio: people arrived 8 June for bookings on 6 August.
- R-41251, pale.harbour: 7 January showed as 1 July.

## Reproduction and expected behavior
For a day-first booking-v3 tenant, follow the displayed month-first instruction with an ambiguous date (e.g. type 06/01/2026 for June 1). A day-first interpretation turns it into January 6. Confirm the reproduction in the product; this export is not production source. The displayed format and actual interpretation must agree.

## Proposed fix / acceptance
Generate the hint and validation from the same tenant-aware format used by the form parser. Test each affected tenant, ambiguous inputs, days above 12 and the v2/v3 distinction. Test that an app report and a form report with identical subjects in alder.physio remain separate mechanisms. Do not mark this resolved just because the shared parser changes.

## Evidence / status
`src/lib/kb/causes.ts` (DATE_HINT and causeOf), tenant files, reports, signed reassessment at `src/routes/kb/incidents/4471-reassessment/+page.svx`, rendered HTML and screenshot in this repository.

Counts describe the 2026-10-04 export; the desk continued working afterward. Reconcile new reports before live migration. No production fix is claimed.
