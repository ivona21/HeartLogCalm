import { useState, useMemo } from 'react';
import { arc } from 'd3-shape';
import { CORE_EMOTIONS } from '@/features/emotion-wheel/constants/core-emotions.ts';
import { useTranslation } from '@/lib/i18n';
import {
  CENTER_RADIUS,
  CORE_INNER,
  CORE_OUTER,
  CORE_TEXT_RADIUS,
  SECONDARY_INNER,
  SECONDARY_OUTER,
  SECONDARY_TEXT_RADIUS,
  TERTIARY_INNER,
  TERTIARY_OUTER,
  TERTIARY_TEXT_RADIUS,
} from '@/features/emotion-wheel/constants/radii.ts';
import { useWheelGestures } from '@/features/emotion-wheel/hooks/useWheelGestures.ts';
import {
  buildTextArcPath,
  getMidAngle,
  keyToId,
  radialTextTransform,
  tintColor,
  toRad,
} from '@/features/emotion-wheel/helpers/helpers.ts';

interface WheelProps {
  onSelect?: (emotionKeys: string[]) => void;
}

const arcGen = arc();

function fillPath(
  innerRadius: number,
  outerRadius: number,
  startDeg: number,
  endDeg: number,
): string {
  return (
    arcGen({
      innerRadius: innerRadius,
      outerRadius: outerRadius,
      startAngle: toRad(startDeg),
      endAngle: toRad(endDeg),
    }) ?? ''
  );
}

function textArcPath(radius: number, startDeg: number, endDeg: number): string {
  const midpointAngle = getMidAngle(startDeg, endDeg);
  const norm = ((midpointAngle % 360) + 360) % 360;
  const reversed = norm >= 90 && norm <= 270;
  return buildTextArcPath(startDeg, endDeg, radius, reversed);
}

export const Wheel = ({ onSelect }: WheelProps) => {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [hovered, setHovered] = useState<string | null>(null);

  const { viewBox, touchHandlers } = useWheelGestures();

  const { translate } = useTranslation('emotions');

  const handleClick = (key: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      const exists = next.has(key);

      if (exists) next.delete(key);
      else if (next.size < 10) next.add(key);

      onSelect?.([...next]);
      return next;
    });
  };

  const segmentOpacity = (key: string) => {
    if (selected.size === 0) return 1;
    if (selected.has(key)) return 1;
    return 0.55;
  };

  const segmentFilter = (key: string) => {
    if (selected.has(key)) return 'brightness(1.08)';
    if (key === hovered) return 'brightness(1.06)';
    return 'none';
  };

  const allTextPaths = useMemo(() => {
    const paths: { id: string; d: string }[] = [];
    CORE_EMOTIONS.forEach((emotion) => {
      paths.push({
        id: `tp-${keyToId(emotion.key)}`,
        d: textArcPath(CORE_TEXT_RADIUS, emotion.startAngle, emotion.endAngle),
      });
    });
    return paths;
  }, []);

  return (
    <svg
      viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
      width="100%"
      height="100%"
      style={{
        display: 'block',
        maxWidth: 820,
        maxHeight: 820,
        margin: '0 auto',
        touchAction: 'none',
      }}
      aria-label="Emotion wheel"
      {...touchHandlers}
    >
      <defs>
        {allTextPaths.map((textPathDef) => (
          <path key={textPathDef.id} id={textPathDef.id} d={textPathDef.d} fill="none" />
        ))}
      </defs>

      {/* ── CORE ring ── */}
      {CORE_EMOTIONS.map((emotion) => {
        const emotionKey = emotion.key;
        return (
          <g
            key={emotionKey}
            style={{ cursor: 'pointer' }}
            onClick={() => handleClick(emotionKey)}
            onMouseEnter={() => setHovered(emotionKey)}
            onMouseLeave={() => setHovered(null)}
            aria-label={translate(emotionKey)}
            role="button"
          >
            <path
              d={fillPath(CORE_INNER, CORE_OUTER, emotion.startAngle, emotion.endAngle)}
              fill={emotion.color}
              stroke="white"
              strokeWidth="1.5"
              style={{
                opacity: segmentOpacity(emotionKey),
                filter: segmentFilter(emotionKey),
                transition: 'opacity 180ms ease, filter 180ms ease',
              }}
            />
            <text
              fontSize="13"
              fontWeight="700"
              fill="#1a1a1a"
              pointerEvents="none"
              style={{ userSelect: 'none' }}
            >
              <textPath href={`#tp-${keyToId(emotionKey)}`} startOffset="50%" textAnchor="middle">
                {translate(emotionKey)}
              </textPath>
            </text>
          </g>
        );
      })}

      {/* ── SECONDARY ring ── */}
      {CORE_EMOTIONS.map((emotion) => {
        const secondaryAngleDelta =
          (emotion.endAngle - emotion.startAngle) / emotion.secondary.length;
        const secondaryFillColor = tintColor(emotion.color, 0.38);

        return emotion.secondary.map((secondaryEmotion, secondaryIndex) => {
          const segmentStartAngle = emotion.startAngle + secondaryIndex * secondaryAngleDelta;
          const segmentEndAngle = segmentStartAngle + secondaryAngleDelta;
          const midpointAngle = getMidAngle(segmentStartAngle, segmentEndAngle);
          const emotionKey = secondaryEmotion.key;

          return (
            <g
              key={emotionKey}
              style={{ cursor: 'pointer' }}
              onClick={() => handleClick(emotionKey)}
              onMouseEnter={() => setHovered(emotionKey)}
              onMouseLeave={() => setHovered(null)}
              aria-label={translate(emotionKey)}
              role="button"
            >
              <path
                d={fillPath(SECONDARY_INNER, SECONDARY_OUTER, segmentStartAngle, segmentEndAngle)}
                fill={selected.has(emotionKey) ? emotion.color : secondaryFillColor}
                stroke="white"
                strokeWidth="1"
                style={{
                  opacity: segmentOpacity(emotionKey),
                  filter: segmentFilter(emotionKey),
                  transition: 'opacity 180ms ease, filter 180ms ease',
                }}
              />
              <text
                fontSize="12"
                fontWeight="500"
                fill="#1a1a1a"
                pointerEvents="none"
                transform={radialTextTransform(midpointAngle, SECONDARY_TEXT_RADIUS)}
                textAnchor="middle"
                dominantBaseline="central"
                style={{ userSelect: 'none' }}
              >
                {translate(emotionKey)}
              </text>
            </g>
          );
        });
      })}

      {/* ── TERTIARY ring ── */}
      {CORE_EMOTIONS.map((emotion) => {
        const secondaryAngleDelta =
          (emotion.endAngle - emotion.startAngle) / emotion.secondary.length;
        const tertiaryFillColor = tintColor(emotion.color, 0.63);

        return emotion.secondary.map((secondaryEmotion, secondaryIndex) => {
          const secondaryStartAngle = emotion.startAngle + secondaryIndex * secondaryAngleDelta;
          const tertiaryAngleDelta = secondaryAngleDelta / secondaryEmotion.tertiary.length;

          return secondaryEmotion.tertiary.map((tertiaryEmotion, tertiaryIndex) => {
            const segmentStartAngle = secondaryStartAngle + tertiaryIndex * tertiaryAngleDelta;
            const segmentEndAngle = segmentStartAngle + tertiaryAngleDelta;
            const midpointAngle = getMidAngle(segmentStartAngle, segmentEndAngle);
            const emotionKey = tertiaryEmotion.key;

            return (
              <g
                key={emotionKey}
                style={{ cursor: 'pointer' }}
                onClick={() => handleClick(emotionKey)}
                onMouseEnter={() => setHovered(emotionKey)}
                onMouseLeave={() => setHovered(null)}
                aria-label={translate(emotionKey)}
                role="button"
              >
                <path
                  d={fillPath(TERTIARY_INNER, TERTIARY_OUTER, segmentStartAngle, segmentEndAngle)}
                  fill={selected.has(emotionKey) ? emotion.color : tertiaryFillColor}
                  stroke="white"
                  strokeWidth="0.7"
                  style={{
                    opacity: segmentOpacity(emotionKey),
                    filter: segmentFilter(emotionKey),
                    transition: 'opacity 180ms ease, filter 180ms ease',
                  }}
                />
                <text
                  fontSize="11"
                  fontWeight="400"
                  fill="#1a1a1a"
                  pointerEvents="none"
                  transform={radialTextTransform(midpointAngle, TERTIARY_TEXT_RADIUS)}
                  textAnchor="middle"
                  dominantBaseline="central"
                  style={{ userSelect: 'none' }}
                >
                  {translate(emotionKey)}
                </text>
              </g>
            );
          });
        });
      })}

      {/* ── Centre ── */}
      <circle
        r={CENTER_RADIUS}
        fill="white"
        stroke="#e5e7eb"
        strokeWidth="1.5"
        style={{ pointerEvents: 'none' }}
      />
      <text
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="11"
        fontWeight="500"
        fill="#6b7280"
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        HeartLog
      </text>
    </svg>
  );
};
