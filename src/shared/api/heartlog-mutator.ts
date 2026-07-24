import { apiClient } from '@/lib/api-client.ts';

export async function heartlogFetch<T>(url: string, options?: RequestInit): Promise<T> {
  return apiClient.request<T>(url, options ?? {});
}

export default heartlogFetch;
