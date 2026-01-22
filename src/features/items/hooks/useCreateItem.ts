import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createItem } from '@/api/items.api.ts';

export function useCreateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createItem,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });
}
