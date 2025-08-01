export type UserRole = "patient" | "coach" | "admin" | "super_admin";

export type CoachSpecialization =
   | "nutrition"
   | "fitness"
   | "mental-health"
   | "diabetes"
   | "cardiology"
   | "pediatrics"
   | "geriatrics"
   | "general";

export type ExperienceLevel = "0-2" | "3-5" | "6-10" | "10+";

export type AccountStatus = "pending" | "active" | "suspended" | "verified";

// User role interface
export interface UserRoleRecord {
   id: string;
   name: UserRole;
   description: string;
   created_at: string;
   updated_at: string;
}

// Base user profile interface
export interface UserProfile {
   id: string;
   user_id: string;
   role_id: string;
   role?: UserRoleRecord; // For joins
   first_name: string;
   last_name: string;
   email: string;
   phone?: string;
   avatar_url?: string;
   date_of_birth?: string;
   account_status: AccountStatus;
   email_verified: boolean;
   created_at: string;
   updated_at: string;
}

// Patient profile interface
export interface PatientProfile {
   id: string;
   user_profile_id: string;
   health_conditions?: string;
   emergency_contact_name?: string;
   emergency_contact_phone?: string;
   emergency_contact_relationship?: string;
   insurance_provider?: string;
   insurance_policy_number?: string;
   preferred_language: string;
   timezone: string;
   created_at: string;
   updated_at: string;
}

// Coach profile interface
export interface CoachProfile {
   id: string;
   user_profile_id: string;
   specialization: CoachSpecialization;
   experience_level: ExperienceLevel;
   license_number: string;
   bio?: string;
   certifications?: string[];
   education?: string[];
   years_of_experience?: number;
   hourly_rate?: number;
   availability_schedule?: Record<string, unknown>;
   languages_spoken: string[];
   timezone: string;
   is_verified: boolean;
   verification_date?: string;
   created_at: string;
   updated_at: string;
}

// User session interface
export interface UserSession {
   id: string;
   user_id: string;
   session_token: string;
   ip_address?: string;
   user_agent?: string;
   expires_at: string;
   created_at: string;
   last_activity: string;
}

// Extended user profile with related data
export interface UserProfileWithDetails extends UserProfile {
   role: UserRoleRecord; // Make role required since we're joining it
   patient_profile?: PatientProfile;
   coach_profile?: CoachProfile;
   patients?: Array<{
      user_id: string;
      assigned_coach_id: string;
      coach: {
         id: string;
         first_name: string;
         last_name: string;
         email: string;
      };
   }>;
}

export interface Product {
   id: string;
   name: string;
   type: "medicine" | "supplement" | "service";
   description: string;
   price: number;
   currency: string;
   stock_quantity: number;
   status: "active" | "inactive";
   prescription_required: boolean;
   created_at: string;
   updated_at: string;
}

export interface Prescription {
   id: string;
   patient_id: string;
   product_id: string;
   patient_name: string;
   product_name: string;
   dosage: string;
   frequency: string;
   duration: string;
   instructions: string;
   notes: string | null;
   status: "active" | "completed" | "discontinued";
   created_at: string;
   updated_at: string;
}

// Database table names
export const TABLES = {
   USER_PROFILES: "user_profiles",
   PATIENT_PROFILES: "patient_profiles",
   COACH_PROFILES: "coach_profiles",
   USER_SESSIONS: "user_sessions",
} as const;

// Database schema types for Supabase
export interface Database {
   public: {
      Tables: {
         user_roles: {
            Row: UserRoleRecord;
            Insert: Omit<UserRoleRecord, "id" | "created_at" | "updated_at">;
            Update: Partial<
               Omit<UserRoleRecord, "id" | "created_at" | "updated_at">
            >;
         };
         user_profiles: {
            Row: UserProfile;
            Insert: Omit<UserProfile, "id" | "created_at" | "updated_at">;
            Update: Partial<
               Omit<UserProfile, "id" | "created_at" | "updated_at">
            >;
         };
         patient_profiles: {
            Row: PatientProfile;
            Insert: Omit<PatientProfile, "id" | "created_at" | "updated_at">;
            Update: Partial<
               Omit<PatientProfile, "id" | "created_at" | "updated_at">
            >;
         };
         coach_profiles: {
            Row: CoachProfile;
            Insert: Omit<CoachProfile, "id" | "created_at" | "updated_at">;
            Update: Partial<
               Omit<CoachProfile, "id" | "created_at" | "updated_at">
            >;
         };
         user_sessions: {
            Row: UserSession;
            Insert: Omit<UserSession, "id" | "created_at" | "last_activity">;
            Update: Partial<
               Omit<UserSession, "id" | "created_at" | "last_activity">
            >;
         };
         prescriptions: {
            Row: Prescription;
            Insert: Omit<Prescription, "id" | "created_at" | "updated_at">;
            Update: Partial<
               Omit<Prescription, "id" | "created_at" | "updated_at">
            >;
         };
      };
      Views: Record<string, never>;
      Functions: {
         get_user_profile: {
            Args: { user_uuid: string };
            Returns: UserProfile[];
         };
      };
      Enums: {
         coach_specialization: CoachSpecialization;
         experience_level: ExperienceLevel;
         account_status: AccountStatus;
      };
   };
}
