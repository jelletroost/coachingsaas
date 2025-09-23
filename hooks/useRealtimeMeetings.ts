import {
   ConnectionStatus,
   RealtimeMeeting,
   supabaseRealtime,
} from "@/lib/supabase/realtimeClient";
import { useCallback, useEffect, useState } from "react";

interface UseRealtimeMeetingsProps {
   roomId?: string;
   enabled?: boolean;
}

interface UseRealtimeMeetingsReturn {
   meetings: RealtimeMeeting[];
   connectionStatus: ConnectionStatus;
   error: string | null;
   updateMeeting: (
      meetingId: string,
      updates: Partial<RealtimeMeeting>
   ) => void;
}

export const useRealtimeMeetings = ({
   roomId,
   enabled = true,
}: UseRealtimeMeetingsProps): UseRealtimeMeetingsReturn => {
   const [meetings, setMeetings] = useState<RealtimeMeeting[]>([]);
   const [connectionStatus, setConnectionStatus] =
      useState<ConnectionStatus>("DISCONNECTED");
   const [error, setError] = useState<string | null>(null);

   const updateMeeting = useCallback(
      (meetingId: string, updates: Partial<RealtimeMeeting>) => {
         setMeetings((prev) =>
            prev.map((meeting) =>
               meeting.id === meetingId ? { ...meeting, ...updates } : meeting
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

      setConnectionStatus("CONNECTING");
      setError(null);

      const channel = supabaseRealtime
         .channel(`meetings:${roomId}`)
         .on(
            "postgres_changes",
            {
               event: "INSERT",
               schema: "public",
               table: "meetings",
               filter: `room_id=eq.${roomId}`,
            },
            (payload) => {
               console.log("New meeting created:", payload.new);

               const newMeeting: RealtimeMeeting = {
                  id: payload.new.id,
                  room_id: payload.new.room_id,
                  type: payload.new.type,
                  status: payload.new.status,
                  meeting_link: payload.new.meeting_link,
                  updated_at: payload.new.updated_at,
               };

               setMeetings((prev) => {
                  const exists = prev.some(
                     (meeting) => meeting.id === newMeeting.id
                  );
                  if (exists) return prev;
                  return [...prev, newMeeting];
               });
            }
         )
         .on(
            "postgres_changes",
            {
               event: "UPDATE",
               schema: "public",
               table: "meetings",
               filter: `room_id=eq.${roomId}`,
            },
            (payload) => {
               console.log("Meeting updated:", payload.new);

               const updatedMeeting: RealtimeMeeting = {
                  id: payload.new.id,
                  room_id: payload.new.room_id,
                  type: payload.new.type,
                  status: payload.new.status,
                  meeting_link: payload.new.meeting_link,
                  updated_at: payload.new.updated_at,
               };

               setMeetings((prev) =>
                  prev.map((meeting) =>
                     meeting.id === updatedMeeting.id ? updatedMeeting : meeting
                  )
               );

               // Show notification for status changes
               if (payload.old && payload.old.status !== payload.new.status) {
                  const statusMessages = {
                     confirmed: "Meeting confirmed! 🎉",
                     cancelled: "Meeting cancelled ❌",
                     completed: "Meeting completed ✅",
                  };

                  const message =
                     statusMessages[
                        payload.new.status as keyof typeof statusMessages
                     ];
                  if (message) {
                     // You can integrate with a toast notification system here
                     console.log(message);
                  }
               }
            }
         )
         .on("system", {}, (status) => {
            console.log("Meetings realtime status:", status);

            switch (status) {
               case "SUBSCRIBED":
                  setConnectionStatus("CONNECTED");
                  setError(null);
                  break;
               case "CHANNEL_ERROR":
                  setConnectionStatus("ERROR");
                  setError("Failed to connect to meetings realtime");
                  break;
               case "TIMED_OUT":
                  setConnectionStatus("ERROR");
                  setError("Meetings connection timed out");
                  break;
               case "CLOSED":
                  setConnectionStatus("DISCONNECTED");
                  break;
            }
         })
         .subscribe((status) => {
            if (status === "SUBSCRIBED") {
               setConnectionStatus("CONNECTED");
            } else if (status === "CHANNEL_ERROR") {
               setConnectionStatus("ERROR");
               setError("Failed to subscribe to meetings channel");
            }
         });

      return () => {
         console.log(
            "Cleaning up meetings realtime subscription for room:",
            roomId
         );
         supabaseRealtime.removeChannel(channel);
         setConnectionStatus("DISCONNECTED");
      };
   }, [roomId, enabled, updateMeeting]);

   return {
      meetings,
      connectionStatus,
      error,
      updateMeeting,
   };
};
