import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/features/auth/types/user.ts';
import type { AuthSession } from '@/features/auth/types/auth-session.ts';

interface AuthState {
  user: User | null;
  session: AuthSession | null;
  authStatus: 'idle' | 'checking' | 'authenticated' | 'anonymous';
  setAuth: (user: User, session: AuthSession) => void;
  setSession: (session: AuthSession) => void;
  setAuthChecking: () => void;
  confirmAuth: (user?: User | null) => void;
  clearAuth: () => void;
  getAccessToken: () => string | null;
  isAuthenticated: () => boolean;
}

function sanitizeSession(session: AuthSession | null | undefined): AuthSession | null {
  if (!session?.accessToken || !session.expiresAt || !session.email) {
    return null;
  }

  return {
    accessToken: session.accessToken,
    expiresAt: session.expiresAt,
    email: session.email,
  };
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      authStatus: 'idle',
      setAuth: (user, session) => {
        set({ user, session: sanitizeSession(session), authStatus: 'authenticated' });
      },
      setSession: (session) => {
        set({ session: sanitizeSession(session) });
      },
      setAuthChecking: () => {
        set((state) => ({
          authStatus: state.session ? 'checking' : 'anonymous',
        }));
      },
      confirmAuth: (user) => {
        set((state) => {
          if (!state.session) {
            return { user: null, session: null, authStatus: 'anonymous' };
          }

          return {
            user: user ?? state.user,
            session: state.session,
            authStatus: 'authenticated',
          };
        });
      },
      clearAuth: () => {
        set({ user: null, session: null, authStatus: 'anonymous' });
      },
      getAccessToken: () => {
        return get().session?.accessToken ?? null;
      },
      isAuthenticated: () => {
        return get().authStatus === 'authenticated' && !!get().session;
      },
    }),
    {
      name: 'auth-storage',
      version: 2,
      migrate: (persistedState) => {
        if (!persistedState || typeof persistedState !== 'object') {
          return persistedState;
        }

        const state = persistedState as Partial<AuthState>;

        return {
          ...state,
          session: sanitizeSession(state.session),
        };
      },
      partialize: (state) => ({
        user: state.user,
        session: sanitizeSession(state.session),
      }),
    },
  ),
);
