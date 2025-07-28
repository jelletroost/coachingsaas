import { Context, Next } from "jsr:@hono/hono";
import edgeAdminClient from "./supabaseAdmin.ts";

export const checkRole = (allowedRole: string) => {
   return async (c: Context, next: Next) => {
      // get userId from header
      const userId = c.req.header("x-user-id");

      if (!userId) {
         return c.json({ message: "Unauthorized" }, 401);
      }

      const { data, error } = await edgeAdminClient
         .from("users")
         .select("role")
         .eq("id", userId)
         .single();

      if (error) {
         return c.json({ message: "Unauthorized" }, 401);
      }

      if (data?.role !== allowedRole) {
         return c.json({ message: "Unauthorized" }, 401);
      }

      await next();
   };
};
