# Bulletproof React Architecture Guide for HeartLog

## Project Structure Philosophy

Following Bulletproof React principles for a scalable, maintainable React TypeScript application.

### Core Principles
1. **Feature-based organization** - Group by features, not file types
2. **Clear boundaries** - Separation between features, components, and infrastructure
3. **Type safety** - Comprehensive TypeScript usage
4. **API layer abstraction** - Centralized API communication
5. **Component composition** - Reusable, modular components

## Folder Structure

```
client/src/
├── features/           # Feature modules (auth, emotions, etc.)
│   ├── auth/
│   │   ├── api/       # API calls specific to auth
│   │   ├── components/ # Auth-specific components
│   │   ├── hooks/     # Auth-specific hooks
│   │   ├── types/     # Auth types
│   │   └── index.ts   # Public API
├── components/        # Shared/common components
│   ├── ui/           # shadcn components (already present)
│   └── layout/       # Layout components
├── lib/              # Utility functions, API client
├── hooks/            # Shared hooks
├── types/            # Shared TypeScript types
├── config/           # App configuration
└── App.tsx           # Root component with routing

```

## Key Patterns for HeartLog

### 1. API Layer Design
- Create centralized API client in `lib/api-client.ts`
- Feature-specific API functions in `features/[feature]/api/`
- Use React Query for data fetching and caching
- Type-safe API contracts

### 2. Authentication State
- Use React Query for auth state management
- Create `features/auth/` module
- Auth context/provider for current user
- Protected route wrapper

### 3. Component Organization
- Shared UI components in `components/ui/` (shadcn)
- Feature-specific components in `features/[feature]/components/`
- Layout components for page structure
- Form components with react-hook-form + zod

### 4. Type Safety
- Shared types in `types/`
- Feature-specific types in `features/[feature]/types/`
- API response types
- Form validation schemas with Zod

### 5. Routing
- use react-router-dom
- Protected routes for authenticated pages
- Public routes for auth pages

## HeartLog Specific Implementation

### Features Structure
```
features/
└── auth/
    ├── api/
    │   ├── register.ts      # Registration API call
    │   └── login.ts         # Login API call
    ├── components/
    │   ├── RegisterForm.tsx
    │   └── LoginForm.tsx
    ├── hooks/
    │   └── useAuth.ts       # Auth hook for context
    ├── types/
    │   └── index.ts         # Auth types
    └── index.ts             # Export public API
```

### Backend Integration
- Since backend is already deployed, create API client to connect
- Use environment variables for API URL
- Implement proper error handling for API calls
- Token storage in localStorage/sessionStorage

### State Management
- React Query for server state (API data)
- React Context for auth state
- Local state for UI (forms, modals)

## Best Practices
1. Export only what's needed from feature modules
2. Keep components small and focused
3. Use custom hooks for business logic
4. Comprehensive error boundaries
5. Loading and error states for all async operations
6. Responsive design using Tailwind
7. Accessibility (ARIA labels, keyboard navigation)
