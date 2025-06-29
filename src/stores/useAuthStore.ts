import { ADMIN } from '@/constants/user';
import { create } from 'zustand';

export type User = typeof ADMIN

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  logout: () => void;
  login: (user: User) => void
};

/**
 * Zustand store for managing authentication state in the application.
 *
 * This store provides:
 * - The current `user` object (or `null` when unauthenticated)
 * - A boolean `isAuthenticated` flag
 * - `login()` and `logout()` methods to update the state
 *
 * @example
 * const { isAuthenticated, user, login, logout } = useAuthStore();
 *
 * login({ id: 1, username: 'admin' });
 * logout();
 */
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({
    isAuthenticated: true,
    user
  }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
