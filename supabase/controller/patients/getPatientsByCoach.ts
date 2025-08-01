import { Context } from "jsr:@hono/hono";
import edgeAdminClient from "../../_shared/supabaseAdmin.ts";

const getPatientsByCoach = async (c: Context) => {
   const {coachId} = c.req.query();
   const { data, error } = await edgeAdminClient.from("patients").select(`
      *,
      user:users!user_id(
         id,
         first_name,
         last_name,
         email,
         role:user_roles(name),
         created_at,
         updated_at
      )
      `).eq("assigned_coach_id", coachId);
   if (error) {
      return c.json({ error: error.message }, 500);
   }
   return c.json(data);
};

export default getPatientsByCoach;