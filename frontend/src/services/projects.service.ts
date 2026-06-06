import api from '@/lib/api';

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
      const response = await api.get<Project[]>('/projects/', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
  },

  getProject: async (slug: string) => {
    try {
      const response = await api.get<Project>(`/projects/${slug}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching project ${slug}:`, error);
      return null;
    }
  }
};
