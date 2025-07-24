import { NextRequest, NextResponse } from "next/server";
import supabaseServerClient from "./lib/supabaseServer";

export default async function middleware(req: NextRequest) {
   const PUBLIC_ROUTES = ["/signin", "/signup", "/admin-login"];
   const { pathname } = req.nextUrl;

   const supabase = await supabaseServerClient();

   const {
      data: { session },
   } = await supabase.auth.getSession();

   // Role base access
   const userRole = session?.user.user_metadata?.role;
   if (pathname.startsWith("/admin") && userRole !== "admin") {
      return NextResponse.redirect(new URL("/admin-login", req.url));
   }

   if (pathname.startsWith("/coach") && userRole !== "coach") {
      return NextResponse.redirect(new URL("/signin", req.url));
   }

   if (pathname.startsWith("/patient") && userRole !== "patient") {
      return NextResponse.redirect(new URL("/signin", req.url));
   }

   // If user is not logged in and trying to access a protected route, redirect to signin
   if (!session && !PUBLIC_ROUTES.includes(pathname)) {
      return NextResponse.redirect(new URL("/signin", req.url));
   }

   // If logged in user trying to access a route that is not allowed, redirect to unauthorized
   if (pathname.startsWith("/admin") && userRole !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
   }

   if (pathname.startsWith("/coach") && userRole !== "coach") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
   }

   if (pathname.startsWith("/patient") && userRole !== "patient") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
   }

   return NextResponse.next();
}

export const config = {
   matcher: ["/admin/:path*", "/coach/:path*", "/patient/:path*", "/protected"],
};
