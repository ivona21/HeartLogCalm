import { useState, useCallback } from 'react';
import {
  EMOTION_DEPTH,
  MAX_SELECTED_EMOTIONS,
} from '@/features/emotion-wheel/constants/emotion-hierarchy.ts';

export type WheelDisplayMode = 'full' | 'progressive';

interface UseWheelModeReturn {
  selected: Set<string>;
  selectionOrder: string[];
  primaryEmotionKey: string | null;
  hovered: string | null;
  activeCoreId: string | null;
  activeSecondaryId: string | null;
  activeTertiaryId: string | null;
  showSecondary: boolean;
  showTertiary: boolean;
  handleClick: (id: string) => void;
  clearSelection: () => void;
  setHovered: (id: string | null) => void;
  onSelect?: (emotionIds: string[]) => void;
}

export function useWheelMode(
  mode: WheelDisplayMode,
  onSelect?: (emotionIds: string[]) => void,
): UseWheelModeReturn {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [selectionOrder, setSelectionOrder] = useState<string[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);
  const [activeCoreId, setActiveCoreId] = useState<string | null>(null);
  const [activeSecondaryId, setActiveSecondaryId] = useState<string | null>(null);
  const [activeTertiaryId, setActiveTertiaryId] = useState<string | null>(null);

  const toggleSelection = useCallback(
    (id: string) => {
      setSelected((prev) => {
        const next = new Set(prev);
        const exists = next.has(id);
        if (exists) {
          next.delete(id);
          setSelectionOrder((prevOrder) => prevOrder.filter((entryId) => entryId !== id));
        } else if (next.size < MAX_SELECTED_EMOTIONS) {
          next.add(id);
          setSelectionOrder((prevOrder) => [...prevOrder, id]);
        }
        onSelect?.([...next]);
        return next;
      });
    },
    [onSelect],
  );

  const handleClick = useCallback(
    (id: string) => {
      if (mode === 'full') {
        toggleSelection(id);
      } else {
        // Progressive mode: drill-down navigation
        const parts = id.split('.');
        if (parts.length === EMOTION_DEPTH.CORE) {
          // Core clicked: drill into this core
          setActiveCoreId(id);
          setActiveSecondaryId(null);
        } else if (parts.length === EMOTION_DEPTH.SECONDARY) {
          // Secondary clicked: drill into this secondary
          setActiveSecondaryId(id);
          setActiveTertiaryId(null);
        } else if (parts.length === EMOTION_DEPTH.TERTIARY) {
          // Tertiary clicked: activate it (for visual feedback) and add to selection
          setActiveTertiaryId(id);
          toggleSelection(id);
        }
      }
    },
    [mode, toggleSelection],
  );

  const clearSelection = useCallback(() => {
    setSelected(new Set());
    setSelectionOrder([]);
    setHovered(null);
    setActiveCoreId(null);
    setActiveSecondaryId(null);
    setActiveTertiaryId(null);
    onSelect?.([]);
  }, [onSelect]);

  const showSecondary = mode === 'full' || activeCoreId !== null;
  const showTertiary = mode === 'full' || activeSecondaryId !== null;

  return {
    selected,
    selectionOrder,
    primaryEmotionKey: selectionOrder[0] ?? null,
    hovered,
    activeCoreId,
    activeSecondaryId,
    activeTertiaryId,
    showSecondary,
    showTertiary,
    handleClick,
    clearSelection,
    setHovered,
    onSelect,
  };
}
