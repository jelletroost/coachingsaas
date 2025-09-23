import { Context } from "jsr:@hono/hono";
import edgeAdminClient from "../../_shared/supabaseAdmin.ts";

const getPatientProfile = async (c: Context) => {
   const user = c.get("user");

   const { data, error } = await edgeAdminClient
      .from("patients")
      .select("*")
      .eq("user_id", user.id)
      .single();
   if (error) {
      return c.json({ error: error.message }, 500);
   }
   return c.json(data);
};

export default getPatientProfile;
