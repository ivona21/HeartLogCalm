import { Wheel } from '@/features/emotion-wheel/components/Wheel.tsx';

export default function EmotionWheelPage() {
  return (
    <div className="-pt-[56px] -mb-8 -mx-4 md:pt-0 md:mb-0 md:mx-0 md:flex md:flex-col md:items-center md:gap-6">
      <div className="w-full h-[100dvh] md:h-auto md:min-h-[340px] md:max-w-[820px]">
        <Wheel />
      </div>
    </div>
  );
}
