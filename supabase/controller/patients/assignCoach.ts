import { Context } from "jsr:@hono/hono";
import edgeAdminClient from "../../_shared/supabaseAdmin.ts";

const assignCoach = async (c: Context) => {
   const { patientId, coachId } = await c.req.json();

   if (!patientId || !coachId) {
      return c.json({ error: "Patient ID and coach ID are required" }, 400);
   }
   const { error } = await edgeAdminClient.from("patients").update({ assigned_coach_id: coachId }).eq("user_id", patientId);
   if (error) {
      return c.json({ error: error.message }, 500);
   }
   return c.json({ message: "Coach assigned successfully" });
};

export default assignCoach;