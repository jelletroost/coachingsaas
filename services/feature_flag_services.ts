import apiClient from "@/lib/axios";

const getFeatureFlags = async (userRole: string) => {
   try {
      const response = await apiClient.get(`/feature-flags?userRole=${userRole}`);
      return response.data;
   } catch (error) {
      console.error(error);
      throw error;
   }
};

export default getFeatureFlags;