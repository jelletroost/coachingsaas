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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signupSchema } from "@/lib/zod_schemas/auth.schema";
import { signup } from "@/services/auth_service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { animate, inView } from "motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

export default function SignupPage() {
   const [activeTab, setActiveTab] = useState<"patient" | "coach">("patient");
   const headerRef = useRef<HTMLDivElement>(null);
   const cardRef = useRef<HTMLDivElement>(null);

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

   // Animate tab content when switching
   useEffect(() => {
      const activeContent = document.querySelector(
         `[data-value="${activeTab}"]`
      );
      if (activeContent) {
         animate(
            activeContent,
            { opacity: [0, 1], x: [10, 0] },
            { duration: 0.4 }
         );
      }
   }, [activeTab]);

   const userForm = useForm<z.infer<typeof signupSchema>>({
      resolver: zodResolver(signupSchema),
      defaultValues: {
         first_name: "",
         last_name: "",
         email: "",
         password: "",
         confirmPassword: "",
         role: activeTab,
      },
   });

   // Signup Query
   const { mutate: signupMutation, isPending } = useMutation({
      mutationFn: signup,
      onSuccess: () => {
         toast.success("Signup successful");
         redirectTo("/auth/signin");
      },
      onError: () => {
         toast.error("Something went wrong");
      },
   });

   const onSubmit = async (data: z.infer<typeof signupSchema>) => {
      signupMutation({ ...data, role: activeTab });
   };

   return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center p-4 md:p-8">
         <div className="w-full max-w-4xl">
            {/* Header */}
            <div ref={headerRef} className="text-center mb-8">
               <Link href="/" className="inline-block cursor-pointer">
                  <h1 className="text-3xl font-bold text-primary mb-2">
                     HealthCoach Pro
                  </h1>
               </Link>
               <p className="text-muted-foreground">
                  Join our digital health platform and start your wellness
                  journey
               </p>
            </div>

            {/* Main Signup Card */}
            <Card ref={cardRef} className="w-full max-w-2xl mx-auto">
               <CardHeader className="text-center">
                  <CardTitle className="text-2xl">
                     Create Your Account
                  </CardTitle>
                  <CardDescription>
                     Choose your role and start your health journey with us
                  </CardDescription>
               </CardHeader>
               <CardContent className="p-8">
                  <Tabs
                     value={activeTab}
                     onValueChange={(value) =>
                        setActiveTab(value as "patient" | "coach")
                     }
                     className="w-full">
                     <TabsList className="tabs-list-enhanced grid w-full grid-cols-2 mb-6 transition-all duration-300">
                        <TabsTrigger
                           value="patient"
                           className="tabs-trigger-enhanced flex items-center gap-2 cursor-pointer transition-all duration-200 hover:scale-[1.02]">
                           <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24">
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth={2}
                                 d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                           </svg>
                           Patient
                        </TabsTrigger>
                        <TabsTrigger
                           value="coach"
                           className="tabs-trigger-enhanced flex items-center gap-2 cursor-pointer transition-all duration-200 hover:scale-[1.02]">
                           <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24">
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth={2}
                                 d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                              />
                           </svg>
                           Health Coach
                        </TabsTrigger>
                     </TabsList>

                     {/* Patient Signup Form */}
                     <TabsContent value="patient" data-value="patient">
                        <Form {...userForm}>
                           <form
                              onSubmit={userForm.handleSubmit(onSubmit)}
                              className="space-y-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 <FormField
                                    control={userForm.control}
                                    name="first_name"
                                    render={({ field }) => (
                                       <FormItem className="form-field">
                                          <FormLabel>First Name</FormLabel>
                                          <FormControl>
                                             <Input
                                                placeholder="John"
                                                className="h-12 text-base transition-all duration-200 focus:scale-[1.01]"
                                                {...field}
                                             />
                                          </FormControl>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 />
                                 <FormField
                                    control={userForm.control}
                                    name="last_name"
                                    render={({ field }) => (
                                       <FormItem className="form-field">
                                          <FormLabel>Last Name</FormLabel>
                                          <FormControl>
                                             <Input
                                                placeholder="Doe"
                                                className="h-12 text-base"
                                                {...field}
                                             />
                                          </FormControl>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 />
                              </div>

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
                                             className="h-12 text-base"
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 <FormField
                                    control={userForm.control}
                                    name="password"
                                    render={({ field }) => (
                                       <FormItem className="form-field">
                                          <FormLabel>Password</FormLabel>
                                          <FormControl>
                                             <Input
                                                type="password"
                                                placeholder="••••••••"
                                                className="h-12 text-base"
                                                {...field}
                                             />
                                          </FormControl>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 />
                                 <FormField
                                    control={userForm.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormLabel>
                                             Confirm Password
                                          </FormLabel>
                                          <FormControl>
                                             <Input
                                                type="password"
                                                placeholder="••••••••"
                                                className="h-12 text-base"
                                                {...field}
                                             />
                                          </FormControl>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 />
                              </div>

                              <Button
                                 type="submit"
                                 className="w-full h-12 text-base cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                                 disabled={isPending}>
                                 {isPending ? (
                                    <div className="flex items-center gap-2">
                                       <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                       <span className="animate-pulse">
                                          Creating Account...
                                       </span>
                                    </div>
                                 ) : (
                                    "Create Patient Account"
                                 )}
                              </Button>
                           </form>
                        </Form>
                     </TabsContent>

                     {/* Coach Signup Form */}
                     <TabsContent value="coach" data-value="coach">
                        <Form {...userForm}>
                           <form
                              onSubmit={userForm.handleSubmit(onSubmit)}
                              className="space-y-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 <FormField
                                    control={userForm.control}
                                    name="first_name"
                                    render={({ field }) => (
                                       <FormItem className="form-field">
                                          <FormLabel>First Name</FormLabel>
                                          <FormControl>
                                             <Input
                                                placeholder="John"
                                                className="h-12 text-base transition-all duration-200 focus:scale-[1.01]"
                                                {...field}
                                             />
                                          </FormControl>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 />
                                 <FormField
                                    control={userForm.control}
                                    name="last_name"
                                    render={({ field }) => (
                                       <FormItem className="form-field">
                                          <FormLabel>Last Name</FormLabel>
                                          <FormControl>
                                             <Input
                                                placeholder="Doe"
                                                className="h-12 text-base"
                                                {...field}
                                             />
                                          </FormControl>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 />
                              </div>

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
                                             className="h-12 text-base"
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 <FormField
                                    control={userForm.control}
                                    name="password"
                                    render={({ field }) => (
                                       <FormItem className="form-field">
                                          <FormLabel>Password</FormLabel>
                                          <FormControl>
                                             <Input
                                                type="password"
                                                placeholder="••••••••"
                                                className="h-12 text-base"
                                                {...field}
                                             />
                                          </FormControl>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 />
                                 <FormField
                                    control={userForm.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormLabel>
                                             Confirm Password
                                          </FormLabel>
                                          <FormControl>
                                             <Input
                                                type="password"
                                                placeholder="••••••••"
                                                className="h-12 text-base"
                                                {...field}
                                             />
                                          </FormControl>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 />
                              </div>

                              <Button
                                 type="submit"
                                 className="w-full h-12 text-base cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                                 disabled={isPending}>
                                 {isPending ? (
                                    <div className="flex items-center gap-2">
                                       <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                       <span className="animate-pulse">
                                          Creating Account...
                                       </span>
                                    </div>
                                 ) : (
                                    "Create Coach Account"
                                 )}
                              </Button>
                           </form>
                        </Form>
                     </TabsContent>
                  </Tabs>

                  {/* Login Link */}
                  <div className="mt-6 text-center">
                     <p className="text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link
                           href="/auth/signin"
                           className="text-primary hover:underline cursor-pointer">
                           Sign in
                        </Link>
                     </p>
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
   );
}
