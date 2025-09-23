import { Hono } from "jsr:@hono/hono";
import { withCors } from "../../_shared/withCors.ts";
import createRoom from "../../controller/message/createRoom.ts";
import getMessages from "../../controller/message/getMessages.ts";
import sendMessage from "../../controller/message/sendMessage.ts";

const functionName = "message";
const app = new Hono().basePath(`/${functionName}`);

// Routes
app.use("/create-room", createRoom);
app.use("/send-message", sendMessage);
app.use("/get-messages", getMessages);

Deno.serve(withCors(app));
