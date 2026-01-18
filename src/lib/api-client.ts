import { useAuthStore } from '@/features/auth/stores/authStore';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_URL) {
    this.baseURL = baseURL;
  }

  private getAuthToken(): string | null {
    return useAuthStore.getState().token;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = this.getAuthToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (options.headers) {
      Object.assign(headers, options.headers);
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      let errorBody: any = null;

      try {
        errorBody = await response.json();
      } catch (_) {
        // Not JSON (unexpected backend format)
        const fallbackText = await response.text().catch(() => '');
        throw {
          message: fallbackText || 'Unexpected error',
          errors: null,
        };
      }

      throw {
        message: errorBody.message || errorBody.Message || 'Unexpected error',
        errors: errorBody.errors || errorBody.Errors || null,
      };
    }

    return response.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();
