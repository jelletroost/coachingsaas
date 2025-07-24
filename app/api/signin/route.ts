import supabaseServerClient from "@/lib/supabaseServer";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
   return NextResponse.json({ message: "Hello, world!" });
}

export async function POST(req: NextRequest) {
   const { email, password } = await req.json();

   const supabase = await supabaseServerClient();

   const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
   });

   if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
   }

   return NextResponse.json(data?.user, { status: 200 });
}
