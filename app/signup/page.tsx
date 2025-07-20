"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { animate, inView } from "motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Validation schemas
const patientSchema = z
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

const coachSchema = z
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

export default function SignupPage() {
   const [activeTab, setActiveTab] = useState("patient");
   const [isLoading, setIsLoading] = useState(false);
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

   const patientForm = useForm<z.infer<typeof patientSchema>>({
      resolver: zodResolver(patientSchema),
      defaultValues: {
         firstName: "",
         lastName: "",
         email: "",
         password: "",
         confirmPassword: "",
         dateOfBirth: undefined,
         phone: "",
         healthConditions: "",
      },
   });

   const coachForm = useForm<z.infer<typeof coachSchema>>({
      resolver: zodResolver(coachSchema),
      defaultValues: {
         firstName: "",
         lastName: "",
         email: "",
         password: "",
         confirmPassword: "",
         phone: "",
         specialization: "",
         experience: "",
         license: "",
         bio: "",
      },
   });

   const onPatientSubmit = async (data: z.infer<typeof patientSchema>) => {
      setIsLoading(true);
      try {
         // Simulate API call
         await new Promise((resolve) => setTimeout(resolve, 2000));
         console.log("Patient signup:", data);
         // Handle successful signup
      } catch (error) {
         console.error("Signup error:", error);
      } finally {
         setIsLoading(false);
      }
   };

   const onCoachSubmit = async (data: z.infer<typeof coachSchema>) => {
      setIsLoading(true);
      try {
         // Simulate API call
         await new Promise((resolve) => setTimeout(resolve, 2000));
         console.log("Coach signup:", data);
         // Handle successful signup
      } catch (error) {
         console.error("Signup error:", error);
      } finally {
         setIsLoading(false);
      }
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
                     onValueChange={setActiveTab}
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
                        <Form {...patientForm}>
                           <form
                              onSubmit={patientForm.handleSubmit(
                                 onPatientSubmit
                              )}
                              className="space-y-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 <FormField
                                    control={patientForm.control}
                                    name="firstName"
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
                                    control={patientForm.control}
                                    name="lastName"
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
                                 control={patientForm.control}
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
                                    control={patientForm.control}
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
                                    control={patientForm.control}
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

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 <FormField
                                    control={patientForm.control}
                                    name="dateOfBirth"
                                    render={({ field }) => (
                                       <FormItem className="form-field">
                                          <FormLabel>Date of Birth</FormLabel>
                                          <Popover>
                                             <PopoverTrigger asChild>
                                                <FormControl>
                                                   <Button
                                                      variant={"outline"}
                                                      className={cn(
                                                         "!w-full !h-12 justify-start text-left font-normal cursor-pointer text-base transition-all duration-200 focus:scale-[1.01] hover:bg-accent hover:border-primary/30 active:bg-primary/20 active:border-primary/50",
                                                         !field.value &&
                                                            "text-muted-foreground"
                                                      )}>
                                                      <CalendarIcon className="mr-2 h-4 w-4" />
                                                      {field.value ? (
                                                         format(
                                                            field.value,
                                                            "PPP"
                                                         )
                                                      ) : (
                                                         <span>
                                                            Pick a date
                                                         </span>
                                                      )}
                                                   </Button>
                                                </FormControl>
                                             </PopoverTrigger>
                                             <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                   mode="single"
                                                   selected={field.value}
                                                   onSelect={field.onChange}
                                                   initialFocus
                                                />
                                             </PopoverContent>
                                          </Popover>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 />
                                 <FormField
                                    control={patientForm.control}
                                    name="phone"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormLabel>Phone Number</FormLabel>
                                          <FormControl>
                                             <Input
                                                placeholder="+1 (555) 123-4567"
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
                                 control={patientForm.control}
                                 name="healthConditions"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormLabel>
                                          Health Conditions (Optional)
                                       </FormLabel>
                                       <FormControl>
                                          <Input
                                             placeholder="e.g., Diabetes, Hypertension"
                                             className="h-12 text-base"
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />

                              <Button
                                 type="submit"
                                 className="w-full h-12 text-base cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                                 disabled={isLoading}>
                                 {isLoading ? (
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
                        <Form {...coachForm}>
                           <form
                              onSubmit={coachForm.handleSubmit(onCoachSubmit)}
                              className="space-y-6">
                              <div className="grid grid-cols-2 gap-4">
                                 <FormField
                                    control={coachForm.control}
                                    name="firstName"
                                    render={({ field }) => (
                                       <FormItem className="form-field">
                                          <FormLabel>First Name</FormLabel>
                                          <FormControl>
                                             <Input
                                                placeholder="Sarah"
                                                className="h-12 text-base"
                                                {...field}
                                             />
                                          </FormControl>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 />
                                 <FormField
                                    control={coachForm.control}
                                    name="lastName"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormLabel>Last Name</FormLabel>
                                          <FormControl>
                                             <Input
                                                placeholder="Johnson"
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
                                 control={coachForm.control}
                                 name="email"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormLabel>Email</FormLabel>
                                       <FormControl>
                                          <Input
                                             type="email"
                                             placeholder="sarah@example.com"
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
                                    control={coachForm.control}
                                    name="password"
                                    render={({ field }) => (
                                       <FormItem>
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
                                    control={coachForm.control}
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

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 <FormField
                                    control={coachForm.control}
                                    name="phone"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormLabel>Phone Number</FormLabel>
                                          <FormControl>
                                             <Input
                                                placeholder="+1 (555) 123-4567"
                                                className="h-12 text-base"
                                                {...field}
                                             />
                                          </FormControl>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 />
                                 <FormField
                                    control={coachForm.control}
                                    name="license"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormLabel>License Number</FormLabel>
                                          <FormControl>
                                             <Input
                                                placeholder="HC123456"
                                                className="h-12 text-base"
                                                {...field}
                                             />
                                          </FormControl>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 <FormField
                                    control={coachForm.control}
                                    name="specialization"
                                    render={({ field }) => (
                                       <FormItem className="form-field">
                                          <FormLabel>Specialization</FormLabel>
                                          <Select
                                             onValueChange={field.onChange}
                                             defaultValue={field.value}>
                                             <FormControl>
                                                <SelectTrigger className="select-trigger-fixed text-base transition-all duration-200 focus:scale-[1.01]">
                                                   <SelectValue placeholder="Select specialization" />
                                                </SelectTrigger>
                                             </FormControl>
                                             <SelectContent className="max-h-[200px] overflow-y-auto">
                                                <SelectItem value="nutrition">
                                                   Nutrition
                                                </SelectItem>
                                                <SelectItem value="fitness">
                                                   Fitness
                                                </SelectItem>
                                                <SelectItem value="mental-health">
                                                   Mental Health
                                                </SelectItem>
                                                <SelectItem value="diabetes">
                                                   Diabetes Management
                                                </SelectItem>
                                                <SelectItem value="cardiology">
                                                   Cardiology
                                                </SelectItem>
                                                <SelectItem value="pediatrics">
                                                   Pediatrics
                                                </SelectItem>
                                                <SelectItem value="geriatrics">
                                                   Geriatrics
                                                </SelectItem>
                                                <SelectItem value="general">
                                                   General Wellness
                                                </SelectItem>
                                             </SelectContent>
                                          </Select>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 />
                                 <FormField
                                    control={coachForm.control}
                                    name="experience"
                                    render={({ field }) => (
                                       <FormItem className="form-field">
                                          <FormLabel>
                                             Experience Level
                                          </FormLabel>
                                          <Select
                                             onValueChange={field.onChange}
                                             defaultValue={field.value}>
                                             <FormControl>
                                                <SelectTrigger className="select-trigger-fixed text-base transition-all duration-200 focus:scale-[1.01]">
                                                   <SelectValue placeholder="Select experience" />
                                                </SelectTrigger>
                                             </FormControl>
                                             <SelectContent className="max-h-[200px] overflow-y-auto">
                                                <SelectItem value="0-2">
                                                   0-2 years
                                                </SelectItem>
                                                <SelectItem value="3-5">
                                                   3-5 years
                                                </SelectItem>
                                                <SelectItem value="6-10">
                                                   6-10 years
                                                </SelectItem>
                                                <SelectItem value="10+">
                                                   10+ years
                                                </SelectItem>
                                             </SelectContent>
                                          </Select>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 />
                              </div>

                              <FormField
                                 control={coachForm.control}
                                 name="bio"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormLabel>Professional Bio</FormLabel>
                                       <FormControl>
                                          <Textarea
                                             className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-3 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                             placeholder="Tell us about your experience, qualifications, and approach to health coaching..."
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />

                              <Button
                                 type="submit"
                                 className="w-full h-12 text-base cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                                 disabled={isLoading}>
                                 {isLoading ? (
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
                           href="/signin"
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
