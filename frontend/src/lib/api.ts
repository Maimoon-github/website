import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export default api;

export const coreApi = {
  getAbout: () => api.get('/about/'),
  getSkills: () => api.get('/skills/'),
  getExperience: () => api.get('/experience/'),
  getEducation: () => api.get('/education/'),
};

export const projectsApi = {
  getProjects: (params = {}) => api.get('/projects/', { params }),
  getProject: (slug: string) => api.get(`/projects/${slug}/`),
  getCategories: () => api.get('/project-categories/'),
};

export const blogApi = {
  getPosts: (params = {}) => api.get('/posts/', { params }),
  getPost: (slug: string) => api.get(`/posts/${slug}/`),
  submitComment: (slug: string, data: Record<string, unknown>) => api.post(`/posts/${slug}/comment/`, data),
};

export const knowledgeApi = {
  getDomains: () => api.get('/domains/'),
  getDomain: (slug: string) => api.get(`/domains/${slug}/`),
  getLearningPaths: () => api.get('/learning-paths/'),
};
