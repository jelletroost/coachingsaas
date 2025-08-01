const allowedOrigins = [
   "https://dev.coachingsaas.nl", 
   "https://www.coachingsaas.nl", 
   "http://localhost:3000"
 ];
 
 export function getCorsHeaders(request: Request) {
   const origin = request.headers.get("origin");
   
   return {
     "Access-Control-Allow-Origin": allowedOrigins.includes(origin) ? origin : "null",
     "Access-Control-Allow-Credentials": "true",
     "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, cookie",
     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
   };
 }