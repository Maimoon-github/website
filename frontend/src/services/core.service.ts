import api, { PaginatedResponse, ApiResponse } from '@/lib/api';

/**
 * Shared interfaces for essential data used across multiple pages.
 */
export interface Profile {
  id: number;
  name: string;
  tagline: string;
  bio: string;
  profile_image: string | null;
  stats_domain_count: number;
  stats_project_count: string;
  stats_experience_years: string;
  [key: string]: any; // Future-proof
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  level: number;
  [key: string]: any; // Future-proof
}

export interface PageSection {
  id: number;
  page: string;
  title: string;
  endpoint: string;
  component_type: string;
  is_active: boolean;
  order: number;
  [key: string]: any;
}

/**
 * CoreService provides shared utilities and profile-wide data fetching.
 */
export const CoreService = {
  /**
   * Fetches the user profile data.
   */
  getProfile: async (): Promise<ApiResponse<Profile>> => {
    const response = await api.get<PaginatedResponse<Profile>>('about/profile/');
    return {
      data: response.data?.results?.[0] || null,
      error: response.error,
      status: response.status
    };
  },

  /**
   * Fetches the full list of skills.
   */
  getSkills: async (): Promise<ApiResponse<Skill[]>> => {
    const response = await api.get<PaginatedResponse<Skill>>('about/skills/');
    return {
      data: response.data?.results || [],
      error: response.error,
      status: response.status
    };
  },

  /**
   * Fetches the dynamic sections configuration for a specific page.
   */
  getPageSections: async (page: string): Promise<ApiResponse<PageSection[]>> => {
    const response = await api.get<PaginatedResponse<PageSection>>(`homepage/sections/?page=${page}`);
    return {
      data: response.data?.results || [],
      error: response.error,
      status: response.status
    };
  },

  /**
   * Fetches data from a dynamic endpoint.
   */
  getDynamicData: async (endpoint: string): Promise<ApiResponse<any>> => {
    const response = await api.get<PaginatedResponse<any> | any>(endpoint);
    // Handle both paginated and direct object responses
    return {
      data: response.data?.results !== undefined ? response.data.results : response.data,
      error: response.error,
      status: response.status
    };
  }
};
