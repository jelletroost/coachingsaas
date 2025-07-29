import { Context } from "jsr:@hono/hono";
import edgeAdminClient from "../../_shared/supabaseAdmin.ts";

const getAllUsers = async (c: Context) => {
   const { data, error } = await edgeAdminClient.from("users").select("*");
   if (error) {
      return c.json({ error: error.message }, 500);
   }
   return c.json(data);
};

export default getAllUsers;