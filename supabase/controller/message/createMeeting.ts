import { Context } from "jsr:@hono/hono";
import edgeAdminClient from "../../_shared/supabaseAdmin.ts";

const createMeeting = async (c: Context) => {
   const { senderId, type, date, time, duration, notes, roomId } =
      await c.req.json();

   // if (!senderId || !type || !date || !time || !duration || !notes || !roomId) {
   //    return c.json({ error: "All fields are required" }, 400);
   // }

   const { data, error } = await edgeAdminClient
      .from("meetings")
      .insert({
         sender_id: senderId,
         type,
         date,
         time,
         duration,
         notes,
         room_id: roomId,
      })
      .select("*")
      .single();

   if (error) {
      return c.json({ error: error.message }, 500);
   }

   // Insert in message
   const { data: messageData, error: messageError } = await edgeAdminClient
      .from("messages")
      .insert({
         room_id: roomId,
         sender_id: senderId,
         content: `Meeting scheduled: ${type} on ${date} at ${time}`,
         meeting_id: data.id,
      })
      .select("*")
      .single();

   if (messageError) {
      return c.json({ error: messageError.message }, 500);
   }

   return c.json(messageData);
};

export default createMeeting;
