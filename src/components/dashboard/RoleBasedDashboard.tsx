/**
 * Role-Based Dashboard Component
 * Reusable dashboard component that adapts based on user role
 */

'use client';

import { ReactNode } from 'react';
import { Header } from '@/components/common/Header';
import { Sidebar } from '@/components/common/Sidebar';
import { Card, CardHeader, CardBody } from '@/components/common/Card';
import { StatsCard } from '@/modules/dashboard/components/StatsCard';
import type { UserRole } from '@/modules/auth/types';
import { getDashboardFeatures, getRoleDisplayName, getRoleBadgeColor } from '@/utils/rbac';

interface DashboardConfig {
  title: string;
  subtitle: string;
  stats: Array<{
    title: string;
    value: string;
    icon: ReactNode;
    trend?: { value: number; isPositive: boolean };
    color: 'primary' | 'success' | 'warning' | 'error' | 'info';
  }>;
  quickActions?: Array<{
    label: string;
    icon: ReactNode;
    color: string;
    permission?: keyof ReturnType<typeof getDashboardFeatures>;
    onClick?: () => void;
  }>;
}

interface RoleBasedDashboardProps {
  role: UserRole;
  config: DashboardConfig;
}

export function RoleBasedDashboard({ role, config }: RoleBasedDashboardProps) {
  const features = getDashboardFeatures(role);

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
                    {config.title}
                  </h1>
                  <p className="text-secondary-600">{config.subtitle}</p>
                </div>
                <span className={`px-4 py-2 rounded-full font-semibold ${getRoleBadgeColor(role)}`}>
                  {getRoleDisplayName(role)}
                </span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${Math.min(config.stats.length, 4)} gap-6 mb-8`}>
              {config.stats.map((stat, index) => (
                <StatsCard
                  key={index}
                  title={stat.title}
                  value={stat.value}
                  icon={stat.icon}
                  trend={stat.trend}
                  color={stat.color}
                />
              ))}
            </div>

            {/* Quick Actions and Permissions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {config.quickActions && config.quickActions.length > 0 && (
                <Card>
                  <CardHeader title="Quick Actions" subtitle="Common tasks" />
                  <CardBody>
                    <div className="grid grid-cols-2 gap-4">
                      {config.quickActions
                        .filter((action) => !action.permission || features[action.permission])
                        .map((action, index) => (
                          <button
                            key={index}
                            onClick={action.onClick}
                            className="flex flex-col items-center justify-center p-6 bg-secondary-50 rounded-xl hover:bg-secondary-100 transition-colors"
                          >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${action.color}`}>
                              {action.icon}
                            </div>
                            <span className="text-sm font-medium text-secondary-900">
                              {action.label}
                            </span>
                          </button>
                        ))}
                    </div>
                  </CardBody>
                </Card>
              )}

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
                    <PermissionItem label="Update Predictions" hasPermission={features.canUpdatePredictions} />
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
