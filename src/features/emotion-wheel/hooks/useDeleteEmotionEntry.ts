import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteEmotionEntry } from '@/features/emotion-wheel/api/emotionEntriesApi.ts';
import { emotionEntriesQueryKey } from '@/features/emotion-wheel/hooks/useEmotionEntries.ts';

export function useDeleteEmotionEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEmotionEntry,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: emotionEntriesQueryKey }),
        queryClient.invalidateQueries({ queryKey: ['emotion-entry-summary'] }),
      ]);
    },
  });
}
