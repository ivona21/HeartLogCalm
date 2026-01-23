import { ItemDto } from '@/features/items/api/items.types.ts';
import { Item } from '@/features/items/types.ts';

export function mapItem(dto: ItemDto): Item {
  return {
    id: dto.id,
    name: dto.name,
  };
}
