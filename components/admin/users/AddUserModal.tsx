"use client";

import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
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
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { adminCreateUserSchema } from "@/lib/zod_schemas/auth.schema";
import { adminCreateUser } from "@/services/auth_service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { UserPlus } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface AddUserModalProps {
   isOpen: boolean;
   onClose: () => void;
   onSuccess: () => void;
}

export function AddUserModal({
   isOpen,
   onClose,
   onSuccess,
}: AddUserModalProps) {
   const form = useForm<z.infer<typeof adminCreateUserSchema>>({
      resolver: zodResolver(adminCreateUserSchema),
      defaultValues: {
         first_name: "",
         last_name: "",
         email: "",
         password: "",
         confirmPassword: "",
         role: "patient",
      },
   });

   // Reset form when modal opens/closes
   useEffect(() => {
      if (isOpen) {
         form.reset({
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "patient",
         });
      }
   }, [isOpen, form]);

   const { mutate: createUser, isPending } = useMutation({
      mutationFn: adminCreateUser,
      onSuccess: () => {
         toast.success("User created successfully!");
         onSuccess();
         onClose();
      },
      onError: (error: any) => {
         toast.error(error.message || "Failed to create user");
      },
   });

   const onSubmit = (data: z.infer<typeof adminCreateUserSchema>) => {
      createUser(data);
   };

   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
               <DialogTitle className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5" />
                  Add New User
               </DialogTitle>
               <DialogDescription>
                  Create a new user account with the specified role and
                  credentials.
               </DialogDescription>
            </DialogHeader>

            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                     <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                 <Input placeholder="John" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="last_name"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                 <Input placeholder="Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>

                  <FormField
                     control={form.control}
                     name="email"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Email</FormLabel>
                           <FormControl>
                              <Input
                                 type="email"
                                 placeholder="john@example.com"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name="role"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Role</FormLabel>
                           <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}>
                              <FormControl>
                                 <SelectTrigger>
                                    <SelectValue placeholder="Select a role" />
                                 </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                 <SelectItem value="patient">
                                    Patient
                                 </SelectItem>
                                 <SelectItem value="coach">Coach</SelectItem>
                                 <SelectItem value="admin">Admin</SelectItem>
                              </SelectContent>
                           </Select>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                     <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                 <Input
                                    type="password"
                                    placeholder="••••••••"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Confirm Password</FormLabel>
                              <FormControl>
                                 <Input
                                    type="password"
                                    placeholder="••••••••"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>

                  <DialogFooter>
                     <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        disabled={isPending}>
                        Cancel
                     </Button>
                     <Button type="submit" disabled={isPending}>
                        {isPending ? (
                           <div className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                              Creating...
                           </div>
                        ) : (
                           "Create User"
                        )}
                     </Button>
                  </DialogFooter>
               </form>
            </Form>
         </DialogContent>
      </Dialog>
   );
}
