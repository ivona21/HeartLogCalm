import { apiClient } from '@/lib/api-client.ts';
import { ItemDto } from '@/features/items/api/items.types.ts';
import { ApiResponse } from '@/shared/types/api-types.ts';

export async function getItems(): Promise<ItemDto[]> {
  const response = await apiClient.get<ApiResponse<ItemDto[]>>('/api/items');
  return response.data ?? [];
}

export async function createItem(name: string): Promise<ItemDto> {
  return await apiClient.post<ItemDto>('/api/items', { name });
}
