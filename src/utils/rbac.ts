/**
 * RBAC (Role-Based Access Control) Utility
 * Manages permissions based on user roles
 */

import type { UserRole } from '@/modules/auth/types';

/**
 * Permission types
 */
export type Permission =
  | 'patient:create'
  | 'patient:read'
  | 'patient:update'
  | 'patient:delete'
  | 'prediction:create'
  | 'prediction:read'
  | 'prediction:update'
  | 'prediction:delete'
  | 'prediction:review';

/**
 * Role permissions matrix based on CONCISE_FRONTEND_GUIDE.md
 */
export const ROLE_PERMISSIONS: Record<UserRole, Permission[] | ['*']> = {
  admin: ['*'], // Full access to all permissions
  doctor: [
    'patient:create',
    'patient:read',
    'prediction:create',
    'prediction:read',
    'prediction:review',
  ],
  radiologist: [
    'patient:read',
    'prediction:create',
    'prediction:read',
    'prediction:update',
    'prediction:review',
  ],
  technician: [
    'patient:create',
    'patient:read',
    'patient:update',
    'prediction:create',
    'prediction:read',
  ],
  viewer: ['patient:read', 'prediction:read'],
  no_role: [], // No permissions for users without a role
};

/**
 * Check if a user role has a specific permission
 * @param userRole - The user's role
 * @param permission - The permission to check
 * @returns true if the user has the permission, false otherwise
 */
export function hasPermission(userRole: UserRole, permission: Permission): boolean {
  const rolePermissions = ROLE_PERMISSIONS[userRole];

  // Check if role has wildcard permissions ('*' array)
  if (Array.isArray(rolePermissions) && rolePermissions.length > 0 && rolePermissions[0] === '*') {
    return true;
  }

  // For specific permissions, cast to Permission[] and check
  if (Array.isArray(rolePermissions)) {
    return (rolePermissions as Permission[]).includes(permission);
  }

  // Return false if no permissions array found
  return false;
}

/**
 * Check if a user role has multiple permissions
 * @param userRole - The user's role
 * @param permissions - Array of permissions to check
 * @param requireAll - If true, user must have ALL permissions. If false, user must have AT LEAST ONE permission
 * @returns true if the user meets the permission requirements
 */
export function hasPermissions(
  userRole: UserRole,
  permissions: Permission[],
  requireAll: boolean = false
): boolean {
  if (requireAll) {
    return permissions.every((permission) => hasPermission(userRole, permission));
  }
  return permissions.some((permission) => hasPermission(userRole, permission));
}

/**
 * Get all permissions for a specific role
 * @param userRole - The user's role
 * @returns Array of permissions for the role
 */
export function getRolePermissions(userRole: UserRole): (Permission | '*')[] {
  return (ROLE_PERMISSIONS[userRole] || []) as (Permission | '*')[];
}

/**
 * Check if a role is an admin role
 * @param userRole - The user's role
 * @returns true if the role is admin
 */
export function isAdmin(userRole: UserRole): boolean {
  return userRole === 'admin';
}

/**
 * Check if a role can create patients
 * @param userRole - The user's role
 * @returns true if the role can create patients
 */
export function canCreatePatients(userRole: UserRole): boolean {
  return hasPermission(userRole, 'patient:create');
}

/**
 * Check if a role can create predictions
 * @param userRole - The user's role
 * @returns true if the role can create predictions
 */
export function canCreatePredictions(userRole: UserRole): boolean {
  return hasPermission(userRole, 'prediction:create');
}

/**
 * Check if a role can review predictions
 * @param userRole - The user's role
 * @returns true if the role can review predictions
 */
export function canReviewPredictions(userRole: UserRole): boolean {
  return hasPermission(userRole, 'prediction:review');
}

/**
 * Get dashboard features available for a role
 * @param userRole - The user's role
 * @returns Object describing available dashboard features
 */
export function getDashboardFeatures(userRole: UserRole) {
  return {
    canCreatePatients: canCreatePatients(userRole),
    canViewPatients: hasPermission(userRole, 'patient:read'),
    canUpdatePatients: hasPermission(userRole, 'patient:update'),
    canDeletePatients: hasPermission(userRole, 'patient:delete'),
    canCreatePredictions: canCreatePredictions(userRole),
    canViewPredictions: hasPermission(userRole, 'prediction:read'),
    canUpdatePredictions: hasPermission(userRole, 'prediction:update'),
    canDeletePredictions: hasPermission(userRole, 'prediction:delete'),
    canReviewPredictions: canReviewPredictions(userRole),
    isAdmin: isAdmin(userRole),
  };
}

/**
 * Get human-readable role name
 * @param userRole - The user's role
 * @returns Formatted role name
 */
export function getRoleDisplayName(userRole: UserRole): string {
  const roleNames: Record<UserRole, string> = {
    admin: 'Administrator',
    doctor: 'Doctor',
    radiologist: 'Radiologist',
    technician: 'Technician',
    viewer: 'Viewer',
    no_role: 'No Role Assigned',
  };
  return roleNames[userRole] || 'Unknown Role';
}

/**
 * Get role badge color for UI display
 * @param userRole - The user's role
 * @returns Tailwind CSS classes for badge color
 */
export function getRoleBadgeColor(userRole: UserRole): string {
  const colors: Record<UserRole, string> = {
    admin: 'bg-error-100 text-error-700',
    doctor: 'bg-primary-100 text-primary-700',
    radiologist: 'bg-success-100 text-success-700',
    technician: 'bg-warning-100 text-warning-700',
    viewer: 'bg-info-100 text-info-700',
    no_role: 'bg-secondary-100 text-secondary-700',
  };
  return colors[userRole] || 'bg-secondary-100 text-secondary-700';
}
