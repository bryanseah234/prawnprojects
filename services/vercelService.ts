import catalog from '../data/projects.json';
import type { Project } from '../types';

// The catalog is validated during the build and ships with the application.
// This module performs no account API calls and reads no environment values.
export const projects: Project[] = catalog.projects;
export const catalogUpdatedAt = catalog.updatedAt;
