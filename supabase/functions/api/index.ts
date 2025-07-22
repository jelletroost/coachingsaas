import { Hono } from "jsr:@hono/hono";
import supabaseClient from "../_shared/supabaseClient.ts";

const functionName = "api";
const app = new Hono().basePath(`/${functionName}`);

// User Signup
app.post("/signup", async (c) => {
   const { email, password } = await c.req.json();

   if (!email || !password) {
      return c.json({ error: "Email and password are required" }, 400);
   }

   const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
   });

   if (error) {
      return c.json({ error: error.message }, 500);
   }
   return c.json({ user: data.user }, 200);
});

Deno.serve(app.fetch);
