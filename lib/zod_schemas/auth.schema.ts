import * as z from "zod";

// Signup Schema
export const signupSchema = z
   .object({
      first_name: z.string().min(2, "First name must be at least 2 characters"),
      last_name: z.string().min(2, "Last name must be at least 2 characters"),
      email: z.string().email("Please enter a valid email address"),
      password: z.string().min(8, "Password must be at least 8 characters"),
      confirmPassword: z.string(),
      role: z.enum(["patient", "coach"]),
   })
   .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
   });

// Signin Schema
export const signinSchema = z.object({
   email: z.string().email("Please enter a valid email address"),
   password: z.string().min(1, "Password is required"),
   rememberMe: z.boolean().optional(),
});

export type SignupFormData = z.infer<typeof signupSchema>;
export type SigninFormData = z.infer<typeof signinSchema>;
