export interface ApiResponse<T = void> {
  success: boolean;
  message: string;
  data?: T;
}

export interface LoginResponseDto {
  email: string;
  token: string;
  username?: string;
}

export interface User {
  id?: string;
  username?: string;
  email: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}
