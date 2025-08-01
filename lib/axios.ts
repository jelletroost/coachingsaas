import axios from "axios";
import supabaseClient from "./supabase/supabaseClient";

const apiClient = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_URL,
   withCredentials: true,
});

apiClient.interceptors.response.use(
   (response) => {
      return response;
   },
   (error) => {
      if (error.response) {
         const { data } = error.response;
         throw new Error(data.message || "An error occurred");
      }
   }
);

// Request interceptor to include auth token
apiClient.interceptors.request.use(async (config) => {
   const supabase = supabaseClient;
   const {
      data: { session },
   } = await supabase.auth.getSession();
   if (session?.access_token) {
      config.headers.Authorization = `Bearer ${session.access_token}`;
   }

   return config;
});

export default apiClient;
