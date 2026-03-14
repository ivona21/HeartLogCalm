import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/shared/routing/ProtectedRoute.tsx';
import LoginPage from '@/pages/login';
import RegisterPage from '@/pages/register';
import DashboardPage from '@/pages/dashboard';
import NotFound from '@/pages/not-found';
import EmotionWheelPage from '@/pages/emotion-wheel.tsx';
import AppLayout from '@/components/layout/AppLayout.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <AppLayout>
          <DashboardPage />
        </AppLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/emotion-wheel',
    element: (
      <ProtectedRoute>
        <AppLayout>
          <EmotionWheelPage />
        </AppLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
