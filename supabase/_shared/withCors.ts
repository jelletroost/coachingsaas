import type { Hono } from "jsr:@hono/hono";
import { getCorsHeaders } from "./cors.ts";

export function withCors(app: Hono) {
   return (req: Request) => {
      const corsHeaders = getCorsHeaders(req);
      
      if (req.method === "OPTIONS") {
         return new Response("ok", { headers: corsHeaders });
      }

      return app.fetch(req).then((res) => {
         const headers = new Headers(res.headers);
         for (const [key, value] of Object.entries(corsHeaders)) {
            headers.set(key, value);
         }

         return new Response(res.body, {
            status: res.status,
            headers,
         });
      });
   };
}