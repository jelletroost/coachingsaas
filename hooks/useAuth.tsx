import { currentUserCSR } from "@/lib/supabase/supabaseClient";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export const useAuth = () => {
   const [user, setUser] = useState<User | null>(null);
   const [userRole, setUserRole] = useState(null);

   const getUser = async () => {
      const userData: User | null = await currentUserCSR();
      const role = userData?.user_metadata?.role;
      setUserRole(role);
      setUser(userData);
   };

   useEffect(() => {
      getUser();
   }, []);

   return { user, userRole };
};
