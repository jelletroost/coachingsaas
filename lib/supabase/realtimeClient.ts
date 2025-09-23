import { createBrowserClient } from "@supabase/ssr";

// Create Supabase client optimized for realtime
export function createSupabaseRealtimeClient() {
   const isLocal =
      process.env.NODE_ENV === "development" ||
      process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("localhost") ||
      process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("127.0.0.1");

   console.log("Supabase Realtime Config:", {
      isLocal,
      url: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + "...",
      env: process.env.NODE_ENV,
   });

   return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
         realtime: {
            params: {
               eventsPerSecond: 10,
            },
            timeout: isLocal ? 15000 : 10000, // Longer timeout for local
         },
         auth: {
            persistSession: true,
            autoRefreshToken: true,
         },
         global: {
            headers: isLocal
               ? {
                    "X-Client-Info": "supabase-js-local",
                 }
               : {},
         },
      }
   );
}

// Export a singleton instance
export const supabaseRealtime = createSupabaseRealtimeClient();

// Realtime channel types
export type RealtimeChannel = ReturnType<typeof supabaseRealtime.channel>;

// Message types for realtime
export interface RealtimeMessage {
   id: string;
   room_id: string;
   sender_id: string;
   content: string;
   created_at: string;
   updated_at?: string;
   is_read?: boolean;
   meeting_id?: any;
}

export interface RealtimeMeeting {
   id: string;
   room_id: string;
   type: string;
   status: string;
   meeting_link?: string;
   updated_at: string;
}

// Connection status
export type ConnectionStatus =
   | "CONNECTING"
   | "CONNECTED"
   | "DISCONNECTED"
   | "ERROR";

export default supabaseRealtime;
