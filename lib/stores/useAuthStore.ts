/* eslint-disable no-unused-vars */
import { signinSchema } from "@/lib/validators/authSchema";
import { z } from "zod";
import { create } from "zustand";

interface AuthFormState {
   email: string;
   password: string;
   rememberMe: boolean;
   showPassword: boolean;
}

interface AuthUIState {
   isLoading: boolean;
   error: string | null;
   success: string | null;
}

interface AuthStore extends AuthFormState, AuthUIState {
   setEmail: (email: string) => void;
   setPassword: (password: string) => void;
   setRememberMe: (rememberMe: boolean) => void;
   togglePasswordVisibility: () => void;
   resetForm: () => void;

   setLoading: (loading: boolean) => void;
   setError: (error: string | null) => void;
   setSuccess: (success: string | null) => void;
   clearMessages: () => void;

   // Form validation
   validateForm: () => { isValid: boolean; errors: Record<string, string> };

   // Submit action
   submitForm: () => Promise<void>;
}

const initialFormState: AuthFormState = {
   email: "",
   password: "",
   rememberMe: false,
   showPassword: false,
};

const initialUIState: AuthUIState = {
   isLoading: false,
   error: null,
   success: null,
};

export const useAuthStore = create<AuthStore>((set, get) => ({
   ...initialFormState,
   ...initialUIState,

   setEmail: (email: string) => set({ email }),
   setPassword: (password: string) => set({ password }),
   setRememberMe: (rememberMe: boolean) => set({ rememberMe }),
   togglePasswordVisibility: () =>
      set((state: AuthStore) => ({
         showPassword: !state.showPassword,
      })),

   resetForm: () =>
      set({
         ...initialFormState,
         ...initialUIState,
      }),

   setLoading: (loading: boolean) => set({ isLoading: loading }),
   setError: (error: string | null) => set({ error }),
   setSuccess: (success: string | null) => set({ success }),
   clearMessages: () => set({ error: null, success: null }),

   validateForm: () => {
      const state = get();
      const formData = {
         email: state.email,
         password: state.password,
         rememberMe: state.rememberMe,
      };

      try {
         signinSchema.parse(formData);
         return { isValid: true, errors: {} };
      } catch (error) {
         if (error instanceof z.ZodError) {
            const errors: Record<string, string> = {};
            error.issues.forEach((issue) => {
               if (issue.path) {
                  errors[issue.path[0] as string] = issue.message;
               }
            });
            return { isValid: false, errors };
         }
         return { isValid: false, errors: { general: "Validation failed" } };
      }
   },

   // Submit action
   submitForm: async () => {
      const {
         setLoading,
         setError,
         setSuccess,
         validateForm,
         email,
         password,
         rememberMe,
      } = get();

      // Clear previous messages
      setError(null);
      setSuccess(null);

      // Validate form
      const { isValid, errors } = validateForm();
      if (!isValid) {
         setError(errors.general || "Please fix the form errors");
         return;
      }

      // Set loading state
      setLoading(true);

      try {
         // Simulate API call
         await new Promise((resolve) => setTimeout(resolve, 2000));

         // Mock successful signin
         console.log("Signin:", { email, password, rememberMe });

         // Set success message
         setSuccess("Successfully signed in!");

         // Here you would typically:
         // 1. Call your auth service
         // 2. Store tokens
         // 3. Redirect user
         // 4. Update global auth state
      } catch (error) {
         console.error("Signin error:", error);
         setError(error instanceof Error ? error.message : "Signin failed");
      } finally {
         setLoading(false);
      }
   },
}));
