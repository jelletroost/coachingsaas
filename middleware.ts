import { NextRequest, NextResponse } from "next/server";
import supabaseServerClient from "./lib/supabaseServer";

export default async function middleware(req: NextRequest) {
   const PUBLIC_ROUTES = [
      "/auth/signin",
      "/auth/signup",
      "/auth/reset-password",
      "/",
   ];
   const { pathname } = req.nextUrl;

   // Allow public routes
   if (PUBLIC_ROUTES.includes(pathname)) {
      return NextResponse.next();
   }

   try {
      const supabase = await supabaseServerClient();
      const {
         data: { session },
         error,
      } = await supabase.auth.getSession();

      if (error) {
         console.error("Auth error in middleware:", error);
         return NextResponse.redirect(new URL("/auth/signin", req.url));
      }

      // Redirect to signin if no session
      if (!session) {
         return NextResponse.redirect(new URL("/auth/signin", req.url));
      }

      const userRole = session?.user.user_metadata.role;

      // Define role-based access patterns
      const roleAccessPatterns = {
         admin: ["/admin", "/coach", "/dashboard"], // Admin can access all areas
         coach: ["/coach", "/dashboard"], // Coach can access coach and dashboard areas
         patient: ["/dashboard"], // Patient can only access dashboard
      };

      // Check if user has access to the requested path
      const allowedPaths =
         roleAccessPatterns[userRole as keyof typeof roleAccessPatterns];

      if (!allowedPaths) {
         console.warn(`Unknown role: ${userRole}`);
         return NextResponse.redirect(new URL("/auth/signin", req.url));
      }

      const hasAccess = allowedPaths.some((path) => pathname.startsWith(path));

      if (!hasAccess) {
         // Redirect to appropriate dashboard based on role
         const defaultPath = allowedPaths[0];
         return NextResponse.redirect(new URL(defaultPath, req.url));
      }

      return NextResponse.next();
   } catch (error) {
      console.error("Middleware error:", error);
      return NextResponse.redirect(new URL("/auth/signin", req.url));
   }
}

// Apply middleware to all protected routes
export const config = {
   matcher: ["/admin/:path*", "/coach/:path*", "/dashboard/:path*"],
};
