import apiClient from "@/lib/axios";
import { type PrescriptionData } from "@/lib/zod_schemas/prescription.schema";

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

// prescribe by coach
export const prescribeByCoach = async (prescriptionData: Omit<PrescriptionData, "id" | "created_at" | "updated_at">) => {
   try {
      const response = await apiClient.post("/patients/prescribe-by-coach", prescriptionData);
      return response.data;
   } catch (error) {
      console.error(error);
      throw error;
   }
};

// get prescriptions by patient
export const getPrescriptionsByPatient = async (patientId: string) => {
   try {
      const response = await apiClient.get(`/patients/get-prescriptions?patientId=${patientId}`);
      return response.data.data; // Extract the nested data array
   } catch (error) {
      console.error(error);
      throw error;
   }
};