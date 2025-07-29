import apiClient from "@/lib/axios";

export const assignCoachToPatient = async (patientId: string, coachId: string) => {
   try {
  const response = await apiClient.post("/patients/assign-coach", {
    patientId,
    coachId,
      });
      return response.data;
   } catch (error) {
      console.error(error);
      throw error;
   }
};