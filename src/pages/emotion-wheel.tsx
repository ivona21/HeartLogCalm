import { Wheel } from '@/features/emotion-wheel/components/Wheel.tsx';

export default function EmotionWheelPage() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-foreground">
          How are you feeling?
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Click any segment to identify your emotion
        </p>
      </div>

      <div
        className="min-h-[340px]"
        style={{ width: '100%', maxWidth: 820 }}
      >
        <Wheel />
      </div>
    </div>
  );
}
