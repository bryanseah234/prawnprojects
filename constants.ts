import { Project } from "./types";

// In a real Vercel deployment, these would come from process.env
export const VERCEL_API_TOKEN = process.env.REACT_APP_VERCEL_API_TOKEN || process.env.VERCEL_API_TOKEN || '';
export const TEAM_ID = process.env.REACT_APP_TEAM_ID || process.env.NEXT_PUBLIC_TEAM_ID || '';
