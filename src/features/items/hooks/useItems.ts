import { getItems } from '@/features/items/api/items.api.ts';
import { useQuery } from '@tanstack/react-query';
import { ItemDto } from '@/features/items/api/items.types.ts';
import { mapItem } from '@/features/items/mappers.ts';

export function useItems() {
  return useQuery({
    queryKey: ['items'],
    queryFn: getItems,
    select: (dtos: ItemDto[]) => dtos.map(mapItem),
  });
}
