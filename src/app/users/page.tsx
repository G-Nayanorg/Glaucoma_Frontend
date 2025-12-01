/**
 * Users Page
 * User management page with list and actions
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/common/Header';
import { Sidebar } from '@/components/common/Sidebar';
import { Card, CardHeader, CardBody } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Loader } from '@/components/common/Loader';
import { UserTable } from '@/modules/users/components/UserTable';
import { useAuth } from '@/hooks/useAuth';
import type { User } from '@/modules/users/types';

/**
 * Users Page Component
 */
export default function UsersPage() {
  const router = useRouter();
  const { isAuthenticated, isInitialized } = useAuth();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);

  // Redirect if not authenticated
  useEffect(() => {
    // Only redirect after auth state has been initialized from storage
    if (isInitialized) {
      if (!isAuthenticated) {
        router.push('/auth/login');
      }
    }
  }, [isAuthenticated, isInitialized, router]);

  // Load mock users data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, []);

  const handleEdit = (user: User) => {
    console.log('Edit user:', user);
    // Implement edit functionality
  };

  const handleDelete = (user: User) => {
    console.log('Delete user:', user);
    // Implement delete functionality
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      setUsers(users.filter(u => u.id !== user.id));
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen bg-secondary-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto">
          <div className="container-custom py-8">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-secondary-900 mb-2">
                  Users Management
                </h1>
                <p className="text-secondary-600">
                  Manage and monitor all users in the system
                </p>
              </div>
              <Button variant="primary" size="lg">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add User
              </Button>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1">
                <input
                  type="search"
                  placeholder="Search users..."
                  className="input-field"
                />
              </div>
              <select className="input-field w-48">
                <option value="">All Roles</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="moderator">Moderator</option>
              </select>
              <select className="input-field w-48">
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            {/* Users Table */}
            <Card padding="none">
              <CardBody>
                {loading ? (
                  <div className="py-12">
                    <Loader size="lg" text="Loading users..." />
                  </div>
                ) : (
                  <UserTable
                    users={users}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                )}
              </CardBody>
            </Card>

            {/* Pagination */}
            {!loading && users.length > 0 && (
              <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-secondary-600">
                  Showing <span className="font-medium">{users.length}</span> of{' '}
                  <span className="font-medium">{users.length}</span> users
                </p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="primary" size="sm">
                    1
                  </Button>
                  <Button variant="outline" size="sm">
                    2
                  </Button>
                  <Button variant="outline" size="sm">
                    3
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

/**
 * Mock Users Data
 */
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2024-01-20T14:20:00Z',
    updatedAt: '2024-01-20T14:20:00Z',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'moderator',
    status: 'inactive',
    createdAt: '2024-02-01T09:15:00Z',
    updatedAt: '2024-02-01T09:15:00Z',
  },
  {
    id: '4',
    name: 'Alice Williams',
    email: 'alice.williams@example.com',
    role: 'user',
    status: 'pending',
    createdAt: '2024-02-10T16:45:00Z',
    updatedAt: '2024-02-10T16:45:00Z',
  },
  {
    id: '5',
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2024-02-15T11:00:00Z',
    updatedAt: '2024-02-15T11:00:00Z',
  },
];
