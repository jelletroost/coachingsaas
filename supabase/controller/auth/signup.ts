import { Context } from "jsr:@hono/hono";
import edgeAdminClient from "../../_shared/supabaseAdmin.ts";

const signup = async (c: Context) => {
   const { email, password, first_name, last_name, role } = await c.req.json();

   if (!email || !password) {
      return c.json({ message: "Email and password are required" }, 400);
   }

   // Get the role_id from user_roles table
   const { data: roleData, error: roleError } = await edgeAdminClient
      .from("user_roles")
      .select("id")
      .eq("name", role)
      .single();

   if (roleError || !roleData) {
      return c.json(
         { message: "Invalid role specified" },
         400
      );
   }

   const { data, error } = await edgeAdminClient.auth.signUp({
      email,
      password,
      options: {
         data: {
            first_name,
            last_name,
            role
         },
      },
   });

   if (error || !data?.user?.id) {
      return c.json(
         { message: error?.message ?? "Failed to create user" },
         500
      );
   }


   const userId = data.user?.id;

   const userData = {
      id: userId,
      first_name,
      last_name,
      email,
      role_id: roleData.id,
   };

   const { error: insertError } = await edgeAdminClient
      .from("users")
      .insert(userData);

   if (insertError) {
      return c.json(
         { message: insertError.message ?? "Failed to create user" },
         500
      );
   }

   return c.json({ message: "Signup successful", data }, 200);
};

export default signup;
