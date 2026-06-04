import { BlogPost, Project } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface HomeData {
  hero: {
    title: string;
    title_accent: string;
    system_status: string;
    description: string;
    tech_stack: string;
    protocol_text: string;
    protocol_link: string;
    architecture_text: string;
    architecture_link: string;
    hero_image: string | null;
  } | null;
  bio: {
    title: string;
    content: string;
  } | null;
  journey: Array<{
    phase_number: number;
    title: string;
    description: string;
  }>;
}

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`API error: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Fetch error for ${endpoint}:`, error);
    return null;
  }
}

export async function getHomeData(): Promise<HomeData> {
  const data = await fetchAPI('/home/');
  return data || { hero: null, bio: null, journey: [] };
}
