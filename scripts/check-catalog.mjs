import { readFile } from 'node:fs/promises';
import { validateCatalog } from './catalog.mjs';

const catalog = validateCatalog(JSON.parse(await readFile(new URL('../data/projects.json', import.meta.url), 'utf8')));
console.log(`Catalog validated: ${catalog.projects.length} public projects.`);
