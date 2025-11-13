/**
 * Users Module Types
 * TypeScript interfaces for user management
 */

/**
 * User interface
 */
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * User list response
 */
export interface UserListResponse {
  users: User[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * Create user data
 */
export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: string;
}

/**
 * Update user data
 */
export interface UpdateUserData {
  name?: string;
  email?: string;
  role?: string;
  status?: User['status'];
}
