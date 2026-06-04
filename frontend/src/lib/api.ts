const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });

    if (!res.ok) {
        throw new Error(`API error: ${res.statusText}`);
    }

    return res.json();
}

// Interfaces
export interface HeroSection {
    id: number;
    title: string;
    subtitle: string;
    cta_primary_text: string;
    cta_primary_link: string;
    cta_secondary_text: string;
    cta_secondary_link: string;
    background_image: string | null;
}

export interface Service {
    id: number;
    title: string;
    slug: string;
    short_description: string;
    detailed_description: string;
    icon_name: string;
    price_starting_at: string;
}

export interface Project {
    id: number;
    title: string;
    slug: string;
    client_name: string;
    description: string;
    completion_date: string;
    website_url: string;
    is_featured: boolean;
    cover_image: string | null;
}

export interface BlogPost {
    id: number;
    title: string;
    slug: string;
    author: { username: string };
    content: string;
    excerpt: string;
    featured_image: string | null;
    published_at: string;
}

export interface TeamMember {
    id: number;
    name: string;
    role: string;
    bio: string;
    photo: string | null;
    linkedin_url: string;
    twitter_url: string;
}

// Fetchers
export const getHomeHero = (): Promise<HeroSection[]> => fetchAPI('/home/');
export const getServices = (): Promise<Service[]> => fetchAPI('/services/');
export const getProjects = (): Promise<Project[]> => fetchAPI('/projects/');
export const getBlogPosts = (): Promise<BlogPost[]> => fetchAPI('/blog/');
export const getTeamMembers = (): Promise<TeamMember[]> => fetchAPI('/about/team/');

export const sendContactMessage = (data: any) => fetchAPI('/contact/message/', {
    method: 'POST',
    body: JSON.stringify(data),
});
