import { AboutData, Service, ContactInfo, ContactMessage } from '../types';

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
    subtitle: string;
    content: string;
  } | null;
  journey: Array<{
    phase_number: number;
    title: string;
    subtitle: string;
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

export async function getAboutData(): Promise<AboutData> {
  const data = await fetchAPI('/about/');
  return data || { section: null, team: [] };
}

export async function getServices(): Promise<Service[]> {
  const data = await fetchAPI('/services/');
  return data || [];
}

export async function getContactInfo(): Promise<ContactInfo | null> {
  const data = await fetchAPI('/contact/info/');
  // Since info is a list view, we expect an array
  if (Array.isArray(data) && data.length > 0) {
    return data[0];
  }
  return null;
}

export async function sendContactMessage(message: ContactMessage): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/contact/message/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
    return res.ok;
  } catch (error) {
    console.error('Error sending contact message:', error);
    return false;
  }
}
