import { apiClient } from '@/lib/api-client.ts';

export async function heartlogFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const requestOptions = options ?? {};
  const preserveAuthOnUnauthorized =
    url === '/api/auth/me' && requestOptions.method?.toUpperCase() === 'DELETE';

  return apiClient.request<T>(url, requestOptions, {
    preserveAuthOnUnauthorized,
  });
}

export default heartlogFetch;
