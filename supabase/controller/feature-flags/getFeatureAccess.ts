import { Context } from "jsr:@hono/hono";
import edgeAdminClient from "../../_shared/supabaseAdmin.ts";

const getFeatureAccess = async (c: Context) => {
   const { userRole } = c.req.query();
   const APP_ENV = "staging";

   // Validate required parameters
   if (!userRole) {
      return c.json({ 
         error: "Missing required parameter: userRole" 
      }, 400);
   }

   try {
      // Get the role ID
      const { data: roleData, error: roleError } = await edgeAdminClient
         .from("user_roles")
         .select("id")
         .eq("name", userRole)
         .single();

      if (roleError) {
         return c.json({ error: "Role not found" }, 404);
      }

      // Get the environment ID
      const { data: envData, error: envError } = await edgeAdminClient
         .from("environments")
         .select("id")
         .eq("name", APP_ENV)
         .single();

      if (envError) {
         return c.json({ error: "Environment not found" }, 404);
      }

      // Get all enabled feature names for the role in the environment
      const { data: enabledFeatures, error: accessError } = await edgeAdminClient
         .from("feature_flags")
         .select(`
            name,
            feature_flag_access!inner(
               enabled
            )
         `)
         .eq("feature_flag_access.user_role_id", roleData.id)
         .eq("feature_flag_access.environment_id", envData.id)
         .eq("feature_flag_access.enabled", true);

      if (accessError) {
         return c.json({ error: accessError.message }, 500);
      }

      // Extract feature names from the result
      const featureNames = enabledFeatures?.map(feature => feature.name) || [];

      return c.json({
         userRole,
         environment: APP_ENV,
         enabledFeatures: featureNames,
         count: featureNames.length,
         message: `Found ${featureNames.length} enabled features for role '${userRole}'`
      });

   } catch (error) {
      return c.json({ 
         error: "Internal server error", 
         details: error instanceof Error ? error.message : "Unknown error" 
      }, 500);
   }
};

export default getFeatureAccess;
