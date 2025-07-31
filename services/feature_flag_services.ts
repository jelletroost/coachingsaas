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
   roleId: string;
   enabled: boolean;
}

const getFeatureFlags = async (userRole: string) => {
   try {
      const response = await apiClient.get(`/feature-flags?userRole=${userRole}`);
      return response.data;
   } catch (error) {
      console.error(error);
      throw error;
   }
};

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

export { getAllFeatureFlags, getFeatureFlags, updateFeatureFlag };
export default getFeatureFlags;