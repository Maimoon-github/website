/**
 * Central API Client for Antigravity Frontend
 * Handles fetching, error parsing, and Next.js caching integration.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/';

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status?: number;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export type FetchOptions = RequestInit & {
  revalidate?: number | false;
  tags?: string[];
};

class ApiClient {
  private async request<T>(
    endpoint: string,
    options: FetchOptions = {}
  ): Promise<ApiResponse<T>> {
    const { revalidate, tags, ...restOptions } = options;
    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...restOptions,
        headers: {
          'Content-Type': 'application/json',
          ...restOptions.headers,
        },
        next: {
          revalidate: revalidate !== undefined ? revalidate : 3600, // Default 1 hour
          tags,
        },
      });

      if (!response.ok) {
        let errorMessage = `API Error: ${response.status} ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.detail || errorData.message || errorMessage;
        } catch {
          // Fallback if not JSON
        }
        return { data: null, error: errorMessage, status: response.status };
      }

      // Handle empty responses (204 No Content)
      if (response.status === 204) {
        return { data: null, error: null, status: 204 };
      }

      const data = await response.json();
      return { data, error: null, status: response.status };
    } catch (error) {
      console.error(`Fetch error for ${url}:`, error);
      return { 
        data: null, 
        error: error instanceof Error ? error.message : 'Network connection failed.',
        status: 500 
      };
    }
  }

  async get<T>(endpoint: string, options?: FetchOptions) {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  async post<T>(endpoint: string, body: any, options?: FetchOptions) {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  async put<T>(endpoint: string, body: any, options?: FetchOptions) {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  async patch<T>(endpoint: string, body: any, options?: FetchOptions) {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  }

  async delete<T>(endpoint: string, options?: FetchOptions) {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

const api = new ApiClient();
export default api;
