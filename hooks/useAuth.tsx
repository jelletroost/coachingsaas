import { currentUserCSR } from "@/lib/supabase/supabaseClient";
import { useEffect, useState } from "react";

export const useAuth = () => {
   const [user, setUser] = useState<any | null>(null);
   const [userRole, setUserRole] = useState(null);

   // Get authenticated user from supabase
   const getUser = async () => {
      const userData: any | null = await currentUserCSR();

      const role = userData?.user_metadata?.role;
      setUserRole(role);
      const userMeta = userData?.user_metadata;
      setUser({
         id: userData?.id ?? "",
         email: userData?.email ?? "",
         is_authenticated: userData?.aud === "authenticated" ? true : false,
         first_name: userMeta?.first_name ?? "",
         last_name: userMeta?.last_name ?? "",
         role: userMeta?.role ?? "",
      });
   };

   useEffect(() => {
      getUser();
   }, []);

   return { user, userRole };
};
