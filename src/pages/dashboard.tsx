import { useNavigate } from 'react-router-dom';
import WelcomeCard from '@/features/dashboard/components/WelcomeCard.tsx';
import FeatureCard from '@/features/dashboard/components/FeatureCard.tsx';

const features = [
  {
    title: 'Emotion Logger',
    description:
      'Click to start tracking your emotions. Log your feelings, discover patterns, and grow.',
  },
];

export default function DashboardPage() {
  const navigate = useNavigate();

  const goToEmotionWheelPage = () => {
    navigate('/emotion-wheel');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <WelcomeCard />
      <FeatureCard
        handleClick={goToEmotionWheelPage}
        title={features[0].title}
        description={features[0].description}
      />
    </div>
  );
}
