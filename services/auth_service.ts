import { SIGNUP_URL } from "@/lib/constant";
import { PatientFormData } from "@/lib/zod_schemas/auth.schema";
import axios from "axios";

const patientSignup = async (data: PatientFormData) => {
   try {
      const response = await axios.post(SIGNUP_URL, data);
      return response.data;
   } catch (error) {
      console.error(error);
      throw error;
   }
};

export default patientSignup;
