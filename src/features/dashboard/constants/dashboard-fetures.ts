import { DashboardFeature } from '@/features/dashboard/types/dashboard-features.ts';

export const DASHBOARD_FEATURES: DashboardFeature[] = [
  {
    title: 'Emotion Logger',
    description:
      'Click to start tracking your emotions. Log your feelings, discover patterns, and grow.',
    routeName: '/emotion-wheel',
  },
  {
    title: 'Learning SVG',
    description: 'Temp page - dev space to learn svg better',
    routeName: '/learning-svg',
  },
  {
    title: 'Items',
    description: 'Just for practice page',
    routeName: '/items',
  },
  {
    title: 'Form Playground',
    description: 'My place to learn more about how react-hook-form works',
    routeName: '/form-playground',
  },
];
