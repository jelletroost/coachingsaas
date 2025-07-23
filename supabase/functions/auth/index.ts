import { Hono } from "jsr:@hono/hono";
import signin from "../controller/auth/signin.ts";
import signup from "../controller/auth/signup.ts";

const functionName = "auth";
const app = new Hono().basePath(`/${functionName}`);

// User Signup
app.post("/signup", signup);

// User Signin
app.post("/signin", signin);

Deno.serve(app.fetch);
