import { useState, useMemo, useRef } from 'react';
import { arc } from 'd3-shape';
import { CORE_EMOTIONS } from '@/features/emotion-wheel/constants/core-emotions.ts';
import { useTranslation } from '@/lib/i18n';
import {
  CENTER_RADIUS,
  CORE_INNER,
  CORE_OUTER,
  CORE_TEXT_RADIUS,
  DOUBLE_TAP_MS,
  MAX_ZOOM,
  MIN_ZOOM,
  SECONDARY_INNER,
  SECONDARY_OUTER,
  SECONDARY_TEXT_RADIUS,
  TERTIARY_INNER,
  TERTIARY_OUTER,
  TERTIARY_TEXT_RADIUS,
  VIEWBOX_SIZE,
} from '@/features/emotion-wheel/constants/radii.ts';
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
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const gestureRef = useRef<{
    type: 'none' | 'pan' | 'pinch';
    lastDistance: number;
    lastTouch: { x: number; y: number };
  }>({ type: 'none', lastDistance: 0, lastTouch: { x: 0, y: 0 } });

  const lastTapRef = useRef<number>(0);

  const { translate } = useTranslation('emotions');

  const S = VIEWBOX_SIZE;
  const vbW = (2 * S) / zoom;
  const vbH = (2 * S) / zoom;
  const vbX = pan.x - S / zoom;
  const vbY = pan.y - S / zoom;

  const clampPan = (x: number, y: number, z: number) => {
    const maxPan = S * (1 - 1 / z);
    return {
      x: Math.max(-maxPan, Math.min(maxPan, x)),
      y: Math.max(-maxPan, Math.min(maxPan, y)),
    };
  };

  const handleTouchStart = (e: React.TouchEvent<SVGSVGElement>) => {
    if (e.touches.length === 2) {
      const dx = e.touches[1].clientX - e.touches[0].clientX;
      const dy = e.touches[1].clientY - e.touches[0].clientY;
      gestureRef.current = {
        type: 'pinch',
        lastDistance: Math.sqrt(dx * dx + dy * dy),
        lastTouch: { x: 0, y: 0 },
      };
    } else if (e.touches.length === 1) {
      const now = Date.now();
      const t = e.touches[0];
      if (now - lastTapRef.current < DOUBLE_TAP_MS) {
        setZoom(1);
        setPan({ x: 0, y: 0 });
        gestureRef.current = { type: 'none', lastDistance: 0, lastTouch: { x: 0, y: 0 } };
        return;
      }
      lastTapRef.current = now;
      gestureRef.current = {
        type: 'pan',
        lastDistance: 0,
        lastTouch: { x: t.clientX, y: t.clientY },
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent<SVGSVGElement>) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();

    if (e.touches.length === 2 && gestureRef.current.type === 'pinch') {
      const t0 = e.touches[0];
      const t1 = e.touches[1];
      const dx = t1.clientX - t0.clientX;
      const dy = t1.clientY - t0.clientY;
      const newDistance = Math.sqrt(dx * dx + dy * dy);
      const ratio = newDistance / gestureRef.current.lastDistance;
      const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom * ratio));

      const centerScreenX = (t0.clientX + t1.clientX) / 2;
      const centerScreenY = (t0.clientY + t1.clientY) / 2;
      const pivotX = vbX + ((centerScreenX - rect.left) / rect.width) * vbW;
      const pivotY = vbY + ((centerScreenY - rect.top) / rect.height) * vbH;

      const rawPanX = pivotX + (pan.x - pivotX) * (zoom / newZoom);
      const rawPanY = pivotY + (pan.y - pivotY) * (zoom / newZoom);
      const clamped = clampPan(rawPanX, rawPanY, newZoom);

      setZoom(newZoom);
      setPan(clamped);
      gestureRef.current.lastDistance = newDistance;
    } else if (e.touches.length === 1 && gestureRef.current.type === 'pan' && zoom > 1) {
      const t = e.touches[0];
      const dxScreen = t.clientX - gestureRef.current.lastTouch.x;
      const dyScreen = t.clientY - gestureRef.current.lastTouch.y;
      const svgDx = -(dxScreen / rect.width) * vbW;
      const svgDy = -(dyScreen / rect.height) * vbH;
      const clamped = clampPan(pan.x + svgDx, pan.y + svgDy, zoom);

      setPan(clamped);
      gestureRef.current.lastTouch = { x: t.clientX, y: t.clientY };
    }
  };

  const handleTouchEnd = () => {
    if (zoom <= 1) setPan({ x: 0, y: 0 });
    gestureRef.current = { type: 'none', lastDistance: 0, lastTouch: { x: 0, y: 0 } };
  };

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
      viewBox={`${vbX} ${vbY} ${vbW} ${vbH}`}
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
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
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
                fontSize="9"
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
                  fontSize="8"
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
