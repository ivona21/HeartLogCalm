import { useState, useMemo } from 'react';
import { arc } from 'd3-shape';
import { CORE_EMOTIONS } from '@/features/emotion-wheel/constants/core-emotions.ts';
import { TRANSLATIONS } from '@/features/emotion-wheel/constants/translations.ts';
import {
  CORE_INNER,
  CORE_OUTER,
  CORE_TEXT_RADIUS,
  SECONDARY_INNER,
  SECONDARY_OUTER,
  SECONDARY_TEXT_RADIUS,
  TERTIARY_INNER,
  TERTIARY_OUTER,
  TERTIARY_TEXT_RADIUS,
  CENTER_RADIUS,
  VIEWBOX_SIZE,
} from '@/features/emotion-wheel/constants/radii.ts';
import {
  toRad,
  getMidAngle,
  buildTextArcPath,
  tintColor,
  radialTextTransform,
  keyToId,
} from '@/features/emotion-wheel/helpers/helpers.ts';

interface WheelProps {
  locale?: string;
  onSelect?: (emotionKey: string | null) => void;
}

const arcGen = arc();

function fillPath(
  innerR: number,
  outerR: number,
  startDeg: number,
  endDeg: number,
): string {
  return (
    arcGen({
      innerRadius: innerR,
      outerRadius: outerR,
      startAngle: toRad(startDeg),
      endAngle: toRad(endDeg),
    }) ?? ''
  );
}

function textArcPath(radius: number, startDeg: number, endDeg: number): string {
  const mid = getMidAngle(startDeg, endDeg);
  const reversed = mid > 180 && mid < 360;
  return buildTextArcPath(startDeg, endDeg, radius, reversed);
}

export const Wheel = ({ locale = 'en', onSelect }: WheelProps) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const labels = TRANSLATIONS[locale] ?? TRANSLATIONS['en'];
  const t = (key: string) => labels[key] ?? key;

  const handleClick = (key: string) => {
    const next = key === selected ? null : key;
    setSelected(next);
    onSelect?.(next);
  };

  const segmentOpacity = (key: string) => {
    if (!selected) return 1;
    if (key === selected) return 1;
    return 0.55;
  };

  const segmentFilter = (key: string) => {
    if (key === selected) return 'brightness(1.08)';
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
      const secDelta =
        (emotion.endAngle - emotion.startAngle) / emotion.secondary.length;
      emotion.secondary.forEach((sec, si) => {
        const s = emotion.startAngle + si * secDelta;
        const e = s + secDelta;
        paths.push({
          id: `tp-${keyToId(sec.key)}`,
          d: textArcPath(SECONDARY_TEXT_RADIUS, s, e),
        });
      });
    });
    return paths;
  }, []);

  const vb = VIEWBOX_SIZE;

  return (
    <svg
      viewBox={`-${vb} -${vb} ${vb * 2} ${vb * 2}`}
      width="100%"
      height="100%"
      style={{ display: 'block', maxWidth: 820, maxHeight: 820, margin: '0 auto' }}
      aria-label="Emotion wheel"
    >
      <defs>
        {allTextPaths.map((p) => (
          <path key={p.id} id={p.id} d={p.d} fill="none" />
        ))}
      </defs>

      {/* ── CORE ring ── */}
      {CORE_EMOTIONS.map((emotion) => {
        const key = emotion.key;
        return (
          <g
            key={key}
            style={{ cursor: 'pointer' }}
            onClick={() => handleClick(key)}
            onMouseEnter={() => setHovered(key)}
            onMouseLeave={() => setHovered(null)}
            aria-label={t(key)}
            role="button"
          >
            <path
              d={fillPath(CORE_INNER, CORE_OUTER, emotion.startAngle, emotion.endAngle)}
              fill={emotion.color}
              stroke="white"
              strokeWidth="1.5"
              style={{
                opacity: segmentOpacity(key),
                filter: segmentFilter(key),
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
              <textPath
                href={`#tp-${keyToId(key)}`}
                startOffset="50%"
                textAnchor="middle"
              >
                {t(key)}
              </textPath>
            </text>
          </g>
        );
      })}

      {/* ── SECONDARY ring ── */}
      {CORE_EMOTIONS.map((emotion) => {
        const secDelta =
          (emotion.endAngle - emotion.startAngle) / emotion.secondary.length;
        const secFill = tintColor(emotion.color, 0.38);

        return emotion.secondary.map((sec, si) => {
          const s = emotion.startAngle + si * secDelta;
          const e = s + secDelta;
          const key = sec.key;

          return (
            <g
              key={key}
              style={{ cursor: 'pointer' }}
              onClick={() => handleClick(key)}
              onMouseEnter={() => setHovered(key)}
              onMouseLeave={() => setHovered(null)}
              aria-label={t(key)}
              role="button"
            >
              <path
                d={fillPath(SECONDARY_INNER, SECONDARY_OUTER, s, e)}
                fill={secFill}
                stroke="white"
                strokeWidth="1"
                style={{
                  opacity: segmentOpacity(key),
                  filter: segmentFilter(key),
                  transition: 'opacity 180ms ease, filter 180ms ease',
                }}
              />
              <text
                fontSize="9"
                fontWeight="500"
                fill="#1a1a1a"
                pointerEvents="none"
                style={{ userSelect: 'none' }}
              >
                <textPath
                  href={`#tp-${keyToId(key)}`}
                  startOffset="50%"
                  textAnchor="middle"
                >
                  {t(key)}
                </textPath>
              </text>
            </g>
          );
        });
      })}

      {/* ── TERTIARY ring ── */}
      {CORE_EMOTIONS.map((emotion) => {
        const secDelta =
          (emotion.endAngle - emotion.startAngle) / emotion.secondary.length;
        const terFill = tintColor(emotion.color, 0.63);

        return emotion.secondary.map((sec, si) => {
          const secStart = emotion.startAngle + si * secDelta;
          const terDelta = secDelta / sec.tertiary.length;

          return sec.tertiary.map((ter, ti) => {
            const s = secStart + ti * terDelta;
            const e = s + terDelta;
            const mid = getMidAngle(s, e);
            const key = ter.key;

            return (
              <g
                key={key}
                style={{ cursor: 'pointer' }}
                onClick={() => handleClick(key)}
                onMouseEnter={() => setHovered(key)}
                onMouseLeave={() => setHovered(null)}
                aria-label={t(key)}
                role="button"
              >
                <path
                  d={fillPath(TERTIARY_INNER, TERTIARY_OUTER, s, e)}
                  fill={terFill}
                  stroke="white"
                  strokeWidth="0.7"
                  style={{
                    opacity: segmentOpacity(key),
                    filter: segmentFilter(key),
                    transition: 'opacity 180ms ease, filter 180ms ease',
                  }}
                />
                <text
                  fontSize="8"
                  fontWeight="400"
                  fill="#1a1a1a"
                  pointerEvents="none"
                  transform={radialTextTransform(mid, TERTIARY_TEXT_RADIUS)}
                  textAnchor="middle"
                  dominantBaseline="central"
                  style={{ userSelect: 'none' }}
                >
                  {t(key)}
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
