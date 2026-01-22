import { useQuery } from '@tanstack/react-query';
import { getItems } from '@/api/items.api.ts';
import { mapItem } from '@/features/items/mappers.ts';
import { ItemDto } from '@/api/items.types.ts';

export default function ItemList() {
  const {
    data: items,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['items'],
    queryFn: getItems,
    select: (dtos: ItemDto[]) => dtos.map(mapItem),
  });

  return (
    <>
      {isLoading && 'Loading...'}
      {isError && error}
      {items?.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </>
  );
}
