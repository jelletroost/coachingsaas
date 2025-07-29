"use client";
import { useAuthStore } from "@/store/useAuthStore";
import { User } from "@supabase/supabase-js";
import { useEffect } from "react";

export const AuthProvider = ({
   user,
   children,
}: {
   user: User | null;
   children: React.ReactNode;
}) => {
   const setUser = useAuthStore((state) => state.setUser);
   useEffect(() => {
      if (user) {
         setUser(user);
      }
   }, [user, setUser]);
   return <>{children}</>;
};
