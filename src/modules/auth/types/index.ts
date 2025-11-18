/**
 * Auth Module Types
 * TypeScript interfaces and types for authentication
 */

/**
 * Login credentials
 */
export interface LoginCredentials {
  username: string;
  password: string;
}

/**
 * Register data
 */
export interface RegisterData {
  email: string;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  tenant_id: string;
  confirmPassword?: string;
}

/**
 * User data from backend
 */
export interface User {
  id: string;
  user_id: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  tenant_id: string;
  role: string;
  is_active: boolean;
  is_verified: boolean;
  is_superuser: boolean;
}

/**
 * Auth response from API (Login/Register)
 */
export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user_id: string;
  tenant_id: string;
  email: string;
  role: string;
}

/**
 * Password reset request
 */
export interface PasswordResetRequest {
  email: string;
}

/**
 * Password reset confirmation
 */
export interface PasswordResetConfirm {
  token: string;
  newPassword: string;
}

/**
 * Refresh token request
 */
export interface RefreshTokenRequest {
  refresh_token: string;
}

/**
 * Role types
 */
export type UserRole = 'admin' | 'doctor' | 'radiologist' | 'technician' | 'viewer' | 'no_role';
