import { Context, Next } from "jsr:@hono/hono";
import edgeAdminClient from "./supabaseAdmin.ts";

export const checkRole = (allowedRole: string) => {
   return async (c: Context, next: Next) => {
      const authHeader = c.req.header("Authorization");
      const token = authHeader?.replace("Bearer ", "");

      if (!token) {
         return c.json({ message: "Unauthorized" }, 401);
      }

      // Verify the JWT token with Supabase
      const {
         data: { user },
         error,
      } = await edgeAdminClient.auth.getUser(token);

      if (error || !user) {
         return c.json({ message: "Unauthorized" }, 401);
      }

      const { data, error: roleError } = await edgeAdminClient
         .from("users")
         .select("role")
         .eq("id", user.id)
         .single();

      if (roleError || data?.role !== allowedRole) {
         return c.json({ message: "Unauthorized" }, 401);
      }

      // Store user in context for use in route handlers
      c.set("user", user);
      await next();
   };
};
