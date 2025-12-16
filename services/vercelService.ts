import { Project, VercelProjectResponse } from '../types';
import { VERCEL_API_TOKEN, TEAM_ID } from '../constants';

export const fetchProjects = async (): Promise<Project[]> => {
  // Verbose logging for debugging API connection issues
  console.group('🍤 Prawn Projects: API Connection Debug');
  console.log('Checking Environment Variables...');
  
  const hasToken = !!VERCEL_API_TOKEN;
  const tokenPrefix = hasToken ? VERCEL_API_TOKEN.substring(0, 5) + '...' : 'MISSING';
  
  console.log(`Token Status: ${hasToken ? 'FOUND' : 'MISSING'}`);
  console.log(`Token Preview: ${tokenPrefix}`);
  console.log(`Team ID: ${TEAM_ID || 'Not set (using personal account)'}`);

  if (!hasToken) {
    console.warn('CRITICAL: Vercel API Token is missing.');
    console.warn('Ensure your environment variable in Vercel is named correctly.');
    console.warn('Try naming it NEXT_PUBLIC_VERCEL_API_TOKEN or VITE_VERCEL_API_TOKEN to ensure it is exposed to the client.');
    console.groupEnd();
    throw new Error('Missing Vercel API Token');
  }

  const teamParam = TEAM_ID ? `?teamId=${TEAM_ID}` : '';
  const url = `https://api.vercel.com/v9/projects${teamParam}`;
  
  console.log(`Fetching from: ${url}`);
  console.groupEnd();

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${VERCEL_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Vercel API Response Error:', response.status, errorBody);
      throw new Error(`Vercel API Error: ${response.status} ${response.statusText}`);
    }

    const data: VercelProjectResponse = await response.json();

    // Map the raw Vercel response to our simplified Project type
    return data.projects.map((p: any) => {
      let liveUrl = null;

      // Helper to find the best URL from a list of aliases
      // We prioritize the SHORTEST alias, as this is usually the custom domain (example.com) 
      // or the clean project URL (project.vercel.app), avoiding the long git-hash URLs.
      const getBestAlias = (aliases: string[]) => {
        if (!aliases || aliases.length === 0) return null;
        return aliases.sort((a, b) => a.length - b.length)[0];
      };

      // Strategy 1: Check Production Target Aliases (Custom Domains live here)
      const productionAlias = getBestAlias(p.targets?.production?.alias);
      
      // Strategy 2: Check Latest Deployment Aliases
      const deploymentAlias = getBestAlias(p.latestDeployments?.[0]?.alias);

      if (productionAlias) {
        liveUrl = `https://${productionAlias}`;
      } else if (deploymentAlias) {
        liveUrl = `https://${deploymentAlias}`;
      } else if (p.targets?.production?.url) {
        // Fallback to the long generated URL if no aliases exist
        liveUrl = `https://${p.targets.production.url}`;
      }

      return {
        id: p.id,
        name: p.name,
        framework: p.framework,
        link: liveUrl || undefined,
        updatedAt: p.updatedAt,
      };
    });
  } catch (error) {
    console.error('Fetch execution failed:', error);
    throw error;
  }
};