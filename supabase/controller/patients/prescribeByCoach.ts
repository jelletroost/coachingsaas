import { Context } from "jsr:@hono/hono";
import edgeAdminClient from "../../_shared/supabaseAdmin.ts";

const prescribeByCoach = async (c: Context) => {
   const prescriptionData = await c.req.json();
   const { data, error } = await edgeAdminClient.from("prescriptions").insert(prescriptionData);
   if (error) {
      return c.json({ error: error.message }, 500);
   }
   return c.json({ data }, 200);
};

export default prescribeByCoach;