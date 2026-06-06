import api, { PaginatedResponse, ApiResponse } from '@/lib/api';

/**
 * Project and Category interfaces.
 */
export interface Project {
  id: number;
  title: string;
  slug: string;
  category: number;
  category_name: string;
  short_description: string;
  description: string;
  featured_image: string | null;
  tech_stack: string[];
  github_url: string | null;
  live_url: string | null;
  is_featured: boolean;
  screenshots: Array<{ id: number; image: string; caption: string }>;
  created_at: string;
  [key: string]: unknown;
}

export interface ProjectCategory {
  id: number;
  name: string;
  slug: string;
  [key: string]: unknown;
}

/**
 * ProjectService handles fetching portfolio projects and categories.
 */
export const ProjectService = {
  /**
   * Fetches a list of projects with optional filtering.
   */
  getProjects: async (params?: { featured?: boolean; category?: string }): Promise<ApiResponse<Project[]>> => {
    let endpoint = 'projects/list/';
    const queryParts = [];
    if (params?.featured !== undefined) queryParts.push(`featured=${params.featured}`);
    if (params?.category) queryParts.push(`category=${params.category}`);
    if (queryParts.length > 0) endpoint += `?${queryParts.join('&')}`;
    
    const response = await api.get<PaginatedResponse<Project>>(endpoint);
    return {
      data: response.data?.results || [],
      error: response.error,
      status: response.status
    };
  },

  /**
   * Fetches a single project by its slug.
   */
  getProject: async (slug: string): Promise<ApiResponse<Project>> => {
    return api.get<Project>(`projects/list/${slug}/`);
  },

  /**
   * Fetches all project categories.
   */
  getCategories: async (): Promise<ApiResponse<ProjectCategory[]>> => {
    const response = await api.get<PaginatedResponse<ProjectCategory>>('projects/categories/');
    return {
      data: response.data?.results || [],
      error: response.error,
      status: response.status
    };
  }
};
