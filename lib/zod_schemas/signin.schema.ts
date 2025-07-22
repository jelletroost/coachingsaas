import * as z from "zod";

export const signinSchema = z.object({
   email: z.string().email("Please enter a valid email address"),
   password: z.string().min(1, "Password is required"),
   rememberMe: z.boolean().optional(),
});
