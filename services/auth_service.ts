import apiClient from "@/lib/axios";
import { SIGNUP_URL } from "@/lib/constant";
import {
   NewPasswordFormData,
   PasswordResetFormData,
   SigninFormData,
   SignupFormData,
} from "@/lib/zod_schemas/auth.schema";
import axios from "axios";

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
      const response = await axios.post(
         `${process.env.NEXT_PUBLIC_SITE_URL}/api/signin`,
         formData
      );
      return response.data;
   } catch (error) {
      console.error(error);
      throw error;
   }
};

// Request Password Reset
export const requestPasswordReset = async (data: PasswordResetFormData) => {
   try {
      const response = await axios.post(
         `${process.env.NEXT_PUBLIC_SITE_URL}/api/reset-password`,
         data
      );
      return response.data;
   } catch (error) {
      console.error(error);
      throw error;
   }
};

// Submit New Password
export const submitNewPassword = async (
   data: NewPasswordFormData & { token: string }
) => {
   try {
      const response = await axios.post(
         `${process.env.NEXT_PUBLIC_SITE_URL}/api/new-password`,
         data
      );
      return response.data;
   } catch (error) {
      console.error(error);
      throw error;
   }
};
