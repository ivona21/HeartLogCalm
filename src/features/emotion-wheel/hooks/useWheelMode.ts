import { useState, useCallback } from 'react';
import { EMOTION_DEPTH, MAX_SELECTED_EMOTIONS } from '@/features/emotion-wheel/constants/emotion-hierarchy.ts';

export type WheelDisplayMode = 'full' | 'progressive';

interface UseWheelModeReturn {
  selected: Set<string>;
  hovered: string | null;
  activeCoreId: string | null;
  activeSecondaryId: string | null;
  activeTertiaryId: string | null;
  showSecondary: boolean;
  showTertiary: boolean;
  handleClick: (id: string) => void;
  setHovered: (id: string | null) => void;
  onSelect?: (emotionIds: string[]) => void;
}

export function useWheelMode(mode: WheelDisplayMode, onSelect?: (emotionIds: string[]) => void): UseWheelModeReturn {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [hovered, setHovered] = useState<string | null>(null);
  const [activeCoreId, setActiveCoreId] = useState<string | null>(null);
  const [activeSecondaryId, setActiveSecondaryId] = useState<string | null>(null);
  const [activeTertiaryId, setActiveTertiaryId] = useState<string | null>(null);

  const handleClick = useCallback((id: string) => {
    if (mode === 'full') {
      // Full mode: multi-select behavior
      setSelected((prev) => {
        const next = new Set(prev);
        const exists = next.has(id);
        if (exists) next.delete(id);
        else if (next.size < MAX_SELECTED_EMOTIONS) next.add(id);
        onSelect?.([...next]);
        return next;
      });
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
        setSelected((prev) => {
          const next = new Set(prev);
          const exists = next.has(id);
          if (exists) next.delete(id);
          else if (next.size < MAX_SELECTED_EMOTIONS) next.add(id);
          onSelect?.([...next]);
          return next;
        });
      }
    }
  }, [mode, onSelect]);

  const showSecondary = mode === 'full' || activeCoreId !== null;
  const showTertiary = mode === 'full' || activeSecondaryId !== null;

  return {
    selected,
    hovered,
    activeCoreId,
    activeSecondaryId,
    activeTertiaryId,
    showSecondary,
    showTertiary,
    handleClick,
    setHovered,
    onSelect,
  };
}
