import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Supabase Server Client
const supabaseServerClient = async () => {
   const cookieStore = await cookies();
   return createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
         cookies: {
            getAll() {
               return cookieStore.getAll();
            },
            setAll(cookiesToSet) {
               try {
                  cookiesToSet.forEach(({ name, value, options }) =>
                     cookieStore.set(name, value, options)
                  );
               } catch {
                  // Ignore in Server Component (can’t set cookies here)
               }
            },
         },
      }
   );
};

export default supabaseServerClient;

// Get current user ssr
export const currentUserSSR = async () => {
   const supabase = await supabaseServerClient();
   const {
      data: { user },
      error,
   } = await supabase.auth.getUser();

   if (error) return null;

   return user;
};
