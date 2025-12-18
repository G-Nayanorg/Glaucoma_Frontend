/**
 * useFetch Hook
 * Custom hook for data fetching with loading and error states
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { fetchApi, ApiResponse, ApiError } from '@/utils/api.util';
import { useAuthStore } from '@/store/authStore';

/**
 * Fetch options
 */
interface UseFetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  autoFetch?: boolean;
  requireAuth?: boolean;
}

/**
 * Fetch state
 */
interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
}

/**
 * useFetch return type
 */
interface UseFetchReturn<T> extends FetchState<T> {
  refetch: () => Promise<void>;
  mutate: (newData: T | null) => void;
}

/**
 * Custom fetch hook with loading and error handling
 */
export function useFetch<T = any>(
  endpoint: string,
  options: UseFetchOptions = {}
): UseFetchReturn<T> {
  const {
    method = 'GET',
    body,
    headers,
    params,
    autoFetch = true,
    requireAuth = false,
  } = options;

  const authStore = useAuthStore();
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: autoFetch,
    error: null,
  });

  /**
   * Fetch data function
   */
  const fetchData = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response: ApiResponse<T> = await fetchApi(endpoint, {
        method,
        body: body ? JSON.stringify(body) : undefined,
        headers,
        params,
        token: requireAuth ? authStore.accessToken || undefined : undefined,
      });

      setState({
        data: response.data,
        loading: false,
        error: null,
      });
    } catch (err) {
      // Check if error is a 401 Unauthorized error and we need to refresh the token
      if (err instanceof ApiError && err.status === 401 && requireAuth) {
        const refreshSuccess = await authStore.refreshTokenIfNeeded();
        if (refreshSuccess) {
          // Retry the request with the new token
          try {
            const response: ApiResponse<T> = await fetchApi(endpoint, {
              method,
              body: body ? JSON.stringify(body) : undefined,
              headers,
              params,
              token: authStore.accessToken || undefined,
            });

            setState({
              data: response.data,
              loading: false,
              error: null,
            });
            return;
          } catch (retryErr) {
            setState({
              data: null,
              loading: false,
              error: retryErr instanceof ApiError ? retryErr : new ApiError(500, 'An error occurred'),
            });
            return;
          }
        }
      }

      setState({
        data: null,
        loading: false,
        error: err instanceof ApiError ? err : new ApiError(500, 'An error occurred'),
      });
    }
  }, [endpoint, method, body, headers, params, requireAuth, authStore]);

  /**
   * Manually update data (optimistic updates)
   */
  const mutate = useCallback((newData: T | null) => {
    setState((prev) => ({ ...prev, data: newData }));
  }, []);

  /**
   * Auto-fetch on mount if enabled
   */
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [autoFetch, fetchData]);

  return {
    ...state,
    refetch: fetchData,
    mutate,
  };
}

/**
 * Mutation hook for POST/PUT/PATCH/DELETE requests
 */
interface UseMutationOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: ApiError) => void;
}

interface UseMutationReturn<T> {
  mutate: (body?: any) => Promise<void>;
  data: T | null;
  loading: boolean;
  error: ApiError | null;
  reset: () => void;
}

/**
 * Custom mutation hook
 */
export function useMutation<T = any>(
  endpoint: string,
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'POST',
  options: UseMutationOptions = {}
): UseMutationReturn<T> {
  const { onSuccess, onError } = options;
  const authStore = useAuthStore();

  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  /**
   * Execute mutation
   */
  const mutate = useCallback(
    async (body?: any) => {
      setState({ data: null, loading: true, error: null });

      try {
        const response: ApiResponse<T> = await fetchApi(endpoint, {
          method,
          body: body ? JSON.stringify(body) : undefined,
          token: authStore.accessToken || undefined,
        });

        setState({
          data: response.data,
          loading: false,
          error: null,
        });

        if (onSuccess) {
          onSuccess(response.data);
        }
      } catch (err) {
        // Check if error is a 401 Unauthorized error and we need to refresh the token
        if (err instanceof ApiError && err.status === 401) {
          const refreshSuccess = await authStore.refreshTokenIfNeeded();
          if (refreshSuccess) {
            // Retry the request with the new token
            try {
              const response: ApiResponse<T> = await fetchApi(endpoint, {
                method,
                body: body ? JSON.stringify(body) : undefined,
                token: authStore.accessToken || undefined,
              });

              setState({
                data: response.data,
                loading: false,
                error: null,
              });

              if (onSuccess) {
                onSuccess(response.data);
              }
              return;
            } catch (retryErr) {
              const error = retryErr instanceof ApiError ? retryErr : new ApiError(500, 'An error occurred');

              setState({
                data: null,
                loading: false,
                error,
              });

              if (onError) {
                onError(error);
              }
              return;
            }
          }
        }

        const error = err instanceof ApiError ? err : new ApiError(500, 'An error occurred');

        setState({
          data: null,
          loading: false,
          error,
        });

        if (onError) {
          onError(error);
        }
      }
    },
    [endpoint, method, onSuccess, onError, authStore]
  );

  /**
   * Reset state
   */
  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    mutate,
    ...state,
    reset,
  };
}
