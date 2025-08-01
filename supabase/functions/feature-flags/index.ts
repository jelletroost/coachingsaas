import { Hono } from "jsr:@hono/hono";
import { withCors } from "../../_shared/withCors.ts";
import getFeatureAccess from "../../controller/feature-flags/getFeatureAccess.ts";
import updateFeatureAccess from "../../controller/feature-flags/updateFeatureAccess.ts";
import { checkRole } from './../../_shared/middleware.ts';

const functionName = "feature-flags";
const app = new Hono().basePath(`/${functionName}`);

// Routes
app.get("/get-feature-access", checkRole(["super_admin"]), getFeatureAccess);
app.post("/update-feature-access",checkRole(["super_admin"]), updateFeatureAccess);

Deno.serve(withCors(app));
