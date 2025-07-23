import { createClient } from "npm:@supabase/supabase-js@2.32.0";
const edgeAdminClient = createClient(
   Deno.env.get("SUPABASE_URL")!,
   Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

export default edgeAdminClient;
