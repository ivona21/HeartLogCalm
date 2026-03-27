import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEmotionEntry } from '@/features/emotion-wheel/api/emotionEntriesApi.ts';
import type { CreateEmotionEntryInput } from '@/features/emotion-wheel/types/create-emotion-entry.ts';

export function useCreateEmotionEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateEmotionEntryInput) => createEmotionEntry(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['emotion-entry-summary'] });
    },
  });
}
