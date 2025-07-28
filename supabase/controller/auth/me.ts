import { Context } from "jsr:@hono/hono";
import edgeAdminClient from "../../_shared/supabaseAdmin.ts";

const me = async (c: Context) => {
   const userId = c.req.query("id");

   const { data, error } = await edgeAdminClient
      .from("users")
      .select("first_name, last_name, email, role")
      .eq("id", userId);

   if (error) {
      return c.json({ error: error.message }, 500);
   }
   return c.json({ user: data[0] }, 200);
};

export default me;
