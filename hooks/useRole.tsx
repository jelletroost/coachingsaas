import supabaseServerClient from "@/lib/supabaseServer";
import { useEffect, useState } from "react";

export const useRole = () => {
   const [userRole, setUserRole] = useState<string | null>(null);

   useEffect(() => {
      const fetchRole = async () => {
         const supabase = await supabaseServerClient();
         const {
            data: { session },
            error,
         } = await supabase.auth.getSession();
         if (error) {
            console.error("Error fetching session:", error);
            setUserRole(null);
         } else {
            setUserRole(session?.user.user_metadata.role);
         }
      };

      fetchRole();
   }, []);

   return { userRole };
};
