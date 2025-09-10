"use client";

import { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { createSupabaseClient } from "../supabase/supabaseClient";

type AuthContextType = {
   user: User | null;
   loading: boolean;
   signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
   user: null,
   loading: true,
   signOut: async () => {},
});

export function AuthProvider({
   children,
   serverUser,
}: {
   children: React.ReactNode;
   serverUser?: User | null;
}) {
   const [user, setUser] = useState<User | null>(serverUser || null);
   const [loading, setLoading] = useState(!serverUser);

   const supabase = createSupabaseClient();

   useEffect(() => {
      if (!serverUser) {
         const getInitialSession = async () => {
            const {
               data: { session },
            } = await supabase.auth.getSession();
            setUser(session?.user || null);
            setLoading(false);
         };
         getInitialSession();
      }

      const {
         data: { subscription },
      } = supabase.auth.onAuthStateChange(async (event, session) => {
         setUser(session?.user || null);
         setLoading(false);
      });

      return () => subscription.unsubscribe();
   }, [supabase, serverUser]);

   const signOut = async () => {
      await supabase.auth.signOut();
      window.location.href = "/";
      setUser(null);
   };

   return (
      <AuthContext.Provider value={{ user, loading, signOut }}>
         {children}
      </AuthContext.Provider>
   );
}

export const useAuth = () => {
   const context = useContext(AuthContext);
   if (!context) {
      throw new Error("useAuth must be used within AuthProvider");
   }
   return context;
};
