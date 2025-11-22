import { apiClient } from "@/lib/api-client";
import type { AuthResponse } from "@/types";
import type { RegisterInput } from "@/types/schema";

export async function register(data: RegisterInput): Promise<AuthResponse> {
  // Temporarily clear token before registration to avoid sending stale auth header
  const existingToken = localStorage.getItem("auth_token");
  if (existingToken) {
    localStorage.removeItem("auth_token");
  }
  
  const response = await apiClient.post<AuthResponse>("/api/Users/register", data);
  
  if (response.token) {
    localStorage.setItem("auth_token", response.token);
  }
  
  return response;
}
