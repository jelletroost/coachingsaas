import { Hono } from "jsr:@hono/hono";
import { withCors } from "../../_shared/withCors.ts";
import getAllFeatureFlags from "../../controller/feature-flags/getAllFeatureFlags.ts";
import getFeatureFlags from "../../controller/feature-flags/getFeatureFlags.ts";
import updateFeatureFlag from "../../controller/feature-flags/updateFeatureFlag.ts";

const functionName = "feature-flags";
const app = new Hono().basePath(`/${functionName}`);

// Routes
app.get("/get-feature-flags", getFeatureFlags);
app.get("/get-all-feature-flags", getAllFeatureFlags);
app.post("/update-feature-flag", updateFeatureFlag);

Deno.serve(withCors(app));
