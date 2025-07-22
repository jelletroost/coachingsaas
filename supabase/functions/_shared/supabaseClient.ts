import { createClient } from "npm:@supabase/supabase-js@2.32.0";

const supabaseClient = createClient(
   Deno.env.get("SUPABASE_URL")!,
   Deno.env.get("SUPABASE_ANON_KEY")!
);

export default supabaseClient;
