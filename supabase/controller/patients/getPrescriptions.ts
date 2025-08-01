import { Context } from "jsr:@hono/hono";
import edgeAdminClient from "../../_shared/supabaseAdmin.ts";

const getPrescriptions = async (c: Context) => {
   const {patientId} = c.req.query();
   const { data, error } = await edgeAdminClient.from("prescriptions").select("*").eq("patient_id", patientId);
   if (error) {
      return c.json({ error: error.message }, 500);
   }
   return c.json({data}, 200);
};

export default getPrescriptions;