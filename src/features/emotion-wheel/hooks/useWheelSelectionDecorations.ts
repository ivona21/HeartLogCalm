import { useMemo } from 'react';
import { tintColor } from '@/features/emotion-wheel/helpers/helpers.ts';
import type { CoreSegment } from '@/features/emotion-wheel/types/wheel-segment.ts';

interface UseWheelSelectionDecorationsParams {
  wheelLayout: CoreSegment[];
  selected: Set<string>;
}

export function useWheelSelectionDecorations({
  wheelLayout,
  selected,
}: UseWheelSelectionDecorationsParams) {
  const emotionLabelById = useMemo(() => {
    const labelMap = new Map<string, string>();

    for (const core of wheelLayout) {
      labelMap.set(core.id, core.label);
      for (const secondary of core.children) {
        labelMap.set(secondary.id, secondary.label);
        for (const tertiary of secondary.children) {
          labelMap.set(tertiary.id, tertiary.label);
        }
      }
    }

    return labelMap;
  }, [wheelLayout]);

  const coreColorByRootId = useMemo(() => {
    const colorMap = new Map<string, string>();

    for (const core of wheelLayout) {
      colorMap.set(core.id, core.color);
    }

    return colorMap;
  }, [wheelLayout]);

  const { ancestorOf, directParentOf, ancestorFillMap } = useMemo(() => {
    const nextAncestorOf = new Set<string>();
    const nextDirectParentOf = new Set<string>();
    const nextAncestorFillMap = new Map<string, string>();

    for (const id of selected) {
      const parts = id.split('.');
      if (parts.length === 2) {
        const rootId = parts[0];
        nextAncestorOf.add(rootId);
        nextDirectParentOf.add(rootId);
        continue;
      }

      if (parts.length !== 3) continue;

      const rootId = parts[0];
      const secondaryId = `${parts[0]}.${parts[1]}`;
      nextAncestorOf.add(secondaryId);
      nextAncestorOf.add(rootId);

      const coreColor = coreColorByRootId.get(rootId);
      if (!coreColor) continue;

      const shade = tintColor(coreColor, 0.22);
      if (!nextAncestorFillMap.has(rootId)) nextAncestorFillMap.set(rootId, shade);
      if (!nextAncestorFillMap.has(secondaryId)) nextAncestorFillMap.set(secondaryId, shade);
    }

    for (const parentId of nextDirectParentOf) {
      nextAncestorFillMap.delete(parentId);
    }

    return {
      ancestorOf: nextAncestorOf,
      directParentOf: nextDirectParentOf,
      ancestorFillMap: nextAncestorFillMap,
    };
  }, [coreColorByRootId, selected]);

  const selectedHeartColors = useMemo(() => {
    const colorCounts = new Map<string, number>();

    for (const id of selected) {
      const rootId = id.split('.')[0];
      const color = coreColorByRootId.get(rootId);
      if (!color) continue;

      colorCounts.set(color, (colorCounts.get(color) ?? 0) + 1);
    }

    return [...colorCounts.entries()].flatMap(([color, count]) =>
      Array.from({ length: count }, () => color),
    );
  }, [coreColorByRootId, selected]);

  const selectedEmotionLabels = useMemo(
    () =>
      [...selected]
        .map((id) => emotionLabelById.get(id))
        .filter((label): label is string => Boolean(label)),
    [emotionLabelById, selected],
  );

  return {
    ancestorOf,
    directParentOf,
    ancestorFillMap,
    selectedHeartColors,
    selectedEmotionLabels,
  };
}
