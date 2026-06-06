import api, { PaginatedResponse } from '@/lib/api';

export interface Profile {
  id: number;
  name: string;
  tagline: string;
  bio: string;
  profile_image: string | null;
  stats_domain_count: number;
  stats_project_count: string;
  stats_experience_years: string;
}

export const CoreService = {
  getProfile: async () => {
    try {
      const response = await api.get<PaginatedResponse<Profile>>('/about/profile/');
      return { data: response.data.results[0] || null, error: null };
    } catch (error) {
      console.error('Error fetching profile:', error);
      return { data: null, error: 'Profile unavailable.' };
    }
  },

  getSkills: async () => {
     try {
       const response = await api.get<PaginatedResponse<any>>('/about/skills/');
       return { data: response.data.results, error: null };
     } catch {
       return { data: [], error: 'Skills inaccessible.' };
     }
  }
};
