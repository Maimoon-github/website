import api from '@/lib/api';

export const ContactService = {
  submitMessage: async (data: { name: string; email: string; subject: string; message: string }) => {
    try {
      const response = await api.post('/contact/', data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error submitting contact form:', error);
      return { success: false, error };
    }
  }
};
