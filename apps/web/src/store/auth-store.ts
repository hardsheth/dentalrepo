import { create } from 'zustand';

type AuthState = {
  accessToken?: string;
  role?: string;
  clinicTimezone?: string;
  setAuth: (accessToken: string, role: string, clinicTimezone: string) => void;
  clear: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  setAuth: (accessToken, role, clinicTimezone) => set({ accessToken, role, clinicTimezone }),
  clear: () => set({ accessToken: undefined, role: undefined, clinicTimezone: undefined }),
}));
