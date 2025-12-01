/**
 * API Utility Functions
 * Reusable fetch wrapper with error handling and TypeScript support
 */

import { API_CONFIG } from '@/config/api.config';
import { useAuthStore } from '@/store/authStore';

/**
 * API Error class for typed error handling
 */
export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * API Response type
 */
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

/**
 * Fetch options interface
 */
interface FetchOptions extends RequestInit {
  token?: string;
  params?: Record<string, string | number | boolean>;
  skipAuth?: boolean;
}

/**
 * Build query string from params object
 */
const buildQueryString = (params: Record<string, string | number | boolean>): string => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    searchParams.append(key, String(value));
  });
  return searchParams.toString();
};

/**
 * Generic fetch wrapper with error handling
 */
export async function fetchApi<T = any>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<ApiResponse<T>> {
  const { token, params, headers, skipAuth = false, ...fetchOptions } = options;

  // Get the current auth token if not provided explicitly and not skipping auth
  const authStore = useAuthStore();
  const authToken = token ?? (skipAuth ? undefined : authStore.accessToken);

  // Build URL with query params if provided
  let url = `${API_CONFIG.baseURL}${endpoint}`;
  if (params) {
    url += `?${buildQueryString(params)}`;
  }

  // Build headers
  const requestHeaders: HeadersInit = {
    ...API_CONFIG.headers,
    ...headers,
  };

  // Add authorization header if token provided
  if (authToken) {
    requestHeaders['Authorization'] = `Bearer ${authToken}`;
  }

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers: requestHeaders,
    });

    // Parse response body
    let responseData;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }

    // Check if we got a 401 Unauthorized response and try to refresh the token
    if (response.status === 401 && !skipAuth && authToken) {
      const refreshSuccess = await authStore.refreshTokenIfNeeded();
      if (refreshSuccess) {
        // Retry the request with the new token
        const newAuthToken = authStore.accessToken;
        const retryHeaders: HeadersInit = {
          ...API_CONFIG.headers,
          ...headers,
        };
        if (newAuthToken) {
          retryHeaders['Authorization'] = `Bearer ${newAuthToken}`;
        }

        const retryResponse = await fetch(url, {
          ...fetchOptions,
          headers: retryHeaders,
        });

        let retryResponseData;
        const retryContentType = retryResponse.headers.get('content-type');
        if (retryContentType && retryContentType.includes('application/json')) {
          retryResponseData = await retryResponse.json();
        } else {
          retryResponseData = await retryResponse.text();
        }

        if (!retryResponse.ok) {
          throw new ApiError(
            retryResponse.status,
            retryResponseData?.message || retryResponse.statusText || 'An error occurred after token refresh',
            retryResponseData
          );
        }

        return {
          data: retryResponseData,
          success: true,
          message: retryResponseData?.message,
        };
      }
    }

    // Handle HTTP errors
    if (!response.ok) {
      throw new ApiError(
        response.status,
        responseData?.message || response.statusText || 'An error occurred',
        responseData
      );
    }

    // Return successful response
    return {
      data: responseData,
      success: true,
      message: responseData?.message,
    };
  } catch (error) {
    // Re-throw ApiError instances
    if (error instanceof ApiError) {
      throw error;
    }

    // Handle network errors
    if (error instanceof TypeError) {
      throw new ApiError(0, 'Network error. Please check your connection.');
    }

    // Handle other errors
    throw new ApiError(
      500,
      error instanceof Error ? error.message : 'An unexpected error occurred'
    );
  }
}

/**
 * GET request helper
 */
export async function get<T = any>(
  endpoint: string,
  options?: FetchOptions
): Promise<ApiResponse<T>> {
  return fetchApi<T>(endpoint, { ...options, method: 'GET' });
}

/**
 * POST request helper
 */
export async function post<T = any>(
  endpoint: string,
  body?: any,
  options?: FetchOptions
): Promise<ApiResponse<T>> {
  return fetchApi<T>(endpoint, {
    ...options,
    method: 'POST',
    body: JSON.stringify(body),
  });
}

/**
 * PUT request helper
 */
export async function put<T = any>(
  endpoint: string,
  body?: any,
  options?: FetchOptions
): Promise<ApiResponse<T>> {
  return fetchApi<T>(endpoint, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

/**
 * PATCH request helper
 */
export async function patch<T = any>(
  endpoint: string,
  body?: any,
  options?: FetchOptions
): Promise<ApiResponse<T>> {
  return fetchApi<T>(endpoint, {
    ...options,
    method: 'PATCH',
    body: JSON.stringify(body),
  });
}

/**
 * DELETE request helper
 */
export async function del<T = any>(
  endpoint: string,
  options?: FetchOptions
): Promise<ApiResponse<T>> {
  return fetchApi<T>(endpoint, { ...options, method: 'DELETE' });
}
