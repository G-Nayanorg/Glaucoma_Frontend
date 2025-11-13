/**
 * API Configuration
 * Centralized configuration for all API endpoints and settings
 */

export const API_CONFIG = {
  // Base URLs from environment variables
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api',
  authURL: process.env.NEXT_PUBLIC_AUTH_API_URL || 'http://localhost:4000/api/auth',

  // Timeout settings
  timeout: 30000, // 30 seconds

  // Retry settings
  retry: {
    maxRetries: 3,
    retryDelay: 1000, // 1 second
  },

  // API Endpoints
  endpoints: {
    auth: {
      login: '/auth/login',
      register: '/auth/register',
      logout: '/auth/logout',
      refresh: '/auth/refresh',
      me: '/auth/me',
    },
    users: {
      list: '/users',
      detail: (id: string) => `/users/${id}`,
      create: '/users',
      update: (id: string) => `/users/${id}`,
      delete: (id: string) => `/users/${id}`,
    },
    dashboard: {
      stats: '/dashboard/stats',
      recentActivity: '/dashboard/recent-activity',
    },
  },

  // Headers
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
} as const;

/**
 * Get full API URL
 */
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.baseURL}${endpoint}`;
};

/**
 * Get authorization header
 */
export const getAuthHeader = (token: string): Record<string, string> => {
  return {
    'Authorization': `Bearer ${token}`,
  };
};
