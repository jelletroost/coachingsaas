import { Context } from "jsr:@hono/hono";
import edgeAdminClient from "../../_shared/supabaseAdmin.ts";

const getPatientProfile = async (c: Context) => {
   const { coachId, patientId } = await c.req.json();

   if (!coachId || !patientId) {
      return c.json({ error: "Coach ID and patient ID are required" }, 400);
   }

   // Get the patient name
   const { data: patientData, error: patientError } = await edgeAdminClient
      .from("users")
      .select("first_name, last_name")
      .eq("id", patientId)
      .single();
   if (patientError) {
      return c.json({ error: patientError.message }, 500);
   }

   const patientName = patientData.first_name + " " + patientData.last_name;

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
      .insert({ name: patientName, room_id: roomId })
      .select("*")
      .single();

   if (newRoomError) {
      return c.json({ error: newRoomError.message }, 500);
   }

   // Check if both users are already members
   const { data: memberData } = await edgeAdminClient
      .from("room_members")
      .select("*")
      .eq("room_id", roomId)
      .in("user_id", [coachId, patientId]);

   // If both users are already members, return the room
   if (memberData && memberData.length === 2) {
      return c.json({ data: newRoom }, 200);
   }

   // Add users as members
   const { error: membersError } = await edgeAdminClient
      .from("room_members")
      .insert([
         { room_id: roomId, user_id: coachId },
         { room_id: roomId, user_id: patientId },
      ])
      .select("*");

   if (membersError) {
      return c.json({ error: membersError.message }, 500);
   }
   return c.json(newRoom);
};

export default getPatientProfile;
