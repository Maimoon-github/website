import api, { PaginatedResponse } from '@/lib/api';

export interface Project {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  category_name: string;
  tech_stack: string[];
  featured_image: string;
  is_featured: boolean;
  github_url?: string;
  live_url?: string;
}

export const ProjectService = {
  getProjects: async (params = {}) => {
    try {
      const response = await api.get<PaginatedResponse<Project>>('/projects/list/', { params });
      return { data: response.data.results || [], error: null };
    } catch (error) {
      console.error('Error fetching projects:', error);
      return { data: [], error: 'Failed to fetch projects. Node offline.' };
    }
  },

  getProject: async (slug: string) => {
    try {
      const response = await api.get<Project>(`/projects/list/${slug}/`);
      return { data: response.data, error: null };
    } catch (error) {
      console.error(`Error fetching project ${slug}:`, error);
      return { data: null, error: `Critical failure: Target ${slug} inaccessible.` };
    }
  }
};
