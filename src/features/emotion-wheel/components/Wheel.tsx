import { useMemo, useState } from 'react';
import { arc } from 'd3-shape';
import { DEFAULT_WHEEL_DISPLAY_MODE, type WheelDisplayMode } from '@/config/defaults.ts';
import { computeWheelLayout } from '@/features/emotion-wheel/utils/compute-wheel-layout.ts';
import { useCreateEmotionEntry } from '@/features/emotion-wheel/hooks/useCreateEmotionEntry.ts';
import { useWheelMode } from '@/features/emotion-wheel/hooks/useWheelMode.ts';
import { useSaveReminderToast } from '@/features/emotion-wheel/hooks/useSaveReminderToast.ts';
import { useEmotionEntrySummary } from '@/features/emotion-wheel/hooks/useEmotionEntrySummary.ts';
import { useWheelSelectionDecorations } from '@/features/emotion-wheel/hooks/useWheelSelectionDecorations.ts';
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
import { useEmotions } from '@/features/emotion-wheel/hooks/useEmotions.ts';
import { EmotionWheelCenter } from '@/features/emotion-wheel/components/EmotionWheelCenter.tsx';
import { SaveEmotionModal } from '@/features/emotion-wheel/components/SaveEmotionModal.tsx';
import { toast } from '@/shared/hooks/use-toast.ts';

interface WheelProps {
  mode?: WheelDisplayMode;
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

export const Wheel = ({ mode = DEFAULT_WHEEL_DISPLAY_MODE, onSelect }: WheelProps) => {
  const {
    selected,
    selectionOrder,
    primaryEmotionKey,
    hovered,
    setHovered,
    handleClick,
    clearSelection,
    showSecondary,
    showTertiary,
    activeCoreId,
    activeSecondaryId,
    activeTertiaryId,
  } = useWheelMode(mode, onSelect);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);
  const { isAuthenticated, user } = useAuth();
  const { data: emotions = [] } = useEmotions();
  const emotionEntrySummaryQuery = useEmotionEntrySummary(isAuthenticated, user?.email);
  const createEmotionEntryMutation = useCreateEmotionEntry();

  const { viewBox, touchHandlers } = useWheelGestures();

  const wheelLayout = useMemo(() => computeWheelLayout(emotions), [emotions]);
  const {
    ancestorOf,
    directParentOf,
    ancestorFillMap,
    selectedHeartColors,
    selectedEmotionLabels,
    selectedPrimaryGroups,
  } = useWheelSelectionDecorations({
    wheelLayout,
    selected,
    selectionOrder,
  });

  const handleWheelClick = (id: string) => {
    const isSelectingEmotion = mode === 'full' || id.split('.').length === 3;
    const isFirstSelection = isSelectingEmotion && selected.size === 0 && !selected.has(id);

    setInteractionCount((count) => count + 1);
    handleClick(id);

    if (isFirstSelection && !isAuthenticated) {
      setAuthModalOpen(true);
    }
  };

  const canShowFirstEntryReminder =
    isAuthenticated && emotionEntrySummaryQuery.data?.totalEntries === 0;

  useSaveReminderToast({
    canShowReminder: canShowFirstEntryReminder,
    hasSelection: selected.size > 0,
    blocked: saveModalOpen,
    activityKey: interactionCount,
  });

  const handleSaveEmotionEntry = async (comment: string) => {
    if (selectionOrder.length === 0 || !primaryEmotionKey) return;

    await createEmotionEntryMutation.mutateAsync({
      emotionKeys: selectionOrder,
      primaryEmotionKey,
      comment,
    });

    setSaveModalOpen(false);
    clearSelection();
    toast({
      description: 'Saved',
    });
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
    if (id === activeTertiaryId) return 'brightness(1.1)';
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
            onClick={() => handleWheelClick(core.id)}
            onMouseEnter={() => setHovered(core.id)}
            onMouseLeave={() => setHovered(null)}
            aria-label={core.label}
            role="button"
          >
            <path
              d={fillPath(CORE_INNER, CORE_OUTER, core.startAngle, core.endAngle)}
              fill={
                selected.has(core.id) ? core.color : (ancestorFillMap.get(core.id) ?? core.color)
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
              transform={radialTextTransform(
                getMidAngle(core.startAngle, core.endAngle),
                CORE_TEXT_RADIUS,
              )}
              textAnchor="middle"
              dominantBaseline="central"
              style={{ userSelect: 'none' }}
            >
              {core.label}
            </text>
          </g>
        ))}

        {/* ── SECONDARY ring ── */}
        {showSecondary &&
          wheelLayout
            .filter((core) => mode === 'full' || core.id === activeCoreId)
            .map((core) => {
              const secondaryFillColor = tintColor(core.color, 0.38);
              return core.children.map((secondary) => {
                const midpointAngle = getMidAngle(secondary.startAngle, secondary.endAngle);
                return (
                  <g
                    key={secondary.id}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleWheelClick(secondary.id)}
                    onMouseEnter={() => setHovered(secondary.id)}
                    onMouseLeave={() => setHovered(null)}
                    aria-label={secondary.label}
                    role="button"
                  >
                    <path
                      d={fillPath(
                        SECONDARY_INNER,
                        SECONDARY_OUTER,
                        secondary.startAngle,
                        secondary.endAngle,
                      )}
                      fill={
                        selected.has(secondary.id)
                          ? core.color
                          : (ancestorFillMap.get(secondary.id) ?? secondaryFillColor)
                      }
                      stroke="white"
                      strokeWidth="1"
                      style={{
                        opacity: segmentOpacity(secondary.id),
                        filter: segmentFilter(secondary.id),
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
                      {secondary.label}
                    </text>
                  </g>
                );
              });
            })}

        {/* ── TERTIARY ring ── */}
        {showTertiary &&
          wheelLayout.map((core) => {
            const tertiaryFillColor = tintColor(core.color, 0.63);
            return core.children
              .filter((secondary) => mode === 'full' || secondary.id === activeSecondaryId)
              .map((secondary) =>
                secondary.children.map((tertiary) => {
                  const midpointAngle = getMidAngle(tertiary.startAngle, tertiary.endAngle);
                  return (
                    <g
                      key={tertiary.id}
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleWheelClick(tertiary.id)}
                      onMouseEnter={() => setHovered(tertiary.id)}
                      onMouseLeave={() => setHovered(null)}
                      aria-label={tertiary.label}
                      role="button"
                    >
                      <path
                        d={fillPath(
                          TERTIARY_INNER,
                          TERTIARY_OUTER,
                          tertiary.startAngle,
                          tertiary.endAngle,
                        )}
                        fill={selected.has(tertiary.id) ? core.color : tertiaryFillColor}
                        stroke="white"
                        strokeWidth="0.7"
                        style={{
                          opacity: segmentOpacity(tertiary.id),
                          filter: segmentFilter(tertiary.id),
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
                        {tertiary.label}
                      </text>
                    </g>
                  );
                }),
              );
          })}

        {/* ── Centre ── */}
        <EmotionWheelCenter
          centerRadius={CENTER_RADIUS}
          isAuthenticated={isAuthenticated}
          selectionCount={selected.size}
          selectedColors={selectedHeartColors}
          onHeartClick={() => setSaveModalOpen(true)}
        />
      </svg>
      <AuthPromptModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      <SaveEmotionModal
        open={saveModalOpen}
        primaryGroups={selectedPrimaryGroups}
        isSaving={createEmotionEntryMutation.isPending}
        onConfirm={handleSaveEmotionEntry}
        onClose={() => setSaveModalOpen(false)}
      />
    </>
  );
};
