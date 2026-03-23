import { useEffect } from 'react';
import { Wheel } from '@/features/emotion-wheel/components/Wheel.tsx';

export default function EmotionWheelPage() {
  useEffect(() => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' });
  }, []);

  return (
    <div className="-mx-4 md:mx-0 md:flex md:flex-col md:items-center md:gap-6">
      <div className="w-full h-[100dvh] md:h-auto md:min-h-[340px] md:max-w-[820px]">
        <Wheel />
      </div>
    </div>
  );
}
