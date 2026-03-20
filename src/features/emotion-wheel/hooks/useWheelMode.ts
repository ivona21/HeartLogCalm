import { useState, useCallback } from 'react';

export type WheelDisplayMode = 'full' | 'progressive';

interface UseWheelModeReturn {
  selected: Set<string>;
  hovered: string | null;
  activeCoreId: string | null;
  activeSecId: string | null;
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
  const [activeSecId, setActiveSecId] = useState<string | null>(null);

  const handleClick = useCallback((id: string) => {
    if (mode === 'full') {
      // Full mode: multi-select behavior
      setSelected((prev) => {
        const next = new Set(prev);
        const exists = next.has(id);
        if (exists) next.delete(id);
        else if (next.size < 10) next.add(id);
        onSelect?.([...next]);
        return next;
      });
    } else {
      // Progressive mode: drill-down navigation
      const parts = id.split('.');
      if (parts.length === 1) {
        // Core clicked: drill into this core
        setActiveCoreId(id);
        setActiveSecId(null);
      } else if (parts.length === 2) {
        // Secondary clicked: drill into this secondary
        setActiveSecId(id);
      } else if (parts.length === 3) {
        // Tertiary clicked: add to selection
        setSelected((prev) => {
          const next = new Set(prev);
          const exists = next.has(id);
          if (exists) next.delete(id);
          else if (next.size < 10) next.add(id);
          onSelect?.([...next]);
          return next;
        });
      }
    }
  }, [mode, onSelect]);

  const showSecondary = mode === 'full' || activeCoreId !== null;
  const showTertiary = mode === 'full' || activeSecId !== null;

  return {
    selected,
    hovered,
    activeCoreId,
    activeSecId,
    showSecondary,
    showTertiary,
    handleClick,
    setHovered,
    onSelect,
  };
}
