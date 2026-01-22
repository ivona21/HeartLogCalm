import { apiClient } from '@/lib/api-client.ts';
import { ItemDto } from '@/api/items.types.ts';

export async function getItems(): Promise<ItemDto[]> {
  return await apiClient.get<ItemDto[]>('/api/items');
}

export async function createItem(name: string): Promise<ItemDto> {
  return await apiClient.post<ItemDto>('/api/items', { name });
}
