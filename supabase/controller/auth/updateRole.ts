import { Context } from "jsr:@hono/hono";
import edgeAdminClient from "../../_shared/supabaseAdmin.ts";

const updateRole = async (c: Context) => {
   const { role } = await c.req.json();
   const user = c.get("user");
   const { data, error } = await edgeAdminClient.auth.admin.updateUserById(
      user?.id,
      {
         app_metadata: {
            role,
         },
      }
   );

   if (error) {
      return c.json({ error: error.message }, 500);
   }

   return c.json({ data }, 200);
};

export default updateRole;
