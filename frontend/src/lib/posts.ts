import { BlogPost } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
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

export async function getPosts(): Promise<BlogPost[]> {
  const data = await fetchAPI('/blog/');
  return data || [];
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return fetchAPI(`/blog/${slug}/`);
}
