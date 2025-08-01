import { Context } from "jsr:@hono/hono";
import edgeAdminClient from "../../_shared/supabaseAdmin.ts";

const getFeatureAccess = async (c: Context) => {
   const { userRole, getAll = "false" } = c.req.query();
   const shouldGetAll = getAll === "true";

   // Validate required parameters
   if (!userRole) {
      return c.json({ 
         error: "Missing required parameter: userRole" 
      }, 400);
   }

   try {
      // If getting all features, only super_admin is allowed
      if (shouldGetAll && userRole !== "super_admin") {
         return c.json({ error: "Unauthorized: Only super admins can access all feature access" }, 403);
      }

      if (shouldGetAll) {
         // Get all feature access with role information
         const { data, error } = await edgeAdminClient
            .from("feature_access")
            .select(`
               id,
               feature_name,
               staging_allowed,
               production_allowed,
               created_at,
               updated_at,
               user_roles!inner(
                  id,
                  name
               )
            `)
            .order("feature_name");

         if (error) {
            return c.json({ error: error.message }, 500);
         }

         // Group by role
         const groupedByRole = data.reduce((acc, item) => {
            const roleName = item.user_roles.name;
            if (!acc[roleName]) {
               acc[roleName] = [];
            }
            acc[roleName].push({
               id: item.id,
               feature_name: item.feature_name,
               staging_allowed: item.staging_allowed,
               production_allowed: item.production_allowed,
               created_at: item.created_at,
               updated_at: item.updated_at
            });
            return acc;
         }, {} as Record<string, any[]>);

         return c.json({
            featureAccessByRole: groupedByRole
         });
      } else {
         // Get feature access for a specific role
         const { data: roleData, error: roleError } = await edgeAdminClient
            .from("user_roles")
            .select("id")
            .eq("name", userRole)
            .single();

         if (roleError) {
            return c.json({ error: "Role not found" }, 404);
         }

         // Get all feature access for the specific role
         const { data: featureAccess, error: accessError } = await edgeAdminClient
            .from("feature_access")
            .select(`
               id,
               feature_name,
               staging_allowed,
               production_allowed,
               created_at,
               updated_at
            `)
            .eq("user_role_id", roleData.id);

         if (accessError) {
            return c.json({ error: accessError.message }, 500);
         }

         return c.json({
            featureAccess,
         });
      }

   } catch (error) {
      return c.json({ 
         error: "Internal server error", 
         details: error instanceof Error ? error.message : "Unknown error" 
      }, 500);
   }
};

export default getFeatureAccess;
