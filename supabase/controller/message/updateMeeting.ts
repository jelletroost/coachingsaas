import { Context } from "jsr:@hono/hono";
import edgeAdminClient from "../../_shared/supabaseAdmin.ts";

interface UpdateMeetingRequest {
   meetingId: string;
   action: "confirmed" | "cancelled";
   meetingLink?: string;
}

const updateMeeting = async (c: Context) => {
   try {
      const body: UpdateMeetingRequest = await c.req.json();
      const { meetingId, action, meetingLink } = body;

      // Validate required fields
      if (!meetingId || !action) {
         return c.json(
            { error: "Missing required fields: meetingId and action" },
            400
         );
      }

      // Validate action
      if (!["confirmed", "cancelled"].includes(action)) {
         return c.json(
            { error: "Invalid action. Must be 'confirmed' or 'cancelled'" },
            400
         );
      }

      // For Google Meet confirmations, require meeting link
      if (action === "confirmed") {
         // First, get the meeting to check if it's a Google Meet
         const { data: meeting, error: fetchError } = await edgeAdminClient
            .from("meetings")
            .select("type")
            .eq("id", meetingId)
            .single();

         if (fetchError) {
            return c.json({ error: "Meeting not found" }, 404);
         }

         // If it's a Google Meet and no link provided, return error
         if (meeting.type === "google-meet" && !meetingLink) {
            return c.json(
               { error: "Meeting link is required for Google Meet meetings" },
               400
            );
         }
      }

      // Prepare update data
      const updateData: any = {
         status: action,
         updated_at: new Date().toISOString(),
      };

      // Add meeting link if provided
      if (meetingLink) {
         updateData.meeting_link = meetingLink;
      }

      // Update the meeting
      const { data, error } = await edgeAdminClient
         .from("meetings")
         .update(updateData)
         .eq("id", meetingId)
         .select()
         .single();

      if (error) {
         console.error("Error updating meeting:", error);
         return c.json({ error: "Failed to update meeting" }, 500);
      }

      // Return success response
      return c.json({
         success: true,
         message: `Meeting ${action} successfully`,
         meeting: data,
      });
   } catch (error) {
      console.error("Error in updateMeeting:", error);
      return c.json({ error: "Internal server error" }, 500);
   }
};

export default updateMeeting;
