import { useAuthStore } from '@/features/auth/stores/authStore';
import type { AuthSession } from '@/features/auth/types/auth-session.ts';
import type { ApiError, ApiResponse } from '@/shared/types/api-types.ts';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
export const AUTH_UNAUTHORIZED_EVENT = 'auth:unauthorized';
export const AUTH_LOGOUT_EVENT = 'auth:logout';
const ACCESS_TOKEN_REFRESH_BUFFER_MS = 60_000;

function buildApiError(message: string, status?: number, errors?: Record<string, string[]> | null) {
  return {
    message,
    status,
    errors: errors ?? null,
  } satisfies ApiError;
}

function handleUnauthorizedResponse() {
  const authStore = useAuthStore.getState();

  if (!authStore.session) {
    return;
  }

  authStore.clearAuth();

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(AUTH_UNAUTHORIZED_EVENT));
  }
}

function shouldSkipAuthRefresh(endpoint: string) {
  return (
    endpoint === '/api/auth/login' ||
    endpoint === '/api/auth/register' ||
    endpoint === '/api/auth/refresh'
  );
}

function isSessionExpiring(session: AuthSession) {
  const expiresAtMs = Date.parse(session.expiresAt);

  if (Number.isNaN(expiresAtMs)) {
    return true;
  }

  return expiresAtMs - Date.now() <= ACCESS_TOKEN_REFRESH_BUFFER_MS;
}

async function parseErrorResponse(response: Response): Promise<ApiError> {
  const responseText = await response.text().catch(() => '');

  try {
    const errorBody = responseText ? JSON.parse(responseText) : null;

    return buildApiError(
      errorBody?.message || errorBody?.Message || 'Unexpected error',
      response.status,
      errorBody?.errors || errorBody?.Errors || null,
    );
  } catch (_) {
    return buildApiError(responseText || 'Unexpected error', response.status);
  }
}

export class ApiClient {
  private baseURL: string;
  private refreshPromise: Promise<AuthSession> | null = null;

  constructor(baseURL: string = API_URL) {
    this.baseURL = baseURL;
  }

  private async refreshSession(): Promise<AuthSession> {
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    const session = useAuthStore.getState().session;

    if (!session?.refreshToken) {
      handleUnauthorizedResponse();
      throw buildApiError('Missing refresh token.', 401);
    }

    this.refreshPromise = (async () => {
      let response: Response;

      try {
        response = await fetch(`${this.baseURL}/api/auth/refresh`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken: session.refreshToken }),
        });
      } catch (_) {
        throw buildApiError(
          "Something went wrong on our end. We're working on fixing it. Please try again in a few minutes.",
        );
      }

      if (!response.ok) {
        const error = await parseErrorResponse(response);

        if (response.status === 401) {
          handleUnauthorizedResponse();
        }

        throw error;
      }

      const refreshResponse = await response.json() as ApiResponse<AuthSession>;

      if (!refreshResponse.success || !refreshResponse.data) {
        throw buildApiError(refreshResponse.message || 'Session refresh failed.');
      }

      useAuthStore.getState().setSession(refreshResponse.data);
      return refreshResponse.data;
    })();

    try {
      return await this.refreshPromise;
    } finally {
      this.refreshPromise = null;
    }
  }

  private async ensureValidAccessToken(endpoint: string): Promise<string | null> {
    if (shouldSkipAuthRefresh(endpoint)) {
      return null;
    }

    const session = useAuthStore.getState().session;

    if (!session) {
      return null;
    }

    if (!isSessionExpiring(session)) {
      return session.accessToken;
    }

    const refreshedSession = await this.refreshSession();
    return refreshedSession.accessToken;
  }

  private async sendRequest(endpoint: string, options: RequestInit = {}): Promise<Response> {
    const token = await this.ensureValidAccessToken(endpoint);
    return this.fetchWithToken(endpoint, options, token);
  }

  private async fetchWithToken(
    endpoint: string,
    options: RequestInit = {},
    token: string | null,
  ): Promise<Response> {
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

    return response;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    let response = await this.sendRequest(endpoint, options);

    if (
      response.status === 401 &&
      !shouldSkipAuthRefresh(endpoint) &&
      useAuthStore.getState().session
    ) {
      try {
        const refreshedSession = await this.refreshSession();
        response = await this.fetchWithToken(endpoint, options, refreshedSession.accessToken);
      } catch (error) {
        throw error;
      }
    }

    if (!response.ok) {
      if (response.status === 401) {
        handleUnauthorizedResponse();
      }

      throw await parseErrorResponse(response);
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
