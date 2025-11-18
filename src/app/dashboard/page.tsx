/**
 * Dashboard Page
 * Main dashboard that redirects to role-specific dashboards
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Loader } from '@/components/common/Loader';

/**
 * Dashboard Page Component
 * Redirects to the appropriate role-based dashboard
 */
export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, role } = useAuthStore();

  // Redirect based on authentication and role
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    // Redirect to role-specific dashboard
    const getRoleDashboardPath = (userRole: string | null): string => {
      switch (userRole) {
        case 'admin':
          return '/dashboard/admin';
        case 'doctor':
          return '/dashboard/doctor';
        case 'radiologist':
          return '/dashboard/radiologist';
        case 'technician':
          return '/dashboard/technician';
        case 'viewer':
          return '/dashboard/viewer';
        default:
          return '/dashboard/no-role';
      }
    };

    const dashboardPath = getRoleDashboardPath(role);
    router.push(dashboardPath);
  }, [isAuthenticated, role, router]);

  // Show loading while redirecting
  return (
    <div className="flex items-center justify-center h-screen bg-secondary-50">
      <Loader />
    </div>
  );
}
