import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { MAX_SELECTED_EMOTIONS } from '@/features/emotion-wheel/constants/emotion-hierarchy.ts';

interface GuestEmotionSelectionState {
  selectionOrder: string[];
  updatedAt: number | null;
  setGuestSelection: (selectionOrder: string[]) => void;
  clearGuestSelection: () => void;
}

function sanitizeSelectionOrder(selectionOrder: string[]): string[] {
  return Array.from(new Set(selectionOrder.filter(Boolean))).slice(0, MAX_SELECTED_EMOTIONS);
}

function selectionOrdersEqual(first: string[], second: string[]): boolean {
  return (
    first.length === second.length && first.every((emotionId, index) => emotionId === second[index])
  );
}

export const useGuestEmotionSelectionStore = create<GuestEmotionSelectionState>()(
  persist(
    (set, get) => ({
      selectionOrder: [],
      updatedAt: null,
      setGuestSelection: (selectionOrder) => {
        const sanitizedSelectionOrder = sanitizeSelectionOrder(selectionOrder);
        const currentSelectionOrder = get().selectionOrder;

        if (selectionOrdersEqual(currentSelectionOrder, sanitizedSelectionOrder)) {
          return;
        }

        set({
          selectionOrder: sanitizedSelectionOrder,
          updatedAt: sanitizedSelectionOrder.length > 0 ? Date.now() : null,
        });
      },
      clearGuestSelection: () => {
        const { selectionOrder, updatedAt } = get();

        if (selectionOrder.length === 0 && updatedAt === null) {
          return;
        }

        set({ selectionOrder: [], updatedAt: null });
      },
    }),
    {
      name: 'guest-emotion-selection',
      storage: createJSONStorage(() => sessionStorage),
      version: 2,
      migrate: (persistedState) => {
        if (!persistedState || typeof persistedState !== 'object') {
          return persistedState;
        }

        const state = persistedState as Partial<GuestEmotionSelectionState>;

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
