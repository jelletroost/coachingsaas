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
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
   newPasswordSchema,
   passwordResetSchema,
} from "@/lib/zod_schemas/auth.schema";
import {
   requestPasswordReset,
   submitNewPassword,
} from "@/services/auth_service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, CheckCircle, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { animate, inView } from "motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

export default function ResetPasswordPage() {
   const headerRef = useRef<HTMLDivElement>(null);
   const cardRef = useRef<HTMLDivElement>(null);
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   const [isResetRequested, setIsResetRequested] = useState(false);
   const [resetToken, setResetToken] = useState<string>("");

   // Check for reset token in URL
   useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      if (token) {
         setResetToken(token);
         setIsResetRequested(true);
      }
   }, []);

   // Password Reset Request Form
   const resetForm = useForm<z.infer<typeof passwordResetSchema>>({
      resolver: zodResolver(passwordResetSchema),
      defaultValues: {
         email: "",
      },
   });

   // New Password Form
   const newPasswordForm = useForm<z.infer<typeof newPasswordSchema>>({
      resolver: zodResolver(newPasswordSchema),
      defaultValues: {
         password: "",
         confirmPassword: "",
      },
   });

   const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
   };

   const toggleConfirmPasswordVisibility = () => {
      setShowConfirmPassword(!showConfirmPassword);
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

   // Request Password Reset Query
   const { mutate: resetMutation, isPending: isResetPending } = useMutation({
      mutationFn: requestPasswordReset,
      onSuccess: () => {
         toast.success("Password reset email sent! Check your inbox.");
         setIsResetRequested(true);
      },
      onError: () => {
         toast.error("Failed to send reset email. Please try again.");
      },
   });

   // Submit New Password Query
   const { mutate: newPasswordMutation, isPending: isNewPasswordPending } =
      useMutation({
         mutationFn: submitNewPassword,
         onSuccess: () => {
            toast.success("Password updated successfully!");
            redirectTo("/auth/signin");
         },
         onError: () => {
            toast.error("Failed to update password. Please try again.");
         },
      });

   const onResetSubmit = async (data: z.infer<typeof passwordResetSchema>) => {
      resetMutation(data);
   };

   const onNewPasswordSubmit = async (
      data: z.infer<typeof newPasswordSchema>
   ) => {
      if (!resetToken) {
         toast.error(
            "Reset token is missing. Please request a new reset link."
         );
         return;
      }
      newPasswordMutation({ ...data, token: resetToken });
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
                  {isResetRequested && resetToken
                     ? "Set your new password"
                     : "Reset your password"}
               </p>
            </div>

            {/* Card */}
            <Card ref={cardRef} className="shadow-lg border-1">
               <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold">
                     {isResetRequested && resetToken
                        ? "Create New Password"
                        : "Forgot Password?"}
                  </CardTitle>
                  <CardDescription>
                     {isResetRequested && resetToken
                        ? "Enter your new password below"
                        : "Enter your email address and we'll send you a reset link"}
                  </CardDescription>
               </CardHeader>

               <CardContent className="space-y-6">
                  {!isResetRequested || !resetToken ? (
                     // Password Reset Request Form
                     <Form {...resetForm}>
                        <form
                           onSubmit={resetForm.handleSubmit(onResetSubmit)}
                           className="space-y-4">
                           <FormField
                              control={resetForm.control}
                              name="email"
                              render={({ field }) => (
                                 <FormItem className="form-field">
                                    <FormLabel className="text-sm font-medium">
                                       Email Address
                                    </FormLabel>
                                    <FormControl>
                                       <div className="relative">
                                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                          <Input
                                             {...field}
                                             type="email"
                                             placeholder="Enter your email"
                                             className="pl-10"
                                          />
                                       </div>
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />

                           <Button
                              type="submit"
                              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                              disabled={isResetPending}>
                              {isResetPending
                                 ? "Sending..."
                                 : "Send Reset Link"}
                           </Button>
                        </form>
                     </Form>
                  ) : (
                     // New Password Form
                     <Form {...newPasswordForm}>
                        <form
                           onSubmit={newPasswordForm.handleSubmit(
                              onNewPasswordSubmit
                           )}
                           className="space-y-4">
                           <FormField
                              control={newPasswordForm.control}
                              name="password"
                              render={({ field }) => (
                                 <FormItem className="form-field">
                                    <FormLabel className="text-sm font-medium">
                                       New Password
                                    </FormLabel>
                                    <FormControl>
                                       <div className="relative">
                                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                          <Input
                                             {...field}
                                             type={
                                                showPassword
                                                   ? "text"
                                                   : "password"
                                             }
                                             placeholder="Enter new password"
                                             className="pl-10 pr-10"
                                          />
                                          <button
                                             type="button"
                                             onClick={togglePasswordVisibility}
                                             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground">
                                             {showPassword ? (
                                                <EyeOff className="w-4 h-4" />
                                             ) : (
                                                <Eye className="w-4 h-4" />
                                             )}
                                          </button>
                                       </div>
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />

                           <FormField
                              control={newPasswordForm.control}
                              name="confirmPassword"
                              render={({ field }) => (
                                 <FormItem className="form-field">
                                    <FormLabel className="text-sm font-medium">
                                       Confirm New Password
                                    </FormLabel>
                                    <FormControl>
                                       <div className="relative">
                                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                          <Input
                                             {...field}
                                             type={
                                                showConfirmPassword
                                                   ? "text"
                                                   : "password"
                                             }
                                             placeholder="Confirm new password"
                                             className="pl-10 pr-10"
                                          />
                                          <button
                                             type="button"
                                             onClick={
                                                toggleConfirmPasswordVisibility
                                             }
                                             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground">
                                             {showConfirmPassword ? (
                                                <EyeOff className="w-4 h-4" />
                                             ) : (
                                                <Eye className="w-4 h-4" />
                                             )}
                                          </button>
                                       </div>
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />

                           <Button
                              type="submit"
                              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                              disabled={isNewPasswordPending}>
                              {isNewPasswordPending
                                 ? "Updating..."
                                 : "Update Password"}
                           </Button>
                        </form>
                     </Form>
                  )}

                  {/* Success Message */}
                  {isResetRequested && !resetToken && (
                     <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center gap-2">
                           <CheckCircle className="w-5 h-5 text-green-600" />
                           <div>
                              <p className="text-sm font-medium text-green-800">
                                 Reset email sent!
                              </p>
                              <p className="text-xs text-green-600 mt-1">
                                 Check your email for the password reset link.
                              </p>
                           </div>
                        </div>
                     </div>
                  )}

                  {/* Back to Sign In */}
                  <div className="text-center pt-4">
                     <Link
                        href="/auth/signin"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Sign In
                     </Link>
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
   );
}
