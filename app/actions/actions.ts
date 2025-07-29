"use server";

import supabaseServerClient from "@/lib/supabase/supabaseServer";
import { redirect } from "next/navigation";

// redirect
export async function redirectTo(path: string) {
   redirect(path);
}

// User sign out
export async function signOut() {
   const supabase = await supabaseServerClient();
   await supabase.auth.signOut();
   redirect("/");
}
