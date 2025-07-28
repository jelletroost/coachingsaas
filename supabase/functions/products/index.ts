import { Hono } from "jsr:@hono/hono";
import { checkRole } from "../../_shared/middleware.ts";
import { withCors } from "../../_shared/withCors.ts";
import createProduct from "../../controller/products/createProduct.ts";

const functionName = "products";
const app = new Hono().basePath(`/${functionName}`);

// Routes
app.use("/create", checkRole("admin"), createProduct);

Deno.serve(withCors(app));
