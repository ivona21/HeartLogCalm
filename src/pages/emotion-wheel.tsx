import { Wheel } from '@/features/emotion-wheel/components/Wheel.tsx';

export default function EmotionWheelPage() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div
        className="min-h-[340px]"
        style={{ width: '100%', maxWidth: 820 }}
      >
        <Wheel />
      </div>
    </div>
  );
}
