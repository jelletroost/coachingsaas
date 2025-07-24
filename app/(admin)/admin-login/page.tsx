"use client";

import { redirectTo } from "@/app/actions/actions";
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
import { AlertTriangle, Eye, EyeOff, Lock, Shield } from "lucide-react";
import { animate, inView } from "motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

export default function AdminLoginPage() {
   const headerRef = useRef<HTMLDivElement>(null);
   const cardRef = useRef<HTMLDivElement>(null);
   const [showPassword, setShowPassword] = useState(false);
   const [loginAttempts, setLoginAttempts] = useState(0);
   const [isLocked, setIsLocked] = useState(false);

   const adminForm = useForm<z.infer<typeof signinSchema>>({
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

   // Admin Signin Query
   const { mutate: adminSigninMutation, isPending } = useMutation({
      mutationFn: signin,
      onSuccess: () => {
         toast.success("Admin login successful");
         setLoginAttempts(0);
         redirectTo("/admin");
      },
      onError: () => {
         const newAttempts = loginAttempts + 1;
         setLoginAttempts(newAttempts);

         if (newAttempts >= 3) {
            setIsLocked(true);
            toast.error(
               "Account temporarily locked due to multiple failed attempts"
            );
            setTimeout(() => {
               setIsLocked(false);
               setLoginAttempts(0);
            }, 300000);
         } else {
            toast.error(
               `Invalid credentials. ${3 - newAttempts} attempts remaining.`
            );
         }
      },
   });

   const onSubmit = async (data: z.infer<typeof signinSchema>) => {
      if (isLocked) {
         toast.error("Account is temporarily locked. Please try again later.");
         return;
      }
      adminSigninMutation(data);
   };

   return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-destructive/5 flex items-center justify-center p-4">
         <div className="w-full max-w-md">
            {/* Header */}
            <div ref={headerRef} className="text-center mb-8">
               <Link href="/" className="inline-block cursor-pointer">
                  <div className="flex items-center justify-center gap-2 mb-2">
                     <Shield className="w-8 h-8 text-primary" />
                     <h1 className="text-3xl font-bold text-primary">
                        HealthCoach Pro
                     </h1>
                  </div>
               </Link>
               <p className="text-muted-foreground">
                  Administrator Access Portal
               </p>
            </div>

            {/* Main Admin Login Card */}
            <Card
               ref={cardRef}
               className="w-full border-2 p-0 border-primary/20 shadow-xl">
               <CardHeader className="text-center py-4 bg-gradient-to-r from-primary/5 to-secondary/5">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                     <Lock className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl text-primary">
                     Admin Login
                  </CardTitle>
                  <CardDescription>
                     Secure access to administrative controls
                  </CardDescription>
               </CardHeader>

               <CardContent className="p-8">
                  {/* Security Warning */}
                  {loginAttempts > 0 && (
                     <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                        <div className="flex items-center gap-2 text-destructive">
                           <AlertTriangle className="w-4 h-4" />
                           <span className="text-sm font-medium">
                              Failed login attempts: {loginAttempts}/3
                           </span>
                        </div>
                        {isLocked && (
                           <p className="text-xs text-destructive mt-1">
                              Account locked for 5 minutes due to security
                              concerns.
                           </p>
                        )}
                     </div>
                  )}

                  <Form {...adminForm}>
                     <form
                        onSubmit={adminForm.handleSubmit(onSubmit)}
                        className="space-y-6">
                        <FormField
                           control={adminForm.control}
                           name="email"
                           render={({ field }) => (
                              <FormItem className="form-field">
                                 <FormLabel className="text-primary font-medium">
                                    Admin Email
                                 </FormLabel>
                                 <FormControl>
                                    <Input
                                       type="email"
                                       placeholder="admin@healthcoachpro.com"
                                       className="h-12 text-base transition-all duration-200 focus:scale-[1.01] border-primary/20 focus:border-primary"
                                       disabled={isLocked}
                                       {...field}
                                       {...adminForm.register("email")}
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />

                        <FormField
                           control={adminForm.control}
                           name="password"
                           render={({ field }) => (
                              <FormItem className="form-field">
                                 <FormLabel className="text-primary font-medium">
                                    Admin Password
                                 </FormLabel>
                                 <FormControl>
                                    <div className="relative">
                                       <Input
                                          type={
                                             showPassword ? "text" : "password"
                                          }
                                          placeholder="••••••••"
                                          className="h-12 text-base transition-all duration-200 focus:scale-[1.01] pr-12 border-primary/20 focus:border-primary"
                                          disabled={isLocked}
                                          {...field}
                                          {...adminForm.register("password")}
                                       />
                                       <Button
                                          type="button"
                                          variant="ghost"
                                          size="sm"
                                          className="absolute right-0 top-0 h-12 px-3 py-2 hover:bg-transparent"
                                          onClick={togglePasswordVisibility}
                                          disabled={isLocked}>
                                          {showPassword ? (
                                             <EyeOff className="h-4 w-4" />
                                          ) : (
                                             <Eye className="h-4 w-4" />
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
                              control={adminForm.control}
                              name="rememberMe"
                              render={() => (
                                 <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                                    <FormControl>
                                       <Checkbox
                                          id="rememberMe"
                                          disabled={isLocked}
                                          {...adminForm.register("rememberMe")}
                                       />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                       <FormLabel className="text-sm font-normal cursor-pointer">
                                          Remember this device
                                       </FormLabel>
                                    </div>
                                 </FormItem>
                              )}
                           />
                           <Link
                              href="/admin/forgot-password"
                              className="text-sm text-primary hover:underline cursor-pointer">
                              Reset password
                           </Link>
                        </div>

                        <Button
                           type="submit"
                           className="w-full h-12 text-base cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] bg-primary hover:bg-primary/90"
                           disabled={isPending || isLocked}>
                           {isPending ? (
                              <div className="flex items-center gap-2">
                                 <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                 <span className="animate-pulse">
                                    Authenticating...
                                 </span>
                              </div>
                           ) : isLocked ? (
                              "Account Locked"
                           ) : (
                              "Access Admin Panel"
                           )}
                        </Button>
                     </form>
                  </Form>

                  {/* Security Notice */}
                  <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                     <div className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div className="text-xs text-muted-foreground">
                           <p className="font-medium mb-1">Security Notice:</p>
                           <p>
                              This is a secure administrative portal. All login
                              attempts are logged and monitored for security
                              purposes.
                           </p>
                        </div>
                     </div>
                  </div>

                  {/* Back to Main Site */}
                  <div className="mt-6 text-center">
                     <Link
                        href="/"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        ← Back to main site
                     </Link>
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
   );
}
