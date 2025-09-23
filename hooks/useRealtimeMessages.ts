import { Message } from "@/components/coach/messages/mockData";
import {
   ConnectionStatus,
   supabaseRealtime,
} from "@/lib/supabase/realtimeClient";
import { useCallback, useEffect, useState } from "react";
import { useLocalRealtimeFallback } from "./useLocalRealtimeFallback";

interface UseRealtimeMessagesProps {
   roomId?: string;
   enabled?: boolean;
}

interface UseRealtimeMessagesReturn {
   messages: Message[];
   connectionStatus: ConnectionStatus;
   error: string | null;
   addMessage: (message: Message) => void;
   updateMessage: (messageId: string, updates: Partial<Message>) => void;
}

export const useRealtimeMessages = ({
   roomId,
   enabled = true,
}: UseRealtimeMessagesProps): UseRealtimeMessagesReturn => {
   const [messages, setMessages] = useState<Message[]>([]);
   const [connectionStatus, setConnectionStatus] =
      useState<ConnectionStatus>("DISCONNECTED");
   const [error, setError] = useState<string | null>(null);

   // Check if we're in local development
   const isLocal =
      process.env.NODE_ENV === "development" ||
      process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("localhost") ||
      process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("127.0.0.1");

   // Use local fallback for development
   const localFallback = useLocalRealtimeFallback({
      roomId,
      enabled: enabled && isLocal,
   });

   const addMessage = useCallback((message: Message) => {
      setMessages((prev) => {
         // Check if message already exists to prevent duplicates
         const exists = prev.some((msg) => msg.id === message.id);
         if (exists) return prev;

         return [...prev, message].sort(
            (a, b) =>
               new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
         );
      });
   }, []);

   const updateMessage = useCallback(
      (messageId: string, updates: Partial<Message>) => {
         setMessages((prev) =>
            prev.map((msg) =>
               msg.id === messageId ? { ...msg, ...updates } : msg
            )
         );
      },
      []
   );

   useEffect(() => {
      if (!roomId || !enabled) {
         setConnectionStatus("DISCONNECTED");
         return;
      }

      console.log("Setting up realtime subscription for room:", roomId);
      setConnectionStatus("CONNECTING");
      setError(null);

      // Set a timeout to fallback to polling if realtime fails
      const fallbackTimeout = setTimeout(() => {
         if (connectionStatus === "CONNECTING") {
            console.log(
               "Realtime connection taking too long, falling back to polling"
            );
            setConnectionStatus("ERROR");
            setError("Realtime unavailable, using polling fallback");
         }
      }, 5000);

      const channel = supabaseRealtime
         .channel(`room:${roomId}`, {
            config: {
               broadcast: { self: false },
               presence: { key: roomId },
            },
         })
         .on(
            "postgres_changes",
            {
               event: "INSERT",
               schema: "public",
               table: "messages",
               filter: `room_id=eq.${roomId}`,
            },
            (payload) => {
               console.log("New message received:", payload.new);

               const newMessage: Message = {
                  id: payload.new.id,
                  conversationId: roomId,
                  room_id: payload.new.room_id,
                  sender_id: payload.new.sender_id,
                  senderType: payload.new.sender_type || "patient",
                  content: payload.new.content,
                  timestamp: payload.new.created_at,
                  isRead: payload.new.is_read || false,
                  is_error: false,
                  meeting_id: payload.new.meeting_id,
               };

               addMessage(newMessage);
            }
         )
         .on(
            "postgres_changes",
            {
               event: "UPDATE",
               schema: "public",
               table: "messages",
               filter: `room_id=eq.${roomId}`,
            },
            (payload) => {
               console.log("Message updated:", payload.new);

               updateMessage(payload.new.id, {
                  content: payload.new.content,
                  timestamp: payload.new.updated_at || payload.new.created_at,
                  isRead: payload.new.is_read,
                  is_error: payload.new.is_error,
                  meeting_id: payload.new.meeting_id,
               });
            }
         )
         .on("system", {}, (status) => {
            console.log("Realtime system status:", status);

            switch (status) {
               case "SUBSCRIBED":
                  clearTimeout(fallbackTimeout);
                  setConnectionStatus("CONNECTED");
                  setError(null);
                  break;
               case "CHANNEL_ERROR":
                  clearTimeout(fallbackTimeout);
                  setConnectionStatus("ERROR");
                  setError("Failed to connect to realtime");
                  break;
               case "TIMED_OUT":
                  clearTimeout(fallbackTimeout);
                  setConnectionStatus("ERROR");
                  setError("Connection timed out");
                  break;
               case "CLOSED":
                  setConnectionStatus("DISCONNECTED");
                  break;
            }
         })
         .subscribe((status, err) => {
            console.log("Channel subscription status:", status, err);

            if (status === "SUBSCRIBED") {
               clearTimeout(fallbackTimeout);
               setConnectionStatus("CONNECTED");
               setError(null);
            } else if (status === "CHANNEL_ERROR") {
               clearTimeout(fallbackTimeout);
               setConnectionStatus("ERROR");
               setError(
                  `Failed to subscribe to channel: ${
                     err?.message || "Unknown error"
                  }`
               );
            } else if (status === "TIMED_OUT") {
               clearTimeout(fallbackTimeout);
               setConnectionStatus("ERROR");
               setError("Connection timed out");
            } else if (status === "CLOSED") {
               setConnectionStatus("DISCONNECTED");
            }
         });

      return () => {
         console.log("Cleaning up realtime subscription for room:", roomId);
         clearTimeout(fallbackTimeout);
         supabaseRealtime.removeChannel(channel);
         setConnectionStatus("DISCONNECTED");
      };
   }, [roomId, enabled, addMessage, updateMessage, connectionStatus]);

   // Return local fallback for development, real Supabase for production
   if (isLocal) {
      return {
         messages: localFallback.messages,
         connectionStatus: localFallback.connectionStatus,
         error: localFallback.error,
         addMessage: localFallback.addMessage,
         updateMessage: localFallback.updateMessage,
      };
   }

   return {
      messages,
      connectionStatus,
      error,
      addMessage,
      updateMessage,
   };
};
