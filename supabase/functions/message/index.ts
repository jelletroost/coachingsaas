import { Hono } from "jsr:@hono/hono";
import { withCors } from "../../_shared/withCors.ts";
import createMeeting from "../../controller/message/createMeeting.ts";
import createRoom from "../../controller/message/createRoom.ts";
import getMessages from "../../controller/message/getMessages.ts";
import sendMessage from "../../controller/message/sendMessage.ts";

const functionName = "message";
const app = new Hono().basePath(`/${functionName}`);

// Routes
app.use("/create-room", createRoom);
app.use("/send-message", sendMessage);
app.use("/get-messages", getMessages);
app.use("/create-meeting", createMeeting);

Deno.serve(withCors(app));
