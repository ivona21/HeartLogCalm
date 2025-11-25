import type { ApiError } from "@/types";
import { useAuthStore } from "@/stores/authStore";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_URL) {
    this.baseURL = baseURL;
  }

  private getAuthToken(): string | null {
    return useAuthStore.getState().token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = this.getAuthToken();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (options.headers) {
      Object.assign(headers, options.headers);
    }

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      let errorMessage = "An unexpected error occurred";
      let errorData: any;
      
      try {
        errorData = await response.json();
      } catch (parseError) {
        // If JSON parsing fails, try to get text response
        const textError = await response.text().catch(() => "");
        console.error("API Error (non-JSON):", textError);
        throw { message: textError || errorMessage };
      }
      
      console.error("API Error Response:", errorData);
      
      // Try to extract error message from various backend formats
      if (typeof errorData === 'string') {
        errorMessage = errorData;
      } else if (errorData.message) {
        errorMessage = errorData.message;
      } else if (errorData.error) {
        errorMessage = errorData.error;
      } else if (errorData.title) {
        errorMessage = errorData.detail || errorData.title;
      } else if (errorData.Message) {
        // C# backends often use PascalCase
        errorMessage = errorData.Message;
      } else if (errorData.Error) {
        errorMessage = errorData.Error;
      }
      
      const error: ApiError = {
        message: errorMessage,
        errors: errorData.errors || errorData.Errors,
      };
      throw error;
    }

    return response.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }
}

export const apiClient = new ApiClient();
