import { Context } from "jsr:@hono/hono";
import edgeAdminClient from "../../_shared/supabaseAdmin.ts";

const getPatientProfile = async (c: Context) => {
   const body = await c.req.json();
   const { roomId, senderId, content } = body;

   if (!roomId || !senderId || !content) {
      return c.json(
         { error: "Room ID, sender ID, and content are required" },
         400
      );
   }

   const { data: newMessage, error: newMessageError } = await edgeAdminClient
      .from("messages")
      .insert({ room_id: roomId, sender_id: senderId, content: content })
      .select("*")
      .single();

   if (newMessageError) {
      return c.json({ error: newMessageError.message }, 500);
   }
   return c.json(newMessage);
};

export default getPatientProfile;
