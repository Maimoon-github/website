import api from '@/lib/api';

export interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string;
  category_name: string;
  author_name: string;
  published_at: string;
  view_count: number;
}

export const BlogService = {
  getPosts: async (params = {}) => {
    try {
      const response = await api.get<Post[]>('/posts/', { params });
      return { data: response.data, error: null };
    } catch (error) {
      console.error('Error fetching posts:', error);
      return { data: [], error: 'Transmission failed. Buffer empty.' };
    }
  },

  getPost: async (slug: string) => {
    try {
      const response = await api.get<Post & { content: string }>(`/posts/${slug}/`);
      return { data: response.data, error: null };
    } catch (error) {
       console.error(`Error fetching post ${slug}:`, error);
       return { data: null, error: `Signal lost: Record ${slug} corrupted or missing.` };
    }
  }
};
