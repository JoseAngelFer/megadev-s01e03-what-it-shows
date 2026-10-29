# S01E03 deliverable

Public repo: https://github.com/JoseAngelFer/megadev-s01e03-what-it-shows

- [Parser issue: 379 reports](https://github.com/JoseAngelFer/megadev-s01e03-what-it-shows/issues/1)
- [Form hint issue: 33 reports](https://github.com/JoseAngelFer/megadev-s01e03-what-it-shows/issues/2)
- [Signed reassessment source](src/routes/kb/incidents/4471-reassessment/+page.svx)
- [Desk-visible HTML](rendered/kb/incidents/4471-reassessment/index.html) — download/open locally; GitHub displays its source rather than serving it as a website.
- [Full-page rendered screenshot](evidence/reassessment.png)
- [Computed counts and report membership](evidence/analysis.json)
- [Proposed replacement decision](src/routes/kb/decisions/0002-evidence-based-dedupe/+page.svx)

Reproduce with `npm ci && npm run build` (Node 22). Build runs the actual exported TypeScript helpers through Vite and compiles .svx/Svelte with mdsvex, including the original layout, components and RenderStamp. HTML is a static server-rendered snapshot; the explorer's initial state and example table are rendered, but controls are not hydrated. Route links assume the `rendered/` directory is served with directory indexes at the web root. No hosted site or GitHub Pages is required.

The original accepted decision is unchanged. Incident and triage pages have correction/review notices; proposed decision 0002 awaits desk approval. No production system has been changed. Counts are export-specific, not live. Five unusual reports remain explicitly unresolved within the classifier's parser total.

---

# kb — the support knowledge base

**kb** = knowledge base. What the support desk knows about how our products break, written
down where the code can keep it honest.

One desk takes reports for every product we run: `sched-prod` (calendar invites for about
300k people) and the rest. When something
goes wrong, the reports reach the desk first. This kb is how the desk triages them, what each
incident turned out to be, and why we decided what we decided.

## What's here

```
src/routes/kb/      the pages (.svx: Markdown with components)
  triage/           how the desk handles incoming reports
  incidents/        one page per big ticket
  decisions/        numbered decision records
src/lib/kb/         components and the logic they run
src/lib/layouts/    the frame every page shares
src/lib/data/       exports from the ticket system
```

## Conventions

- Words in the page, logic in `src/lib` (imported as `#lib/…`). A number that can be computed belongs in a component.
- Every page starts with frontmatter: `title`, `owner`, `status`, `reviewed`.
- A decision is never edited after it is accepted. A new record replaces it.
- A page you add is signed: its frontmatter carries your `signature` and it ends with `<RenderStamp {signature} />`, so the desk knows who wrote it.

## Owners

Support desk. Decision records: whoever signed them.

---

Exported 2026-10-04 from the `support` repo, `apps/kb/` → `src/`.
