import { createClient } from "npm:@supabase/supabase-js@2.32.0";

export const edgeClient = createClient(
   Deno.env.get("SUPABASE_URL")!,
   Deno.env.get("SUPABASE_ANON_KEY")!
);

export const edgeAdminClient = createClient(
   Deno.env.get("SUPABASE_URL")!,
   Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);
