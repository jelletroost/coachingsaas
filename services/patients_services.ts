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

// get patients by coach
export const getPatientsByCoach = async (coachId: string) => {
   try {
      const response = await apiClient.get(`/patients/get-patients-by-coach?coachId=${coachId}`);
      return response.data;
   } catch (error) {
      console.error(error);
      throw error;
   }
};