import { readFile, writeFile } from 'node:fs/promises';
import { createCatalog } from './catalog.mjs';

if (process.argv.length !== 3) {
  throw new Error('Usage: npm run catalog:update -- path/to/project-export.json');
}
const source = JSON.parse(await readFile(process.argv[2], 'utf8'));
const catalog = createCatalog(source);
await writeFile(new URL('../data/projects.json', import.meta.url), JSON.stringify(catalog, null, 2) + '\n');
console.log(`Catalog updated: ${catalog.projects.length} public projects. Verify the links before publishing.`);
