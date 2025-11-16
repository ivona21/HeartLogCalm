import { apiClient } from "@/lib/api-client";
import type { User } from "@/types";

export async function getCurrentUser(): Promise<User> {
  return apiClient.get<User>("/api/auth/me");
}

export async function logout(): Promise<void> {
  localStorage.removeItem("auth_token");
}
