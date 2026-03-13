import { useState } from 'react';
import { Wheel } from '@/features/emotion-wheel/components/Wheel.tsx';
import { useTranslation } from '@/lib/i18n';

export default function EmotionWheelPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const { translate } = useTranslation('emotions');

  const label = selected ? translate(selected) : null;

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
        <Wheel onSelect={setSelected} />
      </div>

      <div className="h-10 flex items-center justify-center">
        {label ? (
          <div className="bg-card border border-border rounded-md px-5 py-2 shadow-sm text-center transition-all duration-200">
            <span className="text-xs text-muted-foreground uppercase tracking-wide">
              Selected emotion
            </span>
            <p className="text-base font-semibold text-foreground mt-0.5">
              {label}
            </p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground italic">
            No emotion selected
          </p>
        )}
      </div>
    </div>
  );
}
