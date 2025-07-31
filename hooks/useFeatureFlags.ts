import { getAllFeatureFlags, updateFeatureFlag, type FeatureFlag, type UpdateFeatureFlagRequest } from "@/services/feature_flag_services";
import { useAuthStore } from "@/store/useAuthStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useFeatureFlags = () => {
   const { user } = useAuthStore();
   const userRole = user?.user_metadata?.role || "patient";
   const queryClient = useQueryClient();

   const {
      data: featureFlags,
      isLoading,
      error,
      refetch
   } = useQuery({
      queryKey: ["feature-flags", userRole],
      queryFn: () => getAllFeatureFlags(userRole),
      enabled: userRole === "super_admin",
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
   });

   const updateFeatureFlagMutation = useMutation({
      mutationFn: (data: UpdateFeatureFlagRequest) => updateFeatureFlag(userRole, data),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["feature-flags"] });
         toast.success("Feature flag updated successfully");
      },
      onError: (error: any) => {
         console.error("Failed to update feature flag:", error);
         toast.error(error?.response?.data?.error || "Failed to update feature flag");
      },
   });

   const isSuperAdmin = userRole === "super_admin";

   return {
      featureFlags,
      isLoading,
      error,
      refetch,
      updateFeatureFlag: updateFeatureFlagMutation.mutate,
      isUpdating: updateFeatureFlagMutation.isPending,
      isSuperAdmin,
   };
};

export const useFeatureFlag = (flagName: string) => {
   const { user } = useAuthStore();
   const userRole = user?.user_metadata?.role || "patient";

   const {
      data: featureFlags,
      isLoading,
      error
   } = useQuery({
      queryKey: ["feature-flags", userRole],
      queryFn: () => getAllFeatureFlags(userRole),
      enabled: userRole === "super_admin",
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
   });

   const flag = featureFlags?.find((f: FeatureFlag) => f.name === flagName);
   const isEnabled = flag?.accessByRole[userRole]?.enabled ?? false;

   return {
      isEnabled,
      isLoading,
      error,
      flag,
   };
}; 