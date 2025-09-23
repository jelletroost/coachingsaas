import { supabaseRealtime } from "./realtimeClient";

export async function testRealtimeConnection(): Promise<{
   success: boolean;
   error?: string;
   details?: any;
}> {
   try {
      console.log("Testing Supabase Realtime connection...");

      // Check if we're in local development
      const isLocal =
         process.env.NODE_ENV === "development" ||
         process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("localhost") ||
         process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("127.0.0.1");

      if (isLocal) {
         console.log("Local development detected, using fallback mode");
         return {
            success: true,
            details: {
               mode: "local-fallback",
               message: "Using local development fallback",
            },
         };
      }

      // Test basic connection with a simple channel
      const channel = supabaseRealtime.channel("test-connection", {
         config: {
            broadcast: { self: false },
            presence: { key: "test" },
         },
      });

      return new Promise((resolve) => {
         const timeout = setTimeout(() => {
            console.log("Realtime test timed out, cleaning up...");
            supabaseRealtime.removeChannel(channel);
            resolve({
               success: false,
               error: "Connection test timed out after 10 seconds",
            });
         }, 10000);

         channel
            .on("system", {}, (status) => {
               console.log("System status:", status);
               if (status === "SUBSCRIBED") {
                  clearTimeout(timeout);
                  supabaseRealtime.removeChannel(channel);
                  resolve({
                     success: true,
                     details: { status },
                  });
               } else if (status === "CHANNEL_ERROR") {
                  clearTimeout(timeout);
                  supabaseRealtime.removeChannel(channel);
                  resolve({
                     success: false,
                     error: "Channel error",
                     details: { status },
                  });
               }
            })
            .subscribe((status, err) => {
               console.log("Subscription status:", status, err);
               if (status === "SUBSCRIBED") {
                  clearTimeout(timeout);
                  supabaseRealtime.removeChannel(channel);
                  resolve({
                     success: true,
                     details: { status },
                  });
               } else if (status === "CHANNEL_ERROR") {
                  clearTimeout(timeout);
                  supabaseRealtime.removeChannel(channel);
                  resolve({
                     success: false,
                     error: err?.message || "Channel error",
                     details: { status, error: err },
                  });
               } else if (status === "TIMED_OUT") {
                  clearTimeout(timeout);
                  supabaseRealtime.removeChannel(channel);
                  resolve({
                     success: false,
                     error: "Connection timed out",
                     details: { status },
                  });
               }
            });
      });
   } catch (error) {
      console.error("Realtime connection test failed:", error);
      return {
         success: false,
         error: error instanceof Error ? error.message : "Unknown error",
         details: error,
      };
   }
}

export async function testDatabaseConnection(): Promise<{
   success: boolean;
   error?: string;
   details?: any;
}> {
   try {
      console.log("Testing database connection...");

      // Check environment variables first
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseKey) {
         return {
            success: false,
            error: "Missing Supabase environment variables",
            details: {
               hasUrl: !!supabaseUrl,
               hasKey: !!supabaseKey,
            },
         };
      }

      // Test basic database query
      const { data, error } = await supabaseRealtime
         .from("message_room")
         .select("id")
         .limit(1);

      if (error) {
         return {
            success: false,
            error: error.message,
            details: error,
         };
      }

      return {
         success: true,
         details: { data },
      };
   } catch (error) {
      console.error("Database connection test failed:", error);
      return {
         success: false,
         error: error instanceof Error ? error.message : "Unknown error",
         details: error,
      };
   }
}

export function checkEnvironmentVariables(): {
   success: boolean;
   error?: string;
   details?: any;
} {
   const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
   const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

   if (!supabaseUrl) {
      return {
         success: false,
         error: "NEXT_PUBLIC_SUPABASE_URL is not set",
         details: { missing: "NEXT_PUBLIC_SUPABASE_URL" },
      };
   }

   if (!supabaseKey) {
      return {
         success: false,
         error: "NEXT_PUBLIC_SUPABASE_ANON_KEY is not set",
         details: { missing: "NEXT_PUBLIC_SUPABASE_ANON_KEY" },
      };
   }

   return {
      success: true,
      details: {
         url: supabaseUrl.substring(0, 30) + "...",
         key: supabaseKey.substring(0, 20) + "...",
      },
   };
}
