import { Context } from "jsr:@hono/hono";
import edgeAdminClient from "../../_shared/supabaseAdmin.ts";

const createProduct = async (c: Context) => {
   const productData = await c.req.json();
   const { error } = await edgeAdminClient.from("products").insert(productData);

   if (error) {
      return c.json({ message: error.message }, 500);
   }

   return c.json({ message: "Product created successfully" }, 200);
};

export default createProduct;
