import { Hono } from "jsr:@hono/hono";
import { withCors } from "../../_shared/withCors.ts";
import getFeatureFlags from "../../controller/feature-flags/getFeatureFlags.ts";

const functionName = "feature-flags";
const app = new Hono().basePath(`/${functionName}`);

// Routes
app.get("/get-feature-flags", getFeatureFlags);

Deno.serve(withCors(app));
