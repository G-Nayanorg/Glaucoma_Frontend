/**
 * No Role Dashboard Page
 * Dashboard for users without an assigned role
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/common/Header';
import { Sidebar } from '@/components/common/Sidebar';
import { Card, CardHeader, CardBody } from '@/components/common/Card';
import { useAuthStore } from '@/store/authStore';

export default function NoRoleDashboardPage() {
  const router = useRouter();
  const { isAuthenticated, role, isInitialized } = useAuthStore();

  useEffect(() => {
    // Only redirect after auth state has been initialized from storage
    if (isInitialized) {
      if (!isAuthenticated) {
        router.push('/auth/login');
        return;
      }
    }
  }, [isAuthenticated, isInitialized, router]);

  // Show nothing (or loading) while auth state is still being initialized
  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mb-4"></div>
          <p className="text-secondary-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

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
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-secondary-900 mb-2">
                Welcome to Glaucoma Detection System
              </h1>
              <p className="text-secondary-600">
                Your account is currently pending role assignment
              </p>
            </div>

            {/* Info Card */}
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader
                  title="No Role Assigned"
                  subtitle="Access Pending"
                />
                <CardBody>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-warning-50 border border-warning-200 rounded-lg">
                      <svg
                        className="w-6 h-6 text-warning-600 flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                      <div>
                        <h3 className="font-semibold text-warning-900 mb-1">
                          Role Assignment Required
                        </h3>
                        <p className="text-sm text-warning-700">
                          Your account has been created successfully, but you don't have a role assigned yet.
                          Please contact your system administrator to assign you a role.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-secondary-900">
                        Available Roles:
                      </h4>
                      <div className="space-y-2">
                        <RoleDescription
                          role="Admin"
                          description="Full system access with user and content management"
                          color="bg-error-100 text-error-700"
                        />
                        <RoleDescription
                          role="Doctor"
                          description="Create patients, make predictions, and review results"
                          color="bg-primary-100 text-primary-700"
                        />
                        <RoleDescription
                          role="Radiologist"
                          description="Review and update glaucoma predictions"
                          color="bg-success-100 text-success-700"
                        />
                        <RoleDescription
                          role="Technician"
                          description="Manage patient data and upload images"
                          color="bg-warning-100 text-warning-700"
                        />
                        <RoleDescription
                          role="Viewer"
                          description="Read-only access to patient and prediction data"
                          color="bg-info-100 text-info-700"
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-secondary-200">
                      <p className="text-sm text-secondary-600">
                        Need help? Contact your administrator or email{' '}
                        <a href="mailto:support@glaucoma-detection.com" className="text-primary-600 hover:underline">
                          support@glaucoma-detection.com
                        </a>
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function RoleDescription({ role, description, color }: { role: string; description: string; color: string }) {
  return (
    <div className="flex items-start gap-3 p-3 bg-secondary-50 rounded-lg">
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${color}`}>
        {role}
      </span>
      <p className="text-sm text-secondary-700 flex-1">{description}</p>
    </div>
  );
}
