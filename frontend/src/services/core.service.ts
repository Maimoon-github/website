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
  }
};
