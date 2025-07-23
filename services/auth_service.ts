import apiClient from "@/lib/axios";
import { SIGNIN_URL, SIGNUP_URL } from "@/lib/constant";
import { SigninFormData, SignupFormData } from "@/lib/zod_schemas/auth.schema";

// User Signup
export const signup = async (data: SignupFormData) => {
   try {
      const response = await apiClient.post(SIGNUP_URL, data);
      return response.data;
   } catch (error) {
      console.error(error);
      throw error;
   }
};

// User Signin
export const signin = async (formData: SigninFormData) => {
   try {
      const response = await apiClient.post(SIGNIN_URL, formData);
      return response.data;
   } catch (error) {
      console.error(error);
      throw error;
   }
};
