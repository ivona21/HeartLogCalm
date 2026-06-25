# HeartLog - Setup and Usage Guide

## 🎉 What's Been Built

Your HeartLog emotional wellness tracker frontend is complete! Here's what you have:

### ✨ Features Implemented

1. **Beautiful Registration Page** (`/register`)
   - Email, username, and password fields with validation
   - Serene oasis-inspired design with sage green and sky blue accents
   - Smooth gradient background
   - Real-time form validation with helpful error messages
   - Loading states during submission
   - Link to login page

2. **Elegant Login Page** (`/login`)
   - Email and password authentication
   - Calm, welcoming design matching registration
   - "Forgot password?" placeholder for future enhancement
   - Error handling with gentle coral-colored messages
   - Loading indicators
   - Link to registration page

3. **Protected Dashboard** (`/dashboard`)
   - Welcome message with user's name
   - Clean header with HeartLog branding
   - Logout functionality
   - Placeholder for future emotion tracking features
   - Protected route - only accessible when authenticated

4. **Authentication System**
   - JWT token management
   - Automatic token validation
   - Stale token cleanup on 401 errors
   - Protected routes with loading states
   - Seamless redirect flows

## 🚀 Getting Started

### Prerequisites
You mentioned you have your own backend deployed. Make sure it implements the API contract documented in `../auth/BACKEND_INTEGRATION.md`.

### Configuration

1. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Update the API URL:**
   Open `.env` and set your backend URL:
   ```
   VITE_API_URL=https://your-backend-api.com
   ```

3. **Start the development server:**
   The application is already running on port 5000!

## 🎨 Design System

Your app follows a calm, oasis-inspired aesthetic:

### Colors
- **Primary**: Sage Green (#A8BBA3) - for primary actions and branding
- **Accent**: Sky Blue (#B8D8E8) - for secondary accents
- **Background**: Soft gradient from Warm Sand to Sky Blue
- **Surface**: Warm White (#FDFBF7) for cards
- **Error**: Soft Coral (#E8A59C) instead of harsh red

### Typography
- **Font**: Inter - clean, modern, highly readable
- Consistent hierarchy with proper spacing

### Interactions
- Smooth 200ms transitions
- Gentle hover effects
- Calming loading animations
- No jarring movements or bounce effects

## 📱 User Flow

1. **First Visit** → Redirects to `/login`
2. **New User** → Click "Sign up" → Fill registration form → Auto-login → Dashboard
3. **Returning User** → Enter credentials → Dashboard
4. **Authenticated** → Access dashboard, logout when done
5. **Session Expired** → Automatic token cleanup, redirect to login

## 🔒 Security Features

- JWT token stored securely in localStorage
- Automatic token cleanup on 401 responses
- No stale credentials sent to login/register endpoints
- Protected routes prevent unauthorized access
- Form validation on both client side (with backend validation expected)

## 🏗️ Architecture

The app follows **Bulletproof React** principles:

```
client/src/
├── features/auth/        # Authentication feature module
│   ├── api/             # API calls (login, register)
│   ├── components/      # LoginForm, RegisterForm
│   ├── hooks/           # useAuth hook
│   └── index.ts         # Public exports
├── components/
│   ├── ui/              # Shadcn components
│   ├── layout/          # AuthLayout
│   └── ProtectedRoute.tsx
├── pages/               # Route pages
├── lib/                 # API client, utilities
└── types/               # Shared TypeScript types
```

### Why This Structure?
- **Feature-based**: Auth code grouped together
- **Scalable**: Easy to add new features (emotions, journal, etc.)
- **Maintainable**: Clear separation of concerns
- **Type-safe**: Full TypeScript coverage
- **Testable**: Isolated, modular components

## 🔌 Backend Integration

Your frontend expects these endpoints from your backend:

### Required Endpoints

#### POST `/api/auth/register`
```json
Request:
{
  "email": "user@example.com",
  "username": "johndoe",
  "password": "securepass123"
}

Response (201):
{
  "user": { "id": "...", "email": "...", "username": "..." },
  "token": "jwt-token"
}
```

#### POST `/api/auth/login`
```json
Request:
{
  "email": "user@example.com",
  "password": "securepass123"
}

Response (200):
{
  "user": { "id": "...", "email": "...", "username": "..." },
  "token": "jwt-token"
}
```

#### GET `/api/auth/me`
Headers: `Authorization: Bearer {token}`
```json
Response (200):
{
  "id": "...",
  "email": "...",
  "username": "..."
}
```

See `../auth/BACKEND_INTEGRATION.md` for complete details.

## 🎯 Next Steps

### Ready to Deploy?
Your frontend is production-ready! You can publish it using Replit's deployment feature.

### Future Features to Add
1. **Emotion Tracking**
   - Mood selection interface
   - Daily emotion logging
   - Visual mood indicators

2. **History & Patterns**
   - Calendar view of emotions
   - Mood patterns visualization
   - Charts and insights

3. **Journal**
   - Rich text entries
   - Tags and categories
   - Search functionality

4. **Profile & Settings**
   - User preferences
   - Password change
   - Account management

## 🧪 Testing Your Backend Integration

Once you configure `VITE_API_URL`:

1. Try registering a new account
2. Check if you're redirected to dashboard
3. Logout and login again
4. Verify the dashboard shows your username

If you encounter errors:
- Check browser console (F12)
- Verify backend URL in `.env`
- Ensure your backend allows CORS from your frontend origin
- Check backend logs for API errors

## 📚 Code Quality

- ✅ No TypeScript errors
- ✅ No console warnings or errors
- ✅ Responsive design (mobile & desktop)
- ✅ Accessibility (keyboard navigation, ARIA labels)
- ✅ Loading states for all async operations
- ✅ Error handling with user-friendly messages
- ✅ Form validation with helpful feedback

## 💡 Tips

- The design is intentionally calm - avoid adding harsh colors or jarring animations
- Keep the oasis aesthetic when adding new features
- Follow the existing component patterns for consistency
- Use the design guidelines in `../design/design_guidelines.md`
- Maintain the feature-based structure as you scale

## 🆘 Need Help?

- Architecture questions? Check `../project/bulletproof-react-guide.md`
- Design questions? See `../design/design_guidelines.md`
- Backend integration? Read `../auth/BACKEND_INTEGRATION.md`
- Project overview? Review `../platform/replit.md`

---

**Built with care for your emotional wellness journey** 🌿💙
