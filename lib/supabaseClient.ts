import { createClient } from "@supabase/supabase-js";

// Environment variables
const isDev = process.env.NODE_ENV === "development";
const supabaseUrl = isDev
   ? process.env.NEXT_PUBLIC_SUPABASE_URL!
   : process.env.SUPABASE_URL!;

const supabaseAnonKey = isDev
   ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
   : process.env.SUPABASE_ANON_KEY!;

const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default supabaseClient;
