import { supabaseRealtime } from "@/lib/supabase/realtimeClient";
import { useCallback, useEffect, useState } from "react";

interface TypingUser {
   user_id: string;
   name?: string;
   typing: boolean;
   last_seen: string;
}

interface UseTypingIndicatorProps {
   roomId?: string;
   userId?: string;
   userName?: string;
   enabled?: boolean;
}

interface UseTypingIndicatorReturn {
   typingUsers: TypingUser[];
   isTyping: boolean;
   setIsTyping: (typing: boolean) => void;
   connectionStatus: "CONNECTING" | "CONNECTED" | "DISCONNECTED" | "ERROR";
}

export const useTypingIndicator = ({
   roomId,
   userId,
   userName,
   enabled = true,
}: UseTypingIndicatorProps): UseTypingIndicatorReturn => {
   const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);
   const [isTyping, setIsTypingState] = useState(false);
   const [connectionStatus, setConnectionStatus] = useState<
      "CONNECTING" | "CONNECTED" | "DISCONNECTED" | "ERROR"
   >("DISCONNECTED");

   const setIsTyping = useCallback((typing: boolean) => {
      setIsTypingState(typing);
   }, []);

   useEffect(() => {
      if (!roomId || !userId || !enabled) {
         setConnectionStatus("DISCONNECTED");
         return;
      }

      setConnectionStatus("CONNECTING");

      const channel = supabaseRealtime
         .channel(`typing:${roomId}`)
         .on("presence", { event: "sync" }, () => {
            const state = channel.presenceState();
            const users: TypingUser[] = Object.values(state)
               .flat()
               .map((presence: any) => ({
                  user_id: presence.user_id,
                  name: presence.name,
                  typing: presence.typing,
                  last_seen: presence.last_seen,
               }));

            // Filter out current user and only show users who are typing
            const otherTypingUsers = users.filter(
               (user) => user.user_id !== userId && user.typing
            );

            setTypingUsers(otherTypingUsers);
         })
         .on("presence", { event: "join" }, ({ key, newPresences }) => {
            console.log("User joined typing channel:", key, newPresences);
         })
         .on("presence", { event: "leave" }, ({ key, leftPresences }) => {
            console.log("User left typing channel:", key, leftPresences);
         })
         .subscribe(async (status) => {
            if (status === "SUBSCRIBED") {
               setConnectionStatus("CONNECTED");

               // Track current user's presence
               await channel.track({
                  user_id: userId,
                  name: userName,
                  typing: false,
                  last_seen: new Date().toISOString(),
               });
            } else if (status === "CHANNEL_ERROR") {
               setConnectionStatus("ERROR");
            }
         });

      return () => {
         console.log("Cleaning up typing indicator for room:", roomId);
         supabaseRealtime.removeChannel(channel);
         setConnectionStatus("DISCONNECTED");
      };
   }, [roomId, userId, userName, enabled]);

   // Update typing status when isTyping changes
   useEffect(() => {
      if (!roomId || !userId || connectionStatus !== "CONNECTED") return;

      const channel = supabaseRealtime.channel(`typing:${roomId}`);

      const updateTypingStatus = async () => {
         await channel.track({
            user_id: userId,
            name: userName,
            typing: isTyping,
            last_seen: new Date().toISOString(),
         });
      };

      updateTypingStatus();

      return () => {
         supabaseRealtime.removeChannel(channel);
      };
   }, [isTyping, roomId, userId, userName, connectionStatus]);

   return {
      typingUsers,
      isTyping,
      setIsTyping,
      connectionStatus,
   };
};
