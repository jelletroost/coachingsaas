import { Context } from "jsr:@hono/hono";
import edgeAdminClient from "../../_shared/supabaseAdmin.ts";

const getFeatureFlags = async (c: Context) => {
   const { userRole } = c.req.query();
   const APP_ENV = "staging";

   // super admin get all feature
   if (userRole === "super_admin") {
      const { data, error } = await edgeAdminClient
         .from("feature_flags")
         .select("*");

      if (error) {
         return c.json({ error: error.message }, 500);
      }

      return c.json(data);
   }
   
   // First get the role ID and environment ID
   const { data: roleData, error: roleError } = await edgeAdminClient
      .from("user_roles")
      .select("id")
      .eq("name", userRole)
      .single();

   if (roleError) {
      return c.json({ error: "Role not found" }, 404);
   }

   const { data: envData, error: envError } = await edgeAdminClient
      .from("environments")
      .select("id")
      .eq("name", APP_ENV)
      .single();

   if (envError) {
      return c.json({ error: "Environment not found" }, 404);
   }

   // Get feature flags for the user role
   const { data, error } = await edgeAdminClient
      .from("feature_flags")
      .select(`
         name,
         description,
         feature_flag_access!inner(
            enabled
         )
      `)
      .eq("feature_flag_access.user_role_id", roleData.id)
      .eq("feature_flag_access.environment_id", envData.id)
      .eq("feature_flag_access.enabled", true);

   if (error) {
      return c.json({ error: error.message }, 500);
   }

   return c.json(data);
};

export default getFeatureFlags;