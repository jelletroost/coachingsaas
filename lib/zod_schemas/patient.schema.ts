import * as z from "zod";

export const patientSchema = z
   .object({
      firstName: z.string().min(2, "First name must be at least 2 characters"),
      lastName: z.string().min(2, "Last name must be at least 2 characters"),
      email: z.string().email("Please enter a valid email address"),
      password: z.string().min(8, "Password must be at least 8 characters"),
      confirmPassword: z.string(),
      dateOfBirth: z.date().refine((date) => date !== undefined, {
         message: "Date of birth is required",
      }),
      phone: z.string().min(10, "Please enter a valid phone number"),
      healthConditions: z.string().optional(),
   })
   .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
   });
