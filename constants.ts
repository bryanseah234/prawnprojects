import { Project } from "./types";

// In a real Vercel deployment, these would come from process.env
// We check multiple variations to ensure compatibility with Vite, Next.js, and raw React builds
export const VERCEL_API_TOKEN = 
  process.env.REACT_APP_VERCEL_API_TOKEN || 
  process.env.NEXT_PUBLIC_VERCEL_API_TOKEN || 
  process.env.VITE_VERCEL_API_TOKEN || 
  process.env.VERCEL_API_TOKEN || 
  '';

export const TEAM_ID = 
  process.env.REACT_APP_TEAM_ID || 
  process.env.NEXT_PUBLIC_TEAM_ID || 
  process.env.VITE_TEAM_ID ||
  process.env.TEAM_ID || 
  '';