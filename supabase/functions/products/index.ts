import { Hono } from "jsr:@hono/hono";
import { checkRole } from "../../_shared/middleware.ts";
import { withCors } from "../../_shared/withCors.ts";
import createProduct from "../../controller/products/createProduct.ts";
import getAllProducts from "../../controller/products/getAllProducts.ts";

const functionName = "products";
const app = new Hono().basePath(`/${functionName}`);

// Routes
app.use("/get-all", checkRole(["admin", "coach"]), getAllProducts);
app.use("/create", checkRole(["admin"]), createProduct);

Deno.serve(withCors(app));
