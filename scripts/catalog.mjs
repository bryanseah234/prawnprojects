import assert from 'node:assert/strict';

const keysAre = (value, keys) => Object.keys(value).every(key => keys.includes(key));

export function validateCatalog(catalog) {
  assert(catalog && typeof catalog === 'object' && !Array.isArray(catalog), 'Catalog must be an object');
  assert(keysAre(catalog, ['updatedAt', 'projects']), 'Catalog contains non-public metadata');
  assert(typeof catalog.updatedAt === 'string' && !Number.isNaN(Date.parse(catalog.updatedAt)), 'Catalog needs an update date');
  assert(Array.isArray(catalog.projects) && catalog.projects.length > 0, 'Catalog must contain projects');
  const ids = new Set();
  for (const project of catalog.projects) {
    assert(project && typeof project === 'object' && !Array.isArray(project), 'Invalid project');
    assert(keysAre(project, ['id', 'name', 'framework', 'link']), 'Project contains non-public metadata');
    assert(typeof project.id === 'string' && /^[a-z0-9-]+$/.test(project.id), 'Use a public slug as the project ID');
    assert(!ids.has(project.id), 'Duplicate project ID');
    ids.add(project.id);
    assert(typeof project.name === 'string' && project.name.trim().length > 0, 'Project needs a name');
    assert(project.framework === null || typeof project.framework === 'string', 'Invalid framework');
    assert(typeof project.link === 'string', 'Project needs a public URL');
    const url = new URL(project.link);
    assert(url.protocol === 'https:' && !url.username && !url.password && !url.port && !url.search && !url.hash, 'Use a public HTTPS URL without credentials or parameters');
    assert(url.pathname === '/', 'Use the canonical homepage');
    assert(url.hostname.includes('.') && !url.hostname.endsWith('.local') && !/^\d+(\.\d+){3}$/.test(url.hostname), 'Use a public hostname');
  }
  return catalog;
}

export function createCatalog(source) {
  assert(Array.isArray(source.projects), 'Expected a complete project export');
  const projects = source.projects.flatMap(project => {
    if (project.ready !== 'READY') return [];
    const domains = (project.domains || []).filter(domain =>
      typeof domain === 'string' && /^[a-z0-9.-]+$/.test(domain) &&
      !domain.includes('-git-') && !domain.includes('-theprawnvercel.'));
    const preferred = domains.find(domain => domain === `${project.name}.hong-yi.me`);
    const custom = domains.filter(domain => !domain.endsWith('.vercel.app')).sort((a, b) => a.length - b.length || a.localeCompare(b));
    const canonical = domains.find(domain => domain === `${project.name}.vercel.app`);
    const link = preferred || custom[0] || canonical || domains[0];
    if (!link) return [];
    // Explicit projection: no account IDs, deployment records, tokens or environment values.
    return [{id: project.name, name: project.name, framework: project.framework ?? null, link: `https://${link}/`}];
  }).sort((a, b) => a.name.localeCompare(b.name));
  return validateCatalog({updatedAt: source.checkedAt, projects});
}
