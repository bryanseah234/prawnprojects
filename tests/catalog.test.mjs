import assert from 'node:assert/strict';
import test from 'node:test';
import { createCatalog, validateCatalog } from '../scripts/catalog.mjs';

const fixture = () => ({updatedAt: '2026-09-10T00:00:00Z', projects: [{id: 'sample', name: 'Sample', framework: 'vite', link: 'https://sample.example/'}]});

test('valid public catalogs preserve their content', () => {
  const catalog = fixture();
  assert.deepEqual(validateCatalog(catalog), catalog);
});

test('rejects private metadata and duplicate entries before a build', () => {
  for (const key of ['token', 'accountId', 'env', 'deployment']) {
    const catalog = fixture();
    catalog.projects[0][key] = 'synthetic-private-field';
    assert.throws(() => validateCatalog(catalog));
  }
  const catalog = fixture();
  catalog.projects.push({...catalog.projects[0]});
  assert.throws(() => validateCatalog(catalog), /Duplicate/);
  assert.throws(() => validateCatalog({...fixture(), token: 'synthetic'}), /non-public/);
});

test('rejects executable, authenticated and parameterized destinations', () => {
  for (const link of ['javascript:alert(1)', 'http://sample.example/', 'https://user:password@sample.example/', 'https://sample.example/?token=synthetic', 'https://127.0.0.1/', 'https://sample.local/', 'https://sample.example:3000/']) {
    const catalog = fixture();
    catalog.projects[0].link = link;
    assert.throws(() => validateCatalog(catalog), link);
  }
});

test('exports every deployed public project beyond the old first page', () => {
  const source = {checkedAt: fixture().updatedAt, projects: Array.from({length: 26}, (_, i) => ({name: `site-${i}`, framework: null, ready: 'READY', domains: [`site-${i}.vercel.app`], accountId: 'synthetic-private'}))};
  const result = createCatalog(source);
  assert.equal(result.projects.length, 26);
  assert(result.projects.every(project => !('accountId' in project)));
});

test('uses exact preferred domains and excludes undeployed or protected aliases', () => {
  const result = createCatalog({checkedAt: fixture().updatedAt, projects: [
    {name: 'sample', ready: 'READY', domains: ['sample-git-main-theprawnvercel.vercel.app', 'sample.vercel.app', 'sample.hong-yi.me', 'hong-yi.me.evil.example']},
    {name: 'web', ready: null, domains: []},
    {name: 'private', ready: 'READY', domains: ['private-theprawnvercel.vercel.app']},
  ]});
  assert.deepEqual(result.projects, [{id: 'sample', name: 'sample', framework: null, link: 'https://sample.hong-yi.me/'}]);
});
