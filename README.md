# HeartLog - Emotional Wellness Tracker

A beautifully designed, calm frontend application for tracking emotional wellness with a serene oasis aesthetic.

## 🌿 Project Overview

HeartLog is a frontend-only React application that connects to your own deployed backend API. Built with modern web technologies and following Bulletproof React architecture principles for scalability and maintainability.

### Features

- ✅ User authentication (registration & login)
- ✅ Beautiful calming UI with nature-inspired design
- ✅ Protected dashboard with personalized welcome
- ✅ Responsive design for all devices
- ✅ Real-time form validation
- ✅ Smooth animations and transitions

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- Your own deployed backend API (see `docs/auth/BACKEND_INTEGRATION.md`)

### Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Add your backend URL to .env
VITE_API_URL=https://your-backend-api.com

# Run development server
npm run dev
```

The app will be available at `http://localhost:5000`

## 📁 Project Structure

```
heartlog/
├── client/              # Frontend application
│   ├── src/            # Source code
│   │   ├── features/   # Feature modules (auth, etc.)
│   │   ├── components/ # Reusable components
│   │   ├── pages/      # Page components
│   │   ├── lib/        # Utilities & API client
│   │   └── types/      # TypeScript types
│   ├── public/         # Static assets
│   └── index.html      # Entry HTML
├── server/             # Simple Vite wrapper (minimal)
├── package.json        # Dependencies
├── vite.config.ts      # Vite configuration
└── tailwind.config.ts  # Tailwind CSS config
```

## 🎨 Design System

### Color Palette

- **Primary (Sage Green)**: #A8BBA3 - Growth and calm
- **Accent (Sky Blue)**: #B8D8E8 - Tranquility  
- **Background (Warm Sand)**: #F5E6D3 - Grounding warmth
- **Tertiary (Soft Lavender)**: #D4C5E2 - Gentle depth
- **Surface**: #FDFBF7 - Warm white for cards

### Typography

- **Font**: Inter - Clean, modern sans-serif
- **Hierarchy**: Consistent sizing with proper weights
- **Line Height**: 1.6 for optimal readability

## 🏗️ Architecture

Built following **Bulletproof React** principles:

- **Feature-based structure**: Code organized by features
- **API layer abstraction**: Centralized API client
- **Type safety**: Full TypeScript coverage
- **State management**: React Query for server state
- **Component composition**: Modular, reusable components

## 🔌 Backend Integration

This frontend connects to your deployed backend API. Required endpoints:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

See `docs/auth/BACKEND_INTEGRATION.md` for complete API contract.

## 📜 Scripts

```bash
npm run dev      # Start development server (port 5000)
npm run build    # Build for production
npm run preview  # Preview production build
npm run check    # TypeScript type checking
```

## 🔒 Environment Variables

Create a `.env` file:

```env
VITE_API_URL=https://your-backend-api.com
```

## 📚 Documentation

- **`docs/design/design_guidelines.md`** - Design system and UI guidelines
- **`docs/auth/BACKEND_INTEGRATION.md`** - API contract and requirements
- **`docs/project/bulletproof-react-guide.md`** - Architecture reference
- **`docs/platform/replit.md`** - Project overview and state

## 🧪 Technology Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Routing**: React Router Dom
- **State**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Icons**: Lucide React

## 🎯 Next Features

- Emotion tracking interface
- Mood calendar view
- Pattern insights dashboard  
- Journal entries with tags
- User profile and settings

## 💡 Development Notes

### Why the `client/` directory?

The vite.config.ts is configured to use the `client/` directory as the project root. This structure is required and cannot be changed.

### The `server/` directory

Contains a minimal Node.js wrapper that runs Vite on port 5000. This allows the workflow configuration to work seamlessly without modification.

### Adding Features

1. Create a feature folder in `client/src/features/`
2. Structure: `api/`, `components/`, `hooks/`, `types/`
3. Export public API via `index.ts`
4. Follow existing patterns for consistency

## 🤝 Contributing

This is a frontend-only application. All backend work should be done in your separate backend repository.

## 📄 License

MIT

---

**Built with care for your emotional wellness journey** 🌿💙
