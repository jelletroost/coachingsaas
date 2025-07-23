import { Context } from "jsr:@hono/hono";
import supabaseClient from "../../_shared/supabaseClient.ts";

const signin = async (c: Context) => {
   const { email, password } = await c.req.json();

   if (!email || !password) {
      return c.json({ error: "Email and password are required" }, 400);
   }

   const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
   });

   if (error) {
      return c.json({ error: error.message }, 500);
   }
   return c.json({ message: "Signin successful", data }, 200);
};

export default signin;
