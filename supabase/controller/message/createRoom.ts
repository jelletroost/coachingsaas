import { Context } from "jsr:@hono/hono";
import edgeAdminClient from "../../_shared/supabaseAdmin.ts";

const getPatientProfile = async (c: Context) => {
   const { coachId, patientId } = await c.req.json();

   if (!coachId || !patientId) {
      return c.json({ error: "Coach ID and patient ID are required" }, 400);
   }
   const roomId = coachId + patientId;

   // Check if room already exists
   const { data, error } = await edgeAdminClient
      .from("message_room")
      .select("*")
      .eq("room_id", roomId)
      .single();
   if (data) {
      return c.json({ data: data }, 200);
   }

   // Create room
   const { data: newRoom, error: newRoomError } = await edgeAdminClient
      .from("message_room")
      .insert({ name: roomId, room_id: roomId })
      .select("*")
      .single();

   if (newRoomError) {
      return c.json({ error: newRoomError.message }, 500);
   }
   return c.json(newRoom);
};

export default getPatientProfile;
