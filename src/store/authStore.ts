/**
 * Authentication Store
 * Manages authentication state across the application
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { User, AuthResponse } from '@/modules/auth/types';

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

  // Actions
  setUser: (user: User) => void;
  setAuthData: (authData: AuthResponse) => void;
  login: (authData: AuthResponse, user?: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  updateTokens: (accessToken: string, refreshToken: string) => void;
}

/**
 * Auth Store
 */
export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        // Initial state
        user: null,
        accessToken: null,
        refreshToken: null,
        userId: null,
        tenantId: null,
        role: null,
        isAuthenticated: false,

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
        }),
      }),
      {
        name: 'auth-storage',
      }
    )
  )
);
