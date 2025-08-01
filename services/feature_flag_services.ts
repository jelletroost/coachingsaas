import apiClient from "@/lib/axios";

export interface FeatureFlag {
   id: string;
   name: string;
   description: string;
   created_at: string;
   updated_at: string;
   accessByRole: Record<string, { enabled: boolean; accessId?: string }>;
}

export interface UpdateFeatureFlagRequest {
   featureFlagId: string;
   roleName: string;
   enabled: boolean;
}

// New interface for the updated feature access response
export interface FeatureAccessItem {
   feature_name: string;
   staging_allowed: boolean;
   production_allowed: boolean;
}

export interface FeatureAccessResponse {
   featureAccess: FeatureAccessItem[];
}

const getAllFeatureFlags = async (userRole: string): Promise<FeatureFlag[]> => {
   try {
      const response = await apiClient.get(`/feature-flags/get-all-feature-flags?userRole=${userRole}`);
      return response.data;
   } catch (error) {
      console.error(error);
      throw error;
   }
};

const updateFeatureFlag = async (userRole: string, data: UpdateFeatureFlagRequest) => {
   try {
      const response = await apiClient.post(`/feature-flags/update-feature-flag?userRole=${userRole}`, data);
      return response.data;
   } catch (error) {
      console.error(error);
      throw error;
   }
};

// get feature access
const getFeatureAccess = async (userRole: string): Promise<FeatureAccessResponse> => {
   try {
      const response = await apiClient.get(`/feature-flags/get-feature-access?userRole=${userRole}`);
      return response.data;
   } catch (error) {
      console.error(error);
      throw error;
   }
};

export { getAllFeatureFlags, getFeatureAccess, updateFeatureFlag };
export default getAllFeatureFlags;