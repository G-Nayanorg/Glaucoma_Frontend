/**
 * useAuth Hook
 * Custom hook for accessing authentication functionality
 */

'use client';

import { useAuthStore } from '@/store/authStore';

/**
 * Authentication hook
 * Provides easy access to auth state and methods
 */
export function useAuth() {
  const { user, token, isAuthenticated, login, logout, updateUser } = useAuthStore();

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    updateUser,
  };
}
