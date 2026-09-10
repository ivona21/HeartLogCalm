import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MAX_SELECTED_EMOTIONS } from '@/features/emotion-wheel/constants/emotion-hierarchy.ts';

interface PendingEmotionSelectionState {
  selectionOrder: string[];
  updatedAt: number | null;
  setPendingSelection: (selectionOrder: string[]) => void;
  clearPendingSelection: () => void;
}

function sanitizeSelectionOrder(selectionOrder: string[]): string[] {
  return Array.from(new Set(selectionOrder.filter(Boolean))).slice(0, MAX_SELECTED_EMOTIONS);
}

export const usePendingEmotionSelectionStore = create<PendingEmotionSelectionState>()(
  persist(
    (set) => ({
      selectionOrder: [],
      updatedAt: null,
      setPendingSelection: (selectionOrder) => {
        const sanitizedSelectionOrder = sanitizeSelectionOrder(selectionOrder);

        set({
          selectionOrder: sanitizedSelectionOrder,
          updatedAt: sanitizedSelectionOrder.length > 0 ? Date.now() : null,
        });
      },
      clearPendingSelection: () => {
        set({ selectionOrder: [], updatedAt: null });
      },
    }),
    {
      name: 'pending-emotion-selection',
      version: 1,
      migrate: (persistedState) => {
        if (!persistedState || typeof persistedState !== 'object') {
          return persistedState;
        }

        const state = persistedState as Partial<PendingEmotionSelectionState>;

        return {
          ...state,
          selectionOrder: sanitizeSelectionOrder(state.selectionOrder ?? []),
          updatedAt: state.updatedAt ?? null,
        };
      },
      partialize: (state) => ({
        selectionOrder: sanitizeSelectionOrder(state.selectionOrder),
        updatedAt: state.updatedAt,
      }),
    },
  ),
);
