// stores/auth.ts
import { create } from 'zustand';

type User = { username: string };

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
  login: () => void
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: true }),
  login: () => set({
    isAuthenticated: true
  }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
