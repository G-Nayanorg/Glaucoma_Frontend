/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

import { post } from '@/utils/api.util';
import { API_CONFIG } from '@/config/api.config';
import type {
  LoginCredentials,
  RegisterData,
  AuthResponse,
  PasswordResetRequest,
} from '../types';

/**
 * Login user
 * @param credentials - User login credentials
 * @returns Auth response with user data and token
 */
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  try {
    const response = await post<AuthResponse>(
      API_CONFIG.endpoints.auth.login,
      credentials
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Register new user
 * @param data - User registration data
 * @returns Auth response with user data and token
 */
export async function register(data: RegisterData): Promise<AuthResponse> {
  try {
    const response = await post<AuthResponse>(
      API_CONFIG.endpoints.auth.register,
      data
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Logout user
 * Clears authentication token on the server
 */
export async function logout(token: string): Promise<void> {
  try {
    await post(
      API_CONFIG.endpoints.auth.logout,
      {},
      { token }
    );
  } catch (error) {
    console.error('Logout error:', error);
    // Continue with local logout even if server logout fails
  }
}

/**
 * Get current user data
 * @param token - Authentication token
 * @returns User data
 */
export async function getCurrentUser(token: string): Promise<AuthResponse['user']> {
  try {
    const response = await post<AuthResponse['user']>(
      API_CONFIG.endpoints.auth.me,
      {},
      { token }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Request password reset
 * @param data - Email for password reset
 */
export async function requestPasswordReset(
  data: PasswordResetRequest
): Promise<{ message: string }> {
  try {
    const response = await post<{ message: string }>(
      '/auth/password-reset',
      data
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Refresh authentication token
 * @param refreshToken - Refresh token
 * @returns New auth token
 */
export async function refreshAuthToken(
  refreshToken: string
): Promise<{ token: string }> {
  try {
    const response = await post<{ token: string }>(
      API_CONFIG.endpoints.auth.refresh,
      { refreshToken }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}
