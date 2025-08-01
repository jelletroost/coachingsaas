import { getAllFeatureAccess, getFeatureAccess, updateFeatureAccess, type UpdateFeatureAccessRequest } from "@/services/feature_flag_services";
import { useAuthStore } from "@/store/useAuthStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useFeatureFlags = () => {
   const { user } = useAuthStore();
   const userRole = user?.user_metadata?.role || "patient";
   const queryClient = useQueryClient();

   const {
      data: featureAccessByRole,
      isLoading,
      error,
      refetch: refetchFeatureAccess
   } = useQuery({
      queryKey: ["feature-access-by-role", userRole],
      queryFn: () => getAllFeatureAccess(userRole),
      enabled: userRole === "super_admin",
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
   });

   const updateFeatureAccessMutation = useMutation({
      mutationFn: (data: UpdateFeatureAccessRequest) => updateFeatureAccess(userRole, data),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["feature-access-by-role"] });
         toast.success("Feature access updated successfully");
      },
      onError: (error: any) => {
         console.error("Failed to update feature access:", error);
         toast.error(error?.response?.data?.error || "Failed to update feature access");
      },
   });

   const isSuperAdmin = userRole === "super_admin";

   return {
      featureAccessByRole,
      isLoading,
      error,
      refetchFeatureAccess,
      updateFeatureAccess: updateFeatureAccessMutation.mutate,
      isUpdating: updateFeatureAccessMutation.isPending,
      isSuperAdmin,
   };
};

// Get feature access for a specific user role
export const useFeatureAccess = ({userRole}: {userRole: string}) => {
   const { data: featureAccess, isLoading, error } = useQuery({
      queryKey: ["feature-access", userRole],
      queryFn: () => getFeatureAccess(userRole),
   });

   // Helper function to check if a feature is enabled based on environment
   const isFeatureEnabled = (featureName: string): boolean => {
      if (!featureAccess?.featureAccess) return false;
      
      const feature = featureAccess.featureAccess.find(f => f.feature_name === featureName);
      if (!feature) return false;

      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
      
      // Check if it's staging or dev environment
      if (siteUrl.includes('https://staging.coachingsaas.nl') || siteUrl.includes('https://dev.coachingsaas.nl')) {
         return feature.staging_allowed;
      }
      
      // Check if it's production environment
      if (siteUrl.includes('https://coachingsaas.nl')) {
         return feature.production_allowed;
      }
      
      // Default to false for unknown environments
      return false;
   };

   // Get enabled features based on environment
   const getEnabledFeatures = (): string[] => {
      if (!featureAccess?.featureAccess) return [];
      
      return featureAccess.featureAccess
         .filter(feature => isFeatureEnabled(feature.feature_name))
         .map(feature => feature.feature_name);
   };

   return {
      featureAccess,
      isLoading,
      error,
      isFeatureEnabled,
      getEnabledFeatures,
   };
};