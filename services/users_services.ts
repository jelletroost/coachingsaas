import apiClient from "@/lib/axios";
import { UserProfileWithDetails } from "@/lib/types/database";

export const getAllUsers = async (): Promise<UserProfileWithDetails[]> => {
   try {
      const response = await apiClient.get("/users/get-all");
      return response.data;
   } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Failed to fetch users");
   }
};
