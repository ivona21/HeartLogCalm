import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from '@/shared/routing/ProtectedRoute.tsx';
import { HomeRoute } from '@/shared/routing/HomeRoute.tsx';
import LoginPage from '@/pages/login';
import RegisterPage from '@/pages/register';
import DashboardPage from '@/pages/dashboard';
import NotFound from '@/pages/not-found';
import EmotionWheelPage from '@/pages/emotion-wheel.tsx';
import AppLayout from '@/components/layout/AppLayout.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AppLayout>
        <HomeRoute />
      </AppLayout>
    ),
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
      <AppLayout>
        <EmotionWheelPage />
      </AppLayout>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
