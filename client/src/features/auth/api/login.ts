import { apiClient } from "@/lib/api-client";
import type { AuthResponse } from "@/types";
import type { LoginInput } from "@shared/schema";

export async function login(data: LoginInput): Promise<AuthResponse> {
  // Temporarily clear token before login to avoid sending stale auth header
  const existingToken = localStorage.getItem("auth_token");
  if (existingToken) {
    localStorage.removeItem("auth_token");
  }
  
  const response = await apiClient.post<AuthResponse>("/api/auth/login", data);
  
  if (response.token) {
    localStorage.setItem("auth_token", response.token);
  }
  
  return response;
}
