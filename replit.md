# HeartLog - Emotional Wellness Tracker

## Overview
HeartLog is a beautifully designed emotional wellness tracking application with a calm, oasis-inspired aesthetic. The frontend is built with React TypeScript following Bulletproof React architecture principles.

## Current State
**Phase:** MVP Authentication (Registration & Login)
**Last Updated:** November 15, 2025

### Implemented Features
- ✅ User registration with email, username, and password
- ✅ User login with email and password
- ✅ Protected routes with authentication
- ✅ Beautiful, calm UI with sage green and sky blue color palette
- ✅ Responsive design for mobile and desktop
- ✅ Form validation with Zod
- ✅ Loading and error states
- ✅ Dashboard placeholder for authenticated users

### Architecture
The project follows **Bulletproof React** principles:
- **Feature-based structure**: Code organized by features (`features/auth/`)
- **API layer abstraction**: Centralized API client in `lib/api-client.ts`
- **Type safety**: Comprehensive TypeScript usage with shared schemas
- **Component composition**: Modular, reusable components
- **State management**: React Query for server state, React Context for auth

### Tech Stack
- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack Query (React Query)
- **Form Handling**: React Hook Form + Zod validation
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Backend**: External API (user provides their own deployed backend)

### Project Structure
```
client/src/
├── features/              # Feature modules
│   └── auth/
│       ├── api/          # Auth API calls
│       ├── components/   # Auth components (LoginForm, RegisterForm)
│       ├── hooks/        # useAuth hook
│       └── index.ts      # Public exports
├── components/
│   ├── ui/              # Shadcn components
│   ├── layout/          # Layout components (AuthLayout)
│   └── ProtectedRoute.tsx
├── pages/               # Page components
│   ├── login.tsx
│   ├── register.tsx
│   ├── dashboard.tsx
│   └── not-found.tsx
├── lib/                 # Utilities
│   ├── api-client.ts    # HTTP client
│   ├── queryClient.ts   # React Query config
│   └── utils.ts
├── types/               # Shared TypeScript types
│   └── index.ts
└── App.tsx             # Root with routing
```

## Design System

### Color Palette
- **Primary (Sage Green)**: `#A8BBA3` - growth and calm
- **Accent (Sky Blue)**: `#B8D8E8` - tranquility
- **Background (Warm Sand)**: `#F5E6D3` - grounding warmth
- **Tertiary (Soft Lavender)**: `#D4C5E2` - gentle depth
- **Surface**: `#FDFBF7` - warm white for cards
- **Text**: Deep charcoal for primary, muted gray for secondary
- **Error**: Soft coral `#E8A59C` instead of harsh red

### Typography
- **Font Family**: Inter (clean, modern sans-serif)
- **Hierarchy**: Consistent sizing with proper font weights
- **Line Height**: 1.6 for readability

### Component Guidelines
- **Spacing**: Generous padding (p-6 to p-8) for breathing room
- **Borders**: Subtle borders (#E8E6E3), sage green on focus
- **Shadows**: Soft, warm-toned shadows
- **Transitions**: Smooth 200ms transitions
- **Interactions**: Minimal, calm animations

## Backend Integration

### API Configuration
The frontend connects to an external backend API. Configure via environment variables:

```bash
VITE_API_URL=https://your-backend-api.com
```

### Expected Endpoints
See `BACKEND_INTEGRATION.md` for complete API contract.

#### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Token Management
- JWT tokens stored in `localStorage` under `auth_token`
- Tokens included in Authorization header: `Bearer {token}`
- Auto-logout on 401 responses

## Development Guidelines

### Adding New Features
1. Create feature folder in `features/`
2. Structure: `api/`, `components/`, `hooks/`, `types/`
3. Export public API via `index.ts`
4. Follow existing patterns for consistency

### Component Best Practices
- Use Shadcn UI components from `@/components/ui/`
- Follow design guidelines for spacing, colors, typography
- Add `data-testid` attributes for testing
- Implement loading and error states
- Ensure responsive design

### State Management
- **Server State**: Use React Query (`useQuery`, `useMutation`)
- **Auth State**: Custom `useAuth` hook
- **UI State**: Local component state or React Context

### Form Handling
- Use React Hook Form with Zod validation
- Schema validation in `shared/schema.ts`
- Display friendly error messages
- Loading states during submission

## Running the Project

```bash
npm run dev
```

The frontend runs on port 5000. Make sure your backend API is running and the `VITE_API_URL` is configured correctly.

## Next Phase Features
- Emotion logging interface with mood selection
- Emotion history and calendar view
- Mood patterns visualization dashboard
- Journal entries with tags
- User profile and settings

## User Preferences
- **Design Philosophy**: Calm, sanctuary-like oasis aesthetic
- **No SSO**: Simple email/password authentication only
- **External Backend**: User provides their own deployed API
- **Architecture**: Follow Bulletproof React patterns strictly
