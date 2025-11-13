/**
 * Authentication Store
 * Manages authentication state across the application
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

/**
 * User interface
 */
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
}

/**
 * Auth State Interface
 */
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  // Actions
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
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
        token: null,
        isAuthenticated: false,

        // Actions
        setUser: (user) => set({ user, isAuthenticated: true }),

        setToken: (token) => set({ token }),

        login: (user, token) => set({
          user,
          token,
          isAuthenticated: true
        }),

        logout: () => set({
          user: null,
          token: null,
          isAuthenticated: false
        }),

        updateUser: (updates) => set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
      }),
      {
        name: 'auth-storage',
      }
    )
  )
);
