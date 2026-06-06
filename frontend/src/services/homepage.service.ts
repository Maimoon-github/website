import api, { PaginatedResponse, ApiResponse } from '@/lib/api';

/**
 * Interfaces for Homepage components.
 */
export interface HeroContent {
  id: number;
  title: string;
  tagline: string;
  description: string;
  primary_cta_text: string;
  primary_cta_link: string;
  secondary_cta_text: string;
  secondary_cta_link: string;
  is_active: boolean;
  [key: string]: unknown;
}

export interface StatCounter {
  id: number;
  label: string;
  value: string;
  icon: string;
  [key: string]: unknown;
}

/**
 * HomepageService provides data for the landing page.
 */
export const HomepageService = {
  /**
   * Fetches the primary hero section content.
   */
  getHeroContent: async (): Promise<ApiResponse<HeroContent>> => {
    const response = await api.get<PaginatedResponse<HeroContent>>('homepage/hero/');
    return {
      data: response.data?.results?.[0] || null,
      error: response.error,
      status: response.status
    };
  },

  /**
   * Fetches the statistics counters for the homepage.
   */
  getStats: async (): Promise<ApiResponse<StatCounter[]>> => {
    const response = await api.get<PaginatedResponse<StatCounter>>('homepage/stats/');
    return {
      data: response.data?.results || [],
      error: response.error,
      status: response.status
    };
  }
};
