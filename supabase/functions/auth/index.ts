import { Hono } from "jsr:@hono/hono";
import { withCors } from "../../_shared/withCors.ts";
import me from "../../controller/auth/me.ts";
import signin from "../../controller/auth/signin.ts";
import signup from "../../controller/auth/signup.ts";

const functionName = "auth";
const app = new Hono().basePath(`/${functionName}`);

// Routes
app.get("/me", me);
app.post("/signup", signup);
app.post("/signin", signin);

Deno.serve(withCors(app));
