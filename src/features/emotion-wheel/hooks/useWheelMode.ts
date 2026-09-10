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
  replaceSelection: (emotionIds: string[]) => void;
  setHovered: (id: string | null) => void;
  onSelect?: (emotionIds: string[]) => void;
}

function sanitizeSelectionOrder(emotionIds: string[]) {
  return Array.from(new Set(emotionIds.filter(Boolean))).slice(0, MAX_SELECTED_EMOTIONS);
}

function getActiveSelectionIds(selectionOrder: string[]) {
  const activeEmotionId = selectionOrder[selectionOrder.length - 1] ?? null;

  if (!activeEmotionId) {
    return {
      activeCoreId: null,
      activeSecondaryId: null,
      activeTertiaryId: null,
    };
  }

  const parts = activeEmotionId.split('.');
  const activeCoreId = parts[0] ?? null;
  const activeSecondaryId =
    parts.length >= EMOTION_DEPTH.SECONDARY ? `${parts[0]}.${parts[1]}` : null;

  return {
    activeCoreId,
    activeSecondaryId,
    activeTertiaryId: parts.length === EMOTION_DEPTH.TERTIARY ? activeEmotionId : null,
  };
}

export function useWheelMode(
  mode: WheelDisplayMode,
  onSelect?: (emotionIds: string[]) => void,
  initialSelectionOrder: string[] = [],
): UseWheelModeReturn {
  const sanitizedInitialSelectionOrder = sanitizeSelectionOrder(initialSelectionOrder);
  const initialActiveSelectionIds = getActiveSelectionIds(sanitizedInitialSelectionOrder);
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(sanitizedInitialSelectionOrder),
  );
  const [selectionOrder, setSelectionOrder] = useState<string[]>(sanitizedInitialSelectionOrder);
  const [hovered, setHovered] = useState<string | null>(null);
  const [activeCoreId, setActiveCoreId] = useState<string | null>(
    initialActiveSelectionIds.activeCoreId,
  );
  const [activeSecondaryId, setActiveSecondaryId] = useState<string | null>(
    initialActiveSelectionIds.activeSecondaryId,
  );
  const [activeTertiaryId, setActiveTertiaryId] = useState<string | null>(
    initialActiveSelectionIds.activeTertiaryId,
  );

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

  const replaceSelection = useCallback(
    (emotionIds: string[]) => {
      const nextSelectionOrder = sanitizeSelectionOrder(emotionIds);
      const nextActiveSelectionIds = getActiveSelectionIds(nextSelectionOrder);

      setSelected(new Set(nextSelectionOrder));
      setSelectionOrder(nextSelectionOrder);
      setHovered(null);
      setActiveCoreId(nextActiveSelectionIds.activeCoreId);
      setActiveSecondaryId(nextActiveSelectionIds.activeSecondaryId);
      setActiveTertiaryId(nextActiveSelectionIds.activeTertiaryId);
      onSelect?.(nextSelectionOrder);
    },
    [onSelect],
  );

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
    replaceSelection,
    setHovered,
    onSelect,
  };
}
