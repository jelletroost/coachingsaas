import { Hono } from "jsr:@hono/hono";
import { checkRole } from "../../_shared/middleware.ts";
import { withCors } from "../../_shared/withCors.ts";
import getAllUsers from "../../controller/users/getAllUsers.ts";

const functionName = "users";
const app = new Hono().basePath(`/${functionName}`);

// Routes
app.use("/get-all", checkRole(["admin", "super_admin"]), getAllUsers);
// app.use("/create", checkRole(["admin", "super_admin"]), createUser);

Deno.serve(withCors(app));