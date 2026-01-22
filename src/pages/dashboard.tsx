import WelcomeCard from '@/features/dashboard/components/WelcomeCard.tsx';
import FeatureCards from '@/features/dashboard/components/FeatureCards.tsx';

export default function DashboardPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <WelcomeCard />
      <FeatureCards />
    </div>
  );
}
