import { Project } from "./types";

// Helper to safely access environment variables across different build tools (Vite, Next.js, CRA)
const getEnvVar = (key: string): string | undefined => {
  // Check Vite's import.meta.env
  // @ts-ignore - import.meta is a Vite/ESM feature
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
    // @ts-ignore
    return import.meta.env[key];
  }
  
  // Check standard process.env
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
  }

  return undefined;
};

// We check all common prefixes to ensure the token is found regardless of how the user named it in Vercel
export const VERCEL_API_TOKEN = 
  getEnvVar('REACT_APP_VERCEL_API_TOKEN') || 
  getEnvVar('NEXT_PUBLIC_VERCEL_API_TOKEN') || 
  getEnvVar('VITE_VERCEL_API_TOKEN') || 
  getEnvVar('VERCEL_API_TOKEN') || 
  '';

export const TEAM_ID = 
  getEnvVar('REACT_APP_TEAM_ID') || 
  getEnvVar('NEXT_PUBLIC_TEAM_ID') || 
  getEnvVar('VITE_TEAM_ID') ||
  getEnvVar('TEAM_ID') || 
  '';