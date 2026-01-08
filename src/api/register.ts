import { apiClient } from "@/lib/api-client.ts";
import type { ApiResponse } from "@/types";
import {RegisterInput} from "@/features/auth/forms/RegisterForm/schema.ts";

export async function register(data: RegisterInput): Promise<ApiResponse> {
  const response = await apiClient.post<ApiResponse>("/api/auth/register", data);
  return response;
}
