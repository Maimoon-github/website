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
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
  },

  getPost: async (slug: string) => {
    try {
      const response = await api.get<Post & { content: string }>(`/posts/${slug}/`);
      return response.data;
    } catch (error) {
       console.error(`Error fetching post ${slug}:`, error);
       return null;
    }
  }
};
