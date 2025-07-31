import { Context } from "jsr:@hono/hono";
import edgeAdminClient from "../../_shared/supabaseAdmin.ts";

const getAllFeatureFlags = async (c: Context) => {
   try {
      const { userRole } = c.req.query();
      
      // Only super_admin can get all feature flags with access details
      if (userRole !== "super_admin") {
         return c.json({ error: "Unauthorized: Only super admins can access this endpoint" }, 403);
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

      // Get all feature flags with their access status for each role
      const { data, error } = await edgeAdminClient
         .from("feature_flags")
         .select(`
            id,
            name,
            description,
            created_at,
            updated_at,
            feature_flag_access!left(
               id,
               enabled,
               user_role_id,
               user_roles!inner(
                  name
               )
            )
         `)
         .eq("feature_flag_access.environment_id", envData.id);

      if (error) {
         return c.json({ error: error.message }, 500);
      }

      // Get all available roles
      const { data: roles, error: rolesError } = await edgeAdminClient
         .from("user_roles")
         .select("id, name")
         .in("name", ["admin", "coach", "patient"]);

      if (rolesError) {
         return c.json({ error: rolesError.message }, 500);
      }

      // Transform data to include all roles with their access status
      const transformedData = data.map((flag) => {
         const accessByRole = roles.reduce((acc, role) => {
            const access = flag.feature_flag_access?.find(
               (access) => access.user_roles?.name === role.name
            );
            acc[role.name] = {
               enabled: access?.enabled ?? false,
               accessId: access?.id
            };
            return acc;
         }, {} as Record<string, { enabled: boolean; accessId?: string }>);

         return {
            id: flag.id,
            name: flag.name,
            description: flag.description,
            created_at: flag.created_at,
            updated_at: flag.updated_at,
            accessByRole
         };
      });

      return c.json(transformedData);
   } catch (error) {
      return c.json({ error: "Internal server error" }, 500);
   }
};

export default getAllFeatureFlags; 