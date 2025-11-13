/**
 * Application Configuration
 * Global app settings and constants
 */

export const APP_CONFIG = {
  name: process.env.NEXT_PUBLIC_APP_NAME || 'Monolithic App',
  version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  description: 'Feature-based monolithic Next.js application',

  // Pagination
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [10, 25, 50, 100],
  },

  // Local storage keys
  storageKeys: {
    authToken: 'auth_token',
    refreshToken: 'refresh_token',
    user: 'user_data',
    theme: 'app_theme',
  },

  // Date formats
  dateFormats: {
    display: 'MMM dd, yyyy',
    displayWithTime: 'MMM dd, yyyy HH:mm',
    iso: 'yyyy-MM-dd',
  },

  // Feature flags
  features: {
    enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  },
} as const;
