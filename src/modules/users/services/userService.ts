/**
 * User Service
 * Handles all user-related API calls
 */

import { get, post, put, del } from '@/utils/api.util';
import { API_CONFIG } from '@/config/api.config';
import type { User, UserListResponse, CreateUserData, UpdateUserData } from '../types';

/**
 * Get all users with pagination
 */
export async function getUsers(params?: {
  page?: number;
  pageSize?: number;
  search?: string;
  role?: string;
}): Promise<UserListResponse> {
  try {
    const response = await get<UserListResponse>(
      API_CONFIG.endpoints.users.list,
      { params }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Get user by ID
 */
export async function getUserById(id: string, token: string): Promise<User> {
  try {
    const response = await get<User>(
      API_CONFIG.endpoints.users.detail(id),
      { token }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Create new user
 */
export async function createUser(
  data: CreateUserData,
  token: string
): Promise<User> {
  try {
    const response = await post<User>(
      API_CONFIG.endpoints.users.create,
      data,
      { token }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Update user
 */
export async function updateUser(
  id: string,
  data: UpdateUserData,
  token: string
): Promise<User> {
  try {
    const response = await put<User>(
      API_CONFIG.endpoints.users.update(id),
      data,
      { token }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Delete user
 */
export async function deleteUser(id: string, token: string): Promise<void> {
  try {
    await del(API_CONFIG.endpoints.users.delete(id), { token });
  } catch (error) {
    throw error;
  }
}
