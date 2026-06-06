import api, { PaginatedResponse, ApiResponse } from '@/lib/api';

/**
 * Knowledge base interfaces.
 */
export interface Domain {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string | null;
  order: number;
  key_concepts: string[];
  tools: Array<any>;
  [key: string]: any;
}

/**
 * KnowledgeService handles fetching technical domains and learning paths.
 */
export const KnowledgeService = {
  /**
   * Fetches all technical domains.
   */
  getDomains: async (): Promise<ApiResponse<Domain[]>> => {
    const response = await api.get<PaginatedResponse<Domain>>('knowledge/domains/');
    return {
      data: response.data?.results || [],
      error: response.error,
      status: response.status
    };
  },

  /**
   * Fetches a single domain by its slug.
   */
  getDomain: async (slug: string): Promise<ApiResponse<Domain>> => {
    return api.get<Domain>(`knowledge/domains/${slug}/`);
  },

  /**
   * Fetches learning paths.
   */
  getLearningPaths: async (): Promise<ApiResponse<PaginatedResponse<any>>> => {
    return api.get<PaginatedResponse<any>>('knowledge/learning-paths/');
  }
};
