import { Context } from "jsr:@hono/hono";
import edgeAdminClient from "../../_shared/supabaseAdmin.ts";

const getMessages = async (c: Context) => {
   const { roomId } = c.req.query();
   console.log("roomId", roomId);
   const { data, error } = await edgeAdminClient
      .from("messages")
      .select("*")
      .eq("room_id", roomId);
   if (error) {
      return c.json({ error: error.message }, 500);
   }
   return c.json({ data }, 200);
};

export default getMessages;
