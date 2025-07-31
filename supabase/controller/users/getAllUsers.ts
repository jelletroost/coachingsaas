import { Context } from "jsr:@hono/hono";
import edgeAdminClient from "../../_shared/supabaseAdmin.ts";

const getAllUsers = async (c: Context) => {
   const { data: users, error: usersError } = await edgeAdminClient
      .from("users")
      .select(`
         *,
         role:user_roles(name)
      `);
   
   if (usersError) {
      console.error("Error fetching users:", usersError);
      return c.json({ error: usersError.message }, 500);
   }

   const { data: patients, error: patientsError } = await edgeAdminClient
      .from("patients")
      .select(`
         user_id,
         assigned_coach_id,
         coach:users!patients_assigned_coach_id_fkey(
            id,
            first_name,
            last_name,
            email
         )
      `);

   if (patientsError) {
      console.error("Error fetching patients:", patientsError);
      return c.json({ error: patientsError.message }, 500);
   }

   // Combine the data
   const usersWithCoaches = users.map(user => {
      const patientData = patients.find(p => p.user_id === user.id);
      return {
         ...user,
         patients: patientData ? [patientData] : []
      };
   });

   return c.json(usersWithCoaches);
};

export default getAllUsers;