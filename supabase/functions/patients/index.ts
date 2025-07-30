import { Hono } from "jsr:@hono/hono";
import { checkRole } from "../../_shared/middleware.ts";
import { withCors } from "../../_shared/withCors.ts";
import assignCoach from "../../controller/patients/assignCoach.ts";
import getPatientsByCoach from "../../controller/patients/getPatientsByCoach.ts";

const functionName = "patients";
const app = new Hono().basePath(`/${functionName}`);

// Routes
app.use("/assign-coach", checkRole(["admin"]), assignCoach);
app.use("/get-patients-by-coach",checkRole(["admin","coach"]), getPatientsByCoach);

Deno.serve(withCors(app));
