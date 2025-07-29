import apiClient from "@/lib/axios";

export const getAllUsers = async () => {
   const response = await apiClient.get("/users/get-all");
   return response.data;
};
