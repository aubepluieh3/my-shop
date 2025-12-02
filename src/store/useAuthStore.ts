import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
    id: string,
    email: string,
    name: string,
    role: "user" | "admin",
    profileImage?: string;
    level: number;
}

interface AuthState {
    user: User | null,
    token: string | null,
    setUser: (user:User, token: string) => void;
    getUser: () => User | null;
    logout: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set, get) => ({
      user: null,
      token: null,
      getUser: () => get().user,
      setUser: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);