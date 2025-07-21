/* eslint-disable no-unused-vars */
import {
   coachSchema,
   patientSchema,
   signinSchema,
} from "@/lib/validators/authSchema";
import { signInWithEmail, signUpWithEmail } from "@/supabase/auth";
import { Session, User } from "@supabase/supabase-js";
import { z } from "zod";
import { create } from "zustand";

type PatientFormData = z.infer<typeof patientSchema>;
type CoachFormData = z.infer<typeof coachSchema>;

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

interface AuthUserState {
   user: User | null;
   session: Session | null;
   isAuthenticated: boolean;
}

interface AuthStore extends AuthFormState, AuthUIState, AuthUserState {
   // Form actions
   setEmail: (email: string) => void;
   setPassword: (password: string) => void;
   setRememberMe: (rememberMe: boolean) => void;
   togglePasswordVisibility: () => void;
   resetForm: () => void;

   // UI actions
   setLoading: (loading: boolean) => void;
   setError: (error: string | null) => void;
   setSuccess: (success: string | null) => void;
   clearMessages: () => void;

   // User actions
   setUser: (user: User | null) => void;
   setSession: (session: Session | null) => void;
   logout: () => Promise<void>;

   // Form validation
   validateForm: () => { isValid: boolean; errors: Record<string, string> };
   validatePatientForm: (data: PatientFormData) => {
      isValid: boolean;
      errors: Record<string, string>;
   };
   validateCoachForm: (data: CoachFormData) => {
      isValid: boolean;
      errors: Record<string, string>;
   };

   // Auth actions
   signIn: () => Promise<void>;
   signUp: () => Promise<void>;
   signUpPatient: (data: PatientFormData) => Promise<void>;
   signUpCoach: (data: CoachFormData) => Promise<void>;
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

const initialUserState: AuthUserState = {
   user: null,
   session: null,
   isAuthenticated: false,
};

export const useAuthStore = create<AuthStore>((set, get) => ({
   ...initialFormState,
   ...initialUIState,
   ...initialUserState,

   // Form actions
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

   // UI actions
   setLoading: (loading: boolean) => set({ isLoading: loading }),
   setError: (error: string | null) => set({ error }),
   setSuccess: (success: string | null) => set({ success }),
   clearMessages: () => set({ error: null, success: null }),

   // User actions
   setUser: (user: User | null) =>
      set({
         user,
         isAuthenticated: !!user,
      }),
   setSession: (session: Session | null) => set({ session }),
   logout: async () => {
      const { setLoading, setError, setUser, setSession, resetForm } = get();
      setLoading(true);

      try {
         // Import supabase client dynamically to avoid SSR issues
         const { supabase } = await import("@/supabase/client");
         const { error } = await supabase.auth.signOut();

         if (error) throw error;

         // Clear user state
         setUser(null);
         setSession(null);
         resetForm();
      } catch (error) {
         console.error("Logout error:", error);
         setError(error instanceof Error ? error.message : "Logout failed");
      } finally {
         setLoading(false);
      }
   },

   // Form validation
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

   validatePatientForm: (data: PatientFormData) => {
      try {
         patientSchema.parse(data);
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

   validateCoachForm: (data: CoachFormData) => {
      try {
         coachSchema.parse(data);
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

   // Sign In action
   signIn: async () => {
      const {
         setLoading,
         setError,
         setSuccess,
         setUser,
         setSession,
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
         // Sign in with Supabase
         const result = await signInWithEmail(email, password);

         // Update user state
         setUser(result.user);
         setSession(result.session);
         setSuccess("Successfully signed in!");

         // Store session if remember me is checked
         if (rememberMe && result.session) {
            localStorage.setItem(
               "supabase.auth.token",
               result.session.access_token
            );
         }

         // Here you would typically:
         // 1. Redirect user to dashboard
         // 2. Update global auth state
         // 3. Fetch user profile data
      } catch (error) {
         console.error("Signin error:", error);
         setError(error instanceof Error ? error.message : "Signin failed");
      } finally {
         setLoading(false);
      }
   },

   // Sign Up action (basic)
   signUp: async () => {
      const {
         setLoading,
         setError,
         setSuccess,
         validateForm,
         email,
         password,
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
         // Sign up with Supabase
         const result = await signUpWithEmail(email, password);

         // Check if email confirmation is required
         if (result.user && !result.session) {
            setSuccess("Please check your email to confirm your account!");
         } else if (result.user && result.session) {
            // Auto-confirmed user
            setSuccess("Account created successfully!");
         }

         // Here you would typically:
         // 1. Redirect user to email confirmation page
         // 2. Or auto-login if email confirmation is not required
      } catch (error) {
         console.error("Signup error:", error);
         setError(error instanceof Error ? error.message : "Signup failed");
      } finally {
         setLoading(false);
      }
   },

   // Sign Up Patient action
   signUpPatient: async (data: PatientFormData) => {
      const { setLoading, setError, setSuccess, validatePatientForm } = get();

      // Clear previous messages
      setError(null);
      setSuccess(null);

      // Validate form
      const { isValid, errors } = validatePatientForm(data);
      if (!isValid) {
         setError(errors.general || "Please fix the form errors");
         return;
      }

      // Set loading state
      setLoading(true);

      try {
         // Sign up with Supabase using email and password from form
         const result = await signUpWithEmail(data.email, data.password);

         if (result.user) {
            // Here you would typically:
            // 1. Create patient profile in your database
            // 2. Store additional patient data
            // 3. Send welcome email

            console.log("Patient signup data:", data);

            if (!result.session) {
               setSuccess(
                  "Please check your email to confirm your patient account!"
               );
            } else {
               setSuccess("Patient account created successfully!");
            }
         }
      } catch (error) {
         console.error("Patient signup error:", error);
         setError(
            error instanceof Error ? error.message : "Patient signup failed"
         );
      } finally {
         setLoading(false);
      }
   },

   // Sign Up Coach action
   signUpCoach: async (data: CoachFormData) => {
      const { setLoading, setError, setSuccess, validateCoachForm } = get();

      // Clear previous messages
      setError(null);
      setSuccess(null);

      // Validate form
      const { isValid, errors } = validateCoachForm(data);
      if (!isValid) {
         setError(errors.general || "Please fix the form errors");
         return;
      }

      // Set loading state
      setLoading(true);

      try {
         // Sign up with Supabase using email and password from form
         const result = await signUpWithEmail(data.email, data.password);

         if (result.user) {
            // Here you would typically:
            // 1. Create coach profile in your database
            // 2. Store additional coach data
            // 3. Send welcome email
            // 4. Trigger coach verification process

            console.log("Coach signup data:", data);

            if (!result.session) {
               setSuccess(
                  "Please check your email to confirm your coach account!"
               );
            } else {
               setSuccess("Coach account created successfully!");
            }
         }
      } catch (error) {
         console.error("Coach signup error:", error);
         setError(
            error instanceof Error ? error.message : "Coach signup failed"
         );
      } finally {
         setLoading(false);
      }
   },
}));
