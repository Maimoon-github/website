import api, { PaginatedResponse } from '@/lib/api';

export interface HeroContent {
  id: number;
  title: string;
  tagline: string;
  description: string;
  primary_cta_text: string;
  primary_cta_link: string;
  secondary_cta_text: string;
  secondary_cta_link: string;
}

export interface StatCounter {
  id: number;
  label: string;
  value: string;
  icon: string;
  order: number;
}

export const HomepageService = {
  getHeroContent: async () => {
    try {
      const response = await api.get<PaginatedResponse<HeroContent>>('/homepage/hero/');
      return { data: response.data.results[0] || null, error: null };
    } catch (error) {
      console.error('Error fetching hero content:', error);
      return { data: null, error: 'Hero content unavailable.' };
    }
  },

  getStats: async () => {
    try {
      const response = await api.get<PaginatedResponse<StatCounter>>('/homepage/stats/');
      return { data: response.data.results || [], error: null };
    } catch (error) {
      console.error('Error fetching stats:', error);
      return { data: [], error: 'Stats unavailable.' };
    }
  }
};
