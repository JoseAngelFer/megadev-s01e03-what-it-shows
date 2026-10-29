import { createServer } from 'vite';
import { mkdir, writeFile } from 'node:fs/promises';
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { analyze } = await server.ssrLoadModule('/scripts/analyze.ts');
  const analysis = analyze();
  if (analysis.uniqueReports !== 412 || analysis.groups.reduce((n, g) => n + g.count, 0) !== 412) throw new Error('Count reconciliation failed');
  await mkdir('evidence', { recursive: true });
  await writeFile('evidence/analysis.json', JSON.stringify(analysis, null, 2) + '\n');
  const { renderPages } = await server.ssrLoadModule('/scripts/render.ts');
  for (const page of renderPages()) {
    const dir = `rendered/${page.route}`;
    await mkdir(dir, { recursive: true });
    await writeFile(`${dir}/index.html`, page.html);
    console.log(`Rendered /${page.route}`);
  }
} finally {
  await server.close();
}
