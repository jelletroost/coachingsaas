import { Context } from "jsr:@hono/hono";
import edgeClient from "../../_shared/supabaseClient.ts";

const signup = async (c: Context) => {
   const { email, password, first_name, last_name, role } = await c.req.json();

   if (!email || !password) {
      return c.json({ error: "Email and password are required" }, 400);
   }

   const { data, error } = await edgeClient.auth.signUp({
      email,
      password,
      options: {
         data: {
            first_name,
            last_name,
            role,
         },
      },
   });

   if (error || !data?.user?.id) {
      return c.json({ error: error?.message ?? "Failed to create user" }, 500);
   }

   const userId = data.user?.id;
   const userData = {
      id: userId,
      first_name,
      last_name,
      email,
      role,
   };

   const { error: insertError } = await edgeClient
      .from("users")
      .insert(userData);

   if (insertError) {
      return c.json(
         { error: insertError.message ?? "Failed to create user" },
         500
      );
   }

   return c.json({ message: "Signup successful", data }, 200);
};

export default signup;
