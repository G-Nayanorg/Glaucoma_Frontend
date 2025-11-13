/**
 * Store Configuration
 * Using Zustand for lightweight state management
 * Can be replaced with Redux Toolkit if preferred
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

/**
 * Global App State Interface
 */
interface AppState {
  // Loading states
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  // Global error
  error: string | null;
  setError: (error: string | null) => void;
  clearError: () => void;

  // Sidebar state
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

/**
 * Global App Store
 */
export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        // Initial state
        isLoading: false,
        error: null,
        sidebarOpen: true,

        // Actions
        setIsLoading: (loading) => set({ isLoading: loading }),

        setError: (error) => set({ error }),

        clearError: () => set({ error: null }),

        toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

        setSidebarOpen: (open) => set({ sidebarOpen: open }),
      }),
      {
        name: 'app-storage',
        partialize: (state) => ({ sidebarOpen: state.sidebarOpen }),
      }
    )
  )
);
