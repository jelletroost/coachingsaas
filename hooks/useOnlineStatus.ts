import { supabaseRealtime } from "@/lib/supabase/realtimeClient";
import { useEffect, useState } from "react";

interface OnlineUser {
   user_id: string;
   name?: string;
   online: boolean;
   last_seen: string;
}

interface UseOnlineStatusProps {
   roomId?: string;
   userId?: string;
   userName?: string;
   enabled?: boolean;
}

interface UseOnlineStatusReturn {
   onlineUsers: OnlineUser[];
   isOnline: boolean;
   connectionStatus: "CONNECTING" | "CONNECTED" | "DISCONNECTED" | "ERROR";
}

export const useOnlineStatus = ({
   roomId,
   userId,
   userName,
   enabled = true,
}: UseOnlineStatusProps): UseOnlineStatusReturn => {
   const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
   const [isOnline, setIsOnline] = useState(false);
   const [connectionStatus, setConnectionStatus] = useState<
      "CONNECTING" | "CONNECTED" | "DISCONNECTED" | "ERROR"
   >("DISCONNECTED");

   useEffect(() => {
      if (!roomId || !userId || !enabled) {
         setConnectionStatus("DISCONNECTED");
         return;
      }

      setConnectionStatus("CONNECTING");

      const channel = supabaseRealtime
         .channel(`presence:${roomId}`)
         .on("presence", { event: "sync" }, () => {
            const state = channel.presenceState();
            const users: OnlineUser[] = Object.values(state)
               .flat()
               .map((presence: any) => ({
                  user_id: presence.user_id,
                  name: presence.name,
                  online: presence.online,
                  last_seen: presence.last_seen,
               }));

            setOnlineUsers(users);

            // Check if current user is online
            const currentUserOnline = users.some(
               (user) => user.user_id === userId && user.online
            );
            setIsOnline(currentUserOnline);
         })
         .on("presence", { event: "join" }, ({ key, newPresences }) => {
            console.log("User came online:", key, newPresences);
         })
         .on("presence", { event: "leave" }, ({ key, leftPresences }) => {
            console.log("User went offline:", key, leftPresences);
         })
         .subscribe(async (status) => {
            if (status === "SUBSCRIBED") {
               setConnectionStatus("CONNECTED");

               // Track current user's online status
               await channel.track({
                  user_id: userId,
                  name: userName,
                  online: true,
                  last_seen: new Date().toISOString(),
               });

               setIsOnline(true);
            } else if (status === "CHANNEL_ERROR") {
               setConnectionStatus("ERROR");
            }
         });

      // Set up heartbeat to maintain online status
      const heartbeat = setInterval(async () => {
         if (connectionStatus === "CONNECTED") {
            await channel.track({
               user_id: userId,
               name: userName,
               online: true,
               last_seen: new Date().toISOString(),
            });
         }
      }, 30000); // Update every 30 seconds

      return () => {
         console.log("Cleaning up online status for room:", roomId);
         clearInterval(heartbeat);
         supabaseRealtime.removeChannel(channel);
         setConnectionStatus("DISCONNECTED");
         setIsOnline(false);
      };
   }, [roomId, userId, userName, enabled, connectionStatus]);

   return {
      onlineUsers,
      isOnline,
      connectionStatus,
   };
};
