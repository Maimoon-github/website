import api, { PaginatedResponse, ApiResponse } from '@/lib/api';

/**
 * Detailed information for the About page.
 */
export interface Experience {
  id: number;
  company: string;
  role: string;
  start_date: string;
  end_date: string | null;
  description: string;
  [key: string]: any;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  start_date: string;
  end_date: string | null;
  field_of_study: string;
  [key: string]: any;
}

/**
 * AboutService provides comprehensive data for the profile and bios.
 */
export const AboutService = {
  /**
   * Fetches professional experience history.
   */
  getExperience: async (): Promise<ApiResponse<Experience[]>> => {
    const response = await api.get<PaginatedResponse<Experience>>('about/experience/');
    return {
      data: response.data?.results || [],
      error: response.error,
      status: response.status
    };
  },

  /**
   * Fetches academic background history.
   */
  getEducation: async (): Promise<ApiResponse<Education[]>> => {
    const response = await api.get<PaginatedResponse<Education>>('about/education/');
    return {
      data: response.data?.results || [],
      error: response.error,
      status: response.status
    };
  }
};
