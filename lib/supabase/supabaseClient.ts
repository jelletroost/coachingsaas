import { createBrowserClient } from "@supabase/ssr";

const supabaseClient = createBrowserClient(
   process.env.NEXT_PUBLIC_SUPABASE_URL!,
   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default supabaseClient;

// Get current user CSR
export const currentUserCSR = async () => {
   const {
      data: { user },
      error,
   } = await supabaseClient.auth.getUser();

   if (error) return null;

   return user;
};
