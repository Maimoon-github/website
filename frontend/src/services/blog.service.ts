import api, { PaginatedResponse, ApiResponse } from '@/lib/api';

/**
 * Blog interfaces.
 */
export interface Post {
  id: number;
  title: string;
  slug: string;
  author_name: string;
  category: number;
  category_name: string;
  tags: Array<{ id: number; name: string; slug: string }>;
  featured_image: string | null;
  excerpt: string;
  content: string;
  published_at: string;
  view_count: number;
  reading_time: string;
  [key: string]: any;
}

/**
 * BlogService handles fetching blog posts, categories, and tags.
 */
export const BlogService = {
  /**
   * Fetches a list of blog posts with search and filter capabilities.
   */
  getPosts: async (params?: { search?: string; category?: string; tag?: string }): Promise<ApiResponse<Post[]>> => {
    let endpoint = 'blog/posts/';
    const queryParts = [];
    if (params?.search) queryParts.push(`search=${params.search}`);
    if (params?.category) queryParts.push(`category=${params.category}`);
    if (params?.tag) queryParts.push(`tag=${params.tag}`);
    if (queryParts.length > 0) endpoint += `?${queryParts.join('&')}`;

    const response = await api.get<PaginatedResponse<Post>>(endpoint);
    return {
      data: response.data?.results || [],
      error: response.error,
      status: response.status
    };
  },

  /**
   * Fetches a single post by its slug.
   */
  getPost: async (slug: string): Promise<ApiResponse<Post>> => {
    return api.get<Post>(`blog/posts/${slug}/`);
  },

  /**
   * Submits a comment to a specific post.
   */
  submitComment: async (slug: string, data: { name: string; email: string; content: string }): Promise<ApiResponse<any>> => {
    return api.post(`blog/posts/${slug}/comment/`, data);
  }
};
