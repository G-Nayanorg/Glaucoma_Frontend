/**
 * Authentication Context
 * Provides authentication state and methods to the entire app
 */

'use client';

import { createContext, useContext, useEffect, ReactNode } from 'react';
import { useAuthStore, User } from '@/store/authStore';

/**
 * Auth Context Type
 */
interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
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

  // Hydrate auth state on mount
  useEffect(() => {
    // You can add token validation logic here
    // For example, verify the token with your backend
    const validateToken = async () => {
      if (authStore.accessToken) {
        try {
          // Add your token validation logic
          // const response = await validateAuthToken(authStore.accessToken);
          // if (!response.valid) authStore.logout();
        } catch (error) {
          console.error('Token validation error:', error);
          authStore.logout();
        }
      }
    };

    validateToken();
  }, [authStore]);

  const value: AuthContextType = {
    user: authStore.user,
    token: authStore.accessToken,
    isAuthenticated: authStore.isAuthenticated,
    login: (user, token) => {
      // Create a mock AuthResponse since the store expects that format
      const authResponse: any = {
        access_token: token,
        refresh_token: null,
        token_type: "bearer",
        user_id: user.id,
        tenant_id: user.tenant_id,
        email: user.email,
        role: user.role,
      };
      authStore.login(authResponse, user);
    },
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
