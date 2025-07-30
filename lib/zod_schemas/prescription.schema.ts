import * as z from "zod";

export const prescriptionSchema = z.object({
   product_id: z.string().min(1, "Please select a product"),
   dosage: z.string().min(1, "Dosage is required"),
   frequency: z.string().min(1, "Frequency is required"),
   duration: z.string().min(1, "Duration is required"),
   instructions: z.string().min(1, "Instructions are required"),
   notes: z.string().optional(),
});

export type PrescriptionFormData = z.infer<typeof prescriptionSchema>; 