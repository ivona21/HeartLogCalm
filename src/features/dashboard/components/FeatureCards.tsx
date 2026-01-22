import { useNavigate } from 'react-router-dom';
import { DASHBOARD_FEATURES } from '@/features/dashboard/constants/dashboard-fetures.ts';
import FeatureCard from '@/features/dashboard/components/FeatureCard.tsx';

export default function FeatureCards() {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-2 gap-4">
      {DASHBOARD_FEATURES.map(({ title, description, routeName }) => (
        <FeatureCard
          key={title}
          handleClick={() => navigate(routeName)}
          title={title}
          description={description}
        />
      ))}
    </div>
  );
}
