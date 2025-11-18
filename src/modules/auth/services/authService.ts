/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

import { API_CONFIG, getApiUrl } from '@/config/api.config';
import type {
  LoginCredentials,
  RegisterData,
  AuthResponse,
  User,
  PasswordResetRequest,
  RefreshTokenRequest,
} from '../types';

/**
 * Login user
 * @param credentials - User login credentials (username and password)
 * @returns Auth response with tokens and user data
 */
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  try {
    // Backend expects application/x-www-form-urlencoded format
    const formData = new URLSearchParams();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);

    const response = await fetch(getApiUrl(API_CONFIG.endpoints.auth.login), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Login failed');
    }

    const data: AuthResponse = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

/**
 * Register new user
 * @param data - User registration data
 * @returns Auth response with tokens and user data
 */
export async function register(data: RegisterData): Promise<AuthResponse> {
  try {
    const response = await fetch(getApiUrl(API_CONFIG.endpoints.auth.register), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        username: data.username,
        password: data.password,
        first_name: data.first_name,
        last_name: data.last_name,
        tenant_id: data.tenant_id || 'default',
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Registration failed');
    }

    const authData: AuthResponse = await response.json();
    return authData;
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
    await fetch(getApiUrl(API_CONFIG.endpoints.auth.logout), {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
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
export async function getCurrentUser(token: string): Promise<User> {
  try {
    const response = await fetch(getApiUrl(API_CONFIG.endpoints.auth.me), {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to fetch user data');
    }

    const userData: User = await response.json();
    return userData;
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
    const response = await fetch(getApiUrl('/auth/password-reset'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Password reset request failed');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

/**
 * Refresh authentication token
 * @param refreshToken - Refresh token
 * @returns New auth response with new tokens
 */
export async function refreshAuthToken(
  refreshToken: string
): Promise<AuthResponse> {
  try {
    const response = await fetch(getApiUrl(API_CONFIG.endpoints.auth.refresh), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Token refresh failed');
    }

    const data: AuthResponse = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
