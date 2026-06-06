import api, { ApiResponse } from '@/lib/api';

/**
 * Contact interfaces.
 */
export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * ContactService handles form submissions and contact information.
 */
export const ContactService = {
  /**
   * Submits a contact message to the backend.
   */
  submitMessage: async (data: ContactMessage): Promise<ApiResponse<any> & { success: boolean }> => {
    const response = await api.post('contact/messages/', data);
    return {
      ...response,
      success: !response.error
    };
  }
};
