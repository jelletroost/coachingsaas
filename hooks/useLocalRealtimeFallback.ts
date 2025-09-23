import { Message } from "@/components/coach/messages/mockData";
import { useCallback, useEffect, useState } from "react";

interface UseLocalRealtimeFallbackProps {
   roomId?: string;
   enabled?: boolean;
   pollingInterval?: number;
}

interface UseLocalRealtimeFallbackReturn {
   messages: Message[];
   connectionStatus: "CONNECTING" | "CONNECTED" | "DISCONNECTED" | "ERROR";
   error: string | null;
   addMessage: (message: Message) => void;
   updateMessage: (messageId: string, updates: Partial<Message>) => void;
}

export const useLocalRealtimeFallback = ({
   roomId,
   enabled = true,
   pollingInterval = 3000, // Poll every 3 seconds
}: UseLocalRealtimeFallbackProps): UseLocalRealtimeFallbackReturn => {
   const [messages, setMessages] = useState<Message[]>([]);
   const [connectionStatus, setConnectionStatus] = useState<
      "CONNECTING" | "CONNECTED" | "DISCONNECTED" | "ERROR"
   >("DISCONNECTED");
   const [error, setError] = useState<string | null>(null);
   const [lastMessageId, setLastMessageId] = useState<string | null>(null);

   const addMessage = useCallback((message: Message) => {
      setMessages((prev) => {
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

   // Simulate realtime with polling
   useEffect(() => {
      if (!roomId || !enabled) {
         setConnectionStatus("DISCONNECTED");
         return;
      }

      console.log("Starting local realtime fallback for room:", roomId);
      setConnectionStatus("CONNECTING");
      setError(null);

      // Simulate connection delay
      const connectionTimeout = setTimeout(() => {
         setConnectionStatus("CONNECTED");
         setError(null);
      }, 1000);

      // Polling interval
      const pollInterval = setInterval(() => {
         // In a real implementation, you would fetch new messages here
         // For now, we'll just simulate activity
         console.log("Polling for new messages in room:", roomId);
      }, pollingInterval);

      return () => {
         console.log("Cleaning up local realtime fallback for room:", roomId);
         clearTimeout(connectionTimeout);
         clearInterval(pollInterval);
         setConnectionStatus("DISCONNECTED");
      };
   }, [roomId, enabled, pollingInterval]);

   return {
      messages,
      connectionStatus,
      error,
      addMessage,
      updateMessage,
   };
};
