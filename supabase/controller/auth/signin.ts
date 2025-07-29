import { Context } from "jsr:@hono/hono";
import edgeClient from "../../_shared/supabaseClient.ts";

const signin = async (c: Context) => {
   console.log("Signin request received");
   const { email, password } = await c.req.json();

   if (!email || !password) {
      return c.json({ message: "Email and password are required" }, 400);
   }

   const { data, error } = await edgeClient.auth.signInWithPassword({
      email,
      password,
   });

   if (error) {
      return c.json({ message: error.message }, 500);
   }
   return c.json({ message: "Signin successful", data }, 200);
};

export default signin;
