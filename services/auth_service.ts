import { SIGNIN_URL, SIGNUP_URL } from "@/lib/constant";
import { SigninFormData, SignupFormData } from "@/lib/zod_schemas/auth.schema";
import axios from "axios";

// User Signup
export const signup = async (data: SignupFormData) => {
   try {
      const response = await axios.post(SIGNUP_URL, data);
      return response.data;
   } catch (error) {
      console.error(error);
      throw error;
   }
};

// User Signin
export const signin = async (data: SigninFormData) => {
   try {
      const response = await axios.post(SIGNIN_URL, data);
      return response.data;
   } catch (error) {
      console.error(error);
      throw error;
   }
};
