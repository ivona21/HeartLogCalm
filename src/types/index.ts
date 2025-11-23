export interface User {
  id?: string;
  username: string;
  email: string;
}

export interface AuthResponse {
  email: string;
  username: string;
  token: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}
