import { Context } from "jsr:@hono/hono";
import supabaseClient from "../../_shared/supabaseClient.ts";

const signup = async (c: Context) => {
   const { email, password, firstName, lastName, role } = await c.req.json();

   if (!email || !password) {
      return c.json({ error: "Email and password are required" }, 400);
   }

   const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
   });

   if (error || !data?.user?.id) {
      return c.json({ error: error?.message ?? "Failed to create user" }, 500);
   }

   const userId = data.user?.id;
   const commonFields = {
      user_id: userId,
      first_name: firstName,
      last_name: lastName,
      email,
      account_status: "active",
      email_verified: false,
   };

   let insertError = null;

   if (role === "patient") {
      const { error: patientError } = await supabaseClient
         .from("patient_profiles")
         .insert(commonFields);
      insertError = patientError;
   } else {
      const { error: coachError } = await supabaseClient
         .from("coach_profiles")
         .insert(commonFields);
      insertError = coachError;
   }

   if (insertError) {
      return c.json(
         { error: insertError.message ?? "Failed to create user" },
         500
      );
   }

   return c.json({ message: "Signup successful", user_id: userId }, 200);
};

export default signup;
