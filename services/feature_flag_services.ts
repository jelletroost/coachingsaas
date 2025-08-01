import apiClient from "@/lib/axios";

// Feature access interfaces
export interface FeatureAccessItem {
   id: string;
   feature_name: string;
   staging_allowed: boolean;
   production_allowed: boolean;
   created_at: string;
   updated_at: string;
}

export interface FeatureAccessResponse {
   featureAccess: FeatureAccessItem[];
}

export interface FeatureAccessByRoleResponse {
   featureAccessByRole: Record<string, FeatureAccessItem[]>;
}

export interface UpdateFeatureAccessRequest {
   id: string;
   staging_allowed?: boolean;
   production_allowed?: boolean;
}

// Get feature access for a specific user role
const getFeatureAccess = async (userRole: string): Promise<FeatureAccessResponse> => {
   try {
      const response = await apiClient.get(`/feature-flags/get-feature-access?userRole=${userRole}&getAll=false`);
      return response.data;
   } catch (error) {
      console.error(error);
      throw error;
   }
};

// Get all feature access grouped by role
const getAllFeatureAccess = async (userRole: string): Promise<FeatureAccessByRoleResponse> => {
   try {
      const response = await apiClient.get(`/feature-flags/get-feature-access?userRole=${userRole}&getAll=true`);
      return response.data;
   } catch (error) {
      console.error(error);
      throw error;
   }
};

// Update feature access
const updateFeatureAccess = async (userRole: string, data: UpdateFeatureAccessRequest) => {
   try {
      const response = await apiClient.post(`/feature-flags/update-feature-access?userRole=${userRole}`, data);
      return response.data;
   } catch (error) {
      console.error(error);
      throw error;
   }
};

export { getAllFeatureAccess, getFeatureAccess, updateFeatureAccess };
