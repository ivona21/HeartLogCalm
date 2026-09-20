import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from '@/shared/routing/ProtectedRoute.tsx';
import { GuestOnlyRoute } from '@/shared/routing/GuestOnlyRoute.tsx';
import { HomeRoute } from '@/shared/routing/HomeRoute.tsx';
import LoginPage from '@/pages/login';
import RegisterPage from '@/pages/register';
import EmailConfirmationPage from '@/pages/email-confirmation';
import ResetPasswordPage from '@/pages/reset-password';
import DashboardPage from '@/pages/dashboard';
import EntriesPage from '@/pages/entries';
import ChangePasswordPage from '@/pages/change-password';
import NotFound from '@/pages/not-found';
import EmotionWheelPage from '@/pages/emotion-wheel.tsx';
import AppLayout from '@/components/layout/AppLayout.tsx';
import AppSectionPlaceholder from '@/pages/app-section-placeholder.tsx';

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
    element: (
      <GuestOnlyRoute>
        <LoginPage />
      </GuestOnlyRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <GuestOnlyRoute>
        <RegisterPage />
      </GuestOnlyRoute>
    ),
  },
  {
    path: '/email-confirmation',
    element: <EmailConfirmationPage />,
  },
  {
    path: '/reset-password',
    element: <ResetPasswordPage />,
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
    path: '/entries',
    element: (
      <ProtectedRoute>
        <AppLayout>
          <EntriesPage />
        </AppLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/insights',
    element: (
      <ProtectedRoute>
        <AppLayout>
          <AppSectionPlaceholder title="Coming soon" />
        </AppLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/activity',
    element: (
      <ProtectedRoute>
        <AppLayout>
          <AppSectionPlaceholder title="Coming soon" />
        </AppLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/settings',
    element: (
      <ProtectedRoute>
        <AppLayout>
          <AppSectionPlaceholder
            eyebrow="Preferences"
            title="Settings"
            description="Manage account preferences, reminders, privacy choices, and personal HeartLog defaults."
          />
        </AppLayout>
      </ProtectedRoute>
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
