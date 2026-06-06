import api from '@/lib/api';

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
      const response = await api.get<Domain[]>('/domains/');
      return response.data;
    } catch (error) {
      console.error('Error fetching domains:', error);
      return [];
    }
  },

  getDomain: async (slug: string) => {
    try {
      const response = await api.get<Domain>(`/domains/${slug}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching domain ${slug}:`, error);
      return null;
    }
  }
};
