import { Context } from "jsr:@hono/hono";
import edgeAdminClient from "../../_shared/supabaseAdmin.ts";

const getAllProducts = async (c: Context) => {
   const { data, error } = await edgeAdminClient.from("products").select("*");

   if (error) {
      return c.json({ message: error.message }, 500);
   }

   return c.json(data, 200);
};

export default getAllProducts;
