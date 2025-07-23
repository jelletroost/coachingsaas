import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
   return NextResponse.json({ message: "Hello, world!" });
}

export async function POST(req: NextRequest) {
   const { email, password } = await req.json();

   const supabase = await createClient();

   const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
   });

   if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
   }

   return NextResponse.json(data?.user, { status: 200 });
}

async function createClient() {
   const cookieStore = await cookies();

   return createServerClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!,
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
}
