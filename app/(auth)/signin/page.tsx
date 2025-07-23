"use client";

import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signinSchema } from "@/lib/zod_schemas/auth.schema";
import { signin } from "@/services/auth_service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { animate, inView } from "motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

export default function SigninPage() {
   const headerRef = useRef<HTMLDivElement>(null);
   const cardRef = useRef<HTMLDivElement>(null);
   const [showPassword, setShowPassword] = useState(false);

   const userForm = useForm<z.infer<typeof signinSchema>>({
      resolver: zodResolver(signinSchema),
      defaultValues: {
         email: "",
         password: "",
         rememberMe: false,
      },
   });

   const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
   };

   // Animation effects
   useEffect(() => {
      // Animate header on mount
      if (headerRef.current) {
         animate(
            headerRef.current,
            { opacity: [0, 1], y: [20, 0] },
            { duration: 0.3 }
         );
      }

      // Animate card on mount
      if (cardRef.current) {
         animate(
            cardRef.current,
            { opacity: [0, 1], scale: [0.95, 1], y: [30, 0] },
            { duration: 0.3, delay: 0.2 }
         );
      }

      // Animate form elements when they come into view
      const formElements = document.querySelectorAll(".form-field");
      if (formElements.length > 0) {
         inView(formElements, (info) => {
            animate(info, { opacity: [0, 1], x: [20, 0] }, { duration: 0.3 });
         });
      }
   }, []);

   // Signin Query
   const { mutate: signinMutation, isPending } = useMutation({
      mutationFn: signin,
      onSuccess: () => {
         toast.success("Signin successful");
         // redirectTo("/");
      },
      onError: (error) => {
         toast.error(error.message);
      },
   });

   const onSubmit = async (data: z.infer<typeof signinSchema>) => {
      signinMutation(data);
   };

   return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center p-4">
         <div className="w-full max-w-md">
            {/* Header */}
            <div ref={headerRef} className="text-center mb-8">
               <Link href="/" className="inline-block cursor-pointer">
                  <h1 className="text-3xl font-bold text-primary mb-2">
                     HealthCoach Pro
                  </h1>
               </Link>
               <p className="text-muted-foreground">
                  Welcome back! Sign in to your account
               </p>
            </div>

            {/* Main Signin Card */}
            <Card ref={cardRef} className="w-full">
               <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Sign In</CardTitle>
                  <CardDescription>
                     Enter your credentials to access your account
                  </CardDescription>
               </CardHeader>
               <CardContent className="p-8">
                  <Form {...userForm}>
                     <form
                        onSubmit={userForm.handleSubmit(onSubmit)}
                        className="space-y-6">
                        <FormField
                           control={userForm.control}
                           name="email"
                           render={({ field }) => (
                              <FormItem className="form-field">
                                 <FormLabel>Email</FormLabel>
                                 <FormControl>
                                    <Input
                                       type="email"
                                       placeholder="john@example.com"
                                       className="h-12 text-base transition-all duration-200 focus:scale-[1.01]"
                                       {...field}
                                       {...userForm.register("email")}
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />

                        <FormField
                           control={userForm.control}
                           name="password"
                           render={({ field }) => (
                              <FormItem className="form-field">
                                 <FormLabel>Password</FormLabel>
                                 <FormControl>
                                    <div className="relative">
                                       <Input
                                          type={
                                             showPassword ? "text" : "password"
                                          }
                                          placeholder="••••••••"
                                          className="h-12 text-base transition-all duration-200 focus:scale-[1.01] pr-12"
                                          {...field}
                                          {...userForm.register("password")}
                                       />
                                       <Button
                                          type="button"
                                          variant="ghost"
                                          size="sm"
                                          className="absolute right-0 top-0 h-12 px-3 py-2 hover:bg-transparent"
                                          onClick={togglePasswordVisibility}>
                                          {showPassword ? (
                                             <svg
                                                className="h-4 w-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path
                                                   strokeLinecap="round"
                                                   strokeLinejoin="round"
                                                   strokeWidth={2}
                                                   d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                                                />
                                             </svg>
                                          ) : (
                                             <svg
                                                className="h-4 w-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path
                                                   strokeLinecap="round"
                                                   strokeLinejoin="round"
                                                   strokeWidth={2}
                                                   d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                                <path
                                                   strokeLinecap="round"
                                                   strokeLinejoin="round"
                                                   strokeWidth={2}
                                                   d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                />
                                             </svg>
                                          )}
                                       </Button>
                                    </div>
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />

                        <div className="flex items-center justify-between">
                           <FormField
                              control={userForm.control}
                              name="rememberMe"
                              render={() => (
                                 <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                                    <FormControl>
                                       <Checkbox
                                          id="rememberMe"
                                          {...userForm.register("rememberMe")}
                                       />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                       <FormLabel className="text-sm font-normal cursor-pointer">
                                          Remember me
                                       </FormLabel>
                                    </div>
                                 </FormItem>
                              )}
                           />
                           <Link
                              href="/forgot-password"
                              className="text-sm text-primary hover:underline cursor-pointer">
                              Forgot password?
                           </Link>
                        </div>

                        <Button
                           type="submit"
                           className="w-full h-12 text-base cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                           disabled={isPending}>
                           {isPending ? (
                              <div className="flex items-center gap-2">
                                 <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                 <span className="animate-pulse">
                                    Signing in...
                                 </span>
                              </div>
                           ) : (
                              "Sign In"
                           )}
                        </Button>
                     </form>
                  </Form>

                  {/* Divider */}
                  <div className="relative my-6">
                     <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                     </div>
                     <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                           Or continue with
                        </span>
                     </div>
                  </div>

                  {/* Social Login Buttons */}
                  <div className="space-y-3">
                     <Button
                        variant="outline"
                        className="w-full h-12 text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                        onClick={() => console.log("Google signin")}>
                        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                           <path
                              fill="currentColor"
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                           />
                           <path
                              fill="currentColor"
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                           />
                           <path
                              fill="currentColor"
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                           />
                           <path
                              fill="currentColor"
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                           />
                        </svg>
                        Continue with Google
                     </Button>

                     <Button
                        variant="outline"
                        className="w-full h-12 text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                        onClick={() => console.log("Apple signin")}>
                        <svg
                           className="mr-2 h-4 w-4"
                           viewBox="0 0 24 24"
                           fill="currentColor">
                           <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                        </svg>
                        Continue with Apple
                     </Button>
                  </div>

                  {/* Signup Link */}
                  <div className="mt-6 text-center">
                     <p className="text-sm text-muted-foreground">
                        Don&apos;t have an account?{" "}
                        <Link
                           href="/signup"
                           className="text-primary hover:underline cursor-pointer">
                           Sign up
                        </Link>
                     </p>
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
   );
}
