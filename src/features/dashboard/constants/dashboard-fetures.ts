import { DashboardFeature } from '@/features/dashboard/types/dashboard-features.ts';

export const DASHBOARD_FEATURES: DashboardFeature[] = [
  {
    title: 'Emotion Logger',
    description:
      'Click to start tracking your emotions. Log your feelings, discover patterns, and grow.',
    routeName: '/emotion-wheel',
  },
  {
    title: 'Reflection History',
    description:
      'Read back through your emotion entries in a calm timeline, with your newest reflections first.',
    routeName: '/emotion-entries',
  },
];
