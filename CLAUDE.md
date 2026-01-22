# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Glaucoma Detection UI built with Next.js 14, featuring role-based access control (RBAC), authentication, patient management, and medical image prediction capabilities. The project uses a feature-based modular monolith architecture.

## Essential Commands

```bash
# Development
npm run dev          # Start dev server on http://localhost:3000
npm run build        # Production build
npm run start        # Start production server

# Code Quality
npm run lint         # ESLint
npm run type-check   # TypeScript compilation check (no emit)
```

## Architecture Overview

### Authentication System (Hybrid Pattern)

The app uses a **Zustand + Context hybrid** for authentication:

- **Zustand Store** ([src/store/authStore.ts](src/store/authStore.ts)): Source of truth for auth state
  - Persisted to localStorage with key `'auth-storage'`
  - State: `user`, `accessToken`, `refreshToken`, `userId`, `tenantId`, `role`, `isAuthenticated`, `isInitialized`
  - Actions: `login()`, `logout()`, `updateUser()`, `initializeAuth()`, `refreshTokenIfNeeded()`, `updateTokens()`
  - **Critical**: `isInitialized` flag prevents rendering before auth loads from localStorage (hydration safety)

- **React Context** ([src/contexts/AuthContext.tsx](src/contexts/AuthContext.tsx)): Thin wrapper around Zustand store
  - Provides backward-compatible Context API access
  - Wrapped at root in `ClientProviders`

- **Custom Hook** ([src/hooks/useAuth.ts](src/hooks/useAuth.ts)): Directly accesses Zustand store
  - Returns: `{ user, token, isAuthenticated, isInitialized, login, logout, updateUser }`

**Auth Initialization Flow:**
1. Zustand loads persisted state from localStorage on mount
2. Client-side initialization runs on `window.load` or `DOMContentLoaded`
3. If `refreshToken` exists, attempts token refresh via `authService.refreshAuthToken()`
4. Sets `isInitialized = true` when complete
5. Components should check `isInitialized` before rendering auth-dependent UI

### API Integration (Two-Layer Pattern)

**Configuration Layer** ([src/config/api.config.ts](src/config/api.config.ts)):
- `BASE_URL`: http://localhost:8000 (or `NEXT_PUBLIC_API_URL` env var)
- `AUTH_URL`: http://localhost:8000/api/v1/auth
- All endpoints defined as constants (e.g., `API_CONFIG.endpoints.auth.login`)
- Timeout: 30s, Max retries: 3

**API Utility Layer** ([src/utils/api.util.ts](src/utils/api.util.ts)):
- Core `fetchApi<T>()` function with automatic token refresh on 401
- HTTP helpers: `get()`, `post()`, `put()`, `patch()`, `del()`
- Features:
  - Auto-injects `Authorization: Bearer {token}` from `useAuthStore`
  - On 401 error: calls `refreshTokenIfNeeded()` → if success, retries original request
  - On refresh failure: logs user out
  - Custom `ApiError` class for typed error handling

**Data Fetching Hooks** ([src/hooks/useFetch.ts](src/hooks/useFetch.ts)):
- `useFetch<T>(endpoint, options)`: For GET requests
  - Returns: `{ data, loading, error, refetch(), mutate() }`
  - Auto-fetches on mount (configurable)
  - Handles 401 with token refresh

- `useMutation<T>(endpoint, method, options)`: For POST/PUT/PATCH/DELETE
  - Returns: `{ mutate(), data, loading, error, reset() }`
  - Callbacks: `onSuccess`, `onError`

**Service Layer Pattern:**
All API calls should go through service modules (e.g., [src/modules/auth/services/authService.ts](src/modules/auth/services/authService.ts)):
```typescript
import { post } from '@/utils/api.util';
import { API_CONFIG } from '@/config/api.config';

export const authService = {
  login: async (credentials) => {
    return post<AuthResponse>(API_CONFIG.endpoints.auth.login, credentials);
  }
};
```

### RBAC System (Permission Matrix)

Comprehensive role-based access control in [src/utils/rbac.ts](src/utils/rbac.ts).

**Roles:** `admin`, `doctor`, `radiologist`, `technician`, `viewer`, `no_role`

**Permissions:**
- Patient: `patient:create`, `patient:read`, `patient:update`, `patient:delete`
- Prediction: `prediction:create`, `prediction:read`, `prediction:update`, `prediction:delete`, `prediction:review`

**Permission Matrix:**
- **admin**: `['*']` (all permissions)
- **doctor**: patient read/create, prediction read/create/review
- **radiologist**: patient read, prediction read/create/update/review
- **technician**: patient read/create/update, prediction read/create
- **viewer**: patient read, prediction read
- **no_role**: `[]` (no permissions)

**Key RBAC Functions:**
```typescript
hasPermission(role, permission)           // Check single permission
hasPermissions(role, permissions, requireAll) // Check multiple (AND/OR logic)
getDashboardFeatures(role)                // Returns object with all feature flags
getRolePermissions(role)                  // Get all permissions for a role
getRoleBadgeColor(role)                   // Tailwind classes for role badges
```

**Usage Example:**
```typescript
import { hasPermission, getDashboardFeatures } from '@/utils/rbac';

// In Sidebar
if (hasPermission(role, 'patient:read')) {
  showPatientLink();
}

// In Dashboard
const features = getDashboardFeatures(role);
if (features.canCreatePatients) {
  showAddPatientButton();
}
```

**Integration Points:**
- [src/components/common/Sidebar.tsx](src/components/common/Sidebar.tsx): Filters navigation by permissions
- [src/app/dashboard/{role}/page.tsx](src/app/dashboard): Role-specific dashboard pages
- [src/components/dashboard/RoleBasedDashboard.tsx](src/components/dashboard/RoleBasedDashboard.tsx): Reusable dashboard component

### State Management

**Zustand Stores:**

1. **AuthStore** ([src/store/authStore.ts](src/store/authStore.ts))
   - Authentication state and tokens
   - Fully persisted to localStorage
   - Middleware: `persist` + `devtools`

2. **AppStore** ([src/store/index.ts](src/store/index.ts))
   - Global UI state: `isLoading`, `error`, `sidebarOpen`
   - Only `sidebarOpen` persisted (via `partialize`)
   - Middleware: `persist` + `devtools`

**Context Providers:**
- `ThemeContext`: Theme management
- `AuthContext`: Wrapper around `useAuthStore`

**Provider Composition** ([src/app/ClientProviders.tsx](src/app/ClientProviders.tsx)):
```typescript
<ThemeProvider>
  <AuthProvider>
    {children}
  </AuthProvider>
</ThemeProvider>
```

### Feature Module Organization

Each feature module follows vertical slicing:
```
modules/
├── auth/
│   ├── components/      # LoginForm, RegisterForm
│   ├── services/        # authService.ts
│   └── types/           # User, AuthResponse, UserRole types
├── patient/
│   ├── components/
│   ├── services/
│   └── types/
└── prediction/
    ├── services/
    └── types/
```

**Benefits:**
- Related code stays together
- Easy to extract into separate packages
- Clear ownership boundaries
- Self-contained feature development

### Data Flow Pattern

**Example: Login Flow**
```
LoginForm.tsx (user submits)
  ↓ calls
authService.login(credentials)
  ↓ uses
fetchApi('/api/v1/auth/login')
  ↓ fetch with Authorization header
  ↓ returns AuthResponse { access_token, refresh_token, user }
  ↓ calls
useAuthStore.login(authResponse)
  ↓ updates Zustand + localStorage
  ↓ router.push('/dashboard')
  ↓ redirects to role-specific dashboard
  ↓ Sidebar filters items via hasPermission()
  ↓ Dashboard shows features via getDashboardFeatures()
```

### Error Handling Strategy

**API Errors:**
```
Component makes API request
  ↓ 401 Unauthorized?
    YES → refreshTokenIfNeeded()
          SUCCESS → Retry original request with new token
          FAIL    → logout() and redirect to /auth/login
  ↓ Network Error?
    YES → ApiError(0, "Network error")
  ↓ Other errors → ApiError(status, message)
  ↓ Display error to user (via component state or global error)
```

## Important Patterns & Conventions

### Authentication Guards

Pages that require authentication should check `isInitialized` before rendering:
```typescript
const { isAuthenticated, isInitialized } = useAuth();

if (!isInitialized) {
  return <Loader />; // Or skeleton
}

if (!isAuthenticated) {
  router.push('/auth/login');
  return null;
}
```

### Backend API Format

**Login endpoint** uses `application/x-www-form-urlencoded`:
```typescript
// In authService.ts
const formData = new URLSearchParams();
formData.append('username', email);
formData.append('password', password);
```

**Other endpoints** use `application/json`

**Response format:**
```typescript
{
  access_token: string,
  refresh_token: string,
  token_type: "bearer",
  user: {
    id: string,
    email: string,
    name: string,
    role: UserRole,
    tenant_id: string
  }
}
```

### Path Aliases

TypeScript path aliases configured in [tsconfig.json](tsconfig.json):
```typescript
import { Button } from '@/components/common/Button';
import { useAuth } from '@/hooks/useAuth';
import { API_CONFIG } from '@/config/api.config';
```

### Styling with Tailwind

Use `cn()` utility ([src/utils/cn.ts](src/utils/cn.ts)) for dynamic class names:
```typescript
import { cn } from '@/utils/cn';

<button className={cn('base-classes', isActive && 'active-classes')} />
```

**Custom color palette:**
- `primary`: Brand blue
- `secondary`: Slate gray
- `success`: Green
- `warning`: Yellow/Orange
- `error`: Red
- `info`: Sky blue

### Client vs Server Components

**Client-side only (`'use client'`):**
- All authentication-related components
- Components using `useState`, `useEffect`, hooks
- Components accessing `localStorage` or `window`
- Interactive forms and modals

**Server components (default):**
- Static content pages
- SEO-critical pages
- When possible, prefer server components

## Environment Variables

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_AUTH_API_URL=http://localhost:8000/api/v1/auth

# App Configuration
NEXT_PUBLIC_APP_NAME=Glaucoma Detection System
NEXT_PUBLIC_APP_VERSION=1.0.0

# Feature Flags (optional)
NEXT_PUBLIC_ENABLE_ANALYTICS=false
```

## Key Files Reference

| File | Purpose |
|------|---------|
| [src/store/authStore.ts](src/store/authStore.ts) | Auth state with initialization logic |
| [src/utils/api.util.ts](src/utils/api.util.ts) | API wrapper with auto token refresh |
| [src/utils/rbac.ts](src/utils/rbac.ts) | Permission system and role matrix |
| [src/config/api.config.ts](src/config/api.config.ts) | API endpoints and config |
| [src/modules/auth/services/authService.ts](src/modules/auth/services/authService.ts) | Auth API layer |
| [src/hooks/useFetch.ts](src/hooks/useFetch.ts) | Data fetching hooks |
| [src/components/common/Sidebar.tsx](src/components/common/Sidebar.tsx) | Permission-filtered navigation |
| [src/app/ClientProviders.tsx](src/app/ClientProviders.tsx) | Provider composition root |

## Common Workflows

### Adding a New Protected Route

1. Create page in [src/app/](src/app/)
2. Add auth check with `isInitialized` guard
3. Check permissions using `hasPermission(role, 'permission:name')`
4. Add navigation item to [Sidebar.tsx](src/components/common/Sidebar.tsx) with permission check
5. Update RBAC matrix in [src/utils/rbac.ts](src/utils/rbac.ts) if new permission needed

### Adding a New API Endpoint

1. Add endpoint to [src/config/api.config.ts](src/config/api.config.ts)
2. Create service function in appropriate module's `services/` folder
3. Use `fetchApi()` or HTTP helpers from [src/utils/api.util.ts](src/utils/api.util.ts)
4. Define TypeScript types in module's `types/` folder
5. Use `useFetch()` or `useMutation()` hook in component

### Adding a New Role

1. Add role to `UserRole` type in [src/modules/auth/types/index.ts](src/modules/auth/types/index.ts)
2. Update `ROLE_PERMISSIONS` matrix in [src/utils/rbac.ts](src/utils/rbac.ts)
3. Add role badge color in `getRoleBadgeColor()`
4. Create dashboard page: [src/app/dashboard/{role}/page.tsx](src/app/dashboard)
5. Update role redirect logic in [src/app/dashboard/page.tsx](src/app/dashboard/page.tsx)

## Debugging

**Redux DevTools**: Both `authStore` and `appStore` have devtools middleware enabled. Install Redux DevTools browser extension to inspect state changes.

**Auth Debugging**:
- Check browser console for auth initialization logs
- Inspect `localStorage` key `'auth-storage'` for persisted auth state
- Check Network tab for 401 responses and token refresh attempts
- Verify `isInitialized` flag before debugging auth-dependent logic

**Permission Debugging**:
```typescript
import { getRolePermissions } from '@/utils/rbac';
console.log('User permissions:', getRolePermissions(user.role));
```
