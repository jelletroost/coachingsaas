import {
   CoachProfile,
   PatientProfile,
   TABLES,
   UserProfile,
   UserProfileWithDetails,
} from "@/lib/types/database";
import { supabase } from "@/supabase/client";

export class UserService {
   // Get user profile by user ID
   static async getUserProfile(userId: string): Promise<UserProfile | null> {
      try {
         const { data, error } = await supabase
            .from(TABLES.USER_PROFILES)
            .select("*")
            .eq("user_id", userId)
            .single();

         if (error) {
            console.error("Error fetching user profile:", error);
            return null;
         }

         return data;
      } catch (error) {
         console.error("Error in getUserProfile:", error);
         return null;
      }
   }

   // Get user profile with related data (patient or coach profile)
   static async getUserProfileWithDetails(
      userId: string
   ): Promise<UserProfileWithDetails | null> {
      try {
         const { data, error } = await supabase
            .from(TABLES.USER_PROFILES)
            .select(
               `
          *,
          patient_profiles (*),
          coach_profiles (*)
        `
            )
            .eq("user_id", userId)
            .single();

         if (error) {
            console.error("Error fetching user profile with details:", error);
            return null;
         }

         return {
            ...data,
            patient_profile: data.patient_profiles?.[0] || undefined,
            coach_profile: data.coach_profiles?.[0] || undefined,
         };
      } catch (error) {
         console.error("Error in getUserProfileWithDetails:", error);
         return null;
      }
   }

   // Create user profile
   static async createUserProfile(
      profile: Omit<UserProfile, "id" | "created_at" | "updated_at">
   ): Promise<UserProfile | null> {
      try {
         const { data, error } = await supabase
            .from(TABLES.USER_PROFILES)
            .insert(profile)
            .select()
            .single();

         if (error) {
            console.error("Error creating user profile:", error);
            return null;
         }

         return data;
      } catch (error) {
         console.error("Error in createUserProfile:", error);
         return null;
      }
   }

   // Update user profile
   static async updateUserProfile(
      userId: string,
      updates: Partial<UserProfile>
   ): Promise<UserProfile | null> {
      try {
         const { data, error } = await supabase
            .from(TABLES.USER_PROFILES)
            .update(updates)
            .eq("user_id", userId)
            .select()
            .single();

         if (error) {
            console.error("Error updating user profile:", error);
            return null;
         }

         return data;
      } catch (error) {
         console.error("Error in updateUserProfile:", error);
         return null;
      }
   }

   // Create patient profile
   static async createPatientProfile(
      profile: Omit<PatientProfile, "id" | "created_at" | "updated_at">
   ): Promise<PatientProfile | null> {
      try {
         const { data, error } = await supabase
            .from(TABLES.PATIENT_PROFILES)
            .insert(profile)
            .select()
            .single();

         if (error) {
            console.error("Error creating patient profile:", error);
            return null;
         }

         return data;
      } catch (error) {
         console.error("Error in createPatientProfile:", error);
         return null;
      }
   }

   // Update patient profile
   static async updatePatientProfile(
      userProfileId: string,
      updates: Partial<PatientProfile>
   ): Promise<PatientProfile | null> {
      try {
         const { data, error } = await supabase
            .from(TABLES.PATIENT_PROFILES)
            .update(updates)
            .eq("user_profile_id", userProfileId)
            .select()
            .single();

         if (error) {
            console.error("Error updating patient profile:", error);
            return null;
         }

         return data;
      } catch (error) {
         console.error("Error in updatePatientProfile:", error);
         return null;
      }
   }

   // Create coach profile
   static async createCoachProfile(
      profile: Omit<CoachProfile, "id" | "created_at" | "updated_at">
   ): Promise<CoachProfile | null> {
      try {
         const { data, error } = await supabase
            .from(TABLES.COACH_PROFILES)
            .insert(profile)
            .select()
            .single();

         if (error) {
            console.error("Error creating coach profile:", error);
            return null;
         }

         return data;
      } catch (error) {
         console.error("Error in createCoachProfile:", error);
         return null;
      }
   }

   // Update coach profile
   static async updateCoachProfile(
      userProfileId: string,
      updates: Partial<CoachProfile>
   ): Promise<CoachProfile | null> {
      try {
         const { data, error } = await supabase
            .from(TABLES.COACH_PROFILES)
            .update(updates)
            .eq("user_profile_id", userProfileId)
            .select()
            .single();

         if (error) {
            console.error("Error updating coach profile:", error);
            return null;
         }

         return data;
      } catch (error) {
         console.error("Error in updateCoachProfile:", error);
         return null;
      }
   }

   // Search coaches by specialization
   static async searchCoaches(
      specialization?: string,
      limit = 10
   ): Promise<CoachProfile[]> {
      try {
         let query = supabase
            .from(TABLES.COACH_PROFILES)
            .select(
               `
          *,
          user_profiles!inner (
            id,
            first_name,
            last_name,
            email,
            avatar_url,
            account_status
          )
        `
            )
            .eq("user_profiles.account_status", "active")
            .eq("is_verified", true);

         if (specialization) {
            query = query.eq("specialization", specialization);
         }

         const { data, error } = await query
            .limit(limit)
            .order("created_at", { ascending: false });

         if (error) {
            console.error("Error searching coaches:", error);
            return [];
         }

         return data || [];
      } catch (error) {
         console.error("Error in searchCoaches:", error);
         return [];
      }
   }

   // Get verified coaches
   static async getVerifiedCoaches(limit = 20): Promise<CoachProfile[]> {
      try {
         const { data, error } = await supabase
            .from(TABLES.COACH_PROFILES)
            .select(
               `
          *,
          user_profiles!inner (
            id,
            first_name,
            last_name,
            email,
            avatar_url,
            account_status
          )
        `
            )
            .eq("user_profiles.account_status", "active")
            .eq("is_verified", true)
            .limit(limit)
            .order("created_at", { ascending: false });

         if (error) {
            console.error("Error fetching verified coaches:", error);
            return [];
         }

         return data || [];
      } catch (error) {
         console.error("Error in getVerifiedCoaches:", error);
         return [];
      }
   }

   // Delete user profile (cascade will handle related profiles)
   static async deleteUserProfile(userId: string): Promise<boolean> {
      try {
         const { error } = await supabase
            .from(TABLES.USER_PROFILES)
            .delete()
            .eq("user_id", userId);

         if (error) {
            console.error("Error deleting user profile:", error);
            return false;
         }

         return true;
      } catch (error) {
         console.error("Error in deleteUserProfile:", error);
         return false;
      }
   }

   // Check if user profile exists
   static async userProfileExists(userId: string): Promise<boolean> {
      try {
         const { data, error } = await supabase
            .from(TABLES.USER_PROFILES)
            .select("id")
            .eq("user_id", userId)
            .single();

         if (error) {
            return false;
         }

         return !!data;
      } catch {
         return false;
      }
   }

   // Get user role
   static async getUserRole(userId: string): Promise<string | null> {
      try {
         const { data, error } = await supabase
            .from(TABLES.USER_PROFILES)
            .select("role")
            .eq("user_id", userId)
            .single();

         if (error) {
            console.error("Error fetching user role:", error);
            return null;
         }

         return data?.role || null;
      } catch (error) {
         console.error("Error in getUserRole:", error);
         return null;
      }
   }
}
