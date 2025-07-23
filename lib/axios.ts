import axios from "axios";

const apiClient = axios.create({
   baseURL:
      process.env.NODE_ENV === "development"
         ? process.env.NEXT_PUBLIC_API_URL
         : process.env.API_URL,
});

export default apiClient;
