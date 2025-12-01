/**
 * Authentication Context
 * Provides authentication state and methods to the entire app
 */

'use client';

import { createContext, useContext, useEffect, ReactNode } from 'react';
import { useAuthStore } from '@/store/authStore';

/**
 * Auth Context Type
 */
interface AuthContextType {
  isAuthenticated: boolean;
  isInitialized: boolean;
  login: (authData: import('@/modules/auth/types').AuthResponse, user?: import('@/modules/auth/types').User) => void;
  logout: () => void;
  updateUser: (updates: Partial<import('@/modules/auth/types').User>) => void;
}

/**
 * Create Auth Context
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Auth Provider Props
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Auth Provider Component
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const authStore = useAuthStore();

  // Initialize auth state on mount
  useEffect(() => {
    // The auth store handles initialization internally now
  }, []);

  const value: AuthContextType = {
    isAuthenticated: authStore.isAuthenticated,
    isInitialized: authStore.isInitialized,
    login: authStore.login,
    logout: authStore.logout,
    updateUser: authStore.updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to use Auth Context
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
