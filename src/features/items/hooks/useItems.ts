import { getItems } from '@/api/items.api.ts';
import { useQuery } from '@tanstack/react-query';
import { ItemDto } from '@/api/items.types.ts';
import { mapItem } from '@/features/items/mappers.ts';

export function useItems() {
  return useQuery({
    queryKey: ['items'],
    queryFn: getItems,
    select: (dtos: ItemDto[]) => dtos.map(mapItem),
  });
}
