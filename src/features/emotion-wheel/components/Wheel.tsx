import { useState, useMemo } from 'react';
import LogoIconImage from '@/assets/LogoSimpleNoText.png';
import { arc } from 'd3-shape';
import { MOCK_EMOTIONS } from '@/features/emotion-wheel/data/mock-emotions.ts';
import { computeWheelLayout } from '@/features/emotion-wheel/utils/compute-wheel-layout.ts';
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
  getMidAngle,
  radialTextTransform,
  tintColor,
  toRad,
} from '@/features/emotion-wheel/helpers/helpers.ts';
import { useAuth } from '@/features/auth';
import { AuthPromptModal } from '@/features/emotion-wheel/components/AuthPromptModal.tsx';

interface WheelProps {
  onSelect?: (emotionIds: string[]) => void;
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
      innerRadius,
      outerRadius,
      startAngle: toRad(startDeg),
      endAngle: toRad(endDeg),
    }) ?? ''
  );
}

export const Wheel = ({ onSelect }: WheelProps) => {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [hovered, setHovered] = useState<string | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const { viewBox, touchHandlers } = useWheelGestures();

  const wheelLayout = useMemo(() => computeWheelLayout(MOCK_EMOTIONS), []);

  const { ancestorOf, directParentOf, ancestorFillMap } = useMemo(() => {
    const ancestorOf = new Set<string>();
    const directParentOf = new Set<string>();
    const ancestorFillMap = new Map<string, string>();

    const coreColorById = new Map<string, string>();
    for (const core of wheelLayout) {
      coreColorById.set(core.id, core.color);
      for (const sec of core.children) {
        coreColorById.set(sec.id, core.color);
      }
    }

    for (const id of selected) {
      const parts = id.split('.');
      if (parts.length === 2) {
        const rootId = parts[0];
        ancestorOf.add(rootId);
        directParentOf.add(rootId);
      } else if (parts.length === 3) {
        const rootId = parts[0];
        const secondaryId = `${parts[0]}.${parts[1]}`;
        ancestorOf.add(secondaryId);
        ancestorOf.add(rootId);
        const coreColor = coreColorById.get(rootId);
        if (coreColor) {
          const shade = tintColor(coreColor, 0.22);
          if (!ancestorFillMap.has(rootId)) ancestorFillMap.set(rootId, shade);
          if (!ancestorFillMap.has(secondaryId)) ancestorFillMap.set(secondaryId, shade);
        }
      }
    }
    for (const parentId of directParentOf) {
      ancestorFillMap.delete(parentId);
    }
    return { ancestorOf, directParentOf, ancestorFillMap };
  }, [selected, wheelLayout]);

  const handleClick = (id: string) => {
    const isFirstSelection = selected.size === 0 && !selected.has(id);

    setSelected((prev) => {
      const next = new Set(prev);
      const exists = next.has(id);

      if (exists) next.delete(id);
      else if (next.size < 10) next.add(id);

      onSelect?.([...next]);
      return next;
    });

    if (isFirstSelection && !isAuthenticated) {
      setAuthModalOpen(true);
    }
  };

  const segmentOpacity = (id: string) => {
    if (selected.size === 0) return 1;
    if (selected.has(id)) return 1;
    if (directParentOf.has(id)) return 1;
    if (ancestorOf.has(id)) return 0.95;
    return 0.55;
  };

  const segmentFilter = (id: string) => {
    if (selected.has(id)) return 'brightness(1.08)';
    if (id === hovered) return 'brightness(1.06)';
    return 'none';
  };

  return (
    <>
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
      {/* ── CORE ring ── */}
      {wheelLayout.map((core) => (
        <g
          key={core.id}
          style={{ cursor: 'pointer' }}
          onClick={() => handleClick(core.id)}
          onMouseEnter={() => setHovered(core.id)}
          onMouseLeave={() => setHovered(null)}
          aria-label={core.label}
          role="button"
        >
          <path
            d={fillPath(CORE_INNER, CORE_OUTER, core.startAngle, core.endAngle)}
            fill={
              selected.has(core.id)
                ? core.color
                : (ancestorFillMap.get(core.id) ?? core.color)
            }
            stroke="white"
            strokeWidth="1.5"
            style={{
              opacity: segmentOpacity(core.id),
              filter: segmentFilter(core.id),
              transition: 'opacity 180ms ease, filter 180ms ease, fill 180ms ease',
            }}
          />
          <text
            fontSize="18"
            fontWeight="700"
            fill="hsl(var(--foreground))"
            pointerEvents="none"
            transform={radialTextTransform(getMidAngle(core.startAngle, core.endAngle), CORE_TEXT_RADIUS)}
            textAnchor="middle"
            dominantBaseline="central"
            style={{ userSelect: 'none' }}
          >
            {core.label}
          </text>
        </g>
      ))}

      {/* ── SECONDARY ring ── */}
      {wheelLayout.map((core) => {
        const secondaryFillColor = tintColor(core.color, 0.38);
        return core.children.map((sec) => {
          const midpointAngle = getMidAngle(sec.startAngle, sec.endAngle);
          return (
            <g
              key={sec.id}
              style={{ cursor: 'pointer' }}
              onClick={() => handleClick(sec.id)}
              onMouseEnter={() => setHovered(sec.id)}
              onMouseLeave={() => setHovered(null)}
              aria-label={sec.label}
              role="button"
            >
              <path
                d={fillPath(SECONDARY_INNER, SECONDARY_OUTER, sec.startAngle, sec.endAngle)}
                fill={
                  selected.has(sec.id)
                    ? core.color
                    : (ancestorFillMap.get(sec.id) ?? secondaryFillColor)
                }
                stroke="white"
                strokeWidth="1"
                style={{
                  opacity: segmentOpacity(sec.id),
                  filter: segmentFilter(sec.id),
                  transition: 'opacity 180ms ease, filter 180ms ease, fill 180ms ease',
                }}
              />
              <text
                fontSize="16"
                fontWeight="500"
                fill="hsl(var(--foreground))"
                pointerEvents="none"
                transform={radialTextTransform(midpointAngle, SECONDARY_TEXT_RADIUS)}
                textAnchor="middle"
                dominantBaseline="central"
                style={{ userSelect: 'none' }}
              >
                {sec.label}
              </text>
            </g>
          );
        });
      })}

      {/* ── TERTIARY ring ── */}
      {wheelLayout.map((core) => {
        const tertiaryFillColor = tintColor(core.color, 0.63);
        return core.children.map((sec) =>
          sec.children.map((ter) => {
            const midpointAngle = getMidAngle(ter.startAngle, ter.endAngle);
            return (
              <g
                key={ter.id}
                style={{ cursor: 'pointer' }}
                onClick={() => handleClick(ter.id)}
                onMouseEnter={() => setHovered(ter.id)}
                onMouseLeave={() => setHovered(null)}
                aria-label={ter.label}
                role="button"
              >
                <path
                  d={fillPath(TERTIARY_INNER, TERTIARY_OUTER, ter.startAngle, ter.endAngle)}
                  fill={selected.has(ter.id) ? core.color : tertiaryFillColor}
                  stroke="white"
                  strokeWidth="0.7"
                  style={{
                    opacity: segmentOpacity(ter.id),
                    filter: segmentFilter(ter.id),
                    transition: 'opacity 180ms ease, filter 180ms ease',
                  }}
                />
                <text
                  fontSize="17"
                  fontWeight="400"
                  fill="hsl(var(--foreground))"
                  pointerEvents="none"
                  transform={radialTextTransform(midpointAngle, TERTIARY_TEXT_RADIUS)}
                  textAnchor="middle"
                  dominantBaseline="central"
                  style={{ userSelect: 'none' }}
                >
                  {ter.label}
                </text>
              </g>
            );
          }),
        );
      })}

      {/* ── Centre ── */}
      <circle
        r={CENTER_RADIUS}
        fill="white"
        stroke="hsl(var(--border))"
        strokeWidth="1.5"
        style={{ pointerEvents: 'none' }}
      />
      <image
        href={LogoIconImage}
        x={-CENTER_RADIUS * 0.39375}
        y={-CENTER_RADIUS * 0.39375}
        width={CENTER_RADIUS * 0.7875}
        height={CENTER_RADIUS * 0.7875}
        style={{ pointerEvents: 'none' }}
      />
    </svg>
    <AuthPromptModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
};
