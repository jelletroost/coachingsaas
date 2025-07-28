import apiClient from "@/lib/axios";
import { Product } from "@/lib/types/database";

const createProduct = async (productData: Product) => {
   try {
      const response = await apiClient.post("/products/create", productData);
      return response.data;
   } catch (error) {
      console.error(error);
      throw error;
   }
};

export default createProduct;
