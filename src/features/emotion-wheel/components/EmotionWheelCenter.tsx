import { useEffect, useId, useState } from 'react';
import LogoIconImage from '@/assets/LogoSimpleNoText.png';

interface EmotionWheelCenterProps {
  centerRadius: number;
  isAuthenticated: boolean;
  selectionCount: number;
  selectedColors: string[];
  onHeartClick: () => void;
}

export function EmotionWheelCenter({
  centerRadius,
  isAuthenticated,
  selectionCount,
  selectedColors,
  onHeartClick,
}: EmotionWheelCenterProps) {
  const isActive = isAuthenticated && selectionCount > 0;
  const [isBeating, setIsBeating] = useState(false);
  const colorMaskId = useId();
  const colorGradientId = useId();
  const heartScale = isBeating ? 1.28 : 1;
  const imageSize = centerRadius * 0.7875 * heartScale;
  const imageOffset = -imageSize / 2;
  const singleColor = selectedColors[0] ?? 'hsl(var(--muted-foreground))';
  const heartFill = selectedColors.length === 1 ? singleColor : `url(#${colorGradientId})`;

  useEffect(() => {
    if (!isActive) {
      setIsBeating(false);
      return;
    }

    setIsBeating(true);
    const timeoutId = window.setTimeout(() => {
      setIsBeating(false);
    }, 520);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isActive, selectionCount]);

  return (
    <g
      aria-label={isActive ? 'Continue with selected emotions' : undefined}
      onClick={isActive ? onHeartClick : undefined}
      style={{
        cursor: isActive ? 'pointer' : 'default',
        outline: 'none',
      }}
    >
      <defs>
        <mask id={colorMaskId} maskUnits="userSpaceOnUse">
          <image
            href={LogoIconImage}
            x={imageOffset}
            y={imageOffset}
            width={imageSize}
            height={imageSize}
          />
        </mask>
        <linearGradient id={colorGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          {selectedColors.map((color, index) => {
            const offset = selectedColors.length === 1
              ? '0%'
              : `${(index / (selectedColors.length - 1)) * 100}%`;

            return <stop key={`${color}-${offset}`} offset={offset} stopColor={color} />;
          })}
        </linearGradient>
      </defs>
      <circle
        r={centerRadius}
        fill="white"
        stroke="hsl(var(--border))"
        strokeWidth="1.5"
      />
      <g>
        {!isActive ? (
          <image
            href={LogoIconImage}
            x={imageOffset}
            y={imageOffset}
            width={imageSize}
            height={imageSize}
            style={{
              pointerEvents: 'none',
            }}
          />
        ) : null}
        {isActive && selectedColors.length > 0 ? (
          <rect
            x={imageOffset}
            y={imageOffset}
            width={imageSize}
            height={imageSize}
            fill={heartFill}
            mask={`url(#${colorMaskId})`}
            pointerEvents="none"
          />
        ) : null}
      </g>
    </g>
  );
}
