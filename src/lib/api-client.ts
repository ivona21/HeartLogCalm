import { useAuthStore } from '@/features/auth/stores/authStore';
import type { ApiError } from '@/shared/types/api-types.ts';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
export const AUTH_UNAUTHORIZED_EVENT = 'auth:unauthorized';
export const AUTH_LOGOUT_EVENT = 'auth:logout';

function buildApiError(message: string, status?: number, errors?: Record<string, string[]> | null) {
  return {
    message,
    status,
    errors: errors ?? null,
  } satisfies ApiError;
}

function handleUnauthorizedResponse() {
  const authStore = useAuthStore.getState();

  if (!authStore.token) {
    return;
  }

  authStore.clearAuth();

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(AUTH_UNAUTHORIZED_EVENT));
  }
}

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

    let response;
    try {
      response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers,
      });
    } catch (error) {
      // Network error (backend unreachable)
      throw buildApiError(
        "Something went wrong on our end. We're working on fixing it. Please try again in a few minutes.",
      );
    }

    if (!response.ok) {
      let errorBody: any = null;

      try {
        errorBody = await response.json();
      } catch (_) {
        // Not JSON (unexpected backend format)
        const fallbackText = await response.text().catch(() => '');
        if (response.status === 401) {
          handleUnauthorizedResponse();
        }

        throw buildApiError(fallbackText || 'Unexpected error', response.status);
      }

      if (response.status === 401) {
        handleUnauthorizedResponse();
      }

      throw buildApiError(
        errorBody.message || errorBody.Message || 'Unexpected error',
        response.status,
        errorBody.errors || errorBody.Errors || null,
      );
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
