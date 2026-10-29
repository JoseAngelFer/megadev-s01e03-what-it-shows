import { render } from 'svelte/server';
const pages = import.meta.glob('/src/routes/kb/**/+page.svx', { eager: true });
export function renderPages() {
  return Object.entries(pages).map(([path, mod]: [string, any]) => {
    const result = render(mod.default);
    return {
      route: path.replace('/src/routes/', '').replace('/+page.svx', ''),
      html: `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">${result.head}</head><body>${result.body}</body></html>`
    };
  });
}
