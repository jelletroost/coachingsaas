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

      // Get all enabled feature names for the role in the environment
      const { data: featureAccess, error: accessError } = await edgeAdminClient
         .from("feature_access")
         .select(`
            feature_name,
            staging_allowed,
            production_allowed
         `)
         .eq("user_role_id", roleData.id);

      if (accessError) {
         return c.json({ error: accessError.message }, 500);
      }
      return c.json({
         featureAccess,
      });

   } catch (error) {
      return c.json({ 
         error: "Internal server error", 
         details: error instanceof Error ? error.message : "Unknown error" 
      }, 500);
   }
};

export default getFeatureAccess;
