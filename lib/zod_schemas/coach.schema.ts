import * as z from "zod";

export const coachSchema = z
   .object({
      firstName: z.string().min(2, "First name must be at least 2 characters"),
      lastName: z.string().min(2, "Last name must be at least 2 characters"),
      email: z.string().email("Please enter a valid email address"),
      password: z.string().min(8, "Password must be at least 8 characters"),
      confirmPassword: z.string(),
      phone: z.string().min(10, "Please enter a valid phone number"),
      specialization: z.string().min(1, "Please select a specialization"),
      experience: z.string().min(1, "Please select your experience level"),
      license: z.string().min(1, "License number is required"),
      bio: z.string().min(50, "Bio must be at least 50 characters"),
   })
   .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
   });
