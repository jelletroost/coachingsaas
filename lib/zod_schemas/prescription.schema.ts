import * as z from "zod";

export const prescriptionSchema = z.object({
   patient_id: z.string().min(1, "Patient ID is required"),
   product_id: z.string().min(1, "Please select a product"),
   patient_name: z.string().min(1, "Patient name is required"),
   product_name: z.string().min(1, "Product name is required"),
   dosage: z.string().min(1, "Dosage is required"),
   frequency: z.string().min(1, "Frequency is required"),
   duration: z.string().min(1, "Duration is required"),
   instructions: z.string().min(1, "Instructions are required"),
   notes: z.string().optional(),
   status: z.enum(["active", "completed", "discontinued"]),
});

export type PrescriptionFormData = z.infer<typeof prescriptionSchema>;

// Type for prescription data that matches the database schema
export type PrescriptionData = {
   id: string;
   patient_id: string;
   product_id: string;
   patient_name: string;
   product_name: string;
   dosage: string;
   frequency: string;
   duration: string;
   instructions: string;
   notes: string | null;
   status: "active" | "completed" | "discontinued";
   created_at: string;
   updated_at: string;
}; 