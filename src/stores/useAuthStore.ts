import { ADMIN } from '@/constants/user';
import { create } from 'zustand';

type User = typeof ADMIN

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  logout: () => void;
  login: (user: User) => void
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({
    isAuthenticated: true,
    user
  }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
