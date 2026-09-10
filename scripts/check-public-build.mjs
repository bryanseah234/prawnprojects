import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';

async function outputFiles(directory) {
  const entries = await readdir(directory, {withFileTypes: true});
  const paths = await Promise.all(entries.map(entry => {
    const url = new URL(entry.name + (entry.isDirectory() ? '/' : ''), directory);
    return entry.isDirectory() ? outputFiles(url) : [url];
  }));
  return paths.flat();
}

for (const file of await outputFiles(new URL('../dist/', import.meta.url))) {
  if (!/\.(js|css|html)$/.test(file.pathname)) continue;
  const text = await readFile(file, 'utf8');
  assert(!/api\.vercel\.com|VERCEL_API_TOKEN|GEMINI_API_KEY|synthetic-catalog-credential/.test(text), 'Build contains an account API or credential marker');
  assert(!/cdn\.tailwindcss\.com|type=["']importmap/.test(text), 'Build contains a browser runtime compiler/import map');
}
console.log('Public build passed: no account API, credential markers or browser CSS compiler.');
