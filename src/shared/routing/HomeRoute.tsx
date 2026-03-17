/**
 * HomeRoute
 *
 * Renders the page component that corresponds to DEFAULT_HOME_ROUTE.
 * This is what "/" always shows — it acts as the configurable home of the app.
 *
 * To add a new home option:
 *   1. Import the page component below
 *   2. Add an entry to HOME_COMPONENTS keyed by its route path
 *   3. Set DEFAULT_HOME_ROUTE in src/config/defaults.ts to that path
 */
import { DEFAULT_HOME_ROUTE } from '@/config/defaults.ts';
import EmotionWheelPage from '@/pages/emotion-wheel.tsx';
import DashboardPage from '@/pages/dashboard.tsx';

const HOME_COMPONENTS: Record<string, React.ComponentType> = {
  '/emotion-wheel': EmotionWheelPage,
  '/dashboard': DashboardPage,
};

export function HomeRoute() {
  const Component = HOME_COMPONENTS[DEFAULT_HOME_ROUTE];

  if (!Component) {
    throw new Error(
      `No component registered for DEFAULT_HOME_ROUTE: "${DEFAULT_HOME_ROUTE}". ` +
      `Add an entry to HOME_COMPONENTS in src/shared/routing/HomeRoute.tsx.`
    );
  }

  return <Component />;
}
