import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from '@/shared/routing/ProtectedRoute.tsx';
import { HomeRoute } from '@/shared/routing/HomeRoute.tsx';
import LoginPage from '@/pages/login';
import RegisterPage from '@/pages/register';
import EmailConfirmationPage from '@/pages/email-confirmation';
import DashboardPage from '@/pages/dashboard';
import ChangePasswordPage from '@/pages/change-password';
import NotFound from '@/pages/not-found';
import EmotionWheelPage from '@/pages/emotion-wheel.tsx';
import AppLayout from '@/components/layout/AppLayout.tsx';

const routes = [
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
    path: '/email-confirmation',
    element: <EmailConfirmationPage />,
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
    path: '/change-password',
    element: (
      <ProtectedRoute>
        <AppLayout>
          <ChangePasswordPage />
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
];

if (import.meta.env.DEV) {
  const DesignSystemPage = lazy(() => import('@/pages/dev/DesignSystem.tsx'));

  routes.push({
    path: '/design-system',
    element: (
      <AppLayout>
        <Suspense fallback={null}>
          <DesignSystemPage />
        </Suspense>
      </AppLayout>
    ),
  });

  routes.push({
    path: '/dev/design-system',
    element: (
      <AppLayout>
        <Suspense fallback={null}>
          <DesignSystemPage />
        </Suspense>
      </AppLayout>
    ),
  });
}

export const router = createBrowserRouter(routes);
