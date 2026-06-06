import api, { PaginatedResponse } from '@/lib/api';

export interface Domain {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  order: number;
  key_concepts: string[];
}

export const KnowledgeService = {
  getDomains: async () => {
    try {
      const response = await api.get<PaginatedResponse<Domain>>('/knowledge/domains/');
      return { data: response.data.results || [], error: null };
    } catch (error) {
      console.error('Error fetching domains:', error);
      return { data: [], error: 'Neural link failed. Repository unreachable.' };
    }
  },

  getDomain: async (slug: string) => {
    try {
      const response = await api.get<Domain>(`/knowledge/domains/${slug}/`);
      return { data: response.data, error: null };
    } catch (error) {
      console.error(`Error fetching domain ${slug}:`, error);
      return { data: null, error: `Memory sector ${slug} corrupted.` };
    }
  }
};
