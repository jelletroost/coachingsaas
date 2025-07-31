import { Context } from "jsr:@hono/hono";
import edgeAdminClient from "../../_shared/supabaseAdmin.ts";

const updateFeatureFlag = async (c: Context) => {
   try {
      const { userRole } = c.req.query();
      
      // Only super_admin can update feature flags
      if (userRole !== "super_admin") {
         return c.json({ error: "Unauthorized: Only super admins can update feature flags" }, 403);
      }

      const body = await c.req.json();
      const { featureFlagId, roleId, enabled } = body;

      if (!featureFlagId || !roleId || typeof enabled !== 'boolean') {
         return c.json({ error: "Missing required fields: featureFlagId, roleId, enabled" }, 400);
      }

      // Get environment ID (using staging as default)
      const { data: envData, error: envError } = await edgeAdminClient
         .from("environments")
         .select("id")
         .eq("name", "staging")
         .single();

      if (envError) {
         return c.json({ error: "Environment not found" }, 404);
      }

      // Check if feature flag access record exists
      const { data: existingAccess, error: checkError } = await edgeAdminClient
         .from("feature_flag_access")
         .select("id")
         .eq("feature_flag_id", featureFlagId)
         .eq("user_role_id", roleId)
         .eq("environment_id", envData.id)
         .single();

      if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "not found"
         return c.json({ error: checkError.message }, 500);
      }

      let result;
      if (existingAccess) {
         // Update existing record
         const { data, error } = await edgeAdminClient
            .from("feature_flag_access")
            .update({ enabled, updated_at: new Date().toISOString() })
            .eq("id", existingAccess.id)
            .select()
            .single();

         if (error) {
            return c.json({ error: error.message }, 500);
         }
         result = data;
      } else {
         // Create new record
         const { data, error } = await edgeAdminClient
            .from("feature_flag_access")
            .insert({
               feature_flag_id: featureFlagId,
               user_role_id: roleId,
               environment_id: envData.id,
               enabled
            })
            .select()
            .single();

         if (error) {
            return c.json({ error: error.message }, 500);
         }
         result = data;
      }

      return c.json({ success: true, data: result });
   } catch (error) {
      return c.json({ error: "Internal server error" }, 500);
   }
};

export default updateFeatureFlag; 