/**
 * Doctor Dashboard Page
 * Dashboard for doctors with patient and prediction access
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/common/Header';
import { Sidebar } from '@/components/common/Sidebar';
import { Card, CardHeader, CardBody } from '@/components/common/Card';
import { StatsCard } from '@/modules/dashboard/components/StatsCard';
import { useAuthStore } from '@/store/authStore';
import { getDashboardFeatures, getRoleDisplayName, getRoleBadgeColor } from '@/utils/rbac';

/**
 * Doctor Dashboard Component
 * Can create patients, make predictions, and review results
 */
export default function DoctorDashboardPage() {
  const router = useRouter();
  const { isAuthenticated, role } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    if (role !== 'doctor') {
      router.push('/dashboard');
      return;
    }
  }, [isAuthenticated, role, router]);

  if (!isAuthenticated || role !== 'doctor') {
    return null;
  }

  const features = getDashboardFeatures(role as any);

  return (
    <div className="flex h-screen bg-secondary-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto">
          <div className="container-custom py-8">
            {/* Welcome Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-secondary-900 mb-2">
                    Doctor Dashboard
                  </h1>
                  <p className="text-secondary-600">
                    Manage patients and review glaucoma predictions
                  </p>
                </div>
                <span className={`px-4 py-2 rounded-full font-semibold ${getRoleBadgeColor(role as any)}`}>
                  {getRoleDisplayName(role as any)}
                </span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <StatsCard
                title="My Patients"
                value="156"
                icon={
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                }
                trend={{ value: 8.2, isPositive: true }}
                color="primary"
              />

              <StatsCard
                title="Predictions Today"
                value="42"
                icon={
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                }
                trend={{ value: 12.5, isPositive: true }}
                color="success"
              />

              <StatsCard
                title="Pending Reviews"
                value="8"
                icon={
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                trend={{ value: 3.1, isPositive: false }}
                color="warning"
              />
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader title="Quick Actions" subtitle="Common tasks" />
                <CardBody>
                  <div className="grid grid-cols-2 gap-4">
                    {features.canCreatePatients && (
                      <button className="flex flex-col items-center justify-center p-6 bg-secondary-50 rounded-xl hover:bg-secondary-100 transition-colors">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 bg-primary-100 text-primary-600">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-secondary-900">Add Patient</span>
                      </button>
                    )}

                    {features.canCreatePredictions && (
                      <button className="flex flex-col items-center justify-center p-6 bg-secondary-50 rounded-xl hover:bg-secondary-100 transition-colors">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 bg-success-100 text-success-600">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-secondary-900">Upload Image</span>
                      </button>
                    )}

                    {features.canViewPatients && (
                      <button className="flex flex-col items-center justify-center p-6 bg-secondary-50 rounded-xl hover:bg-secondary-100 transition-colors">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 bg-info-100 text-info-600">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-secondary-900">View Patients</span>
                      </button>
                    )}

                    {features.canReviewPredictions && (
                      <button className="flex flex-col items-center justify-center p-6 bg-secondary-50 rounded-xl hover:bg-secondary-100 transition-colors">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 bg-warning-100 text-warning-600">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-secondary-900">Review Results</span>
                      </button>
                    )}
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardHeader title="Your Permissions" subtitle="Access level" />
                <CardBody>
                  <div className="space-y-3">
                    <PermissionItem label="Create Patients" hasPermission={features.canCreatePatients} />
                    <PermissionItem label="View Patients" hasPermission={features.canViewPatients} />
                    <PermissionItem label="Update Patients" hasPermission={features.canUpdatePatients} />
                    <PermissionItem label="Delete Patients" hasPermission={features.canDeletePatients} />
                    <PermissionItem label="Create Predictions" hasPermission={features.canCreatePredictions} />
                    <PermissionItem label="View Predictions" hasPermission={features.canViewPredictions} />
                    <PermissionItem label="Review Predictions" hasPermission={features.canReviewPredictions} />
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

function PermissionItem({ label, hasPermission }: { label: string; hasPermission: boolean }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-secondary-700">{label}</span>
      {hasPermission ? (
        <span className="text-success-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </span>
      ) : (
        <span className="text-error-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </span>
      )}
    </div>
  );
}
