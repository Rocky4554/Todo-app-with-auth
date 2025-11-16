import { apiClient } from './client';
import type {
  SignupInput,
  LoginInput,
  ForgotPasswordInput,
  ResetPasswordInput
} from '../schemas/auth.schema';
export const authApi = {
  signup: async (data: SignupInput) => {
    const response = await apiClient.post('/auth/signup', data);
    return response.data;
  },

  login: async (data: LoginInput) => {
    const response = await apiClient.post('/auth/login', data);
    return response.data;
  },

  forgotPassword: async (data: ForgotPasswordInput) => {
    const response = await apiClient.post('/auth/forgot-password', data);
    return response.data;
  },

  resetPassword: async (data: ResetPasswordInput) => {
    const response = await apiClient.post('/auth/reset-password', data);
    return response.data;
  }
};