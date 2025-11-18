/**
 * Dashboard Layout
 * Shared layout for all dashboard pages with persistent Sidebar and Header
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/common/Header';
import { Sidebar } from '@/components/common/Sidebar';
import { useAuthStore } from '@/store/authStore';
import { Loader } from '@/components/common/Loader';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

/**
 * Dashboard Layout Component
 * Wraps all dashboard pages with Sidebar and Header
 */
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-secondary-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
