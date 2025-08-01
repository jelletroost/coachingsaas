import { Hono } from "jsr:@hono/hono";
import { checkRole } from "../../_shared/middleware.ts";
import { withCors } from "../../_shared/withCors.ts";
import assignCoach from "../../controller/patients/assignCoach.ts";
import getPatientsByCoach from "../../controller/patients/getPatientsByCoach.ts";
import getPrescriptions from "../../controller/patients/getPrescriptions.ts";
import prescribeByCoach from "../../controller/patients/prescribeByCoach.ts";
import prescriptionStatusUpdate from "../../controller/patients/prescriptionStatus.ts";

const functionName = "patients";
const app = new Hono().basePath(`/${functionName}`);

// Routes
app.use("/assign-coach", checkRole(["admin", "super_admin"]), assignCoach);
app.use("/get-patients-by-coach",checkRole(["admin","super_admin","coach"]), getPatientsByCoach);
app.use("/prescribe-by-coach",checkRole(["coach"]), prescribeByCoach);
app.use("/get-prescriptions", checkRole(["admin", "super_admin", "coach"]), getPrescriptions);
app.use("/prescription-status", checkRole(["admin", "super_admin", "coach"]), prescriptionStatusUpdate);

Deno.serve(withCors(app));
