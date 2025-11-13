/**
 * User Table Component
 * Display users in a table format
 */

'use client';

import { User } from '../types';
import { formatDate } from '@/utils/format';

/**
 * User Table Props
 */
interface UserTableProps {
  users: User[];
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
}

/**
 * User Table Component
 */
export function UserTable({ users, onEdit, onDelete }: UserTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-secondary-200">
            <th className="text-left py-4 px-4 text-sm font-semibold text-secondary-900">
              User
            </th>
            <th className="text-left py-4 px-4 text-sm font-semibold text-secondary-900">
              Role
            </th>
            <th className="text-left py-4 px-4 text-sm font-semibold text-secondary-900">
              Status
            </th>
            <th className="text-left py-4 px-4 text-sm font-semibold text-secondary-900">
              Joined
            </th>
            <th className="text-right py-4 px-4 text-sm font-semibold text-secondary-900">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-secondary-100 hover:bg-secondary-50 transition-colors">
              {/* User Info */}
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <span className="text-primary-700 font-medium">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-secondary-900">{user.name}</p>
                    <p className="text-xs text-secondary-600">{user.email}</p>
                  </div>
                </div>
              </td>

              {/* Role */}
              <td className="py-4 px-4">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-secondary-100 text-secondary-700 capitalize">
                  {user.role}
                </span>
              </td>

              {/* Status */}
              <td className="py-4 px-4">
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
                    user.status === 'active'
                      ? 'bg-success-100 text-success-700'
                      : user.status === 'inactive'
                      ? 'bg-error-100 text-error-700'
                      : 'bg-warning-100 text-warning-700'
                  }`}
                >
                  {user.status}
                </span>
              </td>

              {/* Joined Date */}
              <td className="py-4 px-4 text-sm text-secondary-600">
                {formatDate(user.createdAt)}
              </td>

              {/* Actions */}
              <td className="py-4 px-4">
                <div className="flex items-center justify-end gap-2">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(user)}
                      className="p-2 hover:bg-secondary-100 rounded-lg transition-colors"
                      title="Edit user"
                    >
                      <svg className="w-4 h-4 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(user)}
                      className="p-2 hover:bg-error-50 rounded-lg transition-colors"
                      title="Delete user"
                    >
                      <svg className="w-4 h-4 text-error-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {users.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-secondary-600">No users found</p>
        </div>
      )}
    </div>
  );
}
