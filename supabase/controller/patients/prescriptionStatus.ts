import { Context } from "jsr:@hono/hono";
import edgeAdminClient from "../../_shared/supabaseAdmin.ts";


const prescriptionStatusUpdate = async (context: Context) => {
   const { prescriptionId, status } = await context.req.json();
   const {  error } = await edgeAdminClient.from('prescriptions').update({ status }).eq('id', prescriptionId);
   if (error) {
      return context.json({ error: error.message }, 500);
   }
   return context.json({ message: "Prescription status updated" }, 200);
}

export default prescriptionStatusUpdate;