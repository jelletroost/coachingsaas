import { Hono } from "jsr:@hono/hono";
import { withCors } from "../../_shared/withCors.ts";
import getAllFeatureFlags from "../../controller/feature-flags/getAllFeatureFlags.ts";
import getFeatureAccess from "../../controller/feature-flags/getFeatureAccess.ts";
import getFeatureFlags from "../../controller/feature-flags/getFeatureFlags.ts";
import updateFeatureFlag from "../../controller/feature-flags/updateFeatureFlag.ts";
import { checkRole } from './../../_shared/middleware.ts';

const functionName = "feature-flags";
const app = new Hono().basePath(`/${functionName}`);

// Routes
app.get("/get-feature-flags", getFeatureFlags);
app.get("/get-all-feature-flags", getAllFeatureFlags);
app.get("/get-feature-access", getFeatureAccess);
app.use("/update-feature-flag",checkRole(["super_admin"]), updateFeatureFlag);

Deno.serve(withCors(app));
