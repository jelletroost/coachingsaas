import { SIGNUP_URL } from "@/lib/constant";
import { UserFormData } from "@/lib/zod_schemas/auth.schema";
import axios from "axios";

const signup = async (data: UserFormData) => {
   try {
      const response = await axios.post(SIGNUP_URL, data);
      return response.data;
   } catch (error) {
      console.error(error);
      throw error;
   }
};

export default signup;
