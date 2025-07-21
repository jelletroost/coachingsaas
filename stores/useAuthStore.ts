/* eslint-disable no-unused-vars */
import { UserService } from "@/lib/services/userService";
import {
   CoachSpecialization,
   ExperienceLevel,
   UserProfile,
} from "@/lib/types/database";
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
   userProfile: UserProfile | null;
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
   setUserProfile: (profile: UserProfile | null) => void;
   logout: () => Promise<void>;
   fetchUserProfile: () => Promise<void>;

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
   userProfile: null,
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
   setUserProfile: (profile: UserProfile | null) =>
      set({ userProfile: profile }),

   fetchUserProfile: async () => {
      const { user, setUserProfile } = get();
      if (user) {
         const profile = await UserService.getUserProfile(user.id);
         setUserProfile(profile);
      }
   },

   logout: async () => {
      const {
         setLoading,
         setError,
         setUser,
         setSession,
         setUserProfile,
         resetForm,
      } = get();
      setLoading(true);

      try {
         // Import supabase client dynamically to avoid SSR issues
         const { supabase } = await import("@/supabase/client");
         const { error } = await supabase.auth.signOut();

         if (error) throw error;

         // Clear user state
         setUser(null);
         setSession(null);
         setUserProfile(null);
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
         fetchUserProfile,
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

         // Fetch user profile
         if (result.user) {
            await fetchUserProfile();
         }

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
            try {
               // Create user profile
               const userProfile = await UserService.createUserProfile({
                  user_id: result.user.id,
                  role: "patient",
                  first_name: data.firstName,
                  last_name: data.lastName,
                  email: data.email,
                  phone: data.phone,
                  date_of_birth: data.dateOfBirth?.toISOString().split("T")[0],
                  account_status: "pending",
                  email_verified: false,
               });

               if (userProfile) {
                  // Create patient profile
                  const patientProfile = await UserService.createPatientProfile(
                     {
                        user_profile_id: userProfile.id,
                        health_conditions: data.healthConditions,
                        preferred_language: "en",
                        timezone: "UTC",
                     }
                  );

                  if (patientProfile) {
                     if (!result.session) {
                        setSuccess(
                           "Please check your email to confirm your patient account!"
                        );
                     } else {
                        setSuccess("Patient account created successfully!");
                     }
                  } else {
                     setError("Failed to create patient profile");
                  }
               } else {
                  setError("Failed to create user profile");
               }
            } catch (profileError) {
               console.error("Profile creation error:", profileError);
               if (
                  profileError instanceof Error &&
                  profileError.message.includes("already exists")
               ) {
                  setError(
                     "An account with this email already exists. Please sign in instead."
                  );
               } else {
                  setError("Failed to create user profile. Please try again.");
               }
               // Clean up the auth user if profile creation failed
               try {
                  const { supabase } = await import("@/supabase/client");
                  await supabase.auth.admin.deleteUser(result.user.id);
               } catch (cleanupError) {
                  console.error("Failed to cleanup auth user:", cleanupError);
               }
            }
         } else {
            setError("Failed to create user account");
         }
      } catch (error) {
         console.error("Patient signup error:", error);
         if (error instanceof Error) {
            if (error.message.includes("already registered")) {
               setError(
                  "An account with this email already exists. Please sign in instead."
               );
            } else {
               setError(error.message || "Patient signup failed");
            }
         } else {
            setError("Patient signup failed");
         }
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
            try {
               // Create user profile
               const userProfile = await UserService.createUserProfile({
                  user_id: result.user.id,
                  role: "coach",
                  first_name: data.firstName,
                  last_name: data.lastName,
                  email: data.email,
                  phone: data.phone,
                  account_status: "pending",
                  email_verified: false,
               });

               if (userProfile) {
                  // Create coach profile
                  const coachProfile = await UserService.createCoachProfile({
                     user_profile_id: userProfile.id,
                     specialization: data.specialization as CoachSpecialization,
                     experience_level: data.experience as ExperienceLevel,
                     license_number: data.license,
                     bio: data.bio,
                     languages_spoken: ["en"],
                     timezone: "UTC",
                     is_verified: false,
                  });

                  if (coachProfile) {
                     if (!result.session) {
                        setSuccess(
                           "Please check your email to confirm your coach account!"
                        );
                     } else {
                        setSuccess("Coach account created successfully!");
                     }
                  } else {
                     setError("Failed to create coach profile");
                  }
               } else {
                  setError("Failed to create user profile");
               }
            } catch (profileError) {
               console.error("Profile creation error:", profileError);
               if (
                  profileError instanceof Error &&
                  profileError.message.includes("already exists")
               ) {
                  setError(
                     "An account with this email already exists. Please sign in instead."
                  );
               } else {
                  setError("Failed to create user profile. Please try again.");
               }
               // Clean up the auth user if profile creation failed
               try {
                  const { supabase } = await import("@/supabase/client");
                  await supabase.auth.admin.deleteUser(result.user.id);
               } catch (cleanupError) {
                  console.error("Failed to cleanup auth user:", cleanupError);
               }
            }
         } else {
            setError("Failed to create user account");
         }
      } catch (error) {
         console.error("Coach signup error:", error);
         if (error instanceof Error) {
            if (error.message.includes("already registered")) {
               setError(
                  "An account with this email already exists. Please sign in instead."
               );
            } else {
               setError(error.message || "Coach signup failed");
            }
         } else {
            setError("Coach signup failed");
         }
      } finally {
         setLoading(false);
      }
   },
}));
