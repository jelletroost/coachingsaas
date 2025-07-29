import { User } from "@supabase/supabase-js";
import { create } from "zustand";

export const useAuthStore = create<{
   user: User | null;
   setUser: (user: User) => void;
}>((set) => ({
   user: null,
   setUser: (user) => set({ user }),
}));
