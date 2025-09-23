import { Context } from "jsr:@hono/hono";
import edgeAdminClient from "../../_shared/supabaseAdmin.ts";

const getMemberRooms = async (c: Context) => {
   const user = c.get("user");

   // Get all rooms where the user is a member
   const { data, error } = await edgeAdminClient
      .from("room_members")
      .select("*, message_room:message_room(*)")
      .eq("user_id", user?.id);
   if (error) {
      return c.json({ error: error.message }, 500);
   }
   return c.json({ data: data }, 200);
};

export default getMemberRooms;
