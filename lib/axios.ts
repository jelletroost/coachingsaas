import axios from "axios";

const apiClient = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_URL,
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
export default apiClient;
