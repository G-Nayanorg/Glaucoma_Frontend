/**
 * Authentication Store
 * Manages authentication state across the application
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { User, AuthResponse } from '@/modules/auth/types';
import { refreshAuthToken } from '@/modules/auth/services/authService';

// Re-export the User type so it can be imported from this module
export type { User };

/**
 * Auth State Interface
 */
interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  userId: string | null;
  tenantId: string | null;
  role: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean; // Whether the auth state has been loaded from storage

  // Actions
  setUser: (user: User) => void;
  setAuthData: (authData: AuthResponse) => void;
  login: (authData: AuthResponse, user?: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  updateTokens: (accessToken: string, refreshToken: string) => void;
  initializeAuth: () => Promise<void>;
  refreshTokenIfNeeded: () => Promise<boolean>;
  setIsInitialized: (isInitialized: boolean) => void;
}

/**
 * Auth Store
 */
export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        user: null,
        accessToken: null,
        refreshToken: null,
        userId: null,
        tenantId: null,
        role: null,
        isAuthenticated: false,
        isInitialized: false, // Initially not initialized

        // Actions
        setUser: (user) => set({ user, isAuthenticated: true }),

        setAuthData: (authData) => set({
          accessToken: authData.access_token,
          refreshToken: authData.refresh_token,
          userId: authData.user_id,
          tenantId: authData.tenant_id,
          role: authData.role,
          isAuthenticated: true,
        }),

        login: (authData, user) => set({
          accessToken: authData.access_token,
          refreshToken: authData.refresh_token,
          userId: authData.user_id,
          tenantId: authData.tenant_id,
          role: authData.role,
          user: user || null,
          isAuthenticated: true
        }),

        logout: () => set({
          user: null,
          accessToken: null,
          refreshToken: null,
          userId: null,
          tenantId: null,
          role: null,
          isAuthenticated: false
        }),

        updateUser: (updates) => set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),

        updateTokens: (accessToken, refreshToken) => set({
          accessToken,
          refreshToken,
          isAuthenticated: true
        }),

        setIsInitialized: (isInitialized) => set({ isInitialized }),

        initializeAuth: async () => {
          const state = get();
          if (state.refreshToken) {
            try {
              // Attempt to refresh the token if we have a refresh token
              const refreshedData = await refreshAuthToken(state.refreshToken);
              set({
                accessToken: refreshedData.access_token,
                refreshToken: refreshedData.refresh_token,
                userId: refreshedData.user_id,
                tenantId: refreshedData.tenant_id,
                role: refreshedData.role,
                user: state.user, // Keep the user data if it exists
                isAuthenticated: true,
                isInitialized: true,
              });
            } catch (error) {
              console.error('Token refresh failed during initialization:', error);
              // If refresh fails, keep the store in logged out state
              set({
                user: null,
                accessToken: null,
                refreshToken: null,
                userId: null,
                tenantId: null,
                role: null,
                isAuthenticated: false,
                isInitialized: true,
              });
            }
          } else {
            // If no refresh token, set initialized to true with current state
            set({ isInitialized: true });
          }
        },

        refreshTokenIfNeeded: async () => {
          const state = get();
          if (state.refreshToken) {
            try {
              const refreshedData = await refreshAuthToken(state.refreshToken);
              set({
                accessToken: refreshedData.access_token,
                refreshToken: refreshedData.refresh_token,
                userId: refreshedData.user_id,
                tenantId: refreshedData.tenant_id,
                role: refreshedData.role,
                isAuthenticated: true
              });
              return true;
            } catch (error) {
              console.error('Token refresh failed:', error);
              // If refresh fails, log out the user
              set({
                user: null,
                accessToken: null,
                refreshToken: null,
                userId: null,
                tenantId: null,
                role: null,
                isAuthenticated: false
              });
              return false;
            }
          }
          return false;
        }
      }),
      {
        name: 'auth-storage',
      }
    )
  )
);

// Initialize auth when the store is first accessed, if needed
let initialized = false;
export const initializeAuthIfNotDone = async () => {
  if (!initialized) {
    initialized = true;
    await useAuthStore.getState().initializeAuth();
  }
};

// Initialize auth when the store loads if tokens are present
if (typeof window !== 'undefined' && typeof window.addEventListener !== 'undefined') {
  // Initialize auth state when the page loads
  window.addEventListener('load', async () => {
    const state = useAuthStore.getState();
    if (state.refreshToken) {
      await useAuthStore.getState().initializeAuth();
    } else {
      // If no refresh token exists, mark as initialized
      useAuthStore.getState().setIsInitialized(true);
    }
  });

  // Also try initialization immediately if we're already loaded
  if (document.readyState === 'loading') {
    // DOM is still loading, wait for it
    document.addEventListener('DOMContentLoaded', async () => {
      const state = useAuthStore.getState();
      if (state.refreshToken) {
        await useAuthStore.getState().initializeAuth();
      } else {
        // If no refresh token exists, mark as initialized
        useAuthStore.getState().setIsInitialized(true);
      }
    });
  } else {
    // DOM is already loaded, run immediately
    setTimeout(async () => {
      const state = useAuthStore.getState();
      if (state.refreshToken) {
        await useAuthStore.getState().initializeAuth();
      } else {
        // If no refresh token exists, mark as initialized
        useAuthStore.getState().setIsInitialized(true);
      }
    }, 0);
  }
}
