import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/features/auth/types/user.ts';

interface AuthState {
  user: User | null;
  token: string | null;
  authStatus: 'idle' | 'checking' | 'authenticated' | 'anonymous';
  setAuth: (user: User, token: string) => void;
  setAuthChecking: () => void;
  confirmAuth: (user?: User | null) => void;
  clearAuth: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      authStatus: 'idle',
      setAuth: (user, token) => {
        set({ user, token, authStatus: 'authenticated' });
      },
      setAuthChecking: () => {
        set((state) => ({
          authStatus: state.token ? 'checking' : 'anonymous',
        }));
      },
      confirmAuth: (user) => {
        set((state) => {
          if (!state.token) {
            return { user: null, token: null, authStatus: 'anonymous' };
          }

          return {
            user: user ?? state.user,
            token: state.token,
            authStatus: 'authenticated',
          };
        });
      },
      clearAuth: () => {
        set({ user: null, token: null, authStatus: 'anonymous' });
      },
      isAuthenticated: () => {
        return get().authStatus === 'authenticated' && !!get().token;
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    },
  ),
);
