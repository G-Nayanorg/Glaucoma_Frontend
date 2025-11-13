# Monolithic Next.js Application

A scalable, feature-based monolithic frontend application built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Next.js 14 App Router** - Latest Next.js features with App Router
- **TypeScript** - Full type safety throughout the application
- **Tailwind CSS** - Custom design system with extended color palette
- **Feature-based Architecture** - Modular organization by feature
- **Zustand State Management** - Lightweight global state
- **Custom Hooks** - Reusable React hooks for common functionality
- **Authentication** - Complete auth flow with login/register
- **Responsive Design** - Mobile-first responsive UI
- **API Integration** - Type-safe API utilities with error handling

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **HTTP Client:** Fetch API with custom wrapper
- **Package Manager:** npm/yarn/pnpm

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Create a `.env.local` file (already provided) and configure your environment variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_APP_NAME=Monolithic Next.js App
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
glaucoma/
├── public/                          # Static assets
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── page.tsx       # Login page
│   │   │   └── register/
│   │   │       └── page.tsx       # Register page
│   │   ├── dashboard/
│   │   │   └── page.tsx           # Dashboard page
│   │   ├── users/
│   │   │   └── page.tsx           # Users management page
│   │   ├── layout.tsx             # Root layout
│   │   ├── page.tsx               # Home page
│   │   ├── loading.tsx            # Global loading UI
│   │   ├── error.tsx              # Global error UI
│   │   └── not-found.tsx          # 404 page
│   │
│   ├── modules/                   # Feature modules
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   └── RegisterForm.tsx
│   │   │   ├── services/
│   │   │   │   └── authService.ts
│   │   │   └── types/
│   │   │       └── index.ts
│   │   ├── dashboard/
│   │   │   └── components/
│   │   │       └── StatsCard.tsx
│   │   └── users/
│   │       ├── components/
│   │       │   └── UserTable.tsx
│   │       ├── services/
│   │       │   └── userService.ts
│   │       └── types/
│   │           └── index.ts
│   │
│   ├── components/                # Global components
│   │   └── common/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Header.tsx
│   │       ├── Sidebar.tsx
│   │       └── Loader.tsx
│   │
│   ├── contexts/                  # React contexts
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   │
│   ├── hooks/                     # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useFetch.ts
│   │   └── useLocalStorage.ts
│   │
│   ├── store/                     # Zustand stores
│   │   ├── index.ts              # App store
│   │   └── authStore.ts          # Auth store
│   │
│   ├── config/                    # Configuration files
│   │   ├── api.config.ts         # API endpoints
│   │   └── app.config.ts         # App settings
│   │
│   ├── utils/                     # Utility functions
│   │   ├── api.util.ts           # API wrapper
│   │   ├── cn.ts                 # Class name merger
│   │   ├── validators.ts         # Validation functions
│   │   └── format.ts             # Formatting utilities
│   │
│   └── styles/
│       └── globals.css            # Global styles
│
├── .env.local                     # Environment variables
├── .gitignore
├── next.config.js                 # Next.js configuration
├── tailwind.config.ts             # Tailwind configuration
├── tsconfig.json                  # TypeScript configuration
├── postcss.config.js              # PostCSS configuration
├── package.json
└── README.md
```

## Key Files Overview

### Configuration Files

#### `tailwind.config.ts`
Custom Tailwind configuration with extended color palette, typography plugin, and custom animations.

#### `tsconfig.json`
TypeScript configuration with path aliases for clean imports.

#### `next.config.js`
Next.js configuration for React strict mode and image domains.

### Core Application Files

#### `src/app/layout.tsx`
Root layout component that wraps the entire application with global styles and metadata.

#### `src/app/page.tsx`
Home page with hero section, features showcase, and call-to-action.

#### `src/config/api.config.ts`
Centralized API configuration with all endpoints and settings.

#### `src/utils/api.util.ts`
Type-safe fetch wrapper with error handling and request helpers (get, post, put, delete).

#### `src/modules/auth/services/authService.ts`
Authentication service with login, register, logout, and token refresh functionality.

#### `src/components/common/Button.tsx`
Reusable button component with multiple variants (primary, secondary, outline, ghost, danger) and sizes.

## Module Structure

Each feature module follows this structure:

```
module-name/
├── components/     # Module-specific UI components
├── services/       # API calls and business logic
├── types/          # TypeScript interfaces
└── hooks/          # Module-specific hooks (optional)
```

## API Integration

The application uses a custom fetch wrapper for type-safe API calls:

```typescript
import { post } from '@/utils/api.util';
import { API_CONFIG } from '@/config/api.config';

// Example: Login API call
const response = await post<AuthResponse>(
  API_CONFIG.endpoints.auth.login,
  { email, password }
);
```

## State Management

Using Zustand for lightweight state management:

```typescript
import { useAuthStore } from '@/store/authStore';

function Component() {
  const { user, login, logout } = useAuthStore();
  // Use auth state and actions
}
```

## Custom Hooks

### `useAuth`
Access authentication state and methods.

### `useFetch`
Data fetching with loading and error states.

### `useLocalStorage`
Persist state to localStorage with TypeScript support.

## Styling

### Tailwind Utilities

Custom utility classes available:
- `.container-custom` - Responsive container
- `.card` - Card component styles
- `.btn` - Button base styles
- `.input-field` - Input field styles
- `.label` - Form label styles

### Color Palette

Extended color palette with semantic naming:
- `primary` - Brand colors (blue)
- `secondary` - Neutral colors (slate)
- `success` - Success states (green)
- `warning` - Warning states (yellow/orange)
- `error` - Error states (red)
- `info` - Info states (sky blue)

## Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

## Environment Variables

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_AUTH_API_URL=http://localhost:4000/api/auth

# App Configuration
NEXT_PUBLIC_APP_NAME=Monolithic Next.js App
NEXT_PUBLIC_APP_VERSION=1.0.0

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=false
```

## Best Practices

1. **File Organization**: Keep related files together in feature modules
2. **Type Safety**: Use TypeScript interfaces for all data structures
3. **Component Reusability**: Create reusable components in `components/common/`
4. **API Calls**: Use service files for all API interactions
5. **State Management**: Use Zustand for global state, React state for local
6. **Styling**: Use Tailwind utility classes with the `cn()` helper for dynamic classes
7. **Error Handling**: Implement proper error boundaries and error states
8. **Code Comments**: Add clear comments and JSDoc for complex logic

## License

This project is open source and available under the MIT License.
