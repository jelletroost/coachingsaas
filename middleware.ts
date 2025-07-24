import { NextRequest, NextResponse } from "next/server";
import supabaseServerClient from "./lib/supabaseServer";

export default async function middleware(req: NextRequest) {
   const { pathname } = req.nextUrl;

   // Define route patterns
   const isAdminRoute = pathname.startsWith("/admin");
   const isCoachRoute = pathname.startsWith("/coach");
   const isDashboardRoute = pathname.startsWith("/dashboard");

   const isPublicPath =
      pathname === "/" ||
      pathname.startsWith("/auth/signin") ||
      pathname.startsWith("/auth/signup") ||
      pathname.startsWith("/admin/login");

   // If public, allow access
   if (isPublicPath) return NextResponse.next();

   try {
      const supabase = await supabaseServerClient();
      const {
         data: { session },
      } = await supabase.auth.getSession();

      // If not logged in
      if (!session) {
         if (isAdminRoute) {
            return NextResponse.redirect(new URL("/admin/login", req.url));
         }
         return NextResponse.redirect(new URL("/auth/signin", req.url));
      }

      // Get role from session
      const role = session.user.user_metadata?.role;

      // Admin Area
      if (isAdminRoute) {
         if (role !== "admin") {
            return NextResponse.redirect(
               new URL(getDashboardByRole(role), req.url)
            );
         }
         return NextResponse.next();
      }

      // Coach Area
      if (isCoachRoute) {
         if (role !== "coach") {
            return NextResponse.redirect(
               new URL(getDashboardByRole(role), req.url)
            );
         }
         return NextResponse.next();
      }

      // Dashboard Area (for patients)
      if (isDashboardRoute) {
         if (role !== "patient") {
            return NextResponse.redirect(
               new URL(getDashboardByRole(role), req.url)
            );
         }
         return NextResponse.next();
      }

      // Default fallback: redirect unknown protected routes
      return NextResponse.redirect(new URL(getDashboardByRole(role), req.url));
   } catch (error) {
      console.error("Middleware error:", error);
      // On error, redirect to signin for safety
      return NextResponse.redirect(new URL("/auth/signin", req.url));
   }
}

// Helper: Dashboard routes by role
function getDashboardByRole(role?: string): string {
   switch (role) {
      case "admin":
         return "/admin/dashboard";
      case "coach":
         return "/coach/dashboard";
      case "patient":
         return "/dashboard";
      default:
         return "/auth/signin";
   }
}

// Apply middleware to all pages
export const config = {
   matcher: [
      "/admin/:path*",
      "/coach/:path*",
      "/dashboard/:path*",
      "/auth/signin",
      "/auth/signup",
   ],
};
