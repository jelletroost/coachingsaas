import { Context } from "jsr:@hono/hono";
import edgeAdminClient from "../../_shared/supabaseAdmin.ts";

const getMessages = async (c: Context) => {
   const { roomId } = c.req.query();
   const { data, error } = await edgeAdminClient
      .from("messages")
      .select(
         `
         *,
         meeting:meetings(*)
      `
      )
      .eq("room_id", roomId);

   if (error) {
      return c.json({ error: error.message }, 500);
   }

   // Conditionally populate meeting_id field with meeting data
   const messagesWithMeetingData =
      data?.map((message) => {
         const { meeting, ...messageWithoutMeeting } = message;
         return {
            ...messageWithoutMeeting,
            meeting_id: message.meeting_id ? meeting : null,
         };
      }) || [];

   return c.json({ data: messagesWithMeetingData }, 200);
};

export default getMessages;
