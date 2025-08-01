import { Context } from "jsr:@hono/hono";
import edgeAdminClient from "../../_shared/supabaseAdmin.ts";

const updateFeatureAccess = async (c: Context) => {
   try {
      const { userRole } = c.req.query();
      
      // Only super_admin can update feature access
      if (userRole !== "super_admin") {
         return c.json({ error: "Unauthorized: Only super admins can access this endpoint" }, 403);
      }

      const body = await c.req.json();
      const { id, staging_allowed, production_allowed } = body;

      if (!id) {
         return c.json({ error: "Missing required parameter: id" }, 400);
      }

      // Get current feature access to preserve existing values
      const { data: currentData, error: currentError } = await edgeAdminClient
         .from("feature_access")
         .select("staging_allowed, production_allowed")
         .eq("id", id)
         .single();

      if (currentError) {
         return c.json({ error: currentError.message }, 500);
      }

      // Update only the specified environment, preserve the other
      const updateData: any = {
         updated_at: new Date().toISOString()
      };

      if (staging_allowed !== undefined) {
         updateData.staging_allowed = staging_allowed;
      }
      if (production_allowed !== undefined) {
         updateData.production_allowed = production_allowed;
      }

      // Update the feature access
      const { data, error } = await edgeAdminClient
         .from("feature_access")
         .update(updateData)
         .eq("id", id)
         .select()
         .single();

      if (error) {
         return c.json({ error: error.message }, 500);
      }

      return c.json({
         success: true,
         data
      });
   } catch (error) {
      return c.json({ error: "Internal server error" }, 500);
   }
};

export default updateFeatureAccess; 