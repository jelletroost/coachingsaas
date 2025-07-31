import { NextRequest, NextResponse } from "next/server";
import { currentUserSSR } from "./lib/supabase/supabaseServer";

export default async function middleware(req: NextRequest) {
   const PUBLIC_ROUTES = [
      "/auth/signin",
      "/auth/signup",
      "/auth/reset-password",
      "/",
   ];
   const { pathname } = req.nextUrl;
   const headers = new Headers(req.headers);
   headers.set("x-current-pathname", pathname);

   // Allow public routes
   if (PUBLIC_ROUTES.includes(pathname)) {
      return NextResponse.next({
         headers,
      });
   }

   try {
      const userData = await currentUserSSR();

      // Redirect to signin if no session
      if (!userData) {
         return NextResponse.redirect(new URL("/auth/signin", req.url));
      }

      const userRole = userData?.user_metadata?.role;

      // Define role-based access patterns
      const roleAccessPatterns = {
         super_admin: ["/admin/overview", "/admin/products", "/admin/cms","/admin/users"],
         admin: ["/admin/overview", "/admin/products", "/admin/cms","/admin/users"],
         coach: ["/coach/overview", "/coach/patients", "/coach/products", "/coach/overview","/coach/messages","/coach/settings"],
         patient: ["/dashboard"],
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

      return NextResponse.next({
         headers,
      });
   } catch (error) {
      console.error("Middleware error:", error);
      return NextResponse.redirect(new URL("/auth/signin", req.url));
   }
}

// Apply middleware to all protected routes
export const config = {
   matcher: ["/admin/:path*", "/coach/:path*", "/dashboard/:path*"],
};
